import React from 'react'

import { Button, FormControl } from '@mui/material'
import { Stack } from '@mui/system'
import { DatePickerComponent, SelectComponent, TextFieldComponent } from '@utils/formComponentUtils'

const FormRegStd = ({
	setPage,
	register,
	handleSubmit,
	errors,
	setValue,
	getValues,
	sendData,
	error,
	control,
	gap,
	watch,
}) => {
	const onSubmit = (data) => {
		setPage('studentAddl')
	}

	const formProps = { register, errors, getValues, setValue, control, watch, required: true }
	return (
		<FormControl
			component="form"
			noValidate
			onSubmit={handleSubmit(onSubmit)}
			sx={{ display: 'flex', flexDirection: 'column', gap, width: '100%' }}
		>
			<TextFieldComponent name="firstName" {...formProps} />
			<TextFieldComponent name="lastName" {...formProps} />
			<DatePickerComponent name="birthdate" disableFuture={true} {...formProps} />
			<SelectComponent name="gender" {...formProps} />
			<TextFieldComponent name="phoneNumber" {...formProps} />
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
