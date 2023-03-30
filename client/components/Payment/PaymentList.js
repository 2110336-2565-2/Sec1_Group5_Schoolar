import { React } from 'react'
import { useEffect, useState } from 'react'

import PaymentComponent from '@components/Payment/PaymentComponent'
import { Center, VStack } from '@components/common'

import useAxiosPrivate from '@/hooks/useAxiosPrivate'

export default function paymentList() {
	const [scholars, setScholars] = useState([])
	const axiosPrivate = useAxiosPrivate()

	useEffect(() => {
		const fetchData = async () => {
			try {
				const res = await axiosPrivate.get('/scholarship')
				setScholars(res.data.data)
				console.log(res.data.data)
			} catch (error) {
				console.log(error)
			}
		}
		fetchData()
	}, [])

	const mockData = {
		amount: 15,
		applicationDeadline: '2022-08-01T00:00:00.000Z',
		degree: 'bachelor',
		detail: 'buggg',
		fieldOfInterest: 'Computer',
		gpax: 4,
		program: 'Faculty of Arts',
		provider: '63fb928bad8d592179496311',
		quota: 20,
		scholarshipName: 'xyz',
		subscription: 'sub_1Mqc7vCn18gHMRofq7n4LovF',
		targetNation: 'tha',
		typeOfScholarship: 'full',
		_id: '63fc86349ab2c8cd513613e6',
	}
	const mockData2 = {
		amount: 30000,
		applicationDeadline: '2023-03-30T17:00:00.000Z',
		createdAt: '2023-03-20T07:37:08.249+00:00',
		degree: 'bachelor',
		detail: 'sdaffsda',
		fieldOfInterest: '3',
		gpax: 3.33,
		program: 'Faculty of Political Science',
		provider: '63fb928bad8d592179496311',
		quota: 2,
		scholarshipName: 'testcreatedat',
		targetNation: 'dfas',
		typeOfScholarship: 'partial',
		__v: 0,
		_id: '64253d898727f65277f5ae94',
	}
	return (
		<VStack>
			<PaymentComponent scholarship={mockData} />
			<PaymentComponent scholarship={mockData2} />
		</VStack>
	)
}
