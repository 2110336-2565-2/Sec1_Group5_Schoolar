import * as React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Grid, Divider, Paper, Stack, Typography } from '@mui/material'
import { VStack } from '@components/common'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import CallIcon from '@mui/icons-material/Call'
import PrintIcon from '@mui/icons-material/Print'
import FacebookIcon from '@mui/icons-material/Facebook'
import TwitterIcon from '@mui/icons-material/Twitter'
import InstagramIcon from '@mui/icons-material/Instagram'
import LinkedInIcon from '@mui/icons-material/LinkedIn'
import YouTubeIcon from '@mui/icons-material/YouTube'
import PinterestIcon from '@mui/icons-material/Pinterest'
import GitHubIcon from '@mui/icons-material/GitHub'

function Copyright() {
	return (
		<Typography variant="body2" color="text.primary" align="center" sx={{ margin: 1 }}>
			{'Copyright © '}
			<Link color="inherit" href="/">
				Schoolar
			</Link>{' '}
			{new Date().getFullYear()}
			{'.'}
		</Typography>
	)
}

export default function Footer() {
	return (
		<Paper sx={{ width: '100%', paddingTop: 5 }} component="footer" square variant="outlined" id="footer">
			<VStack>
				<Grid container gap="30px 0px" justifyContent="center">
					<Grid item xs={5} md={4.5} container justifyContent="center">
						<Image src="/primary/logo.svg" alt="logo" width={100} height={100} />
					</Grid>
					<Grid item xs={12} md={7.5} container direction="column" justifyContent="center" alignItems="center">
						<Stack direction="column" spacing={1}>
							<Stack direction="row" spacing={2}>
								<LocationOnIcon color="primary" />
								<Typography variant="body2">
									345 Faulconer Drive, Suite 4 • Charlottesville, CA, 12345
								</Typography>
							</Stack>
							<Stack direction="row">
								<CallIcon color="primary" sx={{ marginRight: 2 }} />
								<Typography variant="body2" sx={{ marginRight: 10 }}>
									(123) 456-7890
								</Typography>
								<PrintIcon color="primary" sx={{ marginRight: 2 }} />
								<Typography variant="body2">(123) 456-7890</Typography>
							</Stack>
							<Stack direction="row" spacing={2}>
								<Typography variant="body2">Social Media</Typography>
								<InstagramIcon color="primary" />
								<FacebookIcon color="primary" />
								<TwitterIcon color="primary" />
								<LinkedInIcon color="primary" />
								<YouTubeIcon color="primary" />
								<PinterestIcon color="primary" />
								<GitHubIcon color="primary" />
							</Stack>
						</Stack>
					</Grid>
				</Grid>
				<Divider orientation="horizontal" color="#C3E4FF" sx={{ width: '70%', marginTop: 3 }} />
				<Copyright />
			</VStack>
		</Paper>
	)
}
