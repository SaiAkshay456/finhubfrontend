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
            window.location.href = '/login';
        } catch (err) {
            console.error('Logout failed:', err);
            setIsLoggingOut(false);
        }
    };

    if (!isAuthorized) {
        if (typeof window !== "undefined") {
            window.location.href = "/login"; // ensures full redirect
        }
        // return null; // stop rendering
    }

    return (
        <div className="w-full flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-0 px-4 sm:px-6 py-3 bg-white border-b border-gray-200 shadow-sm">
            <div className="flex items-center gap-2 sm:gap-3">
                <div className="p-1.5 sm:p-2 bg-blue-50 rounded-full flex-shrink-0">
                    <FiUser className="text-blue-600 text-base sm:text-lg" />
                </div>
                <div className="flex flex-col sm:flex-row sm:items-baseline sm:gap-2">
                    <span className="text-sm sm:text-base font-medium text-gray-800 truncate max-w-[160px] sm:max-w-none">
                        Welcome, {user?.username}
                    </span>
                    <span className="px-2 py-0.5 sm:py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full whitespace-nowrap">
                        {user?.role}
                    </span>
                </div>
            </div>
            <button
                onClick={handleLogout}
                disabled={isLoggingOut}
                className={`flex items-center gap-1 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg transition-colors duration-200 self-end sm:self-auto ${isLoggingOut
                    ? 'bg-gray-100 text-gray-500 cursor-not-allowed'
                    : 'bg-red-50 text-red-600 hover:bg-red-100 active:bg-red-200'
                    }`}
            >
                <CiLogout className="text-base sm:text-lg flex-shrink-0" />
                <span className="text-xs sm:text-sm font-medium">
                    {isLoggingOut ? 'Signing out...' : 'Sign out'}
                </span>
            </button>
        </div>
    );
}