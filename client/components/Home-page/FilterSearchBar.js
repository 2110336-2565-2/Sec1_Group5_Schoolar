import { MenuItem, InputLabel, Select, OutlinedInput, Chip, Box, ListItemText, Button,  Grid, } from '@mui/material'
import { Checkbox, FormControl } from '@mui/material'
import DoneIcon from '@mui/icons-material/Done';
import { useState } from 'react'

const MenuProps = {
	PaperProps: {
		style: {
			//maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
			//minWidth: 250,
			overflowY : 'unset'
		},
	},
}

function FilterSearchBar(props) {
	const [showSelect, setShowSelect] = useState(false);
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
		// <FormControl fullWidth = {true} sx={{ m: 1, Width: 300}}>
			<FormControl fullWidth = {true} sx = {{m:1 , minWidth : '100%'}}>

			<InputLabel>{props.label}</InputLabel>
			<Select
				multiple
				value={props.filters}
				open={showSelect}
        		onOpen={() => setShowSelect(true)}
        		onClose={() => setShowSelect(false)}
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
				<Grid container 
				justifyContent="center"
  				alignItems="center"
				>
					<Grid item>
						<Button fullWidth size="small" variant = "contained" color = "secondary" startIcon = {<DoneIcon/>} onClick={() => {
							setShowSelect(false);}}>					
							OK
						</Button>
					</Grid>
				</Grid>
				
				
			</Select>
			
		</FormControl>
	)
}

export default FilterSearchBar
