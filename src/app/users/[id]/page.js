// "use client";
// import KycFormUser from "../../../components/KycFormUser";
// import Link from "next/link";

// import { API_BASE, USER_MANAGE_ROUTES } from "@/helpers/apiRoutes";
// import { SubscriptionModal } from "@/components/SubscriptionModal";
// import UserExtraSections from "../../../components/UserExtraSections";
// import PortfolioUpload from "../../../components/PortfolioUpload"
// import KycModal from "@/components/KycModal";
// import clientAxiosInstance from "@/lib/clientAxios";
// export default async function UserDetailsPage({ params }) {
//     let loading = false;
//     const { id } = params;
//     let user, error;
//     let kycDetails;
//     try {
//         loading = true;
//         const { data } = await clientAxiosInstance.get(`${API_BASE}/${USER_MANAGE_ROUTES.GET_USER_DETAILS}/${id}`);
//         user = data.success ? data.user : null;
//         kycDetails = data.success ? data.kycDetails : null;
//         loading = false;
//     } catch (err) {
//         error = 'Failed to fetch user details';
//         loading = false;
//         console.log(err);
//     }
//     if (loading) {
//         return <div className="flex items-center justify-center h-screen">
//             <div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>
//         </div>
//     }
//     if (error) return (
//         <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
//             <div className="bg-white rounded-lg shadow-md border-l-4 border-red-500 p-6 max-w-md w-full">
//                 <div className="flex items-center">
//                     <svg className="w-6 h-6 text-red-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//                     </svg>
//                     <div>
//                         <h3 className="text-lg font-semibold text-red-800">Error</h3>
//                         <p className="text-red-600">{error}</p>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );

//     if (!user) return (
//         <div className="min-h-screen bg-slate-100 flex items-center justify-center">
//             <div className="bg-white rounded-lg shadow-md p-8 text-center">
//                 <div className="animate-spin h-10 w-10 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
//                 <p className="text-gray-600 font-medium">Loading client information...</p>
//             </div>
//         </div>
//     );

//     const formatDate = (dateString) => {
//         if (!dateString) return 'N/A';
//         const date = new Date(dateString);
//         return date.toLocaleDateString('en-US', {
//             year: 'numeric',
//             month: 'short',
//             day: 'numeric'
//         });
//     };

//     return (
//         <div className="min-h-screen ">
//             {/* Header Bar */}
//             {/* <div className="bg-white shadow-sm">
//                 <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//                     <div className="flex items-center justify-between py-4">
//                         <div className="flex items-center space-x-4">
//                             <Link href="/users" className="text-gray-400 hover:text-gray-600 transition-colors">
//                                 <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
//                                 </svg>
//                             </Link>
//                             <div>
//                                 <h1 className="text-2xl font-bold text-gray-900">Client Profile</h1>
//                                 <p className="text-sm text-gray-500">View and manage client information</p>
//                             </div>
//                         </div>
//                         <Link
//                             href={`/users/update/${id}`}
//                             className="inline-flex items-center px-3 py-2 border border-transparent text-base font-medium rounded-md text-white bg-gradient-to-r from-[#00d09c] to-[#00b98b] hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
//                         >
//                             <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
//                             </svg>
//                             Manage Client
//                         </Link>
//                         <SubscriptionModal />
//                     </div>
//                 </div>
//             </div> */}
//             <div className="bg-white shadow-sm">
//                 <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//                     <div className="flex items-center justify-between py-4">

//                         {/* Left Side: Back and Title */}
//                         <div className="flex items-center space-x-4">
//                             <Link href="/users" className="text-gray-400 hover:text-gray-600 transition-colors">
//                                 <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
//                                 </svg>
//                             </Link>
//                             <div>
//                                 <h1 className="text-2xl font-bold text-gray-900">Client Profile</h1>
//                                 <p className="text-sm text-gray-500">View and manage client information</p>
//                             </div>
//                         </div>

