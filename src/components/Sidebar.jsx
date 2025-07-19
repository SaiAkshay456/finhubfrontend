// 'use client';

// import Link from 'next/link';
// import { sidebarItems } from '../constants/sidebarRoutes';
// import { IoInfinite } from "react-icons/io5";
// import { usePathname } from 'next/navigation';
// import { useState } from 'react';

// export default function Sidebar({ user, children }) {
//     const [isOpen, setIsOpen] = useState(true);
//     const pathname = usePathname();

//     const toggleSidebar = () => setIsOpen(!isOpen);

//     const allowedSidebar = sidebarItems.filter(route =>
//         user?.sidebar?.some(item => item.label === route.label && item.access)
//     );

//     return (
//         <div className="flex h-screen bg-gray-100 text-gray-800">
//             <aside className={`
//                 ${isOpen ? 'w-72' : 'w-20'}
//                 transition-all duration-300 ease-in-out
//                 bg-white border-r border-gray-200 shadow-md
//                 flex flex-col z-20
//             `}>
//                 <div className="flex items-center justify-between p-4 border-b border-gray-200">
//                     <div className="flex items-center overflow-hidden space-x-2">
//                         <span className="text-2xl text-blue-600"><IoInfinite /></span>
//                         {isOpen && (
//                             <span className="text-xl font-bold tracking-wide text-blue-700">
//                                 FinHub
//                             </span>
//                         )}
//                     </div>
//                     <button
//                         onClick={toggleSidebar}
//                         className="p-2 rounded hover:bg-gray-100 transition"
//                         aria-label="Toggle Sidebar"
//                     >
//                         <div className="space-y-1">
//                             <span className="block h-0.5 w-5 bg-gray-600"></span>
//                             <span className="block h-0.5 w-5 bg-gray-600"></span>
//                             <span className="block h-0.5 w-5 bg-gray-600"></span>
//                         </div>
//                     </button>
//                 </div>

//                 <nav className="flex-1 overflow-y-auto px-2 py-4">
//                     <ul className="space-y-2">
//                         {allowedSidebar.map((item) => {
//                             if (item.label === "Create User") return null;
//                             const Icon = item.icon;

//                             const isActive = pathname === item.path;
//                             return (
//                                 <li key={item.path}>
//                                     <Link
//                                         href={item.path}
//                                         className={`
//                                             flex items-center rounded-lg px-4 py-3
//                                             transition-all duration-200
//                                             font-medium group
//                                             ${isActive
//                                                 ? 'bg-blue-100 text-blue-700'
//                                                 : 'text-gray-700 hover:bg-gray-100 hover:text-blue-600'}
//                                             ${isOpen ? 'justify-start' : 'justify-center'}
//                                         `}
//                                     >
//                                         {Icon && (
//                                             <Icon className={`text-xl ${isOpen ? 'mr-3' : ''}`} />
//                                         )}
//                                         {isOpen && <span>{item.label}</span>}
//                                     </Link>
//                                 </li>
//                             );
//                         })}
//                     </ul>
//                 </nav>
//             </aside>

//             <main className="flex-1 p-6 overflow-y-auto bg-white shadow-inner rounded-l-xl">
//                 {children}
//             </main>
//         </div>
//     );
// }

// "use client"

// import { useState } from "react"
// import {
//     ChevronRight,
//     ChevronLeft,
//     LayoutGrid,
//     ShoppingCart,
//     Package,
//     MapPin,
//     Users,
//     Tag,
//     Calculator,
//     DollarSign,
//     Settings,
//     Moon,
//     LogOut,
// } from "lucide-react"

// export default function Sidebar() {
//     const [isExpanded, setIsExpanded] = useState(true)
//     const [isDarkMode, setIsDarkMode] = useState(false)

//     const toggleSidebar = () => {
//         setIsExpanded(!isExpanded)
//     }

//     const toggleDarkMode = () => {
//         setIsDarkMode(!isDarkMode)
//     }

//     const menuItems = {
//         marketing: [
//             { icon: LayoutGrid, label: "Dashboard", active: true },
//             { icon: ShoppingCart, label: "Marketplace" },
//             { icon: Package, label: "Orders" },
//             { icon: MapPin, label: "Tracking" },
//             { icon: Users, label: "Customers" },
//             { icon: Tag, label: "Discounts" },
//         ],
//         payments: [
//             { icon: Calculator, label: "Ledger" },
//             { icon: DollarSign, label: "Taxes" },
//         ],
//         system: [
//             { icon: Settings, label: "Settings" },
//             { icon: Moon, label: "Dark mode", toggle: true },
//         ],
//     }

