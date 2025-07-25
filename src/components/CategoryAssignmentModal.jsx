'use client'

import axiosInstance from '@/helpers/axios'
import { useState, useEffect } from 'react'

export default function CategoryAssignmentModal({
    isOpen,
    onClose,
    onAssigned,
    prefilledCategory = null,
    type = 'mutual-funds', // 'mutual-funds' or 'stocks'
}) {
    const [form, setForm] = useState({
        categoryName: '',
        instrumentCategoryId: '',
    })
    const [instrumentCategories, setInstrumentCategories] = useState([])
    const [categories, setCategories] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [loadingStates, setLoadingStates] = useState({
        instrumentCategories: false,
        categories: false,
    })

    // Initialize form when modal opens
    useEffect(() => {
        if (!isOpen) return

        if (prefilledCategory) {
            setForm((prev) => ({
                ...prev,
                categoryName: prefilledCategory.name || '',
            }))
        } else {
            setForm({
                categoryName: '',
                instrumentCategoryId: '',
            })
        }

        // Fetch data when modal opens
        fetchAllInstrumentCategories()
        if (!prefilledCategory) {
            fetchCategories()
        }
    }, [isOpen, prefilledCategory])

    const fetchAllInstrumentCategories = async () => {
        try {
            setLoadingStates((prev) => ({
                ...prev,
                instrumentCategories: true,
            }))

            const response = await axiosInstance.get(
                '/v1/category/instrument-categories/all'
            )
            const data = response.data

            if (response.status === 200 || response.status === 201) {
                setInstrumentCategories(data || [])
            } else {
                setError('Failed to fetch instrument categories')
            }
        } catch (err) {
            console.error('Error fetching instrument categories:', err)
            setError('Error fetching instrument categories')
        } finally {
            setLoadingStates((prev) => ({
                ...prev,
                instrumentCategories: false,
            }))
        }
    }

    const fetchCategories = async () => {
        if (prefilledCategory) return // Don't fetch if category is prefilled

        try {
            setLoadingStates((prev) => ({ ...prev, categories: true }))
            const endpoint =
                type === 'mutual-funds'
                    ? '/v1/category/list-amfi-categories'
                    : '/v1/category/list-stock-categories' // This might not exist yet

            const response = await axiosInstance.get(endpoint)
            const data = response.data

            if (response.status === 200 || response.status === 201) {
                setCategories(data.categories || data.data || [])
            } else {
                if (type === 'stocks') {
                    // Use mock data for stocks
                    setCategories([])
                } else {
                    setError('Failed to fetch categories')
                }
            }
        } catch (err) {
            console.error('Error fetching categories:', err)
            if (type === 'stocks') {
                setCategories([])
            } else {
                setError('Error fetching categories')
            }
        } finally {
            setLoadingStates((prev) => ({ ...prev, categories: false }))
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target
        setForm((prev) => ({ ...prev, [name]: value }))
        setError('')
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!form.categoryName || !form.instrumentCategoryId) {
            setError('Both fields are required')
            return
        }

        // Find the category ID based on the category name
        let selectedCategory = null
        if (prefilledCategory) {
            selectedCategory = prefilledCategory
        } else {
            selectedCategory = categories.find(
                (cat) => cat.name === form.categoryName
            )
        }

        if (!selectedCategory || !selectedCategory._id) {
            setError('Invalid category selected')
            return
        }

        setLoading(true)
        try {
            const payload = {
                instrumentCategoryId: form.instrumentCategoryId,
                amfiCategoryId: selectedCategory._id,
            }

            console.log('Assignment payload:', payload)

            // Use the link-instrument-category-to-amfi-category endpoint
            const response = await axiosInstance.put(
                `/v1/category/link-instrument-category-to-amfi-category`,
                payload
            )

            const data = response.data

            if (response.status === 200 || response.status === 201) {
                onAssigned?.()
                onClose()
                // Reset form
                setForm({
                    categoryName: '',
                    instrumentCategoryId: '',
                })
            } else {
                setError(
                    data.message || data.error || 'Failed to assign category'
                )
            }
        } catch (err) {
            console.error('Error assigning category:', err)
            setError('An error occurred while assigning the category')
        } finally {
            setLoading(false)
        }
    }

    if (!isOpen) return null

    return (
        <div className="fixed inset-0 bg-gray-900/50 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white w-full max-w-lg rounded-lg shadow-xl p-6 relative mx-4 border border-gray-200">
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 text-2xl font-bold cursor-pointer"
                >
                    ×
                </button>

                <h2 className="text-2xl font-bold mb-1 text-center">
                    {prefilledCategory
                        ? 'Assign Category'
                        : 'Assign Categories'}
                </h2>
                <p className="text-center text-gray-600 mb-6">
                    {prefilledCategory
                        ? `Link "${prefilledCategory.name}" to an instrument category`
                        : `Search and link ${
                              type === 'mutual-funds' ? 'mutual fund' : 'stock'
                          } categories to instrument categories`}
                </p>

                {error && (
                    <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Category Name */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            AMFI Category Name *
                        </label>
                        {prefilledCategory ? (
                            <input
                                type="text"
                                value={form.categoryName}
                                disabled
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-700 cursor-not-allowed"
                            />
                        ) : (
                            <>
                                <input
                                    type="text"
                                    name="categoryName"
                                    value={form.categoryName}
                                    onChange={handleChange}
                                    placeholder="Search AMFI category name..."
                                    list="categories"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-600 focus:border-emerald-600 transition"
                                    required
                                />
                                <datalist id="categories">
                                    {categories.map((category) => (
                                        <option
                                            key={category._id || category.id}
                                            value={category.name}
                                        >
                                            {category.name}
                                        </option>
                                    ))}
                                </datalist>
                            </>
                        )}
                    </div>

                    {/* Instrument Category */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Instrument Category *
                        </label>
                        <select
                            name="instrumentCategoryId"
                            value={form.instrumentCategoryId}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-600 focus:border-emerald-600 transition"
                            required
                            disabled={loadingStates.instrumentCategories}
                        >
                            <option value="">
                                {loadingStates.instrumentCategories
                                    ? 'Loading...'
                                    : 'Select Instrument Category'}
                            </option>
                            {instrumentCategories.map((category) => (
                                <option
                                    key={category._id || category.id}
                                    value={category._id || category.id}
                                >
                                    {category.name} ({category.route} -{' '}
                                    {category.assetClass})
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Submit Button */}
                    <div className="flex justify-end pt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="mr-3 px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 font-medium transition"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={
                                loading ||
                                !form.categoryName ||
                                !form.instrumentCategoryId
                            }
                            className={`px-6 py-3 rounded-lg font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 transition ${
                                loading ||
                                !form.categoryName ||
                                !form.instrumentCategoryId
                                    ? 'bg-emerald-400 cursor-not-allowed'
                                    : 'bg-emerald-600 hover:bg-emerald-700 focus:ring-emerald-500'
                            }`}
                        >
                            {loading ? 'Linking...' : 'Link Category'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
