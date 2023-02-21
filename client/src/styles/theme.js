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
			main: '#1172BC',
			// light: '#DADEEA',
		},
		// secondary: {
		// 	main: '#FDBA21',
		// 	light: '#EEEDE3',
		// },
	},
})

export default theme
