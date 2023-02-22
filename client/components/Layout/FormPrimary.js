import { Typography } from '@mui/material'
import Grid2 from '@mui/material/Unstable_Grid2'
import { Box } from '@mui/system'
import Image from 'next/image'

const FormPrimary = ({ header, form }) => {
	return (
		<Grid2
			container
			spacing={2}
			sx={{
				height: '100%',
				width: '100%',
				padding: '20px 30px',
				margin: '0 auto',
				justifyContent: 'center',
				alignItems: 'center',
				overflow: 'hidden',
			}}
		>
			<Grid2 container xs={12} sm={5} lg={8} sx={{ alignItems: 'center' }}>
				<Grid2 xs={12} lg={5}>
					<Typography
						variant="h3"
						sx={{ textAlign: 'center', fontWeight: 'bold', mb: '20px' }}
					>
						{header}
					</Typography>
				</Grid2>
				<Grid2
					xs={0}
					sm={12}
					lg={7}
					sx={{
						position: 'relative',
						display: { xs: 'none', sm: 'block' },
					}}
				>
					<Image
						src="/overlay.png"
						alt="overlay"
						width={0}
						height={0}
						sizes="100vw"
						priority="false"
						style={{
							width: '180%',
							height: 'auto',
							position: 'absolute',
							top: '50%',
							left: '50%',
							transform: 'translate(-50%, -50%)',
							zIndex: -1,
						}}
					/>
					<Image
						src="/women.png"
						alt="women"
						width={0}
						height={0}
						sizes="100vw"
						style={{
							width: '80%',
							height: 'auto',
							padding: '20px',
							position: 'relative',
						}}
					/>
				</Grid2>
			</Grid2>
			<Grid2 xs={12} sm={7} lg={4}>
				<Box sx={{ overflowY: 'auto', overflowX: 'hidden', maxHeight: '80vh', py: 1 }}>
					{form}
				</Box>
			</Grid2>
		</Grid2>
	)
}

export default FormPrimary
