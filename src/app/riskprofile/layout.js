
import { sidebarItems } from '../../constants/sidebarRoutes';
import { redirect } from 'next/navigation';
import { fetchWithAuth } from '@/lib/api';
export default async function RiskProfileLayout({ children }) {
    const currentPath = '/riskprofile';
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
