'use client';
import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import axiosInstance from '@/helpers/axios';
import { API_BASE, USER_MANAGE_ROUTES } from '@/helpers/apiRoutes';

export default function UpdateUserForm({ user, token }) {
    const router = useRouter();
    const [formData, setFormData] = useState({
        username: user.username || '',
        email: user.email || '',
        role: user.role || '',
        gender: user.gender || '',
        sidebar: Array.isArray(user.sidebar) ? user.sidebar : [],
        phoneNumber: user.phoneNumber || '',
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        dob: user.dob?.split('T')[0] || '',
        address: user.houseAddress || '',
        aadharFile: null,
        panFile: null,
    });
    const [msg, setMsg] = useState('');
    const [errors, setErrors] = useState({});
    // const [editMode, setEditMode] = useState('visual');

    const handleChange = (e) => {
        const { name, value, type, files } = e.target;
        if (type === 'file') {
            setFormData({ ...formData, [name]: files[0] });
        } else {
            setFormData({ ...formData, [name]: value });
        }
        // Clear error when field is edited
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const toggleSidebarItem = (index) => {
        const updatedSidebar = [...formData.sidebar];
        updatedSidebar[index] = {
            ...updatedSidebar[index],
            access: !updatedSidebar[index].access
        };
        setFormData({ ...formData, sidebar: updatedSidebar });
    };

    const validateForm = () => {
        const newErrors = {};
        let isValid = true;

        // Basic required fields
        const requiredFields = [
            'username', 'email', 'role', 'gender', 'phoneNumber'
        ];

        requiredFields.forEach(field => {
            if (!formData[field]) {
                newErrors[field] = 'This field is required';
                isValid = false;
            }
        });

        // KYC fields if KYC is completed
        if (user.status?.isKycCompleted) {
            const kycFields = [
                'firstName', 'lastName', 'dob', 'address'
            ];

            kycFields.forEach(field => {
                if (!formData[field]) {
                    newErrors[field] = 'KYC field is required';
                    isValid = false;
                }
            });

            // Files are only required if they weren't previously uploaded
            if (!user.aadharFile && !formData.aadharFile) {
                newErrors.aadharFile = 'Aadhar file is required';
                isValid = false;
            }
            if (!user.panFile && !formData.panFile) {
                newErrors.panFile = 'PAN file is required';
                isValid = false;
            }
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            setMsg('Please fill all required fields');
            return;
        }

        const sendData = new FormData();
        for (const key in formData) {
            if (formData[key] !== null && formData[key] !== undefined) {
                if (key === 'sidebar') {
                    sendData.append(key, JSON.stringify(formData[key]));
                } else {
                    sendData.append(key, formData[key]);
                }
            }
        }

        try {
            const { data } = await axiosInstance.put(
                `${API_BASE}/${USER_MANAGE_ROUTES.USER_UPDATE}/${user._id}`,
                sendData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );
            setMsg(data.message);
            setTimeout(() => { router.replace("/users") }, 2000)

        } catch (error) {
            console.error(error);
            setMsg(error.response?.data?.message || 'An unknown error occurred');
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header Section */}
            <div className="bg-white shadow-sm border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            <div className="flex-shrink-0">
                                <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                    </svg>
                                </div>
                            </div>
                            <div>
                                <h1 className="text-2xl font-semibold text-gray-900">Client Profile Management</h1>
                                <p className="text-sm text-gray-600">Update client information and access permissions</p>
                            </div>
                        </div>
                        <div className="hidden md:flex items-center space-x-4">
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                Financial Advisory System
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <form onSubmit={handleSubmit} className="space-y-6">

                    {/* Personal Information */}
                    <div className="bg-white shadow rounded-lg">
                        <div className="px-6 py-4 border-b border-gray-200">
                            <div className="flex items-center">
                                <svg className="w-5 h-5 text-gray-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                                <h3 className="text-lg font-medium text-gray-900">Personal Information</h3>
                            </div>
                        </div>
                        <div className="px-6 py-6">
                            <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2 lg:grid-cols-3">
                                {[
                                    { name: 'username', label: 'Username', required: true },
                                    { name: 'email', label: 'Email Address', required: true, type: 'email' },
                                    { name: 'phoneNumber', label: 'Phone Number', required: true, type: 'tel' },
                                    { name: 'gender', label: 'Gender', required: true }
                                ].map((field) => (
                                    <div key={field.name}>
                                        <label htmlFor={field.name} className="block text-sm font-medium text-gray-700 mb-1">
                                            {field.label}
                                            {field.required && <span className="text-red-500 ml-1">*</span>}
                                        </label>
                                        <input
                                            type={field.type || 'text'}
                                            name={field.name}
                                            id={field.name}
                                            value={formData[field.name]}
                                            onChange={handleChange}
                                            className={`block w-full px-3 py-2 border ${errors[field.name]
                                                ? 'border-red-300 focus:ring-red-500 focus:border-red-500'
                                                : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
                                                } rounded-md shadow-sm placeholder-gray-400 focus:outline-none sm:text-sm`}
                                            placeholder={`Enter ${field.label.toLowerCase()}`}
                                        />
                                        {errors[field.name] && (
                                            <p className="mt-1 text-sm text-red-600">{errors[field.name]}</p>
                                        )}
                                    </div>
                                ))}

                                <div>
                                    <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">
                                        Role <span className="text-red-500 ml-1">*</span>
                                    </label>
                                    <select
                                        name="role"
                                        id="role"
                                        value={formData.role}
                                        onChange={handleChange}
                                        className={`block w-full px-3 py-2 border ${errors.role
                                            ? 'border-red-300 focus:ring-red-500 focus:border-red-500'
                                            : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
                                            } rounded-md shadow-sm focus:outline-none sm:text-sm bg-white`}
                                    >
                                        <option value="">Select role</option>
                                        <option value="user">Client</option>
                                        <option value="advisor">Financial Advisor</option>
                                        <option value="admin">Administrator</option>
                                    </select>
                                    {errors.role && (
                                        <p className="mt-1 text-sm text-red-600">{errors.role}</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* System Permissions */}
                    <div className="bg-white shadow rounded-lg">
                        <div className="px-6 py-4 border-b border-gray-200">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <svg className="w-5 h-5 text-gray-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                    </svg>
                                    <h3 className="text-lg font-medium text-gray-900">System Access Permissions</h3>
                                </div>
                                <span className="text-sm text-gray-500">
                                    {formData.sidebar.filter(item => item.access).length} of {formData.sidebar.length} enabled
                                </span>
                            </div>
                        </div>
                        <div className="px-6 py-6">
                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                                {formData.sidebar.map((item, index) => (
                                    <div key={index} className="relative flex items-start">
                                        <div className="flex items-center h-5">
                                            <input
                                                type="checkbox"
                                                id={`sidebar-item-${index}`}
                                                checked={item.access}
                                                onChange={() => toggleSidebarItem(index)}
                                                className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
                                            />
                                        </div>
                                        <div className="ml-3 text-sm">
                                            <label
                                                htmlFor={`sidebar-item-${index}`}
                                                className="font-medium text-gray-700 cursor-pointer"
                                            >
                                                {item.label}
                                            </label>
                                            {item.access && (
                                                <p className="text-green-600 text-xs mt-1">Access granted</p>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* KYC Information */}
                    {user?.status?.isKycCompleted && (
                        <div className="bg-white shadow rounded-lg">
                            <div className="px-6 py-4 border-b border-gray-200">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center">
                                        <svg className="w-5 h-5 text-gray-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                        </svg>
                                        <h3 className="text-lg font-medium text-gray-900">KYC Documentation</h3>
                                    </div>
                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                        Verified Client
                                    </span>
                                </div>
                            </div>
                            <div className="px-6 py-6">
                                <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
                                    {[
                                        { name: 'firstName', label: 'First Name', required: true },
                                        { name: 'lastName', label: 'Last Name', required: true },
                                        { name: 'dob', label: 'Date of Birth', type: 'date', required: true },
                                        { name: 'address', label: 'Residential Address', required: true }
                                    ].map((field) => (
                                        <div key={field.name} className={field.name === 'address' ? 'sm:col-span-2' : ''}>
                                            <label htmlFor={field.name} className="block text-sm font-medium text-gray-700 mb-1">
                                                {field.label}
                                                {field.required && <span className="text-red-500 ml-1">*</span>}
                                            </label>
                                            {field.name === 'address' ? (
                                                <textarea
                                                    name={field.name}
                                                    id={field.name}
                                                    rows={3}
                                                    value={formData[field.name]}
                                                    onChange={handleChange}
                                                    className={`block w-full px-3 py-2 border ${errors[field.name]
                                                        ? 'border-red-300 focus:ring-red-500 focus:border-red-500'
                                                        : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
                                                        } rounded-md shadow-sm placeholder-gray-400 focus:outline-none sm:text-sm`}
                                                    placeholder="Enter complete address"
                                                />
                                            ) : (
                                                <input
                                                    type={field.type || 'text'}
                                                    name={field.name}
                                                    id={field.name}
                                                    value={formData[field.name]}
                                                    onChange={handleChange}
                                                    className={`block w-full px-3 py-2 border ${errors[field.name]
                                                        ? 'border-red-300 focus:ring-red-500 focus:border-red-500'
                                                        : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
                                                        } rounded-md shadow-sm placeholder-gray-400 focus:outline-none sm:text-sm`}
                                                    placeholder={`Enter ${field.label.toLowerCase()}`}
                                                />
                                            )}
                                            {errors[field.name] && (
                                                <p className="mt-1 text-sm text-red-600">{errors[field.name]}</p>
                                            )}
                                        </div>
                                    ))}

                                    {/* Document Upload */}
                                    <div className="sm:col-span-2">
                                        <h4 className="text-sm font-medium text-gray-900 mb-4">Identity Documents</h4>
                                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                                            {[
                                                { name: 'aadharFile', label: 'Aadhar Card Verification', required: !user.aadharFile },
                                                { name: 'panFile', label: 'PAN Card Verification', required: !user.panFile }
                                            ].map((field) => (
                                                <div key={field.name} className="space-y-2">
                                                    <label className="block text-sm font-semibold text-slate-700">
                                                        {field.label} {field.required && <span className="text-red-500">*</span>}
                                                    </label>
                                                    <div className="space-y-2">
                                                        <input
                                                            type="file"
                                                            name={field.name}
                                                            onChange={handleChange}
                                                            className="block w-full text-sm text-slate-500
                                                  file:mr-4 file:py-3 file:px-6
                                                  file:rounded-xl file:border-0
                                                  file:text-sm file:font-semibold
                                                  file:bg-emerald-50 file:text-emerald-700
                                                  hover:file:bg-emerald-100
                                                  file:transition-colors file:cursor-pointer
                                                  border-2 border-dashed border-slate-300 rounded-xl p-4
                                                  hover:border-emerald-400 transition-colors"
                                                            accept="application/pdf"
                                                        />
                                                        {errors[field.name] && <p className="mt-1 text-sm text-red-600 font-medium">{errors[field.name]}</p>}
                                                        {user[field.name] && (
                                                            <div className="flex items-center space-x-2 mt-2 p-3 bg-emerald-100 rounded-lg">
                                                                <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                                </svg>
                                                                <p className="text-sm text-emerald-700 font-medium">
                                                                    Document verified: {user[field.name]}
                                                                </p>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Actions */}
                    <div className="bg-gray-50 px-6 py-3 rounded-lg">
                        <div className="flex justify-end space-x-3">
                            <button
                                type="button"
                                onClick={() => router.back()}
                                className="inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            >
                                Update Client Profile
                            </button>
                        </div>
                    </div>
                </form>

                {/* Status Message */}
                {msg && (
                    <div className={`mt-6 rounded-md p-4 ${msg.toLowerCase().includes('success') ?
                        'bg-green-50 border border-green-200' :
                        'bg-red-50 border border-red-200'
                        }`}>
                        <div className="flex">
                            <div className="flex-shrink-0">
                                {msg.toLowerCase().includes('success') ? (
                                    <svg className="h-5 w-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                ) : (
                                    <svg className="h-5 w-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                )}
                            </div>
                            <div className="ml-3">
                                <p className={`text-sm font-medium ${msg.toLowerCase().includes('success') ? 'text-green-800' : 'text-red-800'
                                    }`}>
                                    {msg}
                                </p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}