//                         {/* Right Side: Buttons */}
//                         <div className="flex items-center space-x-3">
//                             <Link
//                                 href={`/users/update/${id}`}
//                                 className="inline-flex items-center px-3 py-2 border border-transparent text-base font-medium rounded-md text-white bg-gradient-to-r from-[#00d09c] to-[#00b98b] hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
//                             >
//                                 <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
//                                 </svg>
//                                 Manage Client
//                             </Link>
//                             <SubscriptionModal />
//                         </div>
//                     </div>
//                 </div>
//             </div>
//             <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//                 {/* KYC Form */}
//                 {!user.status.isKycCompleted && (
//                     <div className="mb-8">
//                         <KycFormUser userId={user._id} />
//                     </div>
//                 )}

//                 {/* Profile Header Section */}
//                 <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
//                     <div className="px-6 py-6">
//                         <div className="flex flex-col md:flex-row md:items-center md:justify-between">
//                             <div className="flex items-center space-x-4">
//                                 <div className="flex-shrink-0">
//                                     <div className="w-20 h-20 bg-gradient-to-r from-[#00d09c] to-[#00b98b] to-purple-600 rounded-full flex items-center justify-center shadow-lg">
//                                         <span className="text-2xl font-semibold text-white">
//                                             {user.firstName?.charAt(0)}{user.lastName?.charAt(0)}
//                                         </span>
//                                     </div>
//                                 </div>
//                                 <div className="flex-1">
//                                     <h2 className="text-xl font-semibold text-gray-900 mb-1">
//                                         {user.firstName} {user.lastName}
//                                     </h2>
//                                     <p className="text-sm text-gray-600 mb-2">@{user.username}</p>
//                                     <div className="flex flex-wrap gap-2">
//                                         <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${user.isActive
//                                             ? 'bg-green-100 text-green-800 ring-1 ring-green-600/20'
//                                             : 'bg-red-100 text-red-800 ring-1 ring-red-600/20'
//                                             }`}>
//                                             <span className={`w-2 h-2 rounded-full mr-1 ${user.isActive ? 'bg-green-500' : 'bg-red-500'
//                                                 }`}></span>
//                                             {user.isActive ? 'Active' : 'Suspended'}
//                                         </span>
//                                         <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${user.status.isKycCompleted
//                                             ? 'bg-green-100 text-green-800 ring-1 ring-green-600/20'
//                                             : 'bg-yellow-100 text-yellow-800 ring-1 ring-yellow-600/20'
//                                             }`}>
//                                             {user.status.isKycCompleted ? 'KYC Verified' : 'KYC Pending'}
//                                         </span>
//                                         <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 ring-1 ring-blue-600/20 capitalize">
//                                             {user.role}
//                                         </span>
//                                     </div>
//                                 </div>
//                             </div>
//                             <div className="mt-6 md:mt-0 md:ml-4">
//                                 <div className="bg-gray-50 rounded-lg p-3 min-w-[180px]">
//                                     <div className="text-center">
//                                         <div className="text-lg font-semibold text-gray-900 mb-0.5">
//                                             {user.status.onBoardingStatus ? user.riskCategory : 'Pending'}
//                                         </div>
//                                         <div className="text-xs text-gray-600">Risk Profile</div>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>


//                 {/* Information Tabs/Sections */}
//                 <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//                     {/* Personal Details */}
//                     <div className="bg-white rounded-lg shadow-sm border border-gray-200">
//                         <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
//                             <h3 className="text-lg font-semibold text-gray-900 flex items-center">
//                                 <svg className="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
//                                 </svg>
//                                 Personal Details
//                             </h3>
//                         </div>
//                         <div className="px-6 py-4 space-y-4">
//                             <div>
//                                 <dt className="text-sm font-medium text-gray-500">Full Name</dt>
//                                 <dd className="mt-1 text-sm text-gray-900 font-medium">{user.firstName} {user.lastName}</dd>
//                             </div>
//                             <div>
//                                 <dt className="text-sm font-medium text-gray-500">Date of Birth</dt>
//                                 <dd className="mt-1 text-sm text-gray-900 font-medium">{formatDate(user.dob)}</dd>
//                             </div>
//                             <div>
//                                 <dt className="text-sm font-medium text-gray-500">Gender</dt>
//                                 <dd className="mt-1 text-sm text-gray-900 font-medium capitalize">{user.gender || 'N/A'}</dd>
//                             </div>
//                             <div>
//                                 <dt className="text-sm font-medium text-gray-500">Account Type</dt>
//                                 <dd className="mt-1 text-sm text-gray-900 font-medium capitalize">{user.role}</dd>
//                             </div>
//                         </div>
//                     </div>

