import { useState } from 'react'
import Error from 'next/error'
import FormPrimary from '@components/Layout/FormPrimary'
import FormRegister from '@components/Layout/FormRegister'
import FormRegStd from '@components/Layout/FormRegStd'
import FormRegPvd from '@components/Layout/FormRegPvd'

export default function Register() {
	const [data, setData] = useState({})
	const [page, setPage] = useState('student')

	switch (page) {
		case 'register':
			return <FormPrimary header="Register to Schoolar" form={<FormRegister setData={setData} setPage={setPage} />}/>
		case 'student':
			return <FormPrimary header="Register as Student" form={<FormRegStd registerData={data} />} />
		case 'provider':
			return <FormPrimary header="Register as Provider" form={<FormRegPvd registerData={data} />} />
		default:
			return <Error statusCode={404} />
	}
}
