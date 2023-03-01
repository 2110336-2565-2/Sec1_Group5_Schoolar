import { React } from 'react'

import FormAddScholarship from '@components/Layout/FormAddScholarship'
import FormSecondary from '@components/Layout/FormSecondary'
import { Center } from '@components/common'
import CircularProgress from '@mui/material/CircularProgress'
import { useRouter } from 'next/router'

import { useAuth } from '@/context/AuthContext'

export default function addScholarship() {
	const router = useRouter()
	const { auth } = useAuth()
	if (!auth) {
		router.push('/login')
		return (
			<Center height={'100vh'}>
				<CircularProgress />
			</Center>
		)
	}

	return <FormSecondary header="Add Scholarship" form={<FormAddScholarship />} />
}
