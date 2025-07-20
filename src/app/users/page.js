
// import { cookies } from 'next/headers';
// import React from 'react';
// import LinkComponent from '../../components/LinkComponent';
// import PaginationLayout from '../../components/PaginationLayout';
// import ToggleUserStatusButton from '../../components/ToggleUserStatusButton';
// import Link from 'next/link';
// import TableOfUser from '../../components/TableOfUser';
// // import CreateBasketClient from '../../components/CreateBasketClient';
// const colorMap = {
//     blue: 'bg-blue-500',
//     green: 'bg-green-500',
//     red: 'bg-red-500',
//     orange: 'bg-orange-500',
// };
// export async function fetchQuestionnaires(token) {
//     try {
//         const res = await fetch(`http://localhost:3030/api/v1/riskprofile/get/questionarries`, {
//             headers: {
//                 Authorization: `Bearer ${token}`,
//             },
//             credentials: "include",
//             cache: "no-store",
//         });
//         const questionnaires = await res.json();
//         if (res.ok) {
//             return questionnaires;
//         } else {

//         }
//     } catch (err) {
//         console.error('Error fetching questionnaires:', err);
//         return [];
//     }
// }

// export default async function AllUsersPage({ searchParams }) {
//     const cookieStore = await cookies();
//     const token = cookieStore.get('token')?.value;


//     const searchTerm = await searchParams?.search || '';
//     const currentPage = parseInt(searchParams?.page) || 1;

//     let users = [];
//     let error = null;

//     // pagination
//     let totalPages = 1;
//     const limit = 3;
//     let stats = {
//         totalUsers: 0,
//         totalActiveUsers: 0,
//         totalSuspendedUsers: 0,
//         totalKycPendingUsers: 0
//     };

//     try {
//         const sanitizedSearchTerm = searchTerm.trim();
//         const isValidSearch =
//             sanitizedSearchTerm.length > 0 &&
//             !sanitizedSearchTerm.includes('"') &&
//             !sanitizedSearchTerm.includes("'");

//         const searchQuery = isValidSearch ? `search=${sanitizedSearchTerm}&` : '';

//         const apiURL = `http://localhost:3030/api/v1/users/get-all-users?${searchQuery}page=${currentPage}&limit=${limit}`;

//         const res = await fetch(apiURL, {
//             method: 'GET',
//             headers: {
//                 Authorization: `Bearer ${token}`
//             },
//             credentials: 'include'
//         });

//         const data = await res.json();

//         if (data.success) {
//             users = data.users;
//             totalPages = data.totalPages;
//             stats = {
//                 totalUsers: data.totalUsers,
//                 totalActiveUsers: data.totalActiveUsers,
//                 totalSuspendedUsers: data.totalSuspendedUsers,
//                 totalKycPendingUsers: data.totalKycPendingUsers
//             };
//         } else {
//             error = data.message || 'Failed to fetch users';
//         }
//     } catch (err) {
//         console.error('Failed to fetch users:', err);
//         error = 'Failed to connect to server';
//     }

//     const questionarriesArray = await fetchQuestionnaires(token);

//     return (
//         <div className="min-h-screen bg-gray-50">
//             <div className="px-4 sm:px-6 lg:px-4 py-8 w-full max-w-9xl mx-auto">
//                 <div className="mb-8">
//                     <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
//                         <div>
//                             <h1 className="text-2xl md:text-3xl font-bold text-gray-800">User Management</h1>
//                             <p className="mt-1 text-sm text-gray-600">
//                                 Manage all registered users and their account status
//                             </p>
//                         </div>

//                         <div className="flex flex-col sm:flex-row gap-2 md:gap-3">

//                             <div className="w-full sm:w-auto">
//                                 <LinkComponent link="/createuser" textValue="+ Add Client" />
//                             </div>
//                         </div>
//                     </div>
//                 </div>

