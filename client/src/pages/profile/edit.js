import { React } from 'react'
import { useRouter } from 'next/router'
import { useAuth } from '@/context/AuthContext'
import FormPrimary from '@components/Layout/FormPrimary'
import FormEditStd from '@components/Layout/FormEditStd'
import FormEditPvd from '@components/Layout/FormEditPvd'

export default function Edit() {
	const { auth } = useAuth()
	const router = useRouter()
	if (!auth) {
		router.push('/login')
		return
	}
	if (auth.role === 'student') {
		return <FormPrimary header="Edit Profile" form={<FormEditStd />} />
	} else {
		return <FormPrimary header="Edit Profile" form={<FormEditPvd />} />
	}
}

export async function getStaticProps(context) {
	return {
		props: {
			authRequired: true,
		},
	}
}