//                     {/* Contact Information */}
//                     <div className="bg-white rounded-lg shadow-sm border border-gray-200">
//                         <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
//                             <h3 className="text-lg font-semibold text-gray-900 flex items-center">
//                                 <svg className="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 7.89a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
//                                 </svg>
//                                 Contact Information
//                             </h3>
//                         </div>
//                         <div className="px-6 py-4 space-y-4">
//                             <div>
//                                 <dt className="text-sm font-medium text-gray-500">Email Address</dt>
//                                 <dd className="mt-1 text-sm text-gray-900 font-medium break-all">{user.email}</dd>
//                             </div>
//                             <div>
//                                 <dt className="text-sm font-medium text-gray-500">Phone Number</dt>
//                                 <dd className="mt-1 text-sm text-gray-900 font-medium">{user.phoneNumber || 'N/A'}</dd>
//                             </div>
//                             <div>
//                                 <dt className="text-sm font-medium text-gray-500">Member Since</dt>
//                                 <dd className="mt-1 text-sm text-gray-900 font-medium">{formatDate(user.createdAt)}</dd>
//                             </div>
//                             <div>
//                                 <dt className="text-sm font-medium text-gray-500">Last Updated</dt>
//                                 <dd className="mt-1 text-sm text-gray-900 font-medium">{formatDate(user.updatedAt)}</dd>
//                             </div>
//                         </div>
//                     </div>

//                     {/* Account Status */}
//                     <div className="bg-white rounded-lg shadow-sm border border-gray-200">
//                         <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
//                             <h3 className="text-lg font-semibold text-gray-900 flex items-center">
//                                 <svg className="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
//                                 </svg>
//                                 Account Status
//                             </h3>
//                         </div>
//                         <div className="px-6 py-4 space-y-4">
//                             <div className="flex items-center justify-between">
//                                 <span className="text-sm font-medium text-gray-500">Account Active</span>
//                                 <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${user.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
//                                     }`}>
//                                     {user.isActive ? 'Yes' : 'No'}
//                                 </span>
//                             </div>
//                             <div className="flex items-center justify-between">
//                                 <span className="text-sm font-medium text-gray-500">KYC Completed</span>
//                                 <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${user.status.isKycCompleted ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
//                                     }`}>
//                                     {user.status.isKycCompleted ? 'Yes' : 'Pending'}
//                                 </span>
//                             </div>
//                             <div className="flex items-center justify-between">
//                                 <span className="text-sm font-medium text-gray-500">Onboarding</span>
//                                 <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${user.status.onBoardingStatus ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
//                                     }`}>
//                                     {user.status.onBoardingStatus ? 'Complete' : 'Pending'}
//                                 </span>
//                             </div>
//                             <div className="pt-2 border-t">
//                                 <span className="text-sm font-medium text-gray-500">Risk Category</span>
//                                 <p className="mt-1 text-sm text-gray-900 font-medium capitalize">
//                                     {user.status.onBoardingStatus ? user.riskCategory : 'Not Assessed'}
//                                 </p>
//                             </div>
//                             <div className="pt-2 border-t">
//                                 <span className="text-sm font-medium text-gray-500">KYC Details</span>
//                                 {user.status.isKycCompleted && kycDetails && (
//                                     <KycModal kycDetails={kycDetails} />
//                                 )}
//                             </div>

