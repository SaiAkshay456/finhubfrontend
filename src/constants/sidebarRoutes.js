
import { FaHome, FaUserCircle, FaEnvelope } from "react-icons/fa";
import { FiSettings, FiLogOut, FiFileText } from "react-icons/fi";
import { CiLogout } from "react-icons/ci";
import { TiUserAdd } from "react-icons/ti";
import { FaUsers } from "react-icons/fa";
import { HiOutlineViewGrid } from "react-icons/hi";
import { MdWorkOutline } from "react-icons/md";
import { IoIosNotificationsOutline } from "react-icons/io";
import { MdOutlineRecommend } from "react-icons/md";
import { BsBank2 } from "react-icons/bs";
// import AssuredWorkloadIcon from '@mui/icons-material/AssuredWorkload';
import { FaShieldAlt } from "react-icons/fa";
import { FaFileUpload } from "react-icons/fa";
// 
// import DashboardIcon from '@mui/icons-material/Dashboard';
import { MdDashboard } from "react-icons/md";
import { CiBank } from "react-icons/ci";
import { BiCategory } from "react-icons/bi"; // Add category icon

export const sidebarItems = [
    {
        label: "Dashboard",
        path: "/",
        icon: MdDashboard,
        description: "Dashboard page",
    },
    {
        label: "Users",
        path: "/users",
        icon: FaUsers,
        description: "User dashboard with summary and insights",
    },
    {
        label: "Create User",
        path: "/createuser",
        icon: TiUserAdd,
        description: "Track job or internship applications",
    },
    {
        label: "Model Basket",
        path: "/baskets",
        icon: MdOutlineRecommend,
        description: "For employers to post new jobs or internships",
    },
    {
        label: "Categories",
        path: "/categories",
        icon: BiCategory,
        description: "Manage categories and assignments for financial instruments",
    },
    {
        label: "KYC Verification",
        path: "/kycverify",
        icon: BsBank2,
        description: "Account and app preferences",
    },
    {
        label: "Risk Profiling",
        path: "/riskprofile",
        icon: FaShieldAlt,
        description: "Risk Profiling",
    },
    {
        label: "Portfolio Upload",
        path: "/upload-portfolio",
        icon: FaFileUpload,
<<<<<<< HEAD
        description: "Upload user's portfolio file",
    },
    {
        label: "Recommendations",
        path: "/recommendations",
        icon: MdOutlineRecommend,
        description: "Fund or asset recommendations based on risk profile",
    },
    {
        label: "Benchmarks",                     
        path: "/benchmarks",
        icon: HiOutlineViewGrid,
        description: "Benchmark portfolio performance with indices",
=======
        description: "Upload protfolio"
    },
    {
        label: "Fill Response",
        path: "/fill-response",
        icon: FaFileUpload,
        description: "Upload protfolio"
>>>>>>> f-r/revamp
    }

];

// try {
//     isLoading = true;
//     if(searchTerm.length>0){

//     }
//     const res = await fetch(`${backend_url}/api/v1/users/get-all-users?search=${searchTerm}&page=${currentPage}&limit=${limit}`, {
//         method: 'GET',
//         headers: {
//             Authorization: `Bearer ${token}`
//         },
//         // cache: 'no-store',
//         credentials: 'include'
//     });


//     const data = await res.json();
//     if (data.success) {
//         users = data.users;
//         totalPages = data.totalPages;
//         stats = {
//             totalUsers: data.totalUsers,
//             totalActiveUsers: data.totalActiveUsers,
//             totalSuspendedUsers: data.totalSuspendedUsers,
//             totalKycPendingUsers: data.totalKycPendingUsers
//         };
//         // currentPage = data.currentPage
//     } else {
//         error = data.message || 'Failed to fetch users';
//     }
// } catch (err) {
//     console.error('Failed to fetch users:', err);
//     error = 'Failed to connect to server';
// } finally {
//     isLoading = false;
// }

//try of users page.js



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
//         const res = await fetch(`http://localhost:3030/v1/riskprofile/get/questionarries`, {
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

//         const apiURL = `http://localhost:3030/v1/users/get-all-users?${searchQuery}page=${currentPage}&limit=${limit}`;

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
