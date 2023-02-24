import React from 'react'
import { useEffect,useState } from 'react'
import { useForm } from 'react-hook-form'
import { Center, VStack } from '@components/common'
import InputPassword from '@components/Layout/InputPassword'
import { Button, Divider, FormControl, Typography } from '@mui/material'
import Alert from '@mui/material/Alert'
import { Box } from '@mui/system'
import { getValidation } from '@utils/formUtils'
import { PasswordIcon } from '@utils/images'
import Image from 'next/image'

import axios from '@/pages/api/axios'

function NewPassword({ router }) {
	const [success, setSuccess] = useState(false)
	const [error, setError] = useState(false)

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
			setSuccess(true)
		} catch (err) {
			console.log(err)
			setError(true)
		}
	}

	useEffect(() => {
		setTimeout(() => {
			setError(false)
			setSuccess(false)
		}, 3000)
	}, [error, success])

	return (
		<>
			{error && <Alert severity="error">Error occur</Alert>}
			{success && <Alert severity="success">Reset password successfully</Alert>}
			<Typography align="center" sx={{ mb: 1.5 }}>
				Enter your new password
			</Typography>
			<FormControl
				component="form"
				onSubmit={handleSubmit(onSubmit)}
				sx={{ display: 'flex', flexDirection: 'column', gap: 2.5, width: '100%' }}
			>
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
								match: (value) => value === getValues('password') || getErrMsg('password', 'match'),
							},
						}),
					}}
					error={!!errors?.cfpassword && errors.cfpassword.type === 'match'}
					helperText={errors?.cfpassword ? errors.cfpassword.message : null}
				/>
				<Button fullWidth variant="contained" size="small" style={{ textTransform: 'none' }} type="submit">
					Reset Password
				</Button>
			</FormControl>
		</>
	)
}

export default NewPassword
