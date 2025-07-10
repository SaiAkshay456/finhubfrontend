// layout.js (server component)
export const metadata = {
    title: "Users Page",
    description: "Browse and manage users",
};

export default async function UpdateLayout({ children }) {
    return <main className="min-h-screen flex justify-center items-center">
        {children}
    </main>
}
