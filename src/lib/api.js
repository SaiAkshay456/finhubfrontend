import { cookies } from 'next/headers';
import axios from 'axios';

const baseURL = "https://finhub-backend.onrender.com";
const headers = { 'Content-Type': 'application/json' };

const serverAxios = axios.create({
    baseURL,
    headers,
});

const clientAxios = axios.create({
    baseURL,
    withCredentials: true,
    headers,
});

// A reusable function for making authenticated calls from a Server Component.
export async function fetchWithAuth(url, options = {}) {
    const cookieStore = cookies();
    const token = cookieStore.get('token')?.value;

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

// Export the client-side instance as the default export for easy import.
export default clientAxios;
