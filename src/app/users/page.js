
// import { cookies } from 'next/headers';
// import React from 'react';
// import LinkComponent from '../../components/LinkComponent';
// import PaginationLayout from '../../components/PaginationLayout';
// import ToggleUserStatusButton from '../../components/ToggleUserStatusButton';

// export default async function AllUsersPage() {
//     const cookieStore = await cookies();
//     const token = cookieStore.get('token')?.value;
//     let users = [];
//     let error = null;
//     let isLoading = false;

//     try {
//         isLoading = true;
//         const res = await fetch('http://localhost:3030/api/v1/users/get-all-users', {
//             method: 'GET',
//             headers: {
//                 Cookie: `token=${token}`,
//             },
//             cache: 'no-store',
//             credentials: 'include'
//         });

//         const data = await res.json();
//         if (data.success) {
//             users = data.users;
//         } else {
//             error = data.message || 'Failed to fetch users';
//         }
//     } catch (err) {
//         console.error('Failed to fetch users:', err);
//         error = 'Failed to connect to server';
//     } finally {
//         isLoading = false;
//     }

//     return (
//         <div className="min-h-screen bg-gray-50">
//             <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
//                 {/* Page header */}
//                 <div className="mb-8">
//                     <div className="flex flex-col md:flex-row md:items-center md:justify-between">
//                         <div>
//                             <h1 className="text-2xl md:text-3xl font-bold text-gray-800">User Management</h1>
//                             <p className="mt-2 text-sm text-gray-600">
//                                 Manage all registered users and their account status
//                             </p>
//                         </div>
//                         <div className="mt-4 md:mt-0">
//                             <LinkComponent />
//                         </div>
//                     </div>
//                 </div>

//                 {/* Stats cards */}
//                 <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8">
//                     <div className="bg-white overflow-hidden shadow rounded-lg">
//                         <div className="px-4 py-5 sm:p-6">
//                             <div className="flex items-center">
//                                 <div className="flex-shrink-0 bg-blue-500 rounded-md p-3">
//                                     <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
//                                     </svg>
//                                 </div>
//                                 <div className="ml-5 w-0 flex-1">
//                                     <dt className="text-sm font-medium text-gray-500 truncate">Total Users</dt>
//                                     <dd className="flex items-baseline">
//                                         <div className="text-2xl font-semibold text-gray-900">{users.length}</div>
//                                     </dd>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>

// <div className="bg-white overflow-hidden shadow rounded-lg">
//     <div className="px-4 py-5 sm:p-6">
//         <div className="flex items-center">
//             <div className="flex-shrink-0 bg-green-500 rounded-md p-3">
//                 <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
//                 </svg>
//             </div>
//             <div className="ml-5 w-0 flex-1">
//                 <dt className="text-sm font-medium text-gray-500 truncate">Active Users</dt>
//                 <dd className="flex items-baseline">
//                     <div className="text-2xl font-semibold text-gray-900">
//                         {users.filter(u => u.isActive === true).length}
//                     </div>
//                 </dd>
//             </div>
//         </div>
//     </div>
// </div>

// <div className="bg-white overflow-hidden shadow rounded-lg">
//     <div className="px-4 py-5 sm:p-6">
//         <div className="flex items-center">
//             <div className="flex-shrink-0 bg-red-500 rounded-md p-3">
//                 <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M5.636 5.636l3.536 3.536m0 5.656l-3.536 3.536" />
//                 </svg>
//             </div>
//             <div className="ml-5 w-0 flex-1">
//                 <dt className="text-sm font-medium text-gray-500 truncate">Suspended</dt>
//                 <dd className="flex items-baseline">
//                     <div className="text-2xl font-semibold text-gray-900">
//                         {users.filter(u => !u.isActive).length}
//                     </div>
//                 </dd>
//             </div>
//         </div>
//     </div>
// </div>
//                 </div>

