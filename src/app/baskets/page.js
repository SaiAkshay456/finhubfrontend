import BasketSearchDebounce from '../../components/BasketSearchDebounce';
import { cookies } from 'next/headers';
import CreateBasketClient from '../../components/CreateBasketClient';
import PaginationLayout from '../../components/PaginationLayout';

export default async function BasketsPage({ searchParams }) {
    const search = await searchParams?.search || '';
    const limit = parseInt(searchParams?.limit) || 4;
    const page = parseInt(searchParams?.page) || 1;
    const cookieGet = await cookies()
    const token = cookieGet.get('token')?.value;

    let baskets = [];
    let totalCount = 0;

    if (search.trim()) {
        const res = await fetch(
            `http://localhost:3030/api/v1/model-basket/get-baskets?search=${search}&limit=${limit}&page=${page}`,
            {
                headers: { Authorization: `Bearer ${token}` },
                cache: 'no-store'
            }
        );

        if (res.ok) {
            const data = await res.json();
            baskets = data.baskets || [];
            totalCount = data.totalCount || 0;
        }
    }

    const totalPages = Math.ceil(totalCount / limit);

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Model Baskets</h1>
                    <p className="text-sm text-gray-500 mt-1">
                        {search ? `Showing results for "${search}"` : 'Search or create baskets'}
                    </p>
                </div>
                <CreateBasketClient />
            </div>

            {/* Search Section */}
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 mb-6">
                <BasketSearchDebounce initialValue={search} />
            </div>

            {/* Results Section */}
            {search ? (
                <div className="space-y-6">
                    {/* Result Summary */}
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                        <h2 className="text-lg font-medium text-gray-800">
                            {totalCount} {totalCount === 1 ? 'result' : 'results'} found
                        </h2>
                        <p className="text-sm text-gray-500">Page {page} of {totalPages}</p>
                    </div>

                    {/* Table View */}
                    <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Basket Name
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Description
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Models
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Created
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {baskets.length > 0 ? (
                                        baskets.map((basket) => (
                                            <tr key={basket.id || basket._id} className="hover:bg-gray-50">
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm font-medium text-gray-900">{basket.title}</div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="text-sm text-gray-500 line-clamp-1 max-w-xs">
                                                        {basket.description || 'No description'}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800">
                                                        {basket.modelsCount || 0} models
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {new Date(basket.createdAt).toLocaleDateString()}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                    <button className="text-blue-600 hover:text-blue-900 mr-4 cursor-pointer">
                                                        View
                                                    </button>
                                                    <button className="text-indigo-600 hover:text-indigo-900 cursor-pointer">
                                                        Edit
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="5" className="px-6 py-12 text-center">
                                                <svg className="w-12 h-12 mx-auto text-gray-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                                <h3 className="text-lg font-semibold text-gray-700">No baskets found</h3>
                                                <p className="text-gray-500 mt-1">Try refining your search</p>
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <div className="mt-6">
                            <PaginationLayout
                                currentPage={page}
                                totalPages={totalPages}
                                search={search}
                                limit={limit}
                            />
                        </div>
                    )}
                </div>
            ) : (
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 py-16 px-6 text-center">
                    <svg className="w-16 h-16 mx-auto text-gray-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    <h3 className="text-lg font-semibold text-gray-800">Start your basket search</h3>
                    <p className="text-gray-500 mt-1 max-w-lg mx-auto">
                        Use the search bar above to discover model baskets
                    </p>
                </div>
            )}
        </div>
    );
}