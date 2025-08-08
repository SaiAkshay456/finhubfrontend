import { sidebarItems } from '../../constants/sidebarRoutes';
import { redirect } from 'next/navigation';
import { fetchWithAuth } from '@/lib/api';
export const metadata = {
    title: "Add User Page",
    description: "Browse and add user here",
};
export default async function Layout({ children }) {
    const currentPath = '/createuser'; // or get from route segment

    const matched = sidebarItems.find(item => item.path === currentPath);
    const label = matched?.label;

    if (!label) {
        redirect('/'); // or 404
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


    return <main className="min-h-screen flex justify-center items-center">
        {children}
    </main>
}
