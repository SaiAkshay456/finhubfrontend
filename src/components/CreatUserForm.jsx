'use client';
import axiosInstance from '@/helpers/axios';
// import useAxios from '@/helpers/axios';
import { useState } from 'react';

export default function CreateUserForm() {
    const [step, setStep] = useState(1);
    const [form, setForm] = useState({
        username: '',
        email: '',
        password: '',
        phoneNumber: '',
        role: 'user',
        gender: '',
        sidebar: [
            { label: 'Users', access: false },
            { label: 'Dashboard', access: false },
            { label: 'Create User', access: false },
            { label: 'Model Basket', access: false },
            { label: 'Fill Response', access: false },
        ]
    });

    const [errors, setErrors] = useState({});
    const [msg, setMsg] = useState('');

    const isValidPassword = (password) => {
        const hasUpperCase = /[A-Z]/.test(password);
        const hasLowerCase = /[a-z]/.test(password);
        const hasDigit = /[0-9]/.test(password);
        const hasSpecialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password);
        return hasUpperCase && hasLowerCase && hasDigit && hasSpecialChar;
    };

    const validateStep1 = () => {
        const newErrors = {};

        if (!form.username.trim()) {
            newErrors.username = 'Username is required';
        } else if (form.username.length < 3) {
            newErrors.username = 'Username must be at least 3 characters';
        }

        if (!form.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
            newErrors.email = 'Invalid email format';
        }

        if (!form.password.trim()) {
            newErrors.password = 'Password is required';
        } else if (form.password.length < 8) {
            newErrors.password = 'Password must be at least 8 characters';
        } else if (!isValidPassword(form.password)) {
            newErrors.password = 'Password must contain at least one uppercase, lowercase, digit, and special character';
        }

        if (!form.phoneNumber) {
            newErrors.phoneNumber = 'Phone number is required';
        } else if (!/^[0-9]{10,15}$/.test(form.phoneNumber)) {
            newErrors.phoneNumber = 'Invalid phone number (10-15 digits)';
        }

        if (!form.gender) {
            newErrors.gender = 'Gender is required';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const validateStep2 = () => {
        const newErrors = {};
        let hasValidSidebarItem = false;

        form.sidebar.forEach((item, index) => {
            if (!item.label.trim()) {
                newErrors[`sidebar-${index}-label`] = 'Label is required';
            } else {
                hasValidSidebarItem = true;
            }
        });

        if (!hasValidSidebarItem) {
            newErrors.sidebar = 'At least one valid sidebar permission is required';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const handleSidebarChange = (index, field, value) => {
        const newSidebar = [...form.sidebar];
        newSidebar[index][field] = value;
        setForm(prev => ({ ...prev, sidebar: newSidebar }));

        const errorKey = `sidebar-${index}-label`;
        if (errors[errorKey]) {
            setErrors(prev => ({ ...prev, [errorKey]: '' }));
        }
        if (errors.sidebar) {
            setErrors(prev => ({ ...prev, sidebar: '' }));
        }
    };

    const toggleSidebarAccess = (index) => {
        const newSidebar = [...form.sidebar];
        newSidebar[index].access = !newSidebar[index].access;
        setForm(prev => ({ ...prev, sidebar: newSidebar }));
    };

    const addSidebarItem = () => {
        setForm(prev => ({
            ...prev,
            sidebar: [...prev.sidebar, { label: '', access: false }],
        }));
    };

    const removeSidebarItem = (index) => {
        const newSidebar = form.sidebar.filter((_, i) => i !== index);
        setForm(prev => ({ ...prev, sidebar: newSidebar }));
    };

    const nextStep = () => {
        if (validateStep1()) {
            setStep(2);
        }
    };

    const prevStep = () => {
        setStep(1);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateStep2()) {
            try {
                const { data } = await axiosInstance.post('/v1/users/create-user', form, {
                    headers: { 'Content-Type': 'application/json' },
                });
                setMsg(data.message);
                setForm({
                    username: '',
                    email: '',
                    password: '',
                    phoneNumber: '',
                    role: 'user',
                    gender: '',
                    sidebar: [
                        { label: 'Users', access: false },
                        { label: 'Dashboard', access: false },
                        { label: 'Create User', access: false },
                        { label: 'Model Basket', access: false },
                        { label: 'KYC Verification', access: false }
                    ]
                });
                setErrors({});
                setStep(1);
            }
            catch (err) {
                console.error(err);
                setMsg(err.response?.data?.message || 'An unknown error occurred');
            }
        }
    };

    return (
        <div className="min-h-screen  py-8 px-4">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">User Creation Form</h1>
                    <p className="text-gray-600">Please fill out the form below to create a new user account</p>
                </div>

                {/* Progress Indicator */}
                <div className="mb-8">
                    <div className="flex justify-center">
                        <div className="flex items-center space-x-8">
                            <div className="flex items-center">
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold border-2 ${step >= 1 ? 'bg-gradient-to-r from-[#00d09c] to-[#00b98b] text-white border-transparent' : 'bg-white text-gray-400 border-gray-300'
                                    }`}>
                                    {step > 1 ? '✓' : '1'}
                                </div>
                                <span className={`ml-3 text-sm font-medium ${step >= 1 ? 'text-green-600' : 'text-gray-400'}`}>
                                    Personal Information
                                </span>
                            </div>
                            <div className={`w-16 h-px ${step >= 2 && 'bg-gray-300'}`}></div>
                            <div className="flex items-center">
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold border-2 ${step >= 2 ? 'bg-gradient-to-r from-[#00d09c] to-[#00b98b] text-white border-transparent' : 'bg-white text-gray-400 border-gray-300'
                                    }`}>
                                    {step > 2 ? '✓' : '2'}
                                </div>
                                <span className={`ml-3 text-sm font-medium ${step >= 2 ? 'text-green-600' : 'text-gray-400'}`}>
                                    Access Permissions
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Form Container */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                    {/* Message Alert */}
                    {msg && (
                        <div className={`mx-8 mt-8 p-4 rounded-md border ${msg.toLowerCase().includes('success')
                            ? 'bg-green-50 border-green-200 text-green-800'
                            : 'bg-red-50 border-red-200 text-red-800'
                            }`}>
                            <div className="flex items-center">
                                <div className={`flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold ${msg.toLowerCase().includes('success') ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'
                                    }`}>
                                    {msg.toLowerCase().includes('success') ? '✓' : '!'}
                                </div>
                                <span className="ml-3 text-sm">{msg}</span>
                            </div>
                        </div>
                    )}

                    {/* Form Content */}
                    <div className="p-8">
                        {step === 1 ? (
                            <div>
                                <h2 className="text-xl font-semibold text-gray-900 mb-6 pb-3 border-b border-gray-200">
                                    Personal Information
                                </h2>

                                <div className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {/* Username */}
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Username <span className="text-red-500">*</span>
                                            </label>
                                            <input
                                                name="username"
                                                value={form.username}
                                                onChange={handleChange}
                                                className={`w-full px-4 py-3 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${errors.username ? 'border-red-300' : 'border-gray-300'
                                                    }`}
                                                placeholder="Enter username"
                                            />
                                            {errors.username && (
                                                <p className="mt-2 text-xs text-red-600">{errors.username}</p>
                                            )}
                                        </div>

                                        {/* Email */}
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Email Address <span className="text-red-500">*</span>
                                            </label>
                                            <input
                                                name="email"
                                                type="email"
                                                value={form.email}
                                                onChange={handleChange}
                                                className={`w-full px-4 py-3 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${errors.email ? 'border-red-300' : 'border-gray-300'
                                                    }`}
                                                placeholder="Enter email address"
                                            />
                                            {errors.email && (
                                                <p className="mt-2 text-xs text-red-600">{errors.email}</p>
                                            )}
                                        </div>

                                        {/* Password */}
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Password <span className="text-red-500">*</span>
                                            </label>
                                            <input
                                                name="password"
                                                type="password"
                                                value={form.password}
                                                onChange={handleChange}
                                                className={`w-full px-4 py-3 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${errors.password ? 'border-red-300' : 'border-gray-300'
                                                    }`}
                                                placeholder="Enter password"
                                            />
                                            {errors.password ? (
                                                <p className="mt-2 text-xs text-red-600">{errors.password}</p>
                                            ) : (
                                                <p className="mt-2 text-xs text-gray-500">
                                                    Must contain uppercase, lowercase, number, and special character
                                                </p>
                                            )}
                                        </div>

                                        {/* Phone Number */}
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Phone Number <span className="text-red-500">*</span>
                                            </label>
                                            <input
                                                name="phoneNumber"
                                                type="tel"
                                                value={form.phoneNumber}
                                                onChange={handleChange}
                                                className={`w-full px-4 py-3 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${errors.phoneNumber ? 'border-red-300' : 'border-gray-300'
                                                    }`}
                                                placeholder="Enter phone number"
                                            />
                                            {errors.phoneNumber && (
                                                <p className="mt-2 text-xs text-red-600">{errors.phoneNumber}</p>
                                            )}
                                        </div>

                                        {/* Role */}
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Role
                                            </label>
                                            <select
                                                name="role"
                                                value={form.role}
                                                onChange={handleChange}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-white"
                                            >
                                                <option value="user">User</option>
                                                <option value="advisor">Advisor</option>
                                                <option value="admin">Admin</option>
                                            </select>
                                        </div>

                                        {/* Gender */}
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Gender <span className="text-red-500">*</span>
                                            </label>
                                            <select
                                                name="gender"
                                                value={form.gender}
                                                onChange={handleChange}
                                                className={`w-full px-4 py-3 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-white ${errors.gender ? 'border-red-300' : 'border-gray-300'
                                                    }`}
                                            >
                                                <option value="">Select Gender</option>
                                                <option value="Male">Male</option>
                                                <option value="Female">Female</option>
                                                <option value="Other">Other</option>
                                            </select>
                                            {errors.gender && (
                                                <p className="mt-2 text-xs text-red-600">{errors.gender}</p>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                <div className="flex justify-end pt-8 mt-8 border-t border-gray-200">
                                    <button
                                        type="button"
                                        onClick={nextStep}
                                        className="px-8 py-3 bg-gradient-to-r from-[#00d09c] to-[#00b98b] text-white rounded-md hover:bg-blue-700 transition-colors text-sm font-medium"
                                    >
                                        Continue
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div>
                                <h2 className="text-xl font-semibold text-gray-900 mb-6 pb-3 border-b border-gray-200">
                                    Access Permissions
                                </h2>

                                <div className="space-y-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-4">
                                            Sidebar Permissions <span className="text-red-500">*</span>
                                        </label>
                                        {errors.sidebar && (
                                            <p className="text-xs text-red-600 mb-4">{errors.sidebar}</p>
                                        )}

                                        <div className="border border-gray-200 rounded-md divide-y divide-gray-200 max-h-96 overflow-y-auto">
                                            {form.sidebar.map((item, index) => (
                                                <div key={index} className="p-4 hover:bg-gray-50 transition-colors">
                                                    <div className="flex items-center space-x-4">
                                                        <div className="flex-1">
                                                            <input
                                                                placeholder="Permission label"
                                                                value={item.label}
                                                                onChange={(e) => handleSidebarChange(index, 'label', e.target.value)}
                                                                className={`w-full px-3 py-2 border rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${errors[`sidebar-${index}-label`] ? 'border-red-300' : 'border-gray-300'
                                                                    }`}
                                                            />
                                                            {errors[`sidebar-${index}-label`] && (
                                                                <p className="mt-1 text-xs text-red-600">{errors[`sidebar-${index}-label`]}</p>
                                                            )}
                                                        </div>
                                                        <div className="flex items-center space-x-2">
                                                            <input
                                                                type="checkbox"
                                                                checked={item.access}
                                                                onChange={() => toggleSidebarAccess(index)}
                                                                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                                            />
                                                            <span className="text-sm text-gray-700">Access</span>
                                                        </div>
                                                        <button
                                                            type="button"
                                                            onClick={() => removeSidebarItem(index)}
                                                            className="text-gray-400 hover:text-red-500 p-1 transition-colors"
                                                        >
                                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                                            </svg>
                                                        </button>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>

                                        <button
                                            type="button"
                                            onClick={addSidebarItem}
                                            className="mt-4 text-sm text-blue-600 hover:text-blue-700 flex items-center transition-colors"
                                        >
                                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                            </svg>
                                            Add Permission
                                        </button>
                                    </div>
                                </div>

                                <div className="flex justify-between pt-8 mt-8 border-t border-gray-200">
                                    <button
                                        type="button"
                                        onClick={prevStep}
                                        className="px-6 py-3 bg-white text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors text-sm font-medium"
                                    >
                                        Back
                                    </button>
                                    <button
                                        type="button"
                                        onClick={handleSubmit}
                                        className="px-8 py-3 bg-gradient-to-r from-[#00d09c] to-[#00b98b] text-white rounded-md hover:bg-green-700 transition-colors text-sm font-medium"
                                    >
                                        Create User
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
