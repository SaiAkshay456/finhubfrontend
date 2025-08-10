// 'use client';
// import { useState } from 'react';
// import { useRouter } from 'next/navigation';
// import clientAxiosInstance from '@/lib/clientAxios';

// export default function TempLoginUser({ tokenId }) {
//     const [formData, setFormData] = useState({ username: '', password: '' });
//     const [error, setError] = useState('');
//     const [isLoading, setIsLoading] = useState(false);
//     const router = useRouter();
//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setIsLoading(true);
//         setError('');
//         try {
//             const { data } = await clientAxiosInstance.post('/v1/response-login/login-user', { ...formData, tokenId }, {
//                 headers: { 'Content-Type': 'application/json' },
//             });
//             if (!data.success) {
//                 setError(data.message || 'Invalid credentials');
//             } else {
//                 router.refresh(); // Refresh the server component
//             }
//         } catch (err) {
//             console.log(err);
//             setError(err.response?.data?.message);
//         } finally {
//             setIsLoading(false);
//         }
//     };
//     return (
//         <form onSubmit={handleSubmit} className="space-y-6">
//             {/* Error Message */}
//             {error && (
//                 <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-center space-x-3">
//                     <svg className="w-5 h-5 text-red-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//                     </svg>
//                     <p className="text-red-700 text-sm font-medium">{error}</p>
//                 </div>
//             )}

//             {/* Username Input */}
//             <div className="space-y-2">
//                 <label htmlFor="username" className="block text-sm font-semibold text-gray-700">
//                     Username
//                 </label>
//                 <div className="relative">
//                     <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                         <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
//                         </svg>
//                     </div>
//                     <input
//                         id="username"
//                         type="text"
//                         placeholder="Enter your username"
//                         className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 bg-gray-50 focus:bg-white"
//                         value={formData.username}
//                         onChange={(e) => setFormData({ ...formData, username: e.target.value })}
//                         required
//                         disabled={isLoading}
//                     />
//                 </div>
//             </div>

//             {/* Password Input */}
//             <div className="space-y-2">
//                 <label htmlFor="password" className="block text-sm font-semibold text-gray-700">
//                     Password
//                 </label>
//                 <div className="relative">
//                     <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                         <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
//                         </svg>
//                     </div>
//                     <input
//                         id="password"
//                         type="password"
//                         placeholder="Enter your password"
//                         className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 bg-gray-50 focus:bg-white"
//                         value={formData.password}
//                         onChange={(e) => setFormData({ ...formData, password: e.target.value })}
//                         required
//                         disabled={isLoading}
//                     />
//                 </div>
//             </div>

//             {/* Submit Button */}
//             <button
//                 type="submit"
//                 disabled={isLoading}
//                 className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-4 rounded-xl hover:from-blue-700 hover:to-purple-700 focus:ring-4 focus:ring-blue-200 transition-all duration-200 font-semibold text-sm disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
//             >
//                 {isLoading ? (
//                     <>
//                         <svg className="w-5 h-5 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
//                         </svg>
//                         <span>Signing in...</span>
//                     </>
//                 ) : (
//                     <>
//                         <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
//                         </svg>
//                         <span>Sign In</span>
//                     </>
//                 )}
//             </button>

//             {/* Security Notice */}
//             <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-xl">
//                 <div className="flex items-center space-x-2">
//                     <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//                     </svg>
//                     <p className="text-blue-700 text-xs">
//                         Use the temporary credentials sent to your email
//                     </p>
//                 </div>
//             </div>
//         </form>
//     );
// }

'use client';

import { useState } from 'react';
import clientAxiosInstance from '@/lib/clientAxios';

// The component now accepts an `onLoginSuccess` callback function
export default function TempLoginUser({ tokenId, onLoginSuccess }) {
    const [formData, setFormData] = useState({ username: '', password: '' });
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');
        try {
            const { data } = await clientAxiosInstance.post('/v1/response-login/login-user', { ...formData, tokenId }, {
                headers: { 'Content-Type': 'application/json' },
            });

            if (!data.success) {
                setError(data.message || 'Invalid credentials');
            } else {
                // On success, call the callback from the parent instead of refreshing
                if (onLoginSuccess) {
                    onLoginSuccess();
                }
            }
        } catch (err) {
            console.error(err);
            setError(err.response?.data?.message || 'Login failed. Please check your credentials.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
                <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-center space-x-3">
                    <svg className="w-5 h-5 text-red-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p className="text-red-700 text-sm font-medium">{error}</p>
                </div>
            )}
            <div className="space-y-2">
                <label htmlFor="username" className="block text-sm font-semibold text-gray-700">
                    Username
                </label>
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                    </div>
                    <input
                        id="username"
                        type="text"
                        placeholder="Enter your username"
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 bg-gray-50 focus:bg-white"
                        value={formData.username}
                        onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                        required
                        disabled={isLoading}
                    />
                </div>
            </div>
            <div className="space-y-2">
                <label htmlFor="password" className="block text-sm font-semibold text-gray-700">
                    Password
                </label>
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                    </div>
                    <input
                        id="password"
                        type="password"
                        placeholder="Enter your password"
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 bg-gray-50 focus:bg-white"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        required
                        disabled={isLoading}
                    />
                </div>
            </div>
            <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-4 rounded-xl hover:from-blue-700 hover:to-purple-700 focus:ring-4 focus:ring-blue-200 transition-all duration-200 font-semibold text-sm disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
                {isLoading ? (
                    <>
                        <svg className="w-5 h-5 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                        </svg>
                        <span>Signing in...</span>
                    </>
                ) : (
                    <>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                        </svg>
                        <span>Sign In</span>
                    </>
                )}
            </button>
            <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-xl">
                <div className="flex items-center space-x-2">
                    <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p className="text-blue-700 text-xs">
                        Use the temporary credentials sent to your email
                    </p>
                </div>
            </div>
        </form>
    );
}