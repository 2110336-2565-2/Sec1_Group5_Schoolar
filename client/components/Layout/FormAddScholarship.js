import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'

import { Box, Button, FormControl, Stack, Typography } from '@mui/material'
import { DatePickerComponent, SelectComponent, TextFieldComponent } from '@utils/formComponentUtils'
import { getErrMsg, getRegEx, getValidation } from '@utils/formUtils'
import { useRouter } from 'next/router'

import { useAuth } from '@/context/AuthContext'
import { useSnackbar } from '@/context/SnackbarContext'
import useAxiosPrivate from '@/hooks/useAxiosPrivate'

function FormAddScholarship() {
	const axiosPrivate = useAxiosPrivate()
	const { openSnackbar } = useSnackbar()
	const {
		register,
		handleSubmit,
		formState: { errors },
		setValue,
		getValues,
		control,
		watch,
		trigger,
	} = useForm({ mode: 'onBlur' })
	const formProps = { register, errors, getValues, setValue, control, watch }
	const router = useRouter()

	const { auth } = useAuth()

	useEffect(() => {
		try {
			axiosPrivate.get(`/provider/${auth.username}`).then((res) => {
				setValue('organizationName', res.data.provider.organizationName)
			})
		} catch (error) {
			console.log(error)
		}
	}, [])

	const sendData = async (data) => {
		try {
			const response = await axiosPrivate.post('/scholarship/', data)
			openSnackbar('Add scholarship successfully!', 'success')
			router.push('/')
		} catch (error) {
			console.error(error)
		}
	}
	const onSubmit = (data) => {
		console.log(data)
		sendData(data)
	}

	return (
		<FormControl
			component="form"
			noValidate
			onSubmit={handleSubmit(onSubmit)}
			sx={{ display: 'flex', flexDirection: 'column', gap: 2.5, width: '100%' }}
		>
			<TextFieldComponent name="scholarshipName" label="Scholarship Name" required={true} {...formProps} />
			<TextFieldComponent
				name="organizationName"
				label="Organization Name"
				disabled={true}
				shrink={true}
				{...formProps}
			/>
			<Typography variant="h5" sx={{ fontWeight: 'bold' }}>
				Requirements
			</Typography>
			<TextFieldComponent
				name="gpax"
				label="Minimum GPAX"
				required={true}
				validation={{
					pattern: {
						value: getRegEx('gpax'),
						message: 'GPAX must be float number with 2 digits',
					},
					min: { value: 0, message: getErrMsg('Minimum GPAX', 'positive') },
					max: { value: 4, message: 'Minimum GPAX must be at most 4' },
					required: getErrMsg('Minimum GPAX', 'required'),
				}}
				{...formProps}
			/>
			<SelectComponent
				name="degree"
				required={true}
				validation={{ required: getErrMsg('Degree', 'required') }}
				{...formProps}
			/>
			<TextFieldComponent
				name="targetNation"
				label="Target Nation"
				required={true}
				validation={{
					pattern: {
						value: getRegEx('onlyAlphabetNumberSpace'),
						message: getErrMsg('Target Nation', 'pattern'),
					},
					required: getErrMsg('Target Nation', 'required'),
					maxLength: { value: 100, message: getErrMsg('Target Nation', 'maxLength', 100) },
				}}
				{...formProps}
			/>
			<SelectComponent
				name="program"
				required={true}
				{...formProps}
				validation={{
					required: getErrMsg('Program', 'required'),
				}}
			/>
			<Typography variant="h5" sx={{ fontWeight: 'bold' }}>
				Details of scholarship
			</Typography>
			<TextFieldComponent name="amount" label="Amount (Baht)" {...formProps} />
			<TextFieldComponent name="quota" label="Quota (Person)" {...formProps} />
			<TextFieldComponent
				name="fieldOfInterest"
				label="Field of Interest"
				required={true}
				validation={{
					pattern: {
						value: getRegEx('onlyAlphabetNumberSpace'),
						message: getErrMsg('Field of Interest', 'pattern'),
					},
					required: getErrMsg('Field of Interest', 'required'),
					maxLength: {
						value: 100,
						message: getErrMsg('Field of Interest', 'maxLength', 100),
					},
				}}
				{...formProps}
			/>
			<SelectComponent
				name="typeOfScholarship"
				label="Type of Scholarship"
				required={true}
				validation={{ required: getErrMsg('Type of Scholarship', 'required') }}
				{...formProps}
			/>
			<TextFieldComponent name="detail" label="Other Details" multiline={true} rows={4} {...formProps} />
			<DatePickerComponent name="applicationDeadline" disablePast={true} {...formProps} />
			<Box sx={{ width: '100%', display: 'flex', gap: 2, mt: 2 }}>
				<Button fullWidth variant="contained" onClick={() => router.push('/')}>
					Back
				</Button>
				<Button fullWidth variant="contained" type="submit">
					Submit
				</Button>
			</Box>
		</FormControl>
	)
}

export default FormAddScholarship
