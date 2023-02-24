import { useEffect, useState } from 'react'
import Footer from '@components/Home-page/footer'
import Scholarship from '@components/Home-page/Scholarship'
import SearchBar from '@components/Home-page/SearchBar'
import { Box, Divider, Typography } from '@mui/material'
import { Container } from '@mui/system'

import axios from './api/axios'

function Homepage() {
	const [scholars, setScholars] = useState([])
	const [inputName, setInputName] = useState('')

	useEffect(() => {
		axios.get('/scholarship').then((res) => {
			setScholars(res.data.data)
		})
	}, [])

	const searchHandler = (value) => {
		setInputName(value.trim())
	}

	const filteredScholars = scholars.filter((scholar) => {
		return scholar.name.toLowerCase().includes(inputName.toLowerCase())
	})

	return (
		<>
			<Container maxWidth="lg">
				<SearchBar searchHandler={searchHandler} />
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
