'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import React from 'react';

export default function PaginationLayout({ currentPage, totalPages, search }) {
    const router = useRouter();
    const searchParams = useSearchParams();

    const createPageLink = (pageNum) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set('page', pageNum);
        if (search) params.set('search', search);
        return `?${params.toString()}`;
    };

    const goToPage = (pageNum) => {
        router.push(createPageLink(pageNum));
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const generatePages = () => {
        const pages = [];

        if (totalPages <= 7) {
            for (let i = 1; i <= totalPages; i++) pages.push(i);
        } else {
            pages.push(1);

            if (currentPage > 4) pages.push('...');

            for (
                let i = Math.max(2, currentPage - 1);
                i <= Math.min(totalPages - 1, currentPage + 1);
                i++
            ) {
                pages.push(i);
            }

            if (currentPage < totalPages - 3) pages.push('...');

            pages.push(totalPages);
        }

        return pages;
    };

    const pageItems = generatePages().map((pg, idx) => {
        if (pg === '...') {
            return (
                <span key={`dots-${idx}`} className="px-2 text-gray-400">
                    ...
                </span>
            );
        }

        return (
            <button
                key={pg}
                onClick={() => goToPage(pg)}
                className={`px-3 py-1 rounded-md text-sm font-medium border cursor-pointer ${pg === currentPage
                    ? 'bg-blue-600 text-white border-blue-600'
                    : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'
                    }`}
            >
                {pg}
            </button>
        );
    });

    return (
        <div className="flex flex-wrap justify-center mt-6 gap-2">
            <button
                onClick={() => goToPage(Math.max(currentPage - 1, 1))}
                disabled={currentPage === 1}
                className="px-3 py-1 cursor-pointer rounded-md text-sm font-medium border border-gray-300 bg-white text-gray-700 hover:bg-gray-100 disabled:opacity-50"
            >
                Prev
            </button>

            {pageItems}

            <button
                onClick={() => goToPage(Math.min(currentPage + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="px-3 py-1 cursor-pointer rounded-md text-sm font-medium border border-gray-300 bg-white text-gray-700 hover:bg-gray-100 disabled:opacity-50"
            >
                Next
            </button>
        </div>
    );
}
