import { createContext, useContext, useEffect, useState } from 'react'
import jwtDecode from 'jwt-decode'
import { useRouter } from 'next/router'

import axios from '../pages/api/axios'

const AuthContext = createContext()
AuthContext.displayName = 'AuthContext'

function AuthContextProvider({ children }) {
	const [auth, setAuth] = useState(null) //{username, role, accessToken}
	const router = useRouter()

	console.log(auth)

	// useEffect(() => {
	// 	if (!auth) {
	// 		axios
	// 			.get('/auth/refresh-token', {
	// 				withCredentials: true,
	// 			})
	// 			.then(({ data }) => {
	// 				const { accessToken, role } = data
	// 				const decodedToken = jwtDecode(accessToken)
	// 				const user = decodedToken.UserInfo
	// 				setAuth({ username: user.username, role: role, accessToken: accessToken })
	// 			})
	// 			.catch(function (error) {
	// 				if (error.response.status === 401) {
	// 					router.push('/login')
	// 				}
	// 			})
	// 	}
	// }, [])

	return <AuthContext.Provider value={{ auth, setAuth }}>{children}</AuthContext.Provider>
}

function useAuth() {
	const context = useContext(AuthContext)
	if (!context) {
		throw new Error('useAuth must be used within a AuthContextProvider')
	}
	return context
}

export { AuthContextProvider, useAuth }
