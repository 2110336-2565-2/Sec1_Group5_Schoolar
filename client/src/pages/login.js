import * as React from 'react'
import { useForm } from 'react-hook-form'
import FormPrimary from '@components/Layout/FormPrimary'
import InputPassword from '@components/Layout/InputPassword'
import { Button, FormControl, TextField, Typography } from '@mui/material'
import { Box } from '@mui/system'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useAuth } from '@/context/AuthContext'
import { getErrMsg } from '@utils/formUtils'

import axios from './api/axios'
import { TextFieldComponent } from '@utils/formComponentUtils'

function Login() {
	const { auth, setAuth } = useAuth()
	const router = useRouter()

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({ mode: 'onBlur' })

	const onSubmit = async (data) => {
		const username = data.username
		const password = data.password

		console.log(username, password)

		try {
			const response = await axios.post('/auth/login', {
				username: username,
				password: password,
			})

			const accessToken = response?.data?.accessToken
			const role = response?.data?.role
			console.log(accessToken)
			console.log(role)
			setAuth({ username, accessToken, role })
			router.push('/')
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
					onSubmit={handleSubmit(onSubmit)}
				>
					{TextFieldComponent('username', true, register, errors, {
						validation: {
							required: getErrMsg('username', 'required'),
						},
					})}
					{TextFieldComponent('password', true, register, errors, {
						validation: {
							required: getErrMsg('email', 'required'),
						},
					})}
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
