import { MenuItem, TextField } from '@mui/material'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { getValidation } from '@utils/formUtils'
import { degrees, genders, scholarshipTypes, studentPrograms, uniPrograms } from './formOptUtils'

export const getTitleCase = (text) => {
	const result = text.replace(/([A-Z])/g, ' $1')
	const finalResult = result.charAt(0).toUpperCase() + result.slice(1)
	return finalResult
}

export const TextFieldComponent = ({
	name,
	required,
	register,
	errors,
	label = getTitleCase(name),
	autoComplete = name,
	validation = getValidation(name),
	disabled = false,
	shrink,
	multiline,
	rows,
}) => {
	return (
		<TextField
			required={required}
			label={label}
			variant="outlined"
			autoComplete={autoComplete}
			{...register(name, validation)}
			error={!!errors?.[name]}
			helperText={errors?.[name] ? errors[name].message : null}
			disabled={disabled}
			InputLabelProps={{ shrink }}
			multiline={multiline}
			rows={rows}
		/>
	)
}

export const DatePickerComponent = ({
	name,
	required,
	register,
	errors,
	label = getTitleCase(name),
	values,
	setValues,
	validation = getValidation(name),
	disabled = false,
	shrink,
	disableFuture,
}) => {
	return (
		<LocalizationProvider dateAdapter={AdapterDayjs}>
			<DatePicker
				label={label}
				value={values[name] || null}
				inputFormat="DD/MM/YYYY"
				renderInput={(params) => (
					<TextField
						{...params}
						required={required}
						{...register(name, validation)}
						error={!!errors?.[name]}
						helperText={errors?.[name] ? errors[name].message : null}
					/>
				)}
				disableFuture={disableFuture}
				onChange={(value) => setValues({ ...values, [name]: value })}
				disabled={disabled}
				InputLabelProps={{ shrink }}
			/>
		</LocalizationProvider>
	)
}

export const SelectComponent = ({
	name,
	required = false,
	register,
	errors,
	label = getTitleCase(name),
	values,
	setValues,
	validation = getValidation(name),
	disabled = false,
	shrink,
}) => {
	let options = []
	switch (name) {
		case 'degree':
			options = degrees
			break
		case 'gender':
			options = genders
			break
		case 'program':
			if (values['degree'] === '') {
				disabled = true
			} else if (values['degree'] === 'high school') {
				options = studentPrograms
			} else {
				options = uniPrograms
				label = 'Faculty'
			}
			break
		case 'typeOfScholarship':
			options = scholarshipTypes
	}
	return (
		<TextField
			select
			required={required}
			label={label}
			{...register(name, validation)}
			error={!!errors?.[name]}
			helperText={errors?.[name] ? errors[name].message : null}
			value={values[name]}
			onChange={(event) => {
				if (name === 'degree') {
					setValues({ ...values, [name]: event.target.value, program: '' })
				} else {
					setValues({ ...values, [name]: event.target.value })
				}
			}}
			disabled={disabled}
			InputLabelProps={{ shrink }}
		>
			{options.map((option) => (
				<MenuItem key={option.value} value={option.value}>
					{option.label}
				</MenuItem>
			))}
		</TextField>
	)
}

//RadioGroup
{
	/* <FormControl>
	<FormLabel>Current employ</FormLabel>
	<RadioGroup row sx={{ mt: 1, gap: 4 }} defaultValue={false}>
		<FormControlLabel value={true} control={<Radio />} label="Yes" {...register('employment')} />
		<FormControlLabel value={false} control={<Radio />} label="No" {...register('employment')} />
	</RadioGroup>
</FormControl> */
}
