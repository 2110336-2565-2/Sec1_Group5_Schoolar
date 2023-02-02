import '@/styles/globals.css'
import WebLayout from '@components/Layout'

export default function App({ Component, pageProps }) {
	return (
		<WebLayout>
			<Component {...pageProps} />
		</WebLayout>
	)
}
