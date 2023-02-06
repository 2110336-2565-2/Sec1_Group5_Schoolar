import WebLayout from '@components/Layout'

import { AuthContextProvider } from '@/context/AuthContext'

import '@/styles/globals.css'

export default function App({ Component, pageProps }) {
	return (
		<AuthContextProvider>
			<WebLayout>
				<Component {...pageProps} />
			</WebLayout>
		</AuthContextProvider>
	)
}
