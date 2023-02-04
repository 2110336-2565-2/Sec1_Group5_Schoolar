import { Button, TextField, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material'
import { Box } from '@mui/system'
import { useState } from 'react'
import InputPassword from './InputPassword'

const FormRegister = () => {
	const [alignment, setAlignment] = useState('student')

	const handleAlignment = (event, newAlignment) => {
		setAlignment(newAlignment)
	}

	return (
		<Box sx={{ display: 'flex', flexDirection: 'column', gap: '20px', width: '100%' }}>
			<TextField id="outlined-basic" label="Username" variant="outlined" />
			<TextField id="outlined-basic" label="Email" variant="outlined" />
			<InputPassword />
			<InputPassword
				label={'Confirmed Password'}
				helperText={'Use 8 or more characters with a mix of letters, numbers & symbols'}
			/>
			<Box sx={{ width: '100%' }}>
				<ToggleButtonGroup value={alignment} exclusive fullWidth onChange={handleAlignment}>
					<ToggleButton value="student">Sign up as student</ToggleButton>
					<ToggleButton value="provider">Sign up as provider</ToggleButton>
				</ToggleButtonGroup>
			</Box>
			<Button variant="contained">Sign Up</Button>
			<Box sx={{ textAlign: 'center' }}>
				<Typography>Already have an account ?</Typography>
				<Typography color="primary" sx={{ fontWeight: 'bold' }}>
					Login here!
				</Typography>
			</Box>
		</Box>
	)
}

export default FormRegister
