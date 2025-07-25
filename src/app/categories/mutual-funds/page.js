'use client'
import React, { useState, useEffect, useCallback, useRef } from 'react'
import MutualFundsTable from '../../../components/MutualFundsTable'
import CategoryAssignmentModal from '../../../components/CategoryAssignmentModal'
import axiosInstance from '@/helpers/axios'

export default function MutualFundsAssignment() {
    const [mutualFundsData, setMutualFundsData] = useState([])
    const [instrumentCategoriesMap, setInstrumentCategoriesMap] = useState({})
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [pagination, setPagination] = useState({})
    const [searchTerm, setSearchTerm] = useState('')
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('')
    const [currentPage, setCurrentPage] = useState(1)

    // Ref for search input to maintain focus
    const searchInputRef = useRef(null)

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

    const fetchMutualFunds = useCallback(async () => {
        try {
            // Don't show loading spinner for search operations to prevent re-render
            if (currentPage === 1 && !debouncedSearchTerm && !searchTerm) {
                setLoading(true)
            }

            setError(null)

            // Build query parameters
            const params = new URLSearchParams()
            if (debouncedSearchTerm)
                params.append('search', debouncedSearchTerm)
            params.append('page', currentPage.toString())
            params.append('limit', '10')

            const queryString = params.toString()
            const url = `/v1/category/list-amfi-categories${
                queryString ? '?' + queryString : ''
            }`

            console.log('Fetching mutual funds:', {
                url,
                currentPage,
                debouncedSearchTerm,
            })

            // Use Promise.all to fetch both mutual funds data and instrument categories
            const [mutualFundsResponse, instrumentCategoriesMap] =
                await Promise.all([
                    axiosInstance.get(url),
                    fetchInstrumentCategories(),
                ])

            const result = mutualFundsResponse.data

            console.log('Mutual Funds Response:', result)
            console.log('Pagination:', result.pagination)

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
    }, [
        debouncedSearchTerm,
        currentPage,
        fetchInstrumentCategories,
        searchTerm,
    ])

    // Fetch data when debounced search term or page changes
    useEffect(() => {
        fetchMutualFunds()
    }, [fetchMutualFunds])

    const handleSearchChange = (e) => {
        const value = e.target.value
        setSearchTerm(value)

        // Store cursor position
        const cursorPosition = e.target.selectionStart

        // Restore focus and cursor position after state update
        setTimeout(() => {
            if (searchInputRef.current) {
                searchInputRef.current.focus()
                searchInputRef.current.setSelectionRange(
                    cursorPosition,
                    cursorPosition
                )
            }
        }, 0)
    }

    const handlePrevPage = () => {
        console.log('Previous page clicked', {
            currentPage,
            paginationCurrentPage: pagination?.currentPage,
            hasPrevPage: pagination?.hasPrevPage,
        })

        // Use proper pagination logic
        if ((pagination?.currentPage || currentPage) > 1) {
            const newPage = (pagination?.currentPage || currentPage) - 1
            console.log('Setting page to:', newPage)
            setCurrentPage(newPage)
        }
    }

    const handleNextPage = () => {
        console.log('Next page clicked', {
            currentPage,
            paginationCurrentPage: pagination?.currentPage,
            totalPages: pagination?.totalPages,
            hasNextPage: pagination?.hasNextPage,
        })

        // Use proper pagination logic
        if (
            (pagination?.currentPage || currentPage) <
            (pagination?.totalPages || 1)
        ) {
            const newPage = (pagination?.currentPage || currentPage) + 1
            console.log('Setting page to:', newPage)
            setCurrentPage(newPage)
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
        fetchMutualFunds()
    }

    // Helper function to get assigned instrument category display text
    const getAssignedInstrumentCategory = (item) => {
        // For mutual funds, check if instrumentCategorySchema is populated
        if (item.instrumentCategorySchema) {
            const instrumentCategoryId = item.instrumentCategorySchema

            if (typeof instrumentCategoryId === 'string') {
                // If it's an ID, look it up in the hash map
                return (
                    instrumentCategoriesMap[instrumentCategoryId] ||
                    `Assigned (ID: ${instrumentCategoryId.substring(0, 8)}...)`
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
    }

    // Helper function to check if item has an assignment
    const hasInstrumentCategoryAssignment = (item) => {
        return getAssignedInstrumentCategory(item) !== null
    }

    // Show loading only for initial load or when no search is active
    if (loading && currentPage === 1 && !debouncedSearchTerm && !searchTerm) {
        return (
            <div className="pt-6">
                <div className="flex justify-center items-center h-64">
                    <div className="text-lg text-gray-600">
                        Loading mutual fund categories...
                    </div>
                </div>
            </div>
        )
    }

    if (error && !mutualFundsData.length) {
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
                    Mutual Fund Categories
                </h2>
                <button
                    onClick={handleBigAssignClick}
                    className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-lg font-medium transition-colors cursor-pointer"
                >
                    Assign Fund Categories
                </button>
            </div>

            <MutualFundsTable
                data={mutualFundsData}
                loading={loading && (debouncedSearchTerm || currentPage > 1)}
                pagination={pagination}
                searchTerm={searchTerm}
                searchInputRef={searchInputRef}
                onSearchChange={handleSearchChange}
                onPrevPage={handlePrevPage}
                onNextPage={handleNextPage}
                onAssign={handleSmallAssignClick}
                getAssignedInstrumentCategory={getAssignedInstrumentCategory}
                hasInstrumentCategoryAssignment={
                    hasInstrumentCategoryAssignment
                }
                error={error}
                currentPage={currentPage}
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
                type="mutual-funds"
            />
        </div>
    )
}
