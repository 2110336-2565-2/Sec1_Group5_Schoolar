import { React, useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { Button, FormControl, Grid, Stack, Typography } from '@mui/material'
import useAxiosPrivate from '@/hooks/useAxiosPrivate'
import { useAuth } from '@/context/AuthContext'
import { getValidation } from '@utils/formUtils'
import { DatePickerComponent, SelectComponent, TextFieldComponent } from '@utils/formComponentUtils'
import { useRouter } from 'next/router'

const FormEditStd = ({ oldValue }) => {
	//state for storing data that is not TextFieldComponent
	//TextFieldComponent only need register
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
	const router = useRouter();

	useEffect(() => {
		if (oldValue) {
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
				targetNation: oldValue.targetNation,
				fieldOfInterest: oldValue.fieldOfInterest,
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
		router.push('/');
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
			<Grid container sx={{ overflow: 'auto', m: 0.5 }}>
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
							<Typography variant="h5">Target Scholarship</Typography>
							<TextFieldComponent name="targetNation" shrink={true} {...formProps} />
							<SelectComponent
								name="typeOfScholarship"
								shrink={true}
								label="Type of Scholarship"
								{...formProps}
							/>
							<TextFieldComponent
								name="fieldOfInterest"
								label="Field of Interest"
								shrink={true}
								{...formProps}
							/>
							<Stack spacing={3} direction="row" justifyContent="space-evenly">
								<Button sx={{width: "100%"}} variant="contained" onClick={() => router.push('/')}>Back</Button>
								<Button sx={{width: "100%"}} variant="contained" type="submit">
									Update
								</Button>
							</Stack>
						</Stack>
					</FormControl>
				</Grid>
			</Grid>
		</Stack>
	)
}

export default FormEditStd
