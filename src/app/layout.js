import './globals.css';
import { Geist, Geist_Mono } from 'next/font/google';
import { cookies } from 'next/headers';
import { AuthProvider } from '@/providers/AuthProvider';
import axiosInstance from '@/helpers/axios';
import ClientLayoutWrapper from '@/components/ClientLayoutWrapper';
const geistSans = Geist({ subsets: ['latin'], variable: '--font-geist-sans' });
const geistMono = Geist_Mono({ subsets: ['latin'], variable: '--font-geist-mono' });
export const metadata = {
  title: 'Dashboard',
  description: 'Dashbaord page of user',
};

export default async function RootLayout({ children }) {
  const cookieStore = cookies();
  const token = cookieStore.get('token')?.value;
  console.log(token)
  let user = null;
  let isAuthorized = false;
  try {
    const { data } = await axiosInstance.post('/v1/auth/login', {});
    console.log(data)
    console.log(data.user);
    isAuthorized = true;
    user = data.user
  } catch (err) {
    console.log('Auth fetch error:', err);
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