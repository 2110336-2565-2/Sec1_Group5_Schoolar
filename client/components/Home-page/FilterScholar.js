import { VStack } from '@components/common'
import FilterListIcon from '@mui/icons-material/FilterList'
import { MenuItem, Menu, ListSubheader } from '@mui/material'
import { useState } from 'react'
import { scholarshipTypes } from '@utils/StdInformation'

function FilterScholar(props) {
	// Handle Filter menu
	const [anchorEl, setAnchorEl] = useState(null)
	const open = Boolean(anchorEl)
	const handleClick = (event) => {
		setAnchorEl(event.currentTarget)
	}
	const handleClose = (e) => {
		props.filterHandler(e.target.innerText)
		setAnchorEl(null)
	}

	return (
		<VStack>
			<FilterListIcon
				id="FilterIcon"
				aria-controls={open ? 'FilterList' : undefined}
				aria-haspopup="true"
				aria-expanded={open ? 'true' : undefined}
				onClick={handleClick}
			/>
			<Menu
				id="FilterList"
				anchorEl={anchorEl}
				open={open}
				onClose={handleClose}
				anchorOrigin={{
					vertical: 'top',
					horizontal: 'left',
				}}
				transformOrigin={{
					vertical: 'top',
					horizontal: 'left',
				}}
			>
				<MenuItem onClick={handleClose}>All Scholarship</MenuItem>
				<ListSubheader>Type of Scholarship</ListSubheader>
				<MenuItem onClick={handleClose}>Full Scholarship</MenuItem>
				<MenuItem onClick={handleClose}>Partial Scholarship</MenuItem>
				<MenuItem onClick={handleClose}>Renewable Scholarship</MenuItem>
				<MenuItem onClick={handleClose}>Fellowship</MenuItem>
				<ListSubheader>Degree</ListSubheader>
				<MenuItem onClick={handleClose}>Degree</MenuItem>
				<ListSubheader>Faculty</ListSubheader>
				<MenuItem onClick={handleClose}>Faculty</MenuItem>
			</Menu>
		</VStack>
	)
}

export default FilterScholar
