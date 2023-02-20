import { useEffect, useState } from 'react'
import { Center, VStack } from '@components/common'
import WebLayout from '@components/Layout'
import { Typography } from '@mui/material'
import jwtDecode from 'jwt-decode'
import { useRouter } from 'next/router'
import CircularProgress from '@mui/material/CircularProgress'
import { AuthContextProvider } from '@/context/AuthContext'
import LinearProgress from '@mui/material/LinearProgress'
import axios from '../pages/api/axios'

import '@/styles/globals.css'

export default function App({ Component, pageProps }) {
	const [auth, setAuth] = useState(null) //{username, role, accessToken}
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(null)
	const router = useRouter()

	// console.log(auth)

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
		} else {
			setLoading(false)
		}
	}, [auth])

	if (loading)
		return (
			<Center height={'100vh'}>
				<CircularProgress />
			</Center>
		)

	if (!loading && pageProps.authRequired && error?.response?.status == 401) {
		router.push('/login')
		return (
			<Center height={'100vh'}>
				<CircularProgress />
			</Center>
		)
	}

	return (
		<AuthContextProvider value={{ auth, setAuth }}>
			<WebLayout>
				<Component {...pageProps} />
			</WebLayout>
		</AuthContextProvider>
	)
}
