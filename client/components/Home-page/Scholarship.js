import CalendarTodayIcon from '@mui/icons-material/CalendarToday'
import GroupIcon from '@mui/icons-material/Group'
import PaymentsIcon from '@mui/icons-material/Payments'
import PushPinIcon from '@mui/icons-material/PushPin'
import { Box, Button, Chip, Divider, Grid, Paper, Stack, Typography } from '@mui/material'
import { blue, grey } from '@mui/material/colors'
import { useRouter } from 'next/router'
import { useAuth } from '@/context/AuthContext'
import ScholarshipTags from './ScholarshipTag'

const changeDateToString = (date) => {
	if (!date) return null
	const dateObj = new Date(date)
	const day = dateObj.getDate()
	const monthIndex = dateObj.getMonth()
	const year = dateObj.getFullYear()
	const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
	const monthName = monthNames[monthIndex]
	return `${day} ${monthName} ${year}`
}
const DetailComponent = ({ icon, topic, value }) => {
	return (
		<Stack direction="row" spacing={1} marginLeft={2.5}>
			<Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
				<Stack direction="row" alignItems="center" gap={1}>
					{icon}
					{topic}
				</Stack>
			</Typography>
			<Typography variant="subtitle1" color="primary" sx={{ wordWrap: 'break-word', fontWeight: 550 }}>
				{value ? value : 'Not specified'}
			</Typography>
		</Stack>
	)
}

function Scholarship(props) {
	const {auth} = useAuth();
	const router = useRouter()

	return (
		<Grid container marginTop={2} marginBottom={4} gap="30px 60px" justifyContent="center">
			{props.items.length === 0 ? (
				<Typography variant="h6" color="textSecondary" gutterBottom>
					There is no matching scholarship
				</Typography>
			) : null}
			{props.items.map((scholar) => {
				return (
					<Box position="relative" key={scholar._id}>
						<Paper
							sx={{
								display: 'flex',
								width: { sm: 340 },
								maxWidth: 340,
								minHeight: 280,
								flexDirection: 'column',
								cursor: 'pointer',
								paddingY: 1,
							}}
							onClick={(event) => {
								router.push({
									pathname: 'scholarship/DetailScholarship',
									query: { data: JSON.stringify(scholar) },
								})
							}}
						>
							<Grid container direction="row" justifyContent="space-between">
								<Grid item xs={10} md={10}>
									<Typography
										sx={{ display: 'flex' }}
										variant="h5"
										margin={2}
										marginLeft={2}
										fontWeight={'bold'}
									>
										{scholar.scholarshipName}
									</Typography>
								</Grid>
								<Grid item xs={2} md={2}></Grid>
							</Grid>
							{scholar.applicationDeadline ? (
								<Chip
									sx={{
										borderRadius: 0,
										backgroundColor: 'white',
										color: '#797979',
										borderTop: '2px solid',
										borderBottom: '2px solid',
										fontWeight: 'bold',
									}}
									icon={<CalendarTodayIcon />}
									color="info"
									label={'Due Date : ' + changeDateToString(scholar.applicationDeadline)}
								/>
							) : (
								<Box sx={{ color: '#797979', borderTop: '2px solid' }}></Box>
							)}
							<ScholarshipTags scholar={scholar} />
							<Stack direction="row" justifyContent="space-between" alignItems="center">
							<Stack direction="column">
								{scholar.amount && (
								  <DetailComponent icon={<PaymentsIcon />} topic="Amount:" value={scholar.amount} />
							  )}
							  {scholar.quota && (
								  <DetailComponent icon={<GroupIcon />} topic="Quota:" value={scholar.quota} />
							  )}
							</Stack>
							{auth && auth.role === 'provider'&&
							<Button
							    size="small"
								sx={{ mr: 2 }}
								variant="contained"
								onClick={(e) => {
									e.stopPropagation();
									router.push(`/payment`)
								}}
							>
								Pay
							</Button>
							}
						</Stack>
						</Paper>
						{props.hidePin || (
							<Button
								variant="text"
								sx={{ display: 'flex', width: 50, height: 50, position: 'absolute', top: 0, right: 0 }}
								onClick={(event) => {
									props.handlePin(scholar)
								}}
							>
								<PushPinIcon sx={scholar?.isPin == 0 ? { color: grey[700] } : { color: blue[800] }} />
							</Button>
						)}
					</Box>
				)
			})}
		</Grid>
	)
}

export default Scholarship
