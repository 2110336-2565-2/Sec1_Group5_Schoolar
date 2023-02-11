import * as React from 'react'
import { useRouter } from 'next/router'
import { Button, FormControl, TextField, Typography } from '@mui/material'
import { Box } from '@mui/system'
import Link from 'next/link'
import { useAuth } from '@/context/AuthContext'
import axios from './api/axios'
import InputPassword from '@components/Layout/InputPassword'
import FormPrimary from '@components/Layout/FormPrimary'

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
		<FormPrimary
			header="Login to Schoolar"
			form={
				<FormControl
					component="form"
					sx={{ display: 'flex', flexDirection: 'column', gap: '15px', width: '100%' }}
					onSubmit={handleSubmit}
				>
					<TextField
						required
						fullWidth
						id="username"
						name="username"
						autoFocus
						label="Username"
						variant="outlined"
						autoComplete="username"
					/>
					<InputPassword />
					<Box sx={{ textAlign: 'right' }}>
						<Typography color="primary">
							<Link href="/forgot-password">Forgot password?</Link>
						</Typography>
					</Box>
					<Button variant="contained" type="submit">
						Login
					</Button>
					<Box sx={{ textAlign: 'center' }}>
						<Typography>Dont have an account ?</Typography>
						<Typography color="primary" sx={{ fontWeight: 'bold' }}>
							<Link href="/register">Register here!</Link>
						</Typography>
					</Box>
				</FormControl>
			}
		/>
	)
}

export default Login
