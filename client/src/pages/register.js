import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import Error from 'next/error'
import FormPrimary from '@components/Layout/FormPrimary'
import FormRegister from '@components/Layout/FormRegister'
import FormRegStd from '@components/Layout/FormRegStd'
import FormRegPvd from '@components/Layout/FormRegPvd'
import FormSecondary from '@components/Layout/FormSecondary'

export default function Register() {
	const {
		register,
		handleSubmit,
		formState: { errors },
		setValue,
		getValues,
	} = useForm({ mode: 'onBlur' })

	const [values, setValues] = useState({
		birthDate: null,
		gender: '',
		degree: '',
		program: '',
		typeOfScholarship: '',
	})

	const [page, setPage] = useState('student')

	const formProps = { register, handleSubmit, errors, setValue, getValues, gap: 2.5 }
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
