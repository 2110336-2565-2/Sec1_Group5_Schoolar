import { React, useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import {
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
import { degree, genders, scholarshipTypes, studentProgram, uniProgram } from './StdInformation'

const FormUpdateStdInfo = () => {
	// States
	const [isUpdated, setIsUpdated] = useState(false)
	const [selectProgram, setSelectProgram] = useState(studentProgram)

	const { auth, setAuth } = useAuth()
	const [email, setEmail] = useState('')
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
		householdIncome: '',
		targetNation: '',
		typeOfScholarship: '',
		field: '',
	})

	// Form hook
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
	// Get the current data from API
	const axiosPrivate = useAxiosPrivate()
	useEffect(() => {
		axiosPrivate.get(`/student/${auth.username}`).then((res) => {
			let studentRes = res.data.student
			studentRes.gpax = studentRes.gpax.toFixed(2)
			setStudentInfo(studentRes)
			setEmail(res.data.user.email)
		})
	}, [])

	// Update the form value in case of state change
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
			degree: studentInfo.degree,
			school: studentInfo.school,
			program: studentInfo.program,
			householdIncome: studentInfo.householdIncome,
			targetNation: studentInfo.targetNation,
			typeOfScholarship: studentInfo.typeOfScholarship,
			field: studentInfo.field,
		}
		reset(data)
	}, [studentInfo])

	// Form Handlers
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

		if (e.target.name === 'degree') {
			if (e.target.value === 'high school') {
				setSelectProgram(studentProgram)
			} else {
				setSelectProgram(uniProgram)
			}
		}
	}
	const handleCancelBtn = (e) => {
		reset({
			email: email,
			firstName: studentInfo.firstName,
			lastName: studentInfo.lastName,
			birthdate: studentInfo.birthdate,
			gender: studentInfo.gender,
			phoneNumber: studentInfo.phoneNumber,
			gpax: studentInfo.gpax,
			degree: studentInfo.deg,
			school: studentInfo.school,
			program: studentInfo.program,
			householdIncome: studentInfo.income,
			targetNation: studentInfo.target,
			typeOfScholarship: studentInfo.scholarship,
			field: studentInfo.interest,
		})
	}
	const formOnSubmit = (data) => {
		// Update data using patch request
		axiosPrivate.patch(`/student/${auth.username}`, data).then((res) => {
			alert('Data has been updated successfully')
			console.log('submitted successfully')
			reset({
				firstName: getValues('firstName'),
				lastName: getValues('lastName'),
				birthdate: getValues('birthdate'),
				gender: getValues('gender'),
				phoneNumber: getValues('phoneNumber'),
				gpax: getValues('gpax'),
				degree: getValues('degree'),
				school: getValues('school'),
				program: getValues('program'),
				householdIncome: getValues('householdIncome'),
				targetNation: getValues('targetNation'),
				typeOfScholarship: getValues('typeOfScholarship'),
				field: getValues('field'),
			})
		})
	}
	const formOnError = (err) => {
		// Alert the users of incorrect pattern
		let messages = []
		Object.keys(err).forEach((key) => {
			messages.push(err[key].message)
		})
		alert(messages.join('\n'))
	}

	return (
		<Stack direction="column" alignItems="center" justifyContent="center">
			<Grid container sx={{ overflow: 'scroll', maxHeight: '500px', m: 0.5 }}>
				<Grid container sx={{ m: 2 }}>
					<FormControl
						component="form"
						onSubmit={handleSubmit(formOnSubmit, formOnError)}
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
									onChange={(value) => {
										let newStudentInfo = studentInfo
										newStudentInfo['birthdate'] = value
										let update = {}
										update['birthdate'] = value
										setStudentInfo(newStudentInfo)
										reset(update)
									}}
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
								value={studentInfo.phoneNumber}
								{...register('phoneNumber', {
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
								value={email}
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
								name="degree"
								InputLabelProps={{ shrink: true }}
								value={studentInfo.degree}
								{...register('degree', {
									// pattern: {
									// 	value: /^[A-Za-z]+$/,
									// 	message: 'Degree contains invalid character',
									// },
								})}
								error={!!errors?.Degree}
								helperText={errors?.Degree ? errors.Degree.message : null}
								variant="outlined"
								disabled={isUpdated}
								onChange={handleOnChange}
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
									// pattern: {
									// 	value: /^[A-Za-z]+$/,
									// 	message: 'Program contains invalid character',
									// },
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
								name="householdIncome"
								InputLabelProps={{ shrink: true }}
								value={studentInfo.householdIncome}
								{...register('householdIncome', {
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
								name="targetNation"
								InputLabelProps={{ shrink: true }}
								value={studentInfo.targetNation}
								{...register('targetNation', {
									pattern: {
										value: /^[a-zA-Z\s]*$/,
										message: 'Target Nation contains prohibited characters',
									},
								})}
								error={!!errors?.income}
								helperText={errors?.income ? errors.income.message : null}
								variant="outlined"
								disabled={isUpdated}
								onChange={handleOnChange}
							/>
							<TextField
								id="outlined-select-scholarship"
								select
								label="Type of scholarship"
								name="typeOfScholarship"
								disabled={isUpdated}
								value={studentInfo.typeOfScholarship}
								{...register('typeOfScholarship')}
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
								name="field"
								{...register('field')}
								InputLabelProps={{ shrink: true }}
								value={studentInfo.field}
								variant="outlined"
								disabled={isUpdated}
								onChange={handleOnChange}
							/>
						</Stack>
						<Grid
							container
							spacing={1}
							alignItems="stretch"
							justifyContent="space-evenly"
							sx={{ padding: '20px 0px 20px 0px' }}
						>
							<Grid item>
								<Button variant="contained" onClick={handleCancelBtn}>
									Cancel
								</Button>
							</Grid>
							<Grid item>
								<Button variant="contained" type="submit">
									Update
								</Button>
							</Grid>
						</Grid>
					</FormControl>
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
