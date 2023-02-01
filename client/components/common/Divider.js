import React from 'react'
import { Divider as MuiDivider } from '@mui/material'

const Divider = ({ orientation = 'horizontal', thickness, ...props }) => {
	return (
		<MuiDivider
			orientation={orientation}
			flexItem
			{...props}
			sx={
				orientation === 'horizontal'
					? { borderBottomWidth: thickness }
					: { borderRightWidth: thickness }
			}
		/>
	)
}

export default Divider
