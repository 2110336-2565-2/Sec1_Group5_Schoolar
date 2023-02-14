import React from 'react'
import { useForm } from 'react-hook-form'
import { Button, FormControl, TextField } from '@mui/material'
import { Stack } from '@mui/system'
import axios from 'axios'
import { useRouter } from 'next/router'

const FormPvdInfo = ({ registerData }) => {
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
					'Content-Type': 'application/json'
				}
			})
			alert(response.data);
			router.push('/login')
		} catch (error) {
			console.error(error);
		}
	}

	const onSubmit = async (data) => {
		const allData = Object.assign(registerData, data)
		sendData(JSON.stringify(allData));
	}

	return (
		<FormControl component="form" onSubmit={handleSubmit(onSubmit)} sx={{ width: '100%' }}>
			<Stack spacing={3} direction="column">
				<TextField
					required
					id="outlined"
					label="Provider Name"
					autoComplete="providerName"
					{...register('providerName', {
						required: 'Provider Name is required',
						minLength: { value: 2, message: 'Provider Name must be at least 2 characters', },
						maxLength: { value: 40, message: 'Provider Name must be at most 40 characters' },
						pattern: {
							// Contain only alphabets and numbers
							value: /^[a-zA-Z0-9]+$/,
							message: 'Provider Name contains invalid character',
						},
					})}
					error={!!errors?.providerName}
					helperText={errors?.providerName ? errors.providerName.message : null}
				/>
				<TextField
					required
					id="outlined"
					label="Website"
					{...register('website', {
						required: 'Website is required',
						minLength: { value: 2, message: 'Website must be at least 2 characters' },
						maxLength: { value: 250, message: 'Website must be at most 250 characters' },
					})}
					error={!!errors?.website}
					helperText={errors?.website ? errors.website.message : null}
				/>

				<TextField
					required
					id="outlined"
					label="Phone number"
					{...register('phoneNumber', {
						required: 'Phone Number is required',
						minLength: { value: 9, message: 'Phone Number must be at least 9 digits' },
						maxLength: { value: 10, message: 'Phone Number must be at most 10 digits' },
						pattern: {
							value: /^[0-9]*$/,
							message: 'Phone number contains invalid character',
						},
						// validate: {
						// 	duplicate: async (value) =>
						// 		!(await isDupe('phoneNumber', value)) || 'Phone Number has been taken',
						// },
					})}
					error={!!errors?.phoneNumber}
					helperText={errors?.phoneNumber ? errors.phoneNumber.message : null}
				/>

				<TextField
					required
					id="outlined"
					label="Credit Card Number"
					{...register('creditCardNumber', {
						required: 'Credit Card Number is required',
						minLength: { value: 16, message: 'Credit Card Number must be 16 digits' },
						maxLength: { value: 16, message: 'Credit Card Number must be 16 digits' },
						pattern: {
							value: /^[0-9]*$/,
							message: 'Credit Card Number contains invalid character',
						},
						// validate: {
						// 	duplicate: async (value) =>
						// 		!(await isDupe('creditCardNumber', value)) || 'Credit Card Number has been taken',
						// },
					})}
					error={!!errors?.creditCardNumber}
					helperText={errors?.creditCardNumber ? errors.creditCardNumber.message : null}
				/>

				<TextField
					required
					id="outlined"
					label="Address"
					{...register('address', {
						required: 'Address is required',
						minLength: { value: 2, message: 'Address must be at least 2 characters' },
						maxLength: { value: 255, message: 'Address must be at most 255 characters' },
					})}
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

export default FormPvdInfo
