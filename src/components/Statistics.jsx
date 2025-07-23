// pages/dashboard.js
"use client"
import Head from 'next/head';
import { useAuth } from '../providers/AuthProvider';

const Statistics = () => {
    // Static stock data
    const { user, isAuthorized } = useAuth();

    const stocks = [
        {
            symbol: 'AAPL',
            companyName: 'Apple Inc.',
            price: 175.34,
            change: 2.45,
            changePercent: 1.42,
            revenue: '394.3B',
            sector: 'Technology',
        },
        {
            symbol: 'MSFT',
            companyName: 'Microsoft',
            price: 328.39,
            change: -1.23,
            changePercent: -0.37,
            revenue: '211.9B',
            sector: 'Technology',
        },
        {
            symbol: 'GOOGL',
            companyName: 'Alphabet',
            price: 138.21,
            change: 0.89,
            changePercent: 0.65,
            revenue: '307.4B',
            sector: 'Communication',
        },
    ];

    return (
        user && user.role === "admin" &&
        <div className="min-h-screen mt-3 bg-gray-50">
            <Head>
                <title>Portfolio Dashboard</title>
                <meta name="description" content="Simple stock dashboard" />
            </Head>

            <header className="bg-white shadow">
                <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                    <h1 className="text-2xl font-bold text-gray-900">Portfolio Dashboard</h1>
                    <p className="mt-1 text-sm text-gray-500">Key statistics at a glance</p>
                </div>
            </header>

            <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {stocks.map((stock) => (
                        <div key={stock.symbol} className="bg-white shadow rounded-lg overflow-hidden">
                            <div className="px-4 py-5 sm:p-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h3 className="text-lg font-medium text-gray-900">{stock.companyName}</h3>
                                        <p className="text-sm text-gray-500">{stock.symbol} • {stock.sector}</p>
                                    </div>
                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${stock.changePercent >= 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                        {stock.changePercent >= 0 ? '+' : ''}{stock.changePercent}%
                                    </span>
                                </div>

                                <div className="mt-6 grid grid-cols-3 gap-4">
                                    {/* Price */}
                                    <div className="text-center">
                                        <p className="text-sm text-gray-500">Price</p>
                                        <p className="mt-1 text-xl font-semibold text-gray-900">${stock.price}</p>
                                    </div>

                                    {/* Change */}
                                    <div className="text-center">
                                        <p className="text-sm text-gray-500">Change</p>
                                        <p className={`mt-1 text-xl font-semibold ${stock.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                                            {stock.change >= 0 ? '+' : ''}{stock.change}
                                        </p>
                                    </div>

                                    {/* Revenue */}
                                    <div className="text-center">
                                        <p className="text-sm text-gray-500">Revenue</p>
                                        <p className="mt-1 text-xl font-semibold text-indigo-600">{stock.revenue}</p>
                                    </div>
                                </div>

                                <div className="mt-6">
                                    <div className="relative pt-1">
                                        <div className="flex mb-2 items-center justify-between">
                                            <div>
                                                <span className={`text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full ${stock.changePercent >= 0 ? 'text-green-600 bg-green-200' : 'text-red-600 bg-red-200'}`}>
                                                    {stock.changePercent >= 0 ? 'Gain' : 'Loss'}
                                                </span>
                                            </div>
                                            <div className="text-right">
                                                <span className="text-xs font-semibold inline-block text-gray-600">
                                                    {Math.abs(stock.changePercent)}%
                                                </span>
                                            </div>
                                        </div>
                                        <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-200">
                                            <div
                                                style={{ width: `${Math.min(100, Math.abs(stock.changePercent) * 10)}%` }}
                                                className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center ${stock.changePercent >= 0 ? 'bg-green-500' : 'bg-red-500'}`}
                                            ></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
};

export default Statistics;