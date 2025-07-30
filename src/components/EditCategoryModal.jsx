'use client'

import axiosInstance from '@/helpers/axios'
import { useState, useEffect } from 'react'

export default function EditCategoryModal({
    isOpen,
    onClose,
    onUpdated,
    category,
    categoryType, // <-- receive from parent
}) {
    const [form, setForm] = useState({
        assetClass: '',
        assetClassId: '',
        route: '',
        routeID: '',
        name: '',
        rangeMin: '',
        rangeMax: '',
    })
    const [assetClasses, setAssetClasses] = useState([])
    const [routes, setRoutes] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [fetchingRoutes, setFetchingRoutes] = useState(false)
    const [initialRoute, setInitialRoute] = useState('')

    // Initialize form when category changes
    useEffect(() => {
        if (!category || !isOpen) return

        setForm({
            assetClass: category.assetClass || '',
            assetClassId: '', // Will be set when asset classes are loaded
            route: category.route || '',
            routeID: category.routeID || '',
            name: category.name || '',
            rangeMin: category.range?.min?.toString() || '',
            rangeMax: category.range?.max?.toString() || '',
        })
        setInitialRoute(category.route || '')
    }, [category, isOpen])

    // Fetch asset classes when modal opens
    useEffect(() => {
        if (!isOpen) return

        const fetchAssetClasses = async () => {
            try {
                const res = await axiosInstance.get(
                    '/v1/category/list-asset-classes'
                )
                const data = res.data
                const classes = data.assetClasses || data.data || []
                setAssetClasses(classes)

                // Set the current asset class ID based on the category's asset class name
                const currentAssetClass = classes.find(
                    (ac) => (ac.name || ac.className) === category?.assetClass
                )
                if (currentAssetClass) {
                    setForm((prev) => ({
                        ...prev,
                        assetClassId:
                            currentAssetClass._id || currentAssetClass.id,
                    }))
                }
            } catch (err) {
                console.error('Error fetching asset classes:', err)
                setError('Failed to fetch asset classes')
            }
        }

        fetchAssetClasses()
    }, [isOpen, category])

    // Fetch routes when asset class ID is set
    useEffect(() => {
        if (!form.assetClassId) {
            setRoutes([])
            return
        }

        const fetchRoutes = async () => {
            try {
                setFetchingRoutes(true)
                const res = await axiosInstance.get(
                    `/v1/category/routes/asset-class/${form.assetClassId}`
                )
                const data = res.data
                setRoutes(data.routes || data.data || [])
            } catch (err) {
                console.error('Error fetching routes:', err)
                setError('Failed to fetch routes')
            } finally {
                setFetchingRoutes(false)
            }
        }

        fetchRoutes()
    }, [form.assetClassId])

    const handleChange = (e) => {
        const { name, value } = e.target
        setForm((prev) => ({ ...prev, [name]: value }))
        setError('')
    }

    const handleAssetClassChange = (e) => {
        const selectedId = e.target.value
        const selectedAssetClass = assetClasses.find(
            (ac) => (ac._id || ac.id) === selectedId
        )
        const assetClassName = selectedAssetClass
            ? selectedAssetClass.name || selectedAssetClass.className
            : ''

        setForm((prev) => ({
            ...prev,
            assetClassId: selectedId,
            assetClass: assetClassName,
            route: '',
            routeID: '',
        }))
        setError('')
    }

    const handleRouteChange = (e) => {
        const selectedId = e.target.value
        const selectedRoute = routes.find(
            (route) => (route._id || route.id) === selectedId
        )
        const routeName = selectedRoute
            ? selectedRoute.name || selectedRoute.routeName
            : ''

        setForm((prev) => ({
            ...prev,
            routeID: selectedId,
            route: routeName,
        }))
        setError('')
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!form.assetClass || !form.routeID || !form.name) {
            setError('Asset Class, Route, and Name are required')
            return
        }

        // Validate range if provided
        if (
            (form.rangeMin && !form.rangeMax) ||
            (!form.rangeMin && form.rangeMax)
        ) {
            setError('Both minimum and maximum values are required for range')
            return
        }

        if (
            form.rangeMin &&
            form.rangeMax &&
            parseFloat(form.rangeMin) >= parseFloat(form.rangeMax)
        ) {
            setError('Minimum value must be less than maximum value')
            return
        }

        setLoading(true)
        try {
            const payload = {
                name: form.name,
                assetClass: form.assetClass,
                routeID: form.routeID,
                route: form.route,
            }

            // Add range if provided, otherwise explicitly set to null
            if (form.rangeMin && form.rangeMax) {
                payload.range = {
                    min: parseFloat(form.rangeMin),
                    max: parseFloat(form.rangeMax),
                }
            } else {
                payload.range = null
            }

            // Determine if we need to switch APIs based on route change
            let endpoint = `/v1/category/update-instrument-category/${category._id}`
            if (
                (initialRoute !== 'Core Direct' &&
                    form.route === 'Core Direct') ||
                (initialRoute === 'Core Direct' && form.route !== 'Core Direct')
            ) {
                // If switching to Core Direct, use stock instrument category API
                if (form.route === 'Core Direct') {
                    endpoint = `/v1/category/update-stock-instrument-category/${category._id}`
                } else {
                    endpoint = `/v1/category/update-instrument-category/${category._id}`
                }
            } else if (form.route === 'Core Direct') {
                endpoint = `/v1/category/update-stock-instrument-category/${category._id}`
            }

            const res = await axiosInstance.put(endpoint, payload)
            const data = res.data

            if (res.status === 200) {
                onUpdated?.()
            } else {
                setError(data.message || 'Failed to update category')
            }
        } catch (err) {
            console.error('Error updating category:', err)
            setError('An error occurred while updating the category')
        } finally {
            setLoading(false)
        }
    }

    if (!isOpen || !category) return null

    return (
        <div className="fixed inset-0 bg-gray-900/50 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white w-full max-w-2xl rounded-lg shadow-xl p-6 relative mx-4 border border-gray-200">
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 text-2xl font-bold cursor-pointer"
                >
                    ×
                </button>

                <h2 className="text-2xl font-bold mb-1 text-center">
                    Edit Category
                </h2>
                <p className="text-center text-gray-600 mb-6">
                    Update the instrument category details
                </p>

                {error && (
                    <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* 2x2 Grid Layout */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Asset Class */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Asset Class *
                            </label>
                            <select
                                name="assetClassId"
                                value={form.assetClassId}
                                onChange={handleAssetClassChange}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition"
                                required
                            >
                                <option value="">Select Asset Class</option>
                                {assetClasses.map((ac) => (
                                    <option
                                        key={ac._id || ac.id}
                                        value={ac._id || ac.id}
                                    >
                                        {ac.name || ac.className}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Route */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Route *
                            </label>
                            <select
                                name="routeID"
                                value={form.routeID}
                                onChange={handleRouteChange}
                                disabled={!form.assetClassId || fetchingRoutes}
                                className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition ${
                                    !form.assetClassId || fetchingRoutes
                                        ? 'bg-gray-100 cursor-not-allowed opacity-60'
                                        : ''
                                }`}
                                required
                            >
                                <option value="">
                                    {!form.assetClassId
                                        ? 'Select Asset Class first'
                                        : fetchingRoutes
                                        ? 'Loading routes...'
                                        : 'Select Route'}
                                </option>
                                {routes.map((route) => (
                                    <option
                                        key={route._id || route.id}
                                        value={route._id || route.id}
                                    >
                                        {route.name || route.routeName}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Category Name */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Category Name *
                            </label>
                            <input
                                type="text"
                                name="name"
                                value={form.name}
                                onChange={handleChange}
                                placeholder="Enter category name"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition"
                                required
                            />
                        </div>

                        {/* Range (Optional) */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Range (Optional)
                            </label>
                            <div className="grid grid-cols-2 gap-2">
                                <input
                                    type="number"
                                    name="rangeMin"
                                    value={form.rangeMin}
                                    onChange={handleChange}
                                    placeholder="Min"
                                    step="0.01"
                                    className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition"
                                />
                                <input
                                    type="number"
                                    name="rangeMax"
                                    value={form.rangeMax}
                                    onChange={handleChange}
                                    placeholder="Max"
                                    step="0.01"
                                    className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition"
                                />
                            </div>
                        </div>
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
                                !form.assetClass ||
                                !form.routeID ||
                                !form.name
                            }
                            className={`px-6 py-3 rounded-lg font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 transition ${
                                loading ||
                                !form.assetClass ||
                                !form.routeID ||
                                !form.name
                                    ? 'bg-emerald-400 cursor-not-allowed'
                                    : 'bg-emerald-600 hover:bg-emerald-700 focus:ring-emerald-500'
                            }`}
                        >
                            {loading ? 'Updating...' : 'Update Category'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
