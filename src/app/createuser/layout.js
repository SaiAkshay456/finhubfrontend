import { sidebarItems } from '../../constants/sidebarRoutes';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';


export const metadata = {
    title: "Add User Page",
    description: "Browse and add user here",
};
export default async function Layout({ children }) {
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;

    if (!token) {
        redirect('/login');
    }
    // Get current path from pathname (can also be hardcoded per layout)
    const currentPath = '/createuser'; // or get from route segment

    // Find label based on current path
    const matched = sidebarItems.find(item => item.path === currentPath);
    const label = matched?.label;

    if (!label) {
        redirect('/'); // or 404
    }

    // Send label to backend to check access
    const res = await fetch('http://localhost:3030/api/v1/permission-route/check-access', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        // credentials: 'include',optional if you need keep 
        body: JSON.stringify({ path: label }),
        // cache: 'no-store',
    });

    const data = await res.json();

    if (!data.success) {
        redirect('/unauthorized');
    }

    return <main className="min-h-screen flex justify-center items-center">
        {children}
    </main>
}
