'use client';
import { useState } from 'react';
import Link from 'next/link';
import ToggleUserStatusButton from './ToggleUserStatusButton';
import { Clock, ListFilter, User, Mail, MoreVertical } from 'lucide-react';
import { useRouter } from 'next/navigation';
import axiosInstance from '@/helpers/axios';
import { API_BASE, RISK_ROUTES } from '@/helpers/apiRoutes';
import dynamic from 'next/dynamic';

const Select = dynamic(() => import('react-select'), { ssr: false });

const getUserStatusLabel = (user) => {
    const s = user.status || {};
    if (!s.isKycCompleted) return 'KYC Pending';
    if (!s.questionarrieStatus) return 'Q/A Pending';
    if (!s.riskProfileStatus) return 'Risk Profile Pending';
    return user.riskCategory;
};

const getUserStatusColor = (user) => {
    const s = user.status || {};
    if (!s.isKycCompleted) return 'bg-amber-100 text-amber-800';
    if (!s.questionarrieStatus) return 'bg-blue-100 text-blue-800';
    if (!s.riskProfileStatus) return 'bg-purple-100 text-purple-800';
    return 'bg-green-100 text-green-800';
};

const getUserPendingStepLink = (user) => {
    const s = user.status || {};
    if (!s.isKycCompleted) return `/users/${user._id}`;
    if (!s.questionarrieStatus) return ``;
    if (!s.riskProfileStatus) return `/riskprofile/${user._id}`;
    return ``;
};

const getColor = (isActive) => {
    if (isActive) return "bg-green-100 text-green-800";
    return "bg-red-100 text-red-800";
};

