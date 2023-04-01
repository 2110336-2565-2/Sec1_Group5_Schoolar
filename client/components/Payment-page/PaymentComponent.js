import { useEffect, useState } from 'react'
import { React } from 'react'
import { Box, Button, Divider, Grid, Stack, Typography } from '@mui/material'
import { useRouter } from 'next/router'
import useAxiosPrivate from '@/hooks/useAxiosPrivate'
import { useSnackbar } from '@/context/SnackbarContext'

function PaymentComponent({ scholarship }) {
	const axiosPrivate = useAxiosPrivate()
	const router = useRouter()
	const {openSnackbar} = useSnackbar();
	const [nextPaymentDate, setNextPaymentDate] = useState(0)
	const [isSubscribed, setIsSubscribed] = useState(false)
	const handleSubscribe = async () => {
		try {
			const res = await axiosPrivate.post(`/subscription/checkout/${scholarship._id}`)
			router.push(res.data.url)
		} catch (err) {
			console.log(err)
		}
	}

	const handleUnSubscribe = async () => {
		try {
			
			const res = await axiosPrivate.delete(`/subscription/unsubscripe/${scholarship._id}`)
			.then((res)=>{
				setIsSubscribed(false);
				console.log(res.status);
				openSnackbar('Unsubscribe successfully!', 'success')
			}).catch((err)=>{
				console.log("Error unsubscribe");
			})
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


	useEffect(() => {
		axiosPrivate.get(`/subscription/status/${scholarship._id}`)
		.then((res) => {
			setIsSubscribed(res.data.status);
			//subscribe is true
			if(res.data.status){
				const calculateAndSetNextPaymentDate = async () => {
					const nextDate = await axiosPrivate.get(`/subscription/next-payment-date/${scholarship.subscription}`)
					const result = calculateNextPaymentDate(nextDate.data)
					setNextPaymentDate(result)
				}
				calculateAndSetNextPaymentDate();
			}else{
				const date = addDays(scholarship.createdAt, 30)
				const result = calculateNextPaymentDate(formatUTCDate(date))
				setNextPaymentDate(result)
			}
		}).catch((err)=>{
			const date = addDays(scholarship.createdAt, 30)
			const result = calculateNextPaymentDate(formatUTCDate(date))
			setNextPaymentDate(result)
			console.log("error", err.stack);
		})		
	}, [])

	return (
		<Box
			sx={{
				width: '100%',
				height: 160,
				backgroundColor: 'white',
				borderRadius: 5,
			}}
			
		>
			<Grid container direction="row" justifyContent="space-between" sx={{height: '100%'}} alignItems="center">
				<Grid item xs={5} sm={5}>
					<Typography variant="subtitle1" sx={{ fontWeight: 'bold' }} padding={2} marginLeft={{xs: 1, sm: 2}}>
						{scholarship.scholarshipName}
					</Typography>
				</Grid>
				
				<Grid item xs={7} sm={7} >
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
						<Stack direction={{xs: "column", sm:"row"}} spacing={{xs: 0, sm: 2}}>
							<Typography variant="subtitle1" align="center">Next payment: </Typography>
							<Typography variant="subtitle1" align="center">
								<span style={{ color: '#FF0000' }}>{nextPaymentDate}  days</span>
							</Typography>
						</Stack>
						
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
