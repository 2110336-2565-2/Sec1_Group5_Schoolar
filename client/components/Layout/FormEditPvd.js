import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Button, FormControl, Grid, Stack, TextField, Alert, AlertTitle } from '@mui/material'
import { useAuth } from '@/context/AuthContext'
import useAxiosPrivate from '@/hooks/useAxiosPrivate'
import { useRouter } from 'next/router'

const FormEditPvd = ({oldValue}) => {
	const { auth, setAuth } = useAuth()
	//*axios private to get data from route that need token
	const axiosPrivate = useAxiosPrivate()
	const router = useRouter()
	const {
		register,
		handleSubmit,
		formState: { errors },
		getValues,
		reset,
		setValue,
	} = useForm({
		mode: 'onBlur'
	})

	useEffect(() => {
		if (oldValue) {
			setValue('providerName', oldValue.providerName);
			setValue('website', oldValue.website);
			setValue('address', oldValue.address);
			setValue('creditCardNumber', oldValue.creditCardNumber);
			setValue('phoneNumber', oldValue.phoneNumber);
		  }
	}, [oldValue, setValue]);
	

	const onSubmit = (data) => {
		console.log(`submitted`)
		alert('Data has been updated successfully')
		try {
			axiosPrivate.patch(`/provider/${auth.username}`, data).then((res) => {
				console.log(`Success update at ${res.status}`);
			})
			router.push('/')
		} catch (err) {
			alert("NOT SUCCESS");
			console.log(err)
		}
	}

	const isDupe = async (field, value) => {
		try {
			const response = await axiosPrivate.get(`/auth/isDupe/provider/${field}/${value}`)
			if(field === 'phoneNumber' && oldValue.phoneNumber === value) return false;
			if(field === 'creditCardNumber' && oldValue.creditCardNumber === value) return false;
			return response.data
		} catch (err) {
			console.log(err)
		}
	}


	return (
		<Stack direction="column" alignItems="center" justifyContent="center">
			{/* {alertOpen && renderAlert()} */}
			<Grid container sx={{ overflow: 'auto', maxHeight: '500px', m: 0.5 }}>
				<Grid container sx={{ m: 2 }}>
					<FormControl
						component="form"
						onSubmit={handleSubmit(onSubmit)}
						sx={{ width: '100%' }}
					>
						<Stack spacing={3} direction="column">
							<TextField
								id="outlined-start-adornment"
								defaultValue={oldValue.providerName}
								label="Provider Name"
								InputLabelProps={{ shrink: true }}
								{...register('providerName', {
									required: 'Provider Name is required',
									maxLength: {
										value: 40,
										message: 'Provider Name must be at most 40 characters',
									},
								})}
								error={!!errors?.providerName}
								helperText={
									errors?.providerName ? errors.providerName.message : null
								}
								variant="outlined"
							/>
							<TextField
								id="outlined"
								label="Website"
								defaultValue={oldValue.website}
								InputLabelProps={{ shrink: true }}
								{...register('website', {
									required: 'Website is required',
									minLength: {
										value: 2,
										message: 'Website must be at least 2 characters',
									},
								})}
								error={!!errors?.website}
								helperText={errors?.website ? errors.website.message : null}
							/>
							<TextField
								id="outlined"
								label="Address"
								defaultValue={oldValue.address}
								InputLabelProps={{ shrink: true }}
								{...register('address')}
							/>

							<TextField
								id="outlined"
								label="Phone number"
								defaultValue={oldValue.phoneNumber}
								InputLabelProps={{ shrink: true }}
								{...register('phoneNumber', {
									required: 'Phone Number is required',
									minLength: {
										value: 9,
										message: 'Phone Number must be at least 9 digits',
									},
									maxLength: {
										value: 10,
										message: 'Phone Number must be at most 10 digits',
									},
									pattern: {
										value: /^[0-9]*$/,
										message: 'Phone number contains invalid character',
									},
									validate: {
										duplicate: async (value) =>
											!(await isDupe('phoneNumber', value)) || 'Phone number has been taken',
									},
								})}
								error={!!errors?.phoneNumber}
								helperText={errors?.phoneNumber ? errors.phoneNumber.message : null}
							/>

							<TextField
								id="outlined"
								label="Credit Card Number"
								defaultValue={oldValue.creditCardNumber}
								InputLabelProps={{ shrink: true }}
								{...register('creditCardNumber', {
									required: 'Credit Card Number is required',
									minLength: {
										value: 16,
										message: 'Credit Card Number must be 16 digits',
									},
									maxLength: {
										value: 16,
										message: 'Credit Card Number must be 16 digits',
									},
									pattern: {
										value: /^[0-9]*$/,
										message: 'Credit Card Number contains invalid character',
									},
									validate: {
										duplicate: async (value) =>
											!(await isDupe('creditCardNumber', value)) || 'Credit Card Number has been taken',
									},
								})}
								error={!!errors?.creditCardNumber}
								helperText={errors?.creditCardNumber? errors.creditCardNumber.message: null}
							/>

						</Stack>
						<Grid
							container
							spacing={1}
							alignItems="stretch"
							justifyContent="space-evenly"
							sx={{ padding: '20px 0px 20px 0px' }}
						>
							<Grid item>
								<Button variant="contained" onClick={() => router.push('/')}>
									BACK
								</Button>
							</Grid>

							<Grid item>
								<Button
									variant="contained"
									type="submit"
									onClick={() => {
										const values = getValues() 
										console.log(values)
									}}
								>
									SUBMIT
								</Button>
							</Grid>
						</Grid>
					</FormControl>
				</Grid>
			</Grid>
		</Stack>
	)
}

export default FormEditPvd
