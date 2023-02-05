import React from 'react'
import { Button, Radio, RadioGroup, FormControl, FormControlLabel, FormGroup, FormLabel, MenuItem, TextField} from '@mui/material'
import { Stack } from '@mui/system';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import dayjs from 'dayjs'

const genders = [
	{ value: 'Male', label: 'Male' },
	{ value: 'Female', label: 'Female' },
	{ value: 'Non-binary', label: 'Non-binary' },
]

const FormProviderStdInfo = () => {
	const [value, setValue] = React.useState(dayjs())
	return (

        <FormControl component="form" sx={{width:'100%'}}>
          
            <Stack spacing={3} direction="column">
              <TextField required id="outlined" label="Fisrtname" />
              <TextField required id="outlined" label="Surename"/>
              <TextField id="outlined" label="Citizen ID" />
              <LocalizationProvider dateAdapter= {AdapterDayjs}>
					<DatePicker
						disableFuture
						label="Date of Birth"
						openTo="year"
						views={['year', 'month', 'day']}
						value={value}
						onChange={(newValue) => {
							setValue(newValue)
						}}
						renderInput={(params) => <TextField {...params} />}
					/>
				</LocalizationProvider>
              
              <TextField select id="outlined" label="Gender">
                {genders.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
              <TextField id="outlined" label="GPAX" />
              <TextField id="outlined" label="Age" />
              <TextField id="outlined" label="Education" />
              <TextField id="outlined" label="Household income" />

              <FormLabel component="legend">Current employ</FormLabel>
              <RadioGroup row sx={{ m: 0, justifyContent: 'space-between'}}>
                <FormControlLabel value="yes" control={<Radio />} label="Yes"></FormControlLabel>
                <FormControlLabel value="no" control={<Radio />} label="No"></FormControlLabel>
                <Stack></Stack>
              </RadioGroup>

              <Button variant="contained" type="submit" sx={{backgroundColor:"#3F51A9"}}>SUBMIT</Button>
            </Stack>


        </FormControl>
		
	)
}

export default FormProviderStdInfo
