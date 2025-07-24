"use client"

import { useEffect, useState } from "react"
import BenchmarkModal from "../../components/BenchmarkModal"
import { format } from "date-fns"
import axiosInstance from "../../helpers/axios"
export default function BenchmarkPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [benchmarks, setBenchmarks] = useState([])

  const fetchBenchmarks = async () => {
    try {
      const {data} = await axiosInstance.get("/v1/benchmark")
      setBenchmarks(data.data || [])
    } catch (err) {
      console.error("Error fetching benchmarks:", err)
    }
  }

  useEffect(() => {
    fetchBenchmarks()
  }, [])

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto p-6">
        {/* Header Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-3">
            <div className="p-1.5 bg-[#00d09c]/10 rounded-md">
  <svg
    className="text-[#00b98b]"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  
                >
                  <path d="M3 3v18h18"></path>
                  <path d="m19 9-5 5-4-4-3 3"></path>
                </svg>
              </div>
              <div>
                <h1 className="text-2xl font-semibold text-gray-900">Benchmarks</h1>
                <p className="text-sm text-gray-600 mt-1">Manage and track your performance benchmarks</p>
              </div>
            </div>
            <button
  onClick={() => setIsModalOpen(true)}
  className="inline-flex items-center gap-2 bg-gradient-to-r from-[#00d09c] to-[#00b98b] text-white px-4 py-2.5 rounded-lg font-medium hover:opacity-90 transition-colors focus:outline-none focus:ring-2 focus:ring-[#00d09c] focus:ring-offset-1 shadow-sm"
>

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
                <path d="M5 12h14"></path>
                <path d="M12 5v14"></path>
              </svg>
              Create Benchmark
            </button>
          </div>
        </div>

        {/* Content Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          {benchmarks.length === 0 ? (
            /* Empty State */
            <div className="text-center py-16 px-6">
              <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-gray-400"
                >
                  <path d="M3 3v18h18"></path>
                  <path d="m19 9-5 5-4-4-3 3"></path>
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No benchmarks yet</h3>
              <p className="text-gray-500 mb-6 max-w-sm mx-auto">
                Get started by creating your first benchmark to track performance metrics.
              </p>
              <button
                onClick={() => setIsModalOpen(true)}
                className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2.5 rounded-lg font-medium hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1"
              >
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
                  <path d="M5 12h14"></path>
                  <path d="M12 5v14"></path>
                </svg>
                Create Your First Benchmark
              </button>
            </div>
          ) : (
            /* Table */
            <div className="overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-100">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-medium text-gray-900">All Benchmarks</h2>
                  <span className="text-sm text-gray-500">
                    {benchmarks.length} {benchmarks.length === 1 ? "benchmark" : "benchmarks"}
                  </span>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Category
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Stock
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Created
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {benchmarks.map((b, idx) => (
                      <tr key={idx} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-3">
                            <div className="p-1.5 bg-blue-50 rounded-md">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="14"
                                height="14"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="text-blue-600"
                              >
                                <path d="M3 7V5c0-1.1.9-2 2-2h2"></path>
                                <path d="M17 3h2c1.1 0 2 .9 2 2v2"></path>
                                <path d="M21 17v2c0 1.1-.9 2-2 2h-2"></path>
                                <path d="M7 21H5c-1.1 0-2-.9-2-2v-2"></path>
                              </svg>
                            </div>
                            <span className="text-sm font-medium text-gray-900">{b.category}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-3">
                            <div className="p-1.5 bg-green-50 rounded-md">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="14"
                                height="14"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="text-green-600"
                              >
                                <path d="M3 3v18h18"></path>
                                <path d="m19 9-5 5-4-4-3 3"></path>
                              </svg>
                            </div>
                            <span className="text-sm text-gray-900">{b.stock}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="text-sm text-gray-600">
                            {format(new Date(b.createdAt), 'yyyy-MM-dd HH:mm')}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            Active
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>

      <BenchmarkModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onCreated={fetchBenchmarks} />
    </div>
  )
}
