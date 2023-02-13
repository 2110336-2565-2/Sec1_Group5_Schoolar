import PushPinIcon from '@mui/icons-material/PushPin'
import { Box, Button, Divider, Grid, Paper, Typography } from '@mui/material'
import { grey } from '@mui/material/colors'

function Scholarship(props) {
	return (
		<Grid container marginTop={2} marginBottom={4} gap="30px 50px" justifyContent="center">
			{props.items.length === 0 ? (
				<Typography variant="h6" color="textSecondary" gutterButtom>
					There is no matching scholarship
				</Typography>
			) : null}
			{props.items.map((scholar, idx) => {
				return (
					<Paper
						key={scholar.name + idx}
						component="form"
						sx={{
							display: 'flex',
							width: 300,
							height: 180,
							flexDirection: 'column',
						}}
					>
						<Grid container direction="row" justifyContent="space-between">
							<Typography margin={2} marginLeft={2}>
								{scholar.name}
							</Typography>
							<Button variant="text" sx={{ display: 'flex', width: 50, height: 50 }}>
								<PushPinIcon sx={{ color: grey[900] }} />
							</Button>
						</Grid>
						<Divider orientation="horizontal" borderBottomWidth={2} />
						<Grid margin={1}>
							{scholar.tag?.map((tag, idx) => {
								return (
									<div key={scholar.name + scholar.tag + idx}>
										<Box
											sx={{
												display: 'flex',
												width: 60,
												height: 25,
												backgroundColor: '#e6edec',
												borderRadius: 1,
												margin: 1,
												marginLeft: 2,
											}}
										>
											<Typography marginLeft={1}>{tag}</Typography>
										</Box>
									</div>
								)
							})}
						</Grid>
					</Paper>
				)
			})}
		</Grid>
	)
}

export default Scholarship
