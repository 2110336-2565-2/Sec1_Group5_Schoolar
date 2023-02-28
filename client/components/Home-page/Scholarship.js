import PushPinIcon from '@mui/icons-material/PushPin'
import { Box, Button, Divider, Grid, Paper, Typography } from '@mui/material'
import { grey,blue } from '@mui/material/colors'
import { useState } from 'react'
import Link from 'next/link'
import { useAuth } from '@/context/AuthContext'


function Scholarship(props) {
	const { auth } = useAuth()
	return (
		<Grid container marginTop={2} marginBottom={4} gap="20px 30px" justifyContent="center">
			{props.items.length === 0 ? (
				<Typography variant="h6" color="textSecondary" gutterBottom>
					There is no matching scholarship
				</Typography>
			) : null}
			{props.items.map((scholar) => {
				return (
					<Paper
						key={scholar._id}
						component="a"
						sx={{
							display: 'flex',
							width: 300,
							height: 180,
							flexDirection: 'column',
						}}
						linkcomponent={Link}
						href={auth && auth.role === 'provider' ? `/scholarship/update-scholarship/${scholar._id}` : ``}
					>
						<Grid container direction="row" justifyContent="space-between">
							<Typography margin={2} marginLeft={2}>
								{scholar.scholarshipName}
							</Typography>
							<Button variant="text" sx={{ display: 'flex', width: 50, height: 50 }}>
								<PushPinIcon sx={{ color: grey[900] }}/>
							</Button>
						</Grid>
						<Divider orientation="horizontal" variant="middle" style={{ borderBottomWidth: 2 }} />
						<Grid margin={1}>
							{/*//TODO Fix tag pls */}
							{scholar.tag?.map((tag, idx) => {
								return (
									<div key={scholar.scholarshipName + scholar.tag + idx}>
										<Box
											sx={{
												display: 'flex',
												width: 60,
												height: 25,
												backgroundColor: '#e6edec',
												borderRadius: 1,
												margin: 1,
												marginLeft: 2,
											}}
										>
											<Typography marginLeft={1}>{tag}</Typography>
										</Box>
									</div>
								)
							})}
						</Grid>
					</Paper>
				)
			})}
		</Grid>
	)
}

export default Scholarship
