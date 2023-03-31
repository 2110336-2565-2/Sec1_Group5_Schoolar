import { useEffect, useState } from 'react'

import Scholarship from '@components/Home-page/Scholarship'
import SearchBar from '@components/Home-page/SearchBar'
import { Center, VStack } from '@components/common'
import { Box, Divider, Paper, Typography } from '@mui/material'

import { useAuth } from '@/context/AuthContext'
import useAxiosPrivate from '@/hooks/useAxiosPrivate'

const scoreMap = {
	degree: 5,
	program: 5,
	gpax: 4,
	targetNation: 3,
	typeOfScholarship: 3,
}
function calculateScore(stdInfo, scholarInfo) {
	let score = 0

	for (const key in stdInfo) {
		if (key == '_id') continue
		if (stdInfo[key] && scholarInfo[key]) {
			const field1 = stdInfo[key].toString()
			const field2 = scholarInfo[key].toString()
			const fieldScore = field1 === field2 ? scoreMap[key] : 0
			score += fieldScore
		}
	}
	return score
}

function Homepage() {
	const [scholars, setScholars] = useState([])
	const [inputName, setInputName] = useState('')
	const { auth } = useAuth()

	// set filters list
	const [scholarshipFilters, setScholarshipFilters] = useState([])
	const [degreeFilters, setDegreeFilters] = useState([])
	const [facultyFilters, setFacultyFilters] = useState([])
	const [studentProgramFilters, setStudentProgramFilters] = useState([])
	// student-info for get recommended scholarships
	const [studentInfo, setStudentInfo] = useState({})
	const axiosPrivate = useAxiosPrivate()
	const [showRecScholar, setShowRecScholar] = useState(false)

	useEffect(() => {
		axiosPrivate.get('/scholarship').then((res) => {
			setScholars(res.data.data)
			console.log(res.data.data)
		})
		if (auth && auth.role === 'student') {
			axiosPrivate.get(`/student/student-info/${auth.username}`).then((res) => {
				setStudentInfo(res.data.data[0])
			})
		}
	}, [])

	const searchHandler = (value) => {
		setInputName(value.trim())
	}

	const matchHandler = (value) =>{
		setShowRecScholar(value)
	}

	// Filter Handler
	const filterHandler = (scholarshipFilters, degreeFilters, facultyFilters, studentProgramFilters) => {
		console.log(scholars)
		// filter scholarship
		setScholarshipFilters(scholarshipFilters)
		setDegreeFilters(degreeFilters)
		setFacultyFilters(facultyFilters)
		setStudentProgramFilters(studentProgramFilters)
	}

	const isContainScholar = (arr, str) => {
		return arr.length === 0 ? true : arr.includes(str)
	}

	const filteredScholars = scholars.filter((scholar) => {
		console.log(`Input : ${inputName}`)
		if (
			scholarshipFilters.length === 0 &&
			degreeFilters.length === 0 &&
			facultyFilters.length === 0 &&
			studentProgramFilters.length === 0
		) {
			return scholar.scholarshipName.toLowerCase().includes(inputName.toLowerCase())
		} else if (inputName.length === 0) {
			return (
				isContainScholar(degreeFilters, scholar.degree) &&
				isContainScholar(scholarshipFilters, scholar.typeOfScholarship) &&
				isContainScholar(facultyFilters, scholar.program) &&
				isContainScholar(studentProgramFilters, scholar.program)
			)
		} else {
			return (
				scholar.scholarshipName.toLowerCase().includes(inputName.toLowerCase()) &&
				isContainScholar(degreeFilters, scholar.degree) &&
				isContainScholar(scholarshipFilters, scholar.typeOfScholarship) &&
				isContainScholar(facultyFilters, scholar.program) &&
				isContainScholar(studentProgramFilters, scholar.program)
			)
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
		const sortedScoresIter = sortedScores.keys()
		const top_three = [sortedScoresIter.next(), sortedScoresIter.next(), sortedScoresIter.next()]
		console.log(sortedScores)
		console.log(top_three)
		recommendedScholars = scholars.filter((scholar) => {
			return (
				scholar._id === top_three[0].value ||
				scholar._id === top_three[1].value ||
				scholar._id === top_three[2].value
			)
		})
	}

	return (
		<Center>
			<VStack sx={{ width: '90%' }}>
				<SearchBar searchHandler={searchHandler} matchHandler = {matchHandler} filterHandler={filterHandler} />
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
