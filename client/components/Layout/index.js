import React, { useEffect } from 'react'
import Navbar from '@components/Layout/Navbar'
import { Box, CssBaseline } from '@mui/material'
import Alert from '@mui/material/Alert'
import { ThemeProvider } from '@mui/material/styles'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useAuth } from '@/context/AuthContext'

import theme from '../../src/styles/theme'

const WebLayout = ({ children }) => {
	const { auth, setAuth } = useAuth()
	const [open, setOpen] = React.useState(false)

	const { route } = useRouter()
	const yellowBgPages = ['/register', '/login']
	if (yellowBgPages.includes(route)) {
		theme.palette.background.default = theme.palette.secondary.light
	} else {
		theme.palette.background.default = theme.palette.primary.light
	}

	useEffect(() => {
		if (open) {
			setTimeout(() => {
				setAuth(null)
				setOpen(false)
			}, 1000)
		}
	}, [open])

	return (
		<ThemeProvider theme={theme}>
			<Head>
				<title>Schoolar</title>
				<meta name="viewport" content="initial-scale=1.0, width=device-width" />
			</Head>
			<CssBaseline />
			<Box
				sx={{
					height: '100vh',
					display: 'flex',
					flexFlow: 'column',
				}}
			>
				<Navbar sx={{ flex: '0 1 auto' }} setOpen={setOpen} />
				<Box sx={{ flex: '1 1 auto', position: 'relative' }}>
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
