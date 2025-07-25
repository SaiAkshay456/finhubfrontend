'use client';
import axiosInstance from '@/helpers/axios';
import { useState } from 'react';
import Select from 'react-select';
export default function AssignRiskCategory({ userId, token }) {
    const [selectedOption, setSelectedOption] = useState(null);
    const [msg, setMsg] = useState('');
    const [loading, setLoading] = useState(false);

    const options = [
        { value: 'Low Risk', label: 'Low Profile' },
        { value: 'Medium Risk', label: 'Medium Profile' },
        { value: 'High Risk', label: 'High Profile' }
    ];

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!selectedOption) {
            setMsg('❗ Please select a risk category.');
            return;
        }

        try {
            setLoading(true);
            const { data } = await axiosInstance.post(
                `/v1/riskprofile/assign-risk-category/${userId}`,
                { riskCategory: selectedOption.value },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            if (!data.success) throw new Error('❌ Failed to assign category');

            setMsg('✅ Risk category assigned successfully.');
        } catch (error) {
            setMsg(error.message);
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const customStyles = {
        control: (base) => ({
            ...base,
            border: '1px solid #d1d5db',
            borderRadius: '0.375rem',
            padding: '0.25rem',
            minHeight: '42px',
            boxShadow: 'none',
            '&:hover': {
                borderColor: '#d1d5db'
            },
            '&:focus-within': {
                borderColor: '#d1d5db',
                boxShadow: '0 0 0 2px #3b82f6'
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

    return (
        <form onSubmit={handleSubmit} className="mt-10 border-t pt-6">
            <h2 className="text-lg font-semibold text-gray-700 mb-2">Assign Risk Category</h2>
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                <div className="w-full sm:w-64">
                    <Select
                        options={options}
                        value={selectedOption}
                        onChange={setSelectedOption}
                        placeholder="Select Risk Category"
                        styles={customStyles}
                        isSearchable={false}
                        required
                        classNamePrefix="react-select"
                        className="react-select-container"
                    />
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className={`px-6 py-2 rounded-md shadow-sm text-white ${loading
                        ? 'bg-gradient-to-r from-[#00d09c] to-[#00b98b] cursor-not-allowed opacity-75'
                        : 'bg-gradient-to-r from-[#00d09c] to-[#00b98b] hover:from-[#00b98b] hover:to-[#00d09c] transition-colors'
                        }`}
                >
                    {loading ? 'Submitting...' : 'Submit Category'}
                </button>
            </div>
            {msg && (
                <p className={`mt-3 text-sm ${msg.startsWith('✅') ? 'text-green-600' : 'text-red-600'}`}>
                    {msg}
                </p>
            )}
        </form>
    );
}
