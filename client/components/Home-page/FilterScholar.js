import { useEffect, useState } from 'react'

import { FilterList as FilterListIcon, FilterListOff as FilterListOffIcon } from '@mui/icons-material'
import {
	Box,
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	FormGroup,
	IconButton,
	Tooltip,
} from '@mui/material'
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
	const [scholarshipFilters, setScholarshipFilters] = useState(
		localStorage.getItem('scholarshipFilters') ? JSON.parse(localStorage.scholarshipFilters) : [],
	)
	const [degreeFilters, setDegreeFilters] = useState(
		localStorage.getItem('degreeFilters') ? JSON.parse(localStorage.degreeFilters) : [],
	)
	const [facultyFilters, setFacultyFilters] = useState(
		localStorage.getItem('facultyFilters') ? JSON.parse(localStorage.facultyFilters) : [],
	)
	const [studentProgramFilters, setStudentProgramFilters] = useState(
		localStorage.getItem('studentProgramFilters') ? JSON.parse(localStorage.studentProgramFilters) : [],
	)

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

	useEffect(() => {
		localStorage.setItem('scholarshipFilters', JSON.stringify(scholarshipFilters))
		localStorage.setItem('degreeFilters', JSON.stringify(degreeFilters))
		localStorage.setItem('facultyFilters', JSON.stringify(facultyFilters))
		localStorage.setItem('studentProgramFilters', JSON.stringify(studentProgramFilters))
	}, [scholarshipFilters, degreeFilters, facultyFilters, studentProgramFilters])

	useEffect(() => {
		handleApplyFilters()
	}, [])

	const isFilterEmpty = () => {
		return !(
			scholarshipFilters.length ||
			degreeFilters.length ||
			facultyFilters.length ||
			studentProgramFilters.length
		)
	}

	return (
		<Box sx={{ p: 0.25 }}>
			<IconButton color="inherit" type="button" onClick={handleOpen}>
				<Tooltip title="Filter">
					{isFilterEmpty() ? (
						<FilterListOffIcon sx={{ fontSize: 30 }} />
					) : (
						<FilterListIcon color="primary" sx={{ fontSize: 30 }} />
					)}
				</Tooltip>
			</IconButton>
			<Dialog open={open} onClose={handleClose} disableEnforceFocus fullWidth maxWidth="xs">
				<DialogTitle fontWeight={'bold'}>Filters</DialogTitle>
				<Box
					component="form"
					sx={{
						display: 'flex',
						flexDirection: 'column',
						justifyContent: 'center',
						px: 3,
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
