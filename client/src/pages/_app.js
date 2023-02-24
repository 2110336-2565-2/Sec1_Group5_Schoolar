import '@/styles/globals.css'
import { AuthContextProvider } from '@/context/AuthContext'
import { SnackbarContextProvider } from '@/context/SnackbarContext'
import Loading from '@components/Layout/Loading'

export default function App({ Component, pageProps }) {
	return (
		<AuthContextProvider>
			<SnackbarContextProvider>
				<Loading Component={Component} pageProps={pageProps} />
			</SnackbarContextProvider>
		</AuthContextProvider>
	)
}
