
import { sidebarItems } from '../../constants/sidebarRoutes';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import axiosInstance from '@/helpers/axios';

export default async function BasketLayout({ children }) {
    const cookieStore = cookies();
    const token = cookieStore.get('token')?.value;

    if (!token) {
        redirect('/login');
    }
    const currentPath = '/riskprofile';

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

    return <main className="min-h-screen">
        {children}
    </main>
}
