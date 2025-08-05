
import { cookies } from 'next/headers';
export default async function BasketLayout({ children }) {
    const cookieStore = cookies();
    const token = cookieStore.get('token')?.value;
    return <main className="min-h-screen flex justify-center items-center">
        {children}
    </main>
}