//     return (
//         <>
//             {/* Mobile Overlay */}
//             {isExpanded && <div className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden" onClick={toggleSidebar} />}

//             {/* Sidebar */}
//             <div
//                 className={`fixed left-0 top-0 h-full bg-white border-r border-gray-200 transition-all duration-300 z-50 flex flex-col ${isExpanded ? "w-64" : "w-20" // Collapsed width remains 20
//                     } ${isExpanded ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}
//             >
//                 {/* Header */}
//                 <div className="flex items-center justify-between p-4 border-b border-gray-200 flex-shrink-0">
//                     {isExpanded ? (
//                         <div className="flex items-center space-x-3">
//                             <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center">
//                                 <div className="w-4 h-4 bg-white rounded-full"></div>
//                             </div>
//                             <span className="font-semibold text-gray-900">Flup</span>
//                         </div>
//                     ) : (
//                         <div className="flex justify-center w-full">
//                             <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center">
//                                 <div className="w-4 h-4 bg-white rounded-full"></div>
//                             </div>
//                         </div>
//                     )}

//                     <button onClick={toggleSidebar} className="p-1 rounded-lg hover:bg-gray-100 transition-colors">
//                         {isExpanded ? (
//                             <ChevronLeft className="w-5 h-5 text-gray-600" />
//                         ) : (
//                             <ChevronRight className="w-5 h-5 text-gray-600" />
//                         )}
//                     </button>
//                 </div>

//                 {/* Scrollable Navigation */}
//                 <div className="flex-1 overflow-y-auto py-4">
//                     {/* Marketing Section */}
//                     <div className="px-4 mb-6">
//                         {isExpanded ? (
//                             <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-3">Marketing</h3>
//                         ) : (
//                             <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider text-center mb-3">M</h3>
//                         )}
//                         <nav className="space-y-1">
//                             {menuItems.marketing.map((item, index) => (
//                                 <button
//                                     key={index}
//                                     className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${item.active
//                                         ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
//                                         : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
//                                         } ${!isExpanded ? "justify-center" : ""}`}
//                                 >
//                                     <item.icon
//                                         className={`
//                       ${item.active ? "text-emerald-600" : "text-gray-500"}
//                       ${isExpanded ? "w-5 h-5" : "w-8 h-8"} // Increased icon size for collapsed state
//                       ${!isExpanded ? "lg:w-5 lg:h-5" : ""} // Normal size on desktop even when collapsed
//                     `}
//                                     />
//                                     {isExpanded && <span className="ml-3 flex-1 text-left">{item.label}</span>}
//                                 </button>
//                             ))}
//                         </nav>
//                     </div>

//                     {/* Payments Section */}
//                     <div className="px-4 mb-6">
//                         {isExpanded ? (
//                             <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-3">Payments</h3>
//                         ) : (
//                             <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider text-center mb-3">P</h3>
//                         )}
//                         <nav className="space-y-1">
//                             {menuItems.payments.map((item, index) => (
//                                 <button
//                                     key={index}
//                                     className={`w-full flex items-center px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 rounded-lg transition-colors ${!isExpanded ? "justify-center" : ""}`}
//                                 >
//                                     <item.icon
//                                         className={`
//                       ${isExpanded ? "w-5 h-5" : "w-8 h-8"}
//                       ${!isExpanded ? "lg:w-5 lg:h-5" : ""}
//                       text-gray-500
//                     `}
//                                     />
//                                     {isExpanded && <span className="ml-3">{item.label}</span>}
//                                 </button>
//                             ))}
//                         </nav>
//                     </div>

