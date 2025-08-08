// app/recommendations/layout.js

import { sidebarItems } from '../../constants/sidebarRoutes';
import { fetchWithAuth } from '@/lib/api';
import { redirect } from 'next/navigation';
export const metadata = {
    title: "Recommendations",
    description: "Personalized mutual fund or stock recommendations",
};

export default async function Layout({ children }) {
    const currentPath = '/recommendations';
    let loading = false
    const matched = sidebarItems.find(item => item.path === currentPath);
    const label = matched?.label;

    if (!label) {
        redirect('/'); // or 404
    }

    // Send label to backend to check access
    try {
        loading = true
        const { data, error } = await fetchWithAuth('/v1/permission-route/check-access', {
            method: 'POST',
            data: { path: label }
        })

        if (!data.success) {
            redirect('/unauthorized');
        }
    } catch (err) {
        if (err.response?.status === 401) {
            redirect('/unauthorized');
        } else {
            console.error('Access check failed:', err);
        }
    }
    finally {
        loading = false
    }
    if (loading)
        return <div className="flex items-center justify-center h-screen">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>
        </div>
    return (
        <main className="min-h-screen m-3">
            {children}
        </main>
    );
}
