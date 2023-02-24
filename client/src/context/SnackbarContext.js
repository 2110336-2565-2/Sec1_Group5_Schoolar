import { useContext } from 'react'
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

	return (
		<SnackbarContext.Provider value={{ snackbar, setSnackbar, handleClose }}>{children}</SnackbarContext.Provider>
	)
}

function useSnackbar() {
	const context = useContext(SnackbarContext)
	if (!context) {
		throw new Error('useSnackbar must be used within a AuthContextProvider')
	}
	return context
}
export { SnackbarContextProvider, useSnackbar }
