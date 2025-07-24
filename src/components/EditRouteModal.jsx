'use client'

import axiosInstance from '@/helpers/axios'
import { useState, useEffect } from 'react'

export default function EditRouteModal({ isOpen, onClose, onUpdated, route }) {
    const [form, setForm] = useState({
        assetClassId: '',
        assetClass: '',
        name: '',
    })
    const [assetClasses, setAssetClasses] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    // Initialize form when route changes
    useEffect(() => {
        if (!route || !isOpen) return

        setForm({
            assetClass: route.assetClass || '',
            assetClassId: '', // Will be set when asset classes are loaded
            name: route.name || route.routeName || '',
        })
    }, [route, isOpen])

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

                // Set the current asset class ID based on the route's asset class name
                const currentAssetClass = classes.find(
                    (ac) => (ac.name || ac.className) === route?.assetClass
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
    }, [isOpen, route])

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
        }))
        setError('')
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!form.assetClass || !form.name) {
            setError('Asset Class and Name are required')
            return
        }

        setLoading(true)
        try {
            const payload = {
                name: form.name,
                assetClass: form.assetClass,
                assetClassID: form.assetClassId || undefined,
            }

            console.log('Update payload being sent:', payload)

            const res = await axiosInstance.put(
                `/v1/category/update-route/${route._id || route.id}`,
                payload
            )

            const data = res.data

            if (res.status === 200) {
                onUpdated?.()
            } else {
                setError(data.message || 'Failed to update route')
            }
        } catch (err) {
            console.error('Error updating route:', err)
            setError('An error occurred while updating the route')
        } finally {
            setLoading(false)
        }
    }

    if (!isOpen || !route) return null

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
                    Edit Route
                </h2>
                <p className="text-center text-gray-600 mb-6">
                    Update the route details
                </p>

                {error && (
                    <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* 2x1 Grid Layout */}
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

                        {/* Route Name */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Route Name *
                            </label>
                            <input
                                type="text"
                                name="name"
                                value={form.name}
                                onChange={handleChange}
                                placeholder="Enter route name"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition"
                                required
                            />
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
                            disabled={loading || !form.assetClass || !form.name}
                            className={`px-6 py-3 rounded-lg font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 transition ${
                                loading || !form.assetClass || !form.name
                                    ? 'bg-emerald-400 cursor-not-allowed'
                                    : 'bg-emerald-600 hover:bg-emerald-700 focus:ring-emerald-500'
                            }`}
                        >
                            {loading ? 'Updating...' : 'Update Route'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
