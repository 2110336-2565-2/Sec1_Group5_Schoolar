import { useState } from 'react'
import { useForm } from 'react-hook-form'
import {
	Button,
	FormControl,
	TextField,
	ToggleButton,
	ToggleButtonGroup,
	Typography,
} from '@mui/material'
import { Box } from '@mui/system'
import axios from 'axios'
import Link from 'next/link'

import InputPassword from './InputPassword'

const FormRegister = ({ setData, setPage }) => {
	const [role, setRole] = useState('student')

	const {
		register,
		handleSubmit,
		formState: { errors },
		getValues,
	} = useForm({ mode: 'onBlur' })

	const onSubmit = (data) => {
		setData({ ...data, role })
		setPage(role)
	}

	const handleRole = (event, newrole) => {
		if (newrole !== null) {
			setRole(newrole)
		}
	}

	const isDupe = async (role, field, value) => {
		try {
			const response = await axios.get(`/auth/isDupe/${role}/${field}/${value}`)
			return response.data
		} catch (err) {
			console.log(err)
		}
	}

	return (
		<FormControl
			component="form"
			sx={{ display: 'flex', flexDirection: 'column', gap: '15px', width: '100%' }}
			onSubmit={handleSubmit(onSubmit)}
		>
			<TextField
				required
				label="Username"
				variant="outlined"
				autoComplete="username"
				{...register('username', {
					required: 'Username is required',
					maxLength: { value: 40, message: 'Username must be at most 40 characters' },
					pattern: {
						value: /^[a-zA-Z0-9._-]*$/,
						message: 'Username contain invalid charactor',
					},
					validate: {
						duplicate: async (value) =>
							!(await isDupe('user', 'username', value)) || 'Username has been taken',
					},
				})}
				error={!!errors?.username}
				helperText={errors?.username ? errors.username.message : null}
			/>
			<TextField
				required
				label="Email"
				variant="outlined"
				autoComplete="email"
				{...register('email', {
					required: 'Email is required',
					pattern: {
						value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
						message: 'Invalid email',
					},
					validate: {
						duplicate: async (value) =>
							!(await isDupe('user', 'email', value)) || 'Email has been taken',
					},
				})}
				error={!!errors?.email}
				helperText={errors?.email ? errors.email.message : null}
			/>
			<InputPassword
				register={{
					...register('password', {
						required: 'Password is required',
						minLength: { value: 8, message: 'Password must be at least 8 characters' },
						maxLength: { value: 40, message: 'Password must be at most 40 characters' },
						validate: {
							upper: (value) =>
								/(?=.*[A-Z])/.test(value) ||
								'Password must have at least one uppercase letter',
							lower: (value) =>
								/(?=.*[a-z])/.test(value) ||
								'Password must have at least one lower letter',
							special: (value) =>
								/(?=.*[0-9!"#$%&'()*+,-./:;<=>?@_`{|}~\[\]\\])/.test(value) ||
								'Password must have at least one digit number or special character',
							space: (value) =>
								/^\S*$/.test(value) || 'Password must not contain spaces',
						},
					}),
				}}
				error={!!errors?.password}
				helperText={errors?.password ? errors.password.message : null}
			/>
			<InputPassword
				label={'Confirmed Password'}
				register={{
					...register('cfpassword', {
						validate: {
							similar: (value) =>
								value === getValues('password') || 'Password do not match!',
						},
					}),
				}}
				error={!!errors?.cfpassword && errors.cfpassword.type === 'similar'}
				helperText={
					errors?.cfpassword
						? errors.cfpassword.message
						: 'Use 8 or more characters with a mix of letters, numbers & special character'
				}
			/>
			<Box sx={{ width: '100%' }}>
				<ToggleButtonGroup value={role} exclusive fullWidth onChange={handleRole}>
					<ToggleButton value="student">Register as student</ToggleButton>
					<ToggleButton value="provider">Register as provider</ToggleButton>
				</ToggleButtonGroup>
			</Box>
			<Button variant="contained" type="submit">
				Register
			</Button>

			<Box sx={{ textAlign: 'center' }}>
				<Typography>Already have an account ?</Typography>
				<Typography color="primary" sx={{ fontWeight: 'bold' }}>
					<Link href="/login">Login here!</Link>
				</Typography>
			</Box>
		</FormControl>
	)
}

export default FormRegister
