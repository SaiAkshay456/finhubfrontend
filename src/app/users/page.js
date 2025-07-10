
import { cookies } from 'next/headers';
import React from 'react';
import LinkComponent from '../../components/LinkComponent';
import PaginationLayout from '../../components/PaginationLayout';
import ToggleUserStatusButton from '../../components/ToggleUserStatusButton';
import Link from 'next/link';
import CreateBasketClient from '../../components/CreateBasketClient';
const colorMap = {
    blue: 'bg-blue-500',
    green: 'bg-green-500',
    red: 'bg-red-500',
    orange: 'bg-orange-500',
};

export default async function AllUsersPage({ searchParams }) {
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;

    const searchTerm = await searchParams?.search || '';
    const currentPage = parseInt(searchParams?.page) || 1;

    let users = [];
    let error = null;

    // pagination
    let totalPages = 1;
    const limit = 5;
    let stats = {
        totalUsers: 0,
        totalActiveUsers: 0,
        totalSuspendedUsers: 0,
        totalKycPendingUsers: 0
    };

    try {
        const sanitizedSearchTerm = searchTerm.trim();
        const isValidSearch =
            sanitizedSearchTerm.length > 0 &&
            !sanitizedSearchTerm.includes('"') &&
            !sanitizedSearchTerm.includes("'");

        const searchQuery = isValidSearch ? `search=${sanitizedSearchTerm}&` : '';

        const apiURL = `http://localhost:3030/api/v1/users/get-all-users?${searchQuery}page=${currentPage}&limit=${limit}`;

        const res = await fetch(apiURL, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`
            },
            credentials: 'include'
        });

        const data = await res.json();

        if (data.success) {
            users = data.users;
            totalPages = data.totalPages;
            stats = {
                totalUsers: data.totalUsers,
                totalActiveUsers: data.totalActiveUsers,
                totalSuspendedUsers: data.totalSuspendedUsers,
                totalKycPendingUsers: data.totalKycPendingUsers
            };
        } else {
            error = data.message || 'Failed to fetch users';
        }
    } catch (err) {
        console.error('Failed to fetch users:', err);
        error = 'Failed to connect to server';
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="px-4 sm:px-6 lg:px-4 py-8 w-full max-w-9xl mx-auto">
                <div className="mb-8">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">User Management</h1>
                            <p className="mt-1 text-sm text-gray-600">
                                Manage all registered users and their account status
                            </p>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-2 md:gap-3">

                            <div className="w-full sm:w-auto">
                                <LinkComponent link="/createuser" textValue="Add User" />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-6">
                    {[
                        { label: 'Total Users', value: stats.totalUsers, color: 'blue' },
                        { label: 'Active Users', value: stats.totalActiveUsers, color: 'green' },
                        { label: 'Suspended Users', value: stats.totalSuspendedUsers, color: 'red' },
                        { label: 'KYC Pending', value: stats.totalKycPendingUsers, color: 'orange' },
                    ].map((card) => (
                        <div
                            key={card.label}
                            className="bg-white shadow rounded-lg p-4 flex items-center gap-4"
                        >
                            <div className={`rounded-full p-3 text-white ${colorMap[card.color]}`}>
                                <svg
                                    className="h-6 w-6"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                                </svg>
                            </div>
                            <div>
                                <p className="text-gray-500 text-sm">{card.label}</p>
                                <p className="text-xl font-semibold text-gray-800">{card.value}</p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                    <div className="p-4 border-b border-gray-200">
                        <form method="GET" className="flex gap-2">
                            <div className="relative flex-1">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <svg className="h-4 w-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <input
                                    type="text"
                                    name="search"
                                    placeholder="Search users..."
                                    defaultValue={searchTerm}
                                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>
                            <button
                                type="submit"
                                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors cursor-pointer"
                            >
                                Search
                            </button>

                            <button className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center">
                                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                </svg>
                                Export
                            </button>

                            {searchTerm && (
                                <Link
                                    href="/users"
                                    className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                                >
                                    Clear
                                </Link>
                            )}
                        </form>
                    </div>

                    {error && (
                        <div className="bg-red-50 border-l-4 border-red-500 p-4 m-4">
                            <div className="flex items-center gap-2 text-red-700">
                                <span>⚠️</span>
                                <p>{error}</p>
                            </div>
                        </div>
                    )}

                    {!error && users.length === 0 ? (
                        stats.totalUsers === 0 ? (
                            <div className="p-4 sm:p-6 md:p-8 text-center">
                                <div className="text-gray-400 mb-3 sm:mb-4 text-4xl">👤</div>
                                <h3 className="text-base sm:text-lg md:text-xl font-medium text-gray-900">
                                    No users found
                                </h3>
                                <p className="mt-1 text-sm sm:text-base text-gray-500">
                                    Try adjusting your search or create a new user
                                </p>
                                <div className="mt-4 sm:mt-6">
                                    <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors">
                                        Create New User
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div className="flex justify-center items-center py-20">
                                <svg className="animate-spin h-8 w-8 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                                </svg>
                                <span className="ml-2 text-blue-600 text-sm">Loading users...</span>
                            </div>
                        )
                    ) : (
                        users.length > 0 && (
                            <div className="overflow-x-auto w-full">
                                <table className="min-w-full divide-y divide-gray-200">
                                    {/* ✅ your table stays the same */}

                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/4">Username</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/4">Contact</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/6">Change Status</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/6">KYC Verification</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/6">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {users.map((user) => (
                                            <tr key={user._id} className="hover:bg-gray-50">
                                                <td className="px-6 py-4">
                                                    <Link href={`/users/${user._id}`} className="flex items-center" title="User data">
                                                        <div className="flex-shrink-0 h-10 w-10">
                                                            {user.avatar ? (
                                                                <img className="h-10 w-10 rounded-full" src={user.avatar} alt="avatar" />
                                                            ) : (
                                                                <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-medium">
                                                                    {user.firstName?.charAt(0)}{user.lastName?.charAt(0)}
                                                                </div>
                                                            )}
                                                        </div>
                                                        <div className="ml-3">
                                                            <div className="text-sm text-gray-500">
                                                                @{user.username || user.email.split('@')[0]}
                                                            </div>
                                                        </div>
                                                    </Link>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <Link href={`/users/${user._id}`} className="block hover:text-indigo-600" title="User Contact">
                                                        <div className="text-sm text-gray-500">{user.email}</div>
                                                        <div className="text-xs text-gray-500">{user.phoneNumber || 'No phone'}</div>
                                                    </Link>
                                                </td>
                                                <td className="px-6 py-4" itle="Activate or Suspend user">
                                                    <ToggleUserStatusButton userId={user._id} isActive={user.isActive} />
                                                </td>
                                                <td className="px-6 py-4">
                                                    <Link href={`/users/${user._id}`} className="block" title="User KYC status">
                                                        <span className={`px-3 py-1 text-xs rounded-full ${user.isKycCompleted ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                                                            {user.isKycCompleted ? 'Verified' : 'Not Yet'}
                                                        </span>
                                                    </Link>

                                                </td>
                                                <td className="px-6 py-4">
                                                    {/* <td className="px-4 py-3 md:px-6 whitespace-nowrap"> */}
                                                    <Link
                                                        href={`/users/update/${user._id}`}
                                                        className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                                                        title="Edit User"
                                                    >
                                                        Update
                                                    </Link>
                                                    {/* </td> */}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                {/* ... */}

                            </div>
                        )
                    )}
                </div>

                <PaginationLayout
                    currentPage={currentPage}
                    totalPages={totalPages}
                    search={searchTerm}
                />
            </div>
        </div >
    );
}
