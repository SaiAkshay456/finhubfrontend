'use client';

import { useState } from 'react';
import Link from 'next/link';
import ToggleUserStatusButton from './ToggleUserStatusButton';
import { Clock, ListFilter, ChevronDown, User, Mail, Hash } from 'lucide-react';
import { useRouter } from 'next/navigation';


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

export default function TableOfUser({ users, questionnaires, token }) {
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [selectedQuestionnaire, setSelectedQuestionnaire] = useState('');
    const [msg, setMsg] = useState('');
    const router = useRouter();

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
            const payload = selectedUsers.map((userId) => ({
                userId,
                questionnaireId: selectedQuestionnaire,
            }));

            const res = await fetch(
                'http://localhost:3030/api/v1/riskprofile/send/questionaries-to-users',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                    // credentials: 'include',
                    body: JSON.stringify({ assignments: payload }),
                }
            );

            const result = await res.json();
            if (res.ok) {
                setMsg(`Success: ${result.message}`);
                setSelectedUsers([]);
                setSelectedQuestionnaire('');
            } else {
                setMsg(`Error: ${result.message || "Failed to send questionnaires."}`);
            }
        } catch (err) {
            console.error(err);
            setMsg("Error: An unexpected error occurred.");
        }
    };

    return (
        <div className="w-full">
            {/* Header Controls */}
            <div className="bg-white rounded-t-sm p-4 border border-gray-200">
                <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-4">
                    <div className="flex flex-col sm:flex-row gap-3 w-full xl:w-auto">
                        {/* Questionnaire Selector */}
                        <div className="relative min-w-0 flex-1 sm:flex-initial">
                            <div className="relative">
                                <select
                                    value={selectedQuestionnaire}
                                    onChange={(e) => setSelectedQuestionnaire(e.target.value)}
                                    className="appearance-none w-full sm:w-72 bg-white border border-gray-300 rounded-lg px-4 py-2 pr-10 text-sm font-medium text-gray-700 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                                >
                                    <option value="" disabled className="text-gray-400">
                                        {questionnaires.length
                                            ? 'Select Questionnaire'
                                            : 'No questionnaires available'}
                                    </option>
                                    {questionnaires.map((q) => (
                                        <option key={q._id} value={q._id} className="text-gray-900">
                                            {q.title}
                                        </option>
                                    ))}
                                </select>
                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500">
                                    <ChevronDown className="w-4 h-4" />
                                </div>
                            </div>
                        </div>

                        {/* Send Button */}
                        <button
                            onClick={sendQuestionnaires}
                            disabled={!selectedUsers.length || !selectedQuestionnaire}
                            className={`px-4 py-2 rounded-lg font-medium text-sm transition-all  ${selectedUsers.length && selectedQuestionnaire
                                ? 'bg-teal-400 hover:bg-teal-400'
                                : 'bg-gray-100 text-gray-500 cursor-not-allowed'
                                }`}
                        >
                            Send Questionnaire
                        </button>
                    </div>

                    {/* Selection Counter */}
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                        <span className="font-medium">
                            {selectedUsers.length} of {users.length} selected
                        </span>
                    </div>
                </div>
            </div>

            {/* Professional Table Container */}
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
                                    Actions
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
                                                    @{user.username || user.email.split('@')[0]}
                                                </div>
                                                <div className="flex items-center gap-1 text-xs text-gray-500 mt-1">
                                                    {/* <Hash className="w-3 h-3" /> */}
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
                                        {/* <div className="flex flex-col gap-2"> */}
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
                                        {/* </div> */}
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
                                        <div className="flex items-center gap-2">
                                            <button onClick={() => router.push(`/users/${user._id}`)} className="flex items-center gap-1 cursor-pointer px-3 py-1.5 rounded-md text-xs font-medium bg-gray-50 text-gray-600 hover:bg-gray-100 transition-colors">
                                                <ListFilter className="w-3.5 h-3.5" />
                                                View
                                            </button>
                                            <button onClick={() => router.push(`/users/update/${user._id}`)} className="flex items-center gap-1 px-3 py-1.5 rounded-md text-xs font-medium bg-gray-50 text-gray-600 hover:bg-gray-100 cursor-pointer transition-colors">
                                                <Clock className="w-3.5 h-3.5" />
                                                Update
                                            </button>
                                            <ToggleUserStatusButton userId={user._id} isActive={user.isActive} />
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Empty State */}
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

            {/* Message Display */}
            {msg && (
                <div className="bg-white rounded-b-lg border border-gray-200 border-t-0 p-4">
                    <div className={`p-3 rounded-lg border-l-4 ${msg.includes('Success')
                        ? 'bg-green-50 border-green-400 text-green-800'
                        : 'bg-red-50 border-red-400 text-red-800'
                        }`}>
                        <div className="flex items-center gap-2">
                            <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${msg.includes('Success')
                                ? 'bg-green-100 text-green-600'
                                : 'bg-red-100 text-red-600'
                                }`}>
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