import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "https://finhub-backend.onrender.com", // full URL of your backend
    withCredentials: true, // important for cookies / auth
});

export default axiosInstance;















































{/* Search Section */ }
{/* <div className="bg-gradient-to-r from-gray-50 to-slate-50 p-6 border-b border-gray-200">
                        <form method="GET" className="flex flex-col sm:flex-row gap-4">
                            <div className="relative flex-1">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                                        <path
                                            fillRule="evenodd"
                                            d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </div>
                                <input
                                    type="text"
                                    name="search"
                                    placeholder="Search users by name, email, or username..."
                                    defaultValue={search}
                                    className="block w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white shadow-sm"
                                />
                            </div>
                            <div className="flex gap-3">
                                <button
                                    type="submit"
                                    className="px-6 py-3 bg-gradient-to-r from-[#00d09c] to-[#00b98b] text-white rounded-xl cursor-pointer hover:from-[#00d09c] hover:to-[#00b98b]  transition-all duration-200 font-medium shadow-lg hover:shadow-xl transform flex items-center gap-2"
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                        />
                                    </svg>
                                    Search
                                </button>
                                {search && (
                                    <Link
                                        href="/users"
                                        className="px-6 py-3 border border-gray-300 rounded-xl hover:bg-gray-50 transition-all duration-200 font-medium flex items-center gap-2 text-gray-700"
                                    >
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                        Clear
                                    </Link>
                                )}
                            </div>
                        </form>
                    </div> */}