//                 {/* Main content */}
//                 <div className="bg-white shadow rounded-lg overflow-hidden">
//                     {/* Table header with actions */}
//                     <div className="px-6 py-4 border-b border-gray-200 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
//                         <div className="flex items-center">
//                             <h2 className="text-lg font-semibold text-gray-800">User List</h2>
//                             <span className="ml-2 px-2.5 py-0.5 text-xs font-medium bg-gray-100 text-gray-600 rounded-full">
//                                 {users.length} users
//                             </span>
//                         </div>

//                         <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
//                             {/* Search */}
//                             <div className="relative w-full sm:w-64">
//                                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                                     <svg className="h-4 w-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
//                                         <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
//                                     </svg>
//                                 </div>
//                                 <input
//                                     type="text"
//                                     className="block w-full pl-10 pr-3 py-2 text-sm border border-gray-300 rounded-md bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                                     placeholder="Search users..."
//                                 />
//                             </div>

//                             {/* Export Button */}
//                             <button className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center">
//                                 <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
//                                 </svg>
//                                 Export
//                             </button>
//                         </div>
//                     </div>

//                     {/* Loading state */}
//                     {isLoading ? (
//                         <div className="flex justify-center items-center h-64">
//                             <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
//                         </div>
//                     ) : error ? (
//                         <div className="bg-red-50 border-l-4 border-red-500 p-4 my-6 mx-6">
//                             <div className="flex">
//                                 <div className="flex-shrink-0">
//                                     <svg className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
//                                         <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
//                                     </svg>
//                                 </div>
//                                 <div className="ml-3">
//                                     <p className="text-sm text-red-700">{error}</p>
//                                 </div>
//                             </div>
//                         </div>
//                     ) : users.length === 0 ? (
//                         <div className="bg-white rounded-lg shadow-sm p-8 text-center">
//                             <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
//                             </svg>
//                             <h3 className="mt-2 text-lg font-medium text-gray-900">No users found</h3>
//                             <p className="mt-1 text-gray-500">Get started by adding a new user.</p>
//                         </div>
//                     ) : (
//                         <>
//                             <div className="overflow-x-auto">
//                                 <table className="min-w-full divide-y divide-gray-200">
//                                     <thead className="bg-gray-50">
//                                         <tr>
//                                             <th scope="col" className="px-8 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
//                                                 User
//                                             </th>
//                                             <th scope="col" className="px-8 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
//                                                 Contact
//                                             </th>
//                                             <th scope="col" className="px-8 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
//                                                 Status
//                                             </th>
//                                             <th scope="col" className="px-8 py-4 text-right text-sm font-medium text-gray-500 uppercase tracking-wider">
//                                                 Actions
//                                             </th>
//                                             {/* <th scope="col" className="px-8 py-4 text-right text-sm font-medium text-gray-500 uppercase tracking-wider">
//                                                 Change Status
//                                             </th> */}
//                                         </tr>
//                                     </thead>
//                                     <tbody className="bg-white divide-y divide-gray-200">
//                                         {users.map((user) => (
//                                             <tr key={user._id} className="hover:bg-gray-50 transition-colors">
//                                                 <td className="px-8 py-6 whitespace-nowrap">
//                                                     <div className="flex items-center">
//                                                         <div className="flex-shrink-0 h-12 w-12">
//                                                             {user.avatar ? (
//                                                                 <img className="h-12 w-12 rounded-full" src={user.avatar} alt="" />
//                                                             ) : (
//                                                                 <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-medium text-lg">
//                                                                     {user.firstName?.charAt(0)}{user.lastName?.charAt(0)}
//                                                                 </div>
//                                                             )}
//                                                         </div>
//                                                         <div className="ml-4">
//                                                             <div className="text-lg font-medium text-gray-900">
//                                                                 {user.firstName} {user.lastName}
//                                                             </div>
//                                                             <div className="text-sm text-gray-500">
//                                                                 @{user.username || user.email.split('@')[0]}
//                                                             </div>
//                                                         </div>
//                                                     </div>
//                                                 </td>
//                                                 <td className="px-8 py-6 whitespace-nowrap">
//                                                     <div className="text-lg text-gray-900">{user.email}</div>
//                                                     <div className="text-sm text-gray-500">{user.phoneNumber || 'No phone'}</div>
//                                                 </td>
//                                                 <td className="px-8 py-6 whitespace-nowrap">
//                                                     <span className={`px-3 py-1.5 inline-flex text-sm leading-5 font-semibold rounded-full ${user.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-yellow-800'}`}>
//                                                         {user.isActive ? 'Active' : 'Suspended'}
//                                                     </span>
//                                                 </td>
//                                                 <td className="px-8 py-6 whitespace-nowrap text-right text-sm font-medium">
//                                                     <div className="flex justify-end space-x-6">
//                                                         <button className="text-blue-600 hover:text-blue-900" title="View">
//                                                             <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
//                                                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
//                                                             </svg>
//                                                         </button>
//                                                         <button className="text-indigo-600 hover:text-indigo-900" title="Edit">
//                                                             <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
//                                                             </svg>
//                                                         </button>
//                                                         <button className="text-red-600 hover:text-red-900" title="Delete">
//                                                             <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
//                                                             </svg>
//                                                         </button>
//                                                     </div>
//                                                 </td>
//                                                 <td className="px-8 py-6 whitespace-nowrap text-right text-sm font-medium">
//                                                     <div className="flex justify-end space-x-6">

