// 'use client';

// import { useRouter, useSearchParams } from 'next/navigation';
// import React from 'react';

// export default function PaginationLayout({ currentPage, totalPages, search }) {
//     const router = useRouter();
//     const searchParams = useSearchParams();

//     const createPageLink = (pageNum) => {
//         const params = new URLSearchParams(searchParams.toString());
//         params.set('page', pageNum);
//         if (search) params.set('search', search);
//         return `?${params.toString()}`;
//     };

//     const goToPage = (pageNum) => {
//         router.push(createPageLink(pageNum));
//         window.scrollTo({ top: 0, behavior: 'smooth' });
//     };

//     const generatePages = () => {
//         const pages = [];

//         if (totalPages <= 7) {
//             for (let i = 1; i <= totalPages; i++) pages.push(i);
//         } else {
//             pages.push(1);

//             if (currentPage > 4) pages.push('...');

//             for (
//                 let i = Math.max(2, currentPage - 1);
//                 i <= Math.min(totalPages - 1, currentPage + 1);
//                 i++
//             ) {
//                 pages.push(i);
//             }

//             if (currentPage < totalPages - 3) pages.push('...');

//             pages.push(totalPages);
//         }

//         return pages;
//     };

//     const pageItems = generatePages().map((pg, idx) => {
//         if (pg === '...') {
//             return (
//                 <span key={`dots-${idx}`} className="px-2 text-gray-400">
//                     ...
//                 </span>
//             );
//         }

//         return (
//             <button
//                 key={pg}
//                 onClick={() => goToPage(pg)}
//                 className={`px-3 py-1 rounded-md text-sm font-medium border cursor-pointer ${pg === currentPage
//                     ? 'bg-gradient-to-r from-[#00d09c] to-[#00b98b] text-white border-green-600'
//                     : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'
//                     }`}
//             >
//                 {pg}
//             </button>
//         );
//     });

//     return (
//         <div className="flex flex-wrap justify-center mt-6 gap-2">
//             <button
//                 onClick={() => goToPage(Math.max(currentPage - 1, 1))}
//                 disabled={currentPage === 1}
//                 className="px-3 py-1 cursor-pointer rounded-md text-sm font-medium border border-gray-300 bg-white text-gray-700 hover:bg-gray-100 disabled:opacity-50"
//             >
//                 Prev
//             </button>

//             {pageItems}

//             <button
//                 onClick={() => goToPage(Math.min(currentPage + 1, totalPages))}
//                 disabled={currentPage === totalPages}
//                 className="px-3 py-1 cursor-pointer rounded-md text-sm font-medium border border-gray-300 bg-white text-gray-700 hover:bg-gray-100 disabled:opacity-50"
//             >
//                 Next
//             </button>
//         </div>
//     );
// }

'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

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
        const maxVisiblePages = 5; // Reduced from 7 for better mobile experience
        const halfVisible = Math.floor(maxVisiblePages / 2);

        if (totalPages <= maxVisiblePages) {
            for (let i = 1; i <= totalPages; i++) pages.push(i);
        } else {
            // Always show first page
            pages.push(1);

            // Calculate start and end of middle range
            let start = Math.max(2, currentPage - halfVisible);
            let end = Math.min(totalPages - 1, currentPage + halfVisible);

            // Adjust if we're near the start or end
            if (currentPage <= halfVisible + 1) {
                end = maxVisiblePages - 1;
            } else if (currentPage >= totalPages - halfVisible) {
                start = totalPages - (maxVisiblePages - 2);
            }

            // Add ellipsis if needed
            if (start > 2) pages.push('...');

            // Add middle pages
            for (let i = start; i <= end; i++) {
                pages.push(i);
            }

            // Add ellipsis if needed
            if (end < totalPages - 1) pages.push('...');

            // Always show last page
            pages.push(totalPages);
        }

        return pages;
    };

    const pageItems = generatePages().map((pg, idx) => {
        if (pg === '...') {
            return (
                <span
                    key={`dots-${idx}`}
                    className="flex items-center justify-center w-10 h-10 text-gray-400 select-none"
                >
                    ...
                </span>
            );
        }

        return (
            <button
                key={pg}
                onClick={() => goToPage(pg)}
                className={`flex items-center justify-center w-10 h-10 rounded-full text-sm font-medium transition-all duration-200 ${pg === currentPage
                    ? 'bg-gradient-to-r from-[#00d09c] to-[#00b98b] text-white shadow-md'
                    : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                    }`}
                aria-current={pg === currentPage ? 'page' : undefined}
                aria-label={`Go to page ${pg}`}
            >
                {pg}
            </button>
        );
    });

    return (
        <div className="flex items-center justify-center mt-8 gap-2">
            <button
                onClick={() => goToPage(Math.max(currentPage - 1, 1))}
                disabled={currentPage === 1}
                className="flex items-center justify-center w-10 h-10 rounded-full border border-gray-200 bg-white text-gray-700 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                aria-label="Previous page"
            >
                <ChevronLeft className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-1 mx-2">
                {pageItems}
            </div>

            <button
                onClick={() => goToPage(Math.min(currentPage + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="flex items-center justify-center w-10 h-10 rounded-full border border-gray-200 bg-white text-gray-700 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                aria-label="Next page"
            >
                <ChevronRight className="w-5 h-5" />
            </button>
        </div>
    );
}