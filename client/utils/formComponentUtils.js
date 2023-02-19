import { TextField } from '@mui/material'
import { getErrMsg, getRegEx, getValidation } from '@utils/formUtils'

export const getTitleCase = (text) => {
	const result = text.replace(/([A-Z])/g, ' $1')
	const finalResult = result.charAt(0).toUpperCase() + result.slice(1)
	return finalResult
}
export const TextFieldComponent = (
	name,
	required,
	register,
	errors,
	{ label = getTitleCase(name), autoComplete = name, validation = getValidation(name) } = {},
) => {
	return (
		<TextField
			required={required}
			label={label}
			variant="outlined"
			autoComplete={autoComplete}
			{...register(name, validation)}
			error={!!errors?.[name]}
			helperText={errors?.[name] ? errors[name].message : null}
		/>
	)
}
