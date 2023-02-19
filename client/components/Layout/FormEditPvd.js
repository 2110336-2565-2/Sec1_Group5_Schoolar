import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Button, FormControl, Grid, Stack, TextField } from '@mui/material'

import { useAuth } from '@/context/AuthContext'
import useAxiosPrivate from '@/hooks/useAxiosPrivate'

import InputPassword from './InputPassword'
import { getValidation } from '@utils/formUtils'

const FormEditPvd = ({ isDisabled }) => {
	const { auth, setAuth } = useAuth()
	//*axios private to get data from route that need token
	const axiosPrivate = useAxiosPrivate()
	const {
		register,
		handleSubmit,
		formState: { errors },
		getValues,
		reset,
		setValue,
	} = useForm({
		mode: 'onBlur',
	})
	//* password related value
	const [isSubmitted, setIsCancel] = useState(false)
	const [password, setPassword] = useState('')
	const [rePassword, setRePassword] = useState('')
	const [showPassword, setShowPassword] = React.useState(false)

	//* assign value
	const [username, setUsername] = useState('')
	const [providerName, setProviderName] = useState('')
	const [creditCardNumber, setCreditCardNumber] = useState('')
	const [address, setAddress] = useState('')
	const [phoneNumber, setPhoneNumber] = useState('')
	const [email, setEmail] = useState('')
	const [website, setWebsite] = useState('')

	useEffect(() => {
		//* example of using axios private to get data from route that need token
		//* console.log(auth.username)
		axiosPrivate.get(`/provider/${auth.username}`).then((res) => {
			console.log(res.data.provider.providerName)

			setUsername(res.data.provider.username)
			setProviderName(res.data.provider.providerName)
			setCreditCardNumber(res.data.provider.creditCardNumber)
			setAddress(res.data.provider.address)
			setEmail(res.data.user.email)
			setPhoneNumber(res.data.provider.phoneNumber)
			setWebsite(res.data.provider.website)
			reset({
				providerName: res.data.provider.providerName,
				website: res.data.provider.website,
				address: res.data.provider.address,
				creditCardNumber: res.data.provider.creditCardNumber,
				email: res.data.user.email,
				phoneNumber: res.data.provider.phoneNumber,
			})
			console.log(`after : ${providerName}`)
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

	const handleClickShowPassword = () => setShowPassword((show) => !show)

	const handleMouseDownPassword = (event) => {
		event.preventDefault()
	}
	const handleOnChange = (e) => {
		setValue(e.target.name, e.target.value)
	}
	const handleCancelBtn = (e) => {
		reset({
			providerName: providerName,
			website: website,
			address: address,
			creditCardNumber: creditCardNumber,
			email: email,
			phoneNumber: phoneNumber,
		})
	}

	return (
		<Stack direction="column" alignItems="center" justifyContent="center">
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
								value={username}
								label="Username"
								variant="outlined"
								disabled
							/>
							<TextField
								id="outlined"
								label="Email"
								defaultValue={email}
								InputLabelProps={{ shrink: true }}
								{...register('email', getValidation('email'))}
								error={!!errors?.email}
								helperText={errors?.email ? errors.email.message : null}
								onChange={handleOnChange}
							/>
							<TextField
								id="outlined-start-adornment"
								value={getValues(providerName)}
								label="Provider Name"
								InputLabelProps={{ shrink: true }}
								{...register('providerName', getValidation('providerName'))}
								error={!!errors?.providerName}
								helperText={
									errors?.providerName ? errors.providerName.message : null
								}
								variant="outlined"
								onChange={handleOnChange}
							/>
							<TextField
								id="outlined"
								label="Website"
								defaultValue={website}
								InputLabelProps={{ shrink: true }}
								{...register('website', getValidation('website'))}
								error={!!errors?.website}
								helperText={errors?.website ? errors.website.message : null}
								onChange={handleOnChange}
							/>

							<TextField
								id="outlined"
								label="Phone number"
								defaultValue={phoneNumber}
								InputLabelProps={{ shrink: true }}
								{...register('phoneNumber', getValidation('phoneNumber'))}
								error={!!errors?.phoneNumber}
								helperText={errors?.phoneNumber ? errors.phoneNumber.message : null}
								onChange={handleOnChange}
							/>

							<TextField
								id="outlined"
								label="Credit Card Number"
								defaultValue={creditCardNumber}
								InputLabelProps={{ shrink: true }}
								{...register('creditCardNumber', getValidation('creditCardNumber'))}
								error={!!errors?.creditCardNumber}
								helperText={
									errors?.creditCardNumber
										? errors.creditCardNumber.message
										: null
								}
								onChange={handleOnChange}
							/>
							<TextField
								id="outlined"
								label="Address"
								defaultValue={address}
								InputLabelProps={{ shrink: true }}
								{...register('address', getValidation('address'))}
								onChange={handleOnChange}
								error={!!errors?.address}
								helperText={errors?.address ? errors.address.message : null}
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
								<Button variant="contained" onClick={handleCancelBtn}>
									Cancel
								</Button>
							</Grid>

							<Grid item>
								<Button
									variant="contained"
									type="submit"
									onClick={() => {
										const values = getValues() // { test: "test-input", test1: "test1-input" }
										// const singleValue = getValues('test') // "test-input"
										// const multipleValues = getValues(['test', 'test1'])
										// ["test-input", "test1-input"]
										console.log(values)
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
