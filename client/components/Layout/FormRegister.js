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

const FormRegister = () => {
	const [alignment, setAlignment] = useState('student')

	const handleAlignment = (event, newAlignment) => {
		setAlignment(newAlignment)
		setState((prev) => ({
			...prev,
			role: newAlignment,
		}))
	}

	const [state, setState] = useState({
		username: '',
		email: '',
		password: '',
		cfpassword: '',
		role: 'student',
	})

	const handleSubmit = (event) => {
		event.preventDefault()
		console.log('SUBMIT', state)
	}

	const handleInputChange = (event) => {
		const { name, value } = event.target
		setState((prev) => ({
			...prev,
			[name]: value,
		}))
	}

	return (
		<FormControl
			component="form"
			sx={{ display: 'flex', flexDirection: 'column', gap: '20px', width: '100%' }}
			onSubmit={handleSubmit}
		>
			<TextField
				id="outlined-basic"
				label="Username"
				variant="outlined"
				name="username"
				value={state.username}
				onChange={handleInputChange}
			/>
			<TextField
				id="outlined-basic"
				label="Email"
				variant="outlined"
				name="email"
				value={state.email}
				onChange={handleInputChange}
			/>
			<InputPassword state={state} handleInputChange={handleInputChange} />
			<InputPassword
				label={'Confirmed Password'}
				helperText={'Use 8 or more characters with a mix of letters, numbers & symbols'}
				state={state}
				handleInputChange={handleInputChange}
				name={'cfpassword'}
			/>
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
