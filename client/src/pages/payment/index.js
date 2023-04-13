import { useEffect, useState } from 'react'

import HistorySection from '@components/Payment-page/HistorySection'
import PaymentSection from '@components/Payment-page/PaymentSection'
import { VStack } from '@components/common'
import { Typography } from '@mui/material'
import { useRouter } from 'next/router'

import { useAuth } from '@/context/AuthContext'
import useAxiosPrivate from '@/hooks/useAxiosPrivate'

function Payment() {
	const { auth } = useAuth()
	const router = useRouter()
	const axiosPrivate = useAxiosPrivate()
	const [scholarships, setScholarships] = useState([])

	//Check if user logout
	if (!auth) {
		router.push('/login')
	}

	if (auth && auth.role !== 'provider') {
		router.push('/login')
	}

	useEffect(() => {
		//get provider's scholarship
		axiosPrivate.get(`/scholarship`).then((res) => {
			setScholarships(res.data.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)))
		})
	}, [])

	return (
		<VStack sx={{ width: '100%' }}>
			<Typography variant="h1" sx={{ fontWeight: 'bold', color: 'white', m: 2 }}>
				Payment
			</Typography>
			<PaymentSection scholarships={scholarships} />
			<HistorySection scholarships={scholarships} />
		</VStack>
	)
}

export default Payment
