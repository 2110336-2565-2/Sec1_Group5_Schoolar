import { Grid, Typography } from '@mui/material'
import { Box } from '@mui/system'
import Image from 'next/image'

const FormPrimary = ({ form }) => {
	return (
		<Grid
			container
			spacing={2}
			sx={{
				bgcolor: 'blue',
				// minHeight: '100vh',
				// height: '100%',
				width: '100%',
				p: 0,
				m: 0,
			}}
		>
			<Grid xs={12} sm={6} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
				<Image
					src="/primary/slogan.png"
					alt="overlay"
					width={0}
					height={0}
					sizes="100vw"
					priority="false"
					style={{
						width: '80%',
						height: 'auto',
					}}
				/>
			</Grid>
			<Grid xs={12} sm={6} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
				<Box
					sx={{
						maxWidth: 500,
						borderRadius: 5,
						backgroundColor: 'primary.light',
						boxShadow: 12,
						px: 6,
						py: 3,
						mx: 4,
						my: { xs: 0, sm: 3 },
					}}
				>
					<Typography variant="h3" sx={{ textAlign: 'left', fontWeight: 'bold', mb: '20px' }}>
						Register
					</Typography>
					{form}
				</Box>
			</Grid>
		</Grid>
	)
}

export default FormPrimary
