'use client';

import React, { useState } from 'react';
import { sidebarItems } from '../constants/sidebarRoutes';
const MultiStepForm = () => {
    const [step, setStep] = useState(1);
    const [errors, setErrors] = useState({});
    const [msg, setMsg] = useState('');
    const initialFormData = {
        firstName: '',
        lastName: '',
        dob: '',
        gender: '',
        username: '',
        password: '',
        phoneNumber: '',
        email: '',
        houseAddress: '',
        panNumber: '',
        aadharNumber: '',
        kycNumber: '',
        sidebar: [
            { label: 'Users', access: false },
            { label: 'Dashboard', access: false },
            { label: 'Create User', access: false },
            { label: 'Model Basket', access: false },
            { label: 'KYC Verification', access: false }
        ]
    };

    const [formData, setFormData] = useState(initialFormData);


    const validateStep = (step) => {
        const newErrors = {};
        if (step === 1) {
            if (!formData.firstName) newErrors.firstName = 'First name is required';
            if (!formData.lastName) newErrors.lastName = 'Last name is required';
            if (!formData.dob) newErrors.dob = 'Date of birth is required';
            if (!formData.username) newErrors.username = 'Username is required';
            if (!formData.password) newErrors.password = 'Password is required';
            else if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
        }
        if (step === 2) {
            if (!formData.phoneNumber) newErrors.phoneNumber = 'Phone number is required';
            else if (!/^\d{10}$/.test(formData.phoneNumber)) newErrors.phoneNumber = 'Invalid phone number';

            if (!formData.email) newErrors.email = 'Email is required';
            else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Invalid email format';
        }
        if (step === 3) {
            if (!formData.panNumber) newErrors.panNumber = 'PAN number is required';
            if (!formData.aadharNumber) newErrors.aadharNumber = 'Aadhar number is required';
        }
        if (step === 4) {
            const hasAccess = formData.sidebar.some(route => route.access);
            if (!hasAccess) newErrors.sidebar = 'At least one route must be selected';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
    };

    const toggleRouteAccess = (index) => {
        const updatedRoutes = [...formData.sidebar];
        updatedRoutes[index].access = !updatedRoutes[index].access;
        setFormData(prev => ({ ...prev, sidebar: updatedRoutes }));
    };

    const nextStep = () => {
        if (validateStep(step)) {
            setStep(prev => prev + 1);
        }
    };

    const prevStep = () => setStep(prev => prev - 1);


    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateStep(4)) return;
        try {
            const res = await fetch('http://localhost:3030/api/v1/adminuse/create-user', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
                credentials: "include",
            });

            const data = await res.json();
            if (res.ok) {
                setFormData(initialFormData);
            }
            setMsg(data.message);
        }
        catch (err) {
            console.log(err)
        }
    };
    return (
        <div className="w-full mx-auto p-4 sm:p-6 max-w-4xl">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="px-4 sm:px-6 py-4 bg-gray-50 border-b">
                    <div className="flex items-center justify-between overflow-x-auto pb-2">
                        {[1, 2, 3, 4].map((stepNumber) => (
                            <div key={stepNumber} className="flex flex-col items-center flex-shrink-0 min-w-[70px]">
                                <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-xs sm:text-sm font-medium
                                    ${step >= stepNumber ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'}`}>
                                    {stepNumber}
                                </div>
                                <span className="text-xs mt-1 sm:mt-2 text-gray-500 text-center">
                                    {['Personal', 'Contact', 'KYC', 'Access'][stepNumber - 1]}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="p-4 sm:p-6">
                    {Object.values(errors).some(e => e) && (
                        <div className="mb-4 p-3 bg-red-50 text-red-600 text-sm rounded border border-red-100">
                            Please fix the errors before proceeding
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        {step === 1 && (
                            <div className="space-y-4">
                                <h3 className="text-lg font-medium text-gray-800">Personal Information</h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <input name="firstName" placeholder="First Name" value={formData.firstName} onChange={handleChange} className={`px-3 py-2 border rounded-lg ${errors.firstName ? 'border-red-500' : 'border-gray-300'}`} />
                                    <input name="lastName" placeholder="Last Name" value={formData.lastName} onChange={handleChange} className={`px-3 py-2 border rounded-lg ${errors.lastName ? 'border-red-500' : 'border-gray-300'}`} />
                                    <input type="date" name="dob" value={formData.dob} onChange={handleChange} className={`px-3 py-2 border rounded-lg ${errors.dob ? 'border-red-500' : 'border-gray-300'}`} />
                                    <select name="gender" value={formData.gender} onChange={handleChange} className="px-3 py-2 border border-gray-300 rounded-lg">
                                        <option value="">Select Gender</option>
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                        <option value="Not to Prefer">Other</option>
                                        {/* "Male", "Female", "Not to Prefer" */}
                                    </select>
                                    <input name="username" placeholder="Username" value={formData.username} onChange={handleChange} className={`px-3 py-2 border rounded-lg ${errors.username ? 'border-red-500' : 'border-gray-300'}`} />
                                    <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} className={`px-3 py-2 border rounded-lg ${errors.password ? 'border-red-500' : 'border-gray-300'}`} />
                                </div>
                            </div>
                        )}

                        {step === 2 && (
                            <div className="space-y-4">
                                <h3 className="text-lg font-medium text-gray-800">Contact Information</h3>
                                <input name="phoneNumber" placeholder="Phone Number" value={formData.phoneNumber} onChange={handleChange} className={`w-full px-3 py-2 border rounded-lg ${errors.phoneNumber ? 'border-red-500' : 'border-gray-300'}`} />
                                <input name="email" type="email" placeholder="Email" value={formData.email} onChange={handleChange} className={`w-full px-3 py-2 border rounded-lg ${errors.email ? 'border-red-500' : 'border-gray-300'}`} />
                                <textarea name="houseAddress" placeholder="Address" value={formData.houseAddress} onChange={handleChange} rows={3} className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
                            </div>
                        )}

                        {step === 3 && (
                            <div className="space-y-4">
                                <h3 className="text-lg font-medium text-gray-800">KYC Information</h3>
                                <input name="panNumber" placeholder="PAN Number" value={formData.panNumber} onChange={handleChange} className={`w-full px-3 py-2 border rounded-lg ${errors.panNumber ? 'border-red-500' : 'border-gray-300'}`} />
                                <input name="aadharNumber" placeholder="Aadhar Number" value={formData.aadharNumber} onChange={handleChange} className={`w-full px-3 py-2 border rounded-lg ${errors.aadharNumber ? 'border-red-500' : 'border-gray-300'}`} />
                                <input name="kycNumber" placeholder="KYC Number (optional)" value={formData.kycNumber} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
                            </div>
                        )}

                        {step === 4 && (
                            <div className="space-y-4">
                                <h3 className="text-lg font-medium text-gray-800">Route Access Permissions</h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    {formData.sidebar.map((route, index) => (
                                        <div key={index} className="flex items-center p-3 border rounded-lg hover:bg-gray-50">
                                            <input
                                                type="checkbox"
                                                id={`route-${index}`}
                                                checked={route.access}
                                                onChange={() => toggleRouteAccess(index)}
                                                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                            />
                                            <label htmlFor={`route-${index}`} className="ml-3 text-sm font-medium text-gray-700">
                                                {route.label}
                                            </label>
                                        </div>
                                    ))}
                                </div>
                                {errors.sidebar && (
                                    <p className="text-sm text-red-500 col-span-full mt-1">{errors.sidebar}</p>
                                )}
                            </div>
                        )}

                        <div className="flex justify-between pt-6 gap-3">
                            {step > 1 ? (
                                <button type="button" onClick={prevStep}
                                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors text-sm sm:text-base">
                                    Back
                                </button>
                            ) : <div></div>}

                            {step <= 3 ? (
                                <button type="button" onClick={nextStep}
                                    className="ml-auto px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm sm:text-base">
                                    Continue
                                </button>
                            ) : (
                                <button type="submit"
                                    className="ml-auto px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm sm:text-base">
                                    Submit Form
                                </button>
                            )}
                        </div>
                    </form>
                </div>
            </div>
            {msg && (
                <div className={`mt-3 p-2 text-sm rounded ${msg.includes('success') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {msg}
                </div>
            )}
        </div>
    );
};

export default MultiStepForm;
