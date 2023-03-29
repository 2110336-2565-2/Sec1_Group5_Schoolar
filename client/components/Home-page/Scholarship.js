import { useState } from 'react'

import PushPinIcon from '@mui/icons-material/PushPin'
import { Box, Button, Divider, Grid, Paper, Typography } from '@mui/material'
import { blue, grey } from '@mui/material/colors'
import Link from 'next/link'
import { useRouter } from 'next/router'

import { useAuth } from '@/context/AuthContext'
import ScholarshipTags from './ScholarshipTag'

function Scholarship(props) {
	const { auth } = useAuth()
	const router = useRouter()
	return (
		<Grid container marginTop={2} marginBottom={4} gap="60px 60px" justifyContent="center">
			{props.items.length === 0 ? (
				<Typography variant="h6" color="textSecondary" gutterBottom>
					There is no matching scholarship
				</Typography>
			) : null}
			{props.items.map((scholar) => {
				return (
					<Paper
						key={scholar._id}
						sx={{
							display: 'flex',
							width: 340,
							height: 170,
							flexDirection: 'column',
							cursor: 'pointer',
						}}
						onClick={() => {
							if (auth && auth.role === 'provider') {
								router.push({
									pathname: 'scholarship/DetailScholarship',
									query: { data: JSON.stringify(scholar) },
								})
								//router.push(`/scholarship/update-scholarship/${scholar._id}`)
							} else {
								router.push({
									pathname: 'scholarship/DetailScholarship',
									query: { data: JSON.stringify(scholar) },
								})
							}
						}}
					>
						<Grid container direction="row" justifyContent="space-between">
							<Typography margin={2} marginLeft={2}>
								{scholar.scholarshipName}
							</Typography>
							<Button variant="text" sx={{ display: 'flex', width: 50, height: 50 }}>
								<PushPinIcon sx={{ color: grey[900] }} />
							</Button>
						</Grid>
						<Divider orientation="horizontal" variant="middle" style={{ borderBottomWidth: 2 }} />
						<ScholarshipTags scholar={scholar} />
						{/* <Grid margin={1}>
							<Typography
								align="center"
								sx={{
									color: 'white',
									backgroundColor: '#83A3FF',
									borderRadius: 5,
								}}
								marginLeft={1}
							>
								{scholar.typeOfScholarship}
							</Typography>
							<Typography
								align="center"
								sx={{
									color: 'white',
									backgroundColor: '#FFAC5F',
									borderRadius: 5,
								}}
								marginLeft={1}
							>
								{scholar.degree}
							</Typography>
							<Typography
								align="center"
								sx={{
									color: 'white',
									backgroundColor: '#F88196',
									borderRadius: 5,
								}}
								marginLeft={1}
							>
								{scholar.program}
							</Typography>
						</Grid> */}
					</Paper>
				)
			})}
		</Grid>
	)
}

export default Scholarship
