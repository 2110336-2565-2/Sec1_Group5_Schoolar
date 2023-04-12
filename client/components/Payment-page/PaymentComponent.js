import { useEffect, useState } from 'react'
import { React } from 'react'

import ScholarshipTags from '@components/Home-page/ScholarshipTag'
import {
	Box,
	Button,
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

function PaymentComponent({ scholarship, scholar }) {
	const axiosPrivate = useAxiosPrivate()
	const router = useRouter()
	const { auth } = useAuth()
	const { openSnackbar } = useSnackbar()
	const [nextPaymentDate, setNextPaymentDate] = useState(0)
	const [isSubscribed, setIsSubscribed] = useState(false)
	const [openConfirmDeactivate, setOpenConfirmDeactivate] = useState(false)

	const handleSubscribe = async () => {
		try {
			const res = await axiosPrivate.post(`/subscription/checkout/${scholarship._id}`)
			router.push(res.data.url)
		} catch (err) {
			console.log(err)
		}
	}

	const handleUnSubscribe = async () => {
		axiosPrivate
			.delete(`/subscription/unsubscripe/${scholarship._id}`)
			.then((res) => {
				setIsSubscribed(false)
				openSnackbar('Deactivate successfully!', 'success')
				setOpenConfirmDeactivate(false)
			})
			.catch((err) => {
				console.log('Error deactivate')
				openSnackbar(
					'Sorry, we were unable to deactivate the scholarship. Please try again later or contact our support team for assistance.',
					'error',
				)
			})
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
			openSnackbar('Error calculating next payment date!', 'error')
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
		axiosPrivate
			.get(`/subscription/status/${scholarship._id}`)
			.then((res) => {
				setIsSubscribed(res.data.status)
				//subscribe is true
				if (res.data.status) {
					const calculateAndSetNextPaymentDate = async () => {
						const nextDate = await axiosPrivate.get(
							`/subscription/next-payment-date/${scholarship.subscription}`,
						)
						const result = calculateNextPaymentDate(nextDate.data)
						setNextPaymentDate(result)
					}
					calculateAndSetNextPaymentDate()
				} else {
					//scholarship not activate
					const date = addDays(scholarship.createdAt, 30)
					const result = calculateNextPaymentDate(formatUTCDate(date))
					setNextPaymentDate(result)
				}
			})
			.catch((err) => {
				const date = addDays(scholarship.createdAt, 30)
				const result = calculateNextPaymentDate(formatUTCDate(date))
				setNextPaymentDate(result)
				console.log('error', err.stack)
				openSnackbar('Error fetching data!', 'error')
			})
	}, [])

	return (
		<Box
			sx={{
				width: '100%',
				backgroundColor: 'white',
				borderRadius: 5,
				height: '100%',
			}}
		>
			<Typography variant="h5" sx={{ fontWeight: 'bold', pt: 2, pl: 2 }} marginLeft={{ xs: 1, sm: 2 }}>
				{scholarship.scholarshipName}
			</Typography>
			<Grid container direction="row" alignItems="flex-start">
				<Grid item xs={6}>
					<Grid marginLeft={{ xs: 1, sm: 2 }}>
						<ScholarshipTags scholar={scholarship} size="small" sx={{ p: 0 }} />
					</Grid>
				</Grid>
				<Grid item xs={6}>
					<Stack direction="column" spacing={1} sx={{ px: 4, py: 2.25 }}>
						<Dialog open={openConfirmDeactivate} onClose={() => setOpenConfirmDeactivate(false)}>
							<DialogTitle sx={{ fontWeight: 'bold' }}>{'Deactivate this scholarship?'}</DialogTitle>
							<DialogContent>
								<DialogContentText id="alert-dialog-description">
									Please note that by deactivating this scholarship, it will be immediately removed
									from our website and any search results. Additionally, any payment made towards this
									scholarship will be cancelled without a refund. This action cannot be undone. Are
									you sure you want to with deactivating this scholarship?
								</DialogContentText>
							</DialogContent>
							<DialogActions>
								<Button onClick={() => setOpenConfirmDeactivate(false)}>Disagree</Button>
								<Button onClick={() => handleUnSubscribe()}>Agree</Button>
							</DialogActions>
						</Dialog>
						{isSubscribed ? (
							<Button
								variant="contained"
								size="small"
								sx={{ borderRadius: 5, backgroundColor: '#C1C1C1' }}
								onClick={() => setOpenConfirmDeactivate(true)}
							>
								Deactivate
							</Button>
						) : (
							<Button
								variant="contained"
								size="small"
								sx={{ borderRadius: 5 }}
								onClick={handleSubscribe}
								fullWidth
							>
								Activate
							</Button>
						)}
						{isSubscribed &&
							(nextPaymentDate < 0 ? (
								<Typography variant="subtitle1" align="center">
									<span style={{ color: '#FF0000' }}>Overdue</span>
								</Typography>
							) : (
								<Stack
									direction={{ xs: 'column', sm: 'row' }}
									spacing={{ xs: 0, sm: 2 }}
									justifyContent={'space-evenly'}
								>
									<Typography variant="subtitle1" align="center">
										Next payment:{' '}
									</Typography>
									<Typography variant="subtitle1" align="center">
										<span style={{ color: '#FF0000' }} align="center">
											{nextPaymentDate} days
										</span>
									</Typography>
								</Stack>
							))}
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
