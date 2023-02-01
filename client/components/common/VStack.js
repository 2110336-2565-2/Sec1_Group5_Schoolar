import React from 'react'
import { Stack } from '@mui/material'

const VStack = ({ children, ...props }) => {
	return (
		<Stack
			direction="column"
			justifyContent="center"
			alignItems="center"
			height="100%"
			{...props}
		>
			{children}
		</Stack>
	)
}

export default VStack
