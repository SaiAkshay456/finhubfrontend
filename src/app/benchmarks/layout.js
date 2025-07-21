export const metadata = {
    title: "Benchmark",
    description: "Compare your profolio with predefined benchmarks",
};

export default function Layout({ children }) {
    return (
        <main className="min-h-screen m-7">
        {children}
    </main>
    );
}