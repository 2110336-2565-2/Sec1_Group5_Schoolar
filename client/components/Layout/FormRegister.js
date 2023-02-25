import { useState } from 'react'
import { Button, FormControl, Typography } from '@mui/material'
import { Box } from '@mui/system'
import { TextFieldComponent } from '@utils/formComponentUtils'
import { getErrMsg, getValidation } from '@utils/formUtils'
import Link from 'next/link'

import InputPassword from './InputPassword'

const FormRegister = ({ setPage, register, handleSubmit, errors, setValue, getValues, gap }) => {
	const handleSubmitStudent = () => {
		handleSubmit((data) => {
			setValue('role', 'student')
			setPage('student')
		})()
	}
	const handleSubmitProvider = () => {
		handleSubmit((data) => {
			setValue('role', 'provider')
			setPage('provider')
		})()
	}

	const formProps = { register, errors }
	return (
		<FormControl component="form" noValidate sx={{ display: 'flex', flexDirection: 'column', gap, width: '100%' }}>
			<TextFieldComponent name={'username'} required={true} {...formProps} />
			<TextFieldComponent name={'email'} required={true} {...formProps} />
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
				helperText={
					errors?.cfpassword
						? errors.cfpassword.message
						: 'Use 8 or more characters with a mix of letters, numbers & special character'
				}
			/>
			<Box sx={{ width: '100%', display: 'flex', gap: 2 }}>
				<Button fullWidth variant="contained" onClick={handleSubmitStudent}>
					Register as Student
				</Button>
				<Button fullWidth variant="contained" onClick={handleSubmitProvider}>
					Register as Provider
				</Button>
			</Box>
			<Box sx={{ textAlign: 'center' }}>
				<Typography>Already have an account ?</Typography>
				<Typography color="primary" sx={{ fontWeight: 'bold' }}>
					<Link href="/login">Login here!</Link>
				</Typography>
			</Box>
		</FormControl>
	)
}

export default FormRegister
