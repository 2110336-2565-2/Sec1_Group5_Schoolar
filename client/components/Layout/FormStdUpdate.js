import React from 'react'
import {
	Box,
	Button,
	Checkbox,
	FormControl,
	FormControlLabel,
	FormGroup,
	FormLabel,
	Grid,
	MenuItem,
	TextField,
} from '@mui/material'
import Container from '@mui/material/Container'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import dayjs from 'dayjs'

const genders = [
	{ value: 'Male', label: 'Male' },
	{ value: 'Female', label: 'Female' },
	{ value: 'Non-binary', label: 'Non-binary' },
]

const scholarshipTypes = [
	{ value: 'Full scholarship', label: 'Full Scholarship' },
	{ value: 'Partial scholarship', label: 'Partial Scholarship' },
	{ value: 'Renewable scholarship', label: 'Renewable Scholarship' },
	{ value: 'Followship', label: 'Followship' },
]

const FormUpdateStdInfo = () => {
	const [value, setValue] = React.useState(dayjs('2022-04-07'))
	return (
		<Box sx={{ display: 'flex', flexDirection: 'column', gap: '20px', width: '100%' }}>
			<FormControl
				fullWidth
				xs={12}
				sm={6}
				lg={4}
				sx={{
					display: 'flex',
					gap: '20px',
					width: '100%',
					height: '60vh',
				}}
			>
				<TextField
					id="outlined-start-adornment"
					defaultValue="Tontong"
					label="Firstname"
					variant="outlined"
				/>
				<TextField
					id="outlined-start-adornment"
					defaultValue="WoahWoah"
					label="Surname"
					variant="outlined"
				/>
				<TextField
					id="outlined-start-adornment"
					defaultValue="9999999"
					label="Citizen ID"
					variant="outlined"
				/>
				<LocalizationProvider dateAdapter={AdapterDayjs}>
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
				<TextField id="outlined-select-gender" select label="Gender" defaultValue="Female">
					{genders.map((option) => (
						<MenuItem key={option.value} value={option.value}>
							{option.label}
						</MenuItem>
					))}
				</TextField>
				<TextField
					id="outlined-start-adornment"
					defaultValue=""
					label="Faculty"
					variant="outlined"
				/>
				<TextField
					id="outlined-start-adornment"
					defaultValue=""
					label="Year"
					variant="outlined"
				/>
				<TextField
					id="outlined-start-adornment"
					defaultValue=""
					label="Phone Number"
					variant="outlined"
				/>
				<TextField
					id="outlined-start-adornment"
					defaultValue=""
					label="Email"
					variant="outlined"
				/>
				<TextField
					id="outlined-start-adornment"
					defaultValue=""
					label="GPAX"
					variant="outlined"
				/>
				<TextField
					id="outlined-start-adornment"
					defaultValue=""
					label="Age"
					variant="outlined"
				/>
				<TextField
					id="outlined-start-adornment"
					defaultValue=""
					label="Education"
					variant="outlined"
				/>
				<TextField
					id="outlined-start-adornment"
					defaultValue=""
					label="Household Income"
					variant="outlined"
				/>
				<FormLabel component="legend">Employment status</FormLabel>
				<FormGroup aria-label="position" row>
					<FormControlLabel
						value="end"
						control={<Checkbox />}
						label="Employed"
						labelPlacement="end"
					/>
					<FormControlLabel
						value="end"
						control={<Checkbox />}
						label="Unemployed"
						labelPlacement="end"
					/>
				</FormGroup>
				<TextField
					id="outlined-start-adornment"
					defaultValue=""
					label="Target Nation"
					variant="outlined"
				/>
				<TextField
					id="outlined-select-gender"
					select
					label="Type of scholarship"
					defaultValue="Full scholarship"
				>
					{scholarshipTypes.map((option) => (
						<MenuItem key={option.value} value={option.value}>
							{option.label}
						</MenuItem>
					))}
				</TextField>
				<TextField
					id="outlined-start-adornment"
					defaultValue=""
					label="Field of Interest"
					variant="outlined"
				/>
				<TextField
					id="outlined-start-adornment"
					defaultValue=""
					label="Enter New Password"
					variant="outlined"
				/>
                <TextField
					id="outlined-start-adornment"
					defaultValue=""
					label="Re-type New Password"
					variant="outlined"
				/>
			</FormControl>
		</Box>
	)
}

export default FormUpdateStdInfo
