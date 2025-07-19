'use client';

import { useRouter } from 'next/navigation';

const colorMap = {
    indigo: 'bg-indigo-600 hover:bg-indigo-700',
    blue: 'bg-blue-600 hover:bg-blue-700',
    purple: 'bg-purple-600 hover:bg-purple-700',
    gray: 'bg-gray-600 hover:bg-gray-700',
    green: 'bg-green-600 hover:bg-green-700',
    red: 'bg-red-600 hover:bg-red-700',
};

export default function LinkComponent({ link, textValue, color = "indigo", isDisabled = false }) {
    const router = useRouter();
    const colorClass = colorMap[color] || colorMap.indigo;

    return (
        <button
            className={`px-4 py-2 text-white rounded-md bg-gradient-to-r from-[#00d09c] to-[#00b98b] transition-colors disabled:cursor-not-allowed disabled:opacity-50 ${colorClass}`}
            onClick={() => router.push(link)}
            disabled={isDisabled}
        >
            {textValue}
        </button>
    );
}
