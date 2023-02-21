import { Box } from '@mui/system'

const FormPrimary = ({ form }) => {
	return (
		<Box
			sx={{
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				height: '100%',
			}}
		>
			<Box
				sx={{
					width: 500,
					borderRadius: 5,
					backgroundColor: '#FFF',
					boxShadow: 12,
					p: 4,
					m: 4,
				}}
			>
				{form}
			</Box>
		</Box>
	)
}

export default FormPrimary
