import { useEffect, useState } from 'react'

import Scholarship from '@components/Home-page/Scholarship'
import SearchBar from '@components/Home-page/SearchBar'
import { Center, VStack } from '@components/common'
import { Box, Divider, Paper, Typography } from '@mui/material'

import { useAuth } from '@/context/AuthContext'
import useAxiosPrivate from '@/hooks/useAxiosPrivate'

const SCORE_MAP = {
	degree: 5,
	program: 5,
	gpax: 4,
	targetNation: 3,
	typeOfScholarship: 3,
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
	const [scholars, setScholars] = useState([])
	const [inputName, setInputName] = useState('')
	const { auth } = useAuth()

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
			const res = await axiosPrivate.get('/scholarship')
			setScholars(res.data.data)
			console.log(res.data.data)

			if (auth && auth.role === 'student') {
				const studentRes = await axiosPrivate.get(`/student/student-info/${auth.username}`)
				setStudentInfo(studentRes.data.data[0])
			}
		}
		fetchData()
	}, [auth, axiosPrivate])

	const searchHandler = (value) => {
		setInputName(value.trim())
	}

	const matchHandler = (value) => {
		setShowRecScholar(value)
	}

	// Filter Handler
	const filterHandler = (newFilters) => {
		console.log(scholars)
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

	const filteredScholars = scholars.filter((scholar) => {
		console.log(`Input : ${inputName}`)
		console.log(filters)
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

	// calculate top 3 scholarship recommended
	let recommendedScholars
	if (auth && auth.role === 'student') {
		const scores = new Map()
		scholars.forEach((obj) => {
			const score = calculateScore(studentInfo, obj)
			scores.set(obj._id, score)
		})
		const sortedScores = new Map([...scores].sort((a, b) => b[1] - a[1]))
		const topThree = Array.from(sortedScores.keys()).slice(0, 3)
		console.log(sortedScores)
		console.log(topThree)
		recommendedScholars = scholars.filter((scholar) => {
			return topThree.includes(scholar._id)
		})
	}

	return (
		<Center>
			<VStack sx={{ width: '90%' }}>
				<SearchBar searchHandler={searchHandler} matchHandler={matchHandler} filterHandler={filterHandler} />
				<Paper
					sx={{
						position: 'relative',
						top: -28,
						zIndex: 1,
						width: '100%',
						borderRadius: 10,
						px: { xs: 7, sm: 7, md: 10 },
						py: { xs: 2, sm: 5, md: 10 },
						backgroundColor: '#F4F6F8',
					}}
				>
					{auth && auth.role === 'student' && showRecScholar && (
						<Box>
							<Typography variant="h5" align="left" color="textPrimary" gutterBottom>
								Recommended Scholarships
							</Typography>
							<Divider orientation="horizontal" flexItem style={{ borderBottomWidth: 2 }} />
						</Box>
					)}
					{auth && auth.role === 'student' && showRecScholar && <Scholarship items={recommendedScholars} />}
					<Box>
						{inputName.length > 0 ? (
							<Typography variant="h5" align="left" color="textPrimary" gutterBottom>
								{`Scholarships related to "${inputName}"`}
							</Typography>
						) : (
							<Typography variant="h5" align="left" color="textPrimary" gutterBottom>
								The Latest Scholarships
							</Typography>
						)}
						<Divider orientation="horizontal" flexItem style={{ borderBottomWidth: 2 }} />
					</Box>
					<Scholarship items={filteredScholars} />
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
