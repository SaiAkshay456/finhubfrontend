'use client';
import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

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
    const [editMode, setEditMode] = useState('visual');

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
        if (user.status.isKycCompleted) {
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
            const { data } = await axios.put(
                `http://localhost:3030/api/v1/adminuse/users/update-user/${user._id}`,
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
        <div className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-lg">
            <h2 className="text-2xl font-bold text-center text-gray-800 mb-6 border-b pb-2">Update User Details</h2>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {[
                        { name: 'username', label: 'Username', required: true },
                        { name: 'email', label: 'Email', required: true },
                        { name: 'role', label: 'Role', required: true },
                        { name: 'gender', label: 'Gender', required: true },
                        { name: 'phoneNumber', label: 'Phone Number', required: true }
                    ].map((field) => (
                        <div key={field.name} className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">
                                {field.label} {field.required && <span className="text-red-500">*</span>}
                            </label>
                            {field.name === 'role' ? (
                                <div>
                                    <select
                                        name="role"
                                        value={formData.role}
                                        onChange={handleChange}
                                        className={`w-full px-4 py-2.5 rounded-lg border ${errors.role ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white shadow-sm`}
                                    >
                                        <option value="">Select Role</option>
                                        <option value="user">User</option>
                                        <option value="advisor">Advisor</option>
                                        <option value="admin">Admin</option>
                                    </select>
                                    {errors.role && <p className="mt-1 text-sm text-red-600">{errors.role}</p>}
                                </div>
                            ) : (
                                <div>
                                    <input
                                        name={field.name}
                                        value={formData[field.name]}
                                        onChange={handleChange}
                                        className={`w-full px-3 py-2.5 border ${errors[field.name] ? 'border-red-500' : 'border-gray-300'} rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                                    />
                                    {errors[field.name] && <p className="mt-1 text-sm text-red-600">{errors[field.name]}</p>}
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                {/* Sidebar Editor Section */}
                <div className="bg-gray-50 p-5 rounded-xl border border-gray-200">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                        <h3 className="text-lg font-semibold text-gray-800">Sidebar Permissions</h3>
                    </div>


                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                        {formData.sidebar.map((item, index) => (
                            <div key={index} className="flex items-center p-3 bg-white rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
                                <input
                                    type="checkbox"
                                    id={`sidebar-item-${index}`}
                                    checked={item.access}
                                    onChange={() => toggleSidebarItem(index)}
                                    className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                                />
                                <label
                                    htmlFor={`sidebar-item-${index}`}
                                    className="ml-3 block text-sm font-medium text-gray-700"
                                >
                                    {item.label}
                                </label>
                            </div>
                        ))}
                    </div>
                </div>

                {user.status.isKycCompleted && (
                    <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">KYC Details <span className="text-sm font-normal text-gray-500">(Required)</span></h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {[
                                { name: 'firstName', label: 'First Name', required: true },
                                { name: 'lastName', label: 'Last Name', required: true },
                                { name: 'dob', label: 'Date of Birth', type: 'date', required: true },
                                { name: 'address', label: 'Address', required: true }
                            ].map((field) => (
                                <div key={field.name} className="space-y-2">
                                    <label className="block text-sm font-medium text-gray-700">
                                        {field.label} {field.required && <span className="text-red-500">*</span>}
                                    </label>
                                    {field.type === 'date' ? (
                                        <div>
                                            <input
                                                type="date"
                                                name={field.name}
                                                value={formData[field.name]}
                                                onChange={handleChange}
                                                className={`w-full px-3 py-2.5 border ${errors[field.name] ? 'border-red-500' : 'border-gray-300'} rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                                            />
                                            {errors[field.name] && <p className="mt-1 text-sm text-red-600">{errors[field.name]}</p>}
                                        </div>
                                    ) : (
                                        <div>
                                            <input
                                                name={field.name}
                                                value={formData[field.name]}
                                                onChange={handleChange}
                                                className={`w-full px-3 py-2.5 border ${errors[field.name] ? 'border-red-500' : 'border-gray-300'} rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                                            />
                                            {errors[field.name] && <p className="mt-1 text-sm text-red-600">{errors[field.name]}</p>}
                                        </div>
                                    )}
                                </div>
                            ))}
                            {[
                                { name: 'aadharFile', label: 'Aadhar Card', required: !user.aadharFile },
                                { name: 'panFile', label: 'PAN Card', required: !user.panFile }
                            ].map((field) => (
                                <div key={field.name} className="space-y-2">
                                    <label className="block text-sm font-medium text-gray-700">
                                        {field.label} {field.required && <span className="text-red-500">*</span>}
                                    </label>
                                    <div>
                                        <input
                                            type="file"
                                            name={field.name}
                                            onChange={handleChange}
                                            className="block w-full text-sm text-gray-500
                                              file:mr-4 file:py-2 file:px-4
                                              file:rounded-lg file:border-0
                                              file:text-sm file:font-medium
                                              file:bg-blue-50 file:text-blue-700
                                              hover:file:bg-blue-100
                                              file:transition-colors"
                                            accept="application/pdf"
                                        />
                                        {errors[field.name] && <p className="mt-1 text-sm text-red-600">{errors[field.name]}</p>}
                                        {user[field.name] && (
                                            <p className="mt-1 text-sm text-green-600">
                                                File already uploaded: {user[field.name]}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                <div className="flex flex-col sm:flex-row justify-end gap-3 pt-4">
                    <button
                        type="button"
                        onClick={() => router.back()}
                        className="px-5 py-2.5 border cursor-pointer border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="px-5 py-2.5 cursor-pointer border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                    >
                        Update User
                    </button>
                </div>
            </form>
            {msg && (
                <div className={`mt-6 p-4 rounded-lg ${msg.toLowerCase().includes('success') ?
                    'bg-green-50 text-green-800 border border-green-200' :
                    'bg-red-50 text-red-800 border border-red-200'}`}
                >
                    <p className="font-medium">{msg}</p>
                </div>
            )}
        </div>
    );
}