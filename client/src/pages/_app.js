import { useEffect, useState } from 'react'
import { Center, VStack } from '@components/common'
import WebLayout from '@components/Layout/WebLayout'
import { Alert, Snackbar, Typography } from '@mui/material'
import CircularProgress from '@mui/material/CircularProgress'
import jwtDecode from 'jwt-decode'
import { useRouter } from 'next/router'
import { AuthContextProvider } from '@/context/AuthContext'
import axios from '../pages/api/axios'
import '@/styles/globals.css'
import { SnackbarContextProvider } from '@/context/SnackbarContext'

export default function App({ Component, pageProps }) {
	const [auth, setAuth] = useState(null) //{username, role, accessToken}
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(null)
	const router = useRouter()
	const [snackbar, setSnackbar] = useState({
		open: false,
		text: '',
		severity: 'success',
	})

	const handleClose = (event, reason) => {
		if (reason === 'clickaway') {
			return
		}

		setSnackbar((prev) => ({ ...prev, open: false }))
	}

	// console.log('render app', auth)

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
			<SnackbarContextProvider value={{ snackbar, setSnackbar, handleClose }}>
				<WebLayout>
					<Component {...pageProps} />
				</WebLayout>
				<Snackbar open={snackbar.open} autoHideDuration={4000} onClose={handleClose}>
					<Alert onClose={handleClose} severity={snackbar.severity} sx={{ width: '100%' }}>
						{snackbar.text}
					</Alert>
				</Snackbar>
			</SnackbarContextProvider>
		</AuthContextProvider>
	)
}
