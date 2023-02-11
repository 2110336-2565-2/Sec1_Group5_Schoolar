import { useEffect, useState } from 'react'
import WebLayout from '@components/Layout'
import jwtDecode from 'jwt-decode'
import { useRouter } from 'next/router'

import { AuthContextProvider } from '@/context/AuthContext'

import axios from '../pages/api/axios'

import '@/styles/globals.css'

export default function App({ Component, pageProps }) {
	const [auth, setAuth] = useState(null) //{username, role, accessToken}
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(null)
	const router = useRouter()

	useEffect(() => {
		setLoading(true)
		setError(null)

		if (!auth) {
			axios
				.get('/auth/refresh-token', {
					withCredentials: true,
				})
				.then(({ data }) => {
					const { accessToken, role } = data
					const decodedToken = jwtDecode(accessToken)
					const user = decodedToken.UserInfo
					setAuth({ username: user.username, role: role, accessToken: accessToken })
					setLoading(false)
				})
				.catch(function (error) {
					setError(error)
					setLoading(false)
				})
		}
	}, [])

	//TODO Fix this UI later
	if (loading) return <div>Loading...</div>

	if (!loading && error && pageProps.authRequired) {
		router.push('/login')
		return <div>Redirecting to login...</div>
	}

	return (
		<AuthContextProvider value={{ auth, setAuth }}>
			<WebLayout>
				<Component {...pageProps} />
			</WebLayout>
		</AuthContextProvider>
	)
}
