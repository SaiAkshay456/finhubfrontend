'use client';

import axios from 'axios';
import { useState } from 'react';

export default function KycFormUser({ userId }) {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        dob: '',
        address: '',
        aadharFile: null,
        panFile: null
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: files ? files[0] : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);
        try {
            const formPayload = new FormData();
            formPayload.append('firstName', formData.firstName);
            formPayload.append('lastName', formData.lastName);
            formPayload.append('dob', formData.dob);
            formPayload.append('address', formData.address);
            formPayload.append('aadharFile', formData.aadharFile);
            formPayload.append('panFile', formData.panFile);
            const res = await axios.put(`http://localhost:3030/api/v1/adminuse/users/kyc-form-submit/${userId}`,
                formPayload
                , {
                    headers: {
                        // Authorization: `Bearer ${token}`,
                        'Content-Type': 'multipart/form-data' // if protected
                    },
                    withCredentials: true // if using cookies (optional
                })
            setSuccess(true);
        } catch (err) {
            setError(err.message || 'Failed to submit KYC');
            console.log(err);
        } finally {
            setIsSubmitting(false);
        }
    };

    if (success) {
        return (
            <div className="p-4 bg-green-50 text-green-700 rounded-lg">
                KYC submitted successfully! Our team will verify your documents shortly.
            </div>
        );
    }

    return (
        <div className="bg-white p-6 rounded-xl shadow-md border border-yellow-200">
            <h2 className="text-lg font-bold text-yellow-800 mb-4">Complete KYC Verification</h2>

            {error && (
                <div className="mb-4 p-2 bg-red-50 text-red-700 rounded text-sm">
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">First Name*</label>
                        <input
                            type="text"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Last Name*</label>
                        <input
                            type="text"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md"
                            required
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth*</label>
                    <input
                        type="date"
                        name="dob"
                        value={formData.dob}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">House Address</label>
                    <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Aadhar Card*</label>
                        <input
                            type="file"
                            name="aadharFile"
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md"
                            accept="image/*,.pdf"
                            required
                        />
                        <p className="text-xs text-gray-500 mt-1">Upload front and back as single file</p>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">PAN Card*</label>
                        <input
                            type="file"
                            name="panFile"
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md"
                            accept="image/*,.pdf"
                            required
                        />
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`px-4 py-2 text-white rounded-md ${isSubmitting ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'}`}
                >
                    {isSubmitting ? 'Submitting...' : 'Submit Verification'}
                </button>
            </form>
        </div>
    );
}