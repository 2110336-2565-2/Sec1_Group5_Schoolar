import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'

import { Box, Button, FormControl, Stack, Typography } from '@mui/material'
import { DatePickerComponent, SelectComponent, TextFieldComponent } from '@utils/formComponentUtils'
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
			<TextFieldComponent name="gpax" label="Minimum GPAX" required={true} {...formProps} />
			<SelectComponent name="degree" required={true} {...formProps} />
			<TextFieldComponent name="targetNation" label="Target Nation" required={true} {...formProps} />
			<SelectComponent name="program" required={true} {...formProps} />
			<Typography variant="h5" sx={{ fontWeight: 'bold' }}>
				Details of scholarship
			</Typography>
			<TextFieldComponent name="amount" label="Amount (Baht)" {...formProps} />
			<TextFieldComponent name="quota" label="Quota (person)" {...formProps} />
			<TextFieldComponent name="fieldOfInterest" label="Field of Interest" required={true} {...formProps} />
			<SelectComponent name="typeOfScholarship" label="Type of Scholarship" required={true} {...formProps} />
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
