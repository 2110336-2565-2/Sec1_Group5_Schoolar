import { createTheme } from '@mui/material/styles'

const theme = createTheme({
	typography: {
		fontFamily: 'Barlow',
		h1: {
			fontFamily: 'Barlow',
			fontSize: '6rem',
			'@media (max-width:900px)': {
				fontSize: '3rem',
			},
			'@media (max-width:600px)': {
				fontSize: '2.5rem',
			},
		},
		h2: {
			fontFamily: 'Barlow',
			fontSize: '3.75rem',
			'@media (max-width:900px)': {
				fontSize: '3rem',
			},
			'@media (max-width:600px)': {
				fontSize: '2.5rem',
			},
		},
		h3: {
			fontFamily: 'Barlow',
			fontSize: '3rem',
			'@media (max-width:900px)': {
				fontSize: '2.5rem',
			},
			'@media (max-width:600px)': {
				fontSize: '2rem',
			},
		},
		h4: {
			fontFamily: 'Barlow',
			fontSize: '2.125rem',
			'@media (max-width:900px)': {
				fontSize: '2rem',
			},
			'@media (max-width:600px)': {
				fontSize: '1.5rem',
			},
		},
		button: {
			fontWeight: 'bold',
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
			secondary: '#0B3C6E',
		},
	},
})

export default theme
