import { Stack, Typography } from '@mui/material'
import { Box } from '@mui/system'
import Image from 'next/image'

const FormSecondary = ({ header, form }) => {
	return (
		<Stack sx={{width: { xs: "85%", sm: "65%" }}} alignItems="center" justifyContent="flex-start">
            <Box sx={{
                width: { xs: "100%", sm: "80%", md:"65%" },
                mt: 4}}>
            <Image
					src="/primary/slogan.png"
					alt="Schoolar Logo"
					width={0}
					height={0}
					sizes="100vw"
					priority="false"
					style={{
						width: '100%',
						height: 'auto',
					}}
            />  
            </Box>
            <Box 
                sx={{
					width: '100%',
					borderRadius: 5,
					backgroundColor: 'primary.light',
					boxShadow: 12,
					px: { xs: 2, sm: 4, md: 6 },
					pt: { xs: 2, md: 3 },
					pb: { xs: 3, md: 5 },
					mx: { xs: 2, sm: 3, md: 4 },
					mt: { xs: 4, sm: 3 },
					mb: 3,
				}}>
                <Typography variant="h3"
					sx={{
						textAlign: 'center',
						fontWeight: 'bold',
						mb: { xs: 2, md: 3 },
						fontSize: { xs: 32, sm: 36, md: 40 },
					}}>{header}</Typography>
                
                {form}
            </Box>
        </Stack>
	)
}

export default FormSecondary