//                                                         <ToggleUserStatusButton userId={user._id} isActive={user.isActive} />
//                                                     </div>
//                                                 </td>
//                                             </tr>
//                                         ))}
//                                     </tbody>
//                                 </table>
//                             </div>

//                             {/* Pagination */}
//                             <PaginationLayout
//                                 totalItems={users.length}
//                                 itemsPerPage={10}
//                                 initialPage={1}
//                             />
//                         </>
//                     )}
//                 </div>
//             </div>
//         </div>
//     );
// }


import { cookies } from 'next/headers';
import React from 'react';
import LinkComponent from '../../components/LinkComponent';
import PaginationLayout from '../../components/PaginationLayout';
import ToggleUserStatusButton from '../../components/ToggleUserStatusButton';

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
                <div className="mb-8">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                        <div>
                            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">User Management</h1>
                            <p className="mt-2 text-sm text-gray-600">
                                Manage all registered users and their account status
                            </p>
                        </div>
                        <div className="mt-4 md:mt-0">
                            <LinkComponent />
                        </div>
                    </div>
                </div>



                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8">
                    <div className="bg-white overflow-hidden shadow rounded-lg">
                        <div className="px-4 py-5 sm:p-6">
                            <div className="flex items-center">
                                <div className="flex-shrink-0 bg-blue-500 rounded-md p-3">
                                    <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                                    </svg>
                                </div>
                                <div className="ml-5 w-0 flex-1">
                                    <dt className="text-sm font-medium text-gray-500 truncate">Total Users</dt>
                                    <dd className="flex items-baseline">
                                        <div className="text-2xl font-semibold text-gray-900">{users.length}</div>
                                    </dd>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white overflow-hidden shadow rounded-lg">
                        <div className="px-4 py-5 sm:p-6">
                            <div className="flex items-center">
                                <div className="flex-shrink-0 bg-green-500 rounded-md p-3">
                                    <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                    </svg>
                                </div>
                                <div className="ml-5 w-0 flex-1">
                                    <dt className="text-sm font-medium text-gray-500 truncate">Active Users</dt>
                                    <dd className="flex items-baseline">
                                        <div className="text-2xl font-semibold text-gray-900">
                                            {users.filter(u => u.isActive === true).length}
                                        </div>
                                    </dd>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white overflow-hidden shadow rounded-lg">
                        <div className="px-4 py-5 sm:p-6">
                            <div className="flex items-center">
                                <div className="flex-shrink-0 bg-red-500 rounded-md p-3">
                                    <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M5.636 5.636l3.536 3.536m0 5.656l-3.536 3.536" />
                                    </svg>
                                </div>
                                <div className="ml-5 w-0 flex-1">
                                    <dt className="text-sm font-medium text-gray-500 truncate">Suspended</dt>
                                    <dd className="flex items-baseline">
                                        <div className="text-2xl font-semibold text-gray-900">
                                            {users.filter(u => !u.isActive).length}
                                        </div>
                                    </dd>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white overflow-hidden shadow rounded-lg">
                        <div className="px-4 py-5 sm:p-6">
                            <div className="flex items-center">
                                <div className="flex-shrink-0 bg-orange-500 rounded-md p-3">
                                    <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M5.636 5.636l3.536 3.536m0 5.656l-3.536 3.536" />
                                    </svg>
                                </div>
                                <div className="ml-5 w-0 flex-1">
                                    <dt className="text-sm font-medium text-gray-500 truncate">Pending</dt>
                                    <dd className="flex items-baseline">
                                        <div className="text-2xl font-semibold text-gray-900">
                                            {users.filter(u => !u.isActive && u.isActive).length}
                                        </div>
                                    </dd>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="bg-white shadow rounded-lg overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-200 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                        <div className="flex items-center">
                            <h2 className="text-lg font-semibold text-gray-800">User List</h2>
                            <span className="ml-2 px-2.5 py-0.5 text-xs font-medium bg-gray-100 text-gray-600 rounded-full">
                                {users.length} users
                            </span>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                            <div className="relative w-full sm:w-64">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <svg className="h-4 w-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <input
                                    type="text"
                                    className="block w-full pl-10 pr-3 py-2 text-sm border border-gray-300 rounded-md bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="Search users..."
                                />
                            </div>
                            <button className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center">
                                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                </svg>
                                Export
                            </button>
                        </div>
                    </div>

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
                        </div>
                    ) : (
                        <div className="w-full overflow-x-auto rounded-lg border border-gray-200">
                            <table className="min-w-full table-auto divide-y divide-gray-200 text-sm">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="w-[200px] px-4 py-3 md:px-6 text-left font-medium text-gray-500 uppercase tracking-wider">User</th>
                                        <th className="w-[200px] px-4 py-3 md:px-6 text-left font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                                        <th className="w-[120px] px-4 py-3 md:px-6 text-left font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                        <th className="w-[120px] px-4 py-3 md:px-6 text-right font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                        <th className="w-[140px] px-4 py-3 md:px-6 text-right font-medium text-gray-500 uppercase tracking-wider">Change Status</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {users.map((user) => (
                                        <tr key={user._id} className="hover:bg-gray-50 transition-colors">
                                            <td className="px-4 py-3 md:px-6 whitespace-nowrap">
                                                <div className="flex items-center">
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
                                                        <div className="text-base md:text-lg font-medium text-gray-900">
                                                            {user.firstName} {user.lastName}
                                                        </div>
                                                        <div className="text-sm text-gray-500">
                                                            @{user.username || user.email.split('@')[0]}
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-4 py-3 md:px-6 whitespace-nowrap">
                                                <div className="text-base text-gray-900">{user.email}</div>
                                                <div className="text-sm text-gray-500">{user.phoneNumber || 'No phone'}</div>
                                            </td>
                                            <td className="px-4 py-3 md:px-6 whitespace-nowrap">
                                                <span className={`px-3 py-1.5 inline-flex text-sm leading-5 font-semibold rounded-full ${user.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-yellow-800'}`}>
                                                    {user.isActive ? 'Active' : 'Suspended'}
                                                </span>
                                            </td>
                                            <td className="px-4 py-3 md:px-6 whitespace-nowrap text-right text-sm font-medium">
                                                <div className="flex justify-end space-x-3">
                                                    <button className="text-blue-600 hover:text-blue-900" title="View">View</button>
                                                    <button className="text-indigo-600 hover:text-indigo-900" title="Edit">Edit</button>
                                                    <button className="text-red-600 hover:text-red-900" title="Delete">Delete</button>
                                                </div>
                                            </td>
                                            <td className="px-4 py-3 md:px-6 whitespace-nowrap text-right text-sm font-medium">
                                                <ToggleUserStatusButton userId={user._id} isActive={user.isActive} />
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                    <PaginationLayout totalItems={users.length} itemsPerPage={10} initialPage={1} />
                </div>
            </div>
        </div>
    );
}
