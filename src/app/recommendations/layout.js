// app/recommendations/layout.js
import Sidebar from '../../components/Sidebar';
import { sidebarItems } from '../../constants/sidebarRoutes';
import { cookies } from 'next/headers';
import axiosInstance from '@/helpers/axios';
export const metadata = {
    title: "Recommendations",
    description: "Personalized mutual fund or stock recommendations",
};

export default async function Layout({ children }) {
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;

    if (!token) {
        redirect('/login');
    }
    const currentPath = '/recommendations'; // or get from route segment

    // Find label based on current path
    const matched = sidebarItems.find(item => item.path === currentPath);
    const label = matched?.label;

    if (!label) {
        redirect('/'); // or 404
    }

    // Send label to backend to check access
    try {
        const { data } = await axiosInstance.post('/v1/permission-route/check-access', { path: label }, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        });

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
    return (
        <main className="min-h-screen m-3">
            {children}
        </main>
    );
}
