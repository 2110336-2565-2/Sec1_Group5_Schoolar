import { useState } from 'react'
import { useForm } from 'react-hook-form'

import FormPrimary from '@components/Layout/FormPrimary'
import FormRegPvd from '@components/Layout/FormRegPvd'
import FormRegStd from '@components/Layout/FormRegStd'
import FormRegStdAddl from '@components/Layout/FormRegStdAddl'
import FormRegister from '@components/Layout/FormRegister'
import FormSecondary from '@components/Layout/FormSecondary'
import axios from 'axios'
import Error from 'next/error'
import { useRouter } from 'next/router'

import { useSnackbar } from '@/context/SnackbarContext'

export default function Register() {
	const router = useRouter()
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

	const [page, setPage] = useState('register')
	const [error, setError] = useState(null)

	const { openSnackbar } = useSnackbar()

	const sendData = async (data) => {
		try {
			const response = await axios.post('/auth/register', data)
			openSnackbar(response.data, 'success')
			router.push('/login')
		} catch (error) {
			console.error(error)
			setError(error.response.data.error)
		}
	}

	const formProps = {
		setPage,
		register,
		handleSubmit,
		errors,
		setValue,
		getValues,
		sendData,
		error,
		control,
		watch,
		trigger,
		gap: 2.5,
	}
	switch (page) {
		case 'register':
			return <FormPrimary header="Register" form={<FormRegister {...formProps} />} />
		case 'student':
			return <FormSecondary header="Personal Information" form={<FormRegStd {...formProps} />} />
		case 'studentAddl':
			return <FormSecondary header="Additional Information" form={<FormRegStdAddl {...formProps} />} />
		case 'provider':
			return <FormSecondary header="Personal Information" form={<FormRegPvd {...formProps} />} />
		default:
			return <Error statusCode={404} />
	}
}
