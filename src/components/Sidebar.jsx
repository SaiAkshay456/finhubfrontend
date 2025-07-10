'use client';

import Link from 'next/link';
import { sidebarItems } from '../constants/sidebarRoutes';
import { IoInfinite } from "react-icons/io5";
import { usePathname } from 'next/navigation';
import { useState } from 'react';

export default function Sidebar({ user, children }) {
    const [isOpen, setIsOpen] = useState(true);
    const pathname = usePathname();

    const toggleSidebar = () => setIsOpen(!isOpen);

    const allowedSidebar = sidebarItems
        .filter(route =>
            user?.sidebar?.some(item => item.label === route.label && item.access)
        )
    // .filter(route => route.label !== "Create User"); // hide this Create User 

    return (
        <div className="flex h-screen bg-gray-50 text-gray-800">
            <aside className={`
                ${isOpen ? 'w-72' : 'w-20'}  // ⬅️ Increased width
                transition-all duration-300 ease-in-out
                bg-white border-r border-gray-200 shadow-lg
                flex flex-col
            `}>
                <div className="flex items-center justify-between p-4 border-b border-gray-200">
                    <div className="flex items-center space-x-2 overflow-hidden">
                        <span className="text-2xl"><IoInfinite /></span>
                        {isOpen && (
                            <span className="text-xl font-extrabold tracking-wide text-blue-600">
                                FinHub
                            </span>
                        )}
                    </div>
                    <button
                        onClick={toggleSidebar}
                        className="p-2 rounded-md hover:bg-gray-100 focus:outline-none"
                    >
                        <div className="space-y-1 w-5">
                            <span className="block h-0.5 bg-gray-600"></span>
                            <span className="block h-0.5 bg-gray-600"></span>
                            <span className="block h-0.5 bg-gray-600"></span>
                        </div>
                    </button>
                </div>

                <nav className="flex-1 overflow-y-auto px-2 py-4">
                    <ul className="space-y-1">
                        {allowedSidebar.map((item) => {
                            if (item.label === "Create User") return null; // ⬅️ Hide here safely
                            const Icon = item.icon;
                            return (
                                <li key={item.path}>
                                    <Link
                                        href={item.path}
                                        className={`
                                            flex items-center p-3 rounded-lg
                                            transition-all duration-200
                                            text-base font-semibold
                                            ${pathname === item.path
                                                ? 'bg-blue-100 text-blue-700'
                                                : 'hover:bg-gray-100'}
                                            ${isOpen ? 'justify-start' : 'justify-center'}
                                        `}
                                    >
                                        {Icon && (
                                            <span className={`text-xl ${isOpen ? 'mr-3' : ''}`}>
                                                <Icon />
                                            </span>
                                        )}
                                        {isOpen && <span>{item.label}</span>}
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </nav>
            </aside>

            <main className="flex-1 p-6 overflow-y-auto">
                {children}
            </main>
        </div>
    );
}
