// components/ToggleUserStatusButton.tsx
'use client';

import { useState } from 'react';

export default function ToggleUserStatusButton({ userId, isActive }) {
    const [status, setStatus] = useState(isActive);
    const [loading, setLoading] = useState(false);

    const handleToggle = async () => {
        try {
            setLoading(true);
            const res = await fetch(`http://localhost:3030/api/v1/adminuse/user-status/${userId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ isActive: !status }),
                credentials: 'include',
            });

            const data = await res.json();
            if (data.success) {
                setStatus(!status);
            } else {
                alert(data.message || 'Failed to update status');
            }
        } catch (err) {
            console.error('Error toggling user status:', err);
            alert('Something went wrong.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <button
            onClick={handleToggle}
            disabled={loading}
            className={`px-3 py-1 text-sm font-medium rounded-full transition ${status ? 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200' : 'bg-green-100 text-green-700 hover:bg-green-200'
                }`}
        >
            {loading ? 'Updating...' : status ? 'Suspend' : 'Activate'}
        </button>
    );
}
