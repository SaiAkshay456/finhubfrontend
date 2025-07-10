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

    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    return (
        <div className="w-full max-w-6xl mx-auto p-4">
            {/* KYC Verification Form (when not completed) */}
            {!user.isKycCompleted && (
                <div className="mb-6">
                    <KycFormUser userId={user._id} />
                </div>
            )}

            {/* Compact User Card */}
            <div className="w-full bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                {/* Header Section */}
                <div className="p-4 sm:p-6 flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                    <div className="flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-blue-100 flex items-center justify-center text-xl sm:text-2xl font-bold text-blue-600">
                        {user.firstName?.charAt(0)}{user.lastName?.charAt(0)}
                    </div>

                    <div className="flex-1 min-w-0">
                        <h1 className="text-lg sm:text-xl font-bold text-gray-900 truncate">{user.firstName} {user.lastName}</h1>
                        <p className="text-gray-500 text-sm truncate">@{user.username}</p>
                        <div className="mt-2 flex flex-wrap gap-1.5">
                            <span className={`px-2 py-0.5 text-xs rounded-full ${user.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                {user.isActive ? 'Active' : 'Suspended'}
                            </span>
                            <span className={`px-2 py-0.5 text-xs rounded-full ${user.isKycCompleted ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                                {user.isKycCompleted ? 'KYC Verified' : 'KYC Pending'}
                            </span>
                            <span className="px-2 py-0.5 text-xs bg-gray-100 text-gray-800 rounded-full capitalize">
                                {user.role}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Main Content - Grid Layout */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 border-t border-gray-200">
                    {/* Personal Info */}
                    <div className="p-4 sm:p-6 border-b border-gray-200 md:border-r">
                        <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Personal</h3>
                        <div className="space-y-3">
                            <div>
                                <p className="text-xs text-gray-500">Full Name</p>
                                <p className="text-sm font-medium text-gray-900 truncate">{user.firstName} {user.lastName}</p>
                            </div>
                            <div>
                                <p className="text-xs text-gray-500">Date of Birth</p>
                                <p className="text-sm font-medium text-gray-900">{formatDate(user.dob)}</p>
                            </div>
                            <div>
                                <p className="text-xs text-gray-500">Gender</p>
                                <p className="text-sm font-medium text-gray-900 capitalize">{user.gender || 'N/A'}</p>
                            </div>
                        </div>
                    </div>

                    {/* Contact Info */}
                    <div className="p-4 sm:p-6 border-b border-gray-200 lg:border-r">
                        <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Contact</h3>
                        <div className="space-y-3">
                            <div>
                                <p className="text-xs text-gray-500">Email</p>
                                <p className="text-sm font-medium text-gray-900 truncate">{user.email}</p>
                            </div>
                            <div>
                                <p className="text-xs text-gray-500">Phone</p>
                                <p className="text-sm font-medium text-gray-900">{user.phoneNumber || 'N/A'}</p>
                            </div>
                        </div>
                    </div>

                    {/* Account Info */}
                    <div className="p-4 sm:p-6 border-b border-gray-200 md:border-b-0">
                        <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Account</h3>
                        <div className="space-y-3">
                            <div>
                                <p className="text-xs text-gray-500">Registered</p>
                                <p className="text-sm font-medium text-gray-900">{formatDate(user.createdAt)}</p>
                            </div>
                            <div>
                                <p className="text-xs text-gray-500">Last Updated</p>
                                <p className="text-sm font-medium text-gray-900">{formatDate(user.updatedAt)}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Permissions Section */}
                <div className="p-4 sm:p-6 border-t border-gray-200">
                    <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Permissions</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
                        {user.sidebar?.length > 0 ? (
                            user.sidebar.map((permission, index) => (
                                <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                                    <span className="text-xs font-medium text-gray-700 truncate">{permission.label}</span>
                                    <span className={`ml-2 px-1.5 py-0.5 text-[10px] rounded-full ${permission.access ? 'bg-green-100 text-green-800' : 'bg-gray-200 text-gray-600'}`}>
                                        {permission.access ? '✓' : '✗'}
                                    </span>
                                </div>
                            ))
                        ) : (
                            <p className="text-sm text-gray-500">No permissions set</p>
                        )}
                    </div>
                </div>

                {/* Actions */}
                <div className="p-4 bg-gray-50 border-t border-gray-200 flex flex-col sm:flex-row gap-2">
                    <a href="/users" className="flex-1 sm:flex-none px-4 py-2 text-sm text-center border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100 transition-colors">
                        Back to Users
                    </a>
                </div>
            </div>
        </div>
    );
}