import { useEffect, useState } from 'react'

import Scholarship from '@components/Home-page/Scholarship'
import SearchBar from '@components/Home-page/SearchBar'
import { Center, VStack } from '@components/common'
import { Box, Button, Divider, Paper, Typography } from '@mui/material'

import { useAuth } from '@/context/AuthContext'
import { useSnackbar } from '@/context/SnackbarContext'
import useAxiosPrivate from '@/hooks/useAxiosPrivate'

const SCORE_MAP = {
	degree: 5,
	program: 5,
	gpax: 4,
	targetNation: 3,
	typeOfScholarship: 3,
	pinScholarships: 0,
}

function calculateScore(stdInfo, scholarInfo) {
	let score = 0

	Object.keys(stdInfo).forEach((key) => {
		if (key === '_id') return
		if (stdInfo[key] && scholarInfo[key]) {
			const field1 = String(stdInfo[key])
			const field2 = String(scholarInfo[key])
			const fieldScore = field1 === field2 ? SCORE_MAP[key] : 0
			score += fieldScore
		}
	})

	return score
}

function Homepage() {
	const [unpinScholars, setUnpinScholars] = useState([])
	const [pinScholars, setPinScholars] = useState([])
	const [recommendedScholars, setRecommendedScholars] = useState([])
	const [inputName, setInputName] = useState('')
	const { auth } = useAuth()
	const { openSnackbar } = useSnackbar()

	// set filters list
	const [filters, setFilters] = useState({
		scholarship: [],
		degree: [],
		faculty: [],
		studentProgram: [],
	})
	// student-info for get recommended scholarships
	const [studentInfo, setStudentInfo] = useState({})
	const axiosPrivate = useAxiosPrivate()
	const [showRecScholar, setShowRecScholar] = useState(false)

	useEffect(() => {
		async function fetchData() {
			try {
				const res = auth && (await axiosPrivate.get('/scholarship'))

				if (auth && auth.role === 'student') {
					const studentRes = await axiosPrivate.get(`/student/student-info/${auth.username}`)
					const studentInfo = studentRes.data.data[0]

					let pinScholars = []
					let unpinScholars = res.data.data
						.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
						.map((scholar, index) => ({
							...scholar,
							isPin: studentInfo.pinScholarships.includes(scholar._id) ? 1 : 0,
							order: index,
						}))

					pinScholars = unpinScholars.filter((scholar) => scholar.isPin === 1)
					unpinScholars = unpinScholars.filter((scholar) => scholar.isPin === 0)

					setUnpinScholars(unpinScholars)
					setPinScholars(pinScholars)
					setStudentInfo(studentRes.data.data[0])
				} else if (auth && auth.role === 'provider') {
					setPinScholars(res.data.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)))
				}
			} catch (err) {
				console.log(err)
				openSnackbar('Error fetching data!', 'error')
			}
		}

		fetchData()
	}, [auth, axiosPrivate])

	const searchHandler = (value) => {
		setInputName(value.trim())
	}

	const handlePin = async (scholar) => {
		try {
			if (scholar.isPin) {
				// unpin
				await axiosPrivate.patch(`/student/unpin-scholarship/${auth.username}`, {
					scholarshipID: scholar._id,
				})
				const updatedUnpinScholars = [...unpinScholars, { ...scholar, isPin: 0 }]
				updatedUnpinScholars.sort((a, b) => a.order - b.order)
				setUnpinScholars(updatedUnpinScholars)
				setPinScholars(pinScholars.filter((s) => s._id !== scholar._id))
			} else {
				// pin
				await axiosPrivate.patch(`/student/pin-scholarship/${auth.username}`, {
					scholarshipID: scholar._id,
				})
				const updatedPinScholars = [...pinScholars, { ...scholar, isPin: 1 }]
				updatedPinScholars.sort((a, b) => a.order - b.order)
				setPinScholars(updatedPinScholars)
				setUnpinScholars(unpinScholars.filter((s) => s._id !== scholar._id))
			}
		} catch (err) {
			console.log(err)
			openSnackbar('Error pinning scholarship!', 'error')
		}
	}

	const matchHandler = () => {
		// calculate top 3 scholarship recommended
		let recommended
		if (auth && auth.role === 'student') {
			const scores = new Map()
			unpinScholars.forEach((obj) => {
				const score = calculateScore(studentInfo, obj)
				scores.set(obj._id, score)
			})
			const sortedScores = new Map([...scores].sort((a, b) => b[1] - a[1]))
			const topThree = Array.from(sortedScores.keys()).slice(0, 3)
			recommended = unpinScholars.filter((scholar) => {
				return topThree.includes(scholar._id)
			})
		}
		setShowRecScholar(true)
		setRecommendedScholars(recommended)
	}

	// Filter Handler
	const filterHandler = (newFilters) => {
		setFilters((prevFilters) => ({
			...prevFilters,
			...newFilters,
		}))
	}

	const isFilterEmpty = () => {
		return Object.values(filters).every((f) => f.length === 0)
	}

	const isContainScholar = (arr, str) => {
		return arr.length === 0 ? true : arr.includes(str)
	}

	const filteredScholars = [...pinScholars, ...unpinScholars].filter((scholar) => {
		const isMatchName = scholar.scholarshipName.toLowerCase().includes(inputName.toLowerCase())
		const isMatchDegree = isContainScholar(filters.degree, scholar.degree)
		const isMatchScholarship = isContainScholar(filters.scholarship, scholar.typeOfScholarship)
		const isMatchFaculty = isContainScholar(filters.faculty, scholar.program)
		const isMatchStudentProgram = isContainScholar(filters.studentProgram, scholar.program)

		if (isFilterEmpty()) {
			return isMatchName
		} else {
			return isMatchName && isMatchDegree && isMatchScholarship && isMatchFaculty && isMatchStudentProgram
		}
	})

	return (
		<Center>
			<VStack sx={{ width: '90%' }}>
				<Typography
					variant="h3"
					align="center"
					color="#FFFFFF"
					gutterBottom
					margin={5}
					sx={{ fontWeight: 'bold' }}
				>
					Explore more in Schoolar
				</Typography>
				{!showRecScholar && (
					<SearchBar
						searchHandler={searchHandler}
						matchHandler={matchHandler}
						filterHandler={filterHandler}
					/>
				)}
				<Paper
					sx={{
						position: 'relative',
						top: showRecScholar ? 0 : -28,
						zIndex: 1,
						width: '100%',
						borderRadius: 10,
						px: { xs: 3, sm: 4, md: 8 },
						py: { xs: 5, sm: 5, md: 6 },
						mb: showRecScholar ? 4 : 0,
						backgroundColor: '#F4F6F8',
					}}
				>
					{auth && auth.role === 'student' && showRecScholar && (
						<Box>
							<Typography variant="h5" align="left" color="textPrimary" gutterBottom>
								Recommended Scholarships
							</Typography>
							<Divider orientation="horizontal" flexItem style={{ borderBottomWidth: 2 }} />
							<Scholarship items={recommendedScholars} hidePin={true} />
							<Center>
								<Button variant="contained" onClick={() => setShowRecScholar(false)}>
									Back to all Scholarships
								</Button>
							</Center>
						</Box>
					)}
					{!showRecScholar && (
						<Box>
							{filteredScholars.length > 0 && (
								<Box>
									{inputName.length > 0 ? (
										<Typography variant="h5" align="left" color="textPrimary" gutterBottom>
											{`Scholarships related to "${inputName}"`}
										</Typography>
									) : (
										<Typography variant="h5" align="left" color="textPrimary" gutterBottom>
											{auth?.role === 'student' ? 'The Latest Scholarships' : 'Your Scholarship'}
										</Typography>
									)}
									<Divider orientation="horizontal" flexItem style={{ borderBottomWidth: 2 }} />
									<Scholarship
										items={filteredScholars}
										handlePin={handlePin}
										hidePin={auth?.role === 'provider'}
									/>
								</Box>
							)}
							{filteredScholars.length === 0 && (
								<Typography variant="h5" align="center" color="textPrimary" gutterBottom>
									No scholarships found.
								</Typography>
							)}
						</Box>
					)}
				</Paper>
			</VStack>
		</Center>
	)
}

export default Homepage

export async function getStaticProps(context) {
	return {
		props: {
			authRequired: true,
		},
	}
}
