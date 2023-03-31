import CalendarTodayIcon from '@mui/icons-material/CalendarToday'
import PushPinIcon from '@mui/icons-material/PushPin'
import { Button, Chip, Divider, Grid, Paper, Stack, Typography } from '@mui/material'
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
const DetailComponent = ({ topic, value }) => {
	return (
		<Stack direction="row" spacing={1} marginLeft={2.5}>
			<Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
				{topic}
			</Typography>
			<Typography variant="subtitle1" color="#036EC5" sx={{ wordWrap: 'break-word', fontWeight: 550 }}>
				{value ? value : 'Not specified'}
			</Typography>
		</Stack>
	)
}

function Scholarship(props) {
	const { auth } = useAuth()
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
					<Paper
						key={scholar._id}
						sx={{
							display: 'flex',
							width: 340,
							minHeight: 240,
							flexDirection: 'column',
							cursor: 'pointer',
							paddingY: 1,
						}}
						onClick={() => {
							if (auth && auth.role === 'provider') {
								router.push({
									pathname: 'scholarship/DetailScholarship',
									query: { data: JSON.stringify(scholar) },
								})
								//router.push(`/scholarship/update-scholarship/${scholar._id}`)
							} else {
								router.push({
									pathname: 'scholarship/DetailScholarship',
									query: { data: JSON.stringify(scholar) },
								})
							}
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
							<Grid item xs={2} md={2}>
								<Button variant="text" sx={{ display: 'flex', width: 50, height: 50 }}>
									<PushPinIcon sx={{ color: grey[900] }} />
								</Button>
							</Grid>
						</Grid>
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
							label={
								scholar.applicationDeadline ? changeDateToString(scholar.applicationDeadline) : 'TBD'
							}
						/>
						<ScholarshipTags scholar={scholar} />
						<Stack direction="row" justifyContent="space-between" alignItems="center">
							<Stack direction="column">
								<DetailComponent topic="Amount:" value={scholar.amount} />
								<DetailComponent topic="Quota:" value={scholar.quota} />
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
				)
			})}
		</Grid>
	)
}

export default Scholarship
