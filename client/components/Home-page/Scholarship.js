import { useState } from 'react'

import CalendarTodayIcon from '@mui/icons-material/CalendarToday'
import PushPinIcon from '@mui/icons-material/PushPin'
import { Box, Button, Chip, Divider, Grid, Paper, Typography } from '@mui/material'
import { blue, grey } from '@mui/material/colors'
import Link from 'next/link'
import { useRouter } from 'next/router'

import { useAuth } from '@/context/AuthContext'

import ScholarshipTags from './ScholarshipTag'

const changeDateToString = (date) => {
	if (!date) return null
	const dateObj = new Date(date)
	const day = dateObj.getDate()
	const monthIndex = dateObj.getMonth()
	const year = dateObj.getFullYear()
	const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
	const monthName = monthNames[monthIndex]
	return `${day} ${monthName} ${year}`
}
function Scholarship(props) {
	const { auth } = useAuth()
	const router = useRouter()
	return (
		<Grid container marginTop={2} marginBottom={4} gap="30px 60px" justifyContent="center">
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
							minHeight: 240,
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
							<Grid item xs={10} md={10}>
								<Typography
									sx={{ display: 'flex' }}
									variant="h5"
									margin={2}
									marginLeft={2}
									fontWeight={'bold'}
								>
									{scholar.scholarshipName}
								</Typography>
							</Grid>
							<Grid item xs={2} md={2}>
								<Button variant="text" sx={{ display: 'flex', width: 50, height: 50 }}>
									<PushPinIcon sx={{ color: grey[900] }} />
								</Button>
							</Grid>
						</Grid>
						<Chip
							sx={{ borderRadius: 0, backgroundColor: '#AFB4C3' }}
							icon={<CalendarTodayIcon />}
							color="info"
							label={
								scholar.applicationDeadline ? changeDateToString(scholar.applicationDeadline) : 'TBD'
							}
						/>
						<ScholarshipTags scholar={scholar} />
					</Paper>
				)
			})}
		</Grid>
	)
}

export default Scholarship
