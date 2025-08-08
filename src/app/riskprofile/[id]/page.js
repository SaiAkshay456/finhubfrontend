// import AssignRiskCategory from '../../../components/AssignRiskCategory';
// import { API_BASE } from '@/helpers/apiRoutes';
// import { RISK_ROUTES } from '@/helpers/apiRoutes';
// import clientAxiosInstance from '@/lib/clientAxios';

// export async function getResponsesForUsers(id, loading) {

//     try {
//         loading = true;
//         const { data } = await clientAxiosInstance.get(`${API_BASE}/${RISK_ROUTES.USER_RESPONSE}/${id}`, {
//             headers: {
//                 'Content-Type': 'application/json',
//                 // 'Authorization': `Bearer ${token}` // Uncomment if using token-based auth
//             }

//         });
//         const dataRes = data.data;
//         return dataRes || null;
//     } catch (err) {
//         console.error(err);
//         return null;
//     } finally {
//         loading = false
//     }
// }

// export default async function RiskProfileOfUser({ params }) {
//     let loading = false
//     const responses = await getResponsesForUsers(params.id, loading);
//     const cookieStore = cookies();
//     const token = cookieStore.get('token')?.value;
//     if (loading) {
//         <div className="flex items-center justify-center h-screen">
//             <div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>
//         </div>
//     }

//     return (
//         <div className="min-h-screen">
//             <div className="p-6 max-w-7xl mx-auto">
//                 {/* Header Section */}
//                 <div className="bg-white rounded-lg shadow border border-gray-200 p-6 mb-6">
//                     <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
//                         <div>
//                             <h1 className="text-2xl font-bold text-gray-900">Risk Profile Analysis</h1>
//                             <p className="text-gray-600 mt-1">Detailed assessment results for user</p>

//                             <div className="flex flex-wrap gap-3 mt-4">
//                                 <div className="flex items-center gap-2 px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm">
//                                     <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
//                                         <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path>
//                                     </svg>
//                                     <span>User ID: {params.id}</span>
//                                 </div>
//                                 <div className="flex items-center gap-2 px-3 py-1 bg-green-50 text-green-700 rounded-full text-sm">
//                                     <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
//                                         <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd"></path>
//                                     </svg>
//                                     <span>{responses?.length || 0} assessment{responses?.length !== 1 ? 's' : ''}</span>
//                                 </div>
//                             </div>
//                         </div>

//                         <div className="flex gap-3">
//                             <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2">
//                                 <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
//                                 </svg>
//                                 Export
//                             </button>
//                             <button className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-[#00d09c] to-[#00b98b] transition-colors flex items-center gap-2">
//                                 <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
//                                 </svg>
//                                 New Assessment
//                             </button>
//                         </div>
//                     </div>
//                 </div>

//                 {!responses || responses.length === 0 ? (
//                     <div className="bg-white rounded-lg shadow border border-gray-200 p-8 text-center">
//                         <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
//                             <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
//                             </svg>
//                         </div>
//                         <h3 className="text-lg font-semibold text-gray-900 mb-2">No assessments found</h3>
//                         <p className="text-gray-500 mb-6">This user not completed any risk profile assessments yet.</p>
//                         <button className="px-5 py-2.5 bg-gradient-to-r from-[#00d09c] to-[#00b98b] text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
//                             Request Assessment
//                         </button>
//                     </div>
//                 ) : (
//                     <div className="space-y-5">
//                         {responses.map((response, idx) => (
//                             <div key={idx} className="bg-white rounded-lg shadow border border-gray-200 overflow-hidden">
//                                 <div className="bg-gradient-to-r from-[#00d09c] to-[#00b98b] px-6 py-4 flex items-center justify-between">
//                                     <div className="flex items-center gap-4">
//                                         <div className="bg-white/20 p-2 rounded-lg">
//                                             <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
//                                             </svg>
//                                         </div>
//                                         <div>
//                                             <h2 className="text-lg font-semibold text-white">{response.title}</h2>
//                                             <div className="flex flex-col text-white text-sm mt-1 space-y-1">
//                                                 <div className="flex items-center gap-2">
//                                                     <span>Completed: {new Date(response.createdAt || Date.now()).toLocaleString()}</span>
//                                                     <span>•</span>
//                                                     <span>{response.answers.length} questions</span>
//                                                 </div>
//                                                 <div className="flex items-center gap-2 text-white">
//                                                     <span>Created: {new Date(response.createdAt).toLocaleString()}</span>
//                                                     <span>•</span>
//                                                     <span>Updated: {new Date(response.updatedAt).toLocaleString()}</span>
//                                                 </div>
//                                             </div>

//                                         </div>
//                                     </div>
//                                     <button className="text-white/80 hover:text-white transition-colors">
//                                         <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"></path>
//                                         </svg>
//                                     </button>
//                                 </div>

//                                 <div className="divide-y divide-gray-100">
//                                     {response.answers.map((answerObj, index) => {
//                                         const [question, option] = Object.entries(answerObj)[0];
//                                         return (
//                                             <div key={index} className="px-6 py-4 hover:bg-gray-50 transition-colors">
//                                                 <div className="flex items-start gap-4">
//                                                     <div className="flex-shrink-0 mt-1">
//                                                         <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-blue-800 font-medium text-xs">
//                                                             {index + 1}
//                                                         </div>
//                                                     </div>
//                                                     <div className="flex-1">
//                                                         <h3 className="text-sm font-medium text-gray-500 mb-1">{question}</h3>
//                                                         <p className="text-gray-800">{option}</p>
//                                                     </div>
//                                                 </div>
//                                             </div>
//                                         );
//                                     })}
//                                 </div>
//                             </div>
//                         ))}

