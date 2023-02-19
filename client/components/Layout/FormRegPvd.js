import React from 'react'
import { useForm } from 'react-hook-form'
import { Button, FormControl, TextField } from '@mui/material'
import { Stack } from '@mui/system'
import axios from 'axios'
import { useRouter } from 'next/router'
import { getValidation } from '@utils/formUtils'

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
				<TextField
					required
					id="outlined"
					label="Provider Name"
					autoComplete="providerName"
					{...register('providerName', getValidation('providerName'))}
					error={!!errors?.providerName}
					helperText={errors?.providerName ? errors.providerName.message : null}
				/>
				<TextField
					required
					id="outlined"
					label="Website"
					{...register('website', getValidation('website'))}
					error={!!errors?.website}
					helperText={errors?.website ? errors.website.message : null}
				/>

				<TextField
					required
					id="outlined"
					label="Phone number"
					{...register('phoneNumber', getValidation('phoneNumber'))}
					error={!!errors?.phoneNumber}
					helperText={errors?.phoneNumber ? errors.phoneNumber.message : null}
				/>

				<TextField
					required
					id="outlined"
					label="Credit Card Number"
					{...register('creditCardNumber', getValidation('creditCardNumber'))}
					error={!!errors?.creditCardNumber}
					helperText={errors?.creditCardNumber ? errors.creditCardNumber.message : null}
				/>

				<TextField
					required
					id="outlined"
					label="Address"
					{...register('address', getValidation('address'))}
					error={!!errors?.address}
					helperText={errors?.address ? errors.address.message : null}
				/>

				<Button variant="contained" type="submit" sx={{ backgroundColor: '#3F51A9' }}>
					SUBMIT
				</Button>
			</Stack>
		</FormControl>
	)
}

export default FormRegPvd
