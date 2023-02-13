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
import { genders, degree, scholarshipTypes, studentProgram, uniProgram } from './StdInformation'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import dayjs from 'dayjs'
import axios from 'axios'

const FormStdInfo = ({ registerData }) => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({ mode: 'onBlur' })

	const [selectProgram, setSelectProgram] = useState(studentProgram)
	const [value, setValue] = useState(dayjs('2001-01-01'))
	const [form, setForm] = useState(false)

	const onSubmit = (data) => {
		alert(JSON.stringify(data))
		if (!form) setForm(!form)
		else {
			let allData = Object.assign(registerData, data)
			console.log(allData)
			//axios.post(`/register`, data).then(res => console.log(res.data));
		}
	}

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
									required
									id="outlined-required"
									label="Fisrt Name"
									autoComplete="firstName"
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
									required
									id="outlined"
									label="Last name"
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
										openTo="year"
										views={['year', 'month', 'day']}
										value={value}
										onChange={(newValue) => {
											setValue(newValue)
										}}
										renderInput={(params) => <TextField {...params} />}
										{...register('birthdate', {
											required: 'Date of birth is required',
										})}
									/>
								</LocalizationProvider>

								<TextField
									required
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
									required
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

								<Button
									variant="contained"
									type="submit"
									sx={{ backgroundColor: '#3F51A9' }}
								>
									NEXT
								</Button>
							</>
						)}

						{form && (
							<>
								<TextField
									id="outlined"
									label="School/University"
									{...register('school', {
										pattern: {
											value: /^[A-Za-z]+$/,
											message:
												'School or Univeristy contains invalid character',
										},
									})}
									error={!!errors?.school}
									helperText={errors?.school ? errors.school.message : null}
								/>

								<TextField
									select
									id="outlined"
									label="Degree"
									onClick={(event) => {
										if (event.target.value === 'high school') {
											setSelectProgram(studentProgram)
										} else {
											setSelectProgram(uniProgram)
										}
									}}
									{...register('degree')}
								>
									{degree.map((option) => (
										<MenuItem key={option.value} value={option.value}>
											{option.label}
										</MenuItem>
									))}
								</TextField>

								<TextField
									select
									id="outlined"
									label="Program/Faculty"
									{...register('program')}
								>
									{selectProgram.map((option) => (
										<MenuItem key={option.value} value={option.value}>
											{option.label}
										</MenuItem>
									))}
								</TextField>

								<TextField
									id="outlined"
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
								/>

								<TextField
									id="outlined"
									label="Household income"
									{...register('householdIncome', {
										pattern: {
											value: /^[0-9]*$/,
											message: 'Income must be integer',
										},
										min: { value: 0, message: 'Income must be positive' },
									})}
									error={!!errors?.householdIncome}
									helperText={errors?.householdIncome ? errors.householdIncome.message : null}
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
								<Stack spacing={2} direction={{ xs: 'column', sm: 'row' }}>
									<Button
										variant="contained"
										onClick={() => setForm(!form)}
										sx={{ backgroundColor: '#3F51A9', width: '100%' }}
									>
										BEFORE
									</Button>
									<Button
										variant="contained"
										type="submit"
										sx={{ backgroundColor: '#3F51A9', width: '100%' }}
									>
										SUBMIT
									</Button>
								</Stack>
							</>
						)}
					</Stack>
				</FormControl>
			</Grid>
		</Grid>
	)
}

export default FormStdInfo
