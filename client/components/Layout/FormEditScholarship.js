import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'

import { Button, FormControl, Grid, Stack } from '@mui/material'
import { DatePickerComponent, SelectComponent, TextFieldComponent } from '@utils/formComponentUtils'
import { useRouter } from 'next/router'

import { useAuth } from '@/context/AuthContext'
import useAxiosPrivate from '@/hooks/useAxiosPrivate'

const FormEditScholarship = ({ id }) => {
	const router = useRouter()
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
		setValue,
		getValues,
		control,
		watch,
		trigger,
	} = useForm({ mode: 'onBlur' })

	const { auth } = useAuth()
	//*axios private to get data from route that need token
	const axiosPrivate = useAxiosPrivate()

	useEffect(() => {
		axiosPrivate.get(`/scholarship/${id}`).then((res) => {
			const data = res.data.data
			reset({
				provider: auth.username,
				scholarshipName: data.scholarshipName,
				gpax: data.gpax,
				degree: data.degree,
				targetNation: data.targetNation,
				program: data.program,
				amount: data.amount,
				quota: data.quota,
				fieldOfInterest: data.fieldOfInterest,
				typeOfScholarship: data.typeOfScholarship,
				detail: data.detail,
				applicationDeadline: data.applicationDeadline,
			})
		})
	}, [])

	const onSubmit = (e) => {
		axiosPrivate
			.put(`/scholarship/${id}`, {
				amount: e.amount,
				quota: e.quota,
				detail: e.detail,
			})
			.then(() => {
				alert('Update successfully')
				router.push('/')
			})
	}

	const formProps = { register, errors, getValues, setValue, control, watch }
	return (
		<Stack>
			<FormControl component="form" onSubmit={handleSubmit(onSubmit)} sx={{ width: '100%' }}>
				<Stack spacing={3} direction="column">
					<TextFieldComponent name="scholarshipName" disabled={true} shrink={true} {...formProps} />
					<TextFieldComponent name="provider" disabled={true} shrink={true} {...formProps} />
					<h3>Requirement</h3>
					<TextFieldComponent name="gpax" disabled={true} shrink={true} {...formProps} />
					<SelectComponent name="degree" disabled={true} shrink={true} {...formProps} />
					<TextFieldComponent name="targetNation" disabled={true} shrink={true} {...formProps} />
					<SelectComponent name="program" disabled={true} shrink={true} {...formProps} />
					<h3>Detail of scholarship</h3>
					<TextFieldComponent name="amount" label="Amount (Baht)" shrink={true} {...formProps} />
					<TextFieldComponent name="quota" label="Scholarship Quota" shrink={true} {...formProps} />
					<TextFieldComponent name="fieldOfInterest" disabled={true} shrink={true} {...formProps} />
					<SelectComponent name="typeOfScholarship" disabled={true} shrink={true} {...formProps} />
					<TextFieldComponent name="detail" label="More Details" shrink={true} {...formProps} />
					<DatePickerComponent name="applicationDeadline" disabled={true} shrink={true} {...formProps} />
				</Stack>
				<Grid
					container
					rowSpacing={2}
					alignItems="stretch"
					justifyContent="space-evenly"
					sx={{ padding: '20px 0px 20px 20px' }}
				>
					<Grid item>
						<Button
							variant="contained"
							onClick={() => {
								router.push('/')
							}}
						>
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
