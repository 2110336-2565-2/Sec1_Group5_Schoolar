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
import { useRouter } from 'next/router'

import axios from '@/pages/api/axios'

import { degrees, genders, scholarshipTypes, studentPrograms, uniPrograms } from '@utils/StdInformation'
import { getValidation } from '@utils/formUtils'
import { TextFieldComponent } from '@utils/formComponentUtils'
const FormRegStd = ({ registerData }) => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({ mode: 'onBlur' })

	const router = useRouter()
	const today = new Date().toISOString().split('T')[0]
	const [selectProgram, setSelectProgram] = useState(studentPrograms)
	const [gender, setGender] = useState('')
	const [degree, setDegree] = useState('')
	const [program, setProgram] = useState('')
	const [scholarship, setScholarship] = useState('')
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

	return (
		<FormControl component="form" onSubmit={handleSubmit(onSubmit)} sx={{ width: '100%' }}>
			<Stack spacing={3} direction="column">
				{!form && (
					<>
						{TextFieldComponent('firstName', true, register, errors)}
						{TextFieldComponent('lastName', true, register, errors)}
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
						{TextFieldComponent('phoneNumber', true, register, errors)}
						<Button variant="contained" type="submit" sx={{ backgroundColor: '#3F51A9' }}>
							NEXT
						</Button>
					</>
				)}

				{form && (
					<>
						{TextFieldComponent('school', false, register, errors, { label: 'School/University' })}
						<TextField
							select
							id="outlined"
							label="Degree"
							{...register('degree')}
							value={degree}
							onChange={(event) => {
								setDegree(event.target.value) //TODO fix this
								if (degree === 'high school') {
									setSelectProgram(studentPrograms)
								} else {
									setSelectProgram(uniPrograms)
								}
							}}
						>
							{degrees.map((option) => (
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
							value={program}
							onChange={(event) => setProgram(event.target.value)}
						>
							{selectProgram.map((option) => (
								<MenuItem key={option.value} value={option.value}>
									{option.label}
								</MenuItem>
							))}
						</TextField>
						{TextFieldComponent('gpax', false, register, errors, { label: 'GPAX' })}
						{TextFieldComponent('householdIncome', false, register, errors, {
							label: 'Household income per month',
						})}

						<FormLabel component="legend">Current employ</FormLabel>
						<RadioGroup
							row
							sx={{ m: 0, justifyContent: 'space-between' }}
							defaultValue={false}
							{...register('employment')}
						>
							<FormControlLabel value={true} control={<Radio />} label="Yes"></FormControlLabel>
							<FormControlLabel value={false} control={<Radio />} label="No"></FormControlLabel>
							<Stack></Stack>
						</RadioGroup>
						{TextFieldComponent('targetNation', false, register, errors)}
						<TextField
							select
							id="outlined"
							label="Type of scholarship"
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
						{TextFieldComponent('field', false, register, errors, { label: 'Field of interest' })}
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
	)
}

export default FormRegStd
