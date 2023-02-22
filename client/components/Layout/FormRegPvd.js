import React from 'react'
import { useForm } from 'react-hook-form'
import { Button, FormControl } from '@mui/material'
import { Stack } from '@mui/system'
import axios from 'axios'
import { useRouter } from 'next/router'
import { TextFieldComponent } from '@utils/formComponentUtils'

const FormRegPvd = ({ values, setValues, setPage, register, handleSubmit, errors, setValue }) => {
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
		sendData(data)
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
