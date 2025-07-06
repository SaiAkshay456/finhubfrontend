'use client'; // Required for router usage

import { useRouter } from 'next/navigation';

export default function UnauthorizedPage() {
    const router = useRouter();

    const handleGoHome = () => {
        router.replace('/'); // Replaces history so user can't go back
    };

    return (
        <div className="text-center p-10">
            <h1 className="text-3xl font-bold">403 - Unauthorized</h1>
            <p>You do not have permission to access this page.</p>
            <button
                onClick={handleGoHome}
                className="inline-block mt-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            >
                Go to Home
            </button>
        </div>
    );
}
