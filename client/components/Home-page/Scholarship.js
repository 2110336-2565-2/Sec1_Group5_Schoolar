import { useState } from 'react'
import { useEffect } from 'react'

import PushPinIcon from '@mui/icons-material/PushPin'
import { Box, Button, Divider, Grid, Paper, Typography } from '@mui/material'
import Link from 'next/link'
import { useRouter } from 'next/router'

import { useAuth } from '@/context/AuthContext'
import { axiosPrivate } from '@/pages/api/axios'

import PinScholar from './PinScholar'

function Scholarship(props) {
	const { auth } = useAuth()
	const router = useRouter()
	const [pinScholarships, setPinScholarships] = useState([])

	const fetchData = async () => {
		const student = await axiosPrivate.get(`/student/${auth.username}`)
		setPinScholarships(student.data.student.pinScholarships)
	}

	useEffect(() => {
		fetchData()
	}, [])
	console.log('pinStd:', pinScholarships)
	var active

	return (
		<Grid container marginTop={2} marginBottom={4} gap="20px 30px" justifyContent="center">
			{props.items.length === 0 ? (
				<Typography variant="h6" color="textSecondary" gutterBottom>
					There is no matching scholarship
				</Typography>
			) : null}
			{props.items
				.sort((scholarA, scholarB) => {
					if (pinScholarships.includes(scholarA._id) && pinScholarships.includes(scholarB._id)) {
						return 0 // keep original order
					}
					if (pinScholarships.includes(scholarA._id)) {
						return -1 // sort a before b
					}
					if (pinScholarships.includes(scholarB._id)) {
						return 1 // sort b before a
					}
					return 0
				})
				.map((scholar) => {
					// check if scholarship is in pin scholarship
					if (pinScholarships.includes(scholar._id)){
						active = true
						
					}else{
						active = false
					}
					console.log("scholarship: ",scholar._id)
					console.log("Active in scholarship page:",active)
					return (
						<Paper
							key={scholar._id}
							sx={{
								display: 'flex',
								width: 300,
								height: 180,
								flexDirection: 'column',
							}}>
							<Grid container direction="row" justifyContent="space-between">
								<Typography margin={2} marginLeft={2} sx={{cursor: 'pointer'}}
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
								}}>
									{scholar.scholarshipName}
								</Typography>
								<Button variant="text" sx={{ display: 'flex', width: 50, height: 50 }}>
									<PinScholar pin={active} id={scholar._id} std={auth.username} />
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
