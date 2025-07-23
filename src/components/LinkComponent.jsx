'use client';

import { indigo } from '@mui/material/colors';
import { useRouter } from 'next/navigation'; // ✅ correct for App Router

export default function LinkComponent({ link, textValue, color = "indigo" }) {
    const router = useRouter();

    return (
        <button
            className={`px-4 py-2 bg-${color}-600 text-white rounded-md hover:bg-indigo-700 transition-colors cursor-pointer`}
            onClick={() => router.push(link)}
        >
            {textValue}
        </button>
    );
}
