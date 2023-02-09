import { HStack, VStack } from '@components/common'
import FilterListIcon from '@mui/icons-material/FilterList'
import SearchIcon from '@mui/icons-material/Search'
import { Button, IconButton, InputBase, Paper, Typography } from '@mui/material'
import Image from 'next/image'

function SearchBar(props) {
	let inputName = ''
	const onChange = (e) => {
		inputName = e.target.value
	}
	const onClick = () => {
		event.preventDefault();
		console.log(inputName)
		props.searchHandler(inputName)
	}
	return (
		<VStack sx={{ p: 3 }} gap={3}>
			<Image src="/home-page/decor.svg" width="627" height="157"></Image>{' '}
			<HStack gap={3}>
				<Paper onSubmit={onClick}
					component="form"
					sx={{
						display: 'flex',
						width: 500,
						height: 35,
					}}
				>
					<IconButton type="button" sx={{ p: '10px' }}>
						<FilterListIcon />
					</IconButton>
					<InputBase
						onChange={onChange}
						sx={{ ml: 1, flex: 1 }}
						placeholder="search scholarships"
					/>
					<IconButton onClick={onClick} type="button" sx={{ p: '10px' }}>
						<SearchIcon />
					</IconButton>
				</Paper>
				<Typography variant="h7" align="left" color="textPrimary" gutterButtom>
					OR
				</Typography>
				<Button
					variant="contained"
					size="small"
					sx={{ fontSize: 15, width: 100, height: 35 }}
					style={{ textTransform: 'none' }}
				>
					match
				</Button>
			</HStack>
		</VStack>
	)
}
export default SearchBar
