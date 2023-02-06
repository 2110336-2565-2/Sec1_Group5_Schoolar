import React from 'react'
import { Button, FormControl, TextField } from '@mui/material'
import { Stack } from '@mui/system'

const FormProvidePvdInfo = () => {
	return (
		<FormControl component="form" sx={{ width: '100%' }}>
			<Stack spacing={3} direction="column">
				<TextField required id="outlined" label="Organization" />
				<TextField required id="outlined" label="Website" />
				<TextField required id="outlined" label="Phone Number" />
				<TextField required id="outlined" label="Email" />
				<TextField id="outlined" label="Address" />

				<Button variant="contained" type="submit" sx={{ backgroundColor: '#3F51A9' }}>
					SUBMIT
				</Button>
			</Stack>
		</FormControl>
	)
}

export default FormProvidePvdInfo
