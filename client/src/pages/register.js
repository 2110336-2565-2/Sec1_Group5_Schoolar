import FormRegister from '@components/Layout/FormRegister'
import { Grid } from '@mui/material'
import Image from 'next/image'

export default function Register() {
	return (
		<Grid
			container
			spacing={2}
			sx={{
				height: '100%',
				width: '100%',
				padding: '5%',
				margin: '0 auto',
			}}
		>
			<Grid
				item
				xs={4}
				sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
			>
				<h1>Sign Up to Shoolar</h1>
			</Grid>
			<Grid
				item
				xs={3}
				sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
			>
				<Image src="/women.png" alt="women" width={374} height={317} />
			</Grid>
			<Grid
				item
				xs={5}
				sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
			>
				<FormRegister />
			</Grid>
		</Grid>
	)
}
