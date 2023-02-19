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
import Link from 'next/link'
import InputPassword from './InputPassword'
import { getErrMsg, getValidation } from '@utils/formUtils'

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
				{...register('username', getValidation('username'))}
				error={!!errors?.username}
				helperText={errors?.username ? errors.username.message : null}
			/>
			<TextField
				required
				label="Email"
				variant="outlined"
				autoComplete="email"
				{...register('email', getValidation('email'))}
				error={!!errors?.email}
				helperText={errors?.email ? errors.email.message : null}
			/>
			<InputPassword
				register={{
					...register('password', getValidation('password')),
				}}
				error={!!errors?.password}
				helperText={errors?.password ? errors.password.message : null}
			/>
			<InputPassword
				label={'Confirmed Password'}
				register={{
					...register('cfpassword', {
						validate: {
							match: (value) =>
								value === getValues('password') || getErrMsg('password', 'match'),
						},
					}),
				}}
				error={!!errors?.cfpassword && errors.cfpassword.type === 'match'}
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
