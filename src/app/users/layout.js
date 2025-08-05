import axiosInstance from '@/helpers/axios';
import { sidebarItems } from '../../constants/sidebarRoutes';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export const metadata = {
    title: "Users Page",
    description: "Browse and manage users",
};

export default async function Layout({ children }) {
    const cookieStore = cookies();
    const token = cookieStore.get('token')?.value;
    console.log(token, "14 line")

    const currentPath = '/users'; // or get from route segment
    console.log(token, "17 line")
    // Find label based on current path
    const matched = sidebarItems.find(item => item.path === currentPath);
    const label = matched?.label;
    console.log(token, "2 line")

    if (!label) {
        redirect('/'); // or 404
    }
    try {
        console.log(token, "27 line")
        const { data } = await axiosInstance.post('/v1/permission-route/check-access', { path: label }, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        console.log(data)
        console.log("35 line")
        if (!data.success) {
            redirect('/unauthorized');
        }
    } catch (err) {
        if (err.response?.status === 401) {
            console.log("41 line", err)
            redirect('/unauthorized');
        } else {
            console.error('Access check failed:', err);
        }
    }

    return <main className="min-h-screen">
        {children}
    </main>
}
