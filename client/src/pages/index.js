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
		let matchedFilter = filterInput

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
		// console.log(filteredTypes)
		// if (filtered == 'All Scholarship') {
		// 	matchedFilter = ''
		// } else {
		// 	scholarshipTypes.forEach((val) => {
		// 		if (val.label === filtered) {
		// 			matchedFilter = val.value
		// 		}
		// 	})
		// }

		// setFilterInput(matchedFilter)
	}

	const filteredScholars = scholars.filter((scholar) => {
		// console.log(`matched Input : ${filterInput}`)
		//const searchList = [scholar.name.toLowerCase().includes(inputName.toLowerCase()), scholar.typeOfScholarship.includes(filterInput.toLowerCase())]
		return scholar.name.toLowerCase().includes(inputName.toLowerCase())
		// ||scholar.typeOfScholarship.includes(filterInput.toLowerCase())
	})

	// const filteredTypes = scholars.filter((scholar) => {
	// 	return scholarshipFilters.includes(scholar.typeOfScholarShip)
	// })

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
				<Scholarship items={filteredTypes} />
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
