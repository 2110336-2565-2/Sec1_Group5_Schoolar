import Navbar from '@components/Layout/Navbar'
import { Box, CssBaseline } from '@mui/material'
import { ThemeProvider } from '@mui/material/styles'
import Head from 'next/head'
import { useRouter } from 'next/router'
import Footer from './Footer'
import { useAuth } from '@/context/AuthContext'
import theme from '@/styles/theme'

const WebLayout = ({ children }) => {
	const { auth, setAuth } = useAuth()

	const { route } = useRouter()

	const getBgImage = () => {
		if (!auth) return 'pencils.svg'
		if (auth.role === 'student') return 'cambridge.jpg'
		return 'school.png'
	}

	return (
		<ThemeProvider theme={theme}>
			<Head>
				<title>Schoolar</title>
				<meta name="viewport" content="initial-scale=1.0, width=device-width" />
			</Head>
			<CssBaseline />
			<Navbar />
			<Box
				sx={{
					minHeight: 'calc(100vh - 64px)',
					overflow: 'auto',
					backgroundImage: `url(/background/${getBgImage()})`,
					backgroundSize: 'cover',
					backgroundPosition: 'center center',
					display: 'flex',
					flexDirection: 'column',
				}}
			>
				<Box sx={{ display: 'flex', flex: '1 1 auto', position: 'relative' }}>{children}</Box>
			</Box>
			<Footer />
		</ThemeProvider>
	)
}
export default WebLayout
