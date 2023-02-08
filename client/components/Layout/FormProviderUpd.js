import React, { useEffect, useState } from 'react'
import { Box, FormControl, TextField } from '@mui/material'

const FormUpdatePvdInfo = () => {
	const [password, setPassword] = useState('')
	const [rePassword, setRePassword] = useState('')

	return (
		<Box sx={{ display: 'flex', flexDirection: 'column', gap: '20px', width: '100%' }}>
			<FormControl
				fullWidth
				xs={12}
				sm={6}
				lg={4}
				sx={{
					display: 'flex',
					gap: '20px',
					width: '100%',
					height: '60vh',
				}}
			>
				<TextField
					id="outlined-start-adornment"
					defaultValue="XXXXXXX"
					label="Username"
					variant="outlined"
				/>
				<TextField
					id="outlined-start-adornment"
					defaultValue="ABC"
					label="Organization"
					variant="outlined"
				/>
				<TextField
					id="outlined-start-adornment"
					defaultValue="9999999"
					label="Credit Card Number"
					variant="outlined"
				/>
				<TextField
					id="outlined-start-adornment"
					defaultValue="99/99 xxxxxx"
					label="Address"
					variant="outlined"
				/>
				<TextField
					id="outlined-start-adornment"
					defaultValue=""
					label="Phone Number"
					variant="outlined"
				/>
				<TextField
					id="outlined-start-adornment"
					defaultValue=""
					label="Email"
					variant="outlined"
				/>
				<TextField
					id="outlined-start-adornment"
					defaultValue=""
					label="Enter New Password"
					variant="outlined"
					onChange={ (e) => {
                        setPassword(e.target.value)
                    }}
                    value={password}
				/>
				<TextField
					id="outlined-start-adornment"
					defaultValue=""
					label="Re-type New Password"
					variant="outlined"
					onChange={ (e) => {
                        setRePassword(e.target.value)
                    }}
                    value={rePassword}
				/>
            {(password!=rePassword) && <div>Password not match</div>}
			</FormControl>
            
		</Box>
	)
}

export default FormUpdatePvdInfo
