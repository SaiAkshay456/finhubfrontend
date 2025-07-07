'use client';
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
            { label: 'KYC Verification', access: false }
        ]
    });

    const [errors, setErrors] = useState({});
    const [msg, setMsg] = useState('');

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
                setMsg('An error occurred while creating the user');
            }
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 p-4 flex flex-col">
            {/* Full-width form container */}
            <div className="w-full bg-white rounded-lg shadow-md flex flex-col flex-grow">
                {/* Updated header with new background color */}
                <div className="bg-indigo-700 px-6 py-4 rounded-t-lg">
                    <h1 className="text-xl font-bold text-white">Create New User</h1>
                    <div className="flex items-center mt-3">
                        <div className={`flex items-center ${step === 1 ? 'text-white' : 'text-indigo-200'}`}>
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-2 ${step === 1 ? 'bg-white text-indigo-700' : 'bg-indigo-600 text-white'}`}>
                                1
                            </div>
                            <span className="text-sm font-medium">User Details</span>
                        </div>
                        <div className="flex-1 mx-4 border-t-2 border-indigo-500"></div>
                        <div className={`flex items-center ${step === 2 ? 'text-white' : 'text-indigo-200'}`}>
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-2 ${step === 2 ? 'bg-white text-indigo-700' : 'bg-indigo-600 text-white'}`}>
                                2
                            </div>
                            <span className="text-sm font-medium">Permissions</span>
                        </div>
                    </div>
                </div>

                {/* Scrollable form content */}
                <div className="p-6 overflow-auto flex-grow">
                    {msg && (
                        <div className={`mb-4 p-3 rounded ${msg.toLowerCase().includes('success') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                            {msg}
                        </div>
                    )}

                    {step === 1 ? (
                        <div className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Username*</label>
                                    <input
                                        name="username"
                                        value={form.username}
                                        onChange={handleChange}
                                        className={`w-full px-3 py-2 border rounded focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ${errors.username ? 'border-red-500' : 'border-gray-300'}`}
                                        placeholder="Enter username"
                                    />
                                    {errors.username && <p className="mt-1 text-xs text-red-600">{errors.username}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Email*</label>
                                    <input
                                        name="email"
                                        type="email"
                                        value={form.email}
                                        onChange={handleChange}
                                        className={`w-full px-3 py-2 border rounded focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                                        placeholder="Enter email"
                                    />
                                    {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Password*</label>
                                    <input
                                        name="password"
                                        type="password"
                                        value={form.password}
                                        onChange={handleChange}
                                        className={`w-full px-3 py-2 border rounded focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ${errors.password ? 'border-red-500' : 'border-gray-300'}`}
                                        placeholder="Enter password"
                                    />
                                    {errors.password && <p className="mt-1 text-xs text-red-600">{errors.password}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number*</label>
                                    <input
                                        name="phoneNumber"
                                        type="tel"
                                        value={form.phoneNumber}
                                        onChange={handleChange}
                                        className={`w-full px-3 py-2 border rounded focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ${errors.phoneNumber ? 'border-red-500' : 'border-gray-300'}`}
                                        placeholder="Enter phone number"
                                    />
                                    {errors.phoneNumber && <p className="mt-1 text-xs text-red-600">{errors.phoneNumber}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                                    <div className="relative">
                                        <select
                                            name="role"
                                            value={form.role}
                                            onChange={handleChange}
                                            className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 appearance-none bg-white pr-8"
                                        >
                                            <option value="user">User</option>
                                            <option value="advisor">Advisor</option>
                                            <option value="admin">Admin</option>
                                        </select>
                                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Gender*</label>
                                    <div className="relative">
                                        <select
                                            name="gender"
                                            value={form.gender}
                                            onChange={handleChange}
                                            className={`w-full px-3 py-2 border rounded focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 appearance-none bg-white pr-8 ${errors.gender ? 'border-red-500' : 'border-gray-300'}`}
                                        >
                                            <option value="">Select Gender</option>
                                            <option value="Male">Male</option>
                                            <option value="Female">Female</option>
                                            <option value="Other">Other</option>
                                        </select>
                                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                                            </svg>
                                        </div>
                                    </div>
                                    {errors.gender && <p className="mt-1 text-xs text-red-600">{errors.gender}</p>}
                                </div>
                            </div>

                            <div className="flex justify-end pt-2">
                                <button
                                    type="button"
                                    onClick={nextStep}
                                    className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded"
                                >
                                    Next Step →
                                </button>
                            </div>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Sidebar Permissions*</label>
                                {errors.sidebar && <p className="text-xs text-red-600 mb-2">{errors.sidebar}</p>}
                                <div className="space-y-2 max-h-[40vh] overflow-y-auto p-2 border rounded">
                                    {form.sidebar.map((item, index) => (
                                        <div key={index} className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded">
                                            <div className="flex-1">
                                                <input
                                                    placeholder="Permission label"
                                                    value={item.label}
                                                    onChange={(e) => handleSidebarChange(index, 'label', e.target.value)}
                                                    className={`w-full px-3 py-2 border rounded focus:ring-2 focus:ring-indigo-500 ${errors[`sidebar-${index}-label`] ? 'border-red-500' : 'border-gray-300'}`}
                                                />
                                                {errors[`sidebar-${index}-label`] && (
                                                    <p className="mt-1 text-xs text-red-600">{errors[`sidebar-${index}-label`]}</p>
                                                )}
                                            </div>
                                            <label className="flex items-center space-x-2 cursor-pointer">
                                                <input
                                                    type="checkbox"
                                                    checked={item.access}
                                                    onChange={() => toggleSidebarAccess(index)}
                                                    className="w-4 h-4 text-indigo-600 rounded focus:ring-indigo-500"
                                                />
                                                <span className="text-sm text-gray-700">Access</span>
                                            </label>
                                            <button
                                                type="button"
                                                onClick={() => removeSidebarItem(index)}
                                                className="text-gray-500 hover:text-red-500 p-1"
                                            >
                                                ×
                                            </button>
                                        </div>
                                    ))}
                                </div>
                                <button
                                    type="button"
                                    onClick={addSidebarItem}
                                    className="mt-2 text-sm text-indigo-600 hover:text-indigo-800"
                                >
                                    + Add permission
                                </button>
                            </div>

                            <div className="flex justify-between pt-4">
                                <button
                                    type="button"
                                    onClick={prevStep}
                                    className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded"
                                >
                                    ← Back
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded"
                                >
                                    Create User
                                </button>
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
}