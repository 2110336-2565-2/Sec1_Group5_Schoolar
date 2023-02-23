import React from 'react'
import { useForm } from 'react-hook-form'
import { Center, VStack } from '@components/common'
import { Button, Divider, FormControl, Typography } from '@mui/material'
import { Box } from '@mui/system'
import { PasswordIcon } from '@utils/images'
import Image from 'next/image'
import InputPassword from '@components/Layout/InputPassword'
import { useState, useEffect } from 'react'
import axios from '@/pages/api/axios'
import Alert from '@mui/material/Alert'
import { getValidation } from '@utils/formUtils'

function NewPassword({ router }) {
	const [success, setsuccess] = useState(false)
	const [error, seterror] = useState(false)

	const {
		register,
		handleSubmit,
		formState: { errors },
		getValues,
	} = useForm({ mode: 'onBlur' })

	const onSubmit = async (data) => {
		const token = router.query.token
		console.log(data)

		try {
			const res = await axios.put(
				'/resetPassword/password',
				{ password: data.password },
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				},
			)
			console.log(res.data)
			setsuccess(true)
		} catch (err) {
			console.log(err)
			seterror(true)
		}
	}

	useEffect(() => {
		setTimeout(() => {
			seterror(false)
			setsuccess(false)
		}, 3000)
	}, [error, success])

	return (
		<>
			{error && <Alert severity="error">Error occur</Alert>}
			{success && <Alert severity="success">Reset password successfully</Alert>}
			<Center>
				<Center
					sx={{
						border: '0.2rem solid #2C429B',
						borderRadius: '1.5rem',
						width: {
							xs: '90vw',
							sm: '500px',
							xl: '650px',
						},
						height: {
							xs: '60vh',
							sm: '500px',
							xl: '650px',
						},
						backgroundColor: 'white',
					}}
				>
					<Center
						sx={{
							border: '0.2rem solid #FDBA21',
							borderRadius: '1rem',
							width: {
								xs: '80vw',
								sm: '450px',
								xl: '600px',
							},
							height: {
								xs: '55vh',
								sm: '450px',
								xl: '600px',
							},
						}}
					>
						<FormControl
							component="form"
							onSubmit={handleSubmit(onSubmit)}
							sx={{
								display: 'flex',
								gap: [2, 2, 3],
								width: '80%',
							}}
						>
							<Center>
								<Box
									sx={{
										position: 'relative',
										width: {
											xs: '50px',
											sm: '75px',
											xl: '100px',
										},
										height: {
											xs: '50px',
											sm: '75px',
											xl: '100px',
										},
									}}
								>
									<Image
										src={PasswordIcon}
										alt="Password Icon"
										layout="fill"
										objectFit="contain"
									></Image>
								</Box>
							</Center>
							<Typography
								fontSize={{
									xs: '12px',
									sm: '14px',
									md: '16px',
								}}
								fontWeight={'light'}
								align="center"
							>
								Enter your new password
							</Typography>
							<InputPassword
								register={{
									...register('password', getValidation('password')),
								}}
								error={!!errors?.password}
								helperText={errors?.password ? errors.password.message : null}
							/>
							<InputPassword
								label={'Confirmed Password'}
								register={{
									...register('cfpassword', {
										validate: {
											match: (value) =>
												value === getValues('password') || getErrMsg('password', 'match'),
										},
									}),
								}}
								error={!!errors?.cfpassword && errors.cfpassword.type === 'match'}
								helperText={errors?.cfpassword ? errors.cfpassword.message : null}
							/>
							<Button
								fullWidth
								variant="contained"
								size="small"
								style={{ textTransform: 'none' }}
								type="submit"
							>
								Reset Password
							</Button>
						</FormControl>
					</Center>
				</Center>
			</Center>
		</>
	)
}

export default NewPassword
