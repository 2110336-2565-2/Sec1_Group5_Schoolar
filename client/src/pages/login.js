import * as React from 'react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import FormPrimary from '@components/Layout/FormPrimary'
import InputPassword from '@components/Layout/InputPassword'
import { Alert, Button, FormControl, Typography } from '@mui/material'
import { Box } from '@mui/system'
import { TextFieldComponent } from '@utils/formComponentUtils'
import { getErrMsg } from '@utils/formUtils'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useAuth } from '@/context/AuthContext'
import axios from './api/axios'
import { SnackbarContext } from '@/context/SnackbarContext'
import { useContext } from 'react'

function Login() {
	const { auth, setAuth } = useAuth()
	const router = useRouter()
	const [error, setError] = useState(null)
	const { setSnackbar } = useContext(SnackbarContext)

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({ mode: 'onBlur' })

	const onSubmit = async (data) => {
		const usernameEmail = data.usernameEmail
		const password = data.password

		try {
			const response = await axios.post('/auth/login', {
				usernameEmail: usernameEmail,
				password: password,
			})

			const accessToken = response?.data?.accessToken
			const role = response?.data?.role
			const username = response?.data?.username

			setAuth({ username, accessToken, role })
			setSnackbar((prev) => ({ ...prev, severity: 'success', text: 'Login success!', open: true }))
			router.push('/')
		} catch (err) {
			if (!err?.response) {
				setError('No Server Response')
			} else if (err.response?.status === 400) {
				setError('Missing Username or Password')
			} else if (err.response?.status === 401) {
				setError('Incorrect Username, Email or Password')
			} else {
				setError('Login Failed')
			}
		}
	}

	const formProps = { register, errors }
	return (
		<FormPrimary
			header="Login"
			form={
				<>
					<FormControl
						component="form"
						sx={{ display: 'flex', flexDirection: 'column', gap: '15px', width: '100%' }}
						onSubmit={handleSubmit(onSubmit)}
					>
						{error && <Alert severity="error">{error}</Alert>}
						<TextFieldComponent
							name={'usernameEmail'}
							required={true}
							label={'Username or Email'}
							validation={{ required: getErrMsg('Username or Email', 'required') }}
							{...formProps}
						/>
						<InputPassword
							register={{
								...register('password', {
									required: getErrMsg('password', 'required'),
								}),
							}}
							error={!!errors?.password}
							helperText={errors?.password ? errors.password.message : null}
						/>
						<Box sx={{ textAlign: 'right' }}>
							<Typography color="primary">
								<Link href="/forgot-password">Forgot password?</Link>
							</Typography>
						</Box>
						<Button variant="contained" type="submit">
							Login
						</Button>
						<Box sx={{ textAlign: 'center' }}>
							<Typography>Don&apos;t have an account ?</Typography>
							<Typography color="primary" sx={{ fontWeight: 'bold' }}>
								<Link href="/register">Register here!</Link>
							</Typography>
						</Box>
					</FormControl>
				</>
			}
		/>
	)
}

export default Login
