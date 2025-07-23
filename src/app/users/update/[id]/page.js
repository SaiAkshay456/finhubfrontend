import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
// import UpdateUserForm from '@/components/UpdateUserForm'; // You'll create this next
import UpdateUserForm from '../../../../components/UpdateUserForm';
export default async function UpdateUserPage({ params }) {
    const token1 = await cookies()
    const token = token1.get('token')?.value;
    if (!token) redirect('/login');
    const { id } = params;
    let loading = false;
    let data = null;
    try {
        loading = true;
        const res = await fetch(`http://localhost:3030/v1/users/user/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
            cache: "no-store",
        });
        data = await res.json();
        loading = false;
    } catch (err) {
        loading = false
        console.log(err);
    }

    if (loading) {
        return <div className="flex items-center justify-center h-screen">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>
        </div>
    }

    if (!data.success) {
        return (
            <div className="text-red-500 p-4 text-center">
                Failed to fetch user details: {data.message}
            </div>
        );
    }

    return (
        <div className="max-w-3xl mx-auto p-6 rounded">
            <UpdateUserForm user={data.user} token={token} />
        </div>
    );
}