//                         </div>
//                     </div>
//                 </div>
//                 {/* Permissions Section */}
//                 <div className="mt-6 bg-white rounded-lg shadow-sm border border-gray-200">
//                     <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
//                         <div className="flex items-center justify-between">
//                             <h3 className="text-lg font-semibold text-gray-900 flex items-center">
//                                 <svg className="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
//                                 </svg>
//                                 Client Permissions
//                             </h3>
//                             {user.sidebar?.length > 0 && (
//                                 <div className="text-sm text-gray-600">
//                                     {user.sidebar.filter(p => p.access).length} / {user.sidebar.length} enabled
//                                 </div>
//                             )}
//                         </div>
//                     </div>

//                     <div className="px-6 py-4">
//                         {user.sidebar?.length > 0 ? (
//                             <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
//                                 {user.sidebar.map((permission, index) => (
//                                     <div key={index} className={`flex items-center justify-between p-3 rounded-lg border transition-colors ${permission.access
//                                         ? 'border-green-200 bg-green-50'
//                                         : 'border-gray-200 bg-gray-50'
//                                         }`}>
//                                         <div className="flex items-center space-x-2 min-w-0 flex-1">
//                                             <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${permission.access
//                                                 ? 'bg-green-500 text-white'
//                                                 : 'bg-gray-400 text-white'
//                                                 }`}>
//                                                 {permission.access ? (
//                                                     <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
//                                                     </svg>
//                                                 ) : (
//                                                     <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//                                                     </svg>
//                                                 )}
//                                             </div>
//                                             <p className="text-sm font-medium text-gray-900 truncate">
//                                                 {permission.label}
//                                             </p>
//                                         </div>
//                                     </div>
//                                 ))}
//                             </div>
//                         ) : (
//                             <div className="text-center py-8">
//                                 <svg className="mx-auto h-8 w-8 text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
//                                 </svg>
//                                 <p className="text-sm text-gray-500">No permissions configured</p>
//                             </div>
//                         )}
//                     </div>
//                 </div>
//                 <UserExtraSections user={id} />
//                 <div className="mt-6">
//                     <PortfolioUpload userId={user._id} />
//                 </div>
//             </div>
//         </div >
//     );
// }


'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import KycFormUser from "../../../components/KycFormUser";
import Link from "next/link";
import { API_BASE, USER_MANAGE_ROUTES } from "@/helpers/apiRoutes";
import { SubscriptionModal } from "@/components/SubscriptionModal";
import UserExtraSections from "../../../components/UserExtraSections";
import PortfolioUpload from "../../../components/PortfolioUpload"
import KycModal from "@/components/KycModal";
import clientAxiosInstance from '@/lib/clientAxios';

