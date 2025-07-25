'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import CreateRouteModal from '../../../../components/CreateRouteModal'
import EditRouteModal from '../../../../components/EditRouteModal'
import axiosInstance from '@/helpers/axios'

export default function RoutesPage() {
    const [routes, setRoutes] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [pagination, setPagination] = useState({})
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
    const [isEditModalOpen, setIsEditModalOpen] = useState(false)
    const [editingRoute, setEditingRoute] = useState(null)
    const [deleteConfirm, setDeleteConfirm] = useState({
        show: false,
        route: null,
    })

    // Filter and search states
    const [searchTerm, setSearchTerm] = useState('')
    const [assetClassFilter, setAssetClassFilter] = useState('')
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

    const fetchRoutes = useCallback(async () => {
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
            params.append('page', currentPage.toString())

            const queryString = params.toString()
            const url = `/v1/category/list-routes${
                queryString ? '?' + queryString : ''
            }`

            const response = await axiosInstance.get(url)
            const data = response.data

            if (response.status === 200) {
                setRoutes(data.routes || data.data || [])
                setPagination(data.pagination || {})
                setError(null) // Clear any previous errors
            } else {
                setError(data.message || 'Failed to fetch routes')
            }
        } catch (err) {
            console.error('Error fetching routes:', err)
            setError('Error fetching routes: ' + err.message)
        } finally {
            setLoading(false)
        }
    }, [debouncedSearchTerm, assetClassFilter, currentPage])

    // Fetch data when debounced search term or filters change
    useEffect(() => {
        fetchRoutes()
    }, [fetchRoutes])

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

    const handleRouteCreated = () => {
        fetchRoutes() // Refresh the list after creating a new route
    }

    const handleRouteUpdated = () => {
        fetchRoutes() // Refresh the list after updating a route
        setIsEditModalOpen(false)
        setEditingRoute(null)
    }

    const handleEditClick = (route) => {
        setEditingRoute(route)
        setIsEditModalOpen(true)
    }

    const handleDeleteClick = (route) => {
        setDeleteConfirm({ show: true, route })
    }

    const handleDeleteConfirm = async () => {
        if (!deleteConfirm.route) return

        try {
            const response = await axiosInstance.delete(
                `/v1/category/delete-route/${
                    deleteConfirm.route._id || deleteConfirm.route.id
                }`
            )

            if (response.status === 200) {
                setDeleteConfirm({ show: false, route: null })
                fetchRoutes() // Refresh the list
            } else {
                setError(response.data.message || 'Failed to delete route')
            }
        } catch (err) {
            console.error('Error deleting route:', err)
            setError('An error occurred while deleting the route')
        }
    }

    const handleDeleteCancel = () => {
        setDeleteConfirm({ show: false, route: null })
    }

    // Show loading only for initial load or when no search is active
    if (loading && currentPage === 1 && !debouncedSearchTerm && !searchTerm) {
        return (
            <div className="p-6">
                <div className="flex justify-center items-center h-64">
                    <div className="text-lg text-gray-600">
                        Loading routes...
                    </div>
                </div>
            </div>
        )
    }

    if (error && !routes.length) {
        return (
            <div className="p-6">
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                    {error}
                </div>
            </div>
        )
    }

    // Calculate stats for the overview cards
    const activeRoutes = routes.filter(
        (route) => route.isActive !== false
    ).length
    const inactiveRoutes = routes.length - activeRoutes
    const totalRoutes = routes.length

    return (
        <div className="p-6">
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <h1 className="text-3xl font-bold text-gray-900">
                        Routes Management
                    </h1>
                    <button
                        onClick={() => setIsCreateModalOpen(true)}
                        className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg font-medium transition-colors cursor-pointer"
                    >
                        Create Route
                    </button>
                </div>

                {/* Overview Cards */}
                <div className="bg-white rounded-lg shadow p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                        Routes Overview
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="border border-gray-200 rounded-lg p-4">
                            <h4 className="font-medium text-gray-900">
                                Active Routes
                            </h4>
                            <p className="text-2xl font-bold text-green-600">
                                {activeRoutes}
                            </p>
                            <p className="text-sm text-gray-500">
                                Currently active
                            </p>
                        </div>
                        <div className="border border-gray-200 rounded-lg p-4">
                            <h4 className="font-medium text-gray-900">
                                Inactive Routes
                            </h4>
                            <p className="text-2xl font-bold text-red-600">
                                {inactiveRoutes}
                            </p>
                            <p className="text-sm text-gray-500">
                                Currently inactive
                            </p>
                        </div>
                        <div className="border border-gray-200 rounded-lg p-4">
                            <h4 className="font-medium text-gray-900">
                                Total Routes
                            </h4>
                            <p className="text-2xl font-bold text-blue-600">
                                {totalRoutes}
                            </p>
                            <p className="text-sm text-gray-500">
                                All configured routes
                            </p>
                        </div>
                    </div>
                </div>

                {/* Routes Table */}
                <div className="bg-white rounded-lg shadow">
                    <div className="px-6 py-4 border-b border-gray-200">
                        <div className="flex items-center justify-between">
                            <h2 className="text-xl font-semibold text-gray-900">
                                All Routes (
                                {pagination.totalItems || routes.length})
                            </h2>
                            <div className="flex space-x-2">
                                <input
                                    ref={searchInputRef}
                                    type="text"
                                    placeholder="Search routes..."
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
                    {error && routes.length > 0 && (
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
                                        Status
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {routes.length > 0 ? (
                                    routes.map((route) => (
                                        <tr
                                            key={route._id || route.id}
                                            className="hover:bg-gray-50"
                                        >
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                {route.name || route.routeName}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span
                                                    className={`px-2 py-1 text-xs font-semibold rounded-full ${
                                                        route.assetClass ===
                                                        'Equity'
                                                            ? 'text-blue-800 bg-blue-100'
                                                            : route.assetClass ===
                                                              'Debt'
                                                            ? 'text-green-800 bg-green-100'
                                                            : 'text-yellow-800 bg-yellow-100'
                                                    }`}
                                                >
                                                    {route.assetClass}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span
                                                    className={`px-2 py-1 text-xs font-semibold rounded-full ${
                                                        route.isActive !== false
                                                            ? 'text-green-800 bg-green-100'
                                                            : 'text-red-800 bg-red-100'
                                                    }`}
                                                >
                                                    {route.isActive !== false
                                                        ? 'Active'
                                                        : 'Inactive'}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                <div className="flex space-x-2">
                                                    <button
                                                        onClick={() =>
                                                            handleEditClick(
                                                                route
                                                            )
                                                        }
                                                        className="text-blue-600 hover:text-blue-900 cursor-pointer"
                                                    >
                                                        Edit
                                                    </button>
                                                    <button
                                                        onClick={() =>
                                                            handleDeleteClick(
                                                                route
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
                                            colSpan="4"
                                            className="px-6 py-4 text-center text-sm text-gray-500"
                                        >
                                            {loading
                                                ? 'Loading...'
                                                : 'No routes found'}
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

                {/* Create Route Modal */}
                <CreateRouteModal
                    isOpen={isCreateModalOpen}
                    onClose={() => setIsCreateModalOpen(false)}
                    onCreated={handleRouteCreated}
                />

                {/* Edit Route Modal */}
                {editingRoute && (
                    <EditRouteModal
                        isOpen={isEditModalOpen}
                        onClose={() => {
                            setIsEditModalOpen(false)
                            setEditingRoute(null)
                        }}
                        onUpdated={handleRouteUpdated}
                        route={editingRoute}
                    />
                )}

                {/* Delete Confirmation Modal */}
                {deleteConfirm.show && (
                    <div className="fixed inset-0 bg-gray-900/50 backdrop-blur-sm flex items-center justify-center z-50">
                        <div className="bg-white rounded-lg shadow-xl p-6 max-w-md mx-4">
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                Delete Route
                            </h3>
                            <p className="text-gray-600 mb-4">
                                Are you sure you want to delete &quot;
                                {deleteConfirm.route?.name ||
                                    deleteConfirm.route?.routeName}
                                &quot;? This action cannot be undone.
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
