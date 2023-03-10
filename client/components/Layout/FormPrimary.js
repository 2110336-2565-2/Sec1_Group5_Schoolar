import { Grid, Stack, Typography } from '@mui/material'
import { Box } from '@mui/system'
import Image from 'next/image'

const FormPrimary = ({ header, form, icon }) => {
	return (
		<Grid
			container
			sx={{
				p: 0,
				m: 0,
			}}
		>
			<Grid
				item
				xs={12}
				sm={4}
				md={6}
				sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', p: 0, m: 0 }}
			>
				<Image
					src="/primary/slogan.png"
					alt="overlay"
					width={0}
					height={0}
					sizes="100vw"
					priority={false}
					style={{
						width: '70%',
						height: 'auto',
						margin: '20px 0 0',
					}}
				/>
			</Grid>
			<Grid item xs={12} sm={8} md={6} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
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
					<Stack
						direction="row"
						width="100%"
						justifyContent={{ xs: 'center', sm: 'start' }}
						alignItems="center"
						spacing={{ xs: 1, sm: 2 }}
						sx={{ mb: { xs: 2, md: 3 } }}
					>
						<Typography
							variant="h3"
							sx={{
								textAlign: { xs: 'center', sm: 'left' },
								fontWeight: 'bold',
							}}
						>
							{header}
						</Typography>
						{icon}
					</Stack>
					{form}
				</Box>
			</Grid>
		</Grid>
	)
}

export default FormPrimary
