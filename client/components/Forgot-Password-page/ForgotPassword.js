import React from 'react'
import { useForm } from 'react-hook-form'
import { Button, FormControl, Stack, Typography } from '@mui/material'
import { TextFieldComponent } from '@utils/formComponentUtils'
import { getErrMsg, getRegEx, isDupe } from '@utils/formUtils'

import axios from '@/pages/api/axios'

function ForgotPassword({ router }) {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({ mode: 'onBlur' })

	const onSubmit = (data) => {
		console.log(data)
		try {
			axios.post('/resetPassword/email', { email: data.email }).then((res) => {
				console.log(res.data)
			})
		} catch (err) {
			console.log(err)
			router.push('/login')
		}
	}

	const formProps = { register, errors }
	return (
		<FormControl
			component="form"
			onSubmit={handleSubmit(onSubmit)}
			sx={{ display: 'flex', flexDirection: 'column', gap: 2.5, width: '100%' }}
		>
			<Stack spacing={2} sx={{ py: 2.5 }}>
				<Typography>
					Enter your email address and we&apos;ll send a link to get back to your account.
				</Typography>
				<TextFieldComponent
					name={'email'}
					required={true}
					validation={{
						required: getErrMsg('email', 'required'),
						pattern: {
							value: getRegEx('email'),
							message: getErrMsg('email', 'pattern'),
						},
						validate: {
							duplicate: async (value) =>
								(await isDupe('user', 'email', value)) || 'Email is not registered yet',
						},
					}}
					{...formProps}
				/>
			</Stack>
			<Stack spacing={2}>
				<Button fullWidth variant="contained" size="small" type="submit">
					Send Link
				</Button>
				<Button
					fullWidth
					variant="outlined"
					size="small"
					onClick={() => {
						router.push('/login')
					}}
				>
					Back To Login
				</Button>
			</Stack>
		</FormControl>
	)
}

export default ForgotPassword
