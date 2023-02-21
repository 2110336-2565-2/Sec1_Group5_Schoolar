import { Typography } from '@mui/material'
import { Box } from '@mui/system'
// import Image from 'mui-image'
const FormPrimary = ({ header, form }) => {
	return (
		<Box>
			<Box sx={{ overflowY: 'auto', overflowX: 'hidden', maxHeight: '80vh', py: 1 }}>
				<Typography variant="h3" sx={{ textAlign: 'center', fontWeight: 'bold', mb: '20px' }}>
					{header}
				</Typography>
				{form}
			</Box>
		</Box>
	)
}

export default FormPrimary
