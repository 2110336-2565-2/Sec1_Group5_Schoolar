import { HStack, VStack } from '@components/common'
import { Typography, Button, Paper, InputBase, IconButton } from '@mui/material'
import FilterListIcon from '@mui/icons-material/FilterList'
import SearchIcon from '@mui/icons-material/Search'
import Image from 'next/image'
import { Container } from '@mui/system'
function Homepage() {
	return (
		<>
			<div>
				<Container maxWidth="lg">
					<VStack sx={{ p: 5 }} gap={3}>
						<Image src="/home-page/search-bar.png" width="627" height="157"></Image>{' '}
						<HStack gap={3}>
							<Paper
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
									sx={{ ml: 1, flex: 1 }}
									placeholder="search scholarships"
								/>
								<IconButton type="button" sx={{ p: '10px' }}>
									<SearchIcon />
								</IconButton>
							</Paper>
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

					<Typography variant="h5" align="left" color="textPrimary" gutterButtom>
						The Latest Scholarships
					</Typography>
				</Container>
			</div>
		</>
	)
}
export default Homepage
