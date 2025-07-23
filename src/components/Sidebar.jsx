'use client';

import Link from 'next/link';
import { sidebarItems } from '../constants/sidebarRoutes';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { ChevronLeft, ChevronRight, LogOut, LayoutGrid } from "lucide-react";
import { useAuth } from '@/providers/AuthProvider';
import axios from 'axios';

export default function Sidebar({ user, children }) {
    const [isOpen, setIsOpen] = useState(true);
    const pathname = usePathname();
    const { setIsAuthorized, setUser } = useAuth();

    const toggleSidebar = () => setIsOpen(!isOpen);
    console.log(sidebarItems)
    const allowedSidebar = sidebarItems.filter(route =>
        user?.sidebar?.some(item => item.label === route.label && item.access)
    );
    // const allowedSidebar = sidebarItems;

    console.log(allowedSidebar)
    const handleLogoutUser = async () => {
        try {
            const res = await axios.get('http://localhost:3030/v1/auth/logout', {
                withCredentials: true,
            });
            setUser(null);
            setIsAuthorized(false);
            window.location.href = '/';
        } catch (err) {
            console.error('Logout failed:', err);
        }
    };

    return (
        <>
            <div className="flex h-screen bg-gray-100 text-gray-800">
                {/* Sidebar */}
                <div
                    className={`fixed left-0 top-0 h-full bg-white border-r border-gray-200 transition-all duration-300 z-50 flex flex-col ${isOpen ? "w-64" : "w-20"
                        }`}
                >
                    {/* Header */}
                    <div className="flex items-center ml-3 justify-between p-4 border-b border-gray-200 flex-shrink-0">
                        {isOpen ? (
                            <div className="flex items-center">
                                <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center mr-2">
                                    <div className="w-4 h-4 bg-white rounded-full"></div>
                                </div>
                                <span className="font-bold text-gray-700 truncate">FinHub</span>
                            </div>
                        ) : (
                            <div className="flex justify-center w-full">
                                <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center">
                                    <div className="w-4 h-4 bg-white rounded-full"></div>
                                </div>
                            </div>
                        )}

                        <button
                            onClick={toggleSidebar}
                            className="p-1 rounded-lg hover:bg-gray-100 transition-colors"
                        >
                            {isOpen ? (
                                <ChevronLeft className="w-4 h-4 text-gray-600" />
                            ) : (
                                <ChevronRight className="w-4 h-4 text-gray-600" />
                            )}
                        </button>
                    </div>

                    {/* Navigation - Compact spacing */}
                    <div className="flex-1 overflow-y-auto py-2">
                        <nav className="space-y-1 px-2">
                            {allowedSidebar.map((item) => {
                                if (item.label === "Create User") return null;
                                const Icon = item.icon;
                                const isActive = pathname === item.path;

                                return (
                                    <Link
                                        key={item.path}
                                        href={item.path}
                                        className={`flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors ${isActive
                                            ? "bg-emerald-50 text-emerald-700"
                                            : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                                            } ${!isOpen ? "justify-center" : "px-3"}`}
                                    >
                                        {Icon && (
                                            <Icon
                                                className={`
                                                    ${isActive ? "text-emerald-600" : "text-gray-500"}
                                                    w-5 h-5
                                                    ${isOpen ? "mr-2" : ""}
                                                    flex-shrink-0
                                                `}
                                            />
                                        )}
                                        {isOpen && (
                                            <span className="truncate ml-1">{item.label}</span>
                                        )}
                                    </Link>
                                );
                            })}
                        </nav>
                    </div>

                    {/* User Profile and Logout - Compact */}
                    <div className="border-t border-gray-200 p-3 flex-shrink-0">
                        {user && (
                            <>
                                {isOpen ? (
                                    <div className="flex items-center ml-5 mb-2">
                                        <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center mr-2">
                                            <span className="text-xs font-medium text-gray-600">
                                                {user.username?.charAt(0).toUpperCase()}
                                            </span>
                                        </div>
                                        <div className="overflow-hidden">
                                            <p className="text-sm font-medium text-gray-900 truncate">{user.username}</p>
                                            <p className="text-xs text-gray-500 truncate">{user.role}</p>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="flex justify-center ml-3 mb-2">
                                        <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                                            <span className="text-xs font-medium text-gray-600">
                                                {user.username?.charAt(0).toUpperCase()}
                                            </span>
                                        </div>
                                    </div>
                                )}
                            </>
                        )}

                        <button
                            onClick={handleLogoutUser}
                            className={`w-full flex ml-3 items-center px-2 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 rounded-md transition-colors ${!isOpen ? "justify-center" : ""
                                }`}
                        >
                            <LogOut
                                className={`
                                    w-5 h-5
                                    text-gray-500
                                    ${isOpen ? "mr-2 ml-3" : ""}
                                `}
                            />
                            {isOpen && <span className="truncate">Log out</span>}
                        </button>
                    </div>
                </div>

                {/* Main Content */}
                <main
                    className={`flex flex-1 overflow-y-auto bg-white ml-0 transition-all duration-300 ${isOpen ? "lg:ml-64" : "lg:ml-20"
                        }`}
                >
                    {children}
                </main>
            </div>

            {/* Mobile Toggle Button */}
            <button
                onClick={toggleSidebar}
                className="fixed top-4 left-4 z-50 lg:hidden bg-white p-2 rounded-lg shadow-md border border-gray-200"
            >
                <LayoutGrid className="w-4 h-4 text-gray-600" />
            </button>
        </>
    );
}