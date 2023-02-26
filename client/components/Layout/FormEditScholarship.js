import React from 'react'
import { useForm } from 'react-hook-form'

import { Button, FormControl, Grid, Stack, MenuItem, Select, InputLabel} from '@mui/material'
import { SelectComponent, TextFieldComponent } from '@utils/formComponentUtils'


const FormEditScholarship = () => {
	const {
		register,
		handleSubmit,
		formState: { errors, defaultValues },
		reset,
		setValue,
		setPage,
		getValues,
		sendData,
		error,
		control,
		gap,
		watch,
	} = useForm({
		mode: 'onBlur',
	})

	const onSubmit = (e) => {
		console.log(e)
		alert(JSON.stringify(e))
	}

	const formProps = { register, errors, getValues, setValue, control, watch }
	return (
		<Stack>
			<FormControl component="form" onSubmit={handleSubmit(onSubmit)} sx={{ width: '100%' }}>
				<Stack spacing={3} direction="column">
					<TextFieldComponent name="Scholarship Name" {...formProps} />
					<TextFieldComponent name="Provider Name" {...formProps} />
					<h3>Requirement</h3>
					<TextFieldComponent name="GPAX" {...formProps} />
					<SelectComponent name="degree" {...formProps}/>
					<TextFieldComponent name="Target Nation" {...formProps} />
					<SelectComponent name="program" {...formProps} />
					<TextFieldComponent name="More Requirements" {...formProps} />
					<h3>Detail of scholarship</h3>
					<TextFieldComponent name="Amount (Baht)" {...formProps} />
					<TextFieldComponent name="Scholarship Quota" {...formProps} />
					<TextFieldComponent name="Field of interest" {...formProps} />
					<SelectComponent name="typeOfScholarship" {...formProps} />
					<TextFieldComponent name="More Details" {...formProps} />
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
