'use client';

import { useState } from 'react';

export default function AssignRiskCategory({ userId }) {
    const [riskCategory, setRiskCategory] = useState('');
    const [msg, setMsg] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!riskCategory) {
            setMsg('❗ Please select a risk category.');
            return;
        }

        try {
            setLoading(true);
            const res = await fetch(`http://localhost:3030/api/v1/riskprofile/assign-risk-category/${userId}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ riskCategory }),
                credentials: 'include',
            });

            if (!res.ok) throw new Error('❌ Failed to assign category');

            setMsg('✅ Risk category assigned successfully.');
        } catch (error) {
            setMsg(error.message);
            console.log(error)
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="mt-10 border-t pt-6">
            <h2 className="text-lg font-semibold text-gray-700 mb-2">Assign Risk Category</h2>

            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                <select
                    value={riskCategory}
                    onChange={(e) => setRiskCategory(e.target.value)}
                    className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                >
                    <option value="">Select Risk Category</option>
                    <option value="Low Risk">✅ Low Profile</option>
                    <option value="Medium Risk">⚠️ Medium Profile</option>
                    <option value="High Risk">🔥 High Profile</option>
                </select>

                <button
                    type="submit"
                    disabled={loading}
                    className={`px-6 py-2 rounded-md shadow-sm text-white ${loading
                        ? 'bg-gradient-to-r from-[#00d09c] to-[#00b98b] cursor-not-allowed'
                        : 'bg-gradient-to-r from-[#00d09c] to-[#00b98b] hover:bg-green-700'
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
