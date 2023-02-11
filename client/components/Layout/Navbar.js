import * as React from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import Stack from '@mui/material/Stack'
import Toolbar from '@mui/material/Toolbar'
import Image from 'next/image'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import { useRouter } from 'next/router'

import { useAuth } from '@/context/AuthContext'

function Navbar() {
	const router = useRouter()
	const { auth } = useAuth()

	const [anchorEl, setAnchorEl] = React.useState(null)

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget)
	}

	const handleClose = () => {
		setAnchorEl(null)
	}

	const handleLogout = () => {
		setAnchorEl(null)
		router.push('/login')
	}
	return (
		<Box>
			<AppBar position="static" sx={{ bgcolor: 'primary' }}>
				<Toolbar>
					<Grid container direction="row" justifyContent="space-between">
						<Stack direction="row" spacing={2}>
							<Image src="/logo.svg" alt="logo" width="48" height="56" />
							{auth && (
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
								<Image
									src="/Account.svg"
									alt="account"
									width="30"
									height="31"
									aria-controls="simple-menu"
									aria-haspopup="true"
									onClick={handleClick}
								/>
								<Menu
									id="simple-menu"
									anchorEl={anchorEl}
									keepMounted
									open={Boolean(anchorEl)}
									onClose={handleClose}
								>
									<MenuItem onClick={handleClose}>Profile</MenuItem>
									<MenuItem onClick={handleLogout}>Logout</MenuItem>
								</Menu>
							</Button>
						</Stack>
					</Grid>
				</Toolbar>
			</AppBar>
		</Box>
	)
}

export default Navbar
