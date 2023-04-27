import { React, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

import { Button, FormControl, Grid, Stack, Typography } from '@mui/material'
import { DatePickerComponent, SelectComponent, TextFieldComponent } from '@utils/formComponentUtils'
import { getValidation } from '@utils/formUtils'
import { useRouter } from 'next/router'

import { useAuth } from '@/context/AuthContext'
import { useSnackbar } from '@/context/SnackbarContext'
import useAxiosPrivate from '@/hooks/useAxiosPrivate'

const FormEditStd = ({ oldValue }) => {
	const { openSnackbar } = useSnackbar()
	// Form hook
	const {
		register,
		handleSubmit,
		formState: { errors, defaultValues },
		setValue,
		getValues,
		control,
		watch,
		reset,
	} = useForm({ mode: 'onBlur' })

	const { auth } = useAuth()
	//*axios private to get data from route that need token
	const axiosPrivate = useAxiosPrivate()
	const router = useRouter()

	useEffect(() => {
		if (oldValue) {
			// set default value, use in isDupe validate
			reset({
				firstName: oldValue.firstName,
				lastName: oldValue.lastName,
				birthdate: new Date(oldValue.birthdate),
				gender: oldValue.gender,
				phoneNumber: oldValue.phoneNumber,
				school: oldValue.school,
				degree: oldValue.degree,
				program: oldValue.program,
				gpax: oldValue.gpax,
				targetNation: oldValue.targetNation,
				fieldOfInterest: oldValue.fieldOfInterest,
				typeOfScholarship: oldValue.typeOfScholarship,
			})
		}
	}, [oldValue])

	const formOnSubmit = (data) => {
		// Update data using patch request
		axiosPrivate.patch(`/student/${auth.username}`, data).then((res) => {
			openSnackbar('Update Success!', 'success')
		})
		router.push('/')
	}
	const formOnError = (err) => {
		// Alert the users of incorrect pattern
		let messages = []
		Object.keys(err).forEach((key) => {
			messages.push(err[key].message)
		})
		alert(messages.join('\n'))
	}

	const formProps = { register, errors, getValues, setValue, control, watch }

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
							<TextFieldComponent name="firstName" required={true} shrink={true} {...formProps} />
							<TextFieldComponent name="lastName" required={true} shrink={true} {...formProps} />
							<DatePickerComponent
								name="birthdate"
								required={true}
								disableFuture={true}
								shrink={true}
								{...formProps}
							/>
							<SelectComponent name="gender" required={true} shrink={true} {...formProps} />
							<TextFieldComponent
								name="phoneNumber"
								required={true}
								shrink={true}
								validation={getValidation('phoneNumber', defaultValues?.phoneNumber)}
								{...formProps}
							/>
							<TextFieldComponent name="gpax" shrink={true} label="GPAX" {...formProps} />
							<SelectComponent name="degree" shrink={true} {...formProps} />
							<TextFieldComponent name="school" shrink={true} label="School/University" {...formProps} />
							<SelectComponent name="program" shrink={true} {...formProps} />
							<Typography variant="h5" sx={{ fontWeight: 'bold' }}>
								Target Scholarship
							</Typography>
							<TextFieldComponent name="targetNation" shrink={true} {...formProps} />
							<TextFieldComponent
								name="fieldOfInterest"
								label="Field of Interest"
								shrink={true}
								{...formProps}
							/>
							<SelectComponent
								name="typeOfScholarship"
								shrink={true}
								label="Type of Scholarship"
								{...formProps}
							/>
							<Stack spacing={3} direction="row" justifyContent="space-evenly">
								<Button sx={{ width: '100%' }} variant="contained" onClick={() => router.push('/')}>
									Back
								</Button>
								<Button sx={{ width: '100%' }} variant="contained" type="submit">
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
