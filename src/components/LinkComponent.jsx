'use client';

import { useRouter } from 'next/navigation'; // ✅ correct for App Router

export default function LinkComponent() {
    const router = useRouter();

    return (
        <button
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
            onClick={() => router.push('/createuser')} // ✅ wrapped in arrow function
        >
            Add User
        </button>
    );
}
