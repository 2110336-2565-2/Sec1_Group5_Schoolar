import React from 'react'
import { Button, FormControl } from '@mui/material'
import { Stack } from '@mui/system'
import { SelectComponent, TextFieldComponent } from '@utils/formComponentUtils'

const FormRegStdAddl = ({ values, setValues, setPage, register, handleSubmit, errors, getValues, gap, sendData }) => {
	const onSubmit = (data) => {
		console.log('Submit', data)
		sendData(data)
	}

	const formProps = { register, errors, values, setValues }
	return (
		<FormControl
			component="form"
			onSubmit={handleSubmit(onSubmit)}
			sx={{ display: 'flex', flexDirection: 'column', gap, width: '100%' }}
		>
			<TextFieldComponent name="school" label="School/University" {...formProps} />
			<SelectComponent name="degree" {...formProps} />
			<SelectComponent name="program" {...formProps} />
			<TextFieldComponent name="gpax" label="GPAX" {...formProps} />
			<TextFieldComponent name="targetNation" {...formProps} />
			<SelectComponent name="typeOfScholarship" label="Type of Scholarship" {...formProps} />
			<TextFieldComponent name="fieldOfInterest" label="Field of Interest" {...formProps} />
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
