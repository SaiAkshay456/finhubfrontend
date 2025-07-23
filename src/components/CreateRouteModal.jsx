'use client'

import { useState, useEffect } from 'react'

export default function CreateRouteModal({ isOpen, onClose, onCreated }) {
    const [form, setForm] = useState({
        assetClassId: '',
        assetClass: '',
        name: '',
    })
    const [assetClasses, setAssetClasses] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    // Fetch asset classes when modal opens
    useEffect(() => {
        if (!isOpen) return

        const fetchAssetClasses = async () => {
            try {
                const res = await fetch(
                    'http://localhost:3030/v1/category/list-asset-classes'
                )
                const data = await res.json()
                setAssetClasses(data.assetClasses || data.data || [])
            } catch (err) {
                console.error('Error fetching asset classes:', err)
                setError('Failed to fetch asset classes')
            }
        }

        fetchAssetClasses()
    }, [isOpen])

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

            console.log('Payload being sent:', payload)

            const res = await fetch(
                'http://localhost:3030/v1/category/add-route',
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload),
                }
            )

            const data = await res.json()

            if (res.ok) {
                onCreated?.()
                onClose()
                // Reset form
                setForm({
                    assetClassId: '',
                    assetClass: '',
                    name: '',
                })
            } else {
                setError(data.message || 'Failed to create route')
            }
        } catch (err) {
            console.error('Error creating route:', err)
            setError('An error occurred while creating the route')
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
                    Create Route
                </h2>
                <p className="text-center text-gray-600 mb-6">
                    Create a new route with asset class selection
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
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
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
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
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
                                    ? 'bg-blue-400 cursor-not-allowed'
                                    : 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-500'
                            }`}
                        >
                            {loading ? 'Creating...' : 'Create Route'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
