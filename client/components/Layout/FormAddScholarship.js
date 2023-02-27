import React,{useState} from 'react'
import { useForm } from 'react-hook-form'
import { Button, FormControl, Grid, Stack, TextField, MenuItem} from '@mui/material'
import { SelectComponent, TextFieldComponent } from '@utils/formComponentUtils'

//Dropdown Menu
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
    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        getValues,
        control,
        watch,
        trigger,
    } = useForm({ mode: 'onBlur' })
    const formProps = { register, errors, getValues, setValue, control, watch }
    return(
        <Stack>
            <FormControl
                component="form"
                //onSubmit={handleSubmit(onSubmit)}
                sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '100%' }}
            >
               
                <TextFieldComponent name="scholarshipName" label="Scholarship Name" required={true} {...formProps} />
                <TextFieldComponent name="provider" label="Organization Name" required={true} {...formProps} />
                <h3> Requirement </h3>
                <TextFieldComponent name="gpax" label="GPAX" {...formProps} />
                <SelectComponent name="degree" {...formProps} />
                <TextFieldComponent name="targetNation" label="Scholarship Nation" required={true} {...formProps} />
                <SelectComponent name="program" {...formProps} />
                <TextField required id="outlined-select-currency" select label="Program/Faculty" helperText="Please select your program or faculty" sx={{ padding: '0px 0px 00px 0px' }}>
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
