import React, { useEffect, useState } from 'react'

import { Center } from '@components/common'
import CalendarTodayIcon from '@mui/icons-material/CalendarToday'
import {
	Box,
	Button,
	Chip,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	Divider,
	Grid,
	Stack,
	Typography,
} from '@mui/material'
import { useRouter } from 'next/router'

import { useAuth } from '@/context/AuthContext'
import { useSnackbar } from '@/context/SnackbarContext'
import useAxiosPrivate from '@/hooks/useAxiosPrivate'

const DetailScholarship = () => {
	const { openSnackbar } = useSnackbar()
	const { auth } = useAuth()
	if (!auth) {
		router.push('/login')
	}

	const router = useRouter()
	const { id } = router.query // scholarship id

	const [detail, setDetail] = useState({
		scholarshipName: 'Loading..',
		degree: 'Loading..',
		gpax: 'Loading..',
		program: 'Loading..',
		targetNation: 'Loading..',
		typeOfScholarship: 'Loading..',
		fieldOfInterest: 'Loading..',
		quota: 'Loading..',
		amount: 'Loading..',
		detail: 'Loading..',
	})

	const [organizationName, setOrganizationName] = useState('Loading..')
	const [openConfirmDelete, setOpenConfirmDelete] = useState(false)

	const axiosPrivate = useAxiosPrivate()

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

	function toTitleCase(str) {
		return str.replace(/\b\w/g, function (char) {
			return char.toUpperCase()
		})
	}

	useEffect(() => {
		async function fetchData() {
			try {
				const scholarship = await axiosPrivate.get(`/scholarship/${id}`)
				setDetail({
					...scholarship.data.data,
					targetNation: toTitleCase(scholarship.data.data.targetNation),
					fieldOfInterest: toTitleCase(scholarship.data.data.fieldOfInterest),
					appDate: changeDateToString(scholarship.data.data.applicationDeadline),
				})

				const provider = await axiosPrivate.get(`/provider/name/${scholarship.data.data.provider}`)
				setOrganizationName(provider.data.organizationName)
			} catch (err) {
				console.log(err)
				openSnackbar('Error fetching data!', 'error')
			}
		}
		fetchData()
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
						{detail.appDate && (
							<Chip
								icon={<CalendarTodayIcon />}
								sx={{ px: 0.5, py: 2.25 }}
								color="info"
								label={`Due Date: ${detail.appDate}`}
							/>
						)}
					</Stack>
					<Stack width="100%" spacing={2}>
						<Grid container width="100%" spacing={2}>
							<DetailComponent topic="Degree" details={detail.degree} />
							<DetailComponent topic="Field of Interest" details={detail.fieldOfInterest} />
							<DetailComponent topic="Program/Faculty" details={detail.program} />
							<DetailComponent topic="Target Nation" details={detail.targetNation} />
							<DetailComponent topic="Type of Scholarship" details={detail.typeOfScholarship} />
							<DetailComponent topic="Minimum GPAX" details={detail.gpax} />
							<DetailComponent topic="Amount (Baht)" details={detail.amount} />
							<DetailComponent topic="Quota (Person)" details={detail.quota} />
							<DetailComponent topic="Provided By" details={organizationName} />
						</Grid>
						<Box sx={{ pb: 1 }}>
							<Typography variant="subtitle1" sx={{ fontWeight: 'bold', mt: { xs: 2, sx: 0 } }}>
								Scholarship Detail
							</Typography>
							<Divider />
							<Typography variant="body1" sx={{ mt: 1, whiteSpace: 'pre-line' }}>
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
						{auth.role === 'provider' && (
							<Button
								sx={{ width: '100%', color: '#FFF' }}
								variant="contained"
								color="danger"
								onClick={() => setOpenConfirmDelete(true)}
							>
								Delete
							</Button>
						)}
						<Dialog open={openConfirmDelete} onClose={() => setOpenConfirmDelete(false)}>
							<DialogTitle sx={{ fontWeight: 'bold' }}>{'Delete this scholarship?'}</DialogTitle>
							<DialogContent>
								<DialogContentText id="alert-dialog-description">
									By deleting this scholarship, all associated data and information will be
									permanently removed from our system. This action cannot be undone. Please note that
									this scholarship will be removed immediately from our website and any search
									results. Also, any payment made towards this scholarship will be cancelled without a
									refund. Are you sure you want to proceed with the deletion?
								</DialogContentText>
							</DialogContent>
							<DialogActions>
								<Button onClick={() => setOpenConfirmDelete(false)}>Disagree</Button>
								<Button
									onClick={async () => {
										try {
											await axiosPrivate.delete(`/subscription/unsubscripe/${detail._id}`)
											await axiosPrivate.delete(`/scholarship/${detail._id}`)
											openSnackbar('Delete scholarship successfully!', 'success')
											router.push('/')
										} catch (err) {
											openSnackbar(
												'Sorry, we were unable to delete the scholarship. Please try again later or contact our support team for assistance.',
												'error',
											)
											console.log(err)
										}
									}}
								>
									Agree
								</Button>
							</DialogActions>
						</Dialog>
					</Stack>
					{auth.role === 'provider' && (
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