export default function TableOfUser({ users, questionnaires, token }) {
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [moreSelectedUsers, setMoreSelectedUsers] = useState([]);
    const [selectedQuestionnaire, setSelectedQuestionnaire] = useState(null);
    const [msg, setMsg] = useState('');
    const router = useRouter();
    const [loading, setLoading] = useState(false)

    // Format questionnaires for react-select
    const questionnaireOptions = questionnaires.map(q => ({
        value: q._id,
        label: q.title
    }));

    const customSelectStyles = {
        control: (base) => ({
            ...base,
            border: '1px solid #d1d5db',
            borderRadius: '0.5rem',
            padding: '0.25rem',
            minHeight: '42px',
            boxShadow: 'none',
            '&:hover': {
                borderColor: '#d1d5db'
            },
            '&:focus-within': {
                borderColor: '#3b82f6',
                boxShadow: '0 0 0 1px #3b82f6'
            }
        }),
        option: (base, { isSelected, isFocused }) => ({
            ...base,
            backgroundColor: isSelected
                ? '#3b82f6'
                : isFocused
                    ? '#eff6ff'
                    : 'white',
            color: isSelected ? 'white' : '#1f2937',
            '&:active': {
                backgroundColor: '#3b82f6'
            }
        }),
        placeholder: (base) => ({
            ...base,
            color: '#9ca3af'
        }),
        singleValue: (base) => ({
            ...base,
            color: '#1f2937'
        })
    };

    const toggleUser = (userId) => {
        setSelectedUsers((prev) =>
            prev.includes(userId)
                ? prev.filter((id) => id !== userId)
                : [...prev, userId]
        );
    };

    const toggleAllUsers = () => {
        setSelectedUsers(
            selectedUsers.length === users.length ? [] : users.map((u) => u._id)
        );
    };

    const sendQuestionnaires = async () => {
        if (!selectedUsers.length) {
            setMsg("Error: Select at least one user.");
            return;
        }
        if (!selectedQuestionnaire) {
            setMsg("Error: Select a questionnaire.");
            return;
        }

        try {
            setLoading(true)
            const payload = selectedUsers.map((userId) => ({
                userId,
                questionnaireId: selectedQuestionnaire.value,
            }));

            const { data } = await axiosInstance.post(
                `${API_BASE}/${RISK_ROUTES.SEND_TO_USERS_QUESTIONNAIRE}`,
                { assignments: payload },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            const result = data;
            if (result.success) {
                setMsg(`Success: ${result.message}`);
                setSelectedUsers([]);
                setSelectedQuestionnaire(null);
            } else {
                setMsg(`Error: ${result.message || "Failed to send questionnaires."}`);
            }
        } catch (err) {
            console.error(err);
            setMsg("Error: An unexpected error occurred.");
        }
        finally {
            setLoading(false)
        }
    };
    if (loading) {
        return <div className="flex items-center justify-center h-screen">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>
        </div>
    }

    return (
        <div className="w-full">
            <div className="bg-white rounded-t-sm p-4 border border-gray-200">
                <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-4">
                    <div className="flex flex-col sm:flex-row gap-3 w-full xl:w-auto">
                        <div className="w-full sm:w-72">
                            <Select
                                options={questionnaireOptions}
                                value={selectedQuestionnaire}
                                onChange={setSelectedQuestionnaire}
                                placeholder={
                                    questionnaires.length
                                        ? 'Select Questionnaire'
                                        : 'No questionnaires available'
                                }
                                isDisabled={!questionnaires.length}
                                styles={customSelectStyles}
                                className="react-select-container"
                                classNamePrefix="react-select"
                            />
                        </div>
                        <button
                            onClick={sendQuestionnaires}
                            disabled={!selectedUsers.length || !selectedQuestionnaire}
                            className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${selectedUsers.length && selectedQuestionnaire
                                ? 'bg-teal-400 hover:bg-teal-500'
                                : 'bg-gray-100 text-gray-500 cursor-not-allowed'
                                }`}
                        >
                            Send Questionnaire
                        </button>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                        <span className="font-medium">
                            {selectedUsers.length} of {users.length} selected
                        </span>
                    </div>
                </div>
            </div>
            <div className="bg-white rounded-b-lg border border-gray-200 border-t-0 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-gray-700">
                        <thead className="text-xs text-gray-600 uppercase bg-gray-50">
                            <tr>
                                <th scope="col" className="p-4 border-b border-gray-300">
                                    <div className="flex items-center">
                                        <input
                                            id="checkbox-all"
                                            type="checkbox"
                                            onChange={toggleAllUsers}
                                            checked={selectedUsers.length === users.length && users.length > 0}
                                            className="w-4 h-4 text-blue-600 bg-white border-gray-300 rounded focus:ring-blue-500"
                                        />
                                    </div>
                                </th>
                                <th scope="col" className="px-6 py-3 border-b border-gray-200">
                                    <div className="flex items-center gap-2">
                                        <User className="w-4 h-4 text-gray-500" />
                                        User Details
                                    </div>
                                </th>
                                <th scope="col" className="px-6 py-3 border-b border-gray-200">
                                    <div className="flex items-center gap-2">
                                        <Mail className="w-4 h-4 text-gray-500" />
                                        Email
                                    </div>
                                </th>
                                <th scope="col" className="px-6 py-3 border-b border-gray-200">
                                    Status
                                </th>
                                <th scope="col" className="px-6 py-3 border-b border-gray-200">
                                    Modify Risk Level
                                </th>
                                <th scope="col" className="px-6 py-3 border-b border-gray-200">
                                    A/C Status
                                </th>
                                <th scope="col" className="px-6 py-3 border-b border-gray-200">
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user, index) => (
                                <tr key={user._id} className="odd:bg-white even:bg-gray-50 bg-white hover:bg-gray-50">
                                    <td className="p-4 border-b border-gray-100">
                                        <div className="flex items-center">
                                            <input
                                                id={`checkbox-table-${index}`}
                                                type="checkbox"
                                                checked={selectedUsers.includes(user._id)}
                                                onChange={() => toggleUser(user._id)}
                                                className="w-4 h-4 text-blue-600 bg-white border-gray-300 rounded focus:ring-blue-500"
                                            />
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 border-b border-gray-100">
                                        <Link
                                            href={`/users/${user._id}`}
                                            className="flex items-center gap-3 group"
                                        >
                                            <div className="w-9 h-9 bg-gradient-to-r from-[#00d09c] to-[#00b98b] rounded-full flex items-center justify-center text-white font-medium">
                                                {(user.username || user.email.split('@')[0]).charAt(0).toUpperCase()}
                                            </div>
                                            <div>
                                                <div className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
                                                    {user.username || user.email.split('@')[0]}
                                                </div>
                                                <div className="flex items-center gap-1 text-xs text-gray-500 mt-1">
                                                    {user._id.slice(-8)}
                                                </div>
                                            </div>
                                        </Link>
                                    </td>
                                    <td className="px-6 py-4 border-b border-gray-100 hover:text-blue-600 text-gray-600">
                                        <Link
                                            href={`/users/${user._id}`}
                                            className="flex items-center gap-3 group-hover:text-blue-600"
                                        >
                                            {user.email}
                                        </Link>
                                    </td>
                                    <td className="px-6 py-4 border-b border-gray-100">
                                        {getUserPendingStepLink(user) ? (
                                            <Link href={getUserPendingStepLink(user)}>
                                                <span className={`inline-flex items-center px-3 py-1 rounded-md text-xs font-medium ${getUserStatusColor(user)} hover:shadow-sm transition-all`}>
                                                    {getUserStatusLabel(user)}
                                                </span>
                                            </Link>
                                        ) : (
                                            <span className={`inline-flex items-center px-3 py-1 rounded-md text-xs font-medium ${getUserStatusColor(user)}`}>
                                                {getUserStatusLabel(user)}
                                            </span>
                                        )}
                                    </td>
                                    <td className="px-6 py-4 border-b border-gray-100">
                                        {user.riskCategory ? (
                                            <Link href={`/riskprofile/${user._id}`}>
                                                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-md text-xs font-medium bg-indigo-50 text-indigo-700 hover:bg-indigo-100 transition-colors">
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        className="h-3.5 w-3.5"
                                                        viewBox="0 0 20 20"
                                                        fill="currentColor"
                                                    >
                                                        <path d="M17.414 2.586a2 2 0 00-2.828 0L6 11.172V14h2.828l8.586-8.586a2 2 0 000-2.828zM4 16a1 1 0 100-2 1 1 0 000 2z" />
                                                    </svg>
                                                    Update Risk
                                                </span>
                                            </Link>
                                        ) : "N/A"}
                                    </td>
                                    <td className="px-6 py-4 border-b border-gray-100">
                                        <span className={` ${getColor(user.isActive)} inline-flex items-center px-3 py-1 rounded-md text-xs font-medium`}>
                                            {user.isActive ? "Open" : "Closed"}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 border-b border-gray-100 relative">
                                        <div className="relative">
                                            <button
                                                className="p-1 rounded-md hover:bg-gray-100 transition-colors"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    setMoreSelectedUsers(prev =>
                                                        prev.includes(user._id)
                                                            ? prev.filter(id => id !== user._id)
                                                            : [...prev, user._id]
                                                    );
                                                }}
                                                aria-expanded={moreSelectedUsers.includes(user._id)}
                                                aria-label="More actions"
                                            >
                                                <MoreVertical className="w-4 h-4 text-gray-500" />
                                            </button>
                                            {moreSelectedUsers.includes(user._id) && (
                                                <div
                                                    className={`
                                                        absolute right-0 z-50 w-56 rounded-md bg-white shadow-lg ring-1 ring-gray-200 focus:outline-none
                                                        ${index < 2 ? 'top-full mt-1' : 'bottom-full mb-1'}
                                                    `}
                                                    ref={(el) => {
                                                        if (el) {
                                                            const rect = el.getBoundingClientRect();
                                                            const windowHeight = window.innerHeight;

                                                            if (index < 2) {
                                                                if (rect.bottom > windowHeight) {
                                                                    el.classList.add('bottom-full', 'mb-1');
                                                                    el.classList.remove('top-full', 'mt-1');
                                                                }
                                                            } else {
                                                                if (rect.top < 0) {
                                                                    el.classList.add('top-full', 'mt-1');
                                                                    el.classList.remove('bottom-full', 'mb-1');
                                                                }
                                                            }
                                                        }
                                                    }}
                                                >
                                                    <div className="py-1">
                                                        <button
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                router.push(`/users/${user._id}`);
                                                                setMoreSelectedUsers([]);
                                                            }}
                                                            className="flex w-full items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                                                        >
                                                            <ListFilter className="w-4 h-4 text-gray-400" />
                                                            View Details
                                                        </button>
                                                        <button
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                router.push(`/users/update/${user._id}`);
                                                                setMoreSelectedUsers([]);
                                                            }}
                                                            className="flex w-full items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                                                        >
                                                            <Clock className="w-4 h-4 text-gray-400" />
                                                            Update User
                                                        </button>
                                                        <div className="w-full">
                                                            <ToggleUserStatusButton
                                                                userId={user._id}
                                                                isActive={user.isActive}
                                                                onToggle={() => setMoreSelectedUsers([])}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            {users.length === 0 && (
                <div className="bg-white rounded-b-lg border border-gray-200 border-t-0 p-12 text-center">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-.5a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                        </svg>
                    </div>
                    <p className="text-gray-500 text-lg font-medium">No users found</p>
                    <p className="text-gray-400 text-sm mt-1">Try adjusting your filters or search criteria</p>
                </div>
            )}
            {msg && (
                <div className="bg-white rounded-b-lg border border-gray-200 border-t-0 p-4">
                    <div className={`p-3 rounded-lg border-l-4 ${msg.includes('Success')
                        ? 'bg-green-50 border-green-400 text-green-800'
                        : 'bg-red-50 border-red-400 text-red-800'
                        }`}
                    >
                        <div className="flex items-center gap-2">
                            <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${msg.includes('Success')
                                ? 'bg-green-100 text-green-600'
                                : 'bg-red-100 text-red-600'
                                }`}
                            >
                                {msg.includes('Success') ? '✓' : '!'}
                            </div>
                            <p className="text-sm font-medium">{msg}</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

// 'use client';
// import { useState, useMemo, useCallback } from 'react';
// import Link from 'next/link';
// import { Clock, User, Mail, MoreVertical } from 'lucide-react';
// import { useRouter } from 'next/navigation';
// import axiosInstance from '@/helpers/axios';
// import { API_BASE, RISK_ROUTES } from '@/helpers/apiRoutes';
// import dynamic from 'next/dynamic';
// import { AgGridReact } from 'ag-grid-react';
// import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
// ModuleRegistry.registerModules([AllCommunityModule]);

// const Select = dynamic(() => import('react-select'), { ssr: false });

// // Helper functions remain the same
// const getUserStatusLabel = (user) => {
//     const s = user.status || {};
//     if (!s.isKycCompleted) return 'KYC Pending';
//     if (!s.questionarrieStatus) return 'Q/A Pending';
//     if (!s.riskProfileStatus) return 'Risk Profile Pending';
//     return user.riskCategory;
// };

// const getUserStatusColor = (user) => {
//     const s = user.status || {};
//     if (!s.isKycCompleted) return 'bg-amber-100 text-amber-800';
//     if (!s.questionarrieStatus) return 'bg-blue-100 text-blue-800';
//     if (!s.riskProfileStatus) return 'bg-purple-100 text-purple-800';
//     return 'bg-green-100 text-green-800';
// };

// const getColor = (isActive) => {
//     if (isActive) return "bg-green-100 text-green-800";
//     return "bg-red-100 text-red-800";
// };

// export default function TableOfUser({ users, questionnaires, token }) {
//     const [selectedUsers, setSelectedUsers] = useState([]);
//     const [selectedQuestionnaire, setSelectedQuestionnaire] = useState(null);
//     const [msg, setMsg] = useState('');
//     const router = useRouter();
//     const [loading, setLoading] = useState(false);

//     // Format questionnaires for react-select
//     const questionnaireOptions = questionnaires.map(q => ({
//         value: q._id,
//         label: q.title
//     }));

//     const customSelectStyles = {
//         control: (base) => ({
//             ...base,
//             border: '1px solid #d1d5db',
//             borderRadius: '0.5rem',
//             padding: '0.25rem',
//             minHeight: '42px',
//             boxShadow: 'none',
//             '&:hover': {
//                 borderColor: '#d1d5db'
//             },
//             '&:focus-within': {
//                 borderColor: '#3b82f6',
//                 boxShadow: '0 0 0 1px #3b82f6'
//             }
//         }),
//         option: (base, { isSelected, isFocused }) => ({
//             ...base,
//             backgroundColor: isSelected
//                 ? '#3b82f6'
//                 : isFocused
//                     ? '#eff6ff'
//                     : 'white',
//             color: isSelected ? 'white' : '#1f2937',
//             '&:active': {
//                 backgroundColor: '#3b82f6'
//             }
//         }),
//         placeholder: (base) => ({
//             ...base,
//             color: '#9ca3af'
//         }),
//         singleValue: (base) => ({
//             ...base,
//             color: '#1f2937'
//         })
//     };

//     const sendQuestionnaires = async () => {
//         if (!selectedUsers.length) {
//             setMsg("Error: Select at least one user.");
//             return;
//         }
//         if (!selectedQuestionnaire) {
//             setMsg("Error: Select a questionnaire.");
//             return;
//         }

//         try {
//             setLoading(true);
//             const payload = selectedUsers.map((userId) => ({
//                 userId,
//                 questionnaireId: selectedQuestionnaire.value,
//             }));

//             const { data } = await axiosInstance.post(
//                 `${API_BASE}/${RISK_ROUTES.SEND_TO_USERS_QUESTIONNAIRE}`,
//                 { assignments: payload },
//                 {
//                     headers: {
//                         'Content-Type': 'application/json',
//                         Authorization: `Bearer ${token}`,
//                     },
//                 }
//             );

//             const result = data;
//             if (result.success) {
//                 setMsg(`Success: ${result.message}`);
//                 setSelectedUsers([]);
//                 setSelectedQuestionnaire(null);
//             } else {
//                 setMsg(`Error: ${result.message || "Failed to send questionnaires."}`);
//             }
//         } catch (err) {
//             console.error(err);
//             setMsg("Error: An unexpected error occurred.");
//         } finally {
//             setLoading(false);
//         }
//     };

//     const toggleUserStatus = async (userId, currentStatus) => {
//         const newStatus = !currentStatus;
//         try {
//             await axiosInstance.patch(
//                 `/users/${userId}/status`,
//                 { isActive: newStatus }
//             );
//             router.refresh();
//         } catch (err) {
//             console.error('Failed to update user status:', err);
//         }
//     };

//     // Cell Renderers
//     const UserDetailCellRenderer = (params) => {
//         const user = params.data;
//         return (
//             <Link href={`/users/${user._id}`} className="flex items-center gap-3 group">
//                 <div className="w-9 h-9 bg-gradient-to-r from-[#00d09c] to-[#00b98b] rounded-full flex items-center justify-center text-white font-medium">
//                     {(user.username || user.email.split('@')[0]).charAt(0).toUpperCase()}
//                 </div>
//                 <div>
//                     <div className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
//                         @{user.username || user.email.split('@')[0]}
//                     </div>
//                     <div className="flex items-center gap-1 text-xs text-gray-500 mt-1">
//                         {user._id.slice(-8)}
//                     </div>
//                 </div>
//             </Link>
//         );
//     };

//     const EmailCellRenderer = (params) => {
//         return (
//             <Link href={`/users/${params.data._id}`} className="text-gray-600 hover:text-blue-600">
//                 {params.value}
//             </Link>
//         );
//     };

//     const StatusCellRenderer = (params) => {
//         const user = params.data;
//         const s = user.status || {};
//         const link = !s.isKycCompleted ? `/users/${user._id}` :
//             !s.riskProfileStatus ? `/riskprofile/${user._id}` : '';

//         if (link) {
//             return (
//                 <Link href={link}>
//                     <span className={`inline-flex items-center px-3 py-1 rounded-md text-xs font-medium ${getUserStatusColor(user)} hover:shadow-sm transition-all`}>
//                         {getUserStatusLabel(user)}
//                     </span>
//                 </Link>
//             );
//         }
//         return (
//             <span className={`inline-flex items-center px-3 py-1 rounded-md text-xs font-medium ${getUserStatusColor(user)}`}>
//                 {getUserStatusLabel(user)}
//             </span>
//         );
//     };

//     const RiskLevelCellRenderer = (params) => {
//         const user = params.data;
//         return user.riskCategory ? (
//             <Link href={`/riskprofile/${user._id}`}>
//                 <span className="inline-flex items-center gap-1 px-3 py-1 rounded-md text-xs font-medium bg-indigo-50 text-indigo-700 hover:bg-indigo-100 transition-colors">
//                     <svg
//                         xmlns="http://www.w3.org/2000/svg"
//                         className="h-3.5 w-3.5"
//                         viewBox="0 0 20 20"
//                         fill="currentColor"
//                     >
//                         <path d="M17.414 2.586a2 2 0 00-2.828 0L6 11.172V14h2.828l8.586-8.586a2 2 0 000-2.828zM4 16a1 1 0 100-2 1 1 0 000 2z" />
//                     </svg>
//                     Update Risk
//                 </span>
//             </Link>
//         ) : "N/A";
//     };

//     const AccountStatusCellRenderer = (params) => {
//         return (
//             <span className={`inline-flex items-center px-3 py-1 rounded-md text-xs font-medium ${getColor(params.value)}`}>
//                 {params.value ? "Active" : "Inactive"}
//             </span>
//         );
//     };

//     const MoreOptionsCellRenderer = (params) => {
//         const user = params.data;
//         return (
//             <div className="relative">
//                 <button className="p-1 rounded-md hover:bg-gray-100 transition-colors group">
//                     <MoreVertical className="w-4 h-4 text-gray-500" />
//                 </button>
//                 <div className="absolute right-0 top-full mt-1 z-50 w-40 bg-white shadow-lg rounded-md border border-gray-200 opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-opacity duration-200">
//                     <button
//                         onClick={() => router.push(`/users/update/${user._id}`)}
//                         className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
//                     >
//                         <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
//                         </svg>
//                         Update
//                     </button>
//                     <button
//                         onClick={() => router.push(`/users/${user._id}`)}
//                         className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
//                     >
//                         <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
//                         </svg>
//                         View
//                     </button>
//                     <button
//                         onClick={() => toggleUserStatus(user._id, user.isActive)}
//                         className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
//                     >
//                         {user.isActive ? (
//                             <>
//                                 <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
//                                 </svg>
//                                 Suspend
//                             </>
//                         ) : (
//                             <>
//                                 <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
//                                 </svg>
//                                 Activate
//                             </>
//                         )}
//                     </button>
//                 </div>
//             </div>
//         );
//     };


//     // Column Definitions
//     const columnDefs = useMemo(() => [
//         {
//             headerName: '',
//             field: 'selected',
//             checkboxSelection: true,
//             headerCheckboxSelection: true,
//             width: 50,
//             suppressMenu: true,
//             pinned: 'left',
//             filter: false,
//             sortable: false
//         },
//         {
//             headerName: 'USER DETAILS',
//             field: 'username',
//             cellRenderer: UserDetailCellRenderer,
//             width: 250,
//             filter: false
//         },
//         {
//             headerName: 'EMAIL',
//             field: 'email',
//             cellRenderer: EmailCellRenderer,
//             width: 250,
//             filter: false
//         },
//         {
//             headerName: 'STATUS',
//             field: 'status',
//             cellRenderer: StatusCellRenderer,
//             width: 180,
//             filter: false
//         },
//         {
//             headerName: 'RISK LEVEL',
//             field: 'riskCategory',
//             cellRenderer: RiskLevelCellRenderer,
//             width: 150,
//             filter: false
//         },
//         {
//             headerName: 'A/C STATUS',
//             field: 'isActive',
//             cellRenderer: AccountStatusCellRenderer,
//             width: 120,
//             filter: false
//         },
//         {
//             headerName: '',
//             field: 'actions',
//             cellRenderer: MoreOptionsCellRenderer,
//             width: 80,
//             suppressMenu: true,
//             pinned: 'right',
//             filter: false,
//             sortable: false
//         }
//     ], []);

//     const defaultColDef = useMemo(() => ({
//         sortable: true,
//         resizable: true,
//         suppressMenu: true,
//         cellClass: 'flex items-center'
//     }), []);

//     const onSelectionChanged = useCallback((event) => {
//         setSelectedUsers(event.api.getSelectedRows().map(user => user._id));
//     }, []);

//     if (loading) {
//         return (
//             <div className="flex items-center justify-center h-screen">
//                 <div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>
//             </div>
//         );
//     }

//     return (
//         <div className="w-full">
//             <div className="bg-white rounded-t-lg p-4 border border-gray-200">
//                 <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-4">
//                     <div className="flex flex-col sm:flex-row gap-3 w-full xl:w-auto">
//                         <div className="w-full sm:w-72">
//                             <Select
//                                 options={questionnaireOptions}
//                                 value={selectedQuestionnaire}
//                                 onChange={setSelectedQuestionnaire}
//                                 placeholder={
//                                     questionnaires.length
//                                         ? 'Select Questionnaire'
//                                         : 'No questionnaires available'
//                                 }
//                                 isDisabled={!questionnaires.length}
//                                 styles={customSelectStyles}
//                                 className="react-select-container"
//                                 classNamePrefix="react-select"
//                             />
//                         </div>
//                         <button
//                             onClick={sendQuestionnaires}
//                             disabled={!selectedUsers.length || !selectedQuestionnaire}
//                             className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${selectedUsers.length && selectedQuestionnaire
//                                 ? 'bg-teal-400 hover:bg-teal-500'
//                                 : 'bg-gray-100 text-gray-500 cursor-not-allowed'
//                                 }`}
//                         >
//                             Send Questionnaire
//                         </button>
//                     </div>
//                     <div className="flex items-center gap-2 text-sm text-gray-600">
//                         <span className="font-medium">
//                             {selectedUsers.length} of {users.length} selected
//                         </span>
//                     </div>
//                 </div>
//             </div>

//             <div className="bg-white rounded-b-lg border border-gray-200 border-t-0 overflow-hidden">
//                 <style jsx global>{`
//                     .ag-theme-alpine {
//                         --ag-font-size: 14px;
//                         --ag-font-family: 'Inter', sans-serif;
//                         --ag-border-color: #f3f4f6;
//                         --ag-header-background-color: #f9fafb;
//                         --ag-odd-row-background-color: #ffffff;
//                         --ag-row-hover-color: #f8fafc;
//                         --ag-header-column-separator-display: block;
//                         --ag-header-column-separator-height: 100%;
//                         --ag-header-column-separator-width: 1px;
//                         --ag-header-column-separator-color: #e5e7eb;
//                     }
//                     .ag-header-cell {
//                         padding-left: 16px !important;
//                         padding-right: 16px !important;
//                     }
//                     .ag-header-cell-label {
//                         justify-content: flex-start;
//                     }
//                     .ag-header-cell-text {
//                         font-weight: 600;
//                         color: #374151;
//                         font-size: 0.75rem;
//                         text-transform: uppercase;
//                         letter-spacing: 0.05em;
//                     }
//                     .ag-cell {
//                         padding-left: 16px !important;
//                         padding-right: 16px !important;
//                         display: flex;
//                         align-items: center;
//                         border-right: none !important;
//                     }
//                     .ag-row {
//                         border-bottom: 1px solid #f3f4f6 !important;
//                     }
//                     .ag-row:hover {
//                         background-color: #f8fafc !important;
//                     }
//                 `}</style>

//                 <div className="ag-theme-alpine" style={{ height: '600px', width: '100%' }}>
//                     <AgGridReact
//                         rowData={users}
//                         columnDefs={columnDefs}
//                         defaultColDef={defaultColDef}
//                         rowSelection="multiple"
//                         suppressRowClickSelection={true}
//                         onSelectionChanged={onSelectionChanged}
//                         rowHeight={70}
//                         headerHeight={48}
//                         animateRows={true}
//                         suppressCellFocus={true}
//                         pagination={true}
//                         paginationPageSize={20}
//                         domLayout="autoHeight"
//                     />
//                 </div>

//                 {users.length === 0 && (
//                     <div className="bg-white rounded-b-lg border border-gray-200 border-t-0 p-12 text-center">
//                         <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
//                             <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-.5a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
//                             </svg>
//                         </div>
//                         <p className="text-gray-500 text-lg font-medium">No users found</p>
//                         <p className="text-gray-400 text-sm mt-1">Try adjusting your filters or search criteria</p>
//                     </div>
//                 )}

//                 {msg && (
//                     <div className="bg-white rounded-b-lg border border-gray-200 border-t-0 p-4">
//                         <div className={`p-3 rounded-lg border-l-4 ${msg.includes('Success')
//                             ? 'bg-green-50 border-green-400 text-green-800'
//                             : 'bg-red-50 border-red-400 text-red-800'
//                             }`}
//                         >
//                             <div className="flex items-center gap-2">
//                                 <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${msg.includes('Success')
//                                     ? 'bg-green-100 text-green-600'
//                                     : 'bg-red-100 text-red-600'
//                                     }`}
//                                 >
//                                     {msg.includes('Success') ? '✓' : '!'}
//                                 </div>
//                                 <p className="text-sm font-medium">{msg}</p>
//                             </div>
//                         </div>
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// }