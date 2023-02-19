import React from 'react'
import { useForm } from 'react-hook-form'
import { Center, VStack } from '@components/common'
import { Button, Divider, FormControl, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'
import TextField from '@mui/material/TextField'
import { Box } from '@mui/system'
import { PasswordIcon } from '@utils/images'
import Image from 'next/image'
import { useRouter } from 'next/router'

import axios from './api/axios'
import { getValidation } from '@utils/formUtils'

function ForgotPassword() {
	const router = useRouter()

	const Root = styled('div')(({ theme }) => ({
		width: '100%',
		...theme.typography.body2,
		'& > :not(style) + :not(style)': {
			marginTop: theme.spacing(2),
		},
	}))

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({ mode: 'onBlur' })

	const onSubmit = (data) => {
		console.log(data)
		axios.post('/resetPassword/email', { email: data.email }).then((res) => {
			console.log(res.data)
		})
	}
	const isDupe = async (field, value) => {
		try {
			const response = await axios.get(`/auth/isDupe/${field}/${value}`)
			return response.data
		} catch (err) {
			console.log(err)
		}
	}
	return (
		<Center>
			<FormControl
				component="form"
				display={'flex'}
				justifyContent={'center'}
				alignItems={'center'}
				height={'100%'}
				width={'100%'}
				onSubmit={handleSubmit(onSubmit)}
			>
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
						<VStack
							sx={{
								p: {
									xs: 2,
									sm: 3,
									xl: 5,
								},
							}}
							gap={[2, 2, 3]}
						>
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
							<Typography
								fontSize={{
									xs: '12px',
									sm: '14px',
									md: '16px',
								}}
								fontWeight={'light'}
								align="center"
							>
								Enter your email address and we'll send a link to get back to your
								account.
							</Typography>
							<TextField
								id="reset-email"
								label="Email address"
								variant="outlined"
								fullWidth
								autoComplete="email"
								size="small"
								inputProps={{ style: { fontSize: 12 } }} // font size of input text
								InputLabelProps={{ style: { fontSize: 12 } }}
								{...register('email', getValidation('email'))}
								error={!!errors?.email}
								helperText={errors?.email ? errors.email.message : null}
							/>
							<Button
								fullWidth
								variant="contained"
								size="small"
								style={{ textTransform: 'none' }}
								type="submit"
							>
								Send login link
							</Button>
							<Root>
								<Divider
									sx={{
										fontWeight: 'light',
										fontSize: {
											xs: '12px',
											sm: '14px',
											md: '16px',
										},
									}}
								>
									or
								</Divider>
							</Root>
							<Button
								fullWidth
								variant="outlined"
								size="small"
								style={{ textTransform: 'none' }}
								onClick={() => {
									router.push('/login')
								}}
							>
								Back to login
							</Button>
						</VStack>
					</Center>
				</Center>
			</FormControl>
		</Center>
	)
}

export default ForgotPassword
