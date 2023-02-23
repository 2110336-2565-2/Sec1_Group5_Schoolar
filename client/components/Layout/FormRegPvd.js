import React from 'react'
import { useForm } from 'react-hook-form'
import { Button, FormControl } from '@mui/material'
import { Stack } from '@mui/system'
import axios from 'axios'
import { useRouter } from 'next/router'
import { TextFieldComponent } from '@utils/formComponentUtils'

const FormRegPvd = ({ values, setValues, setPage, register, handleSubmit, errors, getValues, gap }) => {
	const router = useRouter()

	const sendData = async (data) => {
		try {
			const response = await axios.post('/auth/register', data)
			alert(response.data)
			router.push('/login')
		} catch (error) {
			console.error(error)
		}
	}

	const onSubmit = async (data) => {
		console.log('Submit', data)
		sendData(data)
	}

	const formProps = { register, errors }
	return (
		<FormControl
			component="form"
			onSubmit={handleSubmit(onSubmit)}
			sx={{ display: 'flex', flexDirection: 'column', gap, width: '100%' }}
		>
			<TextFieldComponent name="providerName" required={true} shrink={true} {...formProps} />
			<TextFieldComponent name="website" required={true} shrink={true} {...formProps} />
			<TextFieldComponent name="phoneNumber" required={true} shrink={true} {...formProps} />
			<TextFieldComponent name="creditCardNumber" required={true} shrink={true} {...formProps} />
			<TextFieldComponent name="address" required={true} shrink={true} {...formProps} />
			<Stack spacing={2} direction={{ xs: 'column', sm: 'row' }}>
				<Button fullWidth variant="contained" onClick={() => setPage('register')}>
					Back
				</Button>
				<Button fullWidth variant="contained" type="submit">
					Submit
				</Button>
			</Stack>
		</FormControl>
	)
}

export default FormRegPvd
