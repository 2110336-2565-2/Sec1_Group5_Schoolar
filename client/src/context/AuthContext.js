import { createContext, useContext, useEffect, useState } from 'react'

const AuthContext = createContext()
AuthContext.displayName = 'AuthContext'


function AuthContextProvider({ value, children }) {
	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

function useAuth() {
	const context = useContext(AuthContext)
	if (!context) {
		throw new Error('useAuth must be used within a AuthContextProvider')
	}
	return context
}

export { AuthContextProvider, useAuth }
