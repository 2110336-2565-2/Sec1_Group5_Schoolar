import { createContext, useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { getCookie } from 'cookies-next'

const AuthContext = createContext()

function AuthContextProvider({ children }) {
	const [user, setUser] = useState(null) // {username: "", role: ""}

	function getToken() {
		const jwt = getCookie('jwt')
		if (jwt) {
			return jwt
		} else {
			return false
		}
	}
	// comment for now becuase prevent error
	// useEffect(() => {
	// 	if (!user) {
	// 		axios.get('/profile').then(({ data }) => {
	// 			setUser(data)
	// 		})
	// 	}
	// }, [])
	return (
		<AuthContext.Provider value={{ user, setUser, getToken }}>{children}</AuthContext.Provider>
	)
}

function useAuth() {
	const context = useContext(AuthContext)
	if (!context) {
		throw new Error('useAuth must be used within a AuthContextProvider')
	}
	return context
}

export { AuthContextProvider, useAuth }
