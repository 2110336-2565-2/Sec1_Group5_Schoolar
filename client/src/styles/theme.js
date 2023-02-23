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
			main: '#036EC5',
			light: '#FFFFFF',
		},
		secondary: {
			main: '#FDBA21',
			light: '#EEEDE3',
		},
		text: {
			primary: '#404040',
			secondary: '#0B3C6E'
		}
	},
})

export default theme
