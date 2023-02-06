import { HStack, VStack } from '@components/common'
import FilterListIcon from '@mui/icons-material/FilterList'
import SearchIcon from '@mui/icons-material/Search'
import { Button, IconButton, InputBase, Paper, Typography, Divider} from '@mui/material'
import { Container } from '@mui/system'
import PushPinIcon from '@mui/icons-material/PushPin'
import Grid from '@mui/material/Grid'
import Stack from '@mui/material/Stack'
import { grey } from '@mui/material/colors'
import { useState, useEffect } from 'react'
import Navbar from '@components/Layout/Navbar'

import Image from 'next/image'
function Homepage() {
	const [scholars, setScholars] = useState([])

	useEffect(() => {
		setScholars(['S1', 'S2', 'S3', 'S4'])
	}, [])

	return (
		<>
			<div>
				<Navbar categoryVisible={true} />
				<Container maxWidth="lg">
					<VStack sx={{ p: 3 }} gap={3}>
						<Image src="/home-page/decor.svg" width="627" height="157"></Image>{' '}
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
					<Divider orientation="horizontal" flexItem sx={{ borderBottomWidth: 2 }} />
					<Grid container marginTop={2} gap={8} justifyContent="center">
						{scholars.map((scholar, idx) => {
							return (
								<Paper
									component="form"
									sx={{ display: 'flex', width: 300, height: 180 }}
								>
									<Grid container direction="row" justifyContent="space-between">
										<Typography margin={1} marginLeft={2}>
											{scholar}
										</Typography>
										<Button
											variant="text"
											sx={{ display: 'flex', width: 50, height: 50 }}
										>
											<PushPinIcon sx={{ color: grey[900] }} />
										</Button>
									</Grid>
								</Paper>
							)
						})}
					</Grid>
				</Container>
			</div>
		</>
	)
}
export default Homepage
