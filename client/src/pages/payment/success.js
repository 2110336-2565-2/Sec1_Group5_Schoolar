import React from 'react'

import { CheckCircleOutline } from '@mui/icons-material'
import { Button, Container, Typography } from '@mui/material'
import { useRouter } from 'next/router'

const PaymentSuccess = () => {
	const router = useRouter()

	return (
		<Container
			maxWidth="sm"
			style={{
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				backgroundColor: 'white',
				minHeight: '100vh',
				justifyContent: 'center',
				width: '100vw',
			}}
		>
			<CheckCircleOutline style={{ fontSize: 80, color: '#4caf50', marginBottom: 30 }} />
			<Typography variant="h5" align="center" gutterBottom>
				Payment Successful!
			</Typography>
			<Typography variant="subtitle1" align="center" gutterBottom>
				Thank you for your payment. Your transaction has been completed successfully.
			</Typography>
			<Button
				variant="contained"
				color="primary"
				style={{ marginTop: 30 }}
				onClick={() => {
					router.push('/')
				}}
			>
				Back to Home
			</Button>
		</Container>
	)
}

export default PaymentSuccess
