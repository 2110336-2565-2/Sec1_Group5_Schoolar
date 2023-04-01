import { createTheme } from '@mui/material/styles'

const theme = createTheme({
	typography: {
		fontFamily: 'Barlow',
		h1: {
			fontSize: '6rem',
			'@media (max-width:900px)': {
				fontSize: '3rem',
			},
			'@media (max-width:600px)': {
				fontSize: '2.5rem',
			},
		},
		h2: {
			fontSize: '3.75rem',
			'@media (max-width:900px)': {
				fontSize: '3rem',
			},
			'@media (max-width:600px)': {
				fontSize: '2.5rem',
			},
		},
		h3: {
			fontSize: '3rem',
			'@media (max-width:900px)': {
				fontSize: '2.5rem',
			},
			'@media (max-width:600px)': {
				fontSize: '2rem',
			},
		},
		h4: {
			fontSize: '2.125rem',
			'@media (max-width:900px)': {
				fontSize: '2rem',
			},
			'@media (max-width:600px)': {
				fontSize: '1.5rem',
			},
		},
		h5: {
			fontSize: '1.5rem',
			'@media (max-width:900px)': {
				fontSize: '1.25rem',
			},
			'@media (max-width:600px)': {
				fontSize: '1rem',
			},
		},
		h6: {
			fontSize: '1.25rem',
			'@media (max-width:900px)': {
				fontSize: '1rem',
			},
			'@media (max-width:600px)': {
				fontSize: '0.875rem',
			},
		},
		h7: {
			fontSize: '1rem',
			'@media (max-width:900px)': {
				fontSize: '0.875rem',
			},
			'@media (max-width:600px)': {
				fontSize: '0.75rem',
			},
		},
		body1: {
			fontSize: '1rem',
		},
		body2: {
			fontSize: '0.75rem',
		},
		button: {
			fontWeight: 'bold',
			textTransform: 'none',
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
		danger: {
			main: '#DA0000'
		},
		text: {
			primary: '#404040',
			secondary: '#404040',
			main: '#0B3C6E',
		},
	},
})

export default theme
