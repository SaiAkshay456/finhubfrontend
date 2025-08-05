import axiosInstance from '@/helpers/axios';
import { sidebarItems } from '../../constants/sidebarRoutes';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export const metadata = {
    title: "Add User Page",
    description: "Browse and add user here",
};
export default async function Layout({ children }) {
    const cookieStore = cookies();
    const token = cookieStore.get('token')?.value;

    if (!token) {
        redirect('/login');
    }
    const currentPath = '/createuser'; // or get from route segment

    const matched = sidebarItems.find(item => item.path === currentPath);
    const label = matched?.label;

    if (!label) {
        redirect('/'); // or 404
    }
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


    return <main className="min-h-screen flex justify-center items-center">
        {children}
    </main>
}
