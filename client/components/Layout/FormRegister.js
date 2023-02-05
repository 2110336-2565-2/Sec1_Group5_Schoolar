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

import InputPassword from './InputPassword'

const FormRegister = () => {
	const [alignment, setAlignment] = useState('student')
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({ mode: 'onBlur' })
	const onSubmit = (data) => console.log(data)

	const handleAlignment = (event, newAlignment) => {
		setAlignment(newAlignment)
		setState((prev) => ({
			...prev,
			role: newAlignment,
		}))
	}

	return (
		<FormControl
			component="form"
			sx={{ display: 'flex', flexDirection: 'column', gap: '20px', width: '100%' }}
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
						pattern: {
							value: /(?=.*[A-Z])(?=.*\d)(^\S*$)/,
							message: 'Invalid password',
						},
					}),
				}}
				error={!!errors?.password}
				helperText={errors?.password ? errors.password.message : null}
			/>
			<InputPassword label={'Confirmed Password'} />
			<Box sx={{ width: '100%' }}>
				<ToggleButtonGroup value={alignment} exclusive fullWidth onChange={handleAlignment}>
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
