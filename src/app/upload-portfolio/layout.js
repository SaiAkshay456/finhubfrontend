import { sidebarItems } from '../../constants/sidebarRoutes';
import { redirect } from 'next/navigation';
// import axiosInstance from '@/helpers/axios';
import { fetchWithAuth } from '@/lib/api';
export default async function PortfolioLayout({ children }) {
    const currentPath = '/upload-portfolio';
    const matched = sidebarItems.find(item => item.path === currentPath);
    const label = matched?.label;
    if (!label) {
        redirect('/'); // or 404
    }
    let loading = false;
    try {
        loading = true
        const { data, error } = await fetchWithAuth('/v1/permission-route/check-access', {
            method: 'POST',
            data: { path: label }
        }
        )
        // const { data } = await axiosInstance.post('/v1/permission-route/check-access', { path: label }, {
        //     headers: {
        //         'Content-Type': 'application/json',

        //     },
        // });
        console.log("Access check data: success", data)
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
