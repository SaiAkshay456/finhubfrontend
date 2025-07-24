'use client'
import React, { useState, useEffect, useCallback } from 'react'
import SubTabBar from '../../components/SubTabBar'
import CategoryAssignmentModal from '../../components/CategoryAssignmentModal'
import axiosInstance from '@/helpers/axios'

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

export default function CategoryAssignment() {
    const [activeSubTab, setActiveSubTab] = useState('mutual-funds')
    const [mutualFundsData, setMutualFundsData] = useState([])
    const [stocksData, setStocksData] = useState([])
    const [instrumentCategoriesMap, setInstrumentCategoriesMap] = useState({})
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [pagination, setPagination] = useState({})
    const [searchTerm, setSearchTerm] = useState('')
    const [currentPage, setCurrentPage] = useState(1)

    // Modal states
    const [isAssignModalOpen, setIsAssignModalOpen] = useState(false)
    const [selectedCategory, setSelectedCategory] = useState(null)

    const subTabs = [
        {
            id: 'mutual-funds',
            label: 'Mutual Funds',
        },
        {
            id: 'stocks',
            label: 'Stocks',
        },
    ]

    // Fetch instrument categories and create hash map
    const fetchInstrumentCategories = useCallback(async () => {
        try {
            const response = await axiosInstance.get(
                '/v1/category/instrument-categories/all'
            )
            const instrumentCategories = response.data || []

            // Create a hash map with ID as key and formatted name as value
            const categoriesMap = {}
            instrumentCategories.forEach((category) => {
                const id = category._id || category.id
                const formattedName = `${category.name} (${
                    category.route || 'N/A'
                } - ${category.assetClass || 'N/A'})`
                categoriesMap[id] = formattedName
            })

            return categoriesMap
        } catch (error) {
            console.error('Error fetching instrument categories:', error)
            return {}
        }
    }, [])

    const fetchMutualFunds = useCallback(async () => {
        try {
            setLoading(true)
            setError(null)

            // Build query parameters
            const params = new URLSearchParams()
            if (searchTerm) params.append('search', searchTerm)
            params.append('page', currentPage.toString())
            params.append('limit', '10')

            const queryString = params.toString()
            const url = `/v1/category/list-amfi-categories${
                queryString ? '?' + queryString : ''
            }`

            // Use Promise.all to fetch both mutual funds data and instrument categories
            const [mutualFundsResponse, instrumentCategoriesMap] =
                await Promise.all([
                    axiosInstance.get(url),
                    fetchInstrumentCategories(),
                ])

            const result = mutualFundsResponse.data

            console.log('Mutual Funds Data:', result)
            console.log('Instrument Categories Map:', instrumentCategoriesMap)

            if (
                mutualFundsResponse.status === 200 ||
                mutualFundsResponse.status === 201
            ) {
                setMutualFundsData(result.categories || [])
                setPagination(result.pagination || {})
                setInstrumentCategoriesMap(instrumentCategoriesMap)
            } else {
                setError('Failed to fetch mutual fund categories')
            }
        } catch (error) {
            console.error('Fetch error:', error)
            setError('Error fetching mutual fund categories: ' + error.message)
        } finally {
            setLoading(false)
        }
    }, [searchTerm, currentPage, fetchInstrumentCategories])

    const fetchStocks = useCallback(async () => {
        try {
            setLoading(true)

            // Use Promise.all to fetch both mock stocks data and instrument categories
            const [instrumentCategoriesMap] = await Promise.all([
                fetchInstrumentCategories(),
            ])

            // Mock data for stocks since API doesn't exist yet
            setTimeout(() => {
                const mockStocksData = [
                    {
                        id: 1,
                        name: 'Technology Stocks',
                        sector: 'Technology',
                        stockCount: 150,
                        marketCap: 'Large Cap',
                        status: 'active',
                        assignedInstrumentCategory:
                            'Tech Instruments (Route A - Equity)',
                    },
                    {
                        id: 2,
                        name: 'Healthcare Stocks',
                        sector: 'Healthcare',
                        stockCount: 89,
                        marketCap: 'Mid Cap',
                        status: 'active',
                        assignedInstrumentCategory: null,
                    },
                    {
                        id: 3,
                        name: 'Financial Stocks',
                        sector: 'Financial Services',
                        stockCount: 120,
                        marketCap: 'Large Cap',
                        status: 'active',
                        assignedInstrumentCategory:
                            'Banking Instruments (Route B - Equity)',
                    },
                    {
                        id: 4,
                        name: 'Energy Stocks',
                        sector: 'Energy',
                        stockCount: 45,
                        marketCap: 'Small Cap',
                        status: 'inactive',
                        assignedInstrumentCategory: null,
                    },
                    {
                        id: 5,
                        name: 'Consumer Goods',
                        sector: 'Consumer Discretionary',
                        stockCount: 78,
                        marketCap: 'Mid Cap',
                        status: 'active',
                        assignedInstrumentCategory:
                            'Consumer Instruments (Route C - Equity)',
                    },
                ]

                setStocksData(mockStocksData)
                setPagination({
                    currentPage: 1,
                    totalPages: 1,
                    totalItems: mockStocksData.length,
                    hasNextPage: false,
                    hasPrevPage: false,
                })
                setInstrumentCategoriesMap(instrumentCategoriesMap)
                setLoading(false)
            }, 500)
        } catch (error) {
            console.error('Error fetching stocks data:', error)
            setError('Error fetching stocks data: ' + error.message)
            setLoading(false)
        }
    }, [fetchInstrumentCategories])

    const fetchData = useCallback(async () => {
        if (activeSubTab === 'mutual-funds') {
            await fetchMutualFunds()
        } else if (activeSubTab === 'stocks') {
            // For now, we'll use mock data for stocks since the API doesn't exist yet
            fetchStocks()
        }
    }, [activeSubTab, fetchMutualFunds, fetchStocks])

    // Debounced search effect
    useEffect(() => {
        const delayedSearch = setTimeout(() => {
            setCurrentPage(1) // Reset to first page when searching
            fetchData()
        }, 500) // 500ms debounce

        return () => clearTimeout(delayedSearch)
    }, [searchTerm, fetchData])

    // Effect for tab changes and pagination
    useEffect(() => {
        fetchData()
    }, [activeSubTab, currentPage, fetchData])

    const handleSubTabChange = (tabId) => {
        setActiveSubTab(tabId)
        setCurrentPage(1)
        setSearchTerm('')
    }

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value)
    }

    const handlePrevPage = () => {
        if (pagination?.hasPrevPage) {
            setCurrentPage((prev) => prev - 1)
        }
    }

    const handleNextPage = () => {
        if (pagination?.hasNextPage) {
            setCurrentPage((prev) => prev + 1)
        }
    }

    const getCurrentTitle = () => {
        return activeSubTab === 'mutual-funds'
            ? 'Mutual Fund Categories'
            : 'Stock Categories'
    }

    const getCurrentButtonText = () => {
        return activeSubTab === 'mutual-funds'
            ? 'Assign Fund Categories'
            : 'Assign Stock Categories'
    }

    const getCurrentData = () => {
        return activeSubTab === 'mutual-funds' ? mutualFundsData : stocksData
    }

    // Handle big assign button click
    const handleBigAssignClick = () => {
        setSelectedCategory(null) // No prefilled category
        setIsAssignModalOpen(true)
    }

    // Handle small assign button click
    const handleSmallAssignClick = (category) => {
        setSelectedCategory(category) // Prefill with selected category
        setIsAssignModalOpen(true)
    }

    // Handle assignment completion
    const handleAssignmentComplete = () => {
        // Refresh data after assignment
        fetchData()
    }

    // Helper function to get assigned instrument category display text
    const getAssignedInstrumentCategory = (item) => {
        if (activeSubTab === 'mutual-funds') {
            // For mutual funds, check if instrumentCategorySchema is populated
            if (item.instrumentCategorySchema) {
                const instrumentCategoryId = item.instrumentCategorySchema

                if (typeof instrumentCategoryId === 'string') {
                    // If it's an ID, look it up in the hash map
                    return (
                        instrumentCategoriesMap[instrumentCategoryId] ||
                        `Assigned (ID: ${instrumentCategoryId.substring(
                            0,
                            8
                        )}...)`
                    )
                } else if (
                    typeof instrumentCategoryId === 'object' &&
                    instrumentCategoryId.name
                ) {
                    // If populated with full object (fallback)
                    return `${instrumentCategoryId.name} (${
                        instrumentCategoryId.route || 'N/A'
                    } - ${instrumentCategoryId.assetClass || 'N/A'})`
                }
            }
            return null
        } else {
            // For stocks (mock data)
            return item.assignedInstrumentCategory || null
        }
    }

    // Helper function to check if item has an assignment
    const hasInstrumentCategoryAssignment = (item) => {
        return getAssignedInstrumentCategory(item) !== null
    }

    if (error) {
        return (
            <div className="space-y-0">
                <SubTabBar
                    tabs={subTabs}
                    activeTab={activeSubTab}
                    onTabChange={handleSubTabChange}
                />
                <div className="pt-6">
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                        {error}
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="space-y-0">
            {/* Sub Tab Bar */}
            <SubTabBar
                tabs={subTabs}
                activeTab={activeSubTab}
                onTabChange={handleSubTabChange}
            />

            {/* Content */}
            <div className="pt-6 space-y-6">
                <div className="flex items-center justify-between">
                    <h1 className="text-3xl font-bold text-gray-900">
                        Category Assignment
                    </h1>
                    <button
                        onClick={handleBigAssignClick}
                        className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-lg font-medium transition-colors cursor-pointer"
                    >
                        {getCurrentButtonText()}
                    </button>
                </div>

                <h2 className="text-2xl font-semibold text-gray-700">
                    {getCurrentTitle()}
                </h2>

                {/* Table */}
                <div className="bg-white rounded-lg shadow">
                    {/* Search and Filters */}
                    <div className="px-6 py-4 border-b border-gray-200">
                        <div className="flex items-center justify-between">
                            <h2 className="text-xl font-semibold text-gray-900">
                                All Categories (
                                {pagination?.totalItems ||
                                    getCurrentData()?.length ||
                                    0}
                                )
                            </h2>
                            <div className="flex space-x-2">
                                <input
                                    type="text"
                                    placeholder="Search categories..."
                                    value={searchTerm}
                                    onChange={handleSearchChange}
                                    className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Loading State */}
                    {loading ? (
                        <div className="flex justify-center items-center h-64">
                            <div className="text-lg text-gray-600">
                                Loading...
                            </div>
                        </div>
                    ) : (
                        <>
                            {/* Table Content */}
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            {activeSubTab === 'mutual-funds' ? (
                                                <>
                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                        Category Name
                                                    </th>
                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                        Fund Count
                                                    </th>
                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                        Status
                                                    </th>
                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                        Assigned Instrument
                                                        Category
                                                    </th>
                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                        Actions
                                                    </th>
                                                </>
                                            ) : (
                                                <>
                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                        Category Name
                                                    </th>
                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                        Sector
                                                    </th>
                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                        Stock Count
                                                    </th>
                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                        Market Cap
                                                    </th>
                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                        Assigned Instrument
                                                        Category
                                                    </th>
                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                        Actions
                                                    </th>
                                                </>
                                            )}
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {getCurrentData() &&
                                        getCurrentData().length > 0 ? (
                                            getCurrentData().map(
                                                (item, index) => (
                                                    <tr
                                                        key={
                                                            item._id ||
                                                            item.id ||
                                                            index
                                                        }
                                                        className="hover:bg-gray-50"
                                                    >
                                                        {activeSubTab ===
                                                        'mutual-funds' ? (
                                                            <>
                                                                <td className="px-6 py-4 text-sm font-medium text-gray-900">
                                                                    <div className="max-w-xs">
                                                                        {
                                                                            item.name
                                                                        }
                                                                    </div>
                                                                </td>
                                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                                    {item.fundCount ||
                                                                        0}
                                                                </td>
                                                                <td className="px-6 py-4 whitespace-nowrap">
                                                                    <span
                                                                        className={`px-2 py-1 text-xs font-semibold rounded-full ${
                                                                            item.status ===
                                                                                'active' ||
                                                                            item.status ===
                                                                                'set'
                                                                                ? 'text-green-800 bg-green-100'
                                                                                : item.status ===
                                                                                  'inactive'
                                                                                ? 'text-red-800 bg-red-100'
                                                                                : 'text-gray-800 bg-gray-100'
                                                                        }`}
                                                                    >
                                                                        {item.status ===
                                                                        'unset'
                                                                            ? 'Unset'
                                                                            : item.status ===
                                                                              'set'
                                                                            ? 'Set'
                                                                            : item.status ||
                                                                              'Unknown'}
                                                                    </span>
                                                                </td>
                                                                <td className="px-6 py-4 text-sm text-gray-900">
                                                                    <div className="max-w-xs">
                                                                        {getAssignedInstrumentCategory(
                                                                            item
                                                                        ) ? (
                                                                            <span className="text-emerald-600 font-medium">
                                                                                {getAssignedInstrumentCategory(
                                                                                    item
                                                                                )}
                                                                            </span>
                                                                        ) : (
                                                                            <span className="text-gray-400 italic">
                                                                                Not
                                                                                assigned
                                                                            </span>
                                                                        )}
                                                                    </div>
                                                                </td>
                                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                                    <CustomButtonComponent
                                                                        item={
                                                                            item
                                                                        }
                                                                        onAssign={
                                                                            handleSmallAssignClick
                                                                        }
                                                                        hasAssignment={hasInstrumentCategoryAssignment(
                                                                            item
                                                                        )}
                                                                    />
                                                                </td>
                                                            </>
                                                        ) : (
                                                            <>
                                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                                    {item.name}
                                                                </td>
                                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                                                    {
                                                                        item.sector
                                                                    }
                                                                </td>
                                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                                    {
                                                                        item.stockCount
                                                                    }
                                                                </td>
                                                                <td className="px-6 py-4 whitespace-nowrap">
                                                                    <span
                                                                        className={`px-2 py-1 text-xs font-semibold rounded-full ${
                                                                            item.marketCap ===
                                                                            'Large Cap'
                                                                                ? 'text-emerald-800 bg-emerald-100'
                                                                                : item.marketCap ===
                                                                                  'Mid Cap'
                                                                                ? 'text-yellow-800 bg-yellow-100'
                                                                                : 'text-green-800 bg-green-100'
                                                                        }`}
                                                                    >
                                                                        {
                                                                            item.marketCap
                                                                        }
                                                                    </span>
                                                                </td>
                                                                <td className="px-6 py-4 text-sm text-gray-900">
                                                                    <div className="max-w-xs">
                                                                        {getAssignedInstrumentCategory(
                                                                            item
                                                                        ) ? (
                                                                            <span className="text-emerald-600 font-medium">
                                                                                {getAssignedInstrumentCategory(
                                                                                    item
                                                                                )}
                                                                            </span>
                                                                        ) : (
                                                                            <span className="text-gray-400 italic">
                                                                                Not
                                                                                assigned
                                                                            </span>
                                                                        )}
                                                                    </div>
                                                                </td>
                                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                                    <CustomButtonComponent
                                                                        item={
                                                                            item
                                                                        }
                                                                        onAssign={
                                                                            handleSmallAssignClick
                                                                        }
                                                                        hasAssignment={hasInstrumentCategoryAssignment(
                                                                            item
                                                                        )}
                                                                    />
                                                                </td>
                                                            </>
                                                        )}
                                                    </tr>
                                                )
                                            )
                                        ) : (
                                            <tr>
                                                <td
                                                    colSpan={
                                                        activeSubTab ===
                                                        'mutual-funds'
                                                            ? 5
                                                            : 6
                                                    }
                                                    className="px-6 py-4 text-center text-sm text-gray-500"
                                                >
                                                    {activeSubTab ===
                                                    'mutual-funds'
                                                        ? 'No mutual fund categories found'
                                                        : 'No stock categories found'}
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
                                            Showing page{' '}
                                            {pagination.currentPage} of{' '}
                                            {pagination.totalPages} (
                                            {pagination.totalItems} total items)
                                        </div>
                                        <div className="flex space-x-2">
                                            <button
                                                disabled={
                                                    !pagination.hasPrevPage
                                                }
                                                onClick={handlePrevPage}
                                                className="px-3 py-2 text-sm border border-gray-300 rounded-lg bg-white text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition"
                                            >
                                                Previous
                                            </button>
                                            <button
                                                disabled={
                                                    !pagination.hasNextPage
                                                }
                                                onClick={handleNextPage}
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
            </div>

            {/* Category Assignment Modal */}
            <CategoryAssignmentModal
                isOpen={isAssignModalOpen}
                onClose={() => {
                    setIsAssignModalOpen(false)
                    setSelectedCategory(null)
                }}
                onAssigned={handleAssignmentComplete}
                prefilledCategory={selectedCategory}
                type={activeSubTab}
            />
        </div>
    )
}
