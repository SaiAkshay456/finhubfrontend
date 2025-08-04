
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
// the above is for /login no landing page

'use client';
import { useAuth } from '@/providers/AuthProvider';
import Sidebar from './Sidebar';

export default function ClientLayoutWrapper({ children, token }) {
    const { isAuthorized, user } = useAuth();

    if (!isAuthorized) {
        return <>{children}</>;
    }
    return (
        <div className="flex h-screen w-screen overflow-hidden">
            <Sidebar user={user} />
            <main className="flex-1 overflow-y-auto">
                {children}
            </main>
        </div>
    );
}