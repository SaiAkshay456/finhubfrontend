'use client'
import axiosInstance from '@/helpers/axios'
import React, { useEffect, useState } from 'react'

const CustomButtonComponent = ({ item, onAssign, hasAssignment }) => {
    return (
        <button
            onClick={() => onAssign(item)}
            className="text-emerald-600 hover:text-emerald-800 font-medium transition-colors cursor-pointer"
        >
            {hasAssignment ? 'Reassign' : 'Assign'}
        </button>
    )
}

export default function StocksTable({
    data,
    loading,
    pagination,
    searchTerm,
    onSearchChange,
    onPrevPage,
    onNextPage,
    onAssign,
    getAssignedInstrumentCategory,
    hasInstrumentCategoryAssignment,
}) {
    // Local state for assigned categories
    const [assignedCategories, setAssignedCategories] = useState({})

    // Fetch price and assign category for each stock on mount or when data changes
    useEffect(() => {
        async function fetchStockPrice(symbol) {
            try {
                await fetch(
                    `https://finhub-socket-server.onrender.com/subscribe/${symbol}`
                )
                const response = await fetch(
                    `https://finhub-socket-server.onrender.com/get/${symbol}`
                )
                const result = await response.json()
                const tick = result?.tick
                if (!tick) return null
                const price =
                    typeof tick.last_price === 'number'
                        ? tick.last_price
                        : typeof tick.ohlc?.close === 'number'
                        ? tick.ohlc.close
                        : null
                return Math.round(price)
            } catch (error) {
                console.error(`[fetchStockPrice] Error for ${symbol}:`, error)
                return null
            }
        }

        async function fetchStockCategories() {
            try {
                const response = await axiosInstance.get(
                    '/v1/category/stock-instrument-categories/all'
                )
                // FIX: get categories from response.data
                const categories = Array.isArray(response.data)
                    ? response.data
                    : []
                const hashMap = {}
                categories.forEach((cat) => {
                    if (
                        cat.name &&
                        cat.range &&
                        typeof cat.range.min === 'number' &&
                        typeof cat.range.max === 'number'
                    ) {
                        hashMap[cat.name] = {
                            min: cat.range.min,
                            max: cat.range.max,
                            _id: cat._id,
                        }
                    }
                })
                const result = Object.entries(hashMap).map(
                    ([name, { min, max, _id }]) => ({
                        name,
                        range: { min, max },
                        _id,
                    })
                )
                return result
            } catch (err) {
                return []
            }
        }

        async function assignCategoriesToStocks() {
            if (!data || !data.length) {
                return
            }
            const stockCategories = await fetchStockCategories()
            const assignments = {}
            await Promise.all(
                data.map(async (stock) => {
                    const price = await fetchStockPrice(stock.instrument_token)
                    console.log(
                        `[assignCategoriesToStocks] Stock ${stock.instrument_token} price: ${price}`
                    )
                    let matchedCategory = null

                    const candidates = stockCategories.filter((catObj) => {
                        // Defensive: ensure price is a valid number
                        if (typeof price !== 'number' || isNaN(price))
                            return false
                        // Defensive: ensure min/max are numbers
                        if (
                            typeof catObj.range?.min !== 'number' ||
                            typeof catObj.range?.max !== 'number'
                        )
                            return false
                        // Adjust this logic if you want exclusive or inclusive bounds
                        return (
                            price >= catObj.range.min &&
                            (price <= catObj.range.max ||
                                catObj.range.max === Infinity)
                        )
                    })

                    if (candidates.length > 0) {
                        // Sort by smallest range width
                        const bestCategory = candidates.sort(
                            (a, b) =>
                                a.range.max -
                                a.range.min -
                                (b.range.max - b.range.min)
                        )[0]
                        matchedCategory = bestCategory.name
                        console.log(
                            `[assignCategoriesToStocks] Stock ${stock.instrument_token} matched category: ${matchedCategory}`
                        )
                    }

                    assignments[stock.instrument_token] =
                        matchedCategory || 'Uncategorized'
                })
            )
            setAssignedCategories(assignments)
        }

        assignCategoriesToStocks()
    }, [data])

    return (
        <div className="bg-white rounded-lg shadow">
            {/* Search and Filters */}
            <div className="px-6 py-4 border-b border-gray-200">
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold text-gray-900">
                        All Stocks ({pagination?.total || data?.length || 0})
                    </h2>
                    <div className="flex space-x-2">
                        <input
                            type="text"
                            placeholder="Search stocks..."
                            value={searchTerm}
                            onChange={onSearchChange}
                            className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600"
                        />
                    </div>
                </div>
            </div>

            {/* Loading State */}
            {loading ? (
                <div className="flex justify-center items-center h-64">
                    <div className="text-lg text-gray-600">Loading...</div>
                </div>
            ) : (
                <>
                    {/* Table Content */}
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Name
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Trading Symbol
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Exchange
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Instrument Type
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Segment
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Instrument Category
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {data && data.length > 0 ? (
                                    data.map((item, index) => (
                                        <tr
                                            key={item._id || item.id || index}
                                            className="hover:bg-gray-50"
                                        >
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                {item.name}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                                {item.tradingsymbol}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                {item.exchange}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span
                                                    className={`px-2 py-1 text-xs font-semibold rounded-full ${
                                                        item.instrument_type ===
                                                        'EQ'
                                                            ? 'text-emerald-800 bg-emerald-100'
                                                            : item.instrument_type ===
                                                              'FUT'
                                                            ? 'text-blue-800 bg-blue-100'
                                                            : item.instrument_type ===
                                                                  'CE' ||
                                                              item.instrument_type ===
                                                                  'PE'
                                                            ? 'text-purple-800 bg-purple-100'
                                                            : 'text-gray-800 bg-gray-100'
                                                    }`}
                                                >
                                                    {item.instrument_type}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                                {item.segment}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                {assignedCategories[
                                                    item.instrument_token
                                                ] || 'Uncategorized'}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                <CustomButtonComponent
                                                    item={item}
                                                    onAssign={onAssign}
                                                    hasAssignment={hasInstrumentCategoryAssignment(
                                                        item
                                                    )}
                                                />
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td
                                            colSpan={7}
                                            className="px-6 py-4 text-center text-sm text-gray-500"
                                        >
                                            No stocks found
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    {pagination && pagination.totalPages > 1 && (
                        <div className="px-6 py-4 border-t border-gray-200">
                            <div className="flex items-center justify-between">
                                <div className="text-sm text-gray-700">
                                    Showing page {pagination.page} of{' '}
                                    {pagination.totalPages} ({pagination.total}{' '}
                                    total items)
                                </div>
                                <div className="flex space-x-2">
                                    <button
                                        disabled={!pagination.hasPrev}
                                        onClick={onPrevPage}
                                        className="px-3 py-2 text-sm border border-gray-300 rounded-lg bg-white text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition"
                                    >
                                        Previous
                                    </button>
                                    <button
                                        disabled={!pagination.hasNext}
                                        onClick={onNextPage}
                                        className="px-3 py-2 text-sm border border-gray-300 rounded-lg bg-white text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition"
                                    >
                                        Next
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </>
            )}
        </div>
    )
}
