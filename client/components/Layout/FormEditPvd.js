import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'

import { Button, FormControl, Grid, Stack } from '@mui/material'
import { TextFieldComponent } from '@utils/formComponentUtils'
import { getValidation } from '@utils/formUtils'
import { useRouter } from 'next/router'

import { useAuth } from '@/context/AuthContext'
import useAxiosPrivate from '@/hooks/useAxiosPrivate'
import { useSnackbar } from '@/context/SnackbarContext'

const FormEditPvd = ({ oldValue }) => {
	//state for storing data that is not TextFieldComponent
	//TextFieldComponent only need register
	const { auth } = useAuth()
	//*axios private to get data from route that need token
	const axiosPrivate = useAxiosPrivate()
	const router = useRouter()
	const { openSnackbar } = useSnackbar()
	const {
		register,
		handleSubmit,
		formState: { errors, defaultValues },
		reset,
		setValue,
	} = useForm({
		mode: 'onBlur',
	})

	useEffect(() => {
		if (oldValue) {
			// set default value, use in isDupe validate
			reset({
				organizationName: oldValue.organizationName,
				website: oldValue.website,
				address: oldValue.address,
				phoneNumber: oldValue.phoneNumber,
				creditCardNumber: oldValue.creditCardNumber,
			})
		}
	}, [oldValue, setValue])

	const onSubmit = (data) => {
		try {
			axiosPrivate.patch(`/provider/${auth.username}`, data).then((res) => {
				openSnackbar('Update Success!', 'success')
			})
			router.push('/')
		} catch (err) {
			alert('NOT SUCCESS')
			console.log(err)
		}
	}

	const formProps = { register, errors }
	return (
		<Stack direction="column" alignItems="center" justifyContent="center">
			{/* {alertOpen && renderAlert()} */}
			<Grid container sx={{ overflow: 'auto', m: 0.5 }}>
				<Grid container sx={{ m: 2 }}>
					<FormControl component="form" onSubmit={handleSubmit(onSubmit)} sx={{ width: '100%' }}>
						<Stack spacing={3} direction="column">
							<TextFieldComponent name="organizationName" required={true} shrink={true} {...formProps} />
							<TextFieldComponent
								name="phoneNumber"
								required={true}
								shrink={true}
								validation={getValidation('phoneNumber', defaultValues?.phoneNumber)}
								{...formProps}
							/>
							<TextFieldComponent name="website" required={true} shrink={true} {...formProps} />
							<TextFieldComponent
								name="address"
								required={true}
								shrink={true}
								multiline={true}
								row={3}
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

export default FormEditPvd
