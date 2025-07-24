import BasketSearchDebounce from '../../components/BasketSearchDebounce';
import { cookies } from 'next/headers';
import PaginationLayout from '../../components/PaginationLayout';
import BasketListClient from '../../components/BasketListClient';
import BasketModalTrigger from '@/components/BasketModalTrigger';
import axiosInstance from '@/helpers/axios';

export default async function BasketsPage({ searchParams }) {
    const search = searchParams?.search || '';
    const limit = parseInt(searchParams?.limit) || 4;
    const page = parseInt(searchParams?.page) || 1;

    const cookieStore = cookies();
    const token = cookieStore.get('token')?.value;

    let baskets = [];
    let totalCount = 0;
    let loading = false;
    if (search.trim()) {
        try {
            loading = true;
            const { data } = await axiosInstance.get(
                `/v1/model-basket/get-baskets?search=${search}&limit=${limit}&page=${page}`,
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );
            baskets = data.baskets || [];
            totalCount = data.totalCount || 0;
        }
        catch (err) {
            console.log(err)
        }
        finally {
            loading = false
        }
    }
    if (loading) {
        return <div className="flex items-center justify-center h-screen">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>
        </div>
    }


    const totalPages = Math.ceil(totalCount / limit);

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Model Baskets</h1>
                    <p className="text-sm text-gray-500 mt-1">
                        {search ? `Showing results for "${search}"` : 'Search or create baskets'}
                    </p>
                </div>
                <BasketModalTrigger />
            </div>

            {/* Search */}
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 mb-6">
                <BasketSearchDebounce initialValue={search} />
            </div>

            {/* Results */}
            {search ? (
                <div className="space-y-6">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                        <h2 className="text-lg font-medium text-gray-800">
                            {totalCount} {totalCount === 1 ? 'result' : 'results'} found
                        </h2>
                        <p className="text-sm text-gray-500">Page {page} of {totalPages}</p>
                    </div>

                    <BasketListClient baskets={baskets} token={token} />

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
                <div className="bg-white border border-gray-200 py-16 px-6 rounded-xl text-center shadow-sm">
                    <svg className="w-16 h-16 mx-auto text-gray-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    <h3 className="text-lg font-semibold text-gray-800">Start your basket search</h3>
                    <p className="text-gray-500 mt-1 max-w-lg mx-auto">Use the search bar above to discover model baskets</p>
                </div>
            )}
        </div>
    );
}
