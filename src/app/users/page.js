
import { cookies } from 'next/headers';
import React from 'react';
import LinkComponent from '../../components/LinkComponent';
import PaginationLayout from '../../components/PaginationLayout';

export default async function AllUsersPage() {
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;
    let users = [];
    let error = null;
    let isLoading = false;

    try {
        isLoading = true;
        const res = await fetch('http://localhost:3030/api/v1/users/get-all-users', {
            method: 'GET',
            headers: {
                Cookie: `token=${token}`,
            },
            cache: 'no-store',
            credentials: 'include'
        });

        const data = await res.json();
        if (data.success) {
            users = data.users;
            // activeUsers = data.activeUsers

        } else {
            error = data.message || 'Failed to fetch users';
        }
    } catch (err) {
        console.error('Failed to fetch users:', err);
        error = 'Failed to connect to server';
    } finally {
        isLoading = false;
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
                {/* Page header */}
                <div className="mb-8">
                    <h1 className="text-2xl md:text-2xl font-bold text-gray-800">User Management</h1>
                    <p className="mt-0 text-sm text-gray-600">
                        Manage all registered users, their roles and permissions
                    </p>
                </div>

                {/* Cards */}
                <div className="grid grid-cols-12 gap-4">
                    {/* Statistics cards */}
                    <div className="col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-3">
                        <div className="bg-white shadow rounded-lg p-5">
                            <div className="flex items-center">
                                <div className="p-3 rounded-full bg-blue-50 text-blue-600">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                                    </svg>
                                </div>
                                <div className="ml-4">
                                    <h3 className="text-lg font-medium text-gray-500">Total Users</h3>
                                    <p className="text-2xl font-semibold text-gray-800">{users.length}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-span-12 md:col-span-6 lg:col-span-3">
                        <div className="bg-white shadow rounded-lg p-5">
                            <div className="flex items-center">
                                <div className="p-3 rounded-full bg-green-50 text-green-600">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                    </svg>
                                </div>
                                <div className="ml-4">
                                    <h3 className="text-lg font-medium text-gray-500">Active Users</h3>
                                    <p className="text-2xl font-semibold text-gray-800">
                                        {users.filter(u => u.isActive === true).length}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-span-12 md:col-span-6 lg:col-span-3">
                        <div className="bg-white shadow rounded-lg p-5">
                            <div className="flex items-center">
                                <div className="p-3 rounded-full bg-purple-50 text-purple-600">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <div className="ml-4">
                                    <h3 className="text-lg font-medium text-gray-500">Admins</h3>
                                    <p className="text-2xl font-semibold text-gray-800">
                                        {users.filter(u => u.role === 'admin').length}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-span-12 md:col-span-6 lg:col-span-3">
                        <div className="bg-white shadow rounded-lg p-5">
                            <div className="flex items-center">
                                <div className="p-3 rounded-full bg-yellow-50 text-yellow-600">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <div className="ml-4">
                                    <h3 className="text-lg font-medium text-gray-500">Pending</h3>
                                    <p className="text-2xl font-semibold text-gray-800">
                                        {users.filter(u => u.status === 'pending').length}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Main content */}
                    <div className="col-span-12">
                        <div className="bg-white shadow rounded-lg overflow-hidden">
                            {/* Table header with actions */}
                            <div className="px-6 py-3 border-b border-gray-200 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
                                <div className="flex items-center">
                                    <h2 className="text-base font-semibold text-gray-800">All Users</h2>
                                    <span className="ml-2 px-2 py-0.5 text-[10px] font-medium bg-gray-100 text-gray-600 rounded-full">
                                        {users.length} users
                                    </span>
                                </div>

                                <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                                    {/* Search */}
                                    <div className="relative w-full sm:w-52">
                                        <div className="absolute inset-y-0 left-0 pl-2 flex items-center pointer-events-none">
                                            <svg className="h-4 w-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                                            </svg>
                                        </div>
                                        <input
                                            type="text"
                                            className="block w-full pl-8 pr-2 py-1 text-xs border border-gray-300 rounded-md bg-white placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500"
                                            placeholder="Search..."
                                        />
                                    </div>

                                    {/* Filter Dropdown */}
                                    <select className="block w-full sm:w-auto px-2 py-1 text-xs border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 bg-white">
                                        <option>All Roles</option>
                                        <option>Admin</option>
                                        <option>User</option>
                                        <option>Moderator</option>
                                    </select>

                                    {/* Action Buttons */}
                                    <div className="flex space-x-1">
                                        <LinkComponent />
                                        <button className="px-2 py-1 text-xs border border-blue-600 text-blue-600 rounded hover:bg-blue-50 flex items-center">
                                            <svg className="w-3.5 h-3.5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                            </svg>
                                            Export
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Loading state */}
                            {isLoading ? (
                                <div className="flex justify-center items-center h-64">
                                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
                                </div>
                            ) : error ? (
                                <div className="bg-red-50 border-l-4 border-red-500 p-4 my-6 mx-6">
                                    <div className="flex">
                                        <div className="flex-shrink-0">
                                            <svg className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                            </svg>
                                        </div>
                                        <div className="ml-3">
                                            <p className="text-sm text-red-700">{error}</p>
                                        </div>
                                    </div>
                                </div>
                            ) : users.length === 0 ? (
                                <div className="bg-white rounded-lg shadow-sm p-8 text-center">
                                    <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                                    </svg>
                                    <h3 className="mt-2 text-lg font-medium text-gray-900">No users found</h3>
                                    <p className="mt-1 text-gray-500">Get started by adding a new user.</p>
                                    <div className="mt-6">
                                        <button className="inline-flex items-center px-2.5 py-1 border border-transparent shadow-sm text-[10px] sm:text-xs font-medium rounded bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-1 focus:ring-offset-1 focus:ring-blue-500">
                                            <svg className="-ml-0.5 mr-1 h-3.5 w-3.5 sm:h-4 sm:w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                                            </svg>
                                            New User
                                        </button>

                                    </div>
                                </div>
                            ) : (
                                <>
                                    <div className="overflow-x-auto">
                                        <table className="min-w-full divide-y divide-gray-200">
                                            <thead className="bg-gray-50">
                                                <tr>
                                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                        User
                                                    </th>
                                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                        Contact
                                                    </th>
                                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                        Status
                                                    </th>
                                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                        Role
                                                    </th>
                                                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                        Actions
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody className="bg-white divide-y divide-gray-200">
                                                {users.map((user, i) => (
                                                    <tr key={user._id} className="hover:bg-gray-50 transition-colors">
                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                            <div className="flex items-center">
                                                                <div className="flex-shrink-0 h-10 w-10">
                                                                    {user.avatar ? (
                                                                        <img className="h-10 w-10 rounded-full" src={user.avatar} alt="" />
                                                                    ) : (
                                                                        <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-medium">
                                                                            {user.firstName?.charAt(0)}{user.lastName?.charAt(0)}
                                                                        </div>
                                                                    )}
                                                                </div>
                                                                <div className="ml-4">
                                                                    <div className="text-sm font-medium text-gray-900">
                                                                        {user.firstName} {user.lastName}
                                                                    </div>
                                                                    <div className="text-sm text-gray-500">
                                                                        @{user.username || user.email.split('@')[0]}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                            <div className="text-sm text-gray-900">{user.email}</div>
                                                            <div className="text-sm text-gray-500">{user.phone || 'No phone'}</div>
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${user.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                                                                {user.isActive ? 'Active' : 'inactive'}
                                                            </span>
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${user.role === 'admin' ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'}`}>
                                                                {user.role}
                                                            </span>
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                            <div className="flex justify-end space-x-3">
                                                                <button className="text-blue-600 hover:text-blue-900 flex items-center">
                                                                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                                                    </svg>
                                                                    View
                                                                </button>
                                                                <button className="text-indigo-600 hover:text-indigo-900 flex items-center">
                                                                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                                    </svg>
                                                                    Edit
                                                                </button>
                                                                <button className="text-red-600 hover:text-red-900 flex items-center">
                                                                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                                    </svg>
                                                                    Delete
                                                                </button>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>

                                    {/* Pagination */}
                                    {/* <div className="bg-white px-6 py-3 flex items-center justify-between border-t border-gray-200">
                                        <div className="flex-1 flex justify-between sm:hidden">
                                            <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                                                Previous
                                            </button>
                                            <button className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                                                Next
                                            </button>
                                        </div>
                                        <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                                            <div>
                                                <p className="text-sm text-gray-700">
                                                    Showing <span className="font-medium">1</span> to <span className="font-medium">10</span> of{' '}
                                                    <span className="font-medium">{users.length}</span> results
                                                </p>
                                            </div>
                                            <div>
                                                <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                                                    <button className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                                                        <span className="sr-only">Previous</span>
                                                        <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                                            <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                                                        </svg>
                                                    </button>
                                                    <button aria-current="page" className="z-10 bg-blue-50 border-blue-500 text-blue-600 relative inline-flex items-center px-4 py-2 border text-sm font-medium">
                                                        1
                                                    </button>
                                                    <button className="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium">
                                                        2
                                                    </button>
                                                    <button className="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium">
                                                        3
                                                    </button>
                                                    <span className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700">
                                                        ...
                                                    </span>
                                                    <button className="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium">
                                                        8
                                                    </button>
                                                    <button className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                                                        <span className="sr-only">Next</span>
                                                        <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                                            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                                                        </svg>
                                                    </button>
                                                </nav>
                                            </div>
                                        </div>
                                    </div> */}
                                    <PaginationLayout
                                        totalItems={users.length}
                                        itemsPerPage={4}
                                        initialPage={1}
                                    />
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
