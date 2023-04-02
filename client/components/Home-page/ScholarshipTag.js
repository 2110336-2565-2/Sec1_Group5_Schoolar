import { Grid, Typography } from '@mui/material'
import Chip from '@mui/material/Chip';

const tagColors = {
	'Sci-Math': '#f08080',
	'Art-Cal': '#f4978e',
	'Art-Language': '#f8ad9d',
	'Art-Society': '#fbc4ab',
	'Art-General': '#ffdab9',
	'Faculty of Allied Health Sciences': '#fcac5d',
	'Faculty of Architecture': '#fcc75d',
	'Faculty of Arts': '#fcd45d',
	'Faculty of Commerce and Accountancy': '#90cf8e',
	'Faculty of Communication Arts': '#c5ecac',
	'Faculty of Dentistry': '#ccd5ae',
	'Faculty of Economics': '#a5ffd6',
	'Faculty of Education': '#84dcc6',
	'Faculty of Engineering': '#34a0a4',
	'Faculty of Fine and Applied Arts': '#2a9d8f',
	'Faculty of Law': '#264653',
	'Faculty of Medicine': '#97d2fb',
	'Faculty of Nursing': '#a0c4e2',
	'Faculty of Pharmaceutical Sciences': '#85c7de',
	'Faculty of Political Science': '#52b2cf',
	'Faculty of Psychology': '#dec0f1',
	'Faculty of Science': '#b79ced',
	'Faculty of Sports Science': '#957fef',
	'Faculty of Veterinary Science': '#7161ef',
    'full': '#778da9',
	'partial': '#415a77',
	'renewable': '#1b263b',
	'fellow': '#0d1b2a',
	'high school': '#00b4d8',
	'bachelor': '#0077b6',
	'master': '#023e8a',
	'doctoral': '#03045e',
}

const Tag = ({ text, color }) => (
	<Typography
		sx={{
			paddingX: 3,
			paddingY: 0.5,
			display: 'flex',
			color: 'white',
			backgroundColor: color,
			borderRadius: 5,
			margin: 0.5,
		}}
	>
		{text}
	</Typography>
)

const ScholarshipTags = ({ scholar }) => (
	<Grid container paddingX={2} paddingY={2} direction="row" alignItems="center">
		<Tag  	word-wrap="break-word"
				text={scholar.typeOfScholarship} 
				color={tagColors[scholar.typeOfScholarship]} />
		<Tag 	word-wrap="break-word"
				sx = {{'& .MuiChip-label': {
            	display: 'block'},}}
				text={scholar.degree} 
				color={tagColors[scholar.degree]} />
		<Tag 	word-wrap="break-word"
				sx = {{'& .MuiChip-label': {
            	display: 'block'},}}
				text={scholar.program} 
				color={tagColors[scholar.program]} />
	</Grid>
)

export default ScholarshipTags
