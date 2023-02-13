import React, { useEffect, useState } from 'react'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import {
	Box,
	Button,
	FormControl,
	FormHelperText,
	InputLabel,
	OutlinedInput,
	TextField,
	Grid,
	Stack,
} from '@mui/material'
import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'
import Grid2 from '@mui/material/Unstable_Grid2'
import { useAuth } from '@/context/AuthContext'
import useAxiosPrivate from '@/hooks/useAxiosPrivate'
import InputPassword from './InputPassword'
import { useForm } from 'react-hook-form'

const FormUpdatePvdInfo = ({ isDisabled }) => {
	const { auth, setAuth } = useAuth()
	//*axios private to get data from route that need token
	const axiosPrivate = useAxiosPrivate()

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
			//console.log(`providerName: ${res.data.provider.providerName}`)

			setUsername(res.data.provider.username)
			setProviderName(res.data.provider.providerName)
			setCreditCardNumber(res.data.provider.creditCardNumber)
			setAddress(res.data.provider.address)
			setEmail(res.data.user.email)
			setPhoneNumber(res.data.user.phoneNumber)
			setWebsite(res.data.provider.website)
			reset({
				providerName: res.data.provider.username,
				website: res.data.provider.website,
				address: res.data.provider.address,
				creditCardNumber: res.data.provider.creditCardNumber,
				email: res.data.user.email,
				phoneNumber: res.data.user.phoneNumber,
			})
			// defaultValues.providerName = res.data.provider.providerName
			// defaultValues.website = website
			// defaultValues.address = address
			// defaultValues.creditCardNumber = creditCardNumber
			// defaultValues.email = email
			// defaultValues.phoneNumber = phoneNumber
		})
	}, [])

	const {
		register,
		handleSubmit,
		formState: { errors, isDirty, dirtyFields },
		getValues,
		reset,
		setValue,
	} = useForm({
		mode: 'onBlur',
	})
	const onSubmit = (data) => {
		console.log(`submitted :`)
		alert('Data has been updated successfully')
		axiosPrivate.patch(`/provider/${auth.username}`, data).then((res) => {
			console.log(res.status)
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
			<Grid container sx={{ overflow: 'scroll', maxHeight: '500px', m: 0.5 }}>
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
								id="outlined-start-adornment"
								defaultValue={providerName}
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
								onChange={handleOnChange}
							/>
							<TextField
								id="outlined"
								label="Website"
								defaultValue={website}
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
								onChange={handleOnChange}
							/>
							<TextField
								id="outlined"
								label="Address"
								defaultValue={address}
								InputLabelProps={{ shrink: true }}
								{...register('address')}
								onChange={handleOnChange}
							/>

							<TextField
								id="outlined"
								label="Phone number"
								defaultValue={phoneNumber}
								InputLabelProps={{ shrink: true }}
								{...register('phoneNumber', {
									required: 'Phone Number is required',
									pattern: {
										value: /^[0-9]*$/,
										message: 'Phone number contains invalid character',
									},
								})}
								error={!!errors?.phoneNumber}
								helperText={errors?.phoneNumber ? errors.phoneNumber.message : null}
								onChange={handleOnChange}
							/>

							<TextField
								id="outlined"
								label="Credit Card Number"
								defaultValues={creditCardNumber}
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
								})}
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
								label="Email"
								defaultValues={email}
								InputLabelProps={{ shrink: true }}
								{...register('email', {
									pattern: {
										value: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
										message: 'Email is incorrect form',
									},
								})}
								error={!!errors?.email}
								helperText={errors?.email ? errors.email.message : null}
								onChange={handleOnChange}
							/>
							{/* <FormControl >
							<InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
							<OutlinedInput
								id="outlined-adornment-password"
								type={showPassword ? 'text' : 'password'}
								defaultValue=" "
								endAdornment={
									<InputAdornment position="end">
										<IconButton
											aria-label="toggle password visibility"
											onClick={handleClickShowPassword}
											onMouseDown={handleMouseDownPassword}
											edge="end"
											
										>
											{showPassword ? <VisibilityOff /> : <Visibility />}
										</IconButton>
									</InputAdornment>
								}
								label="password"
								variant="outlined"
								onChange={(e) => {
									setPassword(e.target.value)
								}}
								value={password}
							/>
						</FormControl>
						<FormControl
							variant="outlined"
							helperText={password != rePassword ? 'Password not match' : ''}
							
						>
							<InputLabel
								htmlFor="outlined-adornment-password"
								error={password != rePassword}
							>
								Re-type New Password
							</InputLabel>
							<OutlinedInput
								id="outlined-adornment-password"
								defaultValue=" "
								type={showPassword ? 'text' : 'password'}
								value={rePassword}
								error={password != rePassword}
								endAdornment={
									<InputAdornment position="end">
										<IconButton
											aria-label="toggle password visibility"
											onClick={handleClickShowPassword}
											onMouseDown={handleMouseDownPassword}
											edge="end"
											
										>
											{showPassword ? <VisibilityOff /> : <Visibility />}
										</IconButton>
									</InputAdornment>
								}
								label="Re-type New Password"
								onChange={(e) => {
									setRePassword(e.target.value)
								}}
							/>
							{password != rePassword && (
								<FormHelperText error={password != rePassword}>
									Password not match
								</FormHelperText>
							)}
						</FormControl> */}
							<InputPassword
								register={{
									...register('password', {
										required: false,
										minLength: {
											value: 8,
											message: 'Password must be at least 8 characters',
										},
										maxLength: {
											value: 40,
											message: 'Password must be at most 40 characters',
										},
										validate: {
											upper: (value) =>
												/(?=.*[A-Z])/.test(value) ||
												'Password must have at least one uppercase letter',
											lower: (value) =>
												/(?=.*[a-z])/.test(value) ||
												'Password must have at least one lower letter',
											special: (value) =>
												/(?=.*[0-9!"#$%&'()*+,-./:;<=>?@_`{|}~\[\]\\])/.test(
													value,
												) ||
												'Password must have at least one digit number or special character',
											space: (value) =>
												/^\S*$/.test(value) ||
												'Password must not contain spaces',
										},
									}),
								}}
								error={!!errors?.password}
								helperText={errors?.password ? errors.password.message : null}
							/>
							<InputPassword
								label={'Confirmed Password'}
								register={{
									...register('cfpassword', {
										validate: {
											similar: (value) =>
												value === getValues('password') ||
												'Password do not match!',
										},
									}),
								}}
								error={!!errors?.cfpassword && errors.cfpassword.type === 'similar'}
								helperText={
									errors?.cfpassword
										? errors.cfpassword.message
										: 'Use 8 or more characters with a mix of letters, numbers & special character'
								}
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
				{/* <Grid
					container
					spacing={1}
					alignItems="stretch"
					justifyContent="space-evenly"
					sx={{ padding: '20px 0px 20px 0px' }}
				>
					<Grid item>
						<Button variant="contained">Cancel</Button>
					</Grid>

					<Grid item>
						<Button variant="contained" type="submit">
							Update
						</Button>
					</Grid>
				</Grid> */}
			</Grid>
		</Stack>
	)
}

export default FormUpdatePvdInfo
