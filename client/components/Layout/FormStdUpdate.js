import { React, useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import {
	Box,
	Button,
	FormControl,
	FormControlLabel,
	FormGroup,
	FormHelperText,
	FormLabel,
	Grid,
	InputLabel,
	MenuItem,
	OutlinedInput,
	Radio,
	RadioGroup,
	Stack,
	TextField,
} from '@mui/material'
import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import dayjs from 'dayjs'
import useAxiosPrivate from '@/hooks/useAxiosPrivate'
import { useAuth } from '@/context/AuthContext'

const genders = [
	{ value: 'Male', label: 'Male' },
	{ value: 'Female', label: 'Female' },
	{ value: 'Non-binary', label: 'Non-binary' },
]
const degree = [
	{ value: 'High-school Student', label: 'High-school Student' },
	{ value: "Bachelor's Degree", label: "Bachelor's Degree" },
	{ value: 'Master Degree', label: 'Master Degree' },
]

const scholarshipTypes = [
	{ value: 'Full scholarship', label: 'Full Scholarship' },
	{ value: 'Partial scholarship', label: 'Partial Scholarship' },
	{ value: 'Renewable scholarship', label: 'Renewable Scholarship' },
	{ value: 'Followship', label: 'Followship' },
]
const studentProgram = [
	{ value: 'Science-Math', label: 'Science-Math' },
	{ value: 'Art-Math', label: 'Art-Math' },
	{ value: 'Language-Art', label: 'Language-Art' },
]

const uniProgram = [
	{ value: 'Engineering', label: 'Engineering' },
	{ value: 'Medicine', label: 'Medicine' },
	{ value: 'Dentistry', label: 'Dentistry' },
	{ value: 'Commerce and Accountancy', label: 'Commerce and Accountancy' },
	{ value: 'Law', label: 'Law' },
]

const FormUpdateStdInfo = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({ mode: 'onBlur' })

	const [password, setPassword] = useState('')
	const [rePassword, setRePassword] = useState('')
	const [showPassword, setShowPassword] = useState(false)
	const [isUpdated, setIsUpdated] = useState(false)
	const [selectProgram, setSelectProgram] = useState(studentProgram)
	// const onSubmit = (data) => alert(JSON.stringify(data))

	const handleClickShowPassword = () => setShowPassword((show) => !show)

	const handleMouseDownPassword = (event) => {
		event.preventDefault()
	}
	// const handleClickUpdateBtn = () => {

	// }
	const handleSelectDegree = (event) => {
		if (event.target.value === 'High-school Student') {
			setSelectProgram(studentProgram)
		} else {
			setSelectProgram(uniProgram)
		}
	}

	const { auth, setAuth } = useAuth()

	//* assign value
	// const [firstName, setFirstName] = useState('')
	// const [lastName, setLastName] = useState('')
	// const [birthdate, setBirthDate] = useState('')
	// const [gender, setGender] = useState('')
	const [phoneno, setPhoneNo] = useState('')
	const [email, setEmail] = useState('')
	// const [school, setSchool] = useState('')
	// const [deg, setDegree] = useState('')
	// const [program, setProgram] = useState('')
	// const [gpax, setGpax] = useState('')
	// const [income, setIncome] = useState('')
	// const [target, setTarget] = useState('')
	// const [scholarship, setScholarship] = useState('')
	// const [employment, setEmployment] = useState('')
	// const [interest, setInterest] = useState('')
	const [studentInfo, setStudentInfo] = useState({
		firstName: '',
		lastName: '',
		birthdate: '',
		gender: '',
		school: '',
		deg: '',
		program: '',
		gpax: '',
		income: '',
		target: '',
		scholarship: '',
		employment: '',
		interest: '',
	})

	//*axios private to get data from route that need token
	const axiosPrivate = useAxiosPrivate()

	useEffect(() => {
		//* example of using axios private to get data from route that need token
		axiosPrivate.get(`/student/${auth.username}`).then((res) => {
			// setFirstName(res.data.student.firstName)
			// setLastName(res.data.student.lastName)
			// setBirthDate(res.data.student.birthdate)
			// setGender(res.data.student.gender)
			setPhoneNo(res.data.user.phoneNumber)
			setEmail(res.data.user.email)
			// setSchool(res.data.student.school)
			// setDegree(res.data.student.degree)
			// setProgram(res.data.student.program)
			// setGpax(res.data.student.gpax)
			// setIncome(res.data.student.householdIncome)
			// setInterest(res.data.student.field)
			// setTarget(res.data.student.targetNation)
			// setScholarship(res.data.student.typeOfScholarship)
			// setEmployment(res.data.student.employment)
			setStudentInfo(res.data.student)
			console.log(res.data.student)
			console.log(res.data.user)
		})
	}, [])

	const onSubmit = async (data) => {
		const username = data.username
		const password = data.password

		console.log(username, password)

		try {
			const accessToken = response?.data?.accessToken
			const role = response?.data?.role
			console.log(accessToken)
			console.log(role)
			//set timeout for 3s
			setAuth({ username, accessToken, role })
			setTimeout(() => {}, 3000)
			console.log(auth)
		} catch (err) {
			if (!err?.response) {
				console.log('No Server Response')
			} else if (err.response?.status === 400) {
				console.log('Missing Username or Password')
			} else if (err.response?.status === 401) {
				console.log('Unauthorized')
			} else {
				console.log('Login Failed')
			}
		}
	}

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
								label="Firstname"
								{...register('firstName', {
									required: 'First name is required',
									minLength: {
										value: 2,
										message: 'First name must be at least 2 characters',
									},
									pattern: {
										// Contain only alphabets
										value: /^[A-Za-z]+$/,
										message: 'First name contain invalid character',
									},
								})}
								error={!!errors?.firstName}
								variant="outlined"
								disabled={isUpdated}
								helperText={errors?.firstName ? errors.firstName.message : null}
							/>
							<TextField
								id="outlined-start-adornment"
								required
								label="Surname"
								{...register('surname', {
									required: 'Surname is required',
									minLength: {
										value: 2,
										message: 'Surname must be at least 2 characters',
									},
									pattern: {
										value: /^[A-Za-z]+$/,
										message: 'Surname contain invalid character',
									},
								})}
								error={!!errors?.surname}
								variant="outlined"
								disabled={isUpdated}
								helperText={errors?.surname ? errors.surname.message : null}
							/>
							<LocalizationProvider dateAdapter={AdapterDayjs}>
								<DatePicker
									disableFuture
									required
									label="Date of Birth"
									openTo="year"
									views={['year', 'month', 'day']}
									{...register('dateOfBirth1')}
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
								{...register('gender')}
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
								{...register('phoneNumber', {
									pattern: {
										value: /^[0-9]*$/,
										message: 'Phone number contains invalid character',
									},
								})}
								error={!!errors?.phoneNumber}
								variant="outlined"
								disabled={isUpdated}
								helperText={errors?.phoneNumber ? errors.phoneNumber.message : null}
							/>
							<TextField
								id="outlined-start-adornment"
								required
								defaultValue=""
								label="Email"
								{...register('email', {
									pattern: {
										value: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
										message: 'Email is incorrect form',
									},
								})}
								error={!!errors?.email}
								variant="outlined"
								disabled={isUpdated}
								helperText={errors?.email ? errors.email.message : null}
							/>

							{/* <TextField
								id="outlined-start-adornment"
								defaultValue=""
								label="Age"
								variant="outlined"
								disabled={isUpdated}
							/> */}
							<TextField
								id="outlined-start-adornment"
								defaultValue=""
								label="School/University"
								{...register('School', {
									pattern: {
										value: /^[A-Za-z]+$/,
										message: 'School contains invalid character',
									},
								})}
								error={!!errors?.School}
								helperText={errors?.School ? errors.School.message : null}
								variant="outlined"
								disabled={isUpdated}
							/>
							<TextField
								id="outlined-start-adornment"
								select
								defaultValue=""
								label="Degree"
								{...register('degree', {
									pattern: {
										value: /^[A-Za-z]+$/,
										message: 'Degree contains invalid character',
									},
								})}
								error={!!errors?.Degree}
								helperText={errors?.Degree ? errors.Degree.message : null}
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
								{...register('Program', {
									pattern: {
										value: /^[A-Za-z]+$/,
										message: 'Program contains invalid character',
									},
								})}
								error={!!errors?.Program}
								helperText={errors?.Program ? errors.Program.message : null}
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
								label="GPAX"
								{...register('gpax', {
									pattern: {
										value: /^[0-9]*\.[0-9][0-9]$/,
										message: 'GPAX must be float number with 2 digits',
									},
									min: { value: 0, message: 'GPAX must be positive' },
									max: { value: 4, message: 'GPAX must be at most 4' },
								})}
								error={!!errors?.gpax}
								helperText={errors?.gpax ? errors.gpax.message : null}
								variant="outlined"
								disabled={isUpdated}
							/>
							<TextField
								id="outlined-start-adornment"
								defaultValue=""
								label="Household Income"
								{...register('income', {
									pattern: {
										value: /^[0-9]*$/,
										message: 'Income must be integer',
									},
									min: { value: 0, message: 'Income must be positive' },
								})}
								error={!!errors?.income}
								helperText={errors?.income ? errors.income.message : null}
								variant="outlined"
								disabled={isUpdated}
							/>
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
export async function getStaticProps(context) {
	return {
		props: {
			authRequired: true,
		},
	}
}
