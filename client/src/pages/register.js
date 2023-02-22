import { useState } from 'react'
import { useForm } from 'react-hook-form'
import Error from 'next/error'
import FormPrimary from '@components/Layout/FormPrimary'
import FormRegister from '@components/Layout/FormRegister'
import FormRegStd from '@components/Layout/FormRegStd'
import FormRegPvd from '@components/Layout/FormRegPvd'

export default function Register() {
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

	const formProps = { register, handleSubmit, errors, setValue, getValues }
	switch (page) {
		case 'register':
			return <FormPrimary form={<FormRegister setPage={setPage} {...formProps} />} />
		case 'student':
			return <FormPrimary form={<FormRegStd values={values} setValues={setValues} {...formProps} />} />
		case 'provider':
			return <FormPrimary form={<FormRegPvd values={values} setValues={setValues} {...formProps} />} />
		default:
			return <Error statusCode={404} />
	}
}
