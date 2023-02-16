import { React } from 'react'
import { useAuth } from '@/context/AuthContext'
import FormPrimary from '@components/Layout/FormPrimary'
import FormStdEdit from '@components/Layout/FormStdEdit'
import FormPvdEdit from '@components/Layout/FormPvdEdit'

export default function Update() {
	const { auth } = useAuth()
	if (auth.role === 'student') {
		return <FormPrimary header="Edit Profile" form={<FormStdEdit />} />
	} else {
		return <FormPrimary header="Edit Profile" form={<FormPvdEdit />} />
	}
}

export async function getStaticProps(context) {
	return {
		props: {
			authRequired: true,
		},
	}
}
