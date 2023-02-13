import { useState } from 'react'
import FormPrimary from '@components/Layout/FormPrimary'
import FormPvdInfo from '@components/Layout/FormPvdInfo'
import FormRegister from '@components/Layout/FormRegister'
import FormStdInfo from '@components/Layout/FormStdInfo'
import Error from 'next/error'

export default function Register() {
	const [data, setData] = useState({})
	const [page, setPage] = useState('register')

	//console.log(data);

	switch (page) {
		case 'register':
			return (
				<FormPrimary
					header="Register to Schoolar"
					form={<FormRegister setData={setData} setPage={setPage} />}
				/>
			)
		case 'student':
			return <FormPrimary header="Student Information" form={<FormStdInfo registerData={data}/>} />
		case 'provider':
			return <FormPrimary header="Provider Information" form={<FormPvdInfo />} />
		default:
			return <Error statusCode={404} />
	}
}
