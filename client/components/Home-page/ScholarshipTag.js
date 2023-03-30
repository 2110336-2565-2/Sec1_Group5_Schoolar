import { Grid, Typography } from '@mui/material'

const tagColors = {
	'Sci-Math': '#ffbe0b',
	'Art-Cal': '#55286f',
	'Art-Language': '#AA73E8',
	'Art-Society': '#ae759f',
	'Art-General': '#D3D7E0',
	'Faculty of Allied Health Sciences': '#E49DA9',
	'Faculty of Architecture': '#E7A6B2',
	'Faculty of Arts': '#ff7096',
	'Faculty of Commerce and Accountancy': '#EFB8C9',
	'Faculty of Communication Arts': '#F3C1D3',
	'Faculty of Dentistry': '#F6CADB',
	'Faculty of Economics': '#FAD3E4',
	'Faculty of Education': '#FDECEC',
	'Faculty of Engineering': '#6AA2FE',
	'Faculty of Fine and Applied Arts': '#f4aaa7',
	'Faculty of Law': '#7161ef',
	'Faculty of Medicine': '#ffb3c1',
	'Faculty of Nursing': '#E8D9D4',
	'Faculty of Pharmaceutical Sciences': '#ff9770',
	'Faculty of Political Science': '#34a0a4',
	'Faculty of Psychology': '#ce4257',
	'Faculty of Science': '#D8C8A0',
	'Faculty of Sports Science': '#998AF0',
	'Faculty of Veterinary Science': '#D0C086',
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
		<Tag text={scholar.typeOfScholarship} color={tagColors[scholar.typeOfScholarship]} />
		<Tag text={scholar.degree} color={tagColors[scholar.degree]} />
		<Tag text={scholar.program} color={tagColors[scholar.program]} />
	</Grid>
)

export default ScholarshipTags
