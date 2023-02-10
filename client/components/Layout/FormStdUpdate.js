import { React, useState } from 'react'
import { useForm } from 'react-hook-form'
import {
	Box,
	Button,
	Checkbox,
	FormControl,
	FormControlLabel,
	FormGroup,
	FormLabel,
	Grid,
	MenuItem,
	TextField,
	InputLabel,
	OutlinedInput,
	FormHelperText,
} from '@mui/material'

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import dayjs from 'dayjs'
import InputAdornment from '@mui/material/InputAdornment'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import IconButton from '@mui/material/IconButton'

const genders = [
	{ value: 'Male', label: 'Male' },
	{ value: 'Female', label: 'Female' },
	{ value: 'Non-binary', label: 'Non-binary' },
]

const scholarshipTypes = [
	{ value: 'Full scholarship', label: 'Full Scholarship' },
	{ value: 'Partial scholarship', label: 'Partial Scholarship' },
	{ value: 'Renewable scholarship', label: 'Renewable Scholarship' },
	{ value: 'Followship', label: 'Followship' },
]

const FormUpdateStdInfo = ({ isDisabled }) => {
	const [value, setValue] = useState(dayjs('2022-04-07'))
	const [password, setPassword] = useState('')
	const [rePassword, setRePassword] = useState('')
	const [showPassword, setShowPassword] = useState(false)

	const handleClickShowPassword = () => setShowPassword((show) => !show)

	const handleMouseDownPassword = (event) => {
		event.preventDefault()
	}
	return (
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
					defaultValue="Tontong"
					label="Firstname"
					variant="outlined"
					disabled={isDisabled}
				/>
				<TextField
					id="outlined-start-adornment"
					defaultValue="WoahWoah"
					label="Surname"
					variant="outlined"
					disabled={isDisabled}
				/>
				<TextField
					id="outlined-start-adornment"
					defaultValue="9999999"
					label="Citizen ID"
					variant="outlined"
					disabled={isDisabled}
				/>
				<LocalizationProvider dateAdapter={AdapterDayjs}>
					<DatePicker
						disableFuture
						label="Date of Birth"
						openTo="year"
						views={['year', 'month', 'day']}
						value={value}
						onChange={(newValue) => {
							setValue(newValue)
						}}
						renderInput={(params) => <TextField {...params} />}
						disabled={isDisabled}
					/>
				</LocalizationProvider>
				<TextField
					id="outlined-select-gender"
					select
					label="Gender"
					defaultValue="Female"
					disabled={isDisabled}
				>
					{genders.map((option) => (
						<MenuItem key={option.value} value={option.value}>
							{option.label}
						</MenuItem>
					))}
				</TextField>
				<TextField
					id="outlined-start-adornment"
					defaultValue=""
					label="Faculty"
					variant="outlined"
					disabled={isDisabled}
				/>
				<TextField
					id="outlined-start-adornment"
					defaultValue=""
					label="Year"
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
				<TextField
					id="outlined-start-adornment"
					defaultValue=""
					label="GPAX"
					variant="outlined"
					disabled={isDisabled}
				/>
				<TextField
					id="outlined-start-adornment"
					defaultValue=""
					label="Age"
					variant="outlined"
					disabled={isDisabled}
				/>
				<TextField
					id="outlined-start-adornment"
					defaultValue=""
					label="Education"
					variant="outlined"
					disabled={isDisabled}
				/>
				<TextField
					id="outlined-start-adornment"
					defaultValue=""
					label="Household Income"
					variant="outlined"
					disabled={isDisabled}
				/>
				<FormLabel component="legend">Employment status</FormLabel>
				<FormGroup aria-label="position" row>
					<FormControlLabel
						value="end"
						control={<Checkbox disabled={isDisabled} />}
						label="Employed"
						labelPlacement="end"
					/>
					<FormControlLabel
						value="end"
						control={<Checkbox disabled={isDisabled} />}
						label="Unemployed"
						labelPlacement="end"
					/>
				</FormGroup>
				<TextField
					id="outlined-start-adornment"
					defaultValue=""
					label="Target Nation"
					variant="outlined"
					disabled={isDisabled}
				/>
				<TextField
					id="outlined-select-gender"
					select
					label="Type of scholarship"
					defaultValue="Full scholarship"
					disabled={isDisabled}
				>
					{scholarshipTypes.map((option) => (
						<MenuItem key={option.value} value={option.value}>
							{option.label}
						</MenuItem>
					))}
				</TextField>
				<TextField
					id="outlined-start-adornment"
					defaultValue=""
					label="Field of Interest"
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
	)
}

export default FormUpdateStdInfo
