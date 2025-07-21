export default function CategoryManagement() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold text-gray-900">
                    Category Management
                </h1>
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
                    Create Category
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white rounded-lg shadow p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        Total Categories
                    </h3>
                    <p className="text-3xl font-bold text-blue-600">24</p>
                </div>

                <div className="bg-white rounded-lg shadow p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        Active Categories
                    </h3>
                    <p className="text-3xl font-bold text-green-600">18</p>
                </div>

                <div className="bg-white rounded-lg shadow p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        Inactive Categories
                    </h3>
                    <p className="text-3xl font-bold text-red-600">6</p>
                </div>

                <div className="bg-white rounded-lg shadow p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        Assigned Items
                    </h3>
                    <p className="text-3xl font-bold text-purple-600">298</p>
                </div>
            </div>

            <div className="bg-white rounded-lg shadow">
                <div className="px-6 py-4 border-b border-gray-200">
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl font-semibold text-gray-900">
                            All Categories
                        </h2>
                        <div className="flex space-x-2">
                            <input
                                type="text"
                                placeholder="Search categories..."
                                className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <select className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                                <option value="">All Status</option>
                                <option value="active">Active</option>
                                <option value="inactive">Inactive</option>
                            </select>
                            <select className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                                <option value="">All Types</option>
                                <option value="sector">Sector</option>
                                <option value="size">Size</option>
                                <option value="style">Style</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Name
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Type
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Status
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Assigned Items
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Created Date
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {[
                                {
                                    name: 'Large Cap',
                                    type: 'Size',
                                    status: 'Active',
                                    count: 45,
                                    date: '2024-01-15',
                                },
                                {
                                    name: 'Technology',
                                    type: 'Sector',
                                    status: 'Active',
                                    count: 32,
                                    date: '2024-01-12',
                                },
                                {
                                    name: 'Banking',
                                    type: 'Sector',
                                    status: 'Active',
                                    count: 28,
                                    date: '2024-01-10',
                                },
                                {
                                    name: 'Small Cap',
                                    type: 'Size',
                                    status: 'Inactive',
                                    count: 12,
                                    date: '2024-01-08',
                                },
                                {
                                    name: 'Value',
                                    type: 'Style',
                                    status: 'Active',
                                    count: 18,
                                    date: '2024-01-05',
                                },
                                {
                                    name: 'Growth',
                                    type: 'Style',
                                    status: 'Active',
                                    count: 24,
                                    date: '2024-01-03',
                                },
                            ].map((category, index) => (
                                <tr key={index} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                        {category.name}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span
                                            className={`px-2 py-1 text-xs font-semibold rounded-full ${
                                                category.type === 'Sector'
                                                    ? 'text-blue-800 bg-blue-100'
                                                    : category.type === 'Size'
                                                    ? 'text-green-800 bg-green-100'
                                                    : 'text-purple-800 bg-purple-100'
                                            }`}
                                        >
                                            {category.type}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span
                                            className={`px-2 py-1 text-xs font-semibold rounded-full ${
                                                category.status === 'Active'
                                                    ? 'text-green-800 bg-green-100'
                                                    : 'text-red-800 bg-red-100'
                                            }`}
                                        >
                                            {category.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {category.count}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {category.date}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                        <div className="flex space-x-2">
                                            <button className="text-blue-600 hover:text-blue-900">
                                                Edit
                                            </button>
                                            <button className="text-green-600 hover:text-green-900">
                                                View Items
                                            </button>
                                            <button className="text-red-600 hover:text-red-900">
                                                Delete
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
