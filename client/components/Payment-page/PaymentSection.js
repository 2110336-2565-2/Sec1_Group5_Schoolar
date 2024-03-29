import PaymentComponent from '@components/Payment-page/PaymentComponent'
import { Center } from '@components/common'
import { Box, Grid } from '@mui/material'

function PaymentSection({ scholarships }) {
	return (
		<Box
			sx={{
				width: '90%',
				height: '50vh',
				borderRadius: 3,
				backgroundColor: '#2E3662',
				overflow: 'auto',
				boxShadow: 12,
				p: { xs: 2, sm: 4 },
				mt: 1,
				mb: 2,
			}}
		>
			<Grid container spacing={2}>
				{scholarships.map((item, index) => {
					return (
						<Grid item xs={12} md={6} xl={4} key={index}>
							<PaymentComponent scholarship={item} key={index} />
						</Grid>
					)
				})}
			</Grid>
		</Box>
	)
}

export default PaymentSection
