'use client'

import axiosInstance from '@/helpers/axios'
import axios from 'axios'
import { useState, useEffect } from 'react'

export default function EditAssetClassModal({
    isOpen,
    onClose,
    onUpdated,
    assetClass,
}) {
    const [form, setForm] = useState({
        name: '',
    })
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    // Initialize form when assetClass changes
    useEffect(() => {
        if (!assetClass || !isOpen) return

        setForm({
            name: assetClass.name || assetClass.className || '',
        })
    }, [assetClass, isOpen])

    const handleChange = (e) => {
        const { name, value } = e.target
        setForm((prev) => ({ ...prev, [name]: value }))
        setError('')
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!form.name) {
            setError('Asset Class name is required')
            return
        }

        setLoading(true)
        try {
            const payload = {
                name: form.name,
            }

            console.log('Update payload being sent:', payload)

            const res = await axiosInstance.put(
                `/v1/category/update-asset-class/${
                    assetClass._id || assetClass.id
                }`,
                payload
            )

            const data = res.data

            if (res.status === 200) {
                onUpdated?.()
            } else {
                setError(data.message || 'Failed to update asset class')
            }
        } catch (err) {
            console.error('Error updating asset class:', err)
            setError('An error occurred while updating the asset class')
        } finally {
            setLoading(false)
        }
    }

    if (!isOpen || !assetClass) return null

    return (
        <div className="fixed inset-0 bg-gray-900/50 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white w-full max-w-md rounded-lg shadow-xl p-6 relative mx-4 border border-gray-200">
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 text-2xl font-bold cursor-pointer"
                >
                    ×
                </button>

                <h2 className="text-2xl font-bold mb-1 text-center">
                    Edit Asset Class
                </h2>
                <p className="text-center text-gray-600 mb-6">
                    Update the asset class details
                </p>

                {error && (
                    <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Asset Class Name */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Asset Class Name *
                        </label>
                        <input
                            type="text"
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            placeholder="Enter asset class name"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition"
                            required
                        />
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
                            disabled={loading || !form.name}
                            className={`px-6 py-3 rounded-lg font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 transition ${
                                loading || !form.name
                                    ? 'bg-emerald-400 cursor-not-allowed'
                                    : 'bg-emerald-600 hover:bg-emerald-700 focus:ring-emerald-500'
                            }`}
                        >
                            {loading ? 'Updating...' : 'Update Asset Class'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
