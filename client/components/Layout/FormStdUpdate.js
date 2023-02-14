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
const degreeDropDown = [
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
		getValues,
		reset,
		setValue,
	} = useForm({
		mode: 'onBlur',
	})

	const [isUpdated, setIsUpdated] = useState(false)
	const [selectProgram, setSelectProgram] = useState(studentProgram)

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
	const [studentInfo, setStudentInfo] = useState({
		firstName: '',
		lastName: '',
		birthdate: '',
		gender: '',
		phoneNumber: '',
		gpax: '',
		degree: '',
		school: '',
		program: '',
		income: '',
		target: '',
		scholarship: '',
		employment: '',
		interest: '',
		type: '',
	})
	const [email, setEmail] = useState('')
	const handleOnChange = (e) => {
		if (e.target.name === 'email') {
			setEmail(e.target.value)
		} else {
			let newStudentInfo = studentInfo
			newStudentInfo[e.target.name] = e.target.value
			let update = {}
			update[e.target.name] = e.target.value
			setStudentInfo(newStudentInfo)
			reset(update)
		}
	}
	//*axios private to get data from route that need token
	const axiosPrivate = useAxiosPrivate()

	useEffect(() => {
		//* example of using axios private to get data from route that need token
		axiosPrivate.get(`/student/${auth.username}`).then((res) => {
			setStudentInfo(res.data.student)
			setEmail(res.data.user.email)
		})
	}, [])
	useEffect(() => {
		reset({
			email: email,
		})
	}, [email])

	useEffect(() => {
		const data = {
			firstName: studentInfo.firstName,
			lastName: studentInfo.lastName,
			birthdate: studentInfo.birthdate,
			gender: studentInfo.gender,
			phoneNumber: studentInfo.phoneNumber,
			gpax: studentInfo.gpax,
			deg: studentInfo.deg,
			school: studentInfo.school,
			program: studentInfo.program,
			income: studentInfo.income,
			target: studentInfo.target,
			scholarship: studentInfo.scholarship,
			employment: studentInfo.employment,
			interest: studentInfo.interest,
			type: studentInfo.type
		}
		console.log(data)
		reset(data)
	}, [studentInfo])
	const onSubmit = (data) => {
		console.log(`submitted`)
		alert('Data has been updated successfully')
		axiosPrivate.patch(`/student/${auth.username}`, data).then((res) => {
			console.log(res.status)
		})
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
								value={studentInfo.firstName}
								name="firstName"
								label="Firstname"
								InputLabelProps={{ shrink: true }}
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
								onChange={handleOnChange}
								helperText={errors?.firstName ? errors.firstName.message : null}
							/>
							<TextField
								id="outlined-start-adornment"
								required
								label="Surname"
								name="lastName"
								InputLabelProps={{ shrink: true }}
								value={studentInfo.lastName}
								{...register('lastName', {
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
								onChange={handleOnChange}
								helperText={errors?.surname ? errors.surname.message : null}
							/>
							<LocalizationProvider dateAdapter={AdapterDayjs}>
								<DatePicker
									disableFuture
									required
									label="Date of Birth"
									InputLabelProps={{ shrink: true }}
									value={studentInfo.birthdate}
									name="birthdate"
									openTo="year"
									views={['year', 'month', 'day']}
									{...register('birthdate')}
									renderInput={(params) => <TextField {...params} />}
									disabled={isUpdated}
									onChange={handleOnChange}
								/>
							</LocalizationProvider>
							<TextField
								id="outlined-select-gender"
								required
								select
								label="Gender"
								name="gender"
								InputLabelProps={{ shrink: true }}
								value={studentInfo.gender}
								disabled={isUpdated}
								{...register('gender')}
								onChange={handleOnChange}
							>
								{genders.map((option) => (
									<MenuItem key={option.value} value={option.value}>
										{option.label}
									</MenuItem>
								))}
							</TextField>
							<TextField
								id="outlined-start-adornment"
								required
								label="Phone Number"
								name="phoneno"
								InputLabelProps={{ shrink: true }}
								value={studentInfo.phoneno}
								{...register('phoneno', {
									pattern: {
										value: /^[0-9]*$/,
										message: 'Phone number contains invalid character',
									},
								})}
								error={!!errors?.phoneNumber}
								variant="outlined"
								disabled={isUpdated}
								onChange={handleOnChange}
								helperText={errors?.phoneNumber ? errors.phoneNumber.message : null}
							/>
							<TextField
								id="outlined-start-adornment"
								required
								label="Email"
								name="email"
								InputLabelProps={{ shrink: true }}
								value={studentInfo.email}
								{...register('email', {
									pattern: {
										value: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
										message: 'Email is incorrect form',
									},
								})}
								error={!!errors?.email}
								variant="outlined"
								disabled={isUpdated}
								onChange={handleOnChange}
								helperText={errors?.email ? errors.email.message : null}
							/>

							<TextField
								id="outlined-start-adornment"
								label="School/University"
								name="school"
								InputLabelProps={{ shrink: true }}
								value={studentInfo.school}
								{...register('school', {
									pattern: {
										value: /^[A-Za-z]+$/,
										message: 'School contains invalid character',
									},
								})}
								error={!!errors?.School}
								helperText={errors?.School ? errors.School.message : null}
								variant="outlined"
								disabled={isUpdated}
								onChange={handleOnChange}
							/>
							<TextField
								id="outlined-start-adornment"
								select
								label="Degree"
								name="deg"
								InputLabelProps={{ shrink: true }}
								value={studentInfo.degree}
								{...register('deg', {
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
								label="Program/Faculty"
								name="program"
								InputLabelProps={{ shrink: true }}
								value={studentInfo.program}
								{...register('program', {
									pattern: {
										value: /^[A-Za-z]+$/,
										message: 'Program contains invalid character',
									},
								})}
								error={!!errors?.Program}
								helperText={errors?.Program ? errors.Program.message : null}
								variant="outlined"
								disabled={isUpdated}
								onChange={handleOnChange}
							>
								{selectProgram.map((option) => (
									<MenuItem key={option.value} value={option.value}>
										{option.label}
									</MenuItem>
								))}
							</TextField>
							<TextField
								id="outlined-start-adornment"
								label="GPAX"
								name="gpax"
								InputLabelProps={{ shrink: true }}
								value={studentInfo.gpax}
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
								onChange={handleOnChange}
							/>
							<TextField
								id="outlined-start-adornment"
								label="Household Income"
								name="income"
								InputLabelProps={{ shrink: true }}
								value={studentInfo.income}
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
								onChange={handleOnChange}
							/>
							<TextField
								id="outlined-start-adornment"
								label="Target Nation"
								name="target"
								InputLabelProps={{ shrink: true }}
								value={studentInfo.target}
								variant="outlined"
								disabled={isUpdated}
								onChange={handleOnChange}
							/>
							<TextField
								id="outlined-select-gender"
								select
								label="Type of scholarship"
								name="type"
								disabled={isUpdated}
								value={studentInfo.type}
								onChange={handleOnChange}
							>
								{scholarshipTypes.map((option) => (
									<MenuItem key={option.value} value={option.value}>
										{option.label}
									</MenuItem>
								))}
							</TextField>
							<TextField
								id="outlined-start-adornment"
								label="Field of Interest"
								name="interest"
								InputLabelProps={{ shrink: true }}
								value={studentInfo.interest}
								variant="outlined"
								disabled={isUpdated}
								onChange={handleOnChange}
							/>
						</Stack>
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
								<Button
									variant="contained"
									type="submit"
									onClick={() => {
										const values = getValues()
										console.log(values)
									}}
								>
									Update
								</Button>
							</Grid>
						</Grid>
					</FormControl>
					{/* </Box> */}
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