//                     {/* System Section */}
//                     <div className="px-4 mb-6">
//                         {isExpanded ? (
//                             <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-3">System</h3>
//                         ) : (
//                             <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider text-center mb-3">S</h3>
//                         )}
//                         <nav className="space-y-1">
//                             {menuItems.system.map((item, index) => (
//                                 <button
//                                     key={index}
//                                     className={`w-full flex items-center px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 rounded-lg transition-colors ${!isExpanded ? "justify-center" : ""}`}
//                                     onClick={item.toggle ? toggleDarkMode : undefined}
//                                 >
//                                     <item.icon
//                                         className={`
//                       ${isExpanded ? "w-5 h-5" : "w-8 h-8"}
//                       ${!isExpanded ? "lg:w-5 lg:h-5" : ""}
//                       text-gray-500
//                     `}
//                                     />
//                                     {isExpanded && (
//                                         <>
//                                             <span className="ml-3 flex-1 text-left">{item.label}</span>
//                                             {item.toggle && (
//                                                 <div
//                                                     className={`w-10 h-6 rounded-full transition-colors ${isDarkMode ? "bg-emerald-500" : "bg-gray-300"
//                                                         }`}
//                                                 >
//                                                     <div
//                                                         className={`w-4 h-4 bg-white rounded-full shadow-sm transition-transform mt-1 ${isDarkMode ? "translate-x-5 ml-1" : "translate-x-1 ml-1"
//                                                             }`}
//                                                     />
//                                                 </div>
//                                             )}
//                                         </>
//                                     )}
//                                 </button>
//                             ))}
//                         </nav>
//                     </div>

//                     {/* Additional Menu Items for Scroll Demo */}
//                     <div className="px-4 mb-6">
//                         {isExpanded ? (
//                             <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-3">Reports</h3>
//                         ) : (
//                             <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider text-center mb-3">R</h3>
//                         )}
//                         <nav className="space-y-1">
//                             <button
//                                 className={`w-full flex items-center px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 rounded-lg transition-colors ${!isExpanded ? "justify-center" : ""}`}
//                             >
//                                 <LayoutGrid
//                                     className={`
//                     ${isExpanded ? "w-5 h-5" : "w-8 h-8"}
//                     ${!isExpanded ? "lg:w-5 lg:h-5" : ""}
//                     text-gray-500
//                   `}
//                                 />
//                                 {isExpanded && <span className="ml-3">Analytics</span>}
//                             </button>
//                             <button
//                                 className={`w-full flex items-center px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 rounded-lg transition-colors ${!isExpanded ? "justify-center" : ""}`}
//                             >
//                                 <Package
//                                     className={`
//                     ${isExpanded ? "w-5 h-5" : "w-8 h-8"}
//                     ${!isExpanded ? "lg:w-5 lg:h-5" : ""}
//                     text-gray-500
//                   `}
//                                 />
//                                 {isExpanded && <span className="ml-3">Sales Report</span>}
//                             </button>
//                             <button
//                                 className={`w-full flex items-center px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 rounded-lg transition-colors ${!isExpanded ? "justify-center" : ""}`}
//                             >
//                                 <Users
//                                     className={`
//                     ${isExpanded ? "w-5 h-5" : "w-8 h-8"}
//                     ${!isExpanded ? "lg:w-5 lg:h-5" : ""}
//                     text-gray-500
//                   `}
//                                 />
//                                 {isExpanded && <span className="ml-3">User Activity</span>}
//                             </button>
//                         </nav>
//                     </div>

//                     <div className="px-4 mb-6">
//                         {isExpanded ? (
//                             <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-3">Tools</h3>
//                         ) : (
//                             <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider text-center mb-3">T</h3>
//                         )}
//                         <nav className="space-y-1">
//                             <button
//                                 className={`w-full flex items-center px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 rounded-lg transition-colors ${!isExpanded ? "justify-center" : ""}`}
//                             >
//                                 <Calculator
//                                     className={`
//                     ${isExpanded ? "w-5 h-5" : "w-8 h-8"}
//                     ${!isExpanded ? "lg:w-5 lg:h-5" : ""}
//                     text-gray-500
//                   `}
//                                 />
//                                 {isExpanded && <span className="ml-3">Calculator</span>}
//                             </button>
//                             <button
//                                 className={`w-full flex items-center px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 rounded-lg transition-colors ${!isExpanded ? "justify-center" : ""}`}
//                             >
//                                 <Tag
//                                     className={`
//                     ${isExpanded ? "w-5 h-5" : "w-8 h-8"}
//                     ${!isExpanded ? "lg:w-5 lg:h-5" : ""}
//                     text-gray-500
//                   `}
//                                 />
//                                 {isExpanded && <span className="ml-3">Bulk Editor</span>}
//                             </button>
//                             <button
//                                 className={`w-full flex items-center px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 rounded-lg transition-colors ${!isExpanded ? "justify-center" : ""}`}
//                             >
//                                 <MapPin
//                                     className={`
//                     ${isExpanded ? "w-5 h-5" : "w-8 h-8"}
//                     ${!isExpanded ? "lg:w-5 lg:h-5" : ""}
//                     text-gray-500
//                   `}
//                                 />
//                                 {isExpanded && <span className="ml-3">Location Manager</span>}
//                             </button>
//                         </nav>
//                     </div>
//                 </div>

