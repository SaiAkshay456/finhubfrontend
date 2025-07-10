
'use client';
import { useState } from 'react';

export default function CreateUserForm() {
    // ... (keep all your existing state and functions the same)
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
            { label: 'KYC Verification', access: false }
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
                const res = await fetch('http://localhost:3030/api/v1/adminuse/create-user', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(form),
                    credentials: "include",
                });

                const data = await res.json();
                setMsg(data.message);

                if (res.ok) {
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
            } catch (err) {
                console.error(err);
                setMsg('error.response?.data?.message' || 'An unknown error occurred');
            }
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
            <div className="w-full max-w-4xl bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
                {/* Header with progress steps */}
                <div className="px-8 py-6 bg-gradient-to-r from-blue-50 to-indigo-50">
                    <div className="flex items-center justify-between space-x-4 md:space-x-12">
                        {[1, 2].map((stepNum, idx) => (
                            <div key={stepNum} className="flex items-center space-x-2">
                                <div className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center font-bold transition-all duration-300
                ${step === stepNum
                                        ? 'bg-indigo-600 text-white'
                                        : step > stepNum
                                            ? 'bg-green-500 text-white'
                                            : 'bg-gray-300 text-gray-700'
                                    }`}>
                                    {step > stepNum ? '✓' : stepNum}
                                </div>
                                <span className={`text-xs md:text-sm font-medium ${step >= stepNum ? 'text-gray-900' : 'text-gray-400'}`}>
                                    {idx === 0 ? 'User Details' : 'Permissions'}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Form content */}
                <div className="p-8">
                    {/* Set a fixed min-height that works for both steps */}
                    <div className="min-h-[580px] transition-all duration-300 flex flex-col">
                        {msg && (
                            <div className={`mb-6 p-4 rounded-xl border ${msg.toLowerCase().includes('success') ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'} flex items-start shadow-sm`}>
                                <div className={`flex-shrink-0 p-1.5 rounded-lg ${msg.toLowerCase().includes('success') ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                                    {msg.toLowerCase().includes('success') ? '✓' : '!'}
                                </div>
                                <div className="ml-3">
                                    <p className={`text-sm ${msg.toLowerCase().includes('success') ? 'text-green-700' : 'text-red-700'}`}>
                                        {msg}
                                    </p>
                                </div>
                            </div>
                        )}

                        <div className="flex-grow">
                            {step === 1 ? (
                                <div className="h-full flex flex-col">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-grow">
                                        {/* All your step 1 form fields */}
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Username*</label>
                                            <input
                                                name="username"
                                                value={form.username}
                                                onChange={handleChange}
                                                className={`w-full px-4 py-3 rounded-xl border ${errors.username ? 'border-red-300 focus:ring-red-300' : 'border-gray-200 focus:ring-blue-300'} focus:outline-none focus:ring-2 focus:border-transparent`}
                                                placeholder="Enter username"
                                            />
                                            {errors.username && (
                                                <p className="mt-2 text-xs text-red-500 flex items-center">
                                                    <span className="mr-1">!</span>
                                                    {errors.username}
                                                </p>
                                            )}
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Email*</label>
                                            <input
                                                name="email"
                                                type="email"
                                                value={form.email}
                                                onChange={handleChange}
                                                className={`w-full px-4 py-3 rounded-xl border ${errors.email ? 'border-red-300 focus:ring-red-300' : 'border-gray-200 focus:ring-blue-300'} focus:outline-none focus:ring-2 focus:border-transparent`}
                                                placeholder="Enter email"
                                            />
                                            {errors.email && (
                                                <p className="mt-2 text-xs text-red-500 flex items-center">
                                                    <span className="mr-1">!</span>
                                                    {errors.email}
                                                </p>
                                            )}
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Password*</label>
                                            <input
                                                name="password"
                                                type="password"
                                                value={form.password}
                                                onChange={handleChange}
                                                className={`w-full px-4 py-3 rounded-xl border ${errors.password ? 'border-red-300 focus:ring-red-300' : 'border-gray-200 focus:ring-blue-300'} focus:outline-none focus:ring-2 focus:border-transparent`}
                                                placeholder="Enter password"
                                            />
                                            {errors.password ? (
                                                <p className="mt-2 text-xs text-red-500 flex items-center">
                                                    <span className="mr-1">!</span>
                                                    {errors.password}
                                                </p>
                                            ) : (
                                                <p className="mt-2 text-xs text-gray-500">
                                                    Password must be at least 8 characters with uppercase, lowercase, number, and special character
                                                </p>
                                            )}
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number*</label>
                                            <input
                                                name="phoneNumber"
                                                type="tel"
                                                value={form.phoneNumber}
                                                onChange={handleChange}
                                                className={`w-full px-4 py-3 rounded-xl border ${errors.phoneNumber ? 'border-red-300 focus:ring-red-300' : 'border-gray-200 focus:ring-blue-300'} focus:outline-none focus:ring-2 focus:border-transparent`}
                                                placeholder="Enter phone number"
                                            />
                                            {errors.phoneNumber && (
                                                <p className="mt-2 text-xs text-red-500 flex items-center">
                                                    <span className="mr-1">!</span>
                                                    {errors.phoneNumber}
                                                </p>
                                            )}
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Role</label>
                                            <select
                                                name="role"
                                                value={form.role}
                                                onChange={handleChange}
                                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-blue-300 focus:outline-none focus:ring-2 focus:border-transparent appearance-none bg-white"
                                            >
                                                <option value="user">User</option>
                                                <option value="advisor">Advisor</option>
                                                <option value="admin">Admin</option>
                                            </select>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Gender*</label>
                                            <select
                                                name="gender"
                                                value={form.gender}
                                                onChange={handleChange}
                                                className={`w-full px-4 py-3 rounded-xl border ${errors.gender ? 'border-red-300 focus:ring-red-300' : 'border-gray-200 focus:ring-blue-300'} focus:outline-none focus:ring-2 focus:border-transparent appearance-none bg-white`}
                                            >
                                                <option value="">Select Gender</option>
                                                <option value="Male">Male</option>
                                                <option value="Female">Female</option>
                                                <option value="Other">Other</option>
                                            </select>
                                            {errors.gender && (
                                                <p className="mt-2 text-xs text-red-500 flex items-center">
                                                    <span className="mr-1">!</span>
                                                    {errors.gender}
                                                </p>
                                            )}
                                        </div>
                                    </div>

                                    <div className="flex justify-end pt-6 mt-auto">
                                        <button
                                            type="button"
                                            onClick={nextStep}
                                            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-colors font-medium flex items-center shadow-lg shadow-blue-100"
                                        >
                                            Continue →
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="h-full flex flex-col">
                                    <div className="flex-grow">
                                        <label className="block text-sm font-medium text-gray-700 mb-3">Sidebar Permissions*</label>
                                        {errors.sidebar && (
                                            <p className="text-xs text-red-500 mb-3 flex items-center">
                                                <span className="mr-1">!</span>
                                                {errors.sidebar}
                                            </p>
                                        )}
                                        <div className="space-y-3 h-[calc(100%-60px)] overflow-y-auto p-3 border border-gray-200 rounded-lg">
                                            {form.sidebar.map((item, index) => (
                                                <div key={index} className="flex items-center space-x-4 p-3 hover:bg-gray-50 rounded-md">
                                                    <div className="flex-1">
                                                        <input
                                                            placeholder="Permission label"
                                                            value={item.label}
                                                            onChange={(e) => handleSidebarChange(index, 'label', e.target.value)}
                                                            className={`w-full px-4 py-2.5 text-sm border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 ${errors[`sidebar-${index}-label`] ? 'border-red-500' : 'border-gray-300'}`}
                                                        />
                                                        {errors[`sidebar-${index}-label`] && (
                                                            <p className="mt-1 text-xs text-red-600">{errors[`sidebar-${index}-label`]}</p>
                                                        )}
                                                    </div>
                                                    <label className="flex items-center space-x-3 cursor-pointer">
                                                        <input
                                                            type="checkbox"
                                                            checked={item.access}
                                                            onChange={() => toggleSidebarAccess(index)}
                                                            className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500 border-gray-300"
                                                        />
                                                        <span className="text-sm text-gray-700">Access</span>
                                                    </label>
                                                    <button
                                                        type="button"
                                                        onClick={() => removeSidebarItem(index)}
                                                        className="text-gray-400 hover:text-gray-600 p-1"
                                                    >
                                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                                        </svg>
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                        <button
                                            type="button"
                                            onClick={addSidebarItem}
                                            className="mt-3 text-sm text-blue-600 hover:text-blue-800 flex items-center focus:outline-none"
                                        >
                                            <svg className="w-5 h-5 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                            </svg>
                                            Add permission
                                        </button>
                                    </div>

                                    <div className="flex justify-between pt-6 mt-auto">
                                        <button
                                            type="button"
                                            onClick={prevStep}
                                            className="px-6 py-3 bg-white text-gray-700 rounded-xl border border-gray-200 hover:bg-gray-50 transition-colors font-medium flex items-center shadow-sm"
                                        >
                                            ← Back
                                        </button>
                                        <button
                                            type="submit"
                                            className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl hover:from-green-600 hover:to-emerald-600 transition-colors font-medium flex items-center shadow-lg shadow-green-100"
                                        >
                                            ✓ Create User
                                        </button>
                                    </div>
                                </form>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}