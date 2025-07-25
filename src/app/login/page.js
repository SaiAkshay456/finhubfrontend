'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../providers/AuthProvider';
import { Mail, Lock, EyeOff, Info, Eye } from "lucide-react";
import axiosInstance from '@/helpers/axios';
import Link from 'next/link';

export default function LoginForm() {
    const { setUser, setIsAuthorized } = useAuth();
    const [form, setForm] = useState({ username: '', password: '' });
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const router = useRouter();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const res = await axiosInstance.post(
                '/v1/auth/login',
                form,
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );

            setUser(res.data.user);
            setIsAuthorized(true);
            const getCookie = (name) => {
                const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
                return match ? decodeURIComponent(match[2]) : null;
            };

            const callbackUrl = getCookie('callBackUrl') || "/";
            console.log(callbackUrl, "line 50");
            localStorage.setItem('clearCallBackCookie', 'true');
            // Redirect to the stored callback URL
            router.replace(callbackUrl);
            setIsLoading(false)

        } catch (err) {
            setError(err.response?.data.message || 'Login failed. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    if (isLoading) {
        return <div className="flex items-center justify-center h-screen">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>
        </div>
    }
    return (
        <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
            <div className="relative hidden lg:flex flex-col items-center justify-center p-8 gradient-bg">
                <div className="absolute top-1/4 left-1/4 w-48 h-48 bg-blue-800 rounded-full opacity-30 blur-3xl" />
                <div className="absolute bottom-1/4 right-1/4 w-32 h-32 bg-purple-500 rounded-full opacity-30 blur-3xl" />
                <div className="relative w-full max-w-md p-6 rounded-xl bg-white/30 backdrop-blur-md border border-white/20 z-10">
                    <div className="flex justify-between items-center mb-4">
                        <span className="text-sm text-gray-600 uppercase font-semibold">Market and PortFolio Trends</span>

                    </div>
                    <div className="flex items-center mb-6">
                        <h2 className="text-3xl font-bold mr-2">$58,668</h2>
                        <span className="flex items-center text-green-500 text-sm font-medium">
                            <Info className="h-4 w-4 mr-1" /> 12.9%
                        </span>
                    </div>
                    <div className="relative h-48 mb-6">

                        <div className="absolute left-0 top-0 text-xs text-gray-500">$20K</div>
                        <div className="absolute left-0 bottom-0 text-xs text-gray-500">$10K</div>

                        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-16 h-16 rounded-full border-4 border-green-200 border-t-green-600 flex items-center justify-center">
                            <div className="w-10 h-10 rounded-full bg-green-200" />
                        </div>

                        <svg
                            className="absolute left-16 right-0 top-0 bottom-0 w-[calc(100%-4rem)] h-full"
                            viewBox="0 0 300 150"
                            preserveAspectRatio="none"
                        >

                            <line x1="0" y1="75" x2="300" y2="75" stroke="#E5E7EB" strokeDasharray="2 2" />
                            <line x1="0" y1="150" x2="300" y2="150" stroke="#E5E7EB" strokeDasharray="2 2" />

                            <defs>
                                <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                    <stop offset="0%" stopColor="#00d09c" />   Groww light green
                                    <stop offset="100%" stopColor="#00b98b" />  Slightly darker green
                                </linearGradient>
                            </defs>
                            <path
                                d="M0,100 C30,80 60,120 90,90 C120,70 150,110 180,80 C210,60 240,100 270,70 C300,50"
                                fill="none"
                                stroke="url(#lineGradient)"
                                strokeWidth="2"
                                strokeLinecap="round"
                            />

                            <rect x="10" y="100" width="10" height="50" fill="#e6faf5" opacity="0.7" />
                            <rect x="40" y="80" width="10" height="70" fill="#d0f5ea" opacity="0.7" />
                            <rect x="70" y="110" width="10" height="40" fill="#baf0de" opacity="0.7" />
                            <rect x="100" y="90" width="10" height="60" fill="#a5ebd3" opacity="0.7" />
                            <rect x="130" y="70" width="10" height="80" fill="#8fe5c7" opacity="0.7" />
                            <rect x="160" y="100" width="10" height="50" fill="#7ae0bc" opacity="0.7" />
                            <rect x="190" y="80" width="10" height="70" fill="#64dab0" opacity="0.7" />
                            <rect x="220" y="110" width="10" height="40" fill="#4fd5a5" opacity="0.7" />
                            <rect x="250" y="90" width="10" height="60" fill="#39cf99" opacity="0.7" />
                            <rect x="280" y="70" width="10" height="80" fill="#24ca8e" opacity="0.7" />

                            <g transform="translate(200, 60)">
                                <rect x="0" y="-20" width="90" height="40" rx="4" ry="4" fill="white" stroke="#E5E7EB" />
                                <text x="8" y="-8" fontSize="10" fill="#6B7280">
                                    MARKET TRENDs
                                </text>
                                <text x="8" y="8" fontSize="12" fontWeight="bold" fill="#60A5FA">
                                    $21.3K
                                </text>
                                <text x="45" y="8" fontSize="10" fill="#6B7280">
                                    Jul 15 2025
                                </text>
                            </g>
                        </svg>
                        <div className="absolute bottom-0 left-16 text-xs text-gray-500">Aug 2024</div>
                        <div className="absolute bottom-0 right-0 text-xs text-gray-500">Jul 2025</div>
                    </div>

                    <h3 className="text-2xl font-bold text-center mb-2">Analyze and Optimize Your Portfolio Strategy</h3>
                    <p className="text-sm text-gray-500 text-center">
                        Our analytics tools help you identify trends, spot opportunities, and refine your stocks strategies. Explore
                        detailed reports and visualizations to optimize your portflio efforts.
                    </p>
                </div>
            </div>

            <div className="flex items-center justify-center p-8 bg-white">
                <div className="w-full max-w-md space-y-6">
                    <div className="flex items-center justify-start mb-8">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="h-6 w-6 text-blue-800 mr-2"
                        >
                            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                        </svg>
                        <span className="text-xl font-bold">Go FinHub</span>
                    </div>

                    <div className="space-y-2 text-left">
                        <h1 className="text-3xl font-bold">Sign in</h1>
                    </div>
                    {error && (
                        <div className="p-3 text-sm text-red-600 bg-red-50 rounded-lg border border-red-100 flex items-start">
                            <Info className="h-4 w-4 mr-2 mt-0.5" />
                            <span>{error}</span>
                        </div>
                    )}


                    <div className="flex bg-gray-100 rounded-lg p-1">
                        <button className="flex-1 h-10 rounded-md bg-gradient-to-r from-[#00d09c] to-[#00b98b] text-white shadow-md hover:from-[#00b98b] hover:to-[#00a47a] transition-colors">
                            Sign In
                        </button>
                        <button
                            className="flex-1 h-10 rounded-md text-gray-500 hover:bg-transparent hover:text-[#00b98b] transition-colors"
                            onClick={() => router.push('/login')}
                        >
                            Sign Up
                        </button>
                    </div>
                    <form onSubmit={handleSubmit} className="space-y-4">

                        <div className="space-y-2">
                            <label
                                htmlFor="username"
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                                Username
                            </label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                                <input
                                    id="username"
                                    name="username"
                                    type="text"
                                    autoFocus
                                    value={form.username}
                                    onChange={handleChange}
                                    placeholder="Enter your username"
                                    required
                                    className="flex h-10 w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-800 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 pl-10"
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label
                                htmlFor="password"
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                                Password
                            </label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                                <input
                                    id="password"
                                    name="password"
                                    type={showPassword ? "text" : "password"}
                                    value={form.password}
                                    onChange={handleChange}
                                    placeholder="Enter your password"
                                    required
                                    className="flex h-10 w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-800 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 pl-10 pr-10"
                                />
                                <button
                                    type="button"
                                    onClick={togglePasswordVisibility}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                >
                                    {showPassword ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                                </button>
                            </div>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                            <div className="flex items-center">
                                <input
                                    id="remember-me"
                                    name="remember-me"
                                    type="checkbox"
                                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                />
                                <label htmlFor="remember-me" className="ml-2 text-gray-600">
                                    Remember me
                                </label>
                            </div>

                            <a href="#" className="text-blue-600 hover:text-blue-800 font-medium text-sm">
                                Forgot password?
                            </a>
                        </div>


                        <button
                            type="submit"
                            disabled={isLoading}
                            className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2 w-full bg-gradient-to-r from-[#00d09c] to-[#00b98b] text-white shadow-md hover:from-[#00b98b] hover:to-[#00a47a] focus:ring-2 focus:ring-[#00d09c]/50 disabled:opacity-70"
                        >
                            {isLoading ? (
                                <>
                                    <svg className="animate-spin h-4 w-4 text-white mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Signing in...
                                </>
                            ) : (
                                'Sign In'
                            )}
                        </button>
                    </form>

                    <div className="mt-4 text-center text-sm text-gray-500">
                        Dont have an account?{" "}
                        <Link href="/" className="text-blue-600 hover:text-blue-800 underline">
                            Sign Up
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}