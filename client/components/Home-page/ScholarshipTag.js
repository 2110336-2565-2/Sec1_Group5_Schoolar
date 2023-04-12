import { Grid, Typography } from '@mui/material'
import Chip from '@mui/material/Chip'

const tagColors = {
	'Sci-Math': '#d53973',
	'Art-Cal': '#df4848',
	'Art-Language': '#f05656',
	'Art-Society': '#a17f7f',
	'Art-General': '#8f6d6d',
	'Faculty of Allied Health Sciences': '#e87d19',
	'Faculty of Architecture': '#fa8c0a',
	'Faculty of Arts': '#f0c22b',
	'Faculty of Commerce and Accountancy': '#6fa44d',
	'Faculty of Communication Arts': '#98d679',
	'Faculty of Dentistry': '#b6d98f',
	'Faculty of Economics': '#45b5ac',
	'Faculty of Education': '#6cb9b1',
	'Faculty of Engineering': '#00afaf',
	'Faculty of Fine and Applied Arts': '#00c996',
	'Faculty of Law': '#4f6972',
	'Faculty of Medicine': '#2ca3d3',
	'Faculty of Nursing': '#4c86c4',
	'Faculty of Pharmaceutical Sciences': '#3376b4',
	'Faculty of Political Science': '#6574bb',
	'Faculty of Psychology': '#ba8dc6',
	'Faculty of Science': '#8e44ad',
	'Faculty of Sports Science': '#7b3d8b',
	'Faculty of Veterinary Science': '#613e7f',
	'Full Scholarship': '#5e6068',
	'Partial Scholarship': '#28343c',
	'Renewable Scholarship': '#0c0d12',
	Fellowship: '#020609',
	'High School': '#0079ad',
	Bachelor: '#00527a',
	Master: '#001f3e',
	Doctoral: '#00051a',
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
		<Tag
			word-wrap="break-word"
			text={scholar.typeOfScholarship}
			color={tagColors[scholar.typeOfScholarship] || 'text.primary'}
		/>
		<Tag
			word-wrap="break-word"
			sx={{
				'& .MuiChip-label': {
					display: 'block',
				},
			}}
			text={scholar.degree}
			color={tagColors[scholar.degree] || 'text.primary'}
		/>
		<Tag
			word-wrap="break-word"
			sx={{
				'& .MuiChip-label': {
					display: 'block',
				},
			}}
			text={scholar.program}
			color={tagColors[scholar.program] || 'text.primary'}
		/>
	</Grid>
)

export default ScholarshipTags
