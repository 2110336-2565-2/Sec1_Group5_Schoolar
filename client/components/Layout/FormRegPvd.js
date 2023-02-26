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
		// console.log('Submit', data)
		sendData(data)
	}

	const formProps = { register, errors, getValues, setValue, control, watch }
	return (
		<FormControl
			component="form"
			noValidate
			onSubmit={handleSubmit(onSubmit)}
			sx={{ display: 'flex', flexDirection: 'column', gap, width: '100%' }}
		>
			{error && <Alert severity="error">{error}</Alert>}
			<TextFieldComponent name="organizationName" required={true} shrink={true} {...formProps} />
			<TextFieldComponent name="website" required={true} shrink={true} {...formProps} />
			<TextFieldComponent name="phoneNumber" required={true} shrink={true} {...formProps} />
			<TextFieldComponent name="address" required={true} shrink={true} multiline={true} rows={3} {...formProps} />
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
