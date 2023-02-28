import axios from 'axios'

axios.defaults.baseURL = `${process.env.NEXT_PUBLIC_BACKEND_URL}:${process.env.NEXT_PUBLIC_PORT}`
axios.defaults.withCredentials = true
axios.defaults.headers = { 'Content-Type': 'application/json' }

export default axios.create()

export const axiosPrivate = axios.create()
