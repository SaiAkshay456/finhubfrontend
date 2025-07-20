import {
    Users,
    DollarSign,
    ShoppingBag,
    RefreshCcw,
    Plus,
    CalendarDays,
    TrendingUp,
    TrendingDown,
    Circle,
    ArrowUp,
    ArrowDown,
    Sun,
    Moon
} from "lucide-react"
import { useState } from 'react';

export default function Statistics() {
    const [darkMode, setDarkMode] = useState(false);

    const toggleTheme = () => {
        setDarkMode(!darkMode);
    };

    return (
        <div className={`min-h-screen p-6 rounded ${darkMode ? 'bg-gray-900 text-gray-100' : 'text-gray-900'}`}>
            {/* Header */}
            <header className="flex items-center justify-between mb-8">
                <h1 className="text-3xl font-bold">Dashboard</h1>
                <div className="flex items-center gap-4">
                    <button
                        onClick={toggleTheme}
                        className={`p-2 rounded-lg ${darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-200 hover:bg-gray-300'}`}
                    >
                        {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                    </button>
                    <button className={`flex items-center px-4 py-2 ${darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-200 hover:bg-gray-300'} rounded-lg transition-colors duration-200`}>
                        <CalendarDays className="h-4 w-4 mr-2" />
                        <span>Time period:</span>
                    </button>
                </div>
            </header>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
                {/* Total Customers Card */}
                <div className={`rounded-xl p-4 flex flex-col justify-between border ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                    <div className={`flex items-center ${darkMode ? 'text-gray-400' : 'text-gray-500'} text-sm mb-2`}>
                        <Users className="h-4 w-4 mr-2" /> Total customers
                    </div>
                    <div className="flex items-center">
                        <span className="text-2xl font-bold mr-2">567,89</span>
                        <TrendingUp className="h-4 w-4 text-green-400 mr-1" />
                        <span className="text-green-400 text-sm">2.5 %</span>
                    </div>
                </div>

                {/* Total Revenue Card */}
                <div className={`rounded-xl p-4 flex flex-col justify-between border ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                    <div className={`flex items-center ${darkMode ? 'text-gray-400' : 'text-gray-500'} text-sm mb-2`}>
                        <DollarSign className="h-4 w-4 mr-2" /> Total revenue
                    </div>
                    <div className="flex items-center">
                        <span className="text-2xl font-bold mr-2">$3.46M</span>
                        <TrendingUp className="h-4 w-4 text-green-400 mr-1" />
                        <span className="text-green-400 text-sm">0.5 %</span>
                    </div>
                </div>

                {/* Total Orders Card */}
                <div className={`rounded-xl p-4 flex flex-col justify-between border ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                    <div className={`flex items-center ${darkMode ? 'text-gray-400' : 'text-gray-500'} text-sm mb-2`}>
                        <ShoppingBag className="h-4 w-4 mr-2" /> Total orders
                    </div>
                    <div className="flex items-center">
                        <span className="text-2xl font-bold mr-2">1,1 M</span>
                        <TrendingDown className="h-4 w-4 text-red-400 mr-1" />
                        <span className="text-red-400 text-sm">0.2 %</span>
                    </div>
                </div>

                {/* Total Returns Card */}
                <div className={`rounded-xl p-4 flex flex-col justify-between border ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                    <div className={`flex items-center ${darkMode ? 'text-gray-400' : 'text-gray-500'} text-sm mb-2`}>
                        <RefreshCcw className="h-4 w-4 mr-2" /> Total returns
                    </div>
                    <div className="flex items-center">
                        <span className="text-2xl font-bold mr-2">1,789</span>
                        <TrendingUp className="h-4 w-4 text-gray-400 mr-1" />
                        <span className="text-gray-400 text-sm">0.12 %</span>
                    </div>
                </div>

                {/* Add Data Card */}
                <div className={`rounded-xl p-4 flex flex-col items-center justify-center border-dashed border-2 ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                    <Plus className={`h-6 w-6 ${darkMode ? 'text-gray-400' : 'text-gray-500'} mb-2`} />
                    <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Add data</span>
                </div>
            </div>

            {/* Product Sales Chart */}
            <div className={`rounded-xl p-6 mb-8 border ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold">Product sales</h2>
                    <div className="flex items-center space-x-4 text-sm">
                        <div className="flex items-center">
                            <Circle className="h-3 w-3 fill-blue-500 text-blue-500 mr-1" /> Gross margin
                        </div>
                        <div className="flex items-center">
                            <Circle className="h-3 w-3 fill-orange-500 text-orange-500 mr-1" /> Revenue
                        </div>
                    </div>
                </div>

                <div className="relative h-80 w-full">
                    {/* Y-axis labels */}
                    <div className={`absolute left-0 top-0 text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>70 K</div>
                    <div className={`absolute left-0 top-[16.66%] text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>60 K</div>
                    <div className={`absolute left-0 top-[33.33%] text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>50 K</div>
                    <div className={`absolute left-0 top-[50%] text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>40 K</div>
                    <div className={`absolute left-0 top-[66.66%] text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>30 K</div>
                    <div className={`absolute left-0 top-[83.33%] text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>20 K</div>
                    <div className={`absolute left-0 bottom-0 text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>10 K</div>
                    <div className={`absolute left-0 bottom-0 text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'} translate-y-4`}>0</div>

                    {/* Grid lines */}
                    <div className="absolute inset-0 pl-10">
                        <div className={`absolute inset-y-0 left-0 w-px ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`}></div>
                        <div className={`absolute inset-x-0 top-[16.66%] h-px ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`}></div>
                        <div className={`absolute inset-x-0 top-[33.33%] h-px ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`}></div>
                        <div className={`absolute inset-x-0 top-[50%] h-px ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`}></div>
                        <div className={`absolute inset-x-0 top-[66.66%] h-px ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`}></div>
                        <div className={`absolute inset-x-0 top-[83.33%] h-px ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`}></div>
                        <div className={`absolute inset-x-0 bottom-0 h-px ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`}></div>
                    </div>

                    {/* Bars */}
                    <div className="absolute inset-0 pl-10 flex items-end justify-around pb-6">
                        {[
                            { gm: 28, rev: 38, date: "1 Jul" },
                            { gm: 32, rev: 44, date: "2 Jul" },
                            { gm: 22, rev: 56, date: "3 Jul" },
                            { gm: 34, rev: 42, date: "4 Jul" },
                            { gm: 50, rev: 25, date: "5 Jul" },
                            { gm: 20, rev: 58, date: "6 Jul", tooltip: true },
                            { gm: 18, rev: 30, date: "7 Jul" },
                            { gm: 35, rev: 41, date: "8 Jul" },
                            { gm: 28, rev: 32, date: "9 Jul" },
                            { gm: 42, rev: 46, date: "10 Jul" },
                            { gm: 34, rev: 43, date: "11 Jul" },
                            { gm: 55, rev: 50, date: "12 Jul" },
                        ].map((data, index) => (
                            <div key={index} className="relative flex items-end w-[calc(100%/12)] justify-center group">
                                <div
                                    className="w-3 rounded-t-sm mr-1 bg-blue-500 group-hover:bg-blue-400 transition-colors"
                                    style={{ height: `${(data.gm / 70) * 100}%` }}
                                ></div>
                                <div
                                    className="w-3 rounded-t-sm bg-orange-500 group-hover:bg-orange-400 transition-colors"
                                    style={{ height: `${(data.rev / 70) * 100}%` }}
                                ></div>
                                <span className={`absolute -bottom-6 text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{data.date}</span>
                                {data.tooltip && (
                                    <div className={`absolute bottom-[calc(100%+10px)] left-1/2 -translate-x-1/2 ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border rounded-md shadow-lg p-2 whitespace-nowrap z-10 opacity-0 group-hover:opacity-100 transition-opacity`}>
                                        <div className={`flex items-center text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'} mb-1`}>
                                            <Circle className="h-2 w-2 fill-blue-500 text-blue-500 mr-1" /> Gross margin
                                        </div>
                                        <div className="flex items-center text-sm font-bold">
                                            $52,187 <TrendingUp className="h-3 w-3 text-green-400 ml-2 mr-1" />
                                            <span className="text-green-400 text-xs">2.5 %</span>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Sales by Product Category & Sales by Countries */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {/* Sales by Product Category */}
                <div className={`rounded-xl p-6 border ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                    <h2 className="text-xl font-bold mb-6">Sales by product category</h2>
                    <div className="flex flex-col md:flex-row items-center justify-center gap-6">
                        {/* Pie Chart */}
                        <div className="relative w-48 h-48 flex items-center justify-center">
                            <svg viewBox="0 0 100 100" className="w-full h-full">
                                <circle cx="50" cy="50" r="40" fill="#3B82F6" />
                                <path d="M50 50 L50 10 A40 40 0 0 1 84.64 30.00 Z" fill="#F97316" />
                                <path d="M50 50 L84.64 30.00 A40 40 0 0 1 89.02 60.00 Z" fill="#10B981" />
                                <path d="M50 50 L89.02 60.00 A40 40 0 0 1 70.71 89.02 Z" fill="#8B5CF6" />
                                <path d="M50 50 L70.71 89.02 A40 40 0 0 1 10 50 Z" fill="#EF4444" />
                                <path d="M50 50 L10 50 A40 40 0 0 1 50 10 Z" fill="#6B7280" />
                            </svg>
                        </div>
                        {/* Legend */}
                        <div className="grid grid-cols-1 gap-2 text-sm">
                            <div className="flex items-center">
                                <Circle className="h-3 w-3 fill-blue-500 text-blue-500 mr-2" /> Living room - 25%
                            </div>
                            <div className="flex items-center">
                                <Circle className="h-3 w-3 fill-orange-500 text-orange-500 mr-2" /> Kids - 17%
                            </div>
                            <div className="flex items-center">
                                <Circle className="h-3 w-3 fill-green-500 text-green-500 mr-2" /> Kitchen - 15%
                            </div>
                            <div className="flex items-center">
                                <Circle className="h-3 w-3 fill-purple-500 text-purple-500 mr-2" /> Bedroom - 13%
                            </div>
                            <div className="flex items-center">
                                <Circle className="h-3 w-3 fill-red-500 text-red-500 mr-2" /> Bathroom - 10%
                            </div>
                            <div className="flex items-center">
                                <Circle className="h-3 w-3 fill-gray-500 text-gray-500 mr-2" /> Other - 20%
                            </div>
                        </div>
                    </div>
                </div>

                {/* Sales by Countries */}
                <div className={`rounded-xl p-6 border ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                    <h2 className="text-xl font-bold mb-6">Sales by countries</h2>
                    <div className="space-y-3">
                        <div className="flex items-center justify-between text-sm">
                            <div className="flex items-center">
                                <Circle className="h-3 w-3 fill-green-500 text-green-500 mr-2" /> Poland
                            </div>
                            <span className="font-medium">19%</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                            <div className="flex items-center">
                                <Circle className="h-3 w-3 fill-blue-500 text-blue-500 mr-2" /> Austria
                            </div>
                            <span className="font-medium">16%</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                            <div className="flex items-center">
                                <Circle className="h-3 w-3 fill-orange-500 text-orange-500 mr-2" /> Germany
                            </div>
                            <span className="font-medium">14%</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                            <div className="flex items-center">
                                <Circle className="h-3 w-3 fill-purple-500 text-purple-500 mr-2" /> France
                            </div>
                            <span className="font-medium">12%</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                            <div className="flex items-center">
                                <Circle className="h-3 w-3 fill-red-500 text-red-500 mr-2" /> Spain
                            </div>
                            <span className="font-medium">10%</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                            <div className="flex items-center">
                                <Circle className="h-3 w-3 fill-gray-500 text-gray-500 mr-2" /> Other
                            </div>
                            <span className="font-medium">29%</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}