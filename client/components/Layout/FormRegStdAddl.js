import React from 'react'

import { Alert, Button, FormControl, Typography } from '@mui/material'
import { Stack } from '@mui/system'
import { SelectComponent, TextFieldComponent } from '@utils/formComponentUtils'

const FormRegStdAddl = ({
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
			<TextFieldComponent name="gpax" label="GPAX" {...formProps} />
			<SelectComponent name="degree" {...formProps} />
			<TextFieldComponent name="school" label="School/University" {...formProps} />
			<SelectComponent name="program" {...formProps} />
			<Typography
				variant="h4"
				sx={{
					fontWeight: 'bold',
				}}
			>
				Target Scholarship
			</Typography>
			<TextFieldComponent name="targetNation" {...formProps} />
			<TextFieldComponent name="fieldOfInterest" label="Field of Interest" {...formProps} />
			<SelectComponent name="typeOfScholarship" label="Type of Scholarship" {...formProps} />
			<Stack spacing={2} direction={{ xs: 'column', sm: 'row' }}>
				<Button fullWidth variant="contained" onClick={() => setPage('student')}>
					Back
				</Button>
				<Button fullWidth variant="contained" type="submit">
					Submit
				</Button>
			</Stack>
		</FormControl>
	)
}

export default FormRegStdAddl
