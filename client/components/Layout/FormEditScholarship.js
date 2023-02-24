import React from 'react'
import { Button, FormControl, Grid, Stack, TextField} from '@mui/material'

function FormEditScholarship(){
    return(
        <Stack>
            <FormControl component="form" sx={{ width: '100%' }}>
                <TextField id="outlined-basic" label="Scholarship Name" variant="outlined" sx={{ padding: '0px 0px 20px 0px' }}/>
                <TextField id="outlined-basic" label="Provider Name" variant="outlined" sx={{ padding: '0px 0px 20px 0px' }}/>
                <TextField id="outlined-basic" label="Scholarship Quota" variant="outlined" sx={{ padding: '0px 0px 20px 0px' }}/>
                <TextField id="outlined-basic" label="Amount (Baht)" variant="outlined" sx={{ padding: '0px 0px 20px 0px' }}/>
                <TextField id="outlined-basic" label="Detail of Scholarship" variant="outlined" sx={{ padding: '0px 0px 20px 0px' }}/>
                <TextField id="outlined-basic" label="GPAX" variant="outlined" sx={{ padding: '0px 0px 20px 0px' }}/>
                <TextField id="outlined-basic" label="Degree" variant="outlined" sx={{ padding: '0px 0px 20px 0px' }}/>
                <TextField id="outlined-basic" label="Program/Faculty" variant="outlined" sx={{ padding: '0px 0px 20px 0px' }}/>
                <TextField id="outlined-basic" label="Target Nation" variant="outlined" sx={{ padding: '0px 0px 20px 0px' }}/>
                <TextField id="outlined-basic" label="Field of interest" variant="outlined" sx={{ padding: '0px 0px 20px 0px' }}/>
                <TextField id="outlined-basic" label="Type of Scholarship" variant="outlined" sx={{ padding: '0px 0px 20px 0px' }}/>
                <TextField id="outlined-basic" label="Application Deadline" variant="outlined" sx={{ padding: '0px 0px 20px 0px' }}/>
            </FormControl>
            <Grid
                container
                rowSpacing={2}
                alignItems="stretch"
                justifyContent="space-evenly"
                sx={{ padding: '20px 0px 20px 20px' }}
            >
                <Grid item>
                    <Button variant="contained" type="submit">
                        Cancel
                    </Button>
                </Grid>
                <Grid item>
                    <Button variant="contained" type="submit">
                        Update
                    </Button>
                </Grid>
            </Grid>
        </Stack>
    )
}

export default FormEditScholarship
