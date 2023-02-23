import { useState } from 'react'
import { scholarshipTypes, uniPrograms, studentPrograms, degrees } from '@utils/formOptUtils'
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, FormGroup } from '@material-ui/core'
import { FilterList as FilterListIcon } from '@mui/icons-material'
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

	const handleOpen = () => {
		setOpen(true)
	}

	const handleClose = () => {
		setOpen(false)
	}

	const handleApplyFilters = () => {
		console.log(scholarshipFilters)
		console.log(degreeFilters)
		console.log(facultyFilters)
		console.log(studentProgramFilters)
		handleClose()
	}
	return (
		<div>
			<Button color="inherit" onClick={handleOpen}>
				<FilterListIcon />
			</Button>
			<Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
				<DialogTitle>Filters</DialogTitle>
				<DialogContent>
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
				</DialogContent>

				<DialogActions>
					<Button onClick={handleClose} color="primary">
						Cancel
					</Button>
					<Button onClick={handleApplyFilters} color="primary">
						Apply
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	)
}

export default FilterScholar