//                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-6">
//                     {[
//                         { label: 'Total Users', value: stats.totalUsers, color: 'blue' },
//                         { label: 'Active Users', value: stats.totalActiveUsers, color: 'green' },
//                         { label: 'Suspended Users', value: stats.totalSuspendedUsers, color: 'red' },
//                         { label: 'KYC Pending', value: stats.totalKycPendingUsers, color: 'orange' },
//                     ].map((card) => (
//                         <div
//                             key={card.label}
//                             className="bg-white shadow rounded-lg p-4 flex items-center gap-4"
//                         >
//                             <div className={`rounded-full p-3 text-white ${colorMap[card.color]}`}>
//                                 <svg
//                                     className="h-6 w-6"
//                                     fill="none"
//                                     stroke="currentColor"
//                                     strokeWidth="2"
//                                     strokeLinecap="round"
//                                     strokeLinejoin="round"
//                                     viewBox="0 0 24 24"
//                                 >
//                                     <path d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
//                                 </svg>
//                             </div>
//                             <div>
//                                 <p className="text-gray-500 text-sm">{card.label}</p>
//                                 <p className="text-xl font-semibold text-gray-800">{card.value}</p>
//                             </div>
//                         </div>
//                     ))}
//                 </div>

//                 <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
//                     <div className="p-4 border-b border-gray-200">
//                         <form method="GET" className="flex gap-2">
//                             <div className="relative flex-1">
//                                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                                     <svg className="h-4 w-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
//                                         <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
//                                     </svg>
//                                 </div>
//                                 <input
//                                     type="text"
//                                     name="search"
//                                     placeholder="Search users..."
//                                     defaultValue={searchTerm}
//                                     className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                                 />
//                             </div>
//                             <button
//                                 type="submit"
//                                 className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors cursor-pointer"
//                             >
//                                 Search Client
//                             </button>

//                             {searchTerm && (
//                                 <Link
//                                     href="/users"
//                                     className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
//                                 >
//                                     Clear
//                                 </Link>
//                             )}
//                         </form>
//                     </div>
//                     {error && (
//                         <div className="bg-red-50 border-l-4 border-red-500 p-4 m-4">
//                             <div className="flex items-center gap-2 text-red-700">
//                                 <span>⚠️</span>
//                                 <p>{error}</p>
//                             </div>
//                         </div>
//                     )}
//                     {!error && users.length === 0 ? (
//                         stats.totalUsers === 0 ? (
//                             <div className="p-4 sm:p-6 md:p-8 text-center">
//                                 <div className="text-gray-400 mb-3 sm:mb-4 text-4xl">👤</div>
//                                 <h3 className="text-base sm:text-lg md:text-xl font-medium text-gray-900">
//                                     No users found
//                                 </h3>
//                                 <p className="mt-1 text-sm sm:text-base text-gray-500">
//                                     Try adjusting your search or create a new user
//                                 </p>
//                                 <div className="mt-4 sm:mt-6">
//                                     <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors">
//                                         Create New User
//                                     </button>
//                                 </div>
//                             </div>
//                         ) : (
//                             <div className="flex justify-center items-center py-20">
//                                 <svg className="animate-spin h-8 w-8 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                                     <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
//                                     <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
//                                 </svg>
//                                 <span className="ml-2 text-blue-600 text-sm">Loading users...</span>
//                             </div>
//                         )
//                     ) : (
//                         <TableOfUser
//                             users={users}
//                             token={token}
//                             questionnaires={questionarriesArray}
//                         />
//                     )}
//                 </div>

//                 <PaginationLayout
//                     currentPage={currentPage}
//                     totalPages={totalPages}
//                     search={searchTerm}
//                 />
//             </div>
//         </div >
//     );
// }

// import { cookies } from 'next/headers';
// import React from 'react';
// import LinkComponent from '../../components/LinkComponent';
// import PaginationLayout from '../../components/PaginationLayout';
// import ToggleUserStatusButton from '../../components/ToggleUserStatusButton';
// import Link from 'next/link';
// import TableOfUser from '../../components/TableOfUser';

// const colorMap = {
//     blue: 'bg-gradient-to-r from-blue-500 to-indigo-600',
//     green: 'bg-gradient-to-r from-green-500 to-emerald-600',
//     red: 'bg-gradient-to-r from-red-500 to-pink-600',
//     orange: 'bg-gradient-to-r from-orange-500 to-amber-600',
// };

// export async function fetchQuestionnaires(token) {
//     try {
//         const res = await fetch(`http://localhost:3030/api/v1/riskprofile/get/questionarries`, {
//             headers: {
//                 Authorization: `Bearer ${token}`,
//             },
//             credentials: "include",
//             cache: "no-store",
//         });
//         const questionnaires = await res.json();
//         if (res.ok) {
//             return questionnaires;
//         } else {

//         }
//     } catch (err) {
//         console.error('Error fetching questionnaires:', err);
//         return [];
//     }
// }

// export default async function AllUsersPage({ searchParams }) {
//     const cookieStore = await cookies();
//     const token = cookieStore.get('token')?.value;

