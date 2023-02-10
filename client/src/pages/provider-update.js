import React from 'react'
import { Button } from '@mui/material'
import { Typography } from '@mui/material'
import Grid2 from '@mui/material/Unstable_Grid2'
import Image from 'next/image'
import FormProviderUpd from '@components/Layout/FormProviderUpd'

export default function UpdateProviderInfo() {
	const [disabled, setDisabled] = React.useState(true)

	function handleEditBtnClick() {
		setDisabled(!disabled)
		// console.log(disabled)
	}
	return (
		<Grid2
			container
			spacing={2}
			sx={{
				height: '100%',
				width: '100%',
				padding: '20px 0px 20px 10px',
				margin: '0 auto',
				justifyContent: 'center',
				alignItems: 'center',
				overflow: 'hidden',
			}}
		>
			<Grid2
				container
				xs={12}
				sm={6}
				lg={7}
				sx={{ marginTop: '10 auto', alignItems: 'center', justifyContent: 'space-evenly' }}
			>
				<Grid2 xs={12} lg={5}>
					<Typography
						variant="h3"
						sx={{ textAlign: 'center', fontWeight: 'bold', mb: '20px' }}
					>
						Update Provider Information
					</Typography>
				</Grid2>
				<Grid2
					xs={0}
					sm={12}
					lg={7}
					sx={{
						position: 'relative',
						display: { xs: 'none', sm: 'block' },
					}}
				>
					<Image
						src="/overlay.png"
						width={0}
						height={0}
						sizes="100vw"
						style={{
							width: '200%',
							height: 'auto',
							position: 'absolute',
							top: '50%',
							left: '50%',
							transform: 'translate(-50%, -50%)',
							zIndex: -1,
						}}
					/>
					<Image
						src="/women.png"
						width={0}
						height={0}
						sizes="100vw"
						style={{
							width: '100%',
							height: 'auto',
							padding: '20px',
							position: 'relative',
						}}
					/>
				</Grid2>
			</Grid2>
			<Grid2
				container
				xs={12}
				sm={6}
				lg={4}
				direction="column"
				spacing={3}
				sx={{
					display: 'flex',
					alignItems: 'stretch',
					justifyContent: 'space-evenly',
					padding: '20px 0px 20px 0px',
				}}
			>
				<Grid2
					container
					xs={12}
					direction="column"
					spacing={4}
					sx={{
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
					}}
				>
					<Grid2
						item
						xs={4}
						sx={{
							display: 'flex',
							alignItems: 'flex-end',
							justifyContent: 'center',
							marginLeft: '20%',
						}}
					>
						<Button variant="outlined" onClick={handleEditBtnClick}>
							Click to Edit
						</Button>
					</Grid2>
					<Grid2 sx={{ overflow: 'auto' }}>
						<FormProviderUpd isDisabled={disabled} />
					</Grid2>
					<Grid2
						item
						alignItems="stretch"
						justifyContent="center"
						sx={{ padding: '20px 0px 20px 0px' }}
					>
						<Button variant="contained">Update</Button>
					</Grid2>
				</Grid2>
			</Grid2>
		</Grid2>
	)
}
