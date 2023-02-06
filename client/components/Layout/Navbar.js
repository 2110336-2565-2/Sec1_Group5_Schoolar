import * as React from 'react'
import MenuIcon from '@mui/icons-material/Menu'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import Stack from '@mui/material/Stack'
import Toolbar from '@mui/material/Toolbar'
import Image from 'next/image'

import { useAuth } from '@/context/AuthContext'

function Navbar() {
	const { user } = useAuth()

	return (
		<Box>
			<AppBar position="static" sx={{ bgcolor: 'primary' }}>
				<Toolbar>
					<Grid container direction="row" justifyContent="space-between">
						<Stack direction="row" spacing={2}>
							<Image src="/logo.svg" alt="logo" width="48" height="56" />
							{user && (
								<Stack direction="row">
									<Button color="inherit">Category</Button>
									<Button color="inherit">Contact Us</Button>
								</Stack>
							)}
						</Stack>

						<Stack direction="row">
							<Button>
								<Image src="/Noti.svg" alt="notification" width="30" height="31" />
							</Button>
							<Button>
								<Image src="/Account.svg" alt="account" width="30" height="31" />
							</Button>
						</Stack>
					</Grid>
				</Toolbar>
			</AppBar>
		</Box>
	)
}

export default Navbar
