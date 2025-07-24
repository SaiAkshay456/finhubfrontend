'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import CreateCategoryModal from '../../../components/CreateCategoryModal'
import EditCategoryModal from '../../../components/EditCategoryModal'
import axiosInstance from '@/helpers/axios'

export default function CategoryManagement() {
    const [categories, setCategories] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [pagination, setPagination] = useState({})
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
    const [isEditModalOpen, setIsEditModalOpen] = useState(false)
    const [editingCategory, setEditingCategory] = useState(null)
    const [deleteConfirm, setDeleteConfirm] = useState({
        show: false,
        category: null,
    })

    // Filter and search states
    const [searchTerm, setSearchTerm] = useState('')
    const [assetClassFilter, setAssetClassFilter] = useState('')
    const [routeFilter, setRouteFilter] = useState('')
    const [currentPage, setCurrentPage] = useState(1)
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('')

    // Ref for search input to maintain focus
    const searchInputRef = useRef(null)

    // Debounce search term
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearchTerm(searchTerm)
        }, 500)

        return () => clearTimeout(timer)
    }, [searchTerm])

    // Reset to first page when search term changes
    useEffect(() => {
        setCurrentPage(1)
    }, [debouncedSearchTerm])

    const fetchCategories = useCallback(async () => {
        try {
            // Don't show loading spinner for search operations to prevent re-render
            if (currentPage === 1 && !debouncedSearchTerm) {
                setLoading(true)
            }

            // Build query parameters
            const params = new URLSearchParams()
            if (debouncedSearchTerm)
                params.append('search', debouncedSearchTerm)
            if (assetClassFilter) params.append('assetClass', assetClassFilter)
            if (routeFilter) params.append('route', routeFilter)
            params.append('page', currentPage.toString())

            const queryString = params.toString()
            const url = `/v1/category/list-instrument-categories${
                queryString ? '?' + queryString : ''
            }`

            const response = await axiosInstance.get(url)
            const data = response.data

            if (response.status === 200) {
                setCategories(data.categories || [])
                setPagination(data.pagination || {})
                setError(null) // Clear any previous errors
            } else {
                setError(data.message || 'Failed to fetch categories')
            }
        } catch (err) {
            console.error('Error fetching categories:', err)
            setError('Error fetching categories: ' + err.message)
        } finally {
            setLoading(false)
        }
    }, [debouncedSearchTerm, assetClassFilter, routeFilter, currentPage])

    // Fetch data when debounced search term or filters change
    useEffect(() => {
        fetchCategories()
    }, [fetchCategories])

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

    const handleAssetClassChange = (e) => {
        setAssetClassFilter(e.target.value)
        setCurrentPage(1) // Reset to first page when filtering
    }

    const handleRouteChange = (e) => {
        setRouteFilter(e.target.value)
        setCurrentPage(1) // Reset to first page when filtering
    }

    const handlePrevPage = () => {
        if (pagination.hasPrevPage) {
            setCurrentPage((prev) => prev - 1)
        }
    }

    const handleNextPage = () => {
        if (pagination.hasNextPage) {
            setCurrentPage((prev) => prev + 1)
        }
    }

    const handleCategoryCreated = () => {
        fetchCategories() // Refresh the list after creating a new category
    }

    const handleCategoryUpdated = () => {
        fetchCategories() // Refresh the list after updating a category
        setIsEditModalOpen(false)
        setEditingCategory(null)
    }

    const handleEditClick = (category) => {
        setEditingCategory(category)
        setIsEditModalOpen(true)
    }

    const handleDeleteClick = (category) => {
        setDeleteConfirm({ show: true, category })
    }

    const handleDeleteConfirm = async () => {
        if (!deleteConfirm.category) return

        try {
            const response = await axiosInstance.delete(
                `/v1/category/delete-instrument-category/${deleteConfirm.category._id}`
            )

            if (response.status === 200) {
                setDeleteConfirm({ show: false, category: null })
                fetchCategories() // Refresh the list
            } else {
                setError(response.data.message || 'Failed to delete category')
            }
        } catch (err) {
            console.error('Error deleting category:', err)
            setError('An error occurred while deleting the category')
        }
    }

    const handleDeleteCancel = () => {
        setDeleteConfirm({ show: false, category: null })
    }

    // Helper function to get action button text
    const getActionButtonText = (category) => {
        return category.status === 'set' ? 'Reassign' : 'Assign'
    }

    // Helper function to get assigned AMFI category display
    const getAssignedCategory = (category) => {
        if (category.status === 'set' && category.amfiCategory) {
            // If the category has an amfiCategory populated/referenced
            if (typeof category.amfiCategory === 'object') {
                return category.amfiCategory.name || 'Assigned Category'
            } else {
                // If it's just an ID, show a generic message
                return 'Assigned Category'
            }
        }
        return '-'
    }

    // Show loading only for initial load or when no search is active
    if (loading && currentPage === 1 && !debouncedSearchTerm && !searchTerm) {
        return (
            <div className="p-6">
                <div className="flex justify-center items-center h-64">
                    <div className="text-lg text-gray-600">
                        Loading categories...
                    </div>
                </div>
            </div>
        )
    }

    if (error && !categories.length) {
        return (
            <div className="p-6">
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                    {error}
                </div>
            </div>
        )
    }

    // Calculate stats for the overview cards
    const equityCategories = categories.filter(
        (category) => category.assetClass === 'Equity'
    ).length
    const debtCategories = categories.filter(
        (category) => category.assetClass === 'Debt'
    ).length
    const commodityCategories = categories.filter(
        (category) => category.assetClass === 'Commodity'
    ).length
    const categoriesWithRange = categories.filter(
        (category) => category.range && category.range.min && category.range.max
    ).length
    const totalCategories = categories.length
    const assignedCategories = categories.filter(
        (category) => category.status === 'set'
    ).length

    return (
        <div className="p-6">
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <h1 className="text-3xl font-bold text-gray-900">
                        Instrument Categories
                    </h1>
                    <button
                        onClick={() => setIsCreateModalOpen(true)}
                        className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg font-medium transition-colors cursor-pointer"
                    >
                        Create Category
                    </button>
                </div>

                {/* Overview Cards */}
                <div className="bg-white rounded-lg shadow p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                        Categories Overview
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
                        <div className="border border-gray-200 rounded-lg p-4">
                            <h4 className="font-medium text-gray-900">
                                Equity Categories
                            </h4>
                            <p className="text-2xl font-bold text-blue-600">
                                {equityCategories}
                            </p>
                            <p className="text-sm text-gray-500">
                                Equity instruments
                            </p>
                        </div>
                        <div className="border border-gray-200 rounded-lg p-4">
                            <h4 className="font-medium text-gray-900">
                                Debt Categories
                            </h4>
                            <p className="text-2xl font-bold text-green-600">
                                {debtCategories}
                            </p>
                            <p className="text-sm text-gray-500">
                                Debt instruments
                            </p>
                        </div>
                        <div className="border border-gray-200 rounded-lg p-4">
                            <h4 className="font-medium text-gray-900">
                                Commodity Categories
                            </h4>
                            <p className="text-2xl font-bold text-yellow-600">
                                {commodityCategories}
                            </p>
                            <p className="text-sm text-gray-500">
                                Commodity instruments
                            </p>
                        </div>
                        <div className="border border-gray-200 rounded-lg p-4">
                            <h4 className="font-medium text-gray-900">
                                With Range
                            </h4>
                            <p className="text-2xl font-bold text-purple-600">
                                {categoriesWithRange}
                            </p>
                            <p className="text-sm text-gray-500">
                                Categories with ranges
                            </p>
                        </div>
                        <div className="border border-gray-200 rounded-lg p-4">
                            <h4 className="font-medium text-gray-900">
                                Assigned Categories
                            </h4>
                            <p className="text-2xl font-bold text-orange-600">
                                {assignedCategories}
                            </p>
                            <p className="text-sm text-gray-500">
                                Categories assigned
                            </p>
                        </div>
                        <div className="border border-gray-200 rounded-lg p-4">
                            <h4 className="font-medium text-gray-900">
                                Total Categories
                            </h4>
                            <p className="text-2xl font-bold text-indigo-600">
                                {totalCategories}
                            </p>
                            <p className="text-sm text-gray-500">
                                All categories
                            </p>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow">
                    <div className="px-6 py-4 border-b border-gray-200">
                        <div className="flex items-center justify-between">
                            <h2 className="text-xl font-semibold text-gray-900">
                                All Categories ({pagination.totalItems || 0})
                            </h2>
                            <div className="flex space-x-2">
                                <input
                                    ref={searchInputRef}
                                    type="text"
                                    placeholder="Search categories..."
                                    value={searchTerm}
                                    onChange={handleSearchChange}
                                    className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                <select
                                    value={assetClassFilter}
                                    onChange={handleAssetClassChange}
                                    className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="">All Asset Classes</option>
                                    <option value="Equity">Equity</option>
                                    <option value="Debt">Debt</option>
                                    <option value="Commodity">Commodity</option>
                                </select>
                                <select
                                    value={routeFilter}
                                    onChange={handleRouteChange}
                                    className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="">All Routes</option>
                                    <option value="Core Direct">
                                        Core Direct
                                    </option>
                                    <option value="Mutual Funds">
                                        Mutual Funds
                                    </option>
                                    <option value="Direct Debt">
                                        Direct Debt
                                    </option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Show loading indicator for search operations */}
                    {loading && (debouncedSearchTerm || currentPage > 1) && (
                        <div className="px-6 py-4 border-b border-gray-200">
                            <div className="text-sm text-gray-600">
                                Searching...
                            </div>
                        </div>
                    )}

                    {/* Show error message */}
                    {error && categories.length > 0 && (
                        <div className="px-6 py-4 border-b border-gray-200">
                            <div className="text-sm text-red-600">{error}</div>
                        </div>
                    )}

                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Name
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Asset Class
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Route
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Range
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Assigned To
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Status
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {categories.length > 0 ? (
                                    categories.map((category) => (
                                        <tr
                                            key={category._id}
                                            className="hover:bg-gray-50"
                                        >
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                {category.name}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span
                                                    className={`px-2 py-1 text-xs font-semibold rounded-full ${
                                                        category.assetClass ===
                                                        'Equity'
                                                            ? 'text-blue-800 bg-blue-100'
                                                            : category.assetClass ===
                                                              'Debt'
                                                            ? 'text-green-800 bg-green-100'
                                                            : 'text-yellow-800 bg-yellow-100'
                                                    }`}
                                                >
                                                    {category.assetClass}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {category.route}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {category.range &&
                                                category.range.min &&
                                                category.range.max
                                                    ? `${category.range.min} - ${category.range.max}`
                                                    : '-'}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                <div className="max-w-xs truncate">
                                                    {getAssignedCategory(
                                                        category
                                                    )}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span
                                                    className={`px-2 py-1 text-xs font-semibold rounded-full ${
                                                        category.status ===
                                                        'set'
                                                            ? 'text-green-800 bg-green-100'
                                                            : category.status ===
                                                              'unset'
                                                            ? 'text-gray-800 bg-gray-100'
                                                            : 'text-yellow-800 bg-yellow-100'
                                                    }`}
                                                >
                                                    {category.status === 'set'
                                                        ? 'Assigned'
                                                        : category.status ===
                                                          'unset'
                                                        ? 'Unassigned'
                                                        : category.status ||
                                                          'Unknown'}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                <div className="flex space-x-2">
                                                    <button
                                                        onClick={() =>
                                                            handleEditClick(
                                                                category
                                                            )
                                                        }
                                                        className="text-blue-600 hover:text-blue-900 cursor-pointer"
                                                    >
                                                        Edit
                                                    </button>
                                                    <button
                                                        onClick={() =>
                                                            handleDeleteClick(
                                                                category
                                                            )
                                                        }
                                                        className="text-red-600 hover:text-red-900 cursor-pointer"
                                                    >
                                                        Delete
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td
                                            colSpan="7"
                                            className="px-6 py-4 text-center text-sm text-gray-500"
                                        >
                                            {loading
                                                ? 'Loading...'
                                                : 'No categories found'}
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    {pagination.totalPages > 1 && (
                        <div className="px-6 py-4 border-t border-gray-200">
                            <div className="flex items-center justify-between">
                                <div className="text-sm text-gray-700">
                                    Showing page {pagination.currentPage} of{' '}
                                    {pagination.totalPages} (
                                    {pagination.totalItems} total items)
                                </div>
                                <div className="flex space-x-2">
                                    <button
                                        disabled={!pagination.hasPrevPage}
                                        onClick={handlePrevPage}
                                        className="px-3 py-2 text-sm border border-gray-300 rounded-lg bg-white text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        Previous
                                    </button>
                                    <button
                                        disabled={!pagination.hasNextPage}
                                        onClick={handleNextPage}
                                        className="px-3 py-2 text-sm border border-gray-300 rounded-lg bg-white text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        Next
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Create Category Modal */}
                <CreateCategoryModal
                    isOpen={isCreateModalOpen}
                    onClose={() => setIsCreateModalOpen(false)}
                    onCreated={handleCategoryCreated}
                />

                {/* Edit Category Modal */}
                {editingCategory && (
                    <EditCategoryModal
                        isOpen={isEditModalOpen}
                        onClose={() => {
                            setIsEditModalOpen(false)
                            setEditingCategory(null)
                        }}
                        onUpdated={handleCategoryUpdated}
                        category={editingCategory}
                    />
                )}

                {/* Delete Confirmation Modal */}
                {deleteConfirm.show && (
                    <div className="fixed inset-0 bg-gray-900/50 backdrop-blur-sm flex items-center justify-center z-50">
                        <div className="bg-white rounded-lg shadow-xl p-6 max-w-md mx-4">
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                Delete Category
                            </h3>
                            <p className="text-gray-600 mb-4">
                                Are you sure you want to delete &quot;
                                {deleteConfirm.category?.name}&quot;? This
                                action cannot be undone.
                            </p>
                            <div className="flex justify-end space-x-3">
                                <button
                                    onClick={handleDeleteCancel}
                                    className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleDeleteConfirm}
                                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
