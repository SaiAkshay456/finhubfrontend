import { cookies } from 'next/headers';
// import LoginForm from '../../features/auth/LoginForm';
export default async function LoginLayout({ children }) {
    // const cookieStore = await cookies();
    // const token = cookieStore.get('token')?.value;
    // console.log("Token :", token)
    return <>
        {children}
    </>
}