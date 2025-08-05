import { sidebarItems } from '../../constants/sidebarRoutes';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import axiosInstance from '@/helpers/axios';
export default async function PortfolioLayout({ children }) {
    const cookieStore = cookies();
    const token = cookieStore.get('token')?.value;

    if (!token) {
        redirect('/login');
    }
    // Get current path from pathname (can also be hardcoded per layout)
    const currentPath = '/upload-portfolio'; // or get from route segment

    // Find label based on current path
    const matched = sidebarItems.find(item => item.path === currentPath);
    const label = matched?.label;

    if (!label) {
        redirect('/'); // or 404
    }
    let loading = false;
    try {
        loading = true
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
    } finally {
        loading = false
    }
    if (loading) {
        return <div className="flex items-center justify-center h-screen">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>
        </div>
    }

    return <main className="min-h-screen flex justify-center items-center">
        {children}
    </main>
}
