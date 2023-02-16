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
	const onClick = (event) => {
		event.preventDefault()
		console.log(inputName)
		props.searchHandler(inputName)
	}
	return (
		<VStack
			sx={{ p: { xs: 1, md: 3 }, maxWidth: { xs: '100%', md: 800 }, margin: '0 auto' }}
			gap={3}
		>
			<Image
				src="/home-page/decor.svg"
				alt="decor"
				layout="responsive"
				width={627}
				height={157}
			/>

			<HStack gap={3} sx={{ width: '100%' }}>
				<Paper
					onSubmit={onClick}
					component="form"
					sx={{
						display: 'flex',
						flex: '1 1 auto',
						height: 35,
						minWidth: { xs: 'auto', md: 500 },
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
				<Typography
					variant="h7"
					align="left"
					color="textPrimary"
					gutterBottom
					sx={{ display: { xs: 'none', md: 'block' } }}
				>
					OR
				</Typography>
				<Button
					variant="contained"
					size="small"
					sx={{
						fontSize: 15,
						width: 100,
						height: 35,
						display: { xs: 'none', md: 'inline-block' },
					}}
					style={{ textTransform: 'none' }}
				>
					match
				</Button>
			</HStack>
		</VStack>
	)
}

export default SearchBar
