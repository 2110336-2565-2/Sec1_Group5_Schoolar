import '@/styles/globals.css'

export default function App({ Component, pageProps }) {
	return (
		<main className={barlow.className}>
			<Component {...pageProps} />
		</main>
	)
}
