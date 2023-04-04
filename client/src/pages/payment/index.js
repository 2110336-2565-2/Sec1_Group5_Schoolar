import { VStack } from '@components/common'
import HistorySection from '@components/Payment-page/HistorySection'
import { useEffect, useState } from 'react'
import { useAuth } from '@/context/AuthContext'
import { useRouter } from 'next/router'
import useAxiosPrivate from '@/hooks/useAxiosPrivate'
import PaymentSection from '@components/Payment-page/PaymentSection'
import { Typography } from '@mui/material'

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
			setScholarships(res.data.data)
		})
		//console.log(scholarships);
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
