import { React } from 'react'

import FormEditScholarship from '@components/Layout/FormEditScholarship'
import FormSecondary from '@components/Layout/FormSecondary'
import { Center } from '@components/common'
import CircularProgress from '@mui/material/CircularProgress'
import { useRouter } from 'next/router'

import { useAuth } from '@/context/AuthContext'

export default function UpdateScholarship() {
	const router = useRouter()
	const { id } = router.query
	const { auth } = useAuth()
	if (!auth) {
		router.push('/login')
		return (
			<Center height={'100vh'}>
				<CircularProgress />
			</Center>
		)
	}

	return <FormSecondary header="Update Scholarship" form={<FormEditScholarship id={id} />} />
}
