import Head from 'next/head'
import React from 'react'
import { ThemeProvider } from '@mui/material/styles'
import theme from '../../src/styles/theme'

import Navbar from '@components/Layout/Navbar'
import { Box } from '@mui/material'
import { useRouter } from 'next/router'

const WebLayout = ({ children }) => {
	const router = useRouter()
	return (
		<ThemeProvider theme={theme}>
			<Head>
				<title>Schoolar</title>
				<meta name="viewport" content="initial-scale=1.0, width=device-width" />
			</Head>
			<Box
				sx={{
					height: '100vh',
					display: 'flex',
					flexDirection: 'column',
					bgcolor: router.pathname === '/register' ? 'secondary.light' : 'primary.light',
				}}
			>
				<Navbar />
				<Box sx={{ flexGrow: 1 }}>{children}</Box>
			</Box>
		</ThemeProvider>
	)
}

export default WebLayout
