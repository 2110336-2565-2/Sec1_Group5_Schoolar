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
		getValues,
		reset,
		setValue,
	} = useForm({
		mode: 'onBlur',
	})

	const handleOnChange = (e) => {
		setValue(e.target.name, e.target.value)
	}
	const [password, setPassword] = useState('')
	const [rePassword, setRePassword] = useState('')
	const [showPassword, setShowPassword] = useState(false)
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
		phoneno: "",
    	email: "",
		school: '',
		deg: '',
		program: '',
		gpax: '',
		income: '',
		target: '',
		scholarship: '',
		employment: '',
		interest: '',
		type: '',
	})

	//*axios private to get data from route that need token
	const axiosPrivate = useAxiosPrivate()

	useEffect(() => {
		//* example of using axios private to get data from route that need token
		axiosPrivate.get(`/student/${auth.username}`).then((res) => {
			setStudentInfo(res.data.student)
			reset({
				studentInfo: res.data.student,
			})
		})
	}, [])


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
								value = {studentInfo.firstName}
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
								helperText={errors?.firstName ? errors.firstName.message : null}
							/>
							<TextField
								id="outlined-start-adornment"
								required
								label="Surname"
								InputLabelProps={{ shrink: true }}
								value = {studentInfo.lastName}
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
									InputLabelProps={{ shrink: true }}
									value = {studentInfo.birthdate}
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
								InputLabelProps={{ shrink: true }}
								value = {studentInfo.gender}
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
								defaultValue=""
								required
								label="Phone Number"
								InputLabelProps={{ shrink: true }}
								value = {studentInfo.phoneno}
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
								InputLabelProps={{ shrink: true }}
								value = {studentInfo.email}
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

							<TextField
								id="outlined-start-adornment"
								defaultValue=""
								label="School/University"
								InputLabelProps={{ shrink: true }}
								value = {studentInfo.school}
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
								InputLabelProps={{ shrink: true }}
								value = {studentInfo.degree}
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
								InputLabelProps={{ shrink: true }}
								value = {studentInfo.program}
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
								InputLabelProps={{ shrink: true }}
								value = {studentInfo.gpax}
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
								InputLabelProps={{ shrink: true }}
								value = {studentInfo.income}
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
								InputLabelProps={{ shrink: true }}
								value = {studentInfo.target}
								variant="outlined"
								disabled={isUpdated}
							/>
							<TextField
								id="outlined-select-gender"
								select
								label="Type of scholarship"
								defaultValue="Full scholarship"
								disabled={isUpdated}
								value = {studentInfo.type}
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
								InputLabelProps={{ shrink: true }}
								value = {studentInfo.interest}
								variant="outlined"
								disabled={isUpdated}
							/>
							
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
					<Button variant="contained" 
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
