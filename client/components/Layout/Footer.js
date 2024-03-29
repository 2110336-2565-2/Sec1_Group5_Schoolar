import * as React from 'react'

import { VStack } from '@components/common'
import CallIcon from '@mui/icons-material/Call'
import FacebookIcon from '@mui/icons-material/Facebook'
import GitHubIcon from '@mui/icons-material/GitHub'
import InstagramIcon from '@mui/icons-material/Instagram'
import LinkedInIcon from '@mui/icons-material/LinkedIn'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import PinterestIcon from '@mui/icons-material/Pinterest'
import PrintIcon from '@mui/icons-material/Print'
import TwitterIcon from '@mui/icons-material/Twitter'
import YouTubeIcon from '@mui/icons-material/YouTube'
import { Divider, Grid, Paper, Stack, Typography } from '@mui/material'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'

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
	const router = useRouter()

	return (
		<Paper sx={{ width: '100%', paddingTop: 5 }} component="footer" square variant="outlined" id="footer">
			<VStack>
				<Grid container gap="30px 0px" justifyContent="center">
					<Grid item xs={5} md={4.5} container justifyContent="center">
						<Image src="/primary/logo.svg" alt="logo" width={100} height={100} />
					</Grid>
					<Grid
						item
						xs={12}
						md={7.5}
						container
						direction="column"
						justifyContent="center"
						alignItems="center"
					>
						<Stack direction="column" spacing={1}>
							<Stack direction="row" alignItems="center" spacing={2}>
								<LocationOnIcon color="primary" />
								<Typography variant="body2">
									345 Faulconer Drive, Suite 4 • Charlottesville, CA, 12345
								</Typography>
							</Stack>
							<Stack direction="row" alignItems="center">
								<CallIcon color="primary" sx={{ marginRight: 2 }} />
								<Typography variant="body2" sx={{ marginRight: 10 }}>
									(123) 456-7890
								</Typography>
								<PrintIcon color="primary" sx={{ marginRight: 2 }} />
								<Typography variant="body2">(123) 456-7890</Typography>
							</Stack>
							<Stack direction="row" spacing={2} alignItems="center">
								<Typography variant="body2">Social Media</Typography>
								<InstagramIcon
									color="primary"
									sx={{ cursor: 'pointer' }}
									onClick={() => router.push('https://www.instagram.com/')}
								/>
								<FacebookIcon
									color="primary"
									sx={{ cursor: 'pointer' }}
									onClick={() => router.push('https://www.facebook.com/')}
								/>
								<TwitterIcon
									color="primary"
									sx={{ cursor: 'pointer' }}
									onClick={() => router.push('https://twitter.com/')}
								/>
								<LinkedInIcon
									color="primary"
									sx={{ cursor: 'pointer' }}
									onClick={() => router.push('https://www.linkedin.com/')}
								/>
								<YouTubeIcon
									color="primary"
									sx={{ cursor: 'pointer' }}
									onClick={() => router.push('https://www.youtube.com/')}
								/>
								<PinterestIcon
									color="primary"
									sx={{ cursor: 'pointer' }}
									onClick={() => router.push('https://www.pinterest.com/')}
								/>
								<GitHubIcon
									color="primary"
									sx={{ cursor: 'pointer' }}
									onClick={() =>
										router.push('https://github.com/2110336-2565-2/Sec1_Group5_Schoolar')
									}
								/>
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
