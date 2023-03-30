import React from 'react'

import { ErrorOutline } from '@mui/icons-material'
import { Button, Container, Typography } from '@mui/material'
import { useRouter } from 'next/router'

const PaymentFailed = () => {
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
			}}
		>
			<ErrorOutline style={{ fontSize: 80, color: '#f44336', marginBottom: 30 }} />
			<Typography variant="h5" align="center" gutterBottom>
				Payment Failed!
			</Typography>
			<Typography variant="subtitle1" align="center" gutterBottom>
				Sorry, your payment was not successful. Please try again later or contact customer support for
				assistance.
			</Typography>
			<Button
				variant="contained"
				color="primary"
				style={{ marginTop: 30 }}
				onClick={() => {
					router.push('/payment')
				}}
			>
				Try Again
			</Button>
		</Container>
	)
}

export default PaymentFailed
