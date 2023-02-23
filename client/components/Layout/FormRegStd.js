import React from 'react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Button, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from '@mui/material'
import { Stack } from '@mui/system'
import { useRouter } from 'next/router'
import axios from '@/pages/api/axios'
import { DatePickerComponent, SelectComponent, TextFieldComponent } from '@utils/formComponentUtils'

const FormRegStd = ({ values, setValues, setPage, register, handleSubmit, errors, getValues, gap }) => {
	const router = useRouter()
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
		console.log('DATA', data)
		if (!form) setForm(!form)
		else {
			sendData(data)
		}
	}

	const formProps = { register, errors, values, setValues }
	return (
		<FormControl
			component="form"
			onSubmit={handleSubmit(onSubmit)}
			sx={{ display: 'flex', flexDirection: 'column', gap, width: '100%' }}
		>
			{!form && (
				<>
					<TextFieldComponent name="firstName" required={true} {...formProps} />
					<TextFieldComponent name="lastName" required={true} {...formProps} />
					<DatePickerComponent name="birthdate" required={true} disableFuture={true} {...formProps} />
					<SelectComponent name="gender" required={true} {...formProps} />
					<TextFieldComponent name="phoneNumber" required={true} {...formProps} />
					<Stack spacing={2} direction={{ xs: 'column', sm: 'row' }}>
						<Button fullWidth variant="contained" onClick={() => setPage('register')}>
							Back
						</Button>
						<Button fullWidth variant="contained" type="submit">
							Next
						</Button>
					</Stack>
				</>
			)}
			{form && (
				<>
					<TextFieldComponent name="school" label="School/University" {...formProps} />
					<SelectComponent name="degree" {...formProps} />
					<SelectComponent name="program" {...formProps} />
					<TextFieldComponent name="gpax" label="GPAX" {...formProps} />
					<TextFieldComponent name="targetNation" {...formProps} />
					<SelectComponent name="typeOfScholarship" label="Type of Scholarship" {...formProps} />
					<TextFieldComponent name="fieldOfInterest" label="Field of Interest" {...formProps} />
					<Stack spacing={2} direction={{ xs: 'column', sm: 'row' }}>
						<Button fullWidth variant="contained" onClick={() => setForm(!form)}>
							Back
						</Button>
						<Button fullWidth variant="contained" type="submit">
							Sumbit
						</Button>
					</Stack>
				</>
			)}
		</FormControl>
	)
}

export default FormRegStd
