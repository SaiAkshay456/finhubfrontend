// app/not-found.js

export default function NotFound() {
    return (
        <div className="h-screen flex items-center justify-center bg-gray-100">
            <div className="text-center">
                <h1 className="text-5xl font-bold text-blue-600">404</h1>
                <p className="text-xl mt-2 text-gray-700">Page Not Found</p>
                <p className="mt-4 text-gray-500">Sorry, the page you are looking for does not exist.</p>
                <a
                    href="/"
                    className="inline-block mt-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                >
                    Go to Home
                </a>
            </div>
        </div>
    );
}
