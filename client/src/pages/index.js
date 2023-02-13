import { useEffect, useState } from 'react'
import Scholarship from '@components/Home-page/Scholarship'
import SearchBar from '@components/Home-page/SearchBar'
import { Divider, Typography } from '@mui/material'
import { Container } from '@mui/system'
import axios from './api/axios'

function Homepage() {
	const [scholars, setScholars] = useState([])
	const [inputName, setInputName] = useState('')

	//* example of using axios private to get data from route that need token

	useEffect(() => {
		//* example of using axios private to get data from route that need token
		axios.get('/scholarship').then((res) => {
			// console.log(res.data.data)
			setScholars(res.data.data)
		})
		/*setScholars([
			{ name: 'S1', tag: ['tag1', 'tag2'] },
			{ name: 'S2', tag: ['tag3', 'tag4'] },
			{ name: 'S3', tag: ['tag5', 'tag6'] },
			{ name: 'S4', tag: ['tag7', 'tag8'] },
			{ name: 'S5', tag: ['tag9', 'tag10'] },
			{ name: 'S6', tag: ['tag11', 'tag12'] },
		])*/
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
				<Typography variant="h5" align="left" color="textPrimary" gutterBottom>
					{`Scholarships that related to "${inputName}"`}
				</Typography>
			) : (
				<Typography variant="h5" align="left" color="textPrimary" gutterBottom>
					The Latest Scholarships
				</Typography>
			)}
			<Divider orientation="horizontal" flexItem style={{ borderBottomWidth: 2 }} />
			<Scholarship items={filteredScholars} />
		</Container>
	)
}
export default Homepage
