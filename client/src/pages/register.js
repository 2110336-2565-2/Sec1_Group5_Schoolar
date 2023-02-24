import { useState } from 'react'
import { useForm } from 'react-hook-form'
import FormPrimary from '@components/Layout/FormPrimary'
import FormRegister from '@components/Layout/FormRegister'
import FormRegPvd from '@components/Layout/FormRegPvd'
import FormRegStd from '@components/Layout/FormRegStd'
import FormRegStdAddl from '@components/Layout/FormRegStdAddl'
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
	} = useForm({ mode: 'onBlur' })

	const [values, setValues] = useState({
		birthDate: '',
		gender: '',
		degree: '',
		program: '',
		typeOfScholarship: '',
	})

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
			setError(error.response.data.message)
		}
	}

	const formProps = { register, handleSubmit, errors, setValue, getValues, gap: 2.5, sendData, error }
	switch (page) {
		case 'register':
			return <FormPrimary header="Register" form={<FormRegister setPage={setPage} {...formProps} />} />
		case 'student':
			return (
				<FormSecondary
					header="Personal Information"
					form={<FormRegStd values={values} setValues={setValues} setPage={setPage} {...formProps} />}
				/>
			)
		case 'studentAddl':
			return (
				<FormSecondary
					header="Additional Information"
					form={<FormRegStdAddl values={values} setValues={setValues} setPage={setPage} {...formProps} />}
				/>
			)
		case 'provider':
			return (
				<FormSecondary
					header="Personal Information"
					form={<FormRegPvd values={values} setValues={setValues} setPage={setPage} {...formProps} />}
				/>
			)
		default:
			return <Error statusCode={404} />
	}
}
