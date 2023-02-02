import { createContext } from 'react'
import { getCookie } from 'cookies-next'
import axios from 'axios'

export const AuthContext = createContext()

export function AuthContextProvider({ children }) {
	const [user, setUser] = useState(null) // {username: "", role: ""}

	function getToken() {
		const jwt = getCookie('jwt')
		if (jwt) {
			return jwt
		} else {
			return false
		}
	}

	useEffect(() => {
		if (!user) {
			axios.get('/profile').then(({ data }) => {
				setUser(data)
			})
		}
	}, [])
	return (
		<AuthContext.Provider value={{ user, setUser, getToken }}>{children}</AuthContext.Provider>
	)
}
