'use client'
import React, { useState, useEffect, useCallback } from 'react'
import StocksTable from '../../../components/StocksTable'
import CategoryAssignmentModal from '../../../components/CategoryAssignmentModal'
import axiosInstance from '@/helpers/axios'

export default function StocksAssignment() {
    const [stocksData, setStocksData] = useState([])
    const [instrumentCategoriesMap, setInstrumentCategoriesMap] = useState({})
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [pagination, setPagination] = useState({})
    const [searchTerm, setSearchTerm] = useState('')
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('')
    const [currentPage, setCurrentPage] = useState(1)

    // Modal states
    const [isAssignModalOpen, setIsAssignModalOpen] = useState(false)
    const [selectedCategory, setSelectedCategory] = useState(null)

    // Debounce search term
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearchTerm(searchTerm)
        }, 500)

        return () => clearTimeout(timer)
    }, [searchTerm])

    // Reset to first page when search term changes
    useEffect(() => {
        if (debouncedSearchTerm !== searchTerm) return // Only reset when debounced term actually changes
        setCurrentPage(1)
    }, [debouncedSearchTerm])

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

    const fetchStocks = useCallback(async () => {
        try {
            setLoading(true)
            setError(null)

            // Build query parameters
            const params = new URLSearchParams()
            if (debouncedSearchTerm)
                params.append('search', debouncedSearchTerm)
            params.append('page', currentPage.toString())
            params.append('limit', '10')

            const queryString = params.toString()
            const url = `/v1/stocks/list-stocks${
                queryString ? '?' + queryString : ''
            }`

            console.log('Fetching stocks:', {
                url,
                currentPage,
                debouncedSearchTerm,
            })

            // Use Promise.all to fetch both stocks data and instrument categories
            const [stocksResponse, instrumentCategoriesMap] = await Promise.all(
                [axiosInstance.get(url), fetchInstrumentCategories()]
            )

            const result = stocksResponse.data

            console.log('Stocks Response:', result)
            console.log('Pagination:', result.pagination)

            if (
                stocksResponse.status === 200 ||
                stocksResponse.status === 201
            ) {
                // API returns 'data' array, not 'stocks'
                setStocksData(result.data || [])
                setPagination(result.pagination || {})
                setInstrumentCategoriesMap(instrumentCategoriesMap)
            } else {
                setError('Failed to fetch stocks data')
            }
        } catch (error) {
            console.error('Error fetching stocks data:', error)
            setError('Error fetching stocks data: ' + error.message)
        } finally {
            setLoading(false)
        }
    }, [debouncedSearchTerm, currentPage, fetchInstrumentCategories])

    // Fetch data when debounced search term or current page changes
    useEffect(() => {
        fetchStocks()
    }, [fetchStocks])

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value)
    }

    const handlePrevPage = () => {
        console.log('Previous page clicked', {
            currentPage,
            paginationPage: pagination?.page,
            hasPrev: pagination?.hasPrev,
        })

        // Use API's hasPrev flag and ensure we don't go below page 1
        if (pagination?.hasPrev && currentPage > 1) {
            setCurrentPage((prev) => prev - 1)
        }
    }

    const handleNextPage = () => {
        console.log('Next page clicked', {
            currentPage,
            paginationPage: pagination?.page,
            totalPages: pagination?.totalPages,
            hasNext: pagination?.hasNext,
        })

        // Use API's hasNext flag and ensure we don't exceed total pages
        if (pagination?.hasNext && currentPage < pagination?.totalPages) {
            setCurrentPage((prev) => prev + 1)
        }
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
        fetchStocks()
    }

    // Helper function to get assigned instrument category display text
    const getAssignedInstrumentCategory = (item) => {
        return item.assignedInstrumentCategory || null
    }

    // Helper function to check if item has an assignment
    const hasInstrumentCategoryAssignment = (item) => {
        return getAssignedInstrumentCategory(item) !== null
    }

    if (error) {
        return (
            <div className="pt-6">
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                    {error}
                </div>
            </div>
        )
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-semibold text-gray-700">
                    Stock Categories
                </h2>
                <button
                    onClick={handleBigAssignClick}
                    className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-lg font-medium transition-colors cursor-pointer"
                >
                    Assign Stock Categories
                </button>
            </div>

            <StocksTable
                data={stocksData}
                loading={loading}
                pagination={pagination}
                searchTerm={searchTerm}
                onSearchChange={handleSearchChange}
                onPrevPage={handlePrevPage}
                onNextPage={handleNextPage}
                onAssign={handleSmallAssignClick}
                getAssignedInstrumentCategory={getAssignedInstrumentCategory}
                hasInstrumentCategoryAssignment={
                    hasInstrumentCategoryAssignment
                }
            />

            {/* Category Assignment Modal */}
            <CategoryAssignmentModal
                isOpen={isAssignModalOpen}
                onClose={() => {
                    setIsAssignModalOpen(false)
                    setSelectedCategory(null)
                }}
                onAssigned={handleAssignmentComplete}
                prefilledCategory={selectedCategory}
                type="stocks"
            />
        </div>
    )
}
