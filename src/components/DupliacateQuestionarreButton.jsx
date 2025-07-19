'use client';

import { useTransition, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function DupliacateQuestionarreButton({ questionId }) {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();
    const [msg, setMsg] = useState('');

    const handleDuplicate = async () => {
        try {
            const res = await fetch(`http://localhost:3030/api/v1/riskprofile/duplicate-questionarre/${questionId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            });

            if (!res.ok) throw new Error('Failed to duplicate');
            const data = await res.json()
            // setMsg(data.message)
            // Refresh page to show new duplicated questionnaire
            startTransition(() => {
                router.refresh();
            });
        } catch (err) {
            alert(err.message);
        }
    };

    return (<>
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
        <button
            onClick={handleDuplicate}
            disabled={isPending}
            className="px-3 py-1 text-sm font-medium rounded-md text-white bg-black hover:bg-purple-700 transition"
        >
            {isPending ? 'Duplicating...' : 'Duplicate'}
        </button>
    </>
    );
}
