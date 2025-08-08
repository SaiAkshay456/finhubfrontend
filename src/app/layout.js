// import './globals.css';
// import { Geist, Geist_Mono } from 'next/font/google';
// import { cookies } from 'next/headers';
// import { AuthProvider } from '@/providers/AuthProvider';
// import axiosInstance from '@/helpers/axios';
// import ClientLayoutWrapper from '@/components/ClientLayoutWrapper';
// const geistSans = Geist({ subsets: ['latin'], variable: '--font-geist-sans' });
// const geistMono = Geist_Mono({ subsets: ['latin'], variable: '--font-geist-mono' });
// export const metadata = {
//   title: 'Dashboard',
//   description: 'Dashbaord page of user',
// };

// export default async function RootLayout({ children }) {
//   const cookieStore = await cookies();
//   console.log("store at layout.js", cookieStore)
//   const token = cookieStore.get('token')?.value;
//   console.log("token at layout.js", token)
//   let user = null;
//   let isAuthorized = false;
//   try {
//     const { data } = await axiosInstance.post('/v1/auth/login', {});
//     console.log(data)
//     console.log(data.user);
//     isAuthorized = true;
//     user = data.user
//   } catch (err) {
//     console.log('Auth fetch error:', err);
//   }

//   return (
//     <html lang="en">
//       <body className={`${geistSans.variable} ${geistMono.variable}`}>
//         <AuthProvider initialUser={user} initialAuth={isAuthorized}>
//           <ClientLayoutWrapper>
//             {children}
//           </ClientLayoutWrapper>
//         </AuthProvider>
//       </body>
//     </html>
//   );
// }

'use client';

import { useState, useEffect } from 'react';
import { Geist, Geist_Mono } from 'next/font/google';
import { useRouter } from 'next/navigation';
import { AuthProvider } from '@/providers/AuthProvider';
import axiosInstance from '@/helpers/axios';
import ClientLayoutWrapper from '@/components/ClientLayoutWrapper';
import './globals.css';

const geistSans = Geist({ subsets: ['latin'], variable: '--font-geist-sans' });
const geistMono = Geist_Mono({ subsets: ['latin'], variable: '--font-geist-mono' });

// `metadata` is a server-only export and must be removed or moved.
// export const metadata = {
//   title: 'Dashboard',
//   description: 'Dashbaord page of user',
// };

export default function RootLayout({ children }) {
  const [user, setUser] = useState(null);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axiosInstance.post('/v1/auth/login', {});
        if (res.data.success) {
          setUser(res.data.user);
          setIsAuthorized(true);
        }
      } catch (err) {
        console.log('Auth fetch error:', err);
        // If auth fails, clear the user and set auth state to false.
        setUser(null);
        setIsAuthorized(false);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, []);

  if (isLoading) {
    // Show a loading state while the authentication check is in progress.
    return (
      <html lang="en">
        <body className={`${geistSans.variable} ${geistMono.variable}`}>
          <div className="flex h-screen items-center justify-center">
            Loading...
          </div>
        </body>
      </html>
    );
  }

  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <AuthProvider initialUser={user} initialAuth={isAuthorized}>
          <ClientLayoutWrapper>
            {children}
          </ClientLayoutWrapper>
        </AuthProvider>
      </body>
    </html>
  );
}
