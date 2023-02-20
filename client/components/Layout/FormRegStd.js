import React from 'react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Button, FormControl, FormControlLabel, FormLabel, MenuItem, Radio, RadioGroup, TextField } from '@mui/material'
import { Stack } from '@mui/system'
import { useRouter } from 'next/router'
import axios from '@/pages/api/axios'
import { degrees, genders, scholarshipTypes, studentPrograms, uniPrograms } from '@utils/StdInformation'
import { getValidation } from '@utils/formUtils'
import { DatePickerComponent, SelectComponent, TextFieldComponent } from '@utils/formComponentUtils'

const FormRegStd = ({ registerData }) => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({ mode: 'onBlur' })

	const router = useRouter()
	const [form, setForm] = useState(false)
	const [values, setValues] = useState({
		birthDate: '',
		gender: '',
		degree: '',
		program: '',
		typeOfScholarship: '',
	})

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
		console.log('DATA', data)
		if (!form) setForm(!form)
		else {
			const allData = Object.assign(registerData, data)
			sendData(JSON.stringify(allData))
		}
	}

	const props = { register, errors, values, setValues }
	return (
		<FormControl component="form" onSubmit={handleSubmit(onSubmit)} sx={{ width: '100%' }}>
			<Stack spacing={3} direction="column">
				{!form && (
					<>
						{TextFieldComponent('firstName', true, register, errors)}
						{TextFieldComponent('lastName', true, register, errors)}
						<DatePickerComponent name={'birthDate'} required={true} disableFuture={true} {...props} />
						<SelectComponent name={'gender'} required={true} {...props} />
						{TextFieldComponent('phoneNumber', true, register, errors)}
						<Button variant="contained" type="submit" sx={{ backgroundColor: '#3F51A9' }}>
							NEXT
						</Button>
					</>
				)}

				{form && (
					<>
						{TextFieldComponent('school', false, register, errors, { label: 'School/University' })}
						<SelectComponent name={'degree'} {...props} />
						<SelectComponent name={'program'} {...props} />
						{TextFieldComponent('gpax', false, register, errors, { label: 'GPAX' })}
						{TextFieldComponent('householdIncome', false, register, errors, {
							label: 'Household income per month',
						})}
						<FormControl>
							<FormLabel>Current employ</FormLabel>
							<RadioGroup row sx={{ mt: 1, gap: 4 }} defaultValue={false}>
								<FormControlLabel
									value={true}
									control={<Radio />}
									label="Yes"
									{...register('employment')}
								/>
								<FormControlLabel
									value={false}
									control={<Radio />}
									label="No"
									{...register('employment')}
								/>
							</RadioGroup>
						</FormControl>
						{TextFieldComponent('targetNation', false, register, errors)}
						<SelectComponent name={'typeOfScholarship'} {...props} />
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
