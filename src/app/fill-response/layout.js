export default async function FillResponseLayout({ children }) {
    return <main className="min-h-screen flex justify-center items-center">
        {children}
    </main>
}
