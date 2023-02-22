import { Grid, Typography } from '@mui/material'
import { Box } from '@mui/system'
import Image from 'next/image'

const FormPrimary = ({ header, form }) => {
	return (
		<Grid
			container
			spacing={2}
			sx={{
				p: 0,
				m: 0,
			}}
		>
			<Grid xs={12} sm={4} md={6} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
				<Image
					src="/primary/slogan.png"
					alt="overlay"
					width={0}
					height={0}
					sizes="100vw"
					priority="false"
					style={{
						width: '70%',
						height: 'auto',
						margin: '20px 0',
					}}
				/>
			</Grid>
			<Grid xs={12} sm={8} md={6} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
				<Box
					sx={{
						maxWidth: 500,
						width: '100%',
						borderRadius: 5,
						backgroundColor: 'primary.light',
						boxShadow: 12,
						px: { xs: 2, sm: 4, md: 6 },
						pt: { xs: 2, md: 3 },
						pb: { xs: 3, md: 5 },
						mx: { xs: 2, sm: 3, md: 4 },
						mt: { xs: 0, sm: 3 },
						mb: 3,
					}}
				>
					<Typography
						variant="h3"
						sx={{
							textAlign: 'left',
							fontWeight: 'bold',
							mb: { xs: 2, md: 3 },
							fontSize: { xs: 38, sm: 42, md: 47 },
						}}
					>
						{header}
					</Typography>
					{form}
				</Box>
			</Grid>
		</Grid>
	)
}

export default FormPrimary