//     const searchTerm = await searchParams?.search || '';
//     const currentPage = parseInt(searchParams?.page) || 1;

//     let users = [];
//     let error = null;

//     // pagination
//     let totalPages = 1;
//     const limit = 3;
//     let stats = {
//         totalUsers: 0,
//         totalActiveUsers: 0,
//         totalSuspendedUsers: 0,
//         totalKycPendingUsers: 0
//     };

//     try {
//         const sanitizedSearchTerm = searchTerm.trim();
//         const isValidSearch =
//             sanitizedSearchTerm.length > 0 &&
//             !sanitizedSearchTerm.includes('"') &&
//             !sanitizedSearchTerm.includes("'");

//         const searchQuery = isValidSearch ? `search=${sanitizedSearchTerm}&` : '';

//         const apiURL = `http://localhost:3030/api/v1/users/get-all-users?${searchQuery}page=${currentPage}&limit=${limit}`;

//         const res = await fetch(apiURL, {
//             method: 'GET',
//             headers: {
//                 Authorization: `Bearer ${token}`
//             },
//             credentials: 'include'
//         });

//         const data = await res.json();

//         if (data.success) {
//             users = data.users;
//             totalPages = data.totalPages;
//             stats = {
//                 totalUsers: data.totalUsers,
//                 totalActiveUsers: data.totalActiveUsers,
//                 totalSuspendedUsers: data.totalSuspendedUsers,
//                 totalKycPendingUsers: data.totalKycPendingUsers
//             };
//         } else {
//             error = data.message || 'Failed to fetch users';
//         }
//     } catch (err) {
//         console.error('Failed to fetch users:', err);
//         error = 'Failed to connect to server';
//     }

//     const questionarriesArray = await fetchQuestionnaires(token);

//     return (
//         <div className="min-h-screen">
//             <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-7xl mx-auto">
//                 {/* Header Section */}
//                 <div className="mb-8">
//                     <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
//                         <div className="space-y-2">
//                             <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
//                                 User Management
//                             </h1>
//                             <p className="text-gray-600 text-lg">
//                                 Manage all registered users and their account status
//                             </p>
//                         </div>

//                         <div className="flex flex-col sm:flex-row gap-3">
//                             <div className="w-full sm:w-auto">
//                                 <LinkComponent link="/createuser" textValue="+ Add Client" />
//                             </div>
//                         </div>
//                     </div>
//                 </div>

//                 {/* Stats Cards - Reduced Size */}
//                 <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6">
//                     {[
//                         {
//                             label: 'Total Users',
//                             value: stats.totalUsers,
//                             color: 'blue',
//                             icon: (
//                                 <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
//                                 </svg>
//                             )
//                         },
//                         {
//                             label: 'Active Users',
//                             value: stats.totalActiveUsers,
//                             color: 'green',
//                             icon: (
//                                 <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
//                                 </svg>
//                             )
//                         },
//                         {
//                             label: 'Suspended Users',
//                             value: stats.totalSuspendedUsers,
//                             color: 'red',
//                             icon: (
//                                 <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728L5.636 5.636m12.728 12.728L18.364 5.636M5.636 18.364l12.728-12.728" />
//                                 </svg>
//                             )
//                         },
//                         {
//                             label: 'KYC Pending',
//                             value: stats.totalKycPendingUsers,
//                             color: 'orange',
//                             icon: (
//                                 <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
//                                 </svg>
//                             )
//                         },
//                     ].map((card) => (
//                         <div
//                             key={card.label}
//                             className="group relative bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform border border-gray-100 overflow-hidden"
//                         >
//                             <div className="absolute inset-0 bg-gradient-to-br from-white to-gray-50 opacity-90"></div>
//                             <div className="relative p-3 sm:p-4">
//                                 <div className="flex items-center justify-between mb-2">
//                                     <div className={`p-2 rounded-lg ${colorMap[card.color]} text-white shadow-md`}>
//                                         {card.icon}
//                                     </div>
//                                     <div className="text-right">
//                                         <p className="text-lg sm:text-xl font-bold text-gray-900">{card.value}</p>
//                                     </div>
//                                 </div>
//                                 <h3 className="text-xs sm:text-sm font-medium text-gray-600 uppercase tracking-wide">
//                                     {card.label}
//                                 </h3>
//                             </div>
//                         </div>
//                     ))}
//                 </div>

