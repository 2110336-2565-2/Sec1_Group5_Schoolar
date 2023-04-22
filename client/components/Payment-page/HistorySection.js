import { useEffect, useState } from 'react'

import CalendarTodayIcon from '@mui/icons-material/CalendarToday'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import { Box, Grid, Hidden, Stack, Typography } from '@mui/material'

import { useSnackbar } from '@/context/SnackbarContext'
import useAxiosPrivate from '@/hooks/useAxiosPrivate'

const HistorySection = ({ scholarships }) => {
	//set subscription
	const [subscription, setSubscription] = useState([])
	const axiosPrivate = useAxiosPrivate()
	const { openSnackbar } = useSnackbar()

	const changeDateToString = (date) => {
		if (!date) return null
		const dateObj = new Date(date)
		const day = dateObj.getDate()
		const monthIndex = dateObj.getMonth()
		const year = dateObj.getFullYear()
		const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
		const monthName = monthNames[monthIndex]
		let hour = dateObj.getHours()
		const minute = dateObj.getMinutes()
		const minuteString = minute >= 10 ? '' + minute : '0' + minute
		const ampm = hour >= 12 ? 'PM' : 'AM'
		hour %= 12
		hour = hour ? hour : 12 // convert hour 0 to 12
		return `${day} ${monthName} ${year} ${hour}:${minuteString} ${ampm}`
	}

	useEffect(() => {
		scholarships.map((item) => {
			if (item.subscription) {
				axiosPrivate
					.get(`/subscription/payment-history/${item.subscription}`)
					.then((res) => {
						setSubscription((subscription) => {
							const scholarshipName = res.data.history.paid[0].scholarshipName
							const alreadyExists = subscription.some((item) => item.scholarship === scholarshipName)
							if (alreadyExists) {
								return subscription
							} else {
								return [...subscription, { scholarship: scholarshipName, paid: res.data.history.paid }]
							}
						})
					})
					.catch((err) => {
						console.log('Error at getting payment history')
						openSnackbar('Error at getting payment history!', 'error')
					})
			}
		})
	}, [scholarships])

	const data = [
		{
			scholarship: 'test1',
			paid: [
				{ date: '21 July 2023  2:30pm', amountPaid: 0 },
				{ date: '21 July 2023  2:30pm', amountPaid: 10 },
				{ date: '21 July 2023  2:30pm', amountPaid: 0 },
				{ date: '21 July 2023  2:30pm', amountPaid: 0 },
				{ date: '21 July 2023  2:30pm', amountPaid: 0 },
				{ date: '21 July 2023  2:30pm', amountPaid: 0 },
				{ date: '21 July 2023  2:30pm', amountPaid: 0 },
				{ date: '21 July 2023  2:30pm', amountPaid: 10 },
			],
		},
		{
			scholarship: 'test2',
			paid: [
				{ date: '21 July 2023  2:30pm', amountPaid: 0 },
				{ date: '21 July 2023  2:30pm', amountPaid: 10 },
				{ date: '21 July 2023  2:30pm', amountPaid: 0 },
				{ date: '21 July 2023  2:30pm', amountPaid: 0 },
			],
		},
		{
			scholarship: 'test3',
			paid: [
				{ date: '21 July 2023  2:30pm', amountPaid: 0 },
				{ date: '21 July 2023  2:30pm', amountPaid: 10 },
				{ date: '21 July 2023  2:30pm', amountPaid: 0 },
				{ date: '21 July 2023  2:30pm', amountPaid: 0 },
			],
		},
	]

	const ComponentDatePaid = ({ data }) => {
		return (
			<>
				{data.map((item, index) => {
					return (
						<Box
							key={index}
							sx={{
								borderRadius: 5,
								border: 1,
								borderColor: 'black',
								backgroundColor: 'primary.light',
								p: 1,
								m: { xs: 1, sm: 2 },
							}}
						>
							<Grid container width="100%" spacing={2} justifyContent="space-between">
								<Grid item xs={6}>
									<Stack direction="row" alignItems="center" spacing={1}>
										<Hidden only="xs">
											<CalendarTodayIcon />
										</Hidden>

										<Typography sx={{ typography: { xs: 'body2', sm: 'body1' } }}>
											{changeDateToString(item.date)}
										</Typography>
									</Stack>
								</Grid>
								<Grid item xs={6}>
									<Stack direction="row" alignItems="center" spacing={1}>
										<Hidden only="xs">
											<CheckCircleIcon color="success" />
										</Hidden>
										<Typography sx={{ color: 'green', typography: { xs: 'body2', sm: 'body1' } }}>
											Amount paid {item.amount} {item.currency}
										</Typography>
									</Stack>
								</Grid>
							</Grid>
						</Box>
					)
				})}
			</>
		)
	}

	const ComponentScholarshipPaid = ({ data }) => {
		return (
			<Box
				sx={{
					minWidth: { xs: '33vh', sm: '60vh' },
					height: { xs: '40vh', sm: '50vh' },
					borderRadius: { xs: 7, sm: 5 },
					backgroundColor: 'primary.light',
					boxShadow: 12,
					p: { xs: 1, sm: 2 },
					overflow: 'auto',
				}}
			>
				<Typography variant="h5" sx={{ fontWeight: 'bold', textAlign: 'center' }}>
					{data.scholarship}
				</Typography>
				<ComponentDatePaid data={data.paid} />
			</Box>
		)
	}

	return (
		<Box
			sx={{
				width: '90%',
				height: { xs: '60vh', sm: '75vh' },
				borderRadius: 5,
				backgroundColor: '#E5E5E5',
				boxShadow: 12,
				p: { xs: 1, sm: 4 },
				mt: 1,
				mb: 2,
				//m: { xs: 3, sm: 3 },
			}}
		>
			<Typography variant="h2" sx={{ fontWeight: 'bold' }} padding={1}>
				History
			</Typography>

			<Stack
				direction="row"
				spacing={{ xs: 1, sm: 3 }}
				sx={{ m: { xs: 1, sm: 2 }, p: { xs: 1, sm: 2 }, overflow: 'auto' }}
			>
				{subscription.map((item, index) => {
					return <ComponentScholarshipPaid key={index} data={item} />
				})}
			</Stack>
		</Box>
	)
}

export default HistorySection
