import axios from 'axios';
const clientAxiosInstance = axios.create({
    baseURL: 'https://finhub-backend.onrender.com',
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    }
});

export default clientAxiosInstance;