//                 {/* Main Content Card */}
//                 <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
//                     {/* Search Section */}
//                     <div className="bg-gradient-to-r from-gray-50 to-slate-50 p-6 border-b border-gray-200">
//                         <form method="GET" className="flex flex-col sm:flex-row gap-4">
//                             <div className="relative flex-1">
//                                 <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
//                                     <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
//                                         <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
//                                     </svg>
//                                 </div>
//                                 <input
//                                     type="text"
//                                     name="search"
//                                     placeholder="Search users by name, email, or username..."
//                                     defaultValue={searchTerm}
//                                     className="block w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white shadow-sm"
//                                 />
//                             </div>
//                             <div className="flex gap-3">
//                                 <button
//                                     type="submit"
//                                     className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 font-medium shadow-lg hover:shadow-xl transform flex items-center gap-2"
//                                 >
//                                     <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
//                                     </svg>
//                                     Search
//                                 </button>

//                                 {searchTerm && (
//                                     <Link
//                                         href="/users"
//                                         className="px-6 py-3 border border-gray-300 rounded-xl hover:bg-gray-50 transition-all duration-200 font-medium flex items-center gap-2 text-gray-700"
//                                     >
//                                         <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//                                         </svg>
//                                         Clear
//                                     </Link>
//                                 )}
//                             </div>
//                         </form>
//                     </div>

//                     {/* Error State */}
//                     {error && (
//                         <div className="m-6">
//                             <div className="bg-gradient-to-r from-red-50 to-pink-50 border-l-4 border-red-500 p-6 rounded-xl shadow-sm">
//                                 <div className="flex items-center gap-3">
//                                     <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
//                                         <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.728-.833-2.498 0L4.316 16.5c-.77.833.192 2.5 1.732 2.5z" />
//                                         </svg>
//                                     </div>
//                                     <div>
//                                         <h3 className="text-red-800 font-semibold">Error</h3>
//                                         <p className="text-red-700">{error}</p>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     )}

//                     {/* Content Area */}
//                     {!error && users.length === 0 ? (
//                         stats.totalUsers === 0 ? (
//                             <div className="p-12 text-center">
//                                 <div className="w-24 h-24 bg-gradient-to-r from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
//                                     <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
//                                     </svg>
//                                 </div>
//                                 <h3 className="text-xl font-semibold text-gray-900 mb-2">
//                                     No users found
//                                 </h3>
//                                 <p className="text-gray-600 mb-6">
//                                     Try adjusting your search or create a new user to get started
//                                 </p>
//                                 <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 font-medium shadow-lg hover:shadow-xl transform hover:scale-105">
//                                     Create New User
//                                 </button>
//                             </div>
//                         ) : (
//                             <div className="flex justify-center items-center py-20">
//                                 <div className="text-center">
//                                     <div className="relative">
//                                         <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
//                                         <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-t-indigo-400 rounded-full animate-spin mx-auto" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}></div>
//                                     </div>
//                                     <p className="text-gray-600 font-medium">Loading users...</p>
//                                     <p className="text-gray-400 text-sm mt-1">Please wait while we fetch the data</p>
//                                 </div>
//                             </div>
//                         )
//                     ) : (
//                         <TableOfUser
//                             users={users}
//                             token={token}
//                             questionnaires={questionarriesArray}
//                         />
//                     )}
//                 </div>

//                 {/* Pagination */}
//                 <div className="mt-8">
//                     <PaginationLayout
//                         currentPage={currentPage}
//                         totalPages={totalPages}
//                         search={searchTerm}
//                     />
//                 </div>
//             </div>
//         </div>
// );
// }

// import { cookies } from 'next/headers';
// import React from 'react';
// import LinkComponent from '../../components/LinkComponent';
// import PaginationLayout from '../../components/PaginationLayout';
// import ToggleUserStatusButton from '../../components/ToggleUserStatusButton';
// import Link from 'next/link';
// import TableOfUser from '../../components/TableOfUser';

// const colorMap = {
//     blue: 'bg-gradient-to-r from-blue-500 to-indigo-600',
//     green: 'bg-gradient-to-r from-green-500 to-emerald-600',
//     red: 'bg-gradient-to-r from-red-500 to-pink-600',
//     orange: 'bg-gradient-to-r from-orange-500 to-amber-600',
// };

// export async function fetchQuestionnaires(token) {
//     try {
//         const res = await fetch(`http://localhost:3030/api/v1/riskprofile/get/questionarries`, {
//             headers: {
//                 Authorization: `Bearer ${token}`,
//             },
//             credentials: "include",
//             cache: "no-store",
//         });
//         const questionnaires = await res.json();
//         if (res.ok) {
//             return questionnaires;
//         } else {

