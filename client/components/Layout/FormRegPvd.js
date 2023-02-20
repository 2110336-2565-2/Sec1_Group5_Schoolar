import React from 'react'
import { useForm } from 'react-hook-form'
import { Button, FormControl, TextField } from '@mui/material'
import { Stack } from '@mui/system'
import axios from 'axios'
import { useRouter } from 'next/router'
import { getValidation } from '@utils/formUtils'
import { TextFieldComponent } from '@utils/formComponentUtils'

const FormRegPvd = ({ registerData }) => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({ mode: 'onBlur' })

	const router = useRouter()

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

	const onSubmit = async (data) => {
		const allData = Object.assign(registerData, data)
		sendData(JSON.stringify(allData))
	}

	const formProps = { register, errors }
	return (
		<FormControl component="form" onSubmit={handleSubmit(onSubmit)} sx={{ width: '100%' }}>
			<Stack spacing={3} direction="column">
				<TextFieldComponent name="providerName" required={true} shrink={true} {...formProps} />
				<TextFieldComponent name="website" required={true} shrink={true} {...formProps} />
				<TextFieldComponent name="phoneNumber" required={true} shrink={true} {...formProps} />
				<TextFieldComponent name="creditCardNumber" required={true} shrink={true} {...formProps} />
				<TextFieldComponent name="address" required={true} shrink={true} {...formProps} />
				<Button variant="contained" type="submit" sx={{ backgroundColor: '#3F51A9' }}>
					SUBMIT
				</Button>
			</Stack>
		</FormControl>
	)
}

export default FormRegPvd
