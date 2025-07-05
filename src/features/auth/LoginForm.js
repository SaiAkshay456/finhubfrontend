'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../providers/AuthProvider';
import axios from 'axios';
export default function LoginForm() {
    const { setUser, user, setIsAuthorized } = useAuth();
    const [form, setForm] = useState({ username: '', email: '', password: '' });
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const res = await axios.post(
                'http://localhost:3030/api/v1/auth/login',
                form,
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    withCredentials: true,
                }
            );

            let data = res.data;
            setUser(data.user);
            setIsAuthorized(true);
            console.log('Login success:', data);
            router.replace("/");
        } catch (err) {
            console.error('Login failed:', err);
            setError(err.response?.data.message || 'Login failed. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center p-4">
            <div className="w-full max-w-xl"> {/* Increased width */}
                <div className="text-center mb-4"> {/* Reduced margin */}
                    <div className="mx-auto w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center text-white text-xl font-bold mb-2">
                        Logo
                    </div>
                    <h1 className="text-xl font-normal text-gray-800">Sign in</h1>
                    <p className="text-gray-500 text-xs mt-1">to continue to your account</p>
                </div>

                <div className="border border-gray-200 rounded-lg p-6"> {/* Reduced padding */}
                    {error && (
                        <div className="mb-3 p-2 text-xs text-red-600 bg-red-50 rounded border border-red-100">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-3"> {/* Reduced spacing */}
                        <div>
                            <label htmlFor="username" className="block text-xs font-medium text-gray-700 mb-1">
                                Username
                            </label>
                            <input
                                id="username"
                                name="username"
                                type="text"
                                autoFocus
                                value={form.username}
                                onChange={handleChange}
                                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-xs font-medium text-gray-700 mb-1">
                                Email
                            </label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                value={form.email}
                                onChange={handleChange}
                                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-xs font-medium text-gray-700 mb-1">
                                Password
                            </label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                value={form.password}
                                onChange={handleChange}
                                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                required
                            />
                        </div>

                        <div className="flex items-center justify-between text-xs">
                            <div className="flex items-center">
                                <input
                                    id="remember-me"
                                    name="remember-me"
                                    type="checkbox"
                                    className="h-3 w-3 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                />
                                <label htmlFor="remember-me" className="ml-2 text-gray-600">
                                    Remember me
                                </label>
                            </div>

                            <a href="#" className="text-blue-600 hover:text-blue-500">
                                Forgot password?
                            </a>
                        </div>

                        <div className="pt-1">
                            <button
                                type="submit"
                                disabled={isLoading}
                                className={`w-full py-2 px-4 text-sm rounded-md text-white font-medium ${isLoading ? 'bg-blue-300 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                            >
                                {isLoading ? (
                                    <span className="flex items-center justify-center">
                                        <svg className="animate-spin -ml-1 mr-2 h-3 w-3 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Signing in...
                                    </span>
                                ) : 'Sign in'}
                            </button>
                        </div>
                    </form>
                </div>

                <div className="mt-3 text-center text-xs text-gray-500"> {/* Reduced margin */}
                    <p>
                        Don't have an account?{' '}
                        <a href="#" className="font-medium text-blue-600 hover:text-blue-500">
                            Sign up
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
}