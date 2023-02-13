import { React, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useEffect } from 'react'
import { useAuth } from '@/context/AuthContext'
import {
	Box,
	Button,
	RadioGroup,
	Radio,
	FormControl,
	FormControlLabel,
	FormGroup,
	FormLabel,
	MenuItem,
	TextField,
	InputLabel,
	OutlinedInput,
	FormHelperText,
	Stack,
	Grid,
} from '@mui/material'

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import dayjs from 'dayjs'
import InputAdornment from '@mui/material/InputAdornment'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import IconButton from '@mui/material/IconButton'
import useAxiosPrivate from '@/hooks/useAxiosPrivate'
import { genders, degree, scholarshipTypes, studentProgram, uniProgram } from './StdInformation'

const FormUpdateStdInfo = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm()
	const { auth, setAuth } = useAuth()

	const [value, setValue] = useState(dayjs('2001-01-01'))
	const [password, setPassword] = useState('')
	const [rePassword, setRePassword] = useState('')
	const [showPassword, setShowPassword] = useState(false)
	const [isUpdated, setIsUpdated] = useState(false)
	const [selectProgram, setSelectProgram] = useState(studentProgram)
	const onSubmit = (data) => alert(JSON.stringify(data))

	const handleClickShowPassword = () => setShowPassword((show) => !show)

	const handleMouseDownPassword = (event) => {
		event.preventDefault()
	}
	// const handleClickUpdateBtn = () => {

	// }
	const handleSelectDegree = (event) => {
		if (event.target.value === 'high school') {
			setSelectProgram(studentProgram)
		} else {
			setSelectProgram(uniProgram)
		}
	}

	//* example of using axios private to get data from route that need token
	const axiosPrivate = useAxiosPrivate()

	useEffect(() => {
		//* example of using axios private to get data from route that need token
		axiosPrivate.get(`/student/${auth.username}`).then((res) => {
			console.log(res.data)
		})
	}, [])


	return (
		<Stack direction="column" alignItems="center" justifyContent="center">
			<Grid container sx={{ overflow: 'scroll', maxHeight: '500px', m: 0.5 }}>
				<Grid container sx={{ m: 2 }}>
					<FormControl
						component="form"
						onSubmit={handleSubmit(onSubmit)}
						sx={{ width: '100%' }}
					>
						<Stack spacing={3} direction="column">
							<TextField
								id="outlined-start-adornment"
								required
								defaultValue="Tontong"
								label="Firstname"
								variant="outlined"
								disabled={isUpdated}
							/>
							<TextField
								id="outlined-start-adornment"
								required
								defaultValue="WoahWoah"
								label="Surname"
								variant="outlined"
								disabled={isUpdated}
							/>
							<TextField
								id="outlined-start-adornment"
								defaultValue="9999999"
								label="Citizen ID"
								variant="outlined"
								disabled={isUpdated}
							/>
							<LocalizationProvider dateAdapter={AdapterDayjs}>
								<DatePicker
									disableFuture
									required
									label="Date of Birth"
									openTo="year"
									views={['year', 'month', 'day']}
									value={value}
									onChange={(newValue) => {
										setValue(newValue)
									}}
									renderInput={(params) => <TextField {...params} />}
									disabled={isUpdated}
								/>
							</LocalizationProvider>
							<TextField
								id="outlined-select-gender"
								required
								select
								label="Gender"
								defaultValue="Female"
								disabled={isUpdated}
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
								required
								label="Phone Number"
								variant="outlined"
								disabled={isUpdated}
							/>
							<TextField
								id="outlined-start-adornment"
								required
								defaultValue=""
								label="Email"
								variant="outlined"
								disabled={isUpdated}
							/>

							<TextField
								id="outlined-start-adornment"
								defaultValue=""
								label="Age"
								variant="outlined"
								disabled={isUpdated}
							/>
							<TextField
								id="outlined-start-adornment"
								defaultValue=""
								label="School"
								variant="outlined"
								disabled={isUpdated}
							/>
							<TextField
								id="outlined-start-adornment"
								select
								defaultValue=""
								label="Degree"
								variant="outlined"
								disabled={isUpdated}
								onChange={handleSelectDegree}
							>
								{degree.map((option) => (
									<MenuItem key={option.value} value={option.value}>
										{option.label}
									</MenuItem>
								))}
							</TextField>
							<TextField
								id="outlined-start-adornment"
								select
								defaultValue=""
								label="Program/Faculty"
								variant="outlined"
								disabled={isUpdated}
							>
								{selectProgram.map((option) => (
									<MenuItem key={option.value} value={option.value}>
										{option.label}
									</MenuItem>
								))}
							</TextField>
							<TextField
								id="outlined-start-adornment"
								defaultValue=""
								label="Year"
								variant="outlined"
								disabled={isUpdated}
							/>
							<TextField
								id="outlined-start-adornment"
								defaultValue=""
								label="GPAX"
								variant="outlined"
								disabled={isUpdated}
							/>
							<TextField
								id="outlined-start-adornment"
								defaultValue=""
								label="Household Income"
								variant="outlined"
								disabled={isUpdated}
							/>
							<FormLabel component="legend">Employment status</FormLabel>
							<FormGroup aria-label="position" row>
								<RadioGroup row sx={{ m: 0, justifyContent: 'space-between' }}>
									<FormControlLabel
										value="true"
										control={<Radio disabled={isUpdated} />}
										label="Employed"
									></FormControlLabel>
									<FormControlLabel
										value="false"
										control={<Radio disabled={isUpdated} />}
										label="Unemployed"
									></FormControlLabel>
									<Stack></Stack>
								</RadioGroup>
							</FormGroup>
							<TextField
								id="outlined-start-adornment"
								defaultValue=""
								label="Target Nation"
								variant="outlined"
								disabled={isUpdated}
							/>
							<TextField
								id="outlined-select-gender"
								select
								label="Type of scholarship"
								defaultValue="Full scholarship"
								disabled={isUpdated}
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
								disabled={isUpdated}
							/>
							<FormControl disabled={isUpdated}>
								<InputLabel htmlFor="outlined-adornment-password">
									Password
								</InputLabel>
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
												disabled={isUpdated}
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
								disabled={isUpdated}
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
												disabled={isUpdated}
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
						</Stack>
					</FormControl>
					{/* </Box> */}
				</Grid>
			</Grid>
			<Grid
				container
				spacing={2}
				alignItems="stretch"
				justifyContent="space-evenly"
				sx={{ padding: '20px 0px 20px 0px' }}
			>
				<Grid item>
					<Button variant="contained">Cancel</Button>
				</Grid>

				<Grid item>
					<Button variant="contained" disabled={password != rePassword || isUpdated}>
						Update
					</Button>
				</Grid>
			</Grid>
		</Stack>
	)
}

export default FormUpdateStdInfo
