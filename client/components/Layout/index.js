import React, { useEffect } from 'react'
import Navbar from '@components/Layout/Navbar'
import { Box, CssBaseline } from '@mui/material'
import Alert from '@mui/material/Alert'
import { ThemeProvider } from '@mui/material/styles'
import Head from 'next/head'
import { useRouter } from 'next/router'

import theme from '../../src/styles/theme'

const WebLayout = ({ children }) => {
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
				setOpen(false)
			}, 3000)
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
				<Box>
					{open && (
						<Box
							sx={{
								display: 'flex',
								justifyContent: 'flex-end',
							}}
						>
							<Alert severity="success">Logout successfully</Alert>
						</Box>
					)}
				</Box>
				<Box sx={{ flex: '1 1 auto' }}>{children}</Box>
			</Box>
		</ThemeProvider>
	)
}

export default WebLayout