export default function UserDetailsPage({ params }) {
    const router = useRouter();
    const { id } = params;

    const [user, setUser] = useState(null);
    const [kycDetails, setKycDetails] = useState(null);
    const [portfolio, setPortfolio] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                const { data } = await clientAxiosInstance.get(`${API_BASE}/${USER_MANAGE_ROUTES.GET_USER_DETAILS}/${id}`);
                if (data.success) {
                    setUser(data.user);
                    setKycDetails(data.kycDetails);
                    setPortfolio(data.latestPortfolio);
                } else {
                    setError('Failed to fetch user details');
                }
            } catch (err) {
                setError('Failed to fetch user details');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchUserDetails();
    }, [id, router]);

    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    const formatCurrency = (value) => {
        return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(value);
    };

    // Conditional rendering based on state
    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
                <div className="bg-white rounded-lg shadow-md border-l-4 border-red-500 p-6 max-w-md w-full">
                    <div className="flex items-center">
                        <svg className="w-6 h-6 text-red-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <div>
                            <h3 className="text-lg font-semibold text-red-800">Error</h3>
                            <p className="text-red-600">{error}</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (!user) {
        return (
            <div className="min-h-screen bg-slate-100 flex items-center justify-center">
                <div className="bg-white rounded-lg shadow-md p-8 text-center">
                    <div className="animate-spin h-10 w-10 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
                    <p className="text-gray-600 font-medium">Loading client information...</p>
                </div>
            </div>
        );
    }

    // Main component render
    return (
        <div className="min-h-screen ">
            {/* Header Bar */}
            <div className="bg-white shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between py-4">
                        {/* Left Side: Back and Title */}
                        <div className="flex items-center space-x-4">
                            <Link href="/users" className="text-gray-400 hover:text-gray-600 transition-colors">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                                </svg>
                            </Link>
                            <div>
                                <h1 className="text-2xl font-bold text-gray-900">Client Profile</h1>
                                <p className="text-sm text-gray-500">View and manage client information</p>
                            </div>
                        </div>

                        {/* Right Side: Buttons */}
                        <div className="flex items-center space-x-3">
                            <Link
                                href={`/users/update/${id}`}
                                className="inline-flex items-center px-3 py-2 border border-transparent text-base font-medium rounded-md text-white bg-gradient-to-r from-[#00d09c] to-[#00b98b] hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                            >
                                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                </svg>
                                Manage Client
                            </Link>
                            <SubscriptionModal />
                        </div>
                    </div>
                </div>
            </div>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* KYC Form */}
                {!user.status.isKycCompleted && (
                    <div className="mb-8">
                        <KycFormUser userId={user._id} />
                    </div>
                )}

                {/* Profile Header Section */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
                    <div className="px-6 py-6">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                            <div className="flex items-center space-x-4">
                                <div className="flex-shrink-0">
                                    <div className="w-20 h-20 bg-gradient-to-r from-[#00d09c] to-[#00b98b] rounded-full flex items-center justify-center shadow-lg">
                                        <span className="text-2xl font-semibold text-white">
                                            {user.firstName?.charAt(0)}{user.lastName?.charAt(0)}
                                        </span>
                                    </div>
                                </div>
                                <div className="flex-1">
                                    <h2 className="text-xl font-semibold text-gray-900 mb-1">
                                        {user.firstName} {user.lastName}
                                    </h2>
                                    <p className="text-sm text-gray-600 mb-2">@{user.username}</p>
                                    <div className="flex flex-wrap gap-2">
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${user.isActive
                                            ? 'bg-green-100 text-green-800 ring-1 ring-green-600/20'
                                            : 'bg-red-100 text-red-800 ring-1 ring-red-600/20'
                                            }`}>
                                            <span className={`w-2 h-2 rounded-full mr-1 ${user.isActive ? 'bg-green-500' : 'bg-red-500'
                                                }`}></span>
                                            {user.isActive ? 'Active' : 'Suspended'}
                                        </span>
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${user.status.isKycCompleted
                                            ? 'bg-green-100 text-green-800 ring-1 ring-green-600/20'
                                            : 'bg-yellow-100 text-yellow-800 ring-1 ring-yellow-600/20'
                                            }`}>
                                            {user.status.isKycCompleted ? 'KYC Verified' : 'KYC Pending'}
                                        </span>
                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 ring-1 ring-blue-600/20 capitalize">
                                            {user.role}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-6 md:mt-0 md:ml-4">
                                <div className="bg-gray-50 rounded-lg p-3 min-w-[180px]">
                                    <div className="text-center">
                                        <div className="text-lg font-semibold text-gray-900 mb-0.5">
                                            {user.status.onBoardingStatus ? user.riskCategory : 'Pending'}
                                        </div>
                                        <div className="text-xs text-gray-600">Risk Profile</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Information Tabs/Sections */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Personal Details */}
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                        <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
                            <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                                <svg className="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                                Personal Details
                            </h3>
                        </div>
                        <div className="px-6 py-4 space-y-4">
                            <div>
                                <dt className="text-sm font-medium text-gray-500">Full Name</dt>
                                <dd className="mt-1 text-sm text-gray-900 font-medium">{user.firstName} {user.lastName}</dd>
                            </div>
                            <div>
                                <dt className="text-sm font-medium text-gray-500">Date of Birth</dt>
                                <dd className="mt-1 text-sm text-gray-900 font-medium">{formatDate(user.dob)}</dd>
                            </div>
                            <div>
                                <dt className="text-sm font-medium text-gray-500">Gender</dt>
                                <dd className="mt-1 text-sm text-gray-900 font-medium capitalize">{user.gender || 'N/A'}</dd>
                            </div>
                            <div>
                                <dt className="text-sm font-medium text-gray-500">Account Type</dt>
                                <dd className="mt-1 text-sm text-gray-900 font-medium capitalize">{user.role}</dd>
                            </div>
                        </div>
                    </div>

                    {/* Contact Information */}
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                        <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
                            <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                                <svg className="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 7.89a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                                Contact Information
                            </h3>
                        </div>
                        <div className="px-6 py-4 space-y-4">
                            <div>
                                <dt className="text-sm font-medium text-gray-500">Email Address</dt>
                                <dd className="mt-1 text-sm text-gray-900 font-medium break-all">{user.email}</dd>
                            </div>
                            <div>
                                <dt className="text-sm font-medium text-gray-500">Phone Number</dt>
                                <dd className="mt-1 text-sm text-gray-900 font-medium">{user.phoneNumber || 'N/A'}</dd>
                            </div>
                            <div>
                                <dt className="text-sm font-medium text-gray-500">Member Since</dt>
                                <dd className="mt-1 text-sm text-gray-900 font-medium">{formatDate(user.createdAt)}</dd>
                            </div>
                            <div>
                                <dt className="text-sm font-medium text-gray-500">Last Updated</dt>
                                <dd className="mt-1 text-sm text-gray-900 font-medium">{formatDate(user.updatedAt)}</dd>
                            </div>
                        </div>
                    </div>

                    {/* Account Status */}
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                        <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
                            <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                                <svg className="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                Account Status
                            </h3>
                        </div>
                        <div className="px-6 py-4 space-y-4">
                            <div className="flex items-center justify-between">
                                <span className="text-sm font-medium text-gray-500">Account Active</span>
                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${user.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                    }`}>
                                    {user.isActive ? 'Yes' : 'No'}
                                </span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-sm font-medium text-gray-500">KYC Completed</span>
                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${user.status.isKycCompleted ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                                    }`}>
                                    {user.status.isKycCompleted ? 'Yes' : 'Pending'}
                                </span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-sm font-medium text-gray-500">Onboarding</span>
                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${user.status.onBoardingStatus ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                                    }`}>
                                    {user.status.onBoardingStatus ? 'Complete' : 'Pending'}
                                </span>
                            </div>
                            <div className="pt-2 border-t">
                                <span className="text-sm font-medium text-gray-500">Risk Category</span>
                                <p className="mt-1 text-sm text-gray-900 font-medium capitalize">
                                    {user.status.onBoardingStatus ? user.riskCategory : 'Not Assessed'}
                                </p>
                            </div>
                            <div className="pt-2 border-t">
                                <span className="text-sm font-medium text-gray-500">KYC Details</span>
                                {user.status.isKycCompleted && kycDetails && (
                                    <KycModal kycDetails={kycDetails} />
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                <UserExtraSections user={id} />
                <div className="mt-6">
                    <PortfolioUpload userId={user._id} />
                </div>
                {portfolio && portfolio.data && portfolio.data.length > 0 && (
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 mt-6">
                        <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
                            <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                                <svg className="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c1.657 0 3 1.343 3 3s-1.343 3-3 3-3-1.343-3-3 1.343-3 3-3z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18s-3-3-3-5a5 5 0 0110 0c0 2-3 5-3 5z" />
                                </svg>
                                Latest Portfolio Overview
                            </h3>
                        </div>
                        <div className="px-6 py-4 space-y-4">
                            {/* Summary Section */}
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 border-b pb-4 mb-4">
                                <div>
                                    <dt className="text-sm font-medium text-gray-500">Total Market Value</dt>
                                    <dd className="mt-1 text-xl font-bold text-green-600">{formatCurrency(portfolio.data[0].totalMarketValue)}</dd>
                                </div>
                                <div>
                                    <dt className="text-sm font-medium text-gray-500">Total Cost Value</dt>
                                    <dd className="mt-1 text-xl font-bold text-gray-900">{formatCurrency(portfolio.data[0].totalCostValue)}</dd>
                                </div>
                                <div>
                                    <dt className="text-sm font-medium text-gray-500">Gain/Loss</dt>
                                    <dd className={`mt-1 text-xl font-bold ${portfolio.data[0].totalMarketValue >= portfolio.data[0].totalCostValue ? 'text-green-600' : 'text-red-600'}`}>
                                        {formatCurrency(portfolio.data[0].totalMarketValue - portfolio.data[0].totalCostValue)}
                                    </dd>
                                </div>
                            </div>

                            {/* Funds Details Section */}
                            <div>
                                <h4 className="text-md font-semibold text-gray-800 mb-3">Funds Breakdown</h4>
                                <div className="space-y-4">
                                    {portfolio.data.map((fund, index) => (
                                        <div key={index} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                                            <div className="flex justify-between items-center mb-2">
                                                <h5 className="text-sm font-semibold text-gray-900">{fund.fundName}</h5>
                                                <span className="text-xs font-medium text-gray-500">ISIN: {fund.isin}</span>
                                            </div>
                                            <dl className="grid grid-cols-2 sm:grid-cols-4 gap-x-4 gap-y-2 text-sm">
                                                <div>
                                                    <dt className="text-gray-500">Folio No.</dt>
                                                    <dd className="font-medium text-gray-900">{fund.folioNo}</dd>
                                                </div>
                                                <div>
                                                    <dt className="text-gray-500">Closing Units Balance</dt>
                                                    <dd className="font-medium text-gray-900">{fund.closingUnitBalance}</dd>
                                                </div>
                                                <div>
                                                    <dt className="text-gray-500">NAV on {fund.navOnDate.date}</dt>
                                                    <dd className="font-medium text-gray-900">{fund.navOnDate.nav}</dd>
                                                </div>
                                                <div>
                                                    <dt className="text-gray-500">Market Value</dt>
                                                    <dd className="font-medium text-gray-900">{formatCurrency(fund.totalMarketValue)}</dd>
                                                </div>
                                            </dl>

                                            {/* Transactions Table for each fund */}
                                            {fund.transactions && fund.transactions.length > 0 && (
                                                <div className="mt-6">
                                                    <h6 className="text-sm font-semibold text-gray-700 mb-2">Transactions</h6>
                                                    <div className="overflow-x-auto rounded-lg border border-gray-200">
                                                        <table className="min-w-full divide-y divide-gray-300">
                                                            <thead className="bg-gray-100">
                                                                <tr>
                                                                    <th scope="col" className="px-3 py-2 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Date</th>
                                                                    <th scope="col" className="px-3 py-2 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Amount</th>
                                                                    <th scope="col" className="px-3 py-2 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">NAV</th>
                                                                    <th scope="col" className="px-3 py-2 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Units</th>
                                                                    <th scope="col" className="px-3 py-2 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Instalment</th>
                                                                    <th scope="col" className="px-3 py-2 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Distributor</th>
                                                                    <th scope="col" className="px-3 py-2 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Unit Balance</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody className="bg-white divide-y divide-gray-200">
                                                                {fund.transactions.map((tx, txIndex) => (
                                                                    <tr key={txIndex}>
                                                                        <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-500">{tx.date}</td>
                                                                        <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-900">{formatCurrency(tx.amount)}</td>
                                                                        <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-900">{tx.nav}</td>
                                                                        <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-900">{tx.units}</td>
                                                                        <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-500">{tx.instalment}</td>
                                                                        <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-500">{tx.distributor}</td>
                                                                        <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-900">{tx.unitBalance}</td>
                                                                    </tr>
                                                                ))}
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div >
    );
}
