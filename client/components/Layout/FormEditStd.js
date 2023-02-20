import { React, useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { Button, FormControl,Grid,MenuItem,	Stack,	TextField} from '@mui/material'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import useAxiosPrivate from '@/hooks/useAxiosPrivate'
import { useAuth } from '@/context/AuthContext'
import { degree, genders, scholarshipTypes, studentProgram, uniProgram } from '@utils/StdInformation'
import { useRouter } from 'next/router'

const FormEditStd = ({oldValue}) => {
	// States
	const { auth, setAuth } = useAuth();
	const [gender, setGender] = useState(oldValue?.gender || '');
	const [degrees, setDegree] = useState(oldValue?.degree || '');
	const [program, setProgram] = useState(oldValue?.program || '');
	const [scholarship, setScholarship] = useState(oldValue?.typeOfScholarship || '');
	const [selectProgram, setSelectProgram] = useState(studentProgram)
	const router = useRouter()
	// Update the data 
	const axiosPrivate = useAxiosPrivate()
	// Form hook
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
		setValue,
	} = useForm({
		mode: 'onBlur',
	})

	useEffect(() => {
		if (oldValue) {
			setValue('firstName', oldValue.firstName);
			setValue('lastName', oldValue.lastName);
			setValue('birthdate', oldValue.birthdate);
			setValue('gender', oldValue.gender);
			setValue('phoneNumber', oldValue.phoneNumber);
			setValue('school', oldValue.school);
			setValue('degree', oldValue.degree);
			setValue('program', oldValue.program);
			setValue('gpax', oldValue.gpax);
			setValue('householdIncome', oldValue.householdIncome);
			setValue('targetNation', oldValue.targetNation);
			setValue('typeOfScholarship', oldValue.typeOfScholarship);
			setValue('field', oldValue.field);
		  }
		
	}, [oldValue, setValue]);
		
	const formOnSubmit = (data) => {
		// Update data using patch request
		alert('Data has been updated successfully')
		try {
			axiosPrivate.patch(`/student/${auth.username}`, data).then((res) => {
				console.log(`Success update at ${res.status}`);
			})
			router.push('/')
		} catch (err) {
			alert("NOT SUCCESS");
			console.log(err)
		}
	}
	const formOnError = (err) => {
		// Alert the users of incorrect pattern
		let messages = []
		Object.keys(err).forEach((key) => {
			messages.push(err[key].message)
		})
		alert(messages.join('\n'))
	}

	const isDupe = async (field, value) => {
		try {
			const response = await axiosPrivate.get(`/auth/isDupe/student/${field}/${value}`)
			if(field === 'phoneNumber' && oldValue.phoneNumber === value) return false;
			return response.data
		} catch (err) {
			console.log(err)
		}
	}

	return (
		
		<Stack direction="column" alignItems="center" justifyContent="center">
			<Grid container sx={{ overflow: 'auto', maxHeight: '500px', m: 0.5 }}>
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
								variant="outlined"
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
								helperText={errors?.firstName ? errors.firstName.message : null}
							/>
							<TextField
								id="outlined-start-adornment"
								required
								label="Surname"
								name="lastName"
								variant="outlined"
								InputLabelProps={{ shrink: true }}
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
								error={!!errors?.lastName}
								helperText={errors?.lastName ? errors.lastName.message : null}
							/>
							<LocalizationProvider dateAdapter={AdapterDayjs}>
								<DatePicker
									disableFuture
									required
									label="Date of Birth"
									InputLabelProps={{ shrink: true }}
									name="birthdate"
									openTo="year"
									views={['year', 'month', 'day']}
									{...register('birthdate')}
									renderInput={(params) => <TextField {...params} />}
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
								//defaultValue={genders.find((option) => option.value === oldValue.gender)?.value || ""}
								InputLabelProps={{ shrink: true }}
								{...register('gender')}
								value={gender}
								onChange={(event) => setGender(event.target.value)}
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
								name="phoneNumber"
								InputLabelProps={{ shrink: true }}
								{...register('phoneNumber', {
									required: 'Phone Number is required',
									minLength: {
										value: 9,
										message: 'Phone Number must be at least 9 digits',
									},
									maxLength: {
										value: 10,
										message: 'Phone Number must be at most 10 digits',
									},
									pattern: {
										value: /^[0-9]*$/,
										message: 'Phone number contains invalid character',
									},
									validate: {
										duplicate: async (value) =>
											!(await isDupe('phoneNumber', value)) || 'Phone number has been taken',
									},
								})}
								error={!!errors?.phoneNumber}
								helperText={errors?.phoneNumber ? errors.phoneNumber.message : null}
								variant="outlined"
							/>
							<TextField
								id="outlined-start-adornment"
								label="School/University"
								name="school"
								InputLabelProps={{ shrink: true }}
								{...register('school', {
									pattern: {
										value: /^[A-Za-z0-9 ]*$/,
										message: 'School contains invalid character',
									},
								})}
								error={!!errors?.school}
								helperText={errors?.school ? errors.school.message : null}
								variant="outlined"
							/>
							<TextField
								id="outlined-start-adornment"
								select
								label="Degree"
								name="degree"
								InputLabelProps={{ shrink: true }}
								{...register('degree')}
								value={degrees}
								onChange={(event) => {
									setDegree(event.target.value)
									if (degrees === 'high school') {
										setSelectProgram(studentProgram)
									} else {
										setSelectProgram(uniProgram)
									}
								}}
								variant="outlined"
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
								{...register('program')}
								value={program}
								onChange={(event) => setProgram(event.target.value)}
								variant="outlined"
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
							/>
							<TextField
								id="outlined-start-adornment"
								label="Household Income"
								name="householdIncome"
								InputLabelProps={{ shrink: true }}
								{...register('householdIncome', {
									pattern: {
										value: /^[0-9]*$/,
										message: 'Income must be integer',
									},
									min: { value: 0, message: 'Income must be positive' },
								})}
								error={!!errors?.householdIncome}
								helperText={errors?.householdIncome ? errors.householdIncome.message : null}
								variant="outlined"
							/>
							<TextField
								id="outlined-start-adornment"
								label="Target Nation"
								name="targetNation"
								InputLabelProps={{ shrink: true }}
								{...register('targetNation', {
									pattern: {
										value: /^[a-zA-Z\s]*$/,
										message: 'Target Nation contains prohibited characters',
									},
								})}
								error={!!errors?.targetNation}
								helperText={errors?.targetNation ? errors.targetNation.message : null}
								variant="outlined"
							/>
							<TextField
								id="outlined-select-scholarship"
								select
								label="Type of scholarship"
								name="typeOfScholarship"
								{...register('typeOfScholarship')}
								value={scholarship}
								onChange={(event) => setScholarship(event.target.value)}
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
								variant="outlined"
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
								<Button variant="contained" onClick={() => router.push('/')}>
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

export default FormEditStd
