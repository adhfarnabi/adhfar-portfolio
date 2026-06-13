
import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL + '/api'
})

export const getPortfolioData = () => api.get('/data')
export const getProjects = () => api.get('/data/projects')
export const getSkills = () => api.get('/data/skills')
export const sendContact = (data) => api.post('/contact', data)

export default api