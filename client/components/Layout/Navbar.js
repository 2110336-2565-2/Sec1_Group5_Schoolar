import * as React from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import Image from 'next/image'
import { Menu, MenuItem } from '@mui/material'

export default function Navbar() {
	return (
		<Box sx={{ flexGrow: 1 }}>
			<AppBar position="static">
				<Toolbar>
					<Image src="/logo.png" alt="logo" width="54" height="64" />
					<Button color="inherit">Login</Button>
				</Toolbar>
			</AppBar>
		</Box>
	)
}
