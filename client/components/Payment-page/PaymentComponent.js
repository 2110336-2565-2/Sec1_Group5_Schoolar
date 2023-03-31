import { useEffect, useState } from 'react'
import { React } from 'react'

import { Box, Button, Divider, Grid, Stack, Typography } from '@mui/material'
import { useRouter } from 'next/router'

import useAxiosPrivate from '@/hooks/useAxiosPrivate'

function PaymentComponent({ scholarship }) {
	const axiosPrivate = useAxiosPrivate()
	const router = useRouter()
	const handleSubscribe = async () => {
		try {
			const res = await axiosPrivate.post(`/subscription/checkout/${scholarship._id}`)
			router.push(res.data.url)
		} catch (err) {
			console.log(err)
		}
	}

	//! No endpoint yet
	const handleUnSubscribe = async () => {
		try {
			const res = await axiosPrivate.delete(`/subscription/${scholarship.subscription}`)
			return res.data
		} catch (err) {
			console.log(err)
		}
	}

	const getNextPaymentDate = async () => {
		try {
			const res = await axiosPrivate.get(`/subscription/next-payment-date/${scholarship.subscription}`)
			return res.data
		} catch (err) {
			console.log(err)
		}
	}

	const calculateNextPaymentDate = (date) => {
		try {
			const year = parseInt(date.slice(0, 4))
			const month = parseInt(date.slice(5, 7)) - 1
			const day = parseInt(date.slice(8, 10))
			const hour = parseInt(date.slice(11, 13))
			const minute = parseInt(date.slice(14, 16))
			const second = parseInt(date.slice(17, 19))
			const millisecond = parseInt(date.slice(20, 23))

			const utcDate = new Date(Date.UTC(year, month, day, hour, minute, second, millisecond))
			const timeDiff = utcDate.getTime() - Date.now()
			const daysTillNextPayment = Math.ceil(timeDiff / (1000 * 60 * 60 * 24))
			return daysTillNextPayment
		} catch (err) {
			console.log(err)
		}
	}

	function addDays(date, days) {
		var result = new Date(date)
		result.setDate(result.getDate() + days)
		return result
	}

	const formatUTCDate = (date) => {
		const year = date.getUTCFullYear()
		const month = date.getUTCMonth() + 1
		const day = date.getUTCDate()
		const hour = date.getUTCHours()
		const minute = date.getUTCMinutes()
		const second = date.getUTCSeconds()

		const pad = (num) => {
			return num < 10 ? '0' + num : num
		}

		return `${year}-${pad(month)}-${pad(day)}T${pad(hour)}:${pad(minute)}:${pad(second)}.000Z`
	}

	const [nextPaymentDate, setNextPaymentDate] = useState(0)
	const [isSubscribed, setIsSubscribed] = useState(false)

	useEffect(() => {
		if (scholarship.subscription !== undefined) {
			setIsSubscribed(true)
			const calculateAndSetNextPaymentDate = async () => {
				const nextDate = await axiosPrivate.get(`/subscription/next-payment-date/${scholarship.subscription}`)
				const result = calculateNextPaymentDate(nextDate.data)
				setNextPaymentDate(result)
			}
			calculateAndSetNextPaymentDate()
		} else {
			const date = addDays(scholarship.createdAt, 30)
			const result = calculateNextPaymentDate(formatUTCDate(date))
			setNextPaymentDate(result)
		}
	}, [])

	// TODO: FIX UI CRASH
	return (
		<Box
			sx={{
				width: '100%',
				height: 130,
				backgroundColor: 'white',
				borderRadius: 5,
			}}
		>
			<Grid container direction="row" justifyContent="space-between">
				<Grid item xs={4} sm={5}>
					<Typography variant="subtitle1" sx={{ fontWeight: 'bold' }} padding={2} marginLeft={{xs: 1, sm: 2}}>
						{scholarship.scholarshipName}
					</Typography>
				</Grid>
				
				<Grid item xs={8} sm={7}>
				<Stack
					direction="column"
					spacing={1}
					sx={{p:2}}
				>
					{nextPaymentDate < 0 ? (
						<Typography variant="subtitle1" align="center">
							<span style={{ color: '#FF0000' }}>Overdue</span>
						</Typography>
					) : (
						<Typography variant="subtitle1" align="center">
							Next payment: <span style={{ color: '#FF0000' }}>{nextPaymentDate} days</span>
						</Typography>
					)}

					{isSubscribed ? (
						<Button
							variant="contained"
							size="small"
							sx={{ borderRadius: 5, backgroundColor: '#C1C1C1' }}
							onClick={handleUnSubscribe}
						>
							Unsubscribed
						</Button>
					) : (
						<Button
							variant="contained"
							size="small"
							sx={{ borderRadius: 5 }}
							onClick={handleSubscribe}
						>
							Subscribe
						</Button>
					)}

					{!isSubscribed && (
						<Typography variant="body1" align="center" color="#9B9B9B">
							99฿ / month
						</Typography>
					)}
				</Stack>
				</Grid>
				
			</Grid>
		</Box>
	)
}

export default PaymentComponent