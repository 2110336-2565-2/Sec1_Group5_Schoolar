import { React, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useAuth } from '@/context/AuthContext'
import { axiosPrivate } from '../api/axios'
import FormPrimary from '@components/Layout/FormPrimary'
import FormEditStd from '@components/Layout/FormEditStd'
import FormEditPvd from '@components/Layout/FormEditPvd'

export default function Edit() {
	const { auth } = useAuth()
	const router = useRouter()
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
		return <FormPrimary header="Edit Profile" form={<FormEditStd oldValue={data} />} />
	} else {
		return <FormPrimary header="Edit Profile" form={<FormEditPvd oldValue={data} />} />
	}
}

export async function getStaticProps(context) {
	return {
		props: {
			authRequired: true,
		},
	}
}
