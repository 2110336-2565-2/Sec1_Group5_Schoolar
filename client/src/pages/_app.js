import Loading from '@components/Layout/Loading'
import SnackbarComponent from '@components/Layout/SnackbarComponent'

import { AuthContextProvider } from '@/context/AuthContext'
import { SnackbarContextProvider } from '@/context/SnackbarContext'
import '@/styles/globals.css'

export default function App({ Component, pageProps }) {
	return (
		<AuthContextProvider>
			<SnackbarContextProvider>
				<Loading Component={Component} pageProps={pageProps} />
				<SnackbarComponent />
			</SnackbarContextProvider>
		</AuthContextProvider>
	)
}
