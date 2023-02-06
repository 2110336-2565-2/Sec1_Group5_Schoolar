import Head from 'next/head'
import React from 'react'
import { ThemeProvider } from '@mui/material/styles'
import theme from '../../src/styles/theme'
import Navbar from '@components/Layout/Navbar'
import { Box, CssBaseline } from '@mui/material'
import { useRouter } from 'next/router'

const WebLayout = ({ children }) => {
	const { route } = useRouter()
	const yellowBgPages = ['/register']
	if (yellowBgPages.includes(route)) {
		theme.palette.background.default = '#EEEDE3'
	}

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
				{/* <Navbar sx={{ flex: '0 1 auto' }} /> */}
				<Box sx={{ flex: '1 1 auto' }}>{children}</Box>
			</Box>
		</ThemeProvider>
	)
}

export default WebLayout
