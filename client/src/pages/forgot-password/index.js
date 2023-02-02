import { Center, VStack } from '@components/common'
import TextField from '@mui/material/TextField'
import React from 'react'
import { PasswordIcon } from '@utils/images'
import Image from 'next/image'
import { Typography, Divider, Button } from '@mui/material'
import { styled } from '@mui/material/styles'

function ForgotPassword() {
	const Root = styled('div')(({ theme }) => ({
		width: '100%',
		...theme.typography.body2,
		'& > :not(style) + :not(style)': {
			marginTop: theme.spacing(2),
		},
	}))

	return (
		<Center height={'90vh'}>
			<Center
				sx={{ border: '0.1rem solid #2C429B', borderRadius: '1.5rem' }}
				width={'50%'}
				height={'60%'}
			>
				<Center
					sx={{ border: '0.1rem solid  #FDBA21', borderRadius: '1rem' }}
					width={'92%'}
					height={'93%'}
				>
					<VStack sx={{ p: 5 }} gap={3}>
						<Image src={PasswordIcon} width={65}></Image>
						<Typography sx={{ fontSize: 12 }} fontWeight={'light'}>
							Enter your email address and we’ll send a link to get back to your
							account.
						</Typography>
						<TextField
							id="reset-email"
							label="Email address"
							variant="outlined"
							fullWidth
							size="small"
							inputProps={{ style: { fontSize: 10 } }} // font size of input text
							InputLabelProps={{ style: { fontSize: 10 } }}
						/>
						<Button
							fullWidth
							variant="contained"
							size="small"
							sx={{ fontSize: 10 }}
							style={{ textTransform: 'none' }}
						>
							Send login link
						</Button>
						<Root>
							<Divider
								sx={{
									fontWeight: 'light',
									fontSize: 10,
								}}
							>
								or
							</Divider>
						</Root>
						<Button
							fullWidth
							variant="outlined"
							size="small"
							sx={{ fontSize: 10 }}
							style={{ textTransform: 'none' }}
						>
							Back to login
						</Button>
					</VStack>
				</Center>
			</Center>
		</Center>
	)
}

export default ForgotPassword
