import React from 'react'
import { useForm } from 'react-hook-form'
import {
	Button,
	FormControl,
	FormControlLabel,
	FormLabel,
	Grid,
	MenuItem,
	Radio,
	RadioGroup,
	TextField,
} from '@mui/material'
import { Stack } from '@mui/system'
import dayjs from 'dayjs'

const genders = [
	{ value: 'Male', label: 'Male' },
	{ value: 'Female', label: 'Female' },
	{ value: 'Non-binary', label: 'Non-binary' },
]

const scholarshipTypes = [
	{ value: 'Full scholarship', label: 'Full Scholarship' },
	{ value: 'Partial scholarship', label: 'Partial Scholarship' },
	{ value: 'Renewable scholarship', label: 'Renewable Scholarship' },
	{ value: 'Followship', label: 'Followship' },
]

const FormProvideStdInfo = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm()
	const [value, setValue] = React.useState(dayjs())

	const onSubmit = (data) => alert(JSON.stringify(data))

	return (
		<Grid container sx={{overflow: "scroll", maxHeight: "500px", m:0.5}}>
			<Grid container sx={{m:2}}>
			<FormControl component="form" onSubmit={handleSubmit(onSubmit)} sx={{ width: '100%' }}>
				<Stack spacing={3} direction="column">
					<TextField
						id="outlined"
						label="Fisrt Name"
						{...register('firstName', {
							required: 'First name is required',
							minLength: { value: 2, message: 'First name must be at most 2 characters' },
							pattern: {
								// Contain only alphabets
								value: /^[A-Za-z]+$/,
								message: 'First name contain invalid charactor',
							},
						})}
						error={!!errors?.firstName}
						helperText={errors?.firstName ? errors.firstName.message : null}
					/>
					<TextField
						id="outlined"
						label="Surname"
						autoComplete="Surname"
						{...register('surname', {
							required: 'Surname is required',
							minLength: { value: 2, message: 'Surname must be at most 2 characters' },
							pattern: {
								value: /^[A-Za-z]+$/,
								message: 'Surname contain invalid charactor',
							},
						})}
						error={!!errors?.surname}
						helperText={errors?.surname ? errors.surname.message : null}
					/>
					{/* <TextField
						id="outlined"
						label="Citizen ID"
						{...register('citizenID', {
							required: 'Citizen ID is required',
							maxLength: { value: 13, message: 'Citizen ID must be 13 digits' },
							pattern: {
								value: /\d{13}/,
								message: 'Citizen ID must be 13 digits',
							},
						})}
						error={!!errors?.citizenID}
						helperText={errors?.citizenID ? errors.citizenID.message : null}
					/> */}

					<TextField
						id="date"
						label="Date of Birth"
						type="date"
						defaultValue="2001-01-01"
						{...register('dateOfBirth1')}
					/>

					{/* Value of Date is not update!!
				<LocalizationProvider dateAdapter= {AdapterDayjs}>
					<DatePicker
					disableFuture
					label="Date of Birth"
					openTo="year"
					views={['year', 'month', 'day']}
					value={value}
					onChange={(newValue) => { setValue(newValue)}}
					renderInput={(params) => <TextField {...params}
					{...register("dateOfBirth")} />}
					/>
				</LocalizationProvider> */}

					<TextField
						select
						id="outlined"
						label="Gender"
						defaultValue="Non-binary"
						{...register('gender')}
					>
						{genders.map((option) => (
							<MenuItem key={option.value} value={option.value}>
								{option.label}
							</MenuItem>
						))}
					</TextField>

					<TextField
						id="outlined"
						label="Faculty"
						{...register('faculty', {
							pattern: {
								value: /^[A-Za-z]+$/,
								message: 'Faculty contains invalid charactor',
							},
						})}
						error={!!errors?.faculty}
						helperText={errors?.faculty ? errors.faculty.message : null}
					/>

					<TextField
						id="outlined"
						label="Year"
						{...register('year', {
							pattern: {
								value: /^[0-9]*$/,
								message: 'Year contains invalid charactor',
							},
						})}
						error={!!errors?.year}
						helperText={errors?.year ? errors.year.message : null}
					/>

					<TextField
						id="outlined"
						label="Phone number"
						defaultValue="0891234567"
						{...register('phoneNumber', {
							pattern: {
								value: /^[0-9]*$/,
								message: 'Phone number contains invalid charactor',
							},
						})}
						error={!!errors?.phoneNumber}
						helperText={errors?.phoneNumber ? errors.phoneNumber.message : null}
					/>
					
					<TextField
						id="outlined"
						label="Email"
						{...register('email')}
						error={!!errors?.email}
						helperText={errors?.email ? errors.email.message : null}
					/>


					<TextField
						id="outlined"
						label="GPAX"
						{...register('gpax', {
							pattern: {
								value: /^[0-9]*\.[0-9][0-9]$/,
								message: 'GPAX must be float number with 2 digits',
							},
							min: { value: 0, message: 'GPAX must be positive' },
							max: { value: 4, message: 'GPAX must be at most 4' },
						})}
						error={!!errors?.gpax}
						helperText={errors?.gpax ? errors.gpax.message : null}
					/>

					{/* Range of age validation is unsure */}
					<TextField
						id="outlined"
						label="Age"
						{...register('age', {
							pattern: {
								value: /^[0-9]*$/,
								message: 'Age must be number',
							},
							min: { value: 6, message: 'Age must be more than 6' },
							max: { value: 100, message: 'Age must be less than 100' },
						})}
						error={!!errors?.age}
						helperText={errors?.age ? errors.age.message : null}
					/>

					<TextField id="outlined" label="Education" {...register('education')} />
					<TextField
						id="outlined"
						label="Household income"
						{...register('income', {
							pattern: { value: /^[0-9]*$/, message: 'Income must be integer' },
							min: { value: 0, message: 'Income must be positive' },
						})}
						error={!!errors?.income}
						helperText={errors?.income ? errors.income.message : null}
					/>

					<FormLabel component="legend">Current employ</FormLabel>
					<RadioGroup row sx={{ m: 0, justifyContent: 'space-between' }}>
						<FormControlLabel value="true" control={<Radio />} label="Yes"></FormControlLabel>
						<FormControlLabel value="false" control={<Radio />} label="No"></FormControlLabel>
						<Stack></Stack>
					</RadioGroup>

					<TextField
						id="outlined"
						label="Target nation"
						{...register('targetNation', {
							pattern: { value: /^[A-Za-z]+$/, message: 'Target nation contains invalid characters' },
						})}
						error={!!errors?.targetNation}
						helperText={errors?.targetNation ? errors.targetNation.message : null}
					/>

					<TextField
						select
						id="outlined"
						label="Type of scholarship"
						defaultValue="Full scholarship"
						{...register('typeOfScholarship')}
					>
						{scholarshipTypes.map((option) => (
							<MenuItem key={option.value} value={option.value}>
								{option.label}
							</MenuItem>
						))}
					</TextField>

					<TextField
						id="outlined"
						label="Field of interest"
						{...register('field', {
							pattern: { value: /^[A-Za-z]+$/, message: 'Field of interest contains invalid characters' },
						})}
						error={!!errors?.field}
						helperText={errors?.field ? errors.field.message : null}
					/>

					<Button variant="contained" type="submit" sx={{ backgroundColor: '#3F51A9' }}>
						SUBMIT
					</Button>
				</Stack>
			</FormControl>
			</Grid>
		</Grid>
	)
}

export default FormProvideStdInfo