//         }
//     } catch (err) {
//         console.error('Error fetching questionnaires:', err);
//         return [];
//     }
// }

// export default async function AllUsersPage({ searchParams }) {
//     const cookieStore = await cookies();
//     const token = cookieStore.get('token')?.value;

//     const searchTerm = await searchParams?.search || '';
//     const currentPage = parseInt(searchParams?.page) || 1;

//     let users = [];
//     let error = null;

//     // pagination
//     let totalPages = 1;
//     const limit = 3;
//     let stats = {
//         totalUsers: 0,
//         totalActiveUsers: 0,
//         totalSuspendedUsers: 0,
//         totalKycPendingUsers: 0
//     };

//     try {
//         const sanitizedSearchTerm = searchTerm.trim();
//         const isValidSearch =
//             sanitizedSearchTerm.length > 0 &&
//             !sanitizedSearchTerm.includes('"') &&
//             !sanitizedSearchTerm.includes("'");

//         const searchQuery = isValidSearch ? `search=${sanitizedSearchTerm}&` : '';

//         const apiURL = `http://localhost:3030/api/v1/users/get-all-users?${searchQuery}page=${currentPage}&limit=${limit}`;

//         const res = await fetch(apiURL, {
//             method: 'GET',
//             headers: {
//                 Authorization: `Bearer ${token}`
//             },
//             credentials: 'include'
//         });

//         const data = await res.json();

//         if (data.success) {
//             users = data.users;
//             totalPages = data.totalPages;
//             stats = {
//                 totalUsers: data.totalUsers,
//                 totalActiveUsers: data.totalActiveUsers,
//                 totalSuspendedUsers: data.totalSuspendedUsers,
//                 totalKycPendingUsers: data.totalKycPendingUsers
//             };
//         } else {
//             error = data.message || 'Failed to fetch users';
//         }
//     } catch (err) {
//         console.error('Failed to fetch users:', err);
//         error = 'Failed to connect to server';
//     }

//     const questionarriesArray = await fetchQuestionnaires(token);

//     return (
//         <div className="min-h-screen">
//             <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-7xl mx-auto">
//                 {/* Header Section */}
//                 <div className="mb-3">
//                     <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
//                         <div className="space-y-2">
//                             <h1 className="text-2xl md:text-2xl font-bold text-gray-800">
//                                 User Management
//                             </h1>
//                             <p className="text-gray-600 text-sm">
//                                 Manage all registered users and their account status
//                             </p>
//                         </div>

//                         <div className="flex flex-col sm:flex-row gap-3">
//                             <div className="w-full sm:w-auto">
//                                 <LinkComponent link="/createuser" textValue="+ Add Client" />
//                             </div>
//                         </div>
//                     </div>
//                 </div>

//                 {/* Stats Cards - Reduced Size */}
//                 <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-2">
//                     {[
//                         {
//                             label: 'Total Users',
//                             value: stats.totalUsers,
//                             color: 'blue',
//                             icon: (
//                                 <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
//                                 </svg>
//                             )
//                         },
//                         {
//                             label: 'Active Users',
//                             value: stats.totalActiveUsers,
//                             color: 'green',
//                             icon: (
//                                 <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
//                                 </svg>
//                             )
//                         },
//                         {
//                             label: 'Suspended Users',
//                             value: stats.totalSuspendedUsers,
//                             color: 'red',
//                             icon: (
//                                 <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728L5.636 5.636m12.728 12.728L18.364 5.636M5.636 18.364l12.728-12.728" />
//                                 </svg>
//                             )
//                         },
//                         {
//                             label: 'KYC Pending',
//                             value: stats.totalKycPendingUsers,
//                             color: 'orange',
//                             icon: (
//                                 <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
//                                 </svg>
//                             )
//                         },
//                     ].map((card) => (
//                         <div
//                             key={card.label}
//                             className="group relative bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform border border-gray-100 overflow-hidden"
//                         >
//                             <div className="absolute inset-0 bg-gradient-to-br from-white to-gray-50 opacity-90"></div>
//                             <div className="relative p-3 sm:p-4">
//                                 <div className="flex items-center justify-between mb-2">
//                                     <div className={`p-2 rounded-lg ${colorMap[card.color]} text-white shadow-md`}>
//                                         {card.icon}
//                                     </div>
//                                     <div className="text-right">
//                                         <p className="text-lg sm:text-xl font-bold text-gray-900">{card.value}</p>
//                                     </div>
//                                 </div>
//                                 <h3 className="text-xs sm:text-sm font-medium text-gray-600 uppercase tracking-wide">
//                                     {card.label}
//                                 </h3>
//                             </div>
//                         </div>
//                     ))}
//                 </div>

