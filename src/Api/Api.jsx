import axios from 'axios'

const apiAxios = axios.create({
  baseURL: import.meta.env.VITE_BASE,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

export default apiAxios