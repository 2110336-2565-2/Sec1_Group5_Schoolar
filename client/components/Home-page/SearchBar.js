import { useState } from 'react'
import { HStack } from '@components/common'
import FilterListIcon from '@mui/icons-material/FilterList'
import SearchIcon from '@mui/icons-material/Search'
import { Button, IconButton, InputBase, Paper, Typography } from '@mui/material'

// import Image from 'next/image'
import FilterScholar from './FilterScholar'
import { useRouter } from 'next/router'
import { useAuth } from '@/context/AuthContext'
import useAxiosPrivate from '@/hooks/useAxiosPrivate'

function SearchBar(props) {
	const [inputName, setInputName] = useState('')
	const { auth } = useAuth()
	const onChange = (e) => {
		setInputName(e.target.value)
	}
	const onClick = (event) => {
		event.preventDefault()
		console.log(inputName)
		props.searchHandler(inputName)
	}
	var buttonName = "match"
	console.log(auth)
	if(auth && auth.role == "provider"){
		buttonName = "+ Add Scholarship"
	}
	else {
		buttonName = "match"
	}
	const handleClick = (auth) => {
		if (buttonName == "+ Add Scholarship"){
			router.push('/scholarship/addScholarship')
		}
	}
	const router = useRouter();
	return (
		<>
			<Typography variant="h3" align="center" color="#FFFFFF" gutterBottom margin={5} sx={{ fontWeight: 'bold' }}>
				Explore more in Schoolar
			</Typography>
			<Paper
				sx={{
					display: 'flex',
					flex: '1 1 auto',
					width: '60%',
					minWidth: 340,
					borderRadius: 10,
					padding: 1,
					paddingRight: 2,
					zIndex: 2,
				}}
			>
				<HStack sx={{ width: '100%' }}>
					<FilterScholar filterHandler={props.filterHandler} />
					<Paper
						onSubmit={onClick}
						component="form"
						sx={{
							display: 'flex',
							flex: '1 1 auto',
							height: 30,
							backgroundColor: '#F4F6F8',
							borderRadius: 5,
						}}
					>
						<InputBase onChange={onChange} sx={{ ml: 1, flex: 1 }} placeholder="search scholarships" />
						<IconButton onClick={onClick} type="button" sx={{ p: '10px' }}>
							<SearchIcon />
						</IconButton>
					</Paper>
					<Typography variant="h7" align="left" color="textPrimary" gutterBottom marginX={2}>
						OR
					</Typography>
					<Button
						variant="contained"
						size="small"
						sx={{
							fontSize: 15,
							width: 175,
							height: 35,
							borderRadius: 5,
						}}
						onClick ={handleClick}
					>
						{buttonName}
					</Button>
				</HStack>
			</Paper>
		</>
	)
}

export default SearchBar
