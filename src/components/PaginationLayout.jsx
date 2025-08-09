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
//         const maxVisiblePages = 5;
//         const halfVisible = Math.floor(maxVisiblePages / 2);

//         if (totalPages <= maxVisiblePages) {
//             for (let i = 1; i <= totalPages; i++) pages.push(i);
//         } else {
//             pages.push(1);

//             let start = Math.max(2, currentPage - halfVisible);
//             let end = Math.min(totalPages - 1, currentPage + halfVisible);

//             if (currentPage <= halfVisible + 1) {
//                 end = maxVisiblePages - 1;
//             } else if (currentPage >= totalPages - halfVisible) {
//                 start = totalPages - (maxVisiblePages - 2);
//             }

//             if (start > 2) pages.push('...');

//             for (let i = start; i <= end; i++) {
//                 pages.push(i);
//             }

//             if (end < totalPages - 1) pages.push('...');

//             pages.push(totalPages);
//         }

//         return pages;
//     };

//     const pageItems = generatePages().map((pg, idx) => {
//         if (pg === '...') {
//             return (
//                 <span
//                     key={`dots-${idx}`}
//                     className="flex items-center justify-center w-10 h-10 text-gray-500"
//                 >
//                     ...
//                 </span>
//             );
//         }

//         return (
//             <button
//                 key={pg}
//                 onClick={() => goToPage(pg)}
//                 className={`flex items-center justify-center w-10 h-10 rounded-md text-sm font-medium transition-colors ${pg === currentPage
//                         ? 'bg-[#e8e8e8] text-gray-800 font-semibold border border-gray-300'
//                         : 'text-gray-500 hover:bg-gray-100'
//                     }`}
//             >
//                 {pg}
//             </button>
//         );
//     });

//     return (
//         <div className="flex items-center justify-center gap-2 mt-8">
//             <button
//                 onClick={() => goToPage(Math.max(currentPage - 1, 1))}
//                 disabled={currentPage === 1}
//                 className={`px-4 py-2 rounded-md border border-gray-300 text-sm font-medium ${currentPage === 1
//                         ? 'text-gray-300 cursor-default'
//                         : 'text-gray-500 hover:bg-gray-100'
//                     }`}
//             >
//                 Prev
//             </button>

//             <div className="flex items-center gap-1">
//                 {pageItems}
//             </div>

//             <button
//                 onClick={() => goToPage(Math.min(currentPage + 1, totalPages))}
//                 disabled={currentPage === totalPages}
//                 className={`px-4 py-2 rounded-md border border-gray-300 text-sm font-medium ${currentPage === totalPages
//                         ? 'text-gray-300 cursor-default'
//                         : 'text-gray-500 hover:bg-gray-100'
//                     }`}
//             >
//                 Next
//             </button>
//         </div>
//     );
// }


'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import React from 'react';

export default function PaginationLayout({ currentPage, totalPages, search }) {
    const searchParams = useSearchParams();

    const createPageLink = (pageNum) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set('page', pageNum.toString());
        if (search) params.set('search', search);
        return `?${params.toString()}`;
    };

    const generatePages = () => {
        const pages = [];
        const maxVisiblePages = 5;
        const halfVisible = Math.floor(maxVisiblePages / 2);

        if (totalPages <= maxVisiblePages) {
            for (let i = 1; i <= totalPages; i++) pages.push(i);
        } else {
            pages.push(1);

            let start = Math.max(2, currentPage - halfVisible);
            let end = Math.min(totalPages - 1, currentPage + halfVisible);

            if (currentPage <= halfVisible + 1) {
                end = maxVisiblePages - 1;
            } else if (currentPage >= totalPages - halfVisible) {
                start = totalPages - (maxVisiblePages - 2);
            }

            if (start > 2) pages.push('...');

            for (let i = start; i <= end; i++) {
                pages.push(i);
            }

            if (end < totalPages - 1) pages.push('...');

            if (totalPages > 1) {
                pages.push(totalPages);
            }
        }

        return pages;
    };

    const pageItems = generatePages().map((pg, idx) => {
        if (pg === '...') {
            return (
                <span
                    key={`dots-${idx}`}
                    className="flex items-center justify-center w-10 h-10 text-gray-500"
                >
                    ...
                </span>
            );
        }

        return (
            <Link
                key={pg}
                href={createPageLink(pg)}
                className={`flex items-center justify-center w-10 h-10 rounded-md text-sm font-medium transition-colors ${pg === currentPage
                    ? 'bg-[#e8e8e8] text-gray-800 font-semibold border border-gray-300'
                    : 'text-gray-500 hover:bg-gray-100'
                    }`}
            >
                {pg}
            </Link>
        );
    });

    return (
        <div className="flex items-center justify-center gap-2 mt-8">
            <Link
                href={createPageLink(Math.max(currentPage - 1, 1))}
                className={`px-4 py-2 rounded-md border border-gray-300 text-sm font-medium ${currentPage === 1
                    ? 'text-gray-300 cursor-default pointer-events-none'
                    : 'text-gray-500 hover:bg-gray-100'
                    }`}
                aria-disabled={currentPage === 1}
                tabIndex={currentPage === 1 ? -1 : undefined}
            >
                Prev
            </Link>

            <div className="flex items-center gap-1">
                {pageItems}
            </div>

            <Link
                href={createPageLink(Math.min(currentPage + 1, totalPages))}
                className={`px-4 py-2 rounded-md border border-gray-300 text-sm font-medium ${currentPage === totalPages
                    ? 'text-gray-300 cursor-default pointer-events-none'
                    : 'text-gray-500 hover:bg-gray-100'
                    }`}
                aria-disabled={currentPage === totalPages}
                tabIndex={currentPage === totalPages ? -1 : undefined}
            >
                Next
            </Link>
        </div>
    );
}
