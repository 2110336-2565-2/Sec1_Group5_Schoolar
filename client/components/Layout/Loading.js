import { useEffect, useState } from 'react'
import { Center } from '@components/common'
import WebLayout from '@components/Layout/WebLayout'
import { Alert, Snackbar } from '@mui/material'
import CircularProgress from '@mui/material/CircularProgress'
import jwtDecode from 'jwt-decode'
import { useRouter } from 'next/router'
import axios from '@/pages/api/axios'
import { useSnackbar } from '@/context/SnackbarContext'
import { useAuth } from '@/context/AuthContext'

export default function Loading({ Component, pageProps }) {
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(null)
	const router = useRouter()

	const { auth, setAuth } = useAuth()
	const { snackbar, closeSnackbar } = useSnackbar()

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
		<WebLayout>
			<Component {...pageProps} />
			<Snackbar open={snackbar.open} autoHideDuration={snackbar.duration} onClose={closeSnackbar}>
				<Alert onClose={closeSnackbar} severity={snackbar.severity} sx={{ width: '100%', fontWeight: 'bold' }}>
					{snackbar.text}
				</Alert>
			</Snackbar>
		</WebLayout>
	)
}