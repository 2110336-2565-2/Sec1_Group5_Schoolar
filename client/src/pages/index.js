import { useEffect, useState } from 'react'
import Scholarship from '@components/Home-page/Scholarship'
import SearchBar from '@components/Home-page/SearchBar'
import { Box, Divider, Typography } from '@mui/material'
import { Container } from '@mui/system'
import { scholarshipTypes } from '@utils/StdInformation'

import axios from './api/axios'

function Homepage() {
	const [scholars, setScholars] = useState([])
	const [inputName, setInputName] = useState('')
	const [filterInput, setFilterInput] = useState('')

	useEffect(() => {
		axios.get('/scholarship').then((res) => {
			setScholars(res.data.data)
		})
	}, [])

	const searchHandler = (value) => {
		setInputName(value.trim())
	}

	// Filter Handler
	const filterHandler = (filtered) => {
		let matchedFilter = filterInput

		// filter scholarchip
		console.log(`matched Input : ${filtered}`)
		if (filtered == 'All Scholarship') {
			matchedFilter = ''
		} else {
			scholarshipTypes.forEach((val) => {
				if (val.label === filtered) {
					matchedFilter = val.value
				}
			})
		}

		setFilterInput(matchedFilter)
	}

	const filteredScholars = scholars.filter((scholar) => {
		// console.log(`matched Input : ${filterInput}`)
		//const searchList = [scholar.name.toLowerCase().includes(inputName.toLowerCase()), scholar.typeOfScholarship.includes(filterInput.toLowerCase())]
		return (
			scholar.name.toLowerCase().includes(inputName.toLowerCase()) ||
			scholar.typeOfScholarship.includes(filterInput.toLowerCase())
		)
	})

	return (
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
