import * as React from 'react'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox'
import Container from '@mui/material/Container'
import CssBaseline from '@mui/material/CssBaseline'
import FormControlLabel from '@mui/material/FormControlLabel'
import Grid from '@mui/material/Grid'
import Link from '@mui/material/Link'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { useRouter } from 'next/router'

import { useAuth } from '@/context/AuthContext'

import axios from './api/axios'

// Just Mock Login -> pls re-implement this again
// NOTE
// username: Admin1234, password: Admin1234
function Login() {
	const { auth, setAuth } = useAuth()
	const router = useRouter()

	const handleSubmit = async (event) => {
		event.preventDefault()
		const data = new FormData(event.currentTarget)

		const username = data.get('username')
		const password = data.get('password')

		console.log(username, password)
		try {
			const response = await axios.post('/auth/login', {
				username: data.get('username'),
				password: data.get('password'),
			})

			const accessToken = response?.data?.accessToken
			const role = response?.data?.role
			console.log(accessToken)
			console.log(role)
			setAuth({ username, accessToken, role })
			console.log(auth)
			router.push('/home-page')
		} catch (err) {
			if (!err?.response) {
				console.log('No Server Response')
			} else if (err.response?.status === 400) {
				console.log('Missing Username or Password')
			} else if (err.response?.status === 401) {
				console.log('Unauthorized')
			} else {
				console.log('Login Failed')
			}
		}
	}

	return (
		<Container component="main" maxWidth="xs">
			<CssBaseline />
			<Box
				sx={{
					marginTop: 8,
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
				}}
			>
				<Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
					<LockOutlinedIcon />
				</Avatar>
				<Typography component="h1" variant="h5">
					Sign in
				</Typography>
				<Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
					<TextField
						margin="normal"
						required
						fullWidth
						id="username"
						label="Username"
						name="username"
						autoComplete="username"
						autoFocus
					/>
					<TextField
						margin="normal"
						required
						fullWidth
						name="password"
						label="Password"
						type="password"
						id="password"
						autoComplete="current-password"
					/>
					<FormControlLabel
						control={<Checkbox value="remember" color="primary" />}
						label="Remember me"
					/>
					<Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
						Sign In
					</Button>
					<Grid container>
						<Grid item xs>
							<Link href="#" variant="body2">
								Forgot password?
							</Link>
						</Grid>
						<Grid item>
							<Link href="#" variant="body2">
								{"Don't have an account? Sign Up"}
							</Link>
						</Grid>
					</Grid>
				</Box>
			</Box>
		</Container>
	)
}

export default Login
