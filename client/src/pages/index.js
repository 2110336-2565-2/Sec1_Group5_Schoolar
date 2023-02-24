import { useEffect, useState } from 'react'
import Scholarship from '@components/Home-page/Scholarship'
import SearchBar from '@components/Home-page/SearchBar'
import { Box, Divider, Typography } from '@mui/material'
import { Container } from '@mui/system'
import axios from './api/axios'
import Footer from '@components/Home-page/footer'
import { scholarshipTypes } from '@utils/formOptUtils'
function Homepage() {
	const [scholars, setScholars] = useState([])
	const [inputName, setInputName] = useState('')
	const [filterInput, setFilterInput] = useState([])

	// set filters list
	const [scholarshipFilters, setScholarshipFilters] = useState([])
	const [degreeFilters, setDegreeFilters] = useState([])
	const [facultyFilters, setFacultyFilters] = useState([])
	const [studentProgramFilters, setStudentProgramFilters] = useState([])

	useEffect(() => {
		axios.get('/scholarship').then((res) => {
			setScholars(res.data.data)
		})
	}, [])

	const searchHandler = (value) => {
		setInputName(value.trim())
	}

	// Filter Handler
	const filterHandler = (scholarshipFilters, degreeFilters, facultyFilters, studentProgramFilters) => {
		console.log(scholars)
		// filter scholarship
		console.log(`matched Input : ${scholarshipFilters}`)
		console.log(`matched Input : ${degreeFilters}`)
		console.log(`matched Input : ${facultyFilters}`)
		console.log(`matched Input : ${studentProgramFilters}`)

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
			return scholar.name.toLowerCase().includes(inputName.toLowerCase())
		} else if (inputName.length === 0) {
			return (
				isContainScholar(degreeFilters, scholar.degree) &&
				isContainScholar(scholarshipFilters, scholar.typeOfScholarship) &&
				isContainScholar(facultyFilters, scholar.program) &&
				isContainScholar(studentProgramFilters, scholar.program)
			)
		} else {
			return (
				scholar.name.toLowerCase().includes(inputName.toLowerCase()) &&
				isContainScholar(degreeFilters, scholar.degree) &&
				isContainScholar(scholarshipFilters, scholar.typeOfScholarship) &&
				isContainScholar(facultyFilters, scholar.program) &&
				isContainScholar(studentProgramFilters, scholar.program)
			)
		}
		//const searchList = [scholar.name.toLowerCase().includes(inputName.toLowerCase()), scholar.typeOfScholarship.includes(filterInput.toLowerCase())]

		// ||scholar.typeOfScholarship.includes(filterInput.toLowerCase())
	})

	return (
		<>
			<Container maxWidth="lg">
				<SearchBar searchHandler={searchHandler} filterHandler={filterHandler} />
				<Box sx={{ my: 3 }}>
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
			</Container>
			<Footer />
		</>
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
