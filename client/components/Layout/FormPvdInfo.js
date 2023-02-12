import React from 'react'
import { useForm } from 'react-hook-form'
import { Button, FormControl, TextField } from '@mui/material'
import { Stack } from '@mui/system'

const FormPvdInfo = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm()
	const [value, setValue] = React.useState()

	const onSubmit = (data) => alert(JSON.stringify(data))

	return (
		<FormControl component="form" onSubmit={handleSubmit(onSubmit)} sx={{ width: '100%' }}>
			<Stack spacing={3} direction="column">
				<TextField
					id="outlined"
					label="Organization"
					{...register('organization', {
						required: 'Organization is required',
						minLength: {
							value: 2,
							message: 'Organization must be at least 2 characters',
						},
						pattern: {
							// Contain only alphabets and numbers
							value: /^[a-zA-Z0-9]+$/,
							message: 'Organization contain invalid character',
						},
					})}
					error={!!errors?.organization}
					helperText={errors?.organization ? errors.organization.message : null}
				/>
				<TextField
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
					id="outlined"
					label="Email"
					{...register('email', {
						pattern: {
							value: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
							message: 'Email is incorrect form',
						},
					})}
					error={!!errors?.email}
					helperText={errors?.email ? errors.email.message : null}
				/>

				<TextField id="outlined" label="Address" {...register('address')} />

				<Button variant="contained" type="submit" sx={{ backgroundColor: '#3F51A9' }}>
					SUBMIT
				</Button>
			</Stack>
		</FormControl>
	)
}

export default FormPvdInfo
