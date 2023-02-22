import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { Button, FormControl, Grid, Stack } from '@mui/material'
import { useAuth } from '@/context/AuthContext'
import useAxiosPrivate from '@/hooks/useAxiosPrivate'
import { useRouter } from 'next/router'
import { TextFieldComponent } from '@utils/formComponentUtils'
import { getValidation } from '@utils/formUtils'

const FormEditPvd = ({ oldValue }) => {
	//state for storing data that is not TextFieldComponent
	//TextFieldComponent only need register
	const { auth } = useAuth()
	//*axios private to get data from route that need token
	const axiosPrivate = useAxiosPrivate()
	const router = useRouter()
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
				providerName: oldValue.providerName,
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
				console.log(`submitted`)
				alert('Data has been updated successfully')
				console.log(`Success update at ${res.status}`)
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
			<Grid container sx={{ overflow: 'auto', maxHeight: '500px', m: 0.5 }}>
				<Grid container sx={{ m: 2 }}>
					<FormControl component="form" onSubmit={handleSubmit(onSubmit)} sx={{ width: '100%' }}>
						<Stack spacing={3} direction="column">
							<TextFieldComponent name="providerName" required={true} shrink={true} {...formProps} />
							<TextFieldComponent name="website" required={true} shrink={true} {...formProps} />
							<TextFieldComponent name="address" required={true} shrink={true} {...formProps} />
							<TextFieldComponent
								name="phoneNumber"
								required={true}
								shrink={true}
								validation={getValidation('phoneNumber', defaultValues?.phoneNumber)}
								{...formProps}
							/>
							<TextFieldComponent name="creditCardNumber" required={true} shrink={true} {...formProps} />
						</Stack>
						<Grid
							container
							spacing={1}
							alignItems="stretch"
							justifyContent="space-evenly"
							sx={{ padding: '20px 0px 20px 0px' }}
						>
							<Grid item>
								<Button variant="contained" onClick={() => router.push('/')}>
									BACK
								</Button>
							</Grid>

							<Grid item>
								<Button variant="contained" type="submit">
									SUBMIT
								</Button>
							</Grid>
						</Grid>
					</FormControl>
				</Grid>
			</Grid>
		</Stack>
	)
}

export default FormEditPvd
