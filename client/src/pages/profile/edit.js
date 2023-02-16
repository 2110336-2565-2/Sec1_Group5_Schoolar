import { React } from 'react'
import { useRouter } from 'next/router'
import { useAuth } from '@/context/AuthContext'
import FormPrimary from '@components/Layout/FormPrimary'
import FormStdEdit from '@components/Layout/FormStdEdit'
import FormPvdEdit from '@components/Layout/FormPvdEdit'

export default function Edit() {
	const { auth } = useAuth()
	const router = useRouter()
	if (!auth) {
		router.push('/login')
		return
	}
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
