
import { sidebarItems } from '../../constants/sidebarRoutes';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import axiosInstance from '@/helpers/axios';

export default async function BasketLayout({ children }) {
    const currentPath = '/riskprofile';
    const matched = sidebarItems.find(item => item.path === currentPath);
    const label = matched?.label;

    if (!label) {
        redirect('/');
    }
    try {
        const { data } = await axiosInstance.post('/v1/permission-route/check-access', { path: label }, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!data.success) {
            redirect('/unauthorized');
        }
    } catch (err) {
        if (err.response?.status === 401) {
            console.log(err)
            redirect('/unauthorized');
        } else {
            console.log('Access check failed:', err);
        }
    }

    return <main className="min-h-screen">
        {children}
    </main>
}
