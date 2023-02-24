import { createContext, useState } from 'react'

const SnackbarContext = createContext()

function SnackbarContextProvider({ children }) {
	const [snackbar, setSnackbar] = useState({
		open: false,
		text: '',
		severity: 'success',
	})
    
	const handleClose = (event, reason) => {
		if (reason === 'clickaway') {
			return
		}

		setSnackbar((prev) => ({ ...prev, open: false }))
	}
	return <SnackbarContext.Provider value={{ snackbar, setSnackbar, handleClose }}>{children}</SnackbarContext.Provider>
}

export { SnackbarContextProvider, SnackbarContext }
