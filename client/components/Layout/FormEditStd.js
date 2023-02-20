import { React, useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { Button, FormControl,Grid,MenuItem,	Stack,	TextField} from '@mui/material'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import useAxiosPrivate from '@/hooks/useAxiosPrivate'
import { useAuth } from '@/context/AuthContext'
import { degrees, genders, scholarshipTypes, studentPrograms, uniPrograms } from '@utils/StdInformation'
import { getValidation } from '@utils/formUtils'
import { TextFieldComponent } from '@utils/formComponentUtils'

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
	const today = new Date().toISOString().split('T')[0]

	// Form hook
	const {
		register,
		handleSubmit,
		formState: { errors, defaultValues },
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
		
	// Get the current data from API
	const axiosPrivate = useAxiosPrivate()
	useEffect(() => {
		axiosPrivate.get(`/student/${auth.username}`).then((res) => {
			// let studentRes = res.data.student
			// studentRes.gpax = studentRes.gpax.toFixed(2)
			// setStudentInfo(studentRes)
			// // setEmail(res.data.user.email)
			setGender(res.data.student.gender)
			setDegree(res.data.student.degree)
			setProgram(res.data.student.program)
			setScholarship(res.data.student.typeOfScholarship)
			if (res.data.student.degree !== 'high school') setSelectProgram(uniPrograms)
			reset({
				firstName: res.data.student.firstName,
				lastName: res.data.student.lastName,
				birthdate: res.data.student.birthdate,
				gender: res.data.student.gender,
				phoneNumber: res.data.student.phoneNumber,
				email: res.data.user.email,
				gpax: res.data.student.gpax,
				degree: res.data.student.degree,
				school: res.data.student.school,
				program: res.data.student.program,
				householdIncome: res.data.student.householdIncome,
				targetNation: res.data.student.targetNation,
				typeOfScholarship: res.data.student.typeOfScholarship,
				field: res.data.student.field,
			})
		})
	}, [])

	// Form Handlers
	const handleOnChange = (e) => {
		if (e.target.name === 'degree') {
			if (e.target.value === 'high school') {
				setSelectProgram(studentPrograms)
			} else {
				setSelectProgram(uniPrograms)
			}
		}
	}

	const formOnSubmit = (data) => {
		// Update data using patch request
		console.log('DATA', data)
		axiosPrivate.patch(`/student/${auth.username}`, data).then((res) => {
			alert('Data has been updated successfully')
			console.log('submitted successfully')
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

	const isDupe = async (field, value) => {
		try {
			const response = await axiosPrivate.get(`/auth/isDupe/student/${field}/${value}`)
			if(field === 'phoneNumber' && oldValue.phoneNumber === value) return false;
			return response.data
		} catch (err) {
			console.log(err)
		}
	}

	const isModified = (field) => {
		console.log(field)
		if (!defaultValues) return false
		console.log(defaultValues[field], getValues(field))
		return defaultValues[field] !== getValues(field)
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
							{TextFieldComponent('firstName', true, register, errors, { shrink: true })}
							{TextFieldComponent('lastName', true, register, errors, { shrink: true })}
							<TextField
								required
								id="date"
								label="Birth Date"
								type="date"
								name="selectedDate"
								{...register('birthdate', getValidation('birthdate'))}
								InputLabelProps={{
									shrink: true,
								}}
								inputProps={{
									max: today,
								}}
							/>
							{/* <LocalizationProvider dateAdapter={AdapterDayjs}>
								<DatePicker
									disableFuture
									required
									label="Birth Date"
									InputLabelProps={{ shrink: true }}
									name="birthdate"
									openTo="year"
									views={['year', 'month', 'day']}
									{...register('birthdate', getValidation('birthdate'))}
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
							</LocalizationProvider> */}
							<TextField
								required
								select
								id="outlined"
								label="Gender"
								{...register('gender', getValidation('gender'))}
								error={!!errors?.gender}
								helperText={errors?.gender ? errors.gender.message : null}
								value={gender}
								onChange={(event) => setGender(event.target.value)}
							>
								{genders.map((option) => (
									<MenuItem key={option.value} value={option.value}>
										{option.label}
									</MenuItem>
								))}
							</TextField>
							{TextFieldComponent('phoneNumber', false, register, errors, {
								shrink: true,
								validation: isModified('phoneNumber') ? getValidation('phoneNumber') : {}, // if not modified don't do validation
							})}
							{TextFieldComponent('email', false, register, errors, {
								shrink: true,
								validation: isModified('email') ? getValidation('email') : {},
							})}
							{TextFieldComponent('school', false, register, errors, {
								label: 'School/University',
								shrink: true,
							})}
							<TextField
								id="outlined-start-adornment"
								select
								label="Degree"
								name="degree"
								InputLabelProps={{ shrink: true }}
								value={degree}
								{...register('degree')}
								error={!!errors?.degree}
								helperText={errors?.degree ? errors.degree.message : null}
								variant="outlined"
								onChange={(event) => {
									setDegree(event.target.value)
									handleOnChange(event)
								}}
							>
								{degrees.map((option) => (
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
								value={program}
								{...register('program')}
								error={!!errors?.Program}
								helperText={errors?.Program ? errors.Program.message : null}
								variant="outlined"
								onChange={(event) => setProgram(event.target.value)}
							>
								{selectProgram.map((option) => (
									<MenuItem key={option.value} value={option.value}>
										{option.label}
									</MenuItem>
								))}
							</TextField>
							{TextFieldComponent('gpax', false, register, errors, { shrink: true, label: 'GPAX' })}
							{TextFieldComponent('householdIncome', false, register, errors, {
								shrink: true,
								label: 'Household income per month',
							})}
							{TextFieldComponent('targetNation', false, register, errors, { shrink: true })}
							<TextField
								id="outlined-select-scholarship"
								select
								label="Type of scholarship"
								name="typeOfScholarship"
								value={scholarship}
								{...register('typeOfScholarship')}
								onChange={(event) => setScholarship(event.target.value)}
							>
								{scholarshipTypes.map((option) => (
									<MenuItem key={option.value} value={option.value}>
										{option.label}
									</MenuItem>
								))}
							</TextField>
							{TextFieldComponent('field', false, register, errors, {
								shrink: true,
								label: 'Field of interest',
							})}
						</Stack>
						<Grid
							container
							spacing={1}
							alignItems="stretch"
							justifyContent="space-evenly"
							sx={{ padding: '20px 0px 20px 0px' }}
						>
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
