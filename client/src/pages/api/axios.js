import axios from 'axios'
const BASE_URL = 'http://localhost:8080'

export default axios.create({
	baseURL: BASE_URL,
	withCredentials: true,
})

export const axiosPrivate = axios.create({
	baseURL: BASE_URL,
	headers: { 'Content-Type': 'application/json' },
	withCredentials: true,
})
