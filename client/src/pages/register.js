import { useState } from 'react'
import FormPrimary from '@components/Layout/FormPrimary'
import FormProvidePvdInfo from '@components/Layout/FormPvdInfo'
import FormRegister from '@components/Layout/FormRegister'
import FormProvideStdInfo from '@components/Layout/FormStdInfo'
import Error from 'next/error'

export default function Register() {
	const [data, setData] = useState({})
	const [page, setPage] = useState('register')

	switch (page) {
		case 'register':
			return (
				<FormPrimary
					header="Register to Schoolar"
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
