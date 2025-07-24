// "use client"
// import Link from "next/link"
// import { Search } from "lucide-react"
// import Button from "./ui/button"
// import Input from "./ui/input"
// import { useRouter } from "next/navigation"
// import { useAuth } from '@/providers/AuthProvider';

// export default function Header() {
//     const { isAuthorized } = useAuth();

//     if (isAuthorized) {
//         // Don't show header when logged in (sidebar will handle navigation)
//         return null;
//     }
//     const router = useRouter();
//     return (
//         <header className="w-full bg-white border-b border-gray-100">
//             <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//                 <div className="flex items-center justify-between h-16">
//                     {/* Logo */}
//                     <div className="flex items-center">
//                         <Link href="/" className="flex items-center space-x-2">
//                             <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-500 via-emerald-600 to-teal-500 flex items-center justify-center shadow-md">
//                                 <div className="w-4 h-4 bg-white rounded-full shadow-sm" />
//                             </div>
//                             <span className="text-xl font-bold text-gray-800 tracking-tight">FinHub</span>
//                         </Link>

//                     </div>

//                     {/* Navigation */}

//                     {/* Search and Login */}
//                     <div className="flex items-center space-x-4">
//                         <div className="hidden lg:block relative">
//                             <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                                 <Search className="h-4 w-4 text-gray-400" />
//                             </div>
//                             <Input placeholder="Search Baskets..." className="pl-10 pr-16 w-80" />
//                             <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
//                                 <span className="text-xs text-gray-400 font-medium">Ctrl+K</span>
//                             </div>
//                         </div>
//                         <Button onClick={() => router.push("/login")}>
//                             Login/Sign In
//                         </Button>
//                     </div>
//                 </div>
//             </div>
//         </header>
//     )
// }

"use client"

import Link from "next/link"
import { Search } from "lucide-react"
import Button from "./ui/button"
import Input from "./ui/input"
import { useRouter } from "next/navigation"
import { useAuth } from '@/providers/AuthProvider';

export default function Header() {
    const { isAuthorized } = useAuth();
    const router = useRouter();

    // Hide header when user is logged in
    if (isAuthorized) return null;

    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <div className="flex items-center">
                        <Link href="/" className="flex items-center space-x-2">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-500 via-emerald-600 to-teal-500 flex items-center justify-center shadow-md">
                                <div className="w-4 h-4 bg-white rounded-full shadow-sm" />
                            </div>
                            <span className="text-xl font-bold text-gray-800 tracking-tight">FinHub</span>
                        </Link>
                    </div>

                    {/* Search + Button */}
                    <div className="flex items-center space-x-4">

                        <Button onClick={() => router.push("/login")} className="bg-gradient-to-r from-[#00d09c] to-[#00b98b]">
                            Login/Sign In
                        </Button>
                    </div>
                </div>
            </div>
        </header>
    )
}