//                         {/* Risk Category Assignment */}
//                         <div className="bg-white rounded-lg shadow border border-gray-200 p-6">
//                             <div className="flex items-center gap-4 mb-5">
//                                 <div className="bg-green-100 p-2.5 rounded-lg">
//                                     <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
//                                     </svg>
//                                 </div>
//                                 <div>
//                                     <h3 className="text-lg font-semibold text-gray-900">Final Risk Assessment</h3>
//                                     <p className="text-gray-600 text-sm">Assign a risk category based on the responses</p>
//                                 </div>
//                             </div>
//                             <AssignRiskCategory userId={params.id} />
//                         </div>
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// }

'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import AssignRiskCategory from '../../../components/AssignRiskCategory';
import { API_BASE, RISK_ROUTES } from '@/helpers/apiRoutes';
import clientAxiosInstance from '@/lib/clientAxios';
export default function RiskProfileOfUser({ params }) {
    const [responses, setResponses] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const router = useRouter();

    // The logic to fetch responses has been moved into a useEffect hook
    useEffect(() => {
        const fetchResponses = async () => {
            setLoading(true);
            try {
                // Use the client-side axios instance to make the API call
                const { data } = await clientAxiosInstance.get(`${API_BASE}/${RISK_ROUTES.USER_RESPONSE}/${params.id}`);

                if (data.success) {
                    setResponses(data.data || []);
                } else {
                    setError(data.message || 'Failed to fetch user responses.');
                }
            } catch (err) {
                console.error('Error fetching responses:', err);
                setError('Failed to connect to server or fetch data.');
                // Redirect to login if a 401 Unauthorized error occurs
                if (err.response?.status === 401) {
                    router.push('/login');
                }
            } finally {
                setLoading(false);
            }
        };

        if (params.id) {
            fetchResponses();
        }
    }, [params.id, router]);

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center py-20">
                <p className="text-red-500 font-medium">Error: {error}</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen">
            <div className="p-6 max-w-7xl mx-auto">
                {/* Header Section */}
                <div className="bg-white rounded-lg shadow border border-gray-200 p-6 mb-6">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">Risk Profile Analysis</h1>
                            <p className="text-gray-600 mt-1">Detailed assessment results for user</p>
                            <div className="flex flex-wrap gap-3 mt-4">
                                <div className="flex items-center gap-2 px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm">
                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path>
                                    </svg>
                                    <span>User ID: {params.id}</span>
                                </div>
                                <div className="flex items-center gap-2 px-3 py-1 bg-green-50 text-green-700 rounded-full text-sm">
                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd"></path>
                                    </svg>
                                    <span>{responses?.length || 0} assessment{responses?.length !== 1 ? 's' : ''}</span>
                                </div>
                            </div>
                        </div>
                        <div className="flex gap-3">
                            <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
                                </svg>
                                Export
                            </button>
                            <button className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-[#00d09c] to-[#00b98b] transition-colors flex items-center gap-2">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                                </svg>
                                New Assessment
                            </button>
                        </div>
                    </div>
                </div>
                {!responses || responses.length === 0 ? (
                    <div className="bg-white rounded-lg shadow border border-gray-200 p-8 text-center">
                        <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                            </svg>
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">No assessments found</h3>
                        <p className="text-gray-500 mb-6">This user not completed any risk profile assessments yet.</p>
                        <button className="px-5 py-2.5 bg-gradient-to-r from-[#00d09c] to-[#00b98b] text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
                            Request Assessment
                        </button>
                    </div>
                ) : (
                    <div className="space-y-5">
                        {responses.map((response, idx) => (
                            <div key={idx} className="bg-white rounded-lg shadow border border-gray-200 overflow-hidden">
                                <div className="bg-gradient-to-r from-[#00d09c] to-[#00b98b] px-6 py-4 flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <div className="bg-white/20 p-2 rounded-lg">
                                            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                            </svg>
                                        </div>
                                        <div>
                                            <h2 className="text-lg font-semibold text-white">{response.title}</h2>
                                            <div className="flex flex-col text-white text-sm mt-1 space-y-1">
                                                <div className="flex items-center gap-2">
                                                    <span>Completed: {new Date(response.createdAt || Date.now()).toLocaleString()}</span>
                                                    <span>•</span>
                                                    <span>{response.answers.length} questions</span>
                                                </div>
                                                <div className="flex items-center gap-2 text-white">
                                                    <span>Created: {new Date(response.createdAt).toLocaleString()}</span>
                                                    <span>•</span>
                                                    <span>Updated: {new Date(response.updatedAt).toLocaleString()}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <button className="text-white/80 hover:text-white transition-colors">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"></path>
                                        </svg>
                                    </button>
                                </div>

                                <div className="divide-y divide-gray-100">
                                    {response.answers.map((answerObj, index) => {
                                        const [question, option] = Object.entries(answerObj)[0];
                                        return (
                                            <div key={index} className="px-6 py-4 hover:bg-gray-50 transition-colors">
                                                <div className="flex items-start gap-4">
                                                    <div className="flex-shrink-0 mt-1">
                                                        <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-blue-800 font-medium text-xs">
                                                            {index + 1}
                                                        </div>
                                                    </div>
                                                    <div className="flex-1">
                                                        <h3 className="text-sm font-medium text-gray-500 mb-1">{question}</h3>
                                                        <p className="text-gray-800">{option}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        ))}
                        <div className="bg-white rounded-lg shadow border border-gray-200 p-6">
                            <div className="flex items-center gap-4 mb-5">
                                <div className="bg-green-100 p-2.5 rounded-lg">
                                    <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900">Final Risk Assessment</h3>
                                    <p className="text-gray-600 text-sm">Assign a risk category based on the responses</p>
                                </div>
                            </div>
                            <AssignRiskCategory userId={params.id} />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
