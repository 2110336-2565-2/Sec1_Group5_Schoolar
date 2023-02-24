import React from 'react'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import InputPassword from '@components/Layout/InputPassword'
import { Button, FormControl, Typography } from '@mui/material'
import Alert from '@mui/material/Alert'
import { getErrMsg, getValidation } from '@utils/formUtils'

import axios from '@/pages/api/axios'
import { useSnackbar } from '@/context/SnackbarContext'

function NewPassword({ router }) {
	const [error, setError] = useState(false)

	const { openSnackbar } = useSnackbar()

	const {
		register,
		handleSubmit,
		formState: { errors },
		getValues,
	} = useForm({ mode: 'onBlur' })

	const onSubmit = async (data) => {
		setError(false)
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
			openSnackbar('Reset password success!', 'success')
			setTimeout(() => {
				router.push('/')
			}, 1000)
		} catch (err) {
			console.log(err)
			setError(true)
		}
	}

	return (
		<>
			{error && <Alert severity="error">Error occur</Alert>}
			<Typography align="center" sx={{ mb: 1.5 }}>
				Enter your new password
			</Typography>
			<FormControl
				component="form"
				noValidate
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
