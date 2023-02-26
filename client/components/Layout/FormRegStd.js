import React from 'react'

import { Button, FormControl } from '@mui/material'
import { Stack } from '@mui/system'
import { DatePickerComponent, SelectComponent, TextFieldComponent } from '@utils/formComponentUtils'

const FormRegStd = ({ values, setValues, setPage, register, handleSubmit, errors, getValues, gap }) => {
	const onSubmit = (data) => {
		setPage('studentAddl')
	}

	const formProps = { register, errors, values, setValues }
	return (
		<FormControl
			component="form"
			noValidate
			onSubmit={handleSubmit(onSubmit)}
			sx={{ display: 'flex', flexDirection: 'column', gap, width: '100%' }}
		>
			<TextFieldComponent name="firstName" required={true} {...formProps} />
			<TextFieldComponent name="lastName" required={true} {...formProps} />
			<DatePickerComponent name="birthdate" required={true} disableFuture={true} {...formProps} />
			<SelectComponent name="gender" required={true} {...formProps} />
			<TextFieldComponent name="phoneNumber" required={true} {...formProps} />
			<Stack spacing={2} direction={{ xs: 'column', sm: 'row' }}>
				<Button fullWidth variant="contained" onClick={() => setPage('register')}>
					Back
				</Button>
				<Button fullWidth variant="contained" type="submit">
					Next
				</Button>
			</Stack>
		</FormControl>
	)
}

export default FormRegStd
