
// 'use client';
// import Sidebar from './Sidebar';
// import { useAuth } from '../providers/AuthProvider';
// import LoginForm from '../features/auth/LoginForm';
// import { useRouter, usePathname } from 'next/navigation';
// import { useEffect } from 'react';

// export default function ClientLayoutWrapper({ children }) {
//     console.log("i am at 10 in wrapper")
//     const { user, isAuthorized } = useAuth();
//     const router = useRouter()
//     useEffect(() => {
//         if (!isAuthorized) {
//             return router.push("/login");
//         }
//     }, [isAuthorized, router]);

//     return (
//         !isAuthorized ? (
//             <LoginForm />
//         ) : (
//             <Sidebar user={user}>{children}</Sidebar>
//         )
//         // isAuthorized && <Sidebar user={user}>{children}</Sidebar>

//     );
// }
// the above is for /login no landing

'use client';
import { useAuth } from '@/providers/AuthProvider';
import Sidebar from './Sidebar';

export default function ClientLayoutWrapper({ children }) {
    const { isAuthorized, user } = useAuth();

    if (!isAuthorized) {
        // No sidebar for unauthorized users
        return <>{children}</>;
    }

    // Show sidebar for all pages when authorized
    return (
        <div className="flex h-screen">
            <Sidebar user={user} />
            <main className="flex-1 p-6 overflow-y-auto">
                {children}
            </main>
        </div>
    );
}