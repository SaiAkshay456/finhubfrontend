// // components/ToggleUserStatusButton.tsx
// 'use client';

// import axiosInstance from '@/helpers/axios';
// import { useState } from 'react';

// export default function ToggleUserStatusButton({ userId, isActive ,onToggle}) {
//     const [status, setStatus] = useState(isActive);
//     const [loading, setLoading] = useState(false);
//     const handleToggle = async () => {
//         try {
//             setLoading(true);
//             const { data } = await axiosInstance.patch(`http://localhost:3030/v1/users/user-status-update/${userId}`, { isActive: !status }, {
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//             });
//             if (data.success) {
//                 setStatus(!status);
//             } else {
//                 alert(data.message || 'Failed to update status');
//             }
//         } catch (err) {
//             console.error('Error toggling user status:', err);
//             alert('Something went wrong.');
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <button
//             onClick={handleToggle}
//             disabled={loading}
//             className={`px-3 py-1 text-sm font-medium rounded-full transition ${status ? 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200' : 'bg-green-100 text-green-700 hover:bg-green-200'
//                 }`}
//         >
//             {loading ? 'Updating...' : status ? 'Suspend' : 'Activate'}
//         </button>
//     );
// }

// components/ToggleUserStatusButton.tsx

'use client';

import { API_BASE, USER_MANAGE_ROUTES } from '@/helpers/apiRoutes';
import axiosInstance from '@/helpers/axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function ToggleUserStatusButton({ userId, isActive, onToggle }) {
    const [status, setStatus] = useState(isActive);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleToggle = async (e) => {
        e.stopPropagation();
        try {
            setLoading(true);
            const { data } = await axiosInstance.patch(
                `${API_BASE}/${USER_MANAGE_ROUTES.USER_STATUS_UPDATE}/${userId}`,
                { isActive: !status }
            );

            if (data.success) {
                setStatus(!status);
                if (onToggle) onToggle();
                router.refresh()
            }
        } catch (err) {
            console.error('Error toggling user status:', err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <button
            onClick={handleToggle}
            disabled={loading}
            className="flex w-full items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
        >
            {loading ? (
                <>
                    <span className="inline-block h-4 w-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></span>
                    <span>Updating...</span>
                </>
            ) : status ? (
                <>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M5.965 4.904l9.131 9.131a6.5 6.5 0 00-9.131-9.131zm8.07 10.192L4.904 5.965a6.5 6.5 0 009.131 9.131zM4.343 4.343a8 8 0 1111.314 11.314A8 8 0 014.343 4.343z" clipRule="evenodd" />
                    </svg>
                    <span>Suspend User</span>
                </>
            ) : (
                <>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                    </svg>
                    <span>Activate User</span>
                </>
            )}
        </button>
    );
}