import { createContext, useState } from 'react'

const SnackbarContext = createContext()

function SnackbarContextProvider({ children }) {
	const [open, setOpen] = useState(false)
	const [text, setText] = useState('')

	const handleClose = (event, reason) => {
		if (reason === 'clickaway') {
			return
		}

		setOpenS(false)
	}
	return (
		<SnackbarContext.Provider value={{ open, setOpen, handleClose, text, setText }}>
			{children}
		</SnackbarContext.Provider>
	)
}

export { SnackbarContextProvider, SnackbarContext }
