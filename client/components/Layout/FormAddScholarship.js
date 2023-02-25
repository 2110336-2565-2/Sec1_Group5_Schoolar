import React from 'react'
import { Button, FormControl, Grid, Stack, TextField, MenuItem} from '@mui/material'

//Dropdown Menu
//Degree Dropdown
const degree = [
    {value:"Bachelor",label:"Bachelor",},
    {value:"Master",label:"Master",},
    {value:"Doctoral",label:"Doctoral",},
];
//Scholarship Type Dropdown
const scholarshipType = [
    {value:"Full Scholarship",label:"Full Scholarship",},
    {value:"Partial Scholarship",label:"Partial Scholarship",},
    {value:"Renewable Scholarship",label:"Renewable Scholarship",},
    {value:"Fellowship",label:"Fellowship",},
];
//Faculty Or Program Dropdown 
const facultyOrProgram = [
    {value:"Sci-Math",label:"Sci-Math",},
    {value:"Art-Cal",label:"Art-Cal",},
    {value:"Art-Language",label:"Art-Language",},
    {value:"Art-Society",label:"Art-Society",},
    {value:"Art-Society",label:"Art-Society",},
]

function FormEditScholarship(){
    return(
        <Stack>
            <FormControl component="form" sx={{ width: '100%' }}>
                <TextField required id="outlined-required" label="Scholarship Name" variant="outlined" sx={{ padding: '0px 0px 20px 0px' }}/>
                <TextField required id="outlined-required" label="Provider Name" variant="outlined" sx={{ padding: '0px 0px 20px 0px' }}/>
                <TextField id="outlined-multiline-static" label="Requirement" multiline row={4} variant="outlined" sx={{ padding: '0px 0px 20px 0px' }}/>
                <TextField id="outlined-multiline-static" label="Detail of Scholarship" multiline row={4} variant="outlined" sx={{ padding: '0px 0px 20px 0px' }}/>
                <TextField required id="outlined-required" label="Amount (Baht)" variant="outlined" sx={{ padding: '0px 0px 20px 0px' }}/>
                <TextField id="outlined-basic" label="Scholarship Quota" variant="outlined" sx={{ padding: '0px 0px 20px 0px' }}/>
                <TextField id="outlined-basic" label="GPAX" variant="outlined" sx={{ padding: '0px 0px 20px 0px' }}/>
                <TextField required id="outlined-select-currency" select label="Degree" helperText="Please select your degree" sx={{ padding: '0px 0px 20px 0px' }}>
                    {degree.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                        {option.label}
                        </MenuItem>
                    ))}
                </TextField>
                <TextField id="outlined-basic" label="Program/Faculty" variant="outlined" sx={{ padding: '0px 0px 20px 0px' }}/>
                <TextField required id="outlined-select-currency" select label="Type of Scholarship" helperText="Please select scholarship type" sx={{ padding: '0px 0px 20px 0px' }}>
                    {scholarshipType.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                        {option.label}
                        </MenuItem>
                    ))}
                </TextField>
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
                          Back
                    </Button>
                </Grid>
                <Grid item>
                    <Button variant="contained" type="submit">
                        Submit
                    </Button>
                </Grid>
            </Grid>
        </Stack>
    )
}

export default FormEditScholarship
