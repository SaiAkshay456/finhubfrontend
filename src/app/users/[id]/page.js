import { cookies } from "next/headers";
import { redirect } from 'next/navigation';
import KycFormUser from "../../../components/KycFormUser";

export default async function UserDetailsPage({ params }) {
    const token = await cookies().get('token')?.value;
    if (!token) redirect('/login');

    const { id } = params;
    let user, error;

    try {
        const res = await fetch(`http://localhost:3030/api/v1/adminuse/users/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
            cache: "no-store",
        });
        const data = await res.json();
        user = data.success ? data.user : null;
        error = data.success ? null : data.message || 'Failed to fetch user';
    } catch (err) {
        error = 'Failed to fetch user details';
    }

    if (error) return (
        <div className="max-w-md mx-auto p-4 bg-red-50 text-red-700 rounded-lg border-l-4 border-red-500">
            <p className="font-medium">Error: {error}</p>
        </div>
    );

    if (!user) return (
        <div className="max-w-md mx-auto p-4 text-center">
            <div className="animate-spin h-8 w-8 mx-auto border-4 border-blue-500 border-t-transparent rounded-full"></div>
        </div>
    );

    return (
        <div className="max-w-4xl mx-auto p-4 space-y-6">
            {/* KYC Verification Form (when not completed) */}
            {!user.isKycCompleted && <KycFormUser userId={user._id} />}
            {/* User Details Section */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="p-6">
                    <div className="flex flex-col md:flex-row md:items-center gap-6">
                        <div className="w-24 h-24 rounded-full bg-blue-100 flex items-center justify-center text-3xl font-bold text-blue-600">
                            {user.firstName?.charAt(0)}{user.lastName?.charAt(0)}
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold">{user.firstName} {user.lastName}</h1>
                            <p className="text-gray-500">@{user.username}</p>
                            <div className="mt-2 flex flex-wrap gap-2">
                                <span className={`px-2 py-1 text-xs rounded-full ${user.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                    {user.isActive ? 'Active' : 'Suspended'}
                                </span>
                                <span className={`px-2 py-1 text-xs rounded-full ${user.isKycCompleted ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                                    {user.isKycCompleted ? 'KYC Verified' : 'KYC Pending'}
                                </span>
                                <span className="px-2 py-1 text-xs bg-gray-100 text-gray-800 rounded-full capitalize">
                                    {user.role}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="border-t border-gray-200 p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                            <h3 className="font-medium text-gray-900">Contact Information</h3>
                            <div>
                                <p className="text-sm text-gray-500">Email</p>
                                <p className="mt-1 text-sm font-medium">{user.email}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Phone</p>
                                <p className="mt-1 text-sm font-medium">{user.phoneNumber || 'N/A'}</p>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <h3 className="font-medium text-gray-900">Account Details</h3>
                            <div>
                                <p className="text-sm text-gray-500">Registration Date</p>
                                <p className="mt-1 text-sm font-medium">
                                    {new Date(user.createdAt).toLocaleDateString('en-US', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric'
                                    })}
                                </p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Onboarded Updated</p>
                                <p className="mt-1 text-sm font-medium">
                                    {new Date(user.updatedAt).toLocaleDateString('en-US', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric'
                                    })}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-gray-50 px-6 py-4 flex justify-end space-x-3">
                    <a href="/users" className="px-4 py-2 border rounded-md text-sm hover:bg-gray-100">
                        Back to Users
                    </a>
                    <a href={`/users/edit/${user._id}`} className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700">
                        Edit Profile
                    </a>
                </div>
            </div>
        </div>
    );
}