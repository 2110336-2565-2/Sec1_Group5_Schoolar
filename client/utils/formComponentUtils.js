import { Controller } from 'react-hook-form'

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
	//required props
	name,
	required,
	register,
	errors,
	//not required props
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
	//required props
	name,
	register,
	errors,
	control,
	setValue,
	getValues,
	//not required props
	shrink,
	required = false,
	label = getTitleCase(name),
	validation = getValidation(name),
	disabled = false,
	disableFuture = false,
	disablePast = false,
}) => {
	return (
		<Controller
			control={control}
			name={name}
			render={({ field: { onChange, onBlur, value, ref } }) => (
				<LocalizationProvider dateAdapter={AdapterDayjs}>
					<DatePicker
						label={label}
						value={getValues(name) || ''}
						inputFormat="DD/MM/YYYY"
						renderInput={(params) => (
							<TextField
								{...params}
								required={required}
								{...register(name, validation)}
								error={!!errors?.[name]}
								helperText={errors?.[name] ? errors[name].message : null}
								onPaste={(e) => {
									e.preventDefault()
								}}
							/>
						)}
						disableFuture={disableFuture}
						disablePast={disablePast}
						onChange={(value) => {
							setValue(name, value)
						}}
						disabled={disabled}
						InputLabelProps={{ shrink }}
					/>
				</LocalizationProvider>
			)}
		></Controller>
	)
}

export const SelectComponent = ({
	//required props
	name,
	register,
	errors,
	control,
	watch,
	getValues,
	setValue,
	//not required props
	shrink,
	required = false,
	label = getTitleCase(name),
	validation = getValidation(name),
	disabled = false,
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
			if (!getValues('degree')) {
				disabled = true
			} else if (getValues('degree') === 'High School') {
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
		<Controller
			control={control}
			name={name}
			render={({ field: { onChange, onBlur, value, ref } }) => (
				<TextField
					select
					required={required}
					label={label}
					{...register(name, validation)}
					error={!!errors?.[name]}
					helperText={errors?.[name] ? errors[name].message : null}
					value={watch(name) || ''}
					onChange={(event) => {
						setValue(name, event.target.value)
						if (name === 'degree') {
							setValue('program', '')
						}
					}}
					disabled={disabled}
					InputLabelProps={{ shrink }}
				>
					<MenuItem value="">
						<em>None</em>
					</MenuItem>
					{options.map((option) => (
						<MenuItem key={option.value} value={option.value}>
							{option.value}
						</MenuItem>
					))}
				</TextField>
			)}
		></Controller>
	)
}
