import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
// import UpdateUserForm from '@/components/UpdateUserForm'; // You'll create this next
import UpdateUserForm from '../../../../components/UpdateUserForm';
export default async function UpdateUserPage({ params }) {
    const token = await cookies().get('token')?.value;
    if (!token) redirect('/login');
    const { id } = await params;

    const res = await fetch(`http://localhost:3030/api/v1/adminuse/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
        cache: "no-store",
    });

    const data = await res.json();

    if (!data.success) {
        return (
            <div className="text-red-500 p-4 text-center">
                Failed to fetch user details: {data.message}
            </div>
        );
    }

    return (
        <div className="max-w-3xl mx-auto p-6 bg-white shadow rounded">
            <h2 className="text-xl font-bold mb-4">Edit User Profile</h2>
            <UpdateUserForm user={data.user} token={token} />
        </div>
    );
}
