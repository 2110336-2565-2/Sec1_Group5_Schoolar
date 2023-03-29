import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

import { Center, VStack } from '@components/common'
import CalendarTodayIcon from '@mui/icons-material/CalendarToday'
import { Box, Button, Chip, Divider, Grid, Stack, Typography } from '@mui/material'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import { useRouter } from 'next/router'

import { useAuth } from '@/context/AuthContext'
import { useSnackbar } from '@/context/SnackbarContext'
import useAxiosPrivate from '@/hooks/useAxiosPrivate'

const DetailScholarship = () => {
	const { openSnackbar } = useSnackbar()
	const {
		register,
		handleSubmit,
		formState: { errors },
		setValue,
		getValues,
		control,
		watch,
		trigger,
	} = useForm({ mode: 'onBlur' })
	const { auth } = useAuth()
	const router = useRouter()
	const detail = JSON.parse(router.query.data)
	//some conent only show to provider
	const [isProvider, setIsProvider] = useState(false)
	const [organizationName, setOrganizationName] = useState('')
	//Change applecation dead line Date type to string
	const [appDate, setAppDate] = useState('')

	const axiosPrivate = useAxiosPrivate()

	if (!auth) {
		router.push('/login')
	}

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
	useEffect(() => {
		axiosPrivate.get(`/provider/name/${detail.provider}`).then((res) => {
			if (auth && auth.role === 'provider') {
				setIsProvider(true)
			}
			setOrganizationName(res.data.organizationName)
			setAppDate(changeDateToString(detail.applicationDeadline))
			console.log('Organization ', res.data.organizationName)
		})
	}, [])

	const DetailComponent = ({ topic, details }) => {
		return (
			<Grid item xs={12} sm={4}>
				<Stack
					direction={{ xs: 'row', sm: 'column' }}
					justifyContent={{ xs: 'flex-start', sm: 'center' }}
					spacing={{ xs: 2, sm: 0 }}
					alignItems={{ xs: 'flex-start', sm: 'stretch' }}
				>
					<Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
						{topic}
					</Typography>
					<Typography variant="body1" sx={{ wordWrap: 'break-word' }}>
						{details ? details : 'Not Specified'}
					</Typography>
				</Stack>
			</Grid>
		)
	}

	return (
		<Center>
			<Box
				sx={{
					width: '80%',
					borderRadius: 5,
					backgroundColor: 'primary.light',
					boxShadow: 12,
					px: { xs: 2, sm: 4, md: 6 },
					pt: { xs: 2, sm: 2.5, md: 3 },
					pb: { xs: 3, sm: 4, md: 5 },
					mx: { xs: 2, sm: 3, md: 4 },
					mt: { xs: 2, sm: 3 },
					mb: 3,
				}}
			>
				<Stack spacing={2} justifyContent={{ xs: 'center', sm: 'start' }} alignItems="center">
					<Stack
						width="100%"
						direction={{ xs: 'column', sm: 'row' }}
						justifyContent={{ xs: 'center' }}
						alignItems="center"
						spacing={{ xs: 1, sm: 2 }}
						sx={{ mb: { xs: 2, md: 3 } }}
					>
						<Typography
							variant="h3"
							sx={{
								textAlign: { xs: 'center', sm: 'left' },
								fontWeight: 'bold',
								color: 'text.main',
							}}
						>
							{detail.scholarshipName}
						</Typography>
						{appDate && (
							<Chip
								icon={<CalendarTodayIcon />}
								sx={{ px: 0.5, py: 2.25 }}
								color="info"
								label={`Due Date: ${appDate}`}
							/>
						)}
					</Stack>
					<Stack width="100%" spacing={2}>
						{isProvider && (
							<Stack
								direction={{ xs: 'column', sm: 'row' }}
								sx={{ pl: 2 }}
								justifyContent="space-between"
							>
								<Typography item xs={12} sx={6} variant="subtitle1">
									Payment due date: {detail.paymentDueDate}
								</Typography>
								{/* Fix state of status later */}
								<Typography item xs={12} sx={6} variant="subtitle1">
									Status: {detail.paymentStatus ? 'Success' : 'Pending'}
								</Typography>
								<Divider />
							</Stack>
						)}
						<Grid container width="100%" spacing={2}>
							<DetailComponent topic="Degree" details={detail.degree} />
							<DetailComponent topic="Field of Interest" details={detail.fieldOfInterest} />
							<DetailComponent topic="Program/Faculty" details={detail.program} />
							<DetailComponent topic="Target Nation" details={detail.targetNation} />
							<DetailComponent topic="Type of Scholarship" details={detail.typeOfScholarship} />
							<DetailComponent topic="Minimum GPAX" details={detail.gpax} />
							<DetailComponent topic="Amount (Baht)" details={detail.amount} />
							<DetailComponent topic="Quota (person)" details={detail.quota} />
							<DetailComponent topic="Provided By" details={organizationName} />
						</Grid>
						<Box sx={{ pb: 1 }}>
							<Typography variant="subtitle1" sx={{ fontWeight: 'bold', mt: { xs: 2, sx: 0 } }}>
								Scholarship Detail
							</Typography>
							<Divider />
							<Typography variant="body1" sx={{ mt: 1 }}>
								{detail.detail ? detail.detail : 'Not Specified'}
							</Typography>
						</Box>
					</Stack>

					<Stack width="100%" spacing={3} direction="row" justifyContent="space-evenly">
						<Button
							sx={{ width: '100%' }}
							variant="contained"
							onClick={() => {
								router.push('/')
							}}
						>
							Back
						</Button>
						{isProvider && (
							<Button
								sx={{ width: '100%', color: '#FFF' }}
								variant="contained"
								color="danger"
								onClick={() => {
									axiosPrivate.delete(`/scholarship/${detail._id}`).then(() => {
										openSnackbar('Delete scholarship successfully!', 'success')
										router.push('/')
									})
								}}
							>
								Delete
							</Button>
						)}
					</Stack>
					{isProvider && (
						<Button
							sx={{ width: '100%' }}
							variant="contained"
							onClick={() => {
								router.push(`/scholarship/update-scholarship/${detail._id}`)
							}}
						>
							Edit
						</Button>
					)}
				</Stack>
			</Box>
		</Center>
	)
}

export default DetailScholarship
