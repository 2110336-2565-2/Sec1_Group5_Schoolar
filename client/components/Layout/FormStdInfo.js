import React from 'react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import {
	Button,
	FormControl,
	FormControlLabel,
	FormLabel,
	Grid,
	MenuItem,
	Radio,
	RadioGroup,
	TextField,
} from '@mui/material'
import { Stack } from '@mui/system'

const genders = [
	{ value: 'Male', label: 'Male' },
	{ value: 'Female', label: 'Female' },
	{ value: 'Non-binary', label: 'Non-binary' },
]

const faculty = [
	{ value: 'engineering', label: 'Engineering' },
	{ value: 'medicine', label: 'Medicine' },
	{ value: 'dentistry', label: 'Dentistry' },
	{ value: 'commerceAndAccountancy', label: 'Commerce and Accountancy' },
	{ value: 'law', label: 'Law' },
]

const programs = [
	{ value: 'sci-math', label: 'Sci-math' },
	{ value: 'art-math', label: 'Art-math' },
	{ value: 'language-arts', label: 'Language-arts' },
]

const degrees = [
	{ value: 'highSchool', label: 'High School' },
	{ value: 'bachelor', label: 'Bachelor' },
	{ value: 'master', label: 'Master' },
]

const scholarshipTypes = [
	{ value: 'Full scholarship', label: 'Full Scholarship' },
	{ value: 'Partial scholarship', label: 'Partial Scholarship' },
	{ value: 'Renewable scholarship', label: 'Renewable Scholarship' },
	{ value: 'Followship', label: 'Followship' },
]

const FormProvideStdInfo = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm()

	
	const onSubmit = (data) => {
		//console.log(errors)
		console.log(data)
		alert(JSON.stringify(data))
	}

	const [form, setForm] = useState(false)
	const handleNext = () => {
		setForm(!form);
	}

	const [degree, setDegree] = useState('');

	console.log(errors);

	return (
		<Grid container sx={{ overflow: 'scroll', maxHeight: '500px', m: 0.5 }}>
			<Grid container sx={{ m: 2 }}>
				<FormControl
					component="form"
					onSubmit={handleSubmit(onSubmit)}
					sx={{ width: '100%' }}
				>
					<Stack spacing={3} direction="column">
						{!form && (
							<>
								<TextField
									id="outlined-required"
									label="Fisrt Name"
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
									id="outlined"
									label="Surname"
									autoComplete="Surname"
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
									helperText={errors?.surname ? errors.surname.message : null}
								/>

								<TextField
									id="date"
									type="date"
									label="Date of birth"
									{...register('dateOfBirth', {
										required: 'Date of birth is required',
									})}
									error={!!errors?.dateOfBirth}
									helperText={
										errors?.dateOfBirth ? errors.dateOfBirth.message : null
									}
								/>

								<TextField
									select
									id="outlined"
									label="Gender"
									{...register('gender', {
										required: 'Gender is required',
									})}
									error={!!errors?.gender}
									helperText={errors?.gender ? errors.gender.message : null}
								>
									{genders.map((option) => (
										<MenuItem key={option.value} value={option.value}>
											{option.label}
										</MenuItem>
									))}
								</TextField>

								<TextField
									id="outlined"
									label="Phone number"
									{...register('phoneNumber', {
										required: 'Phone number is required',
										pattern: {
											value: /^[0-9]*$/,
											message: 'Phone number contains invalid character',
										},
									})}
									error={!!errors?.phoneNumber}
									helperText={
										errors?.phoneNumber ? errors.phoneNumber.message : null
									}
								/>

								<TextField
									id="outlined"
									label="Email"
									{...register('email', {
										required: 'Email is required',
										pattern: {
											value: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
											message: 'Email is incorrect form',
										},
									})}
									error={!!errors?.email}
									helperText={errors?.email ? errors.email.message : null}
								/>

								<Button
									variant="contained"
									onClick={() => {
										const isValid = handleSubmit(onSubmit);
										if (isValid) {handleNext();}
									}}
									sx={{ backgroundColor: '#3F51A9' }}
								>
									NEXT
								</Button>
							</>
						)}

						{form && (
							<>
								{/* Additional information */}

								<TextField
									select
									id="outlined"
									label="Degree"
									{...register('education.degree')}
								>
									{degrees.map((option) => (
										<MenuItem key={option.value} value={option.value}>
											{option.label}
										</MenuItem>
									))}
								</TextField>

								<TextField
									id="outlined"
									label="School/University"
									{...register('education.school', {
										pattern: {
											value: /^[A-Za-z]+$/,
											message:
												'School or Univeristy contains invalid character',
										},
									})}
									error={!!errors?.education?.school}
									helperText={errors?.education?.school ? errors.education?.school.message : null}
								/>

								<TextField
									id="outlined"
									label="GPAX"
									{...register('education.gpax', {
										pattern: {
											value: /^[0-9]*\.[0-9][0-9]$/,
											message: 'GPAX must be float number with 2 digits',
										},
										min: { value: 0, message: 'GPAX must be positive' },
										max: { value: 4, message: 'GPAX must be at most 4' },
									})}
									error={!!errors?.education?.gpax}
									helperText={errors?.education?.gpax ? errors.educational?.gpax.message : null}
								/>

								<TextField
									select
									id="outlined"
									label="Program/Faculty"
									{...register('education.program')}
								>
									{programs.map((option) => (
										<MenuItem key={option.value} value={option.value}>
											{option.label}
										</MenuItem>
									))}
								</TextField>

								<TextField
									id="outlined"
									label="Household income"
									{...register('income', {
										pattern: {
											value: /^[0-9]*$/,
											message: 'Income must be integer',
										},
										min: { value: 0, message: 'Income must be positive' },
									})}
									error={!!errors?.income}
									helperText={errors?.income ? errors.income.message : null}
								/>

								<FormLabel component="legend">Current employ</FormLabel>
								<RadioGroup
									row
									sx={{ m: 0, justifyContent: 'space-between' }}
									{...register('employment')}
								>
									<FormControlLabel
										value="true"
										control={<Radio />}
										label="Yes"
									></FormControlLabel>
									<FormControlLabel
										value="false"
										control={<Radio />}
										label="No"
									></FormControlLabel>
									<Stack></Stack>
								</RadioGroup>

								<TextField
									id="outlined"
									label="Target nation"
									{...register('targetNation', {
										pattern: {
											value: /^[A-Za-z]+$/,
											message: 'Target nation contains invalid characters',
										},
									})}
									error={!!errors?.targetNation}
									helperText={
										errors?.targetNation ? errors.targetNation.message : null
									}
								/>

								<TextField
									select
									id="outlined"
									label="Type of scholarship"
									{...register('typeOfScholarship')}
								>
									{scholarshipTypes.map((option) => (
										<MenuItem key={option.value} value={option.value}>
											{option.label}
										</MenuItem>
									))}
								</TextField>

								<TextField
									id="outlined"
									label="Field of interest"
									{...register('field', {
										pattern: {
											value: /^[A-Za-z]+$/,
											message:
												'Field of interest contains invalid characters',
										},
									})}
									error={!!errors?.field}
									helperText={errors?.field ? errors.field.message : null}
								/>

								<Button
									variant="contained"
									type="submit"
									sx={{ backgroundColor: '#3F51A9' }}
								>
									SUBMIT
								</Button>
							</>
						)}
					</Stack>
				</FormControl>
			</Grid>
		</Grid>
	)
}

export default FormProvideStdInfo