//                 {/* User Profile Section - Fixed at bottom */}
//                 <div className="border-t border-gray-200 p-4 flex-shrink-0">
//                     {isExpanded ? (
//                         <div className="flex items-center space-x-3 mb-3">
//                             <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
//                                 <div className="w-6 h-6 bg-gray-500 rounded-full"></div>
//                             </div>
//                             <div className="flex-1">
//                                 <p className="text-sm font-medium text-gray-900">Harper Nelson</p>
//                                 <p className="text-xs text-gray-500">Admin Manager</p>
//                             </div>
//                         </div>
//                     ) : (
//                         <div className="flex justify-center mb-3">
//                             <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
//                                 <div className="w-6 h-6 bg-gray-500 rounded-full"></div>
//                             </div>
//                         </div>
//                     )}

//                     <button
//                         className={`w-full flex items-center px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 rounded-lg transition-colors ${!isExpanded ? "justify-center" : ""}`}
//                     >
//                         <LogOut
//                             className={`
//                 ${isExpanded ? "w-5 h-5" : "w-8 h-8"}
//                 ${!isExpanded ? "lg:w-5 lg:h-5" : ""}
//                 text-gray-400
//               `}
//                         />
//                         {isExpanded && <span className="ml-3">Log out</span>}
//                     </button>
//                 </div>
//             </div>

//             {/* Mobile Toggle Button */}
//             <button
//                 onClick={toggleSidebar}
//                 className="fixed top-4 left-4 z-50 lg:hidden bg-white p-2 rounded-lg shadow-md border border-gray-200"
//             >
//                 <LayoutGrid className="w-5 h-5 text-gray-600" />
//             </button>
//         </>
//     )
// }

// 'use client';

// import Link from 'next/link';
// import { sidebarItems } from '../constants/sidebarRoutes';
// import { IoInfinite } from "react-icons/io5";
// import { usePathname } from 'next/navigation';
// import { useState } from 'react';
// import { ChevronLeft, ChevronRight, LogOut, LayoutGrid } from "lucide-react";

// export default function Sidebar({ user, children }) {
//     const [isOpen, setIsOpen] = useState(true);
//     const pathname = usePathname();

//     const toggleSidebar = () => setIsOpen(!isOpen);

//     const allowedSidebar = sidebarItems.filter(route =>
//         user?.sidebar?.some(item => item.label === route.label && item.access)
//     );

//     const handleLogout = () => {
//         // Add your logout logic here
//         console.log("Logging out...");
//     };

//     return (
//         <>
//             <div className="flex h-screen bg-gray-100 text-gray-800">
//                 {/* Sidebar */}
//                 <div
//                     className={`fixed left-0 top-0 h-full bg-white border-r border-gray-200 transition-all duration-300 z-50 flex flex-col ${isOpen ? "w-64" : "w-20"
//                         }`}
//                 >
//                     {/* Header */}
//                     <div className="flex items-center justify-between p-4 border-b border-gray-200 flex-shrink-0">
//                         {isOpen ? (
//                             <div className="flex items-center justify-center space-x-3">
//                                 <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center">
//                                     <div className="w-4 h-4 bg-white rounded-full"></div>
//                                 </div>
//                                 <span className="font-semibold text-gray-900">Finhub</span>
//                             </div>
//                         ) : (
//                             <div className="flex justify-center w-full">
//                                 <span className="text-2xl text-emerald-500">
//                                     <IoInfinite className="w-6 h-6" />
//                                 </span>
//                             </div>
//                         )}

