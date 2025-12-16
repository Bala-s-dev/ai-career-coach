import axios from 'axios';

const api = axios.create({
    // In production, this uses your Render URL. In dev, it falls back to '/api' or localhost.
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5001/api',
    withCredentials: true // Crucial: ensures cookies (login sessions) are sent with requests
});

export default api;