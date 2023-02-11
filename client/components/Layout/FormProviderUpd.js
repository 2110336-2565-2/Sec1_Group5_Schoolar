import React, { useEffect, useState } from 'react'
import {
	Box,
	FormControl,
	TextField,
	InputLabel,
	OutlinedInput,
	FormHelperText,
	Button,
} from '@mui/material'
import InputAdornment from '@mui/material/InputAdornment'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import IconButton from '@mui/material/IconButton'
import Grid2 from '@mui/material/Unstable_Grid2'

const FormUpdatePvdInfo = ({ isDisabled }) => {
	const [password, setPassword] = useState('')
	const [rePassword, setRePassword] = useState('')
	const [showPassword, setShowPassword] = React.useState(false)

	const handleClickShowPassword = () => setShowPassword((show) => !show)

	const handleMouseDownPassword = (event) => {
		event.preventDefault()
	}

	return (
		<Grid2 container direction="column" alignItems="center" justifyContent="center">
			<Grid2 sx={{ overflow: 'auto' }}>
				<Box sx={{ display: 'flex', flexDirection: 'column', gap: '20px', width: '100%' }}>
					<FormControl
						fullWidth
						xs={12}
						sm={6}
						lg={4}
						sx={{
							display: 'flex',
							gap: '20px',
							width: '100%',
							height: '60vh',
						}}
					>
						<TextField
							id="outlined-start-adornment"
							defaultValue="XXXXXXX"
							label="Username"
							variant="outlined"
							disabled={isDisabled}
						/>
						<TextField
							id="outlined-start-adornment"
							defaultValue="ABC"
							label="Organization"
							variant="outlined"
							disabled={isDisabled}
						/>
						<TextField
							id="outlined-start-adornment"
							defaultValue="9999999"
							label="Credit Card Number"
							variant="outlined"
							disabled={isDisabled}
						/>
						<TextField
							id="outlined-start-adornment"
							defaultValue="99/99 xxxxxx"
							label="Address"
							variant="outlined"
							disabled={isDisabled}
						/>
						<TextField
							id="outlined-start-adornment"
							defaultValue=""
							label="Phone Number"
							variant="outlined"
							disabled={isDisabled}
						/>
						<TextField
							id="outlined-start-adornment"
							defaultValue=""
							label="Email"
							variant="outlined"
							disabled={isDisabled}
						/>
						<FormControl disabled={isDisabled}>
							<InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
							<OutlinedInput
								id="outlined-adornment-password"
								type={showPassword ? 'text' : 'password'}
								defaultValue=" "
								endAdornment={
									<InputAdornment position="end">
										<IconButton
											aria-label="toggle password visibility"
											onClick={handleClickShowPassword}
											onMouseDown={handleMouseDownPassword}
											edge="end"
											disabled={isDisabled}
										>
											{showPassword ? <VisibilityOff /> : <Visibility />}
										</IconButton>
									</InputAdornment>
								}
								label="password"
								variant="outlined"
								onChange={(e) => {
									setPassword(e.target.value)
								}}
								value={password}
							/>
						</FormControl>
						<FormControl
							variant="outlined"
							helperText={password != rePassword ? 'Password not match' : ''}
							disabled={isDisabled}
						>
							<InputLabel
								htmlFor="outlined-adornment-password"
								error={password != rePassword}
							>
								Re-type New Password
							</InputLabel>
							<OutlinedInput
								id="outlined-adornment-password"
								defaultValue=" "
								type={showPassword ? 'text' : 'password'}
								value={rePassword}
								error={password != rePassword}
								endAdornment={
									<InputAdornment position="end">
										<IconButton
											aria-label="toggle password visibility"
											onClick={handleClickShowPassword}
											onMouseDown={handleMouseDownPassword}
											edge="end"
											disabled={isDisabled}
										>
											{showPassword ? <VisibilityOff /> : <Visibility />}
										</IconButton>
									</InputAdornment>
								}
								label="Re-type New Password"
								onChange={(e) => {
									setRePassword(e.target.value)
								}}
							/>
							{password != rePassword && (
								<FormHelperText error={password != rePassword}>
									Password not match
								</FormHelperText>
							)}
						</FormControl>
					</FormControl>
				</Box>
			</Grid2>
			<Grid2
				item
				alignItems="stretch"
				justifyContent="center"
				sx={{ padding: '20px 0px 20px 0px' }}
			>
				<Button variant="contained" disabled={password != rePassword || isDisabled}>
					Update
				</Button>
			</Grid2>
		</Grid2>
	)
}

export default FormUpdatePvdInfo
