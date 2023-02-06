import { HStack, VStack } from '@components/common'
import FilterListIcon from '@mui/icons-material/FilterList'
import SearchIcon from '@mui/icons-material/Search'
import { Button, IconButton, InputBase, Paper, Typography, Divider, Box, Stack, Grid} from '@mui/material'
import { Container } from '@mui/system'
import PushPinIcon from '@mui/icons-material/PushPin'
import { grey } from '@mui/material/colors'
import { useState, useEffect } from 'react'
import Navbar from '@components/Layout/Navbar'

import Image from 'next/image'
function Homepage() {
	const [scholars, setScholars] = useState([])

	useEffect(() => {
		setScholars([{name: 'S1', tag:['tag1','tag2']},{name: 'S2', tag:['tag3','tag4']}, {name: 'S3', tag:['tag5','tag6']}, {name: 'S4', tag:['tag7','tag8']}, {name: 'S5', tag:['tag9','tag10']}, {name: 'S6', tag:['tag11','tag12']}])
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

					<Typography variant="h5" align="left" color="textPrimary" gutterButtom>
						The Latest Scholarships
					</Typography>
					<Divider orientation="horizontal" flexItem sx={{ borderBottomWidth: 2 }} />
					<Grid container marginTop={2} gap={8} justifyContent="center">
						{scholars.map((scholar, idx) => {
							return (
								<Paper
									key= {scholar.name + idx}
									component="form"
									sx={{ display: 'flex', width: 300, height: 180, flexDirection: "column" }}
								>
									<Grid 
										container 
										direction="row" 
										justifyContent= 'space-between'
										>
										<Typography margin={2} marginLeft={2} >
											{scholar.name}
										</Typography>
										<Button
											variant="text"
											sx={{ display: 'flex', width: 50, height: 50 }}
										>
											<PushPinIcon sx={{ color: grey[900] }} />
										</Button>
									</Grid>
									<Divider orientation="horizontal" borderBottomWidth= {2} />
									<Grid margin={1}>
										{scholar.tag.map((tag,idx) => {
											return(
												<div key={scholar.name + scholar.tag + idx}>
													<Box
														sx={{ display: 'flex', width: 60, height: 25, backgroundColor: '#e6edec', borderRadius: 1, margin: 1, marginLeft: 2}}
													>
														<Typography marginLeft={1} >
															{tag}
														</Typography>
													</Box>
												</div>
											)
										})}
										
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
