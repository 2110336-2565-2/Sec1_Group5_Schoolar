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
		background: {
			default: '#DADEEA',
		},
		primary: {
			main: '#2C429B',
			light: '#DADEEA',
		},
		secondary: {
			main: '#FDBA21',
			light: '#EEEDE3',
		},
	},
})

export default theme
