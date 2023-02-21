import React from 'react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Button, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from '@mui/material'
import { Stack } from '@mui/system'
import { useRouter } from 'next/router'
import axios from '@/pages/api/axios'
import { DatePickerComponent, SelectComponent, TextFieldComponent } from '@utils/formComponentUtils'

const FormRegStd = ({ values, setValues, setPage, register, handleSubmit, errors, setValue }) => {
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
		<FormControl component="form" onSubmit={handleSubmit(onSubmit)} sx={{ width: '100%' }}>
			<Stack spacing={3} direction="column">
				{!form && (
					<>
						<TextFieldComponent name="firstName" required={true} {...formProps} />
						<TextFieldComponent name="lastName" required={true} {...formProps} />
						<DatePickerComponent name="birthdate" required={true} disableFuture={true} {...formProps} />
						<SelectComponent name="gender" required={true} {...formProps} />
						<TextFieldComponent name="phoneNumber" required={true} {...formProps} />
						<Button variant="contained" type="submit" sx={{ backgroundColor: '#3F51A9' }}>
							NEXT
						</Button>
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
