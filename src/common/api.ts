import axios from 'axios';

const api = axios.create({
    baseURL: process.env.REACT_APP_CLIENT_URL || 'localhost:3000'
});

export default api;