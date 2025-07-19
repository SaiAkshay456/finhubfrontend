// 'use client';

// import axios from 'axios';
// import { useAuth } from '../providers/AuthProvider';
// import { CiLogout } from 'react-icons/ci';
// import { useRouter } from 'next/navigation';
// import { FiUser } from 'react-icons/fi';
// import { useState } from 'react';

// export function Hero() {
//     const { isAuthorized, user, setUser, setIsAuthorized } = useAuth();
//     const router = useRouter();
//     const [isLoggingOut, setIsLoggingOut] = useState(false);

//     const handleLogout = async () => {
//         setIsLoggingOut(true);
//         try {
//             await axios.get('http://localhost:3030/api/v1/auth/logout', {
//                 withCredentials: true,
//             });
//             setUser(null);
//             setIsAuthorized(false);
//             window.location.href = '/login';
//         } catch (err) {
//             console.error('Logout failed:', err);
//             setIsLoggingOut(false);
//         }
//     };

//     if (!isAuthorized) {
//         if (typeof window !== "undefined") {
//             window.location.href = "/login"; // ensures full redirect
//         }
//         return null; // stop rendering
//     }

//     return (
//         // <div className="w-full flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-0 px-4 sm:px-6 py-3 bg-white border-b border-gray-200 shadow-sm">
//         <div className="sticky top-0 z-50 w-full flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-0 px-4 sm:px-6 py-3 bg-white border-b border-gray-200 shadow-sm">
//             <div className="flex items-center gap-2 sm:gap-3">
//                 <div className="p-1.5 sm:p-2 bg-blue-50 rounded-full flex-shrink-0">
//                     <FiUser className="text-blue-600 text-base sm:text-lg" />
//                 </div>
//                 <div className="flex flex-col sm:flex-row sm:items-baseline sm:gap-2">
//                     <span className="text-sm sm:text-base font-medium text-gray-800 truncate max-w-[160px] sm:max-w-none">
//                         Welcome, {user?.username}
//                     </span>
//                     <span className="px-2 py-0.5 sm:py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full whitespace-nowrap">
//                         {user?.role}
//                     </span>
//                 </div>
//             </div>
//             <button
//                 onClick={handleLogout}
//                 disabled={isLoggingOut}
//                 className={`flex items-center gap-1 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg transition-colors duration-200 self-end sm:self-auto ${isLoggingOut
//                     ? 'bg-gray-100 text-gray-500 cursor-not-allowed'
//                     : 'bg-red-50 text-red-600 hover:bg-red-100 active:bg-red-200'
//                     }`}
//             >
//                 <CiLogout className="text-base sm:text-lg flex-shrink-0" />
//                 <span className="text-xs sm:text-sm font-medium">
//                     {isLoggingOut ? 'Signing out...' : 'Sign out'}
//                 </span>
//             </button>
//         </div>
//     );
// }
'use client';

import axios from 'axios';
import { useAuth } from '../providers/AuthProvider';
import { CiLogout } from 'react-icons/ci';
import { useRouter } from 'next/navigation';
import { FiUser } from 'react-icons/fi';
import { useState } from 'react';

export function Hero() {
    const { isAuthorized, user, setUser, setIsAuthorized } = useAuth();
    const router = useRouter();
    const [isLoggingOut, setIsLoggingOut] = useState(false);

    const handleLogout = async () => {
        setIsLoggingOut(true);
        try {
            await axios.get('http://localhost:3030/api/v1/auth/logout', {
                withCredentials: true,
            });
            setUser(null);
            setIsAuthorized(false);
            window.location.href = '/';
        } catch (err) {
            console.error('Logout failed:', err);
            setIsLoggingOut(false);
        }
    };

    // if (!isAuthorized) {
    //     if (typeof window !== "undefined") {
    //         window.location.href = "/"; // ensures full redirect
    //     }
    //     return null; // stop rendering
    // }

    return (
        <div className="sticky top-0 z-50 w-full bg-white border-b border-gray-200 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0 py-4">
                    {/* User Info Section */}
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center border border-slate-200">
                            <FiUser className="text-slate-600 text-lg" />
                        </div>
                        <div className="flex flex-col">
                            <div className="flex items-center gap-3">
                                <span className="text-base font-semibold text-slate-800">
                                    {user?.username}
                                </span>
                                <div className="px-2.5 py-0.5 bg-slate-100 text-slate-700 text-xs font-medium rounded border border-slate-200">
                                    {user?.role}
                                </div>
                            </div>
                            <p className="text-sm text-slate-600 mt-0.5">
                                Financial Advisory Platform
                            </p>
                        </div>
                    </div>

                    {/* Logout Button */}
                    <button
                        onClick={handleLogout}
                        disabled={isLoggingOut}
                        className={`flex items-center gap-2 px-4 py-2 rounded-md font-medium transition-all duration-200 border ${isLoggingOut
                            ? 'bg-gray-50 text-gray-500 border-gray-200 cursor-not-allowed'
                            : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50 hover:border-slate-400'
                            }`}
                    >
                        <CiLogout className={`text-lg ${isLoggingOut ? 'text-gray-500' : 'text-slate-600'}`} />
                        <span className="text-sm">
                            {isLoggingOut ? 'Signing out...' : 'Sign out'}
                        </span>

                        {/* Loading indicator */}
                        {isLoggingOut && (
                            <div className="w-4 h-4 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin ml-1"></div>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
}