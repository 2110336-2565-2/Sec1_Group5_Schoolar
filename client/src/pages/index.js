import { useEffect, useState } from 'react'

import Scholarship from '@components/Home-page/Scholarship'
import SearchBar from '@components/Home-page/SearchBar'
import { Center, VStack } from '@components/common'
import { Box, Container, Divider, FormControl, Grid, Paper, Stack, Typography } from '@mui/material'

import useAxiosPrivate from '@/hooks/useAxiosPrivate'

import axios from './api/axios'

function Homepage() {
	const [scholars, setScholars] = useState([])
	const [inputName, setInputName] = useState('')

	// set filters list
	const [scholarshipFilters, setScholarshipFilters] = useState([])
	const [degreeFilters, setDegreeFilters] = useState([])
	const [facultyFilters, setFacultyFilters] = useState([])
	const [studentProgramFilters, setStudentProgramFilters] = useState([])
	const axiosPrivate = useAxiosPrivate()

	useEffect(() => {
		axiosPrivate.get('/scholarship').then((res) => {
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
		<Center>
			<VStack sx={{ width: '90%' }}>
				<SearchBar searchHandler={searchHandler} filterHandler={filterHandler} />
				<Paper
					sx={{
						position: 'relative',
						top: -28,
						zIndex: 1,
						width: '100%',
						borderRadius: 10,
						padding: 10,
						backgroundColor: '#F4F6F8',
					}}
				>
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
