import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Button, FormControl, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material'
import { Box } from '@mui/system'
import Link from 'next/link'
import InputPassword from './InputPassword'
import { getErrMsg, getValidation } from '@utils/formUtils'
import { TextFieldComponent } from '@utils/formComponentUtils'

const FormRegister = ({ setData, setPage }) => {
	const {
		register,
		handleSubmit,
		formState: { errors },
		getValues,
	} = useForm({ mode: 'onBlur' })

	const handleSubmitStudent = () => {
		handleSubmit((data) => {
			setData({ ...data, role: 'student' })
			setPage('student')
		})()
	}
	const handleSubmitProvider = () => {
		handleSubmit((data) => {
			setData({ ...data, role: 'provider' })
			setPage('provider')
		})()
	}

	const formProps = { register, errors }
	return (
		<>
			<Typography variant="h3" sx={{ textAlign: 'center', fontWeight: 'bold', mb: '20px' }}>
				Register
			</Typography>
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
