import axios from 'axios'

const api = axios.create({ baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000' })

export const fetchPanchayats = () => api.get('/panchayats').then(r=>r.data)
export const fetchFunds = () => api.get('/funds').then(r=>r.data)
export const fetchComplaints = () => api.get('/complaints').then(r=>r.data)
export const postComplaint = (data) => api.post('/complaints', data).then(r=>r.data)
export const fetchAnalysis = (params) => api.get('/analysis', { params }).then(r=>r.data)

export default api
