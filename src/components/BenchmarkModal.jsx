"use client"

import { useEffect, useState } from "react"


export default function BenchmarkModal({ isOpen, onClose, onCreated }) {
  const [category, setCategory] = useState("")
  const [stock, setStock] = useState("")
  const [stocks, setStocks] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    if (!isOpen) return
    const fetchStocks = async () => {
      try {
        const res = await fetch("http://localhost:3030/api/v1/getStocks/getStocks")
        const data = await res.json()
        setStocks(data.data || data)
        console.log(stocks)
      } catch (err) {
        console.error("Error fetching stocks:", err)
      }
    }
    fetchStocks()
  }, [isOpen])

  const handleSubmit = async () => {
    if (!category || !stock) {
      setError("Category and stock are required.")
      return
    }
    setLoading(true)
    try {
      const res = await fetch("http://localhost:3030/api/v1/benchmark/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ category, stock }),
      })
      const data = await res.json()
      if (data.success) {
        onCreated()
        onClose()
      } else {
        setError(data.message || "Failed to create benchmark.")
      }
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  if (!isOpen) return null

  const categoryOptions = [...new Set(stocks.map((s) => s.category))]
  const filteredStocks = stocks.filter((s) => s.category === category)

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-[2px]">
      <div className="bg-white rounded-xl w-full max-w-md mx-4 shadow-xl border border-gray-100">
        {/* Header */}
        <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-800">Create Benchmark</h2>
          <button
            onClick={onClose}
            disabled={loading}
            className="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100 transition-colors"
            aria-label="Close"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M18 6 6 18"></path>
              <path d="m6 6 12 12"></path>
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5">
          <div className="space-y-2">
            <label htmlFor="category" className="block text-sm font-medium text-gray-700">
              Category
            </label>
            <div className="relative">
              <select
                id="category"
                value={category}
                onChange={(e) => {
                  setCategory(e.target.value)
                  setStock("")
                }}
                className="w-full h-11 px-4 py-2 bg-white border border-gray-200 rounded-lg text-gray-800 appearance-none focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500 transition-colors"
              >
                <option value="">Select Category</option>
                {categoryOptions.map((c, idx) => (
                  <option key={idx} value={c}>
                    {c}
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none text-gray-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m6 9 6 6 6-6"></path>
                </svg>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="stock" className="block text-sm font-medium text-gray-700">
              Stock
            </label>
            <div className="relative">
              <select
                id="stock"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
                disabled={!category}
                className={`w-full h-11 px-4 py-2 bg-white border border-gray-200 rounded-lg text-gray-800 appearance-none focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500 transition-colors ${!category ? "opacity-60 cursor-not-allowed" : ""}`}
              >
                <option value="">{category ? "Select Stock" : "Select category first"}</option>
                {filteredStocks.map((s, idx) => (
                  <option key={idx} value={s.name}>
                    {s.name}
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none text-gray-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m6 9 6 6 6-6"></path>
                </svg>
              </div>
            </div>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">{error}</div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-100 flex gap-3 justify-end">
          <button
            onClick={onClose}
            disabled={loading}
            className="px-5 py-2.5 rounded-lg border border-gray-200 text-gray-700 font-medium hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-200"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={loading || !category || !stock}
            className={`px-5 py-2.5 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 ${loading || !category || !stock ? "opacity-60 cursor-not-allowed" : ""}`}
          >
            {loading ? (
              <div className="flex items-center gap-2">
                <svg
                  className="animate-spin h-4 w-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                <span>Creating...</span>
              </div>
            ) : (
              "Create Benchmark"
            )}
          </button>
        </div>
      </div>
    </div>
  )
}
