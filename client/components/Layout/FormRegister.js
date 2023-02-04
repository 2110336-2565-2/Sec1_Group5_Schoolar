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
import { validator } from '@utils/Validator'
import { Forest } from '@mui/icons-material'

const FormRegister = () => {
	const [alignment, setAlignment] = useState('student')
	const [state, setState] = useState({
		username: '',
		email: '',
		password: '',
		cfpassword: '',
		role: 'student',
	})
	const [errors, setErrors] = useState({})

	const handleAlignment = (event, newAlignment) => {
		setAlignment(newAlignment)
		setState((prev) => ({
			...prev,
			role: newAlignment,
		}))
	}

	const handleSubmit = (e) => {
		e.preventDefault()
		//TODO fix this

		// for (const [fieldName] of Object.entries(state)) {
		// 	console.log(fieldName)
		// 	const error = validator(state, fieldName)
		// 	console.log(error)
		// 	setErrors(() => ({
		// 		...errors,
		// 		cfpassword: state.password != state.cfpassword,
		// 		[fieldName]: error[fieldName],
		// 	}))
		// 	console.log("EEEE", errors)
		// }
		const IsValid = Object.values(errors).every((error) => error == undefined || error == false)
		if (IsValid) {
			console.log('SUBMIT', errors)
		} else {
			console.log('ERROR', errors)
		}
	}

	const handleInputChange = (event) => {
		const { name, value } = event.target
		setState((prev) => ({
			...prev,
			[name]: value,
		}))
	}

	const handleBlur = (e) => {
		const { name: fieldName } = e.target
		const error = validator(state, fieldName)
		setErrors(() => ({
			...errors,
			cfpassword: state.password != state.cfpassword,
			[fieldName]: error[fieldName],
		}))
	}

	console.log(errors)
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
				error={errors.username ? true : false}
				helperText={errors.username}
				onBlur={handleBlur}
			/>
			<TextField
				id="outlined-basic"
				label="Email"
				variant="outlined"
				name="email"
				value={state.email}
				onChange={handleInputChange}
				error={errors.email ? true : false}
				helperText={errors.email}
				onBlur={handleBlur}
			/>
			<InputPassword
				state={state}
				handleInputChange={handleInputChange}
				error={errors.password ? true : false}
				helperText={errors.password}
				handleBlur={handleBlur}
			/>
			<InputPassword
				label={'Confirmed Password'}
				helperText={
					errors.cfpassword
						? 'Password do not match!'
						: 'Use 8 or more characters with a mix of letters, numbers & symbols'
				}
				state={state}
				handleInputChange={handleInputChange}
				name={'cfpassword'}
				error={errors.cfpassword ? true : false}
				handleBlur={handleBlur}
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
