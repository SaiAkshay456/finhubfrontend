// 'use client';
// import { useAuth } from '@/providers/AuthProvider';
// import { useRouter } from 'next/navigation';
// import { useEffect } from 'react';

// export default function DashboardPage() {
//     const { isAuthorized } = useAuth();
//     const router = useRouter();

//     useEffect(() => {
//         if (!isAuthorized) {
//             router.replace('/');
//         }
//     }, [isAuthorized, router]);

//     if (!isAuthorized) {
//         return <div>Loading...</div>;
//     }

//     return (
//         <div>
//             <h1>Dashboard Content</h1>
//             {/* Your dashboard specific content */}
//         </div>
//     );
// }