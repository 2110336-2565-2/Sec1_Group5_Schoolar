import React from 'react'
import { useForm } from 'react-hook-form'
import { Button, FormControl, TextField } from '@mui/material'
import { Stack } from '@mui/system'

const FormPvdInfo = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({ mode: 'onBlur' })
	const [value, setValue] = React.useState()

	const onSubmit = (data) => alert(JSON.stringify(data))

	return (
		<FormControl component="form" onSubmit={handleSubmit(onSubmit)} sx={{ width: '100%' }}>
			<Stack spacing={3} direction="column">
				<TextField
					required
					id="outlined"
					label="Provider Name"
					{...register('providerName', {
						required: 'Provider Name is required',
						minLength: {
							value: 2,
							message: 'Provider Name must be at least 2 characters',
						},
						pattern: {
							// Contain only alphabets and numbers
							value: /^[a-zA-Z0-9]+$/,
							message: 'Provider Name contain invalid character',
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
						pattern: {
							value: /^[0-9]*$/,
							message: 'Phone number contains invalid character',
						},
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
					})}
					error={!!errors?.creditCardNumber}
					helperText={errors?.creditCardNumber ? errors.creditCardNumber.message : null}
				/>

				<TextField
					required
					id="outlined"
					label="Address"
					{...register('address', {
						required: 'Address is required'
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
