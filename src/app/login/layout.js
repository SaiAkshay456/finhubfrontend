import { useAuth } from '../../providers/AuthProvider';
import { useRouter } from 'next/navigation';
export default async function LoginLayout({ children }) {
    const { isAuthorized } = useAuth();
    const router = useRouter();
    if (isAuthorized) {
        router.push('/'); // Redirect to home if already logged in
    }
    return <>
        {children}
    </>
}