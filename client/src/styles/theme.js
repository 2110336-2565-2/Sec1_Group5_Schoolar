import { createTheme } from '@mui/material/styles'
const theme = createTheme({
	typography: {
		fontFamily: 'Barlow',
		h1: {
			fontFamily: 'Barlow',
		},
		h2: {
			fontFamily: 'Barlow',
		},
		h3: {
			fontFamily: 'Barlow',
		},
		h4: {
			fontFamily: 'Barlow',
		},
	},
	// change color theme here
	palette: {
		primary: {
			main: '#000',
		},
		secondary: {
			main: '#FFFFFF',
		},
	},
})

export default theme
