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

	return (
		<FormControl component="form" onSubmit={handleSubmit(onSubmit)} sx={{ width: '100%' }}>
			<Stack spacing={3} direction="column">
				{TextFieldComponent('providerName', true, register, errors)}
				{TextFieldComponent('website', true, register, errors)}
				{TextFieldComponent('phoneNumber', true, register, errors)}
				{TextFieldComponent('creditCardNumber', true, register, errors)}
				{TextFieldComponent('address', true, register, errors)}
				<Button variant="contained" type="submit" sx={{ backgroundColor: '#3F51A9' }}>
					SUBMIT
				</Button>
			</Stack>
		</FormControl>
	)
}

export default FormRegPvd
