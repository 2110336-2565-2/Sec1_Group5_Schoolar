import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Button, FormControl, Grid, Stack, TextField } from '@mui/material'

import { useAuth } from '@/context/AuthContext'
import useAxiosPrivate from '@/hooks/useAxiosPrivate'

import InputPassword from './InputPassword'
import { getValidation } from '@utils/formUtils'
import { TextFieldComponent } from '@utils/formComponentUtils'

const FormEditPvd = ({ isDisabled }) => {
	const { auth, setAuth } = useAuth()
	//*axios private to get data from route that need token
	const axiosPrivate = useAxiosPrivate()

	const {
		register,
		handleSubmit,
		formState: { errors, defaultValues },
		getValues,
		reset,
		setValue,
	} = useForm({
		mode: 'onBlur',
	})

	const isModified = (field) => {
		if (!defaultValues) return false
		return defaultValues[field] !== getValues(field)
	}

	useEffect(() => {
		// * example of using axios private to get data from route that need token
		// * console.log(auth.username)
		axiosPrivate.get(`/provider/${auth.username}`).then((res) => {
			reset({
				username: res.data.provider.username,
				email: res.data.user.email,
				providerName: res.data.provider.providerName,
				website: res.data.provider.website,
				phoneNumber: res.data.provider.phoneNumber,
				creditCardNumber: res.data.provider.creditCardNumber,
				address: res.data.provider.address,
			})
		})
	}, [])

	const onSubmit = (data) => {
		console.log(`submitted`)
		alert('Data has been updated successfully')
		axiosPrivate.patch(`/provider/${auth.username}`, data).then((res) => {
			console.log(res.status)
		})
		reset({
			providerName: getValues('providerName'),
			website: getValues('website'),
			address: getValues('address'),
			creditCardNumber: getValues('creditCardNumber'),
			email: getValues('email'),
			phoneNumber: getValues('phoneNumber'),
		})
	}

	return (
		<Stack direction="column" alignItems="center" justifyContent="center">
			<Grid container sx={{ overflow: 'auto', maxHeight: '500px', m: 0.5 }}>
				<Grid container sx={{ m: 2 }}>
					<FormControl component="form" onSubmit={handleSubmit(onSubmit)} sx={{ width: '100%' }}>
						<Stack spacing={3} direction="column">
							{TextFieldComponent('username', false, register, errors, {
								disabled: true,
								shrink: true,
								validation: isModified('username') ? getValidation('username') : {},
							})}
							{TextFieldComponent('email', false, register, errors, {
								shrink: true,
								validation: isModified('email') ? getValidation('email') : {}, // if not modified don't do validation
							})}
							{TextFieldComponent('providerName', false, register, errors, { shrink: true })}
							{TextFieldComponent('website', false, register, errors, { shrink: true })}
							{TextFieldComponent('phoneNumber', false, register, errors, {
								shrink: true,
								validation: isModified('phoneNumber') ? getValidation('phoneNumber') : {},
							})}
							{TextFieldComponent('creditCardNumber', false, register, errors, { shrink: true })}
							{TextFieldComponent('address', false, register, errors, { shrink: true })}
						</Stack>
						<Grid
							container
							spacing={1}
							alignItems="stretch"
							justifyContent="space-evenly"
							sx={{ padding: '20px 0px 20px 0px' }}
						>
							<Grid item>
								<Button
									variant="contained"
									type="submit"
									onClick={() => {
										const values = getValues() // { test: "test-input", test1: "test1-input" }
										// const singleValue = getValues('test') // "test-input"
										// const multipleValues = getValues(['test', 'test1'])
										// ["test-input", "test1-input"]
										// console.log(values)
									}}
								>
									Update
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
