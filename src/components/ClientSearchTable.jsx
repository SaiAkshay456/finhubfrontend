'use client';

import { useState, useMemo } from 'react';

export default function ClientSearchTable({ users }) {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredUsers = useMemo(() => {
        const lower = searchTerm.toLowerCase();
        return users.filter((user) => {
            const fullName = `${user.firstName} ${user.lastName}`.toLowerCase();
            const email = user.email.toLowerCase();
            const username = user.username?.toLowerCase() || '';
            return (
                fullName.includes(lower) ||
                email.includes(lower) ||
                username.includes(lower)
            );
        });
    }, [searchTerm, users]);

    return (
        <>
            {/* Search Bar */}
            <div className="relative w-full sm:w-64 mb-4">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-4 w-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                    </svg>
                </div>
                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="block w-full pl-10 pr-3 py-2 text-sm border border-gray-300 rounded-md bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Search users..."
                />
            </div>

            {/* User Table */}
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-8 py-4 text-left text-sm font-medium text-gray-500 uppercase">User</th>
                            <th className="px-8 py-4 text-left text-sm font-medium text-gray-500 uppercase">Contact</th>
                            <th className="px-8 py-4 text-left text-sm font-medium text-gray-500 uppercase">Status</th>
                            <th className="px-8 py-4 text-right text-sm font-medium text-gray-500 uppercase">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {filteredUsers.map((user) => (
                            <tr key={user._id} className="hover:bg-gray-50 transition-colors">
                                <td className="px-8 py-6 whitespace-nowrap">
                                    <div className="flex items-center">
                                        <div className="flex-shrink-0 h-12 w-12">
                                            {user.avatar ? (
                                                <img className="h-12 w-12 rounded-full" src={user.avatar} alt="" />
                                            ) : (
                                                <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-medium text-lg">
                                                    {user.firstName?.charAt(0)}{user.lastName?.charAt(0)}
                                                </div>
                                            )}
                                        </div>
                                        <div className="ml-4">
                                            <div className="text-lg font-medium text-gray-900">
                                                {user.firstName} {user.lastName}
                                            </div>
                                            <div className="text-sm text-gray-500">
                                                @{user.username || user.email.split('@')[0]}
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-8 py-6 whitespace-nowrap">
                                    <div className="text-lg text-gray-900">{user.email}</div>
                                    <div className="text-sm text-gray-500">{user.phoneNumber || 'No phone'}</div>
                                </td>
                                <td className="px-8 py-6 whitespace-nowrap">
                                    <span className={`px-3 py-1.5 inline-flex text-sm leading-5 font-semibold rounded-full ${user.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-yellow-800'}`}>
                                        {user.isActive ? 'Active' : 'Suspended'}
                                    </span>
                                </td>
                                <td className="px-8 py-6 whitespace-nowrap text-right text-sm font-medium">
                                    <div className="flex justify-end space-x-6">
                                        {/* View/Edit/Delete icons here */}
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}
