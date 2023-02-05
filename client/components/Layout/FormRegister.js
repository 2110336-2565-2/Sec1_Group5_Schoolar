import {
	Button,
	FormControl,
	TextField,
	ToggleButton,
	ToggleButtonGroup,
	Typography,
} from '@mui/material'
import { Box } from '@mui/system'
import { useState } from 'react'
import InputPassword from './InputPassword'
import { useForm } from 'react-hook-form'
import axios from 'axios'

const FormRegister = () => {
	const [role, setRole] = useState('student')

	const {
		register,
		handleSubmit,
		formState: { errors },
		getValues,
		setError,
	} = useForm({ mode: 'onBlur' })

	const onSubmit = (data) => {
		//TODO fix this
		isDupe('username', getValues('username'))
		isDupe('email', getValues('email'))
		console.log(errors)
		if (!!errors?.username)
			console.log('SUBMIT', { ...data, role })
		else console.log('ERROR')
	}
	console.log('SD', errors)
	const handleRole = (event, newrole) => {
		setRole(newrole)
	}

	const isDupe = (field, value) => {
		axios
			.get(`http://localhost:8080/auth/isDupe/${field}/${value}`)
			.then((response) => {
				if (response.data) {
					setError(field, {
						type: 'custom',
						message: `${field.charAt(0).toUpperCase() + field.slice(1)} already taken`,
					})
				}
			})
			.catch((err) => alert(err))
	}

	return (
		<FormControl
			component="form"
			sx={{ display: 'flex', flexDirection: 'column', gap: '15px', width: '100%' }}
			onSubmit={handleSubmit(onSubmit)}
		>
			<TextField
				id="outlined-basic"
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
				})}
				error={!!errors?.username}
				helperText={errors?.username ? errors.username.message : null}
			/>
			<TextField
				id="outlined-basic"
				label="Email"
				variant="outlined"
				autoComplete="email"
				{...register('email', {
					required: 'Email is required',
					pattern: {
						value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
						message: 'Invalid email',
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
					<ToggleButton value="student">Sign up as student</ToggleButton>
					<ToggleButton value="provider">Sign up as provider</ToggleButton>
				</ToggleButtonGroup>
			</Box>
			<Button variant="contained" type="submit">
				Sign Up
			</Button>

			<Box sx={{ textAlign: 'center' }}>
				<Typography>Already have an account ?</Typography>
				<Typography color="primary" sx={{ fontWeight: 'bold' }}>
					Login here!
				</Typography>
			</Box>
		</FormControl>
	)
}

export default FormRegister
