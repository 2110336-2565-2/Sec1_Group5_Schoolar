import { Typography, Divider } from '@mui/material'
import { Container } from '@mui/system'
import { useState, useEffect } from 'react'
import SearchBar from './search-scholarship'
import { Scholarship } from './scholarship'

function Homepage() {
	const [scholars, setScholars] = useState([])
	const [inputName, setInputName] = useState('')

	useEffect(() => {
		setScholars([
			{ name: 'S1', tag: ['tag1', 'tag2'] },
			{ name: 'S2', tag: ['tag3', 'tag4'] },
			{ name: 'S3', tag: ['tag5', 'tag6'] },
			{ name: 'S4', tag: ['tag7', 'tag8'] },
			{ name: 'S5', tag: ['tag9', 'tag10'] },
			{ name: 'S6', tag: ['tag11', 'tag12'] },
		])
	}, [])
	const searchHandler = (value) => {
		setInputName(value.trim())
	}
	const filteredScholars = scholars.filter((scholar) => {
		return scholar.name.toLowerCase().includes(inputName.toLowerCase())
	})
	return (
		<Container maxWidth="lg">
			<SearchBar searchHandler={searchHandler} />
			{inputName.length > 0 ? (
				<Typography variant="h5" align="left" color="textPrimary" gutterButtom>
					Scholarships that related to "{inputName}"
				</Typography>
			) : (
				<Typography variant="h5" align="left" color="textPrimary" gutterButtom>
					The Latest Scholarships
				</Typography>
			)}
			<Divider orientation="horizontal" flexItem sx={{ borderBottomWidth: 2 }} />
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
