import React from 'react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Alert, Button, FormControl, Stack, Typography } from '@mui/material'
import { TextFieldComponent } from '@utils/formComponentUtils'
import { getErrMsg, getRegEx, isDupe } from '@utils/formUtils'

import axios from '@/pages/api/axios'

function ForgotPassword({ router }) {
	const [error, setError] = useState(null)
	const [success, setSuccess] = useState(null)
	const [info, setInfo] = useState(null)

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({ mode: 'onBlur' })

	const onSubmit = async (data) => {
		setSuccess(null)
		setError(null)
		setInfo('Sending...')
		try {
			const res = await axios.post('/resetPassword/email', { email: data.email })
			setInfo(null)
			setSuccess(res.data.message)
		} catch (err) {
			setInfo(null)
			console.log(err)
			setError(err.response.data.error)
		}
	}

	const formProps = { register, errors }
	return (
		<FormControl
			component="form"
			onSubmit={handleSubmit(onSubmit)}
			noValidate
			sx={{ display: 'flex', flexDirection: 'column', gap: 2.5, width: '100%' }}
		>
			<Stack spacing={2} sx={{ pt: 1, pb: 2 }}>
				{error && <Alert severity="error">{error}</Alert>}
				{success && <Alert severity="success">{success}</Alert>}
				{info && <Alert severity="info">{info}</Alert>}
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
