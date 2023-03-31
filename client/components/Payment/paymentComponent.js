import { React } from 'react'
import { grey,blue, red } from '@mui/material/colors'
import { Box, Button, Stack, Divider, Typography, Grid} from '@mui/material'


function PaymentComponent(props) {
    var scholarName = "Scholarship1"
	return (
        <Box sx={{ 
            width: '100%', 
            height: '25%', 
            margin: 2, 
            backgroundColor: '#e6edec',
            borderRadius: 5}}>
			<Grid container direction="row" justifyContent="space-between">
				<Grid sx={{
                    width: '60%'}}>
                    <Typography variant='h6' padding={2.5} marginLeft={2}>
					    {scholarName}
				    </Typography>
                </Grid>
                <Grid container direction = "column" justifyContent="space-between" sx={{
                    width: '30%',
                    padding: 2.5}}>
                    <Typography variant='body1' align='center'>
					    Next payment: 7 days
				    </Typography>
                    <Grid sx={{pl:'25%',pr:'25%',pt:'2%'}}>
                        <Button variant="contained" sx={{ borderRadius: 5, width: '100%'}}>
					        Subscribe
				        </Button>
                    </Grid>
                    <Typography variant='body1' align='center'>
					    99$ / month
				    </Typography>
                </Grid>
			</Grid>							
		</Box>
	)
}

export default PaymentComponent
