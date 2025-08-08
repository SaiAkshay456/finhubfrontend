// import { cookies } from 'next/headers';
// import UpdateQuestionnaireForm from './UpdateForm';
// import axiosInstance from '@/helpers/axios';
// import { API_BASE, RISK_ROUTES } from '@/helpers/apiRoutes';
// // import QuestionnaireEditClient from './QuestionnaireEditClient';
// // import { notFound } from 'next/navigation';

// export default async function EditPage({ params }) {
//     const { id } = params;
//     const cookieStore = await cookies();
//     const token = cookieStore.get('token')?.value;
//     let data = null
//     let error = null;
//     let loading = false
//     try {
//         loading = true
//         const res = await axiosInstance.get(`${API_BASE}/${RISK_ROUTES.GET_QUESTIONNARIE_OF_USER}/${id}`, {
//             headers: { Authorization: `Bearer ${token}` },
//         });
//         data = res.data;
//         console.log(data); // Safe to log
//     } catch (err) {
//         if (axios.isAxiosError(err)) {
//             if (err.response?.status === 401) {
//                 setError(err.response.data.message || 'Unauthorized access.');
//             } else {
//                 setError('Server error. Try again later.');
//             }
//         } else {
//             setError('Unknown error. Please try again.');
//         }
//     } finally {
//         loading = false
//     }
//     if (loading) {
//         <div className="flex items-center justify-center h-screen">
//             <div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>
//         </div>
//     }
//     console.log(error)
//     console.log(data)
//     console.log(data.questions)//once clg and see
//     const questionnaire = data.questions
//     return (
//         <UpdateQuestionnaireForm questionnaire={questionnaire} />
//     );
// }


'use client';

import React, { useState, useEffect } from 'react';
import UpdateQuestionnaireForm from './UpdateForm';
import { useRouter } from 'next/navigation';
import axios from 'axios'; // Import axios directly for error checking
import clientAxiosInstance from '@/lib/clientAxios'; // Use the client-side Axios instance
import { API_BASE, RISK_ROUTES } from '@/helpers/apiRoutes';

export default function EditPage({ params }) {
    const { id } = params;
    const router = useRouter();
    const [questionnaire, setQuestionnaire] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // The logic to fetch data has been moved into a useEffect hook
    useEffect(() => {
        const fetchQuestionnaire = async () => {
            setLoading(true);
            try {
                // Use the client-side axios instance to make the API call.
                // The browser will automatically handle sending the cookie.
                const res = await clientAxiosInstance.get(`${API_BASE}/${RISK_ROUTES.GET_QUESTIONNARIE_OF_USER}/${id}`);

                if (res.data && res.data.success) {
                    setQuestionnaire(res.data.questions);
                    setError(null);
                } else {
                    setError(res.data?.message || 'Failed to fetch questionnaire data.');
                }
            } catch (err) {
                console.error(err);
                if (axios.isAxiosError(err)) {
                    if (err.response?.status === 401) {
                        // Redirect to login if unauthorized
                        router.push('/login');
                    } else {
                        setError(err.response?.data?.message || 'Server error. Try again later.');
                    }
                } else {
                    setError('Unknown error. Please try again.');
                }
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchQuestionnaire();
        }
    }, [id, router]);

    // Render loading state while data is being fetched
    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>
            </div>
        );
    }

    // Render error message if an error occurred
    if (error) {
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="text-center p-8 bg-white rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">Error</h2>
                    <p className="text-red-600">{error}</p>
                </div>
            </div>
        );
    }

    // Render the form once data is available
    if (!questionnaire) {
        // Handle case where data is empty
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="text-center p-8 bg-white rounded-lg shadow-md">
                    <p className="text-gray-600">No questionnaire data found.</p>
                </div>
            </div>
        );
    }

    return (
        <UpdateQuestionnaireForm questionnaire={questionnaire} />
    );
}

