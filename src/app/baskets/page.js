// import React from 'react';
// import BasketModalTrigger from '@/components/BasketModalTrigger';
// import ShowRecommendation from '@/components/ShowRecommendation';
// import { fetchWithAuth } from '@/lib/api';
// const BasketsTable = async () => {
//     let baskets = [];
//     try {
//         const { data, error } = await fetchWithAuth('/v1/model-basket/get-all/baskets', {
//             method: 'GET'
//         })
//         // const { data } = await axiosInstance.get(`/v1/model-basket/get-all/baskets`, {
//         //     headers: { Authorization: `Bearer ${token}` }
//         // });
//         baskets = data.data || [];
//     } catch (error) {
//         console.error('Error fetching baskets:', error.message);
//     }

//     // Function to get risk level color
//     const getRiskColor = (riskLevel) => {
//         switch (riskLevel?.toLowerCase()) {
//             case 'low': return 'bg-green-100 text-green-800';
//             case 'medium': return 'bg-yellow-100 text-yellow-800';
//             case 'high': return 'bg-red-100 text-red-800';
//             default: return 'bg-gray-100 text-gray-800';
//         }
//     };

//     return (
//         <div className="p-6 bg-white rounded-lg shadow-sm">
//             <div className="flex justify-between items-center mb-6">
//                 <h2 className="text-2xl font-bold text-gray-800">Model Baskets</h2>
//                 <div className="text-sm text-gray-500">
//                     {baskets.length} {baskets.length === 1 ? 'basket' : 'baskets'} found
//                 </div>
//                 <BasketModalTrigger />
//             </div>

//             {baskets.length === 0 ? (
//                 <div className="text-center py-10">
//                     <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//                     </svg>
//                     <h3 className="mt-2 text-lg font-medium text-gray-900">No baskets created yet</h3>
//                     <p className="mt-1 text-gray-500">Create your first investment basket to get started.</p>
//                 </div>
//             ) : (
//                 <div className="overflow-x-auto">
//                     <table className="min-w-full divide-y divide-gray-200">
//                         <thead className="bg-gray-50">
//                             <tr>
//                                 <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                                     Title
//                                 </th>
//                                 <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                                     Description
//                                 </th>
//                                 <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                                     Performance
//                                 </th>
//                                 <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                                     Risk
//                                 </th>
//                                 <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                                     Asset Class
//                                 </th>
//                                 <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                                     Recommendations
//                                 </th>
//                                 <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                                     Created
//                                 </th>
//                                 <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                                     Status
//                                 </th>
//                             </tr>
//                         </thead>
//                         <tbody className="bg-white divide-y divide-gray-200">
//                             {baskets.map((basket) => (
//                                 <tr key={basket._id} className="hover:bg-gray-50">
//                                     <td className="px-6 py-4 whitespace-nowrap">
//                                         <div className="font-medium text-gray-900">{basket.title}</div>
//                                     </td>
//                                     <td className="px-6 py-4 whitespace-nowrap text-gray-500 max-w-xs truncate">
//                                         {basket.description || 'No description'}
//                                     </td>
//                                     <td className="px-6 py-4 whitespace-nowrap">
//                                         <div className="flex flex-col">
//                                             <span className="font-medium">Return: {basket.three_y_return}%</span>
//                                             <span className="text-sm text-gray-500">Sharpe: {basket.three_y_sharpe}</span>
//                                         </div>
//                                     </td>
//                                     <td className="px-6 py-4 whitespace-nowrap">
//                                         <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getRiskColor(basket.three_y_riskLevel)}`}>
//                                             {basket.three_y_riskLevel || 'N/A'}
//                                         </span>
//                                     </td>
//                                     <td className="px-6 py-4 whitespace-nowrap text-gray-500">
//                                         {basket.assetClass}
//                                     </td>
//                                     <td className="px-6 py-4 whitespace-nowrap">
//                                         <div className="flex items-center">
//                                             <ShowRecommendation recommendations={basket.recommendations} />
//                                         </div>
//                                     </td>
//                                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                                         {new Date(basket.createdAt).toLocaleDateString('en-US', {
//                                             year: 'numeric',
//                                             month: 'short',
//                                             day: 'numeric'
//                                         })}
//                                     </td>
//                                     <td className="px-6 py-4 whitespace-nowrap">
//                                         <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${basket.basketStatus ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
//                                             {basket.basketStatus ? 'Active' : 'Inactive'}
//                                         </span>
//                                     </td>
//                                 </tr>
//                             ))}
//                         </tbody>
//                     </table>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default BasketsTable;

'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import BasketModalTrigger from '@/components/BasketModalTrigger';
import ShowRecommendation from '@/components/ShowRecommendation';
import clientAxiosInstance from '@/lib/clientAxios'; // Use the client-side Axios instance
import { API_BASE, RISK_ROUTES, USER_MANAGE_ROUTES } from '@/helpers/apiRoutes';

export default function BasketsTable() {
    const [baskets, setBaskets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const router = useRouter();

    // Use a useEffect hook to fetch data on the client side
    useEffect(() => {
        const fetchBaskets = async () => {
            setLoading(true);
            try {
                // Use the client-side Axios instance to make the API call
                const response = await clientAxiosInstance.get('/v1/model-basket/get-all/baskets');

                if (response.data.success) {
                    setBaskets(response.data.data || []);
                } else {
                    setError(response.data.message || 'Failed to fetch baskets.');
                }
            } catch (err) {
                console.error('Error fetching baskets:', err);
                setError('Failed to connect to server or fetch data.');
                // Redirect to login if a 401 Unauthorized error occurs
                if (err.response?.status === 401) {
                    router.push('/login');
                }
            } finally {
                setLoading(false);
            }
        };

        fetchBaskets();
    }, [router]);

    // Function to get risk level color
    const getRiskColor = (riskLevel) => {
        switch (riskLevel?.toLowerCase()) {
            case 'low': return 'bg-green-100 text-green-800';
            case 'medium': return 'bg-yellow-100 text-yellow-800';
            case 'high': return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center py-10">
                <p className="text-red-500 font-medium">{error}</p>
            </div>
        );
    }

    return (
        <div className="p-6 bg-white rounded-lg shadow-sm">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Model Baskets</h2>
                <div className="text-sm text-gray-500">
                    {baskets.length} {baskets.length === 1 ? 'basket' : 'baskets'} found
                </div>
                <BasketModalTrigger />
            </div>

            {baskets.length === 0 ? (
                <div className="text-center py-10">
                    <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <h3 className="mt-2 text-lg font-medium text-gray-900">No baskets created yet</h3>
                    <p className="mt-1 text-gray-500">Create your first investment basket to get started.</p>
                </div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Title
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Description
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Performance
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Risk
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Asset Class
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Recommendations
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Created
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Status
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {baskets.map((basket) => (
                                <tr key={basket._id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="font-medium text-gray-900">{basket.title}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-gray-500 max-w-xs truncate">
                                        {basket.description || 'No description'}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex flex-col">
                                            <span className="font-medium">Return: {basket.three_y_return}%</span>
                                            <span className="text-sm text-gray-500">Sharpe: {basket.three_y_sharpe}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getRiskColor(basket.three_y_riskLevel)}`}>
                                            {basket.three_y_riskLevel || 'N/A'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                                        {basket.assetClass}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <ShowRecommendation recommendations={basket.recommendations} />
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {new Date(basket.createdAt).toLocaleDateString('en-US', {
                                            year: 'numeric',
                                            month: 'short',
                                            day: 'numeric'
                                        })}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${basket.basketStatus ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                                            {basket.basketStatus ? 'Active' : 'Inactive'}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};
