import { useState } from 'react'

import { FilterList as FilterListIcon } from '@mui/icons-material'
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, FormGroup, IconButton } from '@mui/material'
import { degrees, scholarshipTypes, studentPrograms, uniPrograms } from '@utils/formOptUtils'

import FilterSearchBar from './FilterSearchBar'

function getStyles(name, ssTypes, theme) {
	return {
		fontWeight:
			ssTypes.indexOf(name) === -1 ? theme.typography.fontWeightRegular : theme.typography.fontWeightMedium,
	}
}

function FilterScholar(props) {
	// Handle Filter menu
	const [open, setOpen] = useState(false)

	// set filters list
	const [scholarshipFilters, setScholarshipFilters] = useState([])
	const [degreeFilters, setDegreeFilters] = useState([])
	const [facultyFilters, setFacultyFilters] = useState([])
	const [studentProgramFilters, setStudentProgramFilters] = useState([])

	const handleReset = () => {
		setScholarshipFilters([])
		setDegreeFilters([])
		setFacultyFilters([])
		setStudentProgramFilters([])
	}

	const handleOpen = () => {
		setOpen(true)
	}

	const handleClose = () => {
		setOpen(false)
	}

	const handleApplyFilters = () => {
		props.filterHandler({
			scholarship: scholarshipFilters,
			degree: degreeFilters,
			faculty: facultyFilters,
			studentProgram: studentProgramFilters,
		})
		handleClose()
	}
	return (
		<Box sx={{ p: 0.25 }}>
			<IconButton color="inherit" type="button" onClick={handleOpen}>
				<FilterListIcon />
			</IconButton>
			<Dialog open={open} onClose={handleClose} disableEnforceFocus fullWidth maxWidth="xs">
				<DialogTitle>Filters</DialogTitle>
				<Box
					component="form"
					sx={{
						display: 'flex',
						flexDirection: 'column',
						justifyContent: 'center',
						px: 2,
						width: '100%',
					}}
				>
					<FormGroup>
						<FilterSearchBar
							item={scholarshipTypes}
							label={'Scholarship Type'}
							filters={scholarshipFilters}
							setFilters={setScholarshipFilters}
						/>
						<FilterSearchBar
							item={degrees}
							label={'Degree'}
							filters={degreeFilters}
							setFilters={setDegreeFilters}
						/>
						<FilterSearchBar
							item={uniPrograms}
							label={'Faculty'}
							filters={facultyFilters}
							setFilters={setFacultyFilters}
						/>
						<FilterSearchBar
							item={studentPrograms}
							label={'Student Program'}
							filters={studentProgramFilters}
							setFilters={setStudentProgramFilters}
						/>
					</FormGroup>

					<DialogActions>
						<Button onClick={handleReset} color="primary">
							Reset
						</Button>
						<Button onClick={handleClose} color="primary">
							Cancel
						</Button>
						<Button onClick={handleApplyFilters} color="primary">
							Apply
						</Button>
					</DialogActions>
				</Box>
			</Dialog>
		</Box>
	)
}

export default FilterScholar
