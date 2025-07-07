'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../../providers/AuthProvider';

export default function Layout({ children }) {
    const router = useRouter();
    const { isAuthorized, user } = useAuth();

    useEffect(() => {
        if (!isAuthorized || user?.role !== 'admin') {
            router.replace('/login'); // or a 403 page like '/unauthorized'
        }
    }, [isAuthorized, user, router]);

    // While loading or redirecting, prevent flicker
    if (!isAuthorized || user?.role !== 'admin') {
        redirect('/unauthorized');
    }
    return (
        <main className="min-h-screen flex justify-center items-center">
            {children}
        </main>
    );
}
