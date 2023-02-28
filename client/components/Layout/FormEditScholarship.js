import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'

import { Box, Button, FormControl, Grid, Stack } from '@mui/material'
import { DatePickerComponent, SelectComponent, TextFieldComponent } from '@utils/formComponentUtils'
import { getValidation } from '@utils/formUtils'
import { useRouter } from 'next/router'

import { useAuth } from '@/context/AuthContext'
import { useSnackbar } from '@/context/SnackbarContext'
import useAxiosPrivate from '@/hooks/useAxiosPrivate'

const FormEditScholarship = ({ id }) => {
	const { openSnackbar } = useSnackbar()

	const router = useRouter()
	const {
		register,
		handleSubmit,
		formState: { errors, defaultValues },
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
		if (auth) {
			axiosPrivate.get(`/scholarship/${id}`).then((res) => {
				const data = res.data.data
				reset({
					provider: '',
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
		} else {
			router.push('/login')
		}
	}, [])
	useEffect(() => {
		if (auth) {
			axiosPrivate.get(`/provider/${auth.username}`).then((res) => {
				setValue('provider', res.data.provider.organizationName)
			})
		}
	}, [])

	const onSubmit = (e) => {
		axiosPrivate
			.put(`/scholarship/${id}`, {
				amount: e.amount,
				quota: e.quota,
				detail: e.detail,
			})
			.then(() => {
				openSnackbar('Update scholarship successfully!', 'success')
				router.push('/')
			})
	}

	const formProps = { register, errors, getValues, setValue, control, watch }
	return (
		<Stack>
			<FormControl component="form" onSubmit={handleSubmit(onSubmit)} sx={{ width: '100%' }}>
				<Stack spacing={3} direction="column">
					<TextFieldComponent name="scholarshipName" disabled={true} shrink={true} {...formProps} />
					<TextFieldComponent
						name="provider"
						label="Organization Name"
						disabled={true}
						shrink={true}
						{...formProps}
					/>
					<h3>Requirements</h3>
					<TextFieldComponent name="gpax" disabled={true} shrink={true} {...formProps} />
					<SelectComponent name="degree" disabled={true} shrink={true} {...formProps} />
					<TextFieldComponent name="targetNation" disabled={true} shrink={true} {...formProps} />
					<SelectComponent name="program" disabled={true} shrink={true} {...formProps} />
					<h3>Details of scholarship</h3>
					<TextFieldComponent
						name="amount"
						label="Amount (Baht)"
						shrink={true}
						{...formProps}
						validation={getValidation('amount', defaultValues?.amount)}
					/>
					<TextFieldComponent
						name="quota"
						label="Scholarship Quota"
						shrink={true}
						{...formProps}
						validation={getValidation('quota', defaultValues?.quota)}
					/>
					<TextFieldComponent name="fieldOfInterest" disabled={true} shrink={true} {...formProps} />
					<SelectComponent name="typeOfScholarship" disabled={true} shrink={true} {...formProps} />
					<TextFieldComponent
						name="detail"
						label="More Details"
						multiline={true}
						rows={4}
						shrink={true}
						{...formProps}
					/>
					<DatePickerComponent
						name="applicationDeadline"
						defaultValues={null}
						disabled={true}
						shrink={true}
						{...formProps}
					/>
				</Stack>
				{/* <Grid
					container
					rowSpacing={2}
					alignItems="stretch"
					fullWidth
					justifyContent="space-evenly"
					sx={{ padding: '20px 0px 20px 20px' }}
				> */}
				<Box sx={{ width: '100%', display: 'flex', gap: 2, mt: 2 }}>
					<Button
						fullWidth
						variant="contained"
						onClick={() => {
							router.push('/')
						}}
					>
						Cancel
					</Button>
					<Button fullWidth variant="contained" type="submit">
						Update
					</Button>
				</Box>
			</FormControl>
		</Stack>
	)
}

export default FormEditScholarship