//                         <button
//                             onClick={toggleSidebar}
//                             className="p-1 rounded-lg hover:bg-gray-100 transition-colors"
//                         >
//                             {isOpen ? (
//                                 <ChevronLeft className="w-5 h-5 text-gray-600" />
//                             ) : (
//                                 <ChevronRight className="w-5 h-5 text-gray-600" />
//                             )}
//                         </button>
//                     </div>

//                     {/* Navigation */}
//                     <div className="flex-1 overflow-y-auto py-4">
//                         <nav className="space-y-1 px-3">
//                             {allowedSidebar.map((item) => {
//                                 if (item.label === "Create User") return null;
//                                 const Icon = item.icon;
//                                 const isActive = pathname === item.path;

//                                 return (
//                                     <Link
//                                         key={item.path}
//                                         href={item.path}
//                                         className={`flex items-center px-3 py-3 text-sm font-medium rounded-lg transition-colors ${isActive
//                                             ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
//                                             : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
//                                             } ${!isOpen ? "justify-center" : ""}`}
//                                     >
//                                         {Icon && (
//                                             <Icon
//                                                 className={`
//                                                     ${isActive ? "text-emerald-600" : "text-gray-500"}
//                                                     ${isOpen ? "w-5 h-5" : "w-7 h-7"}
//                                                     ${!isOpen ? "lg:w-5 lg:h-5" : ""}
//                                                     ${isOpen ? "mr-3" : ""}
//                                                 `}
//                                             />
//                                         )}
//                                         {isOpen && <span className="flex-1 text-left">{item.label}</span>}
//                                     </Link>
//                                 );
//                             })}
//                         </nav>
//                     </div>

//                     {/* User Profile and Logout Section - Fixed at bottom */}
//                     <div className="border-t border-gray-200 p-4 flex-shrink-0">
//                         {user && (
//                             <>
//                                 {isOpen ? (
//                                     <div className="flex items-center space-x-3 mb-3">
//                                         <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
//                                             <span className="text-xs font-medium text-gray-600 font-bold">
//                                                 {user.username?.charAt(0).toUpperCase()}
//                                             </span>
//                                         </div>
//                                         <div className="flex-1">
//                                             <p className="text-sm font-medium text-gray-900">{user.username}</p>
//                                             <p className="text-xs text-gray-500">{user.role}</p>
//                                         </div>
//                                     </div>
//                                 ) : (
//                                     <div className="flex justify-center mb-3">
//                                         <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
//                                             <span className="text-xs font-medium text-gray-600">
//                                                 {user.username?.charAt(0).toUpperCase()}
//                                             </span>
//                                         </div>
//                                     </div>
//                                 )}
//                             </>
//                         )}

//                         <button
//                             onClick={handleLogout}
//                             className={`w-full flex items-center px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 rounded-lg transition-colors ${!isOpen ? "justify-center" : ""
//                                 }`}
//                         >
//                             <LogOut
//                                 className={`
//                                     ${isOpen ? "w-5 h-5" : "w-7 h-7"}
//                                     ${!isOpen ? "lg:w-5 lg:h-5" : ""}
//                                     text-gray-400
//                                 `}
//                             />
//                             {isOpen && <span className="ml-3">Log out</span>}
//                         </button>
//                     </div>
//                 </div>

//                 {/* Main Content */}
//                 <main
//                     className={`flex-1 p-6 overflow-y-auto bg-white shadow-inner rounded-l-xl ml-0 transition-all duration-300 ${isOpen ? "lg:ml-64" : "lg:ml-20"
//                         }`}
//                 >
//                     {children}
//                 </main>
//             </div>

//             {/* Mobile Toggle Button */}
//             <button
//                 onClick={toggleSidebar}
//                 className="fixed top-4 left-4 z-50 lg:hidden bg-white p-2 rounded-lg shadow-md border border-gray-200"
//             >
//                 <LayoutGrid className="w-5 h-5 text-gray-600" />
//             </button>
//         </>
//     );
// }

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

    const allowedSidebar = sidebarItems.filter(route =>
        user?.sidebar?.some(item => item.label === route.label && item.access)
    );

    const handleLogoutUser = async () => {
        try {
            const res = await axios.get('http://localhost:3030/api/v1/auth/logout', {
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
                            title="Logout "
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
                    className={`flex-1 p-6 overflow-y-auto bg-white shadow-inner rounded-l-xl ml-0 transition-all duration-300 ${isOpen ? "lg:ml-64" : "lg:ml-20"
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