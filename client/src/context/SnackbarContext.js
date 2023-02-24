import { createContext, useState } from 'react'

const SnackbarContext = createContext()

function SnackbarContextProvider({ value, children }) {
	return <SnackbarContext.Provider value={value}>{children}</SnackbarContext.Provider>
}

export { SnackbarContextProvider, SnackbarContext }