//                 {/* Main Content Card - Wider Table Container */}
//                 <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
//                     {/* Search Section */}
//                     <div className="bg-gradient-to-r from-gray-50 to-slate-50 p-6 border-b border-gray-200">
//                         <form method="GET" className="flex flex-col sm:flex-row gap-4">
//                             <div className="relative flex-1">
//                                 <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
//                                     <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
//                                         <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
//                                     </svg>
//                                 </div>
//                                 <input
//                                     type="text"
//                                     name="search"
//                                     placeholder="Search users by name, email, or username..."
//                                     defaultValue={searchTerm}
//                                     className="block w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white shadow-sm"
//                                 />
//                             </div>
//                             <div className="flex gap-3">
//                                 <button
//                                     type="submit"
//                                     className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 font-medium shadow-lg hover:shadow-xl transform flex items-center gap-2"
//                                 >
//                                     <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
//                                     </svg>
//                                     Search
//                                 </button>

//                                 {searchTerm && (
//                                     <Link
//                                         href="/users"
//                                         className="px-6 py-3 border border-gray-300 rounded-xl hover:bg-gray-50 transition-all duration-200 font-medium flex items-center gap-2 text-gray-700"
//                                     >
//                                         <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//                                         </svg>
//                                         Clear
//                                     </Link>
//                                 )}
//                             </div>
//                         </form>
//                     </div>

//                     {/* Error State */}
//                     {error && (
//                         <div className="m-6">
//                             <div className="bg-gradient-to-r from-red-50 to-pink-50 border-l-4 border-red-500 p-6 rounded-xl shadow-sm">
//                                 <div className="flex items-center gap-3">
//                                     <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
//                                         <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.728-.833-2.498 0L4.316 16.5c-.77.833.192 2.5 1.732 2.5z" />
//                                         </svg>
//                                     </div>
//                                     <div>
//                                         <h3 className="text-red-800 font-semibold">Error</h3>
//                                         <p className="text-red-700">{error}</p>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     )}

//                     {/* Content Area */}
//                     {!error && users.length === 0 ? (
//                         stats.totalUsers === 0 ? (
//                             <div className="p-12 text-center">
//                                 <div className="w-24 h-24 bg-gradient-to-r from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
//                                     <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
//                                     </svg>
//                                 </div>
//                                 <h3 className="text-xl font-semibold text-gray-900 mb-2">
//                                     No users found
//                                 </h3>
//                                 <p className="text-gray-600 mb-6">
//                                     Try adjusting your search or create a new user to get started
//                                 </p>
//                                 <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 font-medium shadow-lg hover:shadow-xl transform hover:scale-105">
//                                     Create New User
//                                 </button>
//                             </div>
//                         ) : (
//                             <div className="flex justify-center items-center py-20">
//                                 <div className="text-center">
//                                     <div className="relative">
//                                         <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
//                                         <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-t-indigo-400 rounded-full animate-spin mx-auto" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}></div>
//                                     </div>
//                                     <p className="text-gray-600 font-medium">Loading users...</p>
//                                     <p className="text-gray-400 text-sm mt-1">Please wait while we fetch the data</p>
//                                 </div>
//                             </div>
//                         )
//                     ) : (
//                         <div className="overflow-x-auto">
//                             <div className="min-w-full">
//                                 <TableOfUser
//                                     users={users}
//                                     token={token}
//                                     questionnaires={questionarriesArray}
//                                 />
//                             </div>
//                         </div>
//                     )}
//                 </div>

//                 {/* Pagination */}
//                 <div className="mt-8">
//                     <PaginationLayout
//                         currentPage={currentPage}
//                         totalPages={totalPages}
//                         search={searchTerm}
//                     />
//                 </div>
//             </div>
//         </div>
//     );
// }


import { cookies } from "next/headers"
import LinkComponent from "@/components/LinkComponent"
import PaginationLayout from "@/components/PaginationLayout"
import Link from "next/link"
import TableOfUser from "@/components/TableOfUser"
import { ArrowUp, ArrowDown } from "lucide-react" // Using specific icons for percentage change

