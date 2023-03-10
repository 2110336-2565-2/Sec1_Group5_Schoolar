import { Grid, Typography } from '@mui/material'
import { Box } from '@mui/system'

const FormSecondary = ({ header, form }) => {
	return (
		<Grid
			container
			spacing={2}
			sx={{
				p: 0,
				m: 0,
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
			}}
		>
			<Box
				sx={{
					maxWidth: 500,
					width: '100%',
					borderRadius: 5,
					backgroundColor: 'primary.light',
					boxShadow: 12,
					px: { xs: 2, sm: 4, md: 6 },
					pt: { xs: 2, sm: 2.5, md: 3 },
					pb: { xs: 3, sm: 4, md: 5 },
					mx: { xs: 2, sm: 3, md: 4 },
					mt: { xs: 0, sm: 3 },
					mb: 3,
				}}
			>
				<Typography
					variant="h3"
					sx={{
						textAlign: 'center',
						fontWeight: 'bold',
						mb: { xs: 2, md: 3 },
					}}
				>
					{header}
				</Typography>
				{form}
			</Box>
		</Grid>
	)
}

export default FormSecondary
