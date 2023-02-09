import { useState } from 'react'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import {
	FormControl,
	FormHelperText,
	IconButton,
	InputAdornment,
	InputLabel,
	OutlinedInput,
} from '@mui/material'

const InputPassword = ({ label = 'Password', helperText, register, error }) => {
	const [showPassword, setShowPassword] = useState(false)

	const handleClickShowPassword = () => setShowPassword((show) => !show)

	const handleMouseDownPassword = (event) => {
		event.preventDefault()
	}

	return (
		<FormControl>
			<InputLabel htmlFor="outlined-adornment-password" error={error}>
				{label}
			</InputLabel>
			<OutlinedInput
				type={showPassword ? 'text' : 'password'}
				endAdornment={
					<InputAdornment position="end">
						<IconButton
							aria-label="toggle password visibility"
							onClick={handleClickShowPassword}
							onMouseDown={handleMouseDownPassword}
							edge="end"
						>
							{showPassword ? <VisibilityOff /> : <Visibility />}
						</IconButton>
					</InputAdornment>
				}
				label={label}
				{...register}
				error={error}
			/>
			<FormHelperText id="component-helper-text" error={error}>
				{helperText}
			</FormHelperText>
		</FormControl>
	)
}

export default InputPassword
