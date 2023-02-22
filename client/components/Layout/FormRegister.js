import { useState } from 'react'
import { Button, FormControl, Typography } from '@mui/material'
import { Box } from '@mui/system'
import Link from 'next/link'
import InputPassword from './InputPassword'
import { getErrMsg, getValidation } from '@utils/formUtils'
import { TextFieldComponent } from '@utils/formComponentUtils'

const FormRegister = ({ setPage, register, handleSubmit, errors, setValue, getValues }) => {
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
		<>
			<FormControl component="form" sx={{ display: 'flex', flexDirection: 'column', gap: '15px', width: '100%' }}>
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
					<Button variant="contained" onClick={handleSubmitStudent} sx={{ flexGrow: 1, fontWeight: 'bold' }}>
						Register as student
					</Button>
					<Button variant="contained" onClick={handleSubmitProvider} sx={{ flexGrow: 1, fontWeight: 'bold' }}>
						Register as provider
					</Button>
				</Box>
				<Box sx={{ textAlign: 'center' }}>
					<Typography>Already have an account ?</Typography>
					<Typography color="primary" sx={{ fontWeight: 'bold' }}>
						<Link href="/login">Login here!</Link>
					</Typography>
				</Box>
			</FormControl>
		</>
	)
}

export default FormRegister
