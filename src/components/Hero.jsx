

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
            router.replace('/login');
        } catch (err) {
            console.error('Logout failed:', err);
            setIsLoggingOut(false);
        }
    };

    if (!isAuthorized || !user) return null;

    return (
        <div className="w-full flex items-center justify-between px-6 py-3 bg-white border-b border-gray-200 shadow-sm text-sm text-gray-700">
            <div className="flex items-center space-x-2">
                <div className="p-2 bg-blue-50 rounded-full">
                    <FiUser className="text-blue-600" />
                </div>
                <div>
                    <span className="font-medium text-gray-900">Welcome, {user.username}</span>
                    <span className="ml-2 px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                        {user.role}
                    </span>
                </div>
            </div>
            <button
                onClick={handleLogout}
                disabled={isLoggingOut}
                className={`flex items-center space-x-2 px-3 py-2 rounded-md transition-all ${isLoggingOut
                    ? 'bg-gray-100 text-gray-500'
                    : 'bg-red-50 text-red-600 hover:bg-red-100 hover:shadow-sm'
                    }`}
            >
                <CiLogout className="text-base" />
                <span>{isLoggingOut ? 'Logging out...' : 'Logout'}</span>
            </button>
        </div>
    );
}
