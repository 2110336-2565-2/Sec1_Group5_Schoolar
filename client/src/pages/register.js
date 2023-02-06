import FormPrimary from '@components/Layout/FormPrimary'
import FormProvideStdInfo from '@components/Layout/FormProvideStdInfo'
import FormProvidePvdInfo from '@components/Layout/FormProvidePvdInfo'
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
			return <FormPrimary header="Student Information" form={<FormProvideStdInfo />} />
		case 'provider':
			return <FormPrimary header="Provider Information" form={<FormProvidePvdInfo />} />
		default:
			return <Error statusCode={404} />
	}
}
