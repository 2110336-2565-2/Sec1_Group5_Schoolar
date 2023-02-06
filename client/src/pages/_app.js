import WebLayout from '@components/Layout'

import '@/styles/globals.css'

export default function App({ Component, pageProps }) {
	return (
		<WebLayout>
			<Component {...pageProps} />
		</WebLayout>
	)
}
