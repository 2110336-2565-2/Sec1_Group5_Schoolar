import * as React from 'react'
import { Center, HStack } from '@components/common'
import { AppRegistration, Edit, Login, Logout, Route } from '@mui/icons-material'
import {
	Avatar,
	Box,
	Button,
	IconButton,
	ListItemIcon,
	Menu,
	MenuItem,
	Stack,
	Toolbar,
	Tooltip,
	Typography,
} from '@mui/material'
import AppBar from '@mui/material/AppBar'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'

import { useAuth } from '@/context/AuthContext'
import { useSnackbar } from '@/context/SnackbarContext'
import useAxiosPrivate from '@/hooks/useAxiosPrivate'

function Navbar() {
	const { auth, setAuth } = useAuth()
	const { openSnackbar } = useSnackbar()

	const router = useRouter()

	const [anchorEl, setAnchorEl] = React.useState(null)
	const open = Boolean(anchorEl)

	const handleLogo = () => {
		if (router.asPath == '/') {
			router.reload()
		} else {
			router.push('/')
		}
	}

	const handleMenuClick = (event) => {
		setAnchorEl(event.currentTarget)
	}

	const handleMenuClose = () => {
		setAnchorEl(null)
	}

	const handleLogout = async () => {
		try {
			await logoutUser()
			setAuth(null)
			openSnackbar('Logout success!', 'success')
		} catch (error) {
			console.error(error)
		}
	}

	const axiosPrivate = useAxiosPrivate()

	const logoutUser = async () => {
		await axiosPrivate.put('/auth/logout')
	}

	return (
		<AppBar position="sticky" sx={{ bgcolor: 'primary.light', height: 64 }}>
			<Toolbar>
				<HStack direction="row" justifyContent="space-between">
					<Stack direction="row" spacing={2}>
						<Center onClick={handleLogo}>
							<Image src="/primary/logo.svg" alt="logo" width={43} height={51} />
						</Center>

						<MenuItem component={Link} href="#footer">
							<Typography textAlign="center" color={'text.main'}>
								Contact Us
							</Typography>
						</MenuItem>
					</Stack>
					<Stack direction="row">
						{auth && (
							<Button>
								<Image src="/primary/Noti.svg" alt="notification" width="30" height="31" />
							</Button>
						)}
						<Box
							sx={{
								display: 'flex',
								alignItems: 'center',
								textAlign: 'center',
							}}
						>
							<Tooltip title="Account settings">
								<IconButton
									onClick={handleMenuClick}
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
							onClose={handleMenuClose}
							onClick={handleMenuClose}
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
							{auth
								? [
										<Link href="/profile/edit" key="edit">
											<MenuItem key="Edit Profile">
												<ListItemIcon>
													<Edit fontSize="small" />
												</ListItemIcon>
												Edit Profile
											</MenuItem>
										</Link>,
										<MenuItem onClick={handleLogout} key="logout">
											<ListItemIcon>
												<Logout fontSize="small" />
											</ListItemIcon>
											Logout
										</MenuItem>,
								  ]
								: [
										<Link href="/login" key="login">
											<MenuItem>
												<ListItemIcon>
													<Login fontSize="small" />
												</ListItemIcon>
												Login
											</MenuItem>
										</Link>,
										<Link href="/register" key="register">
											<MenuItem>
												<ListItemIcon>
													<AppRegistration fontSize="small" />
												</ListItemIcon>
												Register
											</MenuItem>
										</Link>,
								  ]}
						</Menu>
					</Stack>
				</HStack>
			</Toolbar>
		</AppBar>
	)
}

export default Navbar
