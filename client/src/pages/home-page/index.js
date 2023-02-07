import { Divider, Typography } from '@mui/material'
import { Container } from '@mui/system'

import SearchBar from './search-scholarship'
import { Scholarship } from './scholarship'
function Homepage() {
	return (
		<Container maxWidth="lg">
			<SearchBar />
			<Typography variant="h5" align="left" color="textPrimary" gutterButtom>
				The Latest Scholarships
			</Typography>
			<Divider orientation="horizontal" flexItem sx={{ borderBottomWidth: 2 }} />
			<Scholarship />
		</Container>
	)
}
export default Homepage
