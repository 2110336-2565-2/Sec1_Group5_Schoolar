import { useEffect, useState } from 'react'
import Scholarship from '@components/Home-page/Scholarship'
import SearchBar from '@components/Home-page/SearchBar'
import { Box, Divider, Typography, FormControl, Container, Paper, Grid, Stack } from '@mui/material'
import axios from './api/axios'
import { Center, VStack } from '@components/common'

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
		<Center>
			<VStack>
				<SearchBar searchHandler={searchHandler}/>
				<Paper
					sx={{
						position: 'relative',
						top: -28,
						zIndex: 1,
						minWidth: { xs: 'auto', md: 1150 },
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
