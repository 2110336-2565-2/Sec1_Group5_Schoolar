import { React, useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { Button, FormControl, Grid, Stack } from '@mui/material'
import useAxiosPrivate from '@/hooks/useAxiosPrivate'
import { useAuth } from '@/context/AuthContext'
import { getValidation } from '@utils/formUtils'
import { DatePickerComponent, SelectComponent, TextFieldComponent } from '@utils/formComponentUtils'

const FormEditStd = ({ oldValue }) => {
	const [values, setValues] = useState({
		birthDate: '',
		gender: '',
		degree: '',
		program: '',
		typeOfScholarship: '',
	})
	// Form hook
	const {
		register,
		handleSubmit,
		formState: { errors, defaultValues },
		reset,
		setValue,
	} = useForm({
		mode: 'onBlur',
	})

	const { auth } = useAuth()
	//*axios private to get data from route that need token
	const axiosPrivate = useAxiosPrivate()

	useEffect(() => {
		if (oldValue) {
			setValue('firstName', oldValue.firstName)
			setValue('lastName', oldValue.lastName)
			setValue('birthdate', oldValue.birthdate)
			setValue('gender', oldValue.gender)
			setValue('phoneNumber', oldValue.phoneNumber)
			setValue('school', oldValue.school)
			setValue('degree', oldValue.degree)
			setValue('program', oldValue.program)
			setValue('gpax', oldValue.gpax)
			setValue('householdIncome', oldValue.householdIncome)
			setValue('targetNation', oldValue.targetNation)
			setValue('typeOfScholarship', oldValue.typeOfScholarship)
			setValue('field', oldValue.field)

			// set default value, use in isDupe validate
			reset({
				firstName: oldValue.firstName,
				lastName: oldValue.lastName,
				birthdate: oldValue.birthdate,
				gender: oldValue.gender,
				phoneNumber: oldValue.phoneNumber,
				school: oldValue.school,
				degree: oldValue.degree,
				program: oldValue.program,
				gpax: oldValue.gpax,
				householdIncome: oldValue.householdIncome,
				targetNation: oldValue.targetNation,
				field: oldValue.field,
			})
			setValues({
				birthDate: oldValue.birthdate,
				gender: oldValue.gender,
				degree: oldValue.degree,
				program: oldValue.program,
				typeOfScholarship: oldValue.typeOfScholarship,
			})
		}
	}, [oldValue, setValue])

	const formOnSubmit = (data) => {
		// Update data using patch request
		console.log('submitting', data)
		axiosPrivate.patch(`/student/${auth.username}`, data).then((res) => {
			alert('Data has been updated successfully')
			console.log('submitted successfully')
		})
	}
	const formOnError = (err) => {
		// Alert the users of incorrect pattern
		let messages = []
		Object.keys(err).forEach((key) => {
			messages.push(err[key].message)
		})
		alert(messages.join('\n'))
	}

	const formProps = { register, errors, values, setValues }
	return (
		<Stack direction="column" alignItems="center" justifyContent="center">
			<Grid container sx={{ overflow: 'auto', maxHeight: '500px', m: 0.5 }}>
				<Grid container sx={{ m: 2 }}>
					<FormControl
						component="form"
						onSubmit={handleSubmit(formOnSubmit, formOnError)}
						sx={{ width: '100%' }}
					>
						<Stack spacing={3} direction="column">
							<TextFieldComponent name={'firstName'} required={true} shrink={true} {...formProps} />
							<TextFieldComponent name={'lastName'} required={true} shrink={true} {...formProps} />
							<DatePickerComponent
								name="birthdate"
								required={true}
								disableFuture={true}
								shrink={true}
								{...formProps}
							/>
							<SelectComponent name="gender" required={true} shrink={true} {...formProps} />
							<TextFieldComponent
								name={'phoneNumber'}
								required={true}
								shrink={true}
								validation={getValidation('phoneNumber', defaultValues?.phoneNumber)}
								{...formProps}
							/>
							<TextFieldComponent
								name="school"
								required={true}
								shrink={true}
								label="School/University"
								{...formProps}
							/>
							<SelectComponent name="degree" shrink={true} {...formProps} />
							<SelectComponent name="program" shrink={true} {...formProps} />
							<TextFieldComponent name="gpax" shrink={true} label="GPAX" {...formProps} />
							<TextFieldComponent
								name="householdIncome"
								shrink={true}
								label="Household income per month"
								{...formProps}
							/>
							<TextFieldComponent name="targetNation" shrink={true} {...formProps} />
							<SelectComponent name="typeOfScholarship" shrink={true} {...formProps} />
							<TextFieldComponent name="field" shrink={true} field="Field of interest" {...formProps} />
						</Stack>
						<Grid
							container
							spacing={1}
							alignItems="stretch"
							justifyContent="space-evenly"
							sx={{ padding: '20px 0px 20px 0px' }}
						>
							<Grid item>
								<Button variant="contained" type="submit">
									Update
								</Button>
							</Grid>
						</Grid>
					</FormControl>
				</Grid>
			</Grid>
		</Stack>
	)
}

export default FormEditStd
