'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import debounce from 'lodash.debounce';

export default function BasketSearchDebounce() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [search, setSearch] = useState(searchParams.get('search') || '');

    const debouncedSearchUpdate = debounce((value) => {
        const params = new URLSearchParams(window.location.search);
        if (value.trim()) {
            params.set('search', value.trim());
            params.set('page', '1');
        } else {
            params.delete('search');
            params.set('page', '1');
        }
        router.push(`?${params.toString()}`);
    }, 300);

    useEffect(() => {
        debouncedSearchUpdate(search);
        return () => debouncedSearchUpdate.cancel();
    }, [search]);

    return (
        <form
            onSubmit={(e) => e.preventDefault()}
            className="mb-6 w-full"
        >
            <div className="flex flex-col sm:flex-row gap-4 w-full">
                <div className="relative flex-grow">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg
                            className="h-5 w-5 text-gray-500"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            aria-hidden="true"
                        >
                            <path
                                fillRule="evenodd"
                                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </div>
                    <input
                        type="text"
                        placeholder="Search baskets by title, description..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="block w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-500 text-gray-900 transition-all duration-200 text-base"
                    />
                    {search && (
                        <button
                            type="button"
                            onClick={() => setSearch('')}
                            className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer rounded-r-lg px-2 transition-colors"
                        >
                            <svg
                                className="h-5 w-5 text-gray-400 hover:text-gray-600 transition-colors"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                aria-hidden="true"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </button>
                    )}
                </div>

                {search && (
                    <button
                        type="button"
                        onClick={() => {
                            setSearch('');
                            const params = new URLSearchParams(window.location.search);
                            params.delete('search');
                            params.set('page', '1');
                            router.push(`?${params.toString()}`);
                        }}
                        className="px-3 py-2 text-base font-medium cursor-pointer text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 shadow-sm whitespace-nowrap"
                    >
                        Clear Search
                    </button>
                )}
            </div>
        </form>
    );
}