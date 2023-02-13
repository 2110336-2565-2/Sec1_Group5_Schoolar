import React, { useEffect, useState } from 'react'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import {
	Box,
	Button,
	FormControl,
	FormHelperText,
	InputLabel,
	OutlinedInput,
	TextField,
} from '@mui/material'
import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'
import Grid2 from '@mui/material/Unstable_Grid2'
import { useAuth } from '@/context/AuthContext'
import useAxiosPrivate from '@/hooks/useAxiosPrivate'

const FormUpdatePvdInfo = ({ isDisabled }) => {
	const { auth, setAuth } = useAuth()

	//* password related value
	const [password, setPassword] = useState('')
	const [rePassword, setRePassword] = useState('')
	const [showPassword, setShowPassword] = React.useState(false)

	//* assign value
	const [username, setUsername] = useState('')
	const [providerName, setProviderName] = useState('')
	const [creditCardNumber, setCreditCardNumber] = useState('')
	const [address, setAddress] = useState('')
	const [phoneNumber, setPhoneNumber] = useState('')
	const [email, setEmail] = useState('')

	const handleClickShowPassword = () => setShowPassword((show) => !show)

	const handleMouseDownPassword = (event) => {
		event.preventDefault()
	}

	//*axios private to get data from route that need token
	const axiosPrivate = useAxiosPrivate()

	useEffect(() => {
		//* example of using axios private to get data from route that need token
		//* console.log(auth.username)
		axiosPrivate.get(`/provider/${auth.username}`).then((res) => {
			//console.log(`providerName: ${res.data.provider.providerName}`)
			setUsername(res.data.provider.username)
			setProviderName(res.data.provider.providerName)
		})
	}, [])

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
							value={username}
							label="Username"
							variant="outlined"
							disabled={isDisabled}
							onChange={(e) => setUsername(e.target.value)}
						/>
						<TextField
							id="outlined-start-adornment"
							defaultValue={providerName}
							value={providerName}
							label="Provider Name"
							variant="outlined"
							disabled={isDisabled}
							onChange={(e) => setProviderName(e.target.value)}
						/>
						<TextField
							id="outlined-start-adornment"
							value={creditCardNumber}
							label="Credit Card Number"
							variant="outlined"
							disabled={isDisabled}
						/>
						<TextField
							id="outlined-start-adornment"
							value={address}
							label="Address"
							variant="outlined"
							disabled={isDisabled}
						/>
						<TextField
							id="outlined-start-adornment"
							value={phoneNumber}
							label="Phone Number"
							variant="outlined"
							disabled={isDisabled}
						/>
						<TextField
							id="outlined-start-adornment"
							value={email}
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
