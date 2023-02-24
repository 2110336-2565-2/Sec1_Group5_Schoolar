import { useEffect, useState } from 'react'
import Navbar from '@components/Layout/Navbar'
import { Box, CssBaseline } from '@mui/material'
import Alert from '@mui/material/Alert'
import { ThemeProvider } from '@mui/material/styles'
import Head from 'next/head'
import { useRouter } from 'next/router'

import { useAuth } from '@/context/AuthContext'
import theme from '@/styles/theme'

const WebLayout = ({ children }) => {
	const { auth, setAuth } = useAuth()
	const [open, setOpen] = useState(false)
	const { route } = useRouter()

	useEffect(() => {
		if (open) {
			setTimeout(() => {
				setAuth(null)
				setOpen(false)
			}, 1000)
		}
	}, [open])

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
			<Navbar sx={{ flex: '0 1 auto' }} setOpen={setOpen} />
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
				<Box sx={{ display: 'flex', flex: '1 1 auto', position: 'relative' }}>
					<Box sx={{ position: 'fixed', top: '64px', right: '16px' }}>
						{open && <Alert severity="success">Logout successfully</Alert>}
					</Box>
					{children}
				</Box>
			</Box>
		</ThemeProvider>
	)
}

export default WebLayout
