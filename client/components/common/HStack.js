import React from 'react'
import { Stack } from '@mui/material'

const HStack = ({ children, ...props }) => {
	return (
		<Stack direction="row" width="100%" justifyContent="center" alignItems="center" {...props}>
			{children}
		</Stack>
	)
}

export default HStack
