import React from 'react'

import { Alert, Button, FormControl } from '@mui/material'
import { Stack } from '@mui/system'
import { TextFieldComponent } from '@utils/formComponentUtils'

const FormRegPvd = ({
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
	const onSubmit = async (data) => {
		sendData(data)
	}

	const formProps = { register, errors, getValues, setValue, control, watch, required: true }
	return (
		<FormControl
			component="form"
			noValidate
			onSubmit={handleSubmit(onSubmit)}
			sx={{ display: 'flex', flexDirection: 'column', gap, width: '100%' }}
		>
			{error && <Alert severity="error">{error}</Alert>}
			<TextFieldComponent name="organizationName" {...formProps} />
			<TextFieldComponent name="website" {...formProps} />
			<TextFieldComponent name="phoneNumber" {...formProps} />
			<TextFieldComponent name="address" multiline={true} rows={3} {...formProps} />
			<Stack spacing={2} direction={{ xs: 'column', sm: 'row' }}>
				<Button fullWidth variant="contained" onClick={() => setPage('register')}>
					Back
				</Button>
				<Button fullWidth variant="contained" type="submit">
					Submit
				</Button>
			</Stack>
		</FormControl>
	)
}

export default FormRegPvd
