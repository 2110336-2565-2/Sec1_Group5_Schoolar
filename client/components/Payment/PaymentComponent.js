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

	const calculateNextPaymentDate = async () => {
		try {
			const nextDate = await getNextPaymentDate()
			const year = parseInt(nextDate.slice(0, 4))
			const month = parseInt(nextDate.slice(5, 7)) - 1
			const day = parseInt(nextDate.slice(8, 10))
			const hour = parseInt(nextDate.slice(11, 13))
			const minute = parseInt(nextDate.slice(14, 16))
			const second = parseInt(nextDate.slice(17, 19))
			const millisecond = parseInt(nextDate.slice(20, 23))

			const date = new Date(Date.UTC(year, month, day, hour, minute, second, millisecond))
			const timeDiff = date.getTime() - Date.now()
			const daysTillNextPayment = Math.ceil(timeDiff / (1000 * 60 * 60 * 24))
			return daysTillNextPayment
		} catch (err) {
			console.log(err)
		}
	}

	const [nextPaymentDate, setNextPaymentDate] = useState(0)
	const [isSubscribed, setIsSubscribed] = useState(false)

	useEffect(() => {
		if (scholarship.subscription !== undefined) {
			setIsSubscribed(true)
			const calculateAndSetNextPaymentDate = async () => {
				const result = await calculateNextPaymentDate()
				setNextPaymentDate(result)
			}
			calculateAndSetNextPaymentDate()
		}
	}, [])

	// TODO: FIX UI CRASH
	return (
		<Box
			sx={{
				width: '100%',
				height: '25%',
				margin: 2,
				backgroundColor: '#e6edec',
				borderRadius: 5,
			}}
		>
			<Grid container direction="row" justifyContent="space-between">
				<Grid
					sx={{
						width: '60%',
					}}
				>
					<Typography variant="h6" padding={2.5} marginLeft={2}>
						{scholarship.scholarshipName}
					</Typography>
				</Grid>
				<Grid
					container
					direction="column"
					justifyContent="space-between"
					sx={{
						width: '30%',
						padding: 2.5,
					}}
				>
					{/* //? จัดการกับเดดไลน์การ subscribe ยังไงเพราะไม่มีการเก็บวันที่สร้าง scholarship ใน db */}
					{isSubscribed && (
						<Typography variant="body1" align="center">
							Next payment: <span style={{ color: '#FF0000' }}>{nextPaymentDate} days</span>
						</Typography>
					)}

					<Grid sx={{ pl: '25%', pr: '25%', pt: '2%' }}>
						{isSubscribed ? (
							<Button
								variant="contained"
								sx={{ borderRadius: 5, width: '100%', backgroundColor: '#C1C1C1' }}
								onClick={handleUnSubscribe}
							>
								Subscribed
							</Button>
						) : (
							<Button
								variant="contained"
								sx={{ borderRadius: 5, width: '100%' }}
								onClick={handleSubscribe}
							>
								Subscribe
							</Button>
						)}
					</Grid>
					{!isSubscribed && (
						<Typography variant="body1" align="center" color="#9B9B9B">
							99฿ / month
						</Typography>
					)}
				</Grid>
			</Grid>
		</Box>
	)
}

export default PaymentComponent
