// import BasketSearchDebounce from '../../components/BasketSearchDebounce';
// import { cookies } from 'next/headers';
// import PaginationLayout from '../../components/PaginationLayout';
// import BasketListClient from '../../components/BasketListClient';
// import BasketModalTrigger from '@/components/BasketModalTrigger';
// import axiosInstance from '@/helpers/axios';

// export default async function BasketsPage({ searchParams }) {


//     const cookieStore = cookies();
//     const token = cookieStore.get('token')?.value;

//     let baskets = [];
//     let totalCount = 0;
//     let loading = false;

//     try {
//         loading = true;
//         const { data } = await axiosInstance.get(
//             `/v1/model-basket/get-all/baskets`,
//             {
//                 headers: { Authorization: `Bearer ${token}` },
//             }
//         );
//         baskets = data.baskets || [];
//         totalCount = data.totalCount || 0;
//     }
//     catch (err) {
//         console.log(err)
//     }
//     finally {
//         loading = false
//     }
//     if (loading) {
//         return <div className="flex items-center justify-center h-screen">
//             <div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>
//         </div>
//     }


//     const totalPages = Math.ceil(totalCount / limit);

//     return (
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//             {/* Header */}
//             <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
//                 <div>
//                     <h1 className="text-2xl font-bold text-gray-900">Model Baskets</h1>
//                     <p className="text-sm text-gray-500 mt-1">
//                         {search ? `Showing results for "${search}"` : 'Search or create baskets'}
//                     </p>
//                 </div>
//                 <BasketModalTrigger />
//             </div>

//             <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 mb-6">
//                 <BasketSearchDebounce initialValue={search} />
//             </div>

//             {/* Results */}
//             {search ? (
//                 <div className="space-y-6">
//                     <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
//                         <h2 className="text-lg font-medium text-gray-800">
//                             {totalCount} {totalCount === 1 ? 'result' : 'results'} found
//                         </h2>
//                         <p className="text-sm text-gray-500">Page {page} of {totalPages}</p>
//                     </div>



//                     {/* {totalPages > 1 && (
//                         <div className="mt-6">
//                             <PaginationLayout
//                                 currentPage={page}
//                                 totalPages={totalPages}
//                                 search={search}
//                                 limit={limit}
//                             />
//                         </div>
//                     )} */}
//                 </div>
//             ) : (
//                 <div className="bg-white border border-gray-200 py-16 px-6 rounded-xl text-center shadow-sm">
//                     <svg className="w-16 h-16 mx-auto text-gray-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
//                     </svg>
//                     <h3 className="text-lg font-semibold text-gray-800">Start your basket search</h3>
//                     <p className="text-gray-500 mt-1 max-w-lg mx-auto">Use the search bar above to discover model baskets</p>
//                 </div>
//             )}
//         </div>
//     );
// }

import React from 'react';
import axiosInstance from '@/helpers/axios';
import { cookies } from 'next/headers';
import BasketModalTrigger from '@/components/BasketModalTrigger';
import ShowRecommendation from '@/components/ShowRecommendation';
const BasketsTable = async () => {
    const cookieStore = cookies();
    const token = cookieStore.get('token')?.value;

    let baskets = [];
    try {
        const { data } = await axiosInstance.get(`/v1/model-basket/get-all/baskets`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        baskets = data.data || [];
    } catch (error) {
        console.error('Error fetching baskets:', error.message);
    }

    // Function to get risk level color
    const getRiskColor = (riskLevel) => {
        switch (riskLevel?.toLowerCase()) {
            case 'low': return 'bg-green-100 text-green-800';
            case 'medium': return 'bg-yellow-100 text-yellow-800';
            case 'high': return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

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

export default BasketsTable;