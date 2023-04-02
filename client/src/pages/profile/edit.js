import { React, useEffect, useState } from 'react'
import FormEditPvd from '@components/Layout/FormEditPvd'
import FormEditStd from '@components/Layout/FormEditStd'
import FormSecondary from '@components/Layout/FormSecondary'
import { useRouter } from 'next/router'
import { useAuth } from '@/context/AuthContext'
import useAxiosPrivate from '@/hooks/useAxiosPrivate'

export default function Edit() {
	const { auth } = useAuth()
	const router = useRouter()
	const axiosPrivate = useAxiosPrivate()
	const [data, setData] = useState({})

	useEffect(() => {
		// Fetch database values from server using Axios
		console.log('Fetch data')
		if (auth?.role === 'student') {
			axiosPrivate
				.get(`/student/${auth.username}`)
				.then((response) => {
					// console.log('-->', { ...response.data.user, ...response.data.student })
					setData({ ...response.data.user, ...response.data.student })
				})
				.catch((error) => {
					console.error(error)
				})
		} else {
			axiosPrivate
				.get(`/provider/${auth.username}`)
				.then((response) => {
					// console.log('-->', { ...response.data.user, ...response.data.provider })
					setData({ ...response.data.user, ...response.data.provider })
				})
				.catch((error) => {
					console.error(error)
				})
		}
	}, [])

	if (auth?.role === 'student') {
		return <FormSecondary header="Update Information" form={<FormEditStd oldValue={data} />} />
	} else {
		return <FormSecondary header="Update Information" form={<FormEditPvd oldValue={data} />} />
	}
}

export async function getStaticProps(context) {
	return {
		props: {
			authRequired: true,
		},
	}
}
