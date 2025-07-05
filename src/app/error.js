'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function Error({ error, reset }) {
    useEffect(() => {
        console.error('Error caught by error.js:', error);
    }, [error]);

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-red-50 text-center px-6">
            <h1 className="text-5xl font-bold text-red-600 mb-3">Something went wrong</h1>
            <p className="text-gray-700 mb-6 text-lg">
                {error?.message || 'An unexpected error occurred. Please try again.'}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
                <button
                    onClick={() => reset()}
                    className="bg-red-600 text-white px-5 py-2 rounded-md hover:bg-red-700 transition"
                >
                    Try Again
                </button>
                <Link
                    href="/"
                    className="bg-gray-200 text-gray-800 px-5 py-2 rounded-md hover:bg-gray-300 transition"
                >
                    Go Home
                </Link>
            </div>
        </div>
    );
}
