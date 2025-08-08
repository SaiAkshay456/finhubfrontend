
import { sidebarItems } from '../../constants/sidebarRoutes';
import { redirect } from 'next/navigation';
// import axiosInstance from '@/helpers/axios';
import { fetchWithAuth } from '@/lib/api';


export default async function BasketLayout({ children }) {
    const currentPath = '/baskets';
    const matched = sidebarItems.find(item => item.path === currentPath);
    const label = matched?.label;

    if (!label) {
        redirect('/');
    }
    try {
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

    return <main className="min-h-screen">
        {children}
    </main>
}