export async function fetchQuestionnaires(token) {
    try {
        const res = await fetch(`http://localhost:3030/api/v1/riskprofile/get/questionarries`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            cache: "no-store",
        })
        const questionnaires = await res.json()
        if (res.ok) {
            return questionnaires
        } else {
            console.error("Failed to fetch questionnaires:", questionnaires)
            return []
        }
    } catch (err) {
        console.error("Error fetching questionnaires:", err)
        return []
    }
}

export default async function AllUsersPage({ searchParams }) {
    const cookieStore = await cookies()
    const token = cookieStore.get("token")?.value

    if (!token) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center p-8 bg-white rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">Authentication Required</h2>
                    <p className="text-gray-600">Please log in to view this page.</p>
                </div>
            </div>
        )
    }

    const searchTerm = searchParams?.search || ""
    const currentPage = Number.parseInt(searchParams?.page || "1")
    let users = []
    let error = null
    let totalPages = 1
    const limit = 5
    let stats = {
        totalUsers: 0,
        totalActiveUsers: 0,
        totalSuspendedUsers: 0,
        totalKycPendingUsers: 0,
    }

    try {
        const sanitizedSearchTerm = searchTerm.trim()
        const isValidSearch =
            sanitizedSearchTerm.length > 0 && !sanitizedSearchTerm.includes('"') && !sanitizedSearchTerm.includes("'")
        const searchQuery = isValidSearch ? `search=${encodeURIComponent(sanitizedSearchTerm)}&` : ""
        const apiURL = `http://localhost:3030/api/v1/users/get-all-users?${searchQuery}page=${currentPage}&limit=${limit}`
        const res = await fetch(apiURL, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        const data = await res.json()
        if (data.success) {
            users = data.users
            totalPages = data.totalPages
            stats = {
                totalUsers: data.totalUsers,
                totalActiveUsers: data.totalActiveUsers,
                totalSuspendedUsers: data.totalSuspendedUsers,
                totalKycPendingUsers: data.totalKycPendingUsers,
            }
        } else {
            error = data.message || "Failed to fetch users"
        }
    } catch (err) {
        console.error("Failed to fetch users:", err)
        error = "Failed to connect to server"
    }

    const questionarriesArray = await fetchQuestionnaires(token)

    // Data for the dashboard cards, adjusted to match the image
    const dashboardCardsData = [
        {
            label: "Totals Users",
            value: stats.totalUsers, // Hardcoded to match image, replace with actual stat if available
            change: stats.totalUsers,
            changeType: "increase", // 'increase' or 'decrease'
            timeframe: "Views (7 Days)",
        },
        {
            label: "Active Users",
            value: stats.totalActiveUsers, // Hardcoded to match image
            change: "-1",
            changeType: "decrease",
            timeframe: "Past (7 Days)",
        },
        {
            label: "Suspended Users",
            value: stats.totalSuspendedUsers, // Hardcoded to match image
            change: "0",
            changeType: "increase",
            timeframe: "Past (7 Days)",
        },
        {
            label: "KYC Pending",
            value: stats.totalKycPendingUsers, // Hardcoded to match image
            change: "0",
            changeType: "increase",
            timeframe: "(Past 5 days)",
            valueColor: "text-black-600", // Specific color for this card's value
            hasChart: true,
        },
    ]

    return (
        <div className="min-h-screen">
            <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-7xl mx-auto">
                {/* Header Section */}
                <div className="mb-3">
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                        <div className="space-y-2">
                            <h1 className="text-3xl font-bold text-[var(--dashboard-text-dark)]">User Management</h1>
                            <p className="text-gray-600 text-sm">Manage all registered users and their account status</p>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-3">
                            <div className="w-full sm:w-auto">
                                <LinkComponent link="/createuser" textValue="+ Add Client" />
                            </div>
                        </div>
                    </div>
                </div>
                {/* Stats Cards - Dashboard Style (Tailwind CSS only) */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 mb-2">
                    {/* <div className="grid grid-cols-2 lg:grid-cols-4 gap-1 sm:gap-2 mb-2 max-w-[96%] mx-auto"> */}
                    {dashboardCardsData.map((card) => (
                        <div
                            key={card.label}
                            className="rounded-sm border border-gray-200 bg-white shadow-xs p-3 flex flex-col justify-between"
                        >
                            <div className="flex flex-col gap-0.5">
                                <h3 className="text-xs font-medium text-gray-500">{card.label}</h3>
                                <div className="flex items-center gap-1.5">
                                    <div className={`text-xl font-semibold ${card.valueColor || "text-gray-800"}`}>
                                        {card.value}
                                    </div>
                                    <span
                                        className={`inline-flex items-center rounded-full px-1.5 py-0.5 text-[0.65rem] font-semibold ${card.changeType === "increase"
                                            ? "bg-green-50 text-green-600"
                                            : "bg-red-50 text-red-600"
                                            }`}
                                    >
                                        {card.change}
                                        {card.changeType === "increase" ? (
                                            <ArrowUp className="ml-0.5 h-2.5 w-2.5" />
                                        ) : (
                                            <ArrowDown className="ml-0.5 h-2.5 w-2.5" />
                                        )}
                                    </span>
                                </div>
                                <p className="text-xs text-gray-400">{card.timeframe}</p>
                            </div>

                        </div>
                    ))}
                </div>
                {/* Main Content Card - Wider Table Container */}
                <div className="bg-white rounded-lg shadow-xl border border-gray-200 overflow-hidden">
                    {/* Search Section */}
                    <div className="bg-gradient-to-r from-gray-50 to-slate-50 p-6 border-b border-gray-200">
                        <form method="GET" className="flex flex-col sm:flex-row gap-4">
                            <div className="relative flex-1">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                                        <path
                                            fillRule="evenodd"
                                            d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </div>
                                <input
                                    type="text"
                                    name="search"
                                    placeholder="Search users by name, email, or username..."
                                    defaultValue={searchTerm}
                                    className="block w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white shadow-sm"
                                />
                            </div>
                            <div className="flex gap-3">
                                <button
                                    type="submit"
                                    className="px-6 py-3 bg-gradient-to-r from-[#00d09c] to-[#00b98b] text-white rounded-xl cursor-pointer hover:from-[#00d09c] hover:to-[#00b98b]  transition-all duration-200 font-medium shadow-lg hover:shadow-xl transform flex items-center gap-2"
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                        />
                                    </svg>
                                    Search
                                </button>
                                {searchTerm && (
                                    <Link
                                        href="/users"
                                        className="px-6 py-3 border border-gray-300 rounded-xl hover:bg-gray-50 transition-all duration-200 font-medium flex items-center gap-2 text-gray-700"
                                    >
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                        Clear
                                    </Link>
                                )}
                            </div>
                        </form>
                    </div>
                    {/* Error State */}
                    {error && (
                        <div className="m-6">
                            <div className="bg-gradient-to-r from-red-50 to-pink-50 border-l-4 border-red-500 p-6 rounded-xl shadow-sm">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                                        <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.728-.833-2.498 0L4.316 16.5c-.77.833.192 2.5 1.732 2.5z"
                                            />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="text-red-800 font-semibold">Error</h3>
                                        <p className="text-red-700">{error}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                    {/* Content Area */}
                    {!error && users.length === 0 ? (
                        stats.totalUsers === 0 ? (
                            <div className="p-12 text-center">
                                <div className="w-24 h-24 bg-gradient-to-r from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                                        />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-2">No users found</h3>
                                <p className="text-gray-600 mb-6">Try adjusting your search or create a new user to get started</p>
                                <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 font-medium shadow-lg hover:shadow-xl transform hover:scale-105">
                                    Create New User
                                </button>
                            </div>
                        ) : (
                            <div className="flex justify-center items-center py-20">
                                <div className="text-center">
                                    <div className="relative">
                                        <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
                                        <div
                                            className="absolute inset-0 w-16 h-16 border-4 border-transparent border-t-indigo-400 rounded-full animate-spin mx-auto"
                                            style={{ animationDirection: "reverse", animationDuration: "1.5s" }}
                                        ></div>
                                    </div>
                                    <p className="text-gray-600 font-medium">Loading users...</p>
                                    <p className="text-gray-400 text-sm mt-1">Please wait while we fetch the data</p>
                                </div>
                            </div>
                        )
                    ) : (
                        <div className="overflow-x-auto">
                            <div className="min-w-full">
                                <TableOfUser users={users} token={token} questionnaires={questionarriesArray} />
                            </div>
                        </div>
                    )}
                </div>
                {/* Pagination */}
                <div className="mt-8">
                    <PaginationLayout currentPage={currentPage} totalPages={totalPages} search={searchTerm} />
                </div>
            </div>
        </div>
    )
}
