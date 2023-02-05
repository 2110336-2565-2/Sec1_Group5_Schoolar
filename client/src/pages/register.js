import FormPrimary from '@components/Layout/FormPrimary'
import FormProviderStdInfo from '@components/Layout/FormProvideStdInfo'
import FormRegister from '@components/Layout/FormRegister'
import Error from 'next/error'
import { useState } from 'react'

export default function Register() {
	const [data, setData] = useState({})
	const [page, setPage] = useState('register')

	switch (page) {
		case 'register':
			return (
				<FormPrimary
					header="Sign Up to Schoolar"
					form={<FormRegister setData={setData} setPage={setPage} />}
				/>
			)
		case 'student':
			return <FormPrimary header="Student Information" form={<FormProviderStdInfo />} />
		case 'provider':
			return <FormPrimary header="Provider Information" form={<FormProviderStdInfo />} />
		default:
			return <Error statusCode={404} />
	}
}
