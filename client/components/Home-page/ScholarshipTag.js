import AccountBalanceIcon from '@mui/icons-material/AccountBalance'
import AirlineSeatFlatAngledIcon from '@mui/icons-material/AirlineSeatFlatAngled'
import ArchitectureIcon from '@mui/icons-material/Architecture'
import AutorenewIcon from '@mui/icons-material/Autorenew'
import BiotechIcon from '@mui/icons-material/Biotech'
import BrushIcon from '@mui/icons-material/Brush'
import CalculateIcon from '@mui/icons-material/Calculate'
import ChatIcon from '@mui/icons-material/Chat'
import CircleIcon from '@mui/icons-material/Circle'
import ColorLensIcon from '@mui/icons-material/ColorLens'
import CorporateFareIcon from '@mui/icons-material/CorporateFare'
import Diversity2Icon from '@mui/icons-material/Diversity2'
import EngineeringIcon from '@mui/icons-material/Engineering'
import GavelIcon from '@mui/icons-material/Gavel'
import HomeIcon from '@mui/icons-material/Home'
import LocalHospitalIcon from '@mui/icons-material/LocalHospital'
import MedicalInformationIcon from '@mui/icons-material/MedicalInformation'
import MedicationLiquidIcon from '@mui/icons-material/MedicationLiquid'
import MenuBookIcon from '@mui/icons-material/MenuBook'
import MuseumIcon from '@mui/icons-material/Museum'
import PaidIcon from '@mui/icons-material/Paid'
import PetsIcon from '@mui/icons-material/Pets'
import PsychologyIcon from '@mui/icons-material/Psychology'
import PublicIcon from '@mui/icons-material/Public'
import SchoolIcon from '@mui/icons-material/School'
import ScienceIcon from '@mui/icons-material/Science'
import SportsTennisIcon from '@mui/icons-material/SportsTennis'
import StarIcon from '@mui/icons-material/Star'
import TagIcon from '@mui/icons-material/Tag'
import TheaterComedyIcon from '@mui/icons-material/TheaterComedy'
import TranslateIcon from '@mui/icons-material/Translate'
import TripOriginIcon from '@mui/icons-material/TripOrigin'
import VaccinesIcon from '@mui/icons-material/Vaccines'
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

const tagIcons = {
	'Sci-Math': <ScienceIcon />,
	'Art-Cal': <CalculateIcon />,
	'Art-Language': <TranslateIcon />,
	'Art-Society': <Diversity2Icon />,
	'Art-General': <ColorLensIcon />,
	'Faculty of Allied Health Sciences': <MedicationLiquidIcon />,
	'Faculty of Architecture': <ArchitectureIcon />,
	'Faculty of Arts': <ChatIcon />,
	'Faculty of Commerce and Accountancy': <AccountBalanceIcon />,
	'Faculty of Communication Arts': <TheaterComedyIcon />,
	'Faculty of Dentistry': <AirlineSeatFlatAngledIcon />,
	'Faculty of Economics': <PaidIcon />,
	'Faculty of Education': <MenuBookIcon />,
	'Faculty of Engineering': <EngineeringIcon />,
	'Faculty of Fine and Applied Arts': <BrushIcon />,
	'Faculty of Law': <GavelIcon />,
	'Faculty of Medicine': <MedicalInformationIcon />,
	'Faculty of Nursing': <LocalHospitalIcon />,
	'Faculty of Pharmaceutical Sciences': <VaccinesIcon />,
	'Faculty of Political Science': <PublicIcon />,
	'Faculty of Psychology': <PsychologyIcon />,
	'Faculty of Science': <BiotechIcon />,
	'Faculty of Sports Science': <SportsTennisIcon />,
	'Faculty of Veterinary Science': <PetsIcon />,
	'Full Scholarship': <CircleIcon />,
	'Partial Scholarship': <TripOriginIcon />,
	'Renewable Scholarship': <AutorenewIcon />,
	Fellowship: <CorporateFareIcon />,
	'High School': <HomeIcon />,
	Bachelor: <SchoolIcon />,
	Master: <MuseumIcon />,
	Doctoral: <StarIcon />,
}

const Tag = ({ text, color, icon }) => (
	<Typography
		sx={{
			pl: 1.25,
			pr: 2,
			py: 0.5,
			display: 'flex',
			color: 'white',
			backgroundColor: color,
			borderRadius: 5,
			margin: 0.5,
			display: 'flex',
			gap: 0.5,
		}}
	>
		{icon}
		{text}
	</Typography>
)

const ScholarshipTags = ({ scholar }) => (
	<Grid container paddingX={2} paddingY={2} direction="row" alignItems="center">
		<Tag
			word-wrap="break-word"
			text={scholar.typeOfScholarship}
			color={tagColors[scholar.typeOfScholarship] || 'text.primary'}
			icon={tagIcons[scholar.typeOfScholarship] || <TagIcon />}
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
			icon={tagIcons[scholar.degree] || <TagIcon />}
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
			icon={tagIcons[scholar.program] || <TagIcon />}
		/>
	</Grid>
)

export default ScholarshipTags
