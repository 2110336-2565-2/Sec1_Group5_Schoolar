import { useAuth } from '@/context/AuthContext'

import { axios } from '../pages/api/axios'

const useRefreshToken = () => {
	const { setAuth } = useAuth()

	const refresh = async () => {
		const response = await axios.get('/auth/refresh-token', {
			withCredentials: true,
		})

		const { accessToken } = response.data

		setAuth((prev) => {
			return { ...prev, accessToken: accessToken }
		})
		return accessToken
	}
	return refresh
}

export default useRefreshToken
