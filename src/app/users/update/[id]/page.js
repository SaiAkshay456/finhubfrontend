'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import UpdateUserForm from '../../../../components/UpdateUserForm';
import { API_BASE, USER_MANAGE_ROUTES } from '@/helpers/apiRoutes';
import clientAxiosInstance from '@/lib/clientAxios';
export default function UpdateUserPage() {
    const { id } = useParams();
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        const fetchUserData = async () => {
            setLoading(true);
            setError(null);
            try {
                const res = await clientAxiosInstance.get(`${API_BASE}/${USER_MANAGE_ROUTES.GET_USER_DETAILS}/${id}`);
                if (res.data.success) {
                    setUserData(res.data);
                } else {
                    setError(res.data.message || 'Failed to fetch user details');
                }
            } catch (err) {
                console.error(err);
                setError('Failed to connect to the server.');
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchUserData();
        }
    }, [id]);
    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>
            </div>
        );
    }
    if (error) {
        return (
            <div className="text-red-500 p-4 text-center">
                Failed to fetch user details: {error}
            </div>
        );
    }
    return (
        <div className="max-w-3xl mx-auto p-6 rounded">
            {userData && <UpdateUserForm user={userData.user} />}
        </div>
    );
}
