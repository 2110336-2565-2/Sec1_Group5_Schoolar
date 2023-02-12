import * as React from 'react'
import { Center } from '@components/common'
import { Login, Logout } from '@mui/icons-material'
import {
	Avatar,
	Box,
	Button,
	Grid,
	IconButton,
	ListItemIcon,
	Menu,
	MenuItem,
	Stack,
	Toolbar,
	Tooltip,
} from '@mui/material'
import AppBar from '@mui/material/AppBar'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'

import { useAuth } from '@/context/AuthContext'

function Navbar() {
	const router = useRouter()
	const { auth } = useAuth()

	const [anchorEl, setAnchorEl] = React.useState(null)
	const open = Boolean(anchorEl)

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget)
	}

	const handleClose = () => {
		setAnchorEl(null)
	}

	const toLogin = () => {
		setAnchorEl(null)
		router.push('/login')
	}

	const toNoti = () => {
		console.log('TO NOTI PAGE')
	}

	const toEditProfile = () => {
		console.log('TO EDIT PROFILE PAGE')
	}

	return (
		<Box>
			<AppBar position="static" sx={{ bgcolor: 'primary' }}>
				<Toolbar>
					<Grid container direction="row" justifyContent="space-between">
						<Stack direction="row" spacing={2}>
							<Link href="/home-page">
								<Center>
									<Image src="/logo.svg" alt="logo" width={43} height={51} />
								</Center>
							</Link>
						</Stack>

						<Stack direction="row">
							{auth && (
								<Button>
									<Image
										src="/Noti.svg"
										alt="notification"
										width="30"
										height="31"
										onClick={toNoti}
									/>
								</Button>
							)}
							<React.Fragment>
								<Box
									sx={{
										display: 'flex',
										alignItems: 'center',
										textAlign: 'center',
									}}
								>
									<Tooltip title="Account settings">
										<IconButton
											onClick={handleClick}
											size="small"
											sx={{ ml: 2 }}
											aria-controls={open ? 'account-menu' : undefined}
											aria-haspopup="true"
											aria-expanded={open ? 'true' : undefined}
										>
											<Avatar sx={{ width: 32, height: 32 }} />
										</IconButton>
									</Tooltip>
								</Box>
								<Menu
									anchorEl={anchorEl}
									id="account-menu"
									open={open}
									onClose={handleClose}
									onClick={handleClose}
									PaperProps={{
										elevation: 0,
										sx: {
											overflow: 'visible',
											filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
											mt: 1.5,
											'& .MuiAvatar-root': {
												width: 32,
												height: 32,
												ml: -0.5,
												mr: 1,
											},
											'&:before': {
												content: '""',
												display: 'block',
												position: 'absolute',
												top: 0,
												right: 14,
												width: 10,
												height: 10,
												bgcolor: 'background.paper',
												transform: 'translateY(-50%) rotate(45deg)',
												zIndex: 0,
											},
										},
									}}
									transformOrigin={{ horizontal: 'right', vertical: 'top' }}
									anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
								>
									{auth ? (
										[
											<MenuItem onClick={toEditProfile} key="Edit Profile">
												<Avatar />
												Edit Profile
											</MenuItem>,
											<MenuItem onClick={toLogin} key={'Logout'}>
												<ListItemIcon>
													<Logout fontSize="small" />
												</ListItemIcon>
												Logout
											</MenuItem>,
										]
									) : (
										<MenuItem onClick={toLogin}>
											<ListItemIcon>
												<Login fontSize="small" />
											</ListItemIcon>
											Login
										</MenuItem>
									)}
								</Menu>
							</React.Fragment>
						</Stack>
					</Grid>
				</Toolbar>
			</AppBar>
		</Box>
	)
}

export default Navbar
