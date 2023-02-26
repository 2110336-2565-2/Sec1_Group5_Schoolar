import React from 'react'

import { Box } from '@mui/material'

const Center = ({ children, ...props }) => {
	return (
		<Box display={'flex'} justifyContent={'center'} alignItems={'center'} height={'100%'} width={'100%'} {...props}>
			{children}
		</Box>
	)
}

export default Center
