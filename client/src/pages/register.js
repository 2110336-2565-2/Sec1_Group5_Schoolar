import { FormControl, Grid, TextField } from '@mui/material'
import Image from 'next/image'
import Navbar from '@components/Navbar'

export default function Register() {
	return (
		<>
			<Navbar />

			<Grid container spacing={2} sx={{ height: '90vh', width: '95%', margin: '0 auto' }}>
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
					<FormControl sx={{ display: 'flex', gap: '20px' }}>
						<TextField id="fullWidth" label="Username" variant="outlined" />
						<TextField id="fullWidth" label="Email" variant="outlined" />
						<TextField id="fullWidth" label="Password" variant="outlined" />
						<TextField id="fullWidth" label="Confirmed Password" variant="outlined" />
						<button>Sign Up</button>
					</FormControl>
				</Grid>
			</Grid>
		</>
	)
}
