import { MenuItem, InputLabel, Select, OutlinedInput, Chip, Box, ListItemText } from '@mui/material'
import { Checkbox, FormControl } from '@mui/material'
import { useState } from 'react'
const MenuProps = {
	PaperProps: {
		style: {
			//maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
			width: 250,
		},
	},
}
function FilterSearchBar(props) {
	const handleChange = (event) => {
		const {
			target: { value },
		} = event
		props.setFilters(
			// On autofill we get a stringified value.
			typeof value === 'string' ? value.split(',') : value,
		)
	}
	return (
		<FormControl sx={{ m: 1, width: 300 }}>
			<InputLabel>{props.label}</InputLabel>
			<Select
				multiple
				value={props.filters}
				onChange={handleChange}
				input={<OutlinedInput label="Tag" />}
				renderValue={(selected) => (
					<Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
						{selected.map((value) => (
							<Chip key={value} label={value} />
						))}
					</Box>
				)}
				MenuProps={MenuProps}
			>
				{props.item.map((val) => (
					<MenuItem key={val.value} value={val.value}>
						<Checkbox checked={props.filters.indexOf(val.value) > -1} />
						<ListItemText primary={val.value} />
					</MenuItem>
				))}
			</Select>
		</FormControl>
	)
}

export default FilterSearchBar
