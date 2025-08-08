import { cookies } from 'next/headers';
import axios from 'axios';

const serverAxios = axios.create({
    baseURL: 'https://finhub-backend.onrender.com',
    headers: {
        'Content-Type': 'application/json',
    },
});

export async function fetchWithAuth(url, options = {}) {
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;
    console.log(token, "Token from cookies");
    if (!token) {
        return { data: null, error: 'Unauthorized: No token provided' };
    }
    try {
        const response = await serverAxios({
            method: options.method || 'GET',
            url,
            headers: {
                'Authorization': `Bearer ${token}`,
                ...options.headers,
            },
            ...options,
        });
        return { data: response.data, error: null };
    } catch (error) {
        console.error('API call error:', error.response?.data);
        return { data: null, error: error.response?.data };
    }
}