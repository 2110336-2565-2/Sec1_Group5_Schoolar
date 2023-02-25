import React,{useState} from 'react'
import { Button, FormControl, Grid, Stack, TextField, MenuItem} from '@mui/material'

//Dropdown Menu
//Degree Dropdown
const degree = [
    {value:"High School",label:"High School"},
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
//Program Dropdown 
const program = [
    {value:"Sci-Math",label:"Sci-Math",},
    {value:"Art-Cal",label:"Art-Cal",},
    {value:"Art-Language",label:"Art-Language",},
    {value:"Art-Society",label:"Art-Society",},
    {value:"Art-General",label:"Art-General",},
]
//Faculty Dropdown
const faculty = [
    {value:"Faculty of Allied Health Sciences",label:"Faculty of Allied Health Sciences"},
    {value:"Faculty of Architecture",label:"Faculty of Architecture"},
    {value:"Faculty of Arts",label:"Faculty of Arts"},
    {value:"Faculty of Commerce and Accountancy",label:"Faculty of Commerce and Accountancy"},
    {value:"Faculty of Communication Arts",label:"Faculty of Communication Arts"},
    {value:"Faculty of Dentistry",label:"Faculty of Dentistry"},
    {value:"Faculty of Economics",label:"Faculty of Economics"},
    {value:"Faculty of Education",label:"Faculty of Education"},
    {value:"Faculty of Fine and Applied Arts",label:"Faculty of Fine and Applied Arts"},
    {value:"Faculty of Law",label:"Faculty of Law"},
    {value:"Faculty of Medicine",label:"Faculty of Medicine"},
    {value:"Faculty of Nursing",label:"Faculty of Nursing"},
    {value:"Faculty of Pharmaceutical Sciences",label:"Faculty of Pharmaceutical Sciences"},
    {value:"Faculty of Political Science",label:"Faculty of Political Science"},
    {value:"Faculty of Psychology",label:"Faculty of Psychology"},
    {value:"Faculty of Science",label:"Faculty of Science"},
    {value:"Faculty of Sports Science",label:"Faculty of Sports Science"},
    {value:"Faculty of Veterinary Science",label:"Faculty of Veterinary Science"},
];

function FormEditScholarship(){
    return(
        <Stack>
            <FormControl component="form" sx={{ width: '100%' }}>
                <TextField required id="outlined-required" label="Scholarship Name" variant="outlined" sx={{ padding: '0px 0px 20px 0px'}}/>
                <TextField required id="outlined-required" label="Organization Name" variant="outlined" sx={{ padding: '0px 0px 0px 0px' }}/>
                <h3> Requirement </h3>
                <TextField id="outlined-basic" label="GPAX" variant="outlined" sx={{ padding: '0px 0px 20px 0px' }}/>
                <TextField required id="outlined-select-currency" select label="Degree" helperText="Please select your degree" sx={{ padding: '0px 0px 20px 0px' }}>
                    {degree.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                        {option.label}
                        </MenuItem>
                    ))}
                </TextField>
                <TextField required id="outlined-required" label="Target Nation" variant="outlined" sx={{ padding: '0px 0px 20px 0px' }}/>
                
                <TextField required id="outlined-select-currency" select label="Program/Faculty" helperText="Please select your program or faculty" sx={{ padding: '0px 0px 20px 0px' }}>
                    <optgroup label = "Program"></optgroup>
                    {program.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                        {option.label}
                        </MenuItem>
                    ))}
                    <optgroup label = "Faculty"></optgroup>
                    {faculty.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                        {option.label}
                        </MenuItem>
                    ))}
                </TextField>
                <TextField id="outlined-multiline-static" label="More Requirement" multiline row={4} variant="outlined" sx={{ padding: '0px 0px 0px 0px' }}/>
                <h3> Detail of scholarship </h3>
                <TextField required id="outlined-required" label="Amount (Baht)" variant="outlined" sx={{ padding: '0px 0px 20px 0px' }}/>
                <TextField id="outlined-basic" label="Scholarship Quota" variant="outlined" sx={{ padding: '0px 0px 20px 0px' }}/>
                <TextField id="outlined-basic" label="Field of Interest" variant="outlined" sx={{ padding: '0px 0px 20px 0px' }}/>
                <TextField required id="outlined-select-currency" select label="Type of Scholarship" helperText="Please select scholarship type" sx={{ padding: '0px 0px 20px 0px' }}>
                    {scholarshipType.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                        {option.label}
                        </MenuItem>
                    ))}
                </TextField>
                <TextField id="outlined-multiline-static" label="More Details" multiline row={4} variant="outlined" sx={{ padding: '0px 0px 20px 0px' }}/>
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
