import Head from 'next/head'
import React from 'react'

import Navbar from '@components/Layout/Navbar'

const WebLayout = ({ children }) => {
	return (
		<>
			<Head>
				<title>Schoolar</title>
				<meta name="viewport" content="initial-scale=1.0, width=device-width" />
			</Head>
			<Navbar />
			<main>{children}</main>
		</>
	)
}

export default WebLayout
