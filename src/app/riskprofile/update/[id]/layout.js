// import { sidebarItems } from '../../constants/sidebarRoutes';
// import { cookies } from 'next/headers';
// import { redirect } from 'next/navigation';


export const metadata = {
    title: "Update Questionarrie Page",
    description: "Browse and add user here",
};
export default async function Layout({ children }) {
    return <main className="min-h-screen px-4 py-8 bg-gray-50">
        {children}
    </main>
}
