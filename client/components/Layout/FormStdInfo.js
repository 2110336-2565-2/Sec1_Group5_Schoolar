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
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import axios from 'axios'
import dayjs from 'dayjs'
import { useRouter } from 'next/router'

import { degree, genders, scholarshipTypes, studentProgram, uniProgram } from './StdInformation'

const FormStdInfo = ({ registerData }) => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({ mode: 'onBlur' })

	const router = useRouter()
	const [selectProgram, setSelectProgram] = useState(studentProgram)
	const [value, setValue] = useState(dayjs())
	const [form, setForm] = useState(false)

	const sendData = async (data) => {
		try {
			const response = await axios.post('/auth/register', data, {
				headers: {
					'Content-Type': 'application/json',
				},
			})
			alert(response.data)
			router.push('/login')
		} catch (error) {
			console.error(error)
		}
	}

	const onSubmit = (data) => {
		if (!form) setForm(!form)
		else {
			const allData = Object.assign(registerData, data)
			sendData(JSON.stringify(allData))
		}
	}

	const isDupe = async (role, field, value) => {
		try {
			const response = await axios.get(`/auth/isDupe/${role}/${field}/${value}`)
			return response.data
		} catch (err) {
			console.log(err)
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

								{/* <TextField
									id="date"
									type="date"
									label="Date of birth"
									{...register('birthdate', {
										required: 'Date of birth is required',
									})}
									error={!!errors?.birthdate}
									helperText={errors?.birthdate ? errors.birthdate.message : null}
								/> */}

								<TextField
									id="date"
									label="birth of Date"
									type="date"
									name="selectedDate"
									{...register('birthdate', { required: true })}
									InputLabelProps={{
										shrink: true,
									}}
								/>

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
										minLength: {
											value: 9,
											message: 'Phone number must be at least 9 characters',
										},
										maxLength: {
											value: 10,
											message: 'Phone number must be at most 10 characters',
										},
										validate: {
											duplicate: async (value) =>
												!(await isDupe('student', 'phoneNumber', value)) ||
												'Phone number has been taken',
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
									{...register('degree')}
									onChange={(event) => {
										const selectedValue = event.target.value
										if (selectedValue === 'high school') {
											setSelectProgram(studentProgram)
										} else {
											setSelectProgram(uniProgram)
										}
									}}
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
									helperText={
										errors?.householdIncome
											? errors.householdIncome.message
											: null
									}
								/>

								<FormLabel component="legend">Current employ</FormLabel>
								<RadioGroup
									row
									sx={{ m: 0, justifyContent: 'space-between' }}
									defaultValue={false}
									{...register('employment')}
								>
									<FormControlLabel
										value={true}
										control={<Radio />}
										label="Yes"
									></FormControlLabel>
									<FormControlLabel
										value={false}
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
