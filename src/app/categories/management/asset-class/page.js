'use client'

import { useState, useEffect } from 'react'
import CreateAssetClassModal from '../../../../components/CreateAssetClassModal'
import EditAssetClassModal from '../../../../components/EditAssetClassModal'

export default function AssetClassPage() {
    const [assetClasses, setAssetClasses] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [pagination, setPagination] = useState({})
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
    const [isEditModalOpen, setIsEditModalOpen] = useState(false)
    const [editingAssetClass, setEditingAssetClass] = useState(null)
    const [deleteConfirm, setDeleteConfirm] = useState({
        show: false,
        assetClass: null,
    })

    // Filter and search states
    const [searchTerm, setSearchTerm] = useState('')
    const [currentPage, setCurrentPage] = useState(1)

    // Debounced search effect
    useEffect(() => {
        const delayedSearch = setTimeout(() => {
            setCurrentPage(1) // Reset to first page when searching
            fetchAssetClasses()
        }, 500) // 500ms debounce

        return () => clearTimeout(delayedSearch)
    }, [searchTerm])

    // Effect for pagination
    useEffect(() => {
        fetchAssetClasses()
    }, [currentPage])

    const fetchAssetClasses = async () => {
        try {
            setLoading(true)

            // Build query parameters
            const params = new URLSearchParams()
            if (searchTerm) params.append('search', searchTerm)
            params.append('page', currentPage.toString())

            const queryString = params.toString()
            const url = `http://localhost:3030/v1/category/list-asset-classes${
                queryString ? '?' + queryString : ''
            }`

            const response = await fetch(url)
            const data = await response.json()

            if (response.ok) {
                setAssetClasses(data.assetClasses || data.data || [])
                setPagination(data.pagination || {})
            } else {
                setError('Failed to fetch asset classes')
            }
        } catch (err) {
            setError('Error fetching asset classes: ' + err.message)
        } finally {
            setLoading(false)
        }
    }

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value)
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

    const handleAssetClassCreated = () => {
        fetchAssetClasses() // Refresh the list after creating a new asset class
    }

    const handleAssetClassUpdated = () => {
        fetchAssetClasses() // Refresh the list after updating an asset class
        setIsEditModalOpen(false)
        setEditingAssetClass(null)
    }

    const handleEditClick = (assetClass) => {
        setEditingAssetClass(assetClass)
        setIsEditModalOpen(true)
    }

    const handleDeleteClick = (assetClass) => {
        setDeleteConfirm({ show: true, assetClass })
    }

    const handleDeleteConfirm = async () => {
        if (!deleteConfirm.assetClass) return

        try {
            const response = await fetch(
                `http://localhost:3030/v1/category/delete-asset-class/${
                    deleteConfirm.assetClass._id || deleteConfirm.assetClass.id
                }`,
                {
                    method: 'DELETE',
                }
            )

            if (response.ok) {
                setDeleteConfirm({ show: false, assetClass: null })
                fetchAssetClasses() // Refresh the list
            } else {
                const data = await response.json()
                setError(data.message || 'Failed to delete asset class')
            }
        } catch (err) {
            console.error('Error deleting asset class:', err)
            setError('An error occurred while deleting the asset class')
        }
    }

    const handleDeleteCancel = () => {
        setDeleteConfirm({ show: false, assetClass: null })
    }

    if (loading) {
        return (
            <div className="p-6">
                <div className="flex justify-center items-center h-64">
                    <div className="text-lg text-gray-600">
                        Loading asset classes...
                    </div>
                </div>
            </div>
        )
    }

    if (error) {
        return (
            <div className="p-6">
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                    {error}
                </div>
            </div>
        )
    }

    // Calculate stats for the overview cards
    const equityCount = assetClasses.filter(
        (ac) => ac.name === 'Equity' || ac.assetClass === 'Equity'
    ).length
    const debtCount = assetClasses.filter(
        (ac) => ac.name === 'Debt' || ac.assetClass === 'Debt'
    ).length
    const commodityCount = assetClasses.filter(
        (ac) => ac.name === 'Commodity' || ac.assetClass === 'Commodity'
    ).length
    const totalAssetClasses = assetClasses.length

    return (
        <div className="p-6">
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <h1 className="text-3xl font-bold text-gray-900">
                        Asset Class Management
                    </h1>
                    <button
                        onClick={() => setIsCreateModalOpen(true)}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors cursor-pointer"
                    >
                        Create Asset Class
                    </button>
                </div>

                {/* Overview Cards */}
                <div className="bg-white rounded-lg shadow p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                        Asset Classes Overview
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div className="border border-gray-200 rounded-lg p-4">
                            <h4 className="font-medium text-gray-900">
                                Equity
                            </h4>
                            <p className="text-2xl font-bold text-blue-600">
                                {equityCount}
                            </p>
                            <p className="text-sm text-gray-500">
                                Equity instruments
                            </p>
                        </div>
                        <div className="border border-gray-200 rounded-lg p-4">
                            <h4 className="font-medium text-gray-900">Debt</h4>
                            <p className="text-2xl font-bold text-green-600">
                                {debtCount}
                            </p>
                            <p className="text-sm text-gray-500">
                                Debt instruments
                            </p>
                        </div>
                        <div className="border border-gray-200 rounded-lg p-4">
                            <h4 className="font-medium text-gray-900">
                                Commodity
                            </h4>
                            <p className="text-2xl font-bold text-yellow-600">
                                {commodityCount}
                            </p>
                            <p className="text-sm text-gray-500">
                                Commodity instruments
                            </p>
                        </div>
                        <div className="border border-gray-200 rounded-lg p-4">
                            <h4 className="font-medium text-gray-900">Total</h4>
                            <p className="text-2xl font-bold text-purple-600">
                                {totalAssetClasses}
                            </p>
                            <p className="text-sm text-gray-500">
                                All asset classes
                            </p>
                        </div>
                    </div>
                </div>

                {/* Asset Classes Table */}
                <div className="bg-white rounded-lg shadow">
                    <div className="px-6 py-4 border-b border-gray-200">
                        <div className="flex items-center justify-between">
                            <h2 className="text-xl font-semibold text-gray-900">
                                All Asset Classes (
                                {pagination.totalItems || assetClasses.length})
                            </h2>
                            <div className="flex space-x-2">
                                <input
                                    type="text"
                                    placeholder="Search asset classes..."
                                    value={searchTerm}
                                    onChange={handleSearchChange}
                                    className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
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
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {assetClasses.length > 0 ? (
                                    assetClasses.map((assetClass) => (
                                        <tr
                                            key={
                                                assetClass._id || assetClass.id
                                            }
                                            className="hover:bg-gray-50"
                                        >
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                {assetClass.name ||
                                                    assetClass.className}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span
                                                    className={`px-2 py-1 text-xs font-semibold rounded-full ${
                                                        (assetClass.name ||
                                                            assetClass.type) ===
                                                        'Equity'
                                                            ? 'text-blue-800 bg-blue-100'
                                                            : (assetClass.name ||
                                                                  assetClass.type) ===
                                                              'Debt'
                                                            ? 'text-green-800 bg-green-100'
                                                            : 'text-yellow-800 bg-yellow-100'
                                                    }`}
                                                >
                                                    {assetClass.type ||
                                                        assetClass.name ||
                                                        'Unknown'}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span
                                                    className={`px-2 py-1 text-xs font-semibold rounded-full ${
                                                        assetClass.isActive !==
                                                        false
                                                            ? 'text-green-800 bg-green-100'
                                                            : 'text-red-800 bg-red-100'
                                                    }`}
                                                >
                                                    {assetClass.isActive !==
                                                    false
                                                        ? 'Active'
                                                        : 'Inactive'}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                <div className="flex space-x-2">
                                                    <button
                                                        onClick={() =>
                                                            handleEditClick(
                                                                assetClass
                                                            )
                                                        }
                                                        className="text-blue-600 hover:text-blue-900 cursor-pointer"
                                                    >
                                                        Edit
                                                    </button>
                                                    <button
                                                        onClick={() =>
                                                            handleDeleteClick(
                                                                assetClass
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
                                            No asset classes found
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

                {/* Create Asset Class Modal */}
                <CreateAssetClassModal
                    isOpen={isCreateModalOpen}
                    onClose={() => setIsCreateModalOpen(false)}
                    onCreated={handleAssetClassCreated}
                />

                {/* Edit Asset Class Modal */}
                {editingAssetClass && (
                    <EditAssetClassModal
                        isOpen={isEditModalOpen}
                        onClose={() => {
                            setIsEditModalOpen(false)
                            setEditingAssetClass(null)
                        }}
                        onUpdated={handleAssetClassUpdated}
                        assetClass={editingAssetClass}
                    />
                )}

                {/* Delete Confirmation Modal */}
                {deleteConfirm.show && (
                    <div className="fixed inset-0 bg-gray-900/50 backdrop-blur-sm flex items-center justify-center z-50">
                        <div className="bg-white rounded-lg shadow-xl p-6 max-w-md mx-4">
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                Delete Asset Class
                            </h3>
                            <p className="text-gray-600 mb-4">
                                Are you sure you want to delete "
                                {deleteConfirm.assetClass?.name ||
                                    deleteConfirm.assetClass?.className}
                                "? This action cannot be undone.
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
