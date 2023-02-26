import React from 'react'
import { useForm } from 'react-hook-form'

import { Button, FormControl, Grid, Stack } from '@mui/material'
import { TextFieldComponent } from '@utils/formComponentUtils'

const FormEditScholarship = () => {
	const {
		register,
		handleSubmit,
		formState: { errors, defaultValues },
		reset,
		setValue,
	} = useForm({
		mode: 'onBlur',
	})

	const onSubmit = (e) => {
		console.log(e)
		alert(JSON.stringify(e))
	}

	const formProps = { register, errors }
	return (
		<Stack>
			<FormControl component="form" onSubmit={handleSubmit(onSubmit)} sx={{ width: '100%' }}>
				<Stack spacing={3} direction="column">
					<TextFieldComponent name="Scholarship Name" {...formProps} />
					<TextFieldComponent name="Provider Name" {...formProps} />
					<TextFieldComponent name="Scholarship Quota" {...formProps} />
					<TextFieldComponent name="Amount (Baht)" {...formProps} />
					<TextFieldComponent name="Detail of Scholarship" {...formProps} />
					<TextFieldComponent name="GPAX" {...formProps} />
					<TextFieldComponent name="Degree" {...formProps} />
					<TextFieldComponent name="Program/Faculty" {...formProps} />
					<TextFieldComponent name="Target Nation" {...formProps} />
					<TextFieldComponent name="Field of interest" {...formProps} />
					<TextFieldComponent name="Type of Scholarship" {...formProps} />
					<TextFieldComponent name="Application Deadline" {...formProps} />
				</Stack>
				<Grid
					container
					rowSpacing={2}
					alignItems="stretch"
					justifyContent="space-evenly"
					sx={{ padding: '20px 0px 20px 20px' }}
				>
					<Grid item>
						<Button variant="contained" type="submit">
							Cancel
						</Button>
					</Grid>
					<Grid item>
						<Button variant="contained" type="submit">
							Update
						</Button>
					</Grid>
				</Grid>
			</FormControl>
		</Stack>
	)
}

export default FormEditScholarship
