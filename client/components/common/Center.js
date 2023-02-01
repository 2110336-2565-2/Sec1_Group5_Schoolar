import { Box } from '@mui/material'
import React from 'react'

const Center = ({ children, ...props }) => {
	return (
		<Box
			display={'flex'}
			justifyContent={'center'}
			alignItems={'center'}
			height={'100%'}
			width={'100%'}
			{...props}
		>
			{children}
		</Box>
	)
}

export default Center
