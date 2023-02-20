import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { Button, FormControl, Grid, Stack, TextField, Alert, AlertTitle } from '@mui/material'
import { useAuth } from '@/context/AuthContext'
import useAxiosPrivate from '@/hooks/useAxiosPrivate'
import { useRouter } from 'next/router'

const FormEditPvd = ({ oldValue }) => {
	const { auth, setAuth } = useAuth()
	//*axios private to get data from route that need token
	const axiosPrivate = useAxiosPrivate()
	const router = useRouter()
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

	useEffect(() => {
		if (oldValue) {
			setValue('providerName', oldValue.providerName)
			setValue('website', oldValue.website)
			setValue('address', oldValue.address)
			setValue('creditCardNumber', oldValue.creditCardNumber)
			setValue('phoneNumber', oldValue.phoneNumber)
		}
	}, [oldValue, setValue])

	//merge conflict
	// useEffect(() => {
	// 	// * example of using axios private to get data from route that need token
	// 	// * console.log(auth.username)
	// 	axiosPrivate.get(`/provider/${auth.username}`).then((res) => {
	// 		reset({
	// 			username: res.data.provider.username,
	// 			email: res.data.user.email,
	// 			providerName: res.data.provider.providerName,
	// 			website: res.data.provider.website,
	// 			phoneNumber: res.data.provider.phoneNumber,
	// 			creditCardNumber: res.data.provider.creditCardNumber,
	// 			address: res.data.provider.address,
	// 		})
	// 	})
	// }, [])
	// }

	const onSubmit = (data) => {
		try {
			axiosPrivate.patch(`/provider/${auth.username}`, data).then((res) => {
				console.log(`submitted`)
				alert('Data has been updated successfully')
				console.log(`Success update at ${res.status}`)
			})
			router.push('/')
		} catch (err) {
			alert('NOT SUCCESS')
			console.log(err)
		}
	}

	const isModified = (field) => {
		if (!defaultValues) return false
		return defaultValues[field] !== getValues(field)
	}

	return (
		<Stack direction="column" alignItems="center" justifyContent="center">
			{/* {alertOpen && renderAlert()} */}
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
