"use client"
import { useEffect, useState } from "react"
import { X } from "lucide-react"

export default function CreateRecommendationModal({ isOpen, onClose, onCreated }) {
  const [form, setForm] = useState({
    assetType: "Stock",
    sector: "",
    name: "",
    mutualFundId: "", 
    category: "",
    rmp: "",
    cmp: "",
    riskProfile: "Low",
    action: "Buy",
    remark: "",
    validTill: "", 
  })
  
  const [assets, setAssets] = useState([])
  const [filteredAssets, setFilteredAssets] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [page, setPage] = useState(1)
const [hasNext, setHasNext] = useState(false)
const [hasPrev, setHasPrev] = useState(false)
const [initialAssets, setInitialAssets] = useState([])
const [showDropdown, setShowDropdown] = useState(false)

useEffect(() => {
  if (!isOpen) return;

  const fetchInitialAssets = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/mutualfund/list-mf?page=1&limit=50");
      const result = await res.json();
      setInitialAssets(result.data);
    } catch (err) {
      console.error("Error fetching initial assets:", err);
    }
  };
  fetchInitialAssets();
},[isOpen])
  useEffect(() => {
    if (!isOpen) return
    if (!isOpen || !searchTerm) return    
    const controller = new AbortController()
  
    const fetchAssets = async () => {
      try {
        const res = await fetch(
          `http://localhost:5000/api/mutualfund/list-mf?page=${page}&limit=50&search=${searchTerm}`,
          { signal: controller.signal }
        )
        const result = await res.json()
    
        // console.log("Raw API Data:", result.data)
        

        // setAssets(result.data)
setFilteredAssets(result.data)
// console.log("searchTerm", searchTerm);
// console.log("filteredAssets", filteredAssets);
    
        setAssets(result.data)
        // setFilteredAssets(filtered)
        setHasNext(result.pagination?.hasNext)
        setHasPrev(result.pagination?.hasPrev)
      } catch (err) {
        if (err.name !== 'AbortError') {
          console.error("Error fetching assets:", err)
        }
      }
    }
    
    const delayDebounce = setTimeout(fetchAssets, 300)
    return () => {
      clearTimeout(delayDebounce)
      controller.abort()
    }
  }, [searchTerm, form.assetType, page, isOpen])
  


  // useEffect(() => {
  //   const filtered = assets.filter(
  //     (item) => item.name.toLowerCase().includes(searchTerm.toLowerCase()),
  //   )
  //   setFilteredAssets(filtered)
  // }, [assets, form.assetType, searchTerm])

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
    setError("")
  }

 
  const handleAssetSelect = (asset) => {
    setForm((prev) => ({
      ...prev,
      name: asset.name,
      sector: asset.sector || "",
      mutualFundId: asset._id, 
      assetType: asset.assetType,
      category: asset.category || "",
      cmp: asset.nav || "",
    }))
    setSearchTerm("")
  }
  

  const handleSubmit = async () => {
    const { mutualFundId, sector, rmp, cmp, riskProfile, action, remark, validTill } = form
  
    if (!mutualFundId || !sector || !rmp || !cmp || !riskProfile || !action || !remark || !validTill) {
      setError("All fields are required.")
      return
    }
  
    setLoading(true)
    try {
      const res = await fetch("http://localhost:3030/api/v1/recommendations/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mutualFundId,
          sector,
          rmp: parseFloat(rmp),
          cmp: parseFloat(cmp),
          riskProfile,
          action,
          remark,
          validTill,
        }),
      })
  
      if (!res.ok) throw new Error("Failed to create recommendation")
      const data = await res.json()
      onCreated(data)
      onClose()
      setForm({
        assetType: "Stock",
        sector: "",
        name: "",
        mutualFundId: "",
        category: "",
        rmp: "",
        cmp: "",
        riskProfile: "Low",
        action: "Buy",
        remark: "",
        validTill: "",
      })
    } catch (err) {
      console.error("Error:", err)
      setError("Something went wrong.")
    } finally {
      setLoading(false)
    }
  }
  

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl relative max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white rounded-t-2xl border-b border-gray-100 px-8 py-6 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Create Recommendation</h2>
            <p className="text-sm text-gray-500 mt-1">Add a new investment recommendation</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200">
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="px-8 py-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Asset Type */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">Asset Type</label>
              <select
                name="assetType"
                value={form.assetType}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 hover:bg-white"
              >
                <option>Stock</option>
                <option>Mutual Fund</option>
              </select>
            </div>

            {/* Sector */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">Sector</label>
              <input
                type="text"
                name="sector"
                value={form.sector}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 hover:bg-white"
                placeholder="Enter sector"
              />
            </div>

            {/* Asset Name Search */}
            <div className="md:col-span-2 space-y-2 relative">
              <label className="block text-sm font-semibold text-gray-700">Asset Name</label>
              <input
                type="text"
                name="search"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value)
                  setPage(1)
                  setShowDropdown(false)
                }}
                onClick={() => {
                  if (!searchTerm) {
                    setShowDropdown(true)
                  }
                }}
                autoComplete="off"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 hover:bg-white"
                placeholder="Search for an asset..."
              />
              {(searchTerm || showDropdown) && (
                <div className="absolute top-full left-0 right-0 z-10 mt-1">
                  <ul className="max-h-60 overflow-y-auto bg-white border border-gray-200 rounded-t-xl shadow-lg">
                    {(searchTerm ? filteredAssets : showDropdown ? initialAssets : []).map((a) => (
                      <li
                        key={a._id}
                        className="px-4 py-3 hover:bg-blue-50 cursor-pointer transition-colors duration-150 border-b border-gray-100"
                        onClick={() => {
                          handleAssetSelect(a)
                          setShowDropdown(false)
                        }}
                      >
                        <div className="font-medium text-gray-900">{a.name}</div>
                        {a.sector && <div className="text-sm text-gray-500">{a.sector}</div>}
                      </li>
                    ))}
                  </ul>
                  {searchTerm && (hasNext || hasPrev) && (
                    <div className="flex items-center justify-between px-4 py-2 bg-white border border-t-0 border-gray-200 rounded-b-xl shadow">
                      <button
                        disabled={!hasPrev}
                        onClick={() => setPage((p) => Math.max(1, p - 1))}
                        className="text-blue-600 hover:underline disabled:text-gray-400 disabled:cursor-not-allowed"
                      >
                        Prev
                      </button>
                      <button
                        disabled={!hasNext}
                        onClick={() => setPage((p) => p + 1)}
                        className="text-blue-600 hover:underline disabled:text-gray-400 disabled:cursor-not-allowed"
                      >
                        Next
                      </button>
                    </div>
                  )}
                </div>
              )}
              {form.name && (
                <div className="mt-2 px-3 py-2 bg-blue-50 border border-blue-200 rounded-lg">
                  <span className="text-sm font-medium text-blue-800">Selected: {form.name}</span>
                </div>
              )}
            </div>

            {/* Category */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">Category</label>
              <input
                type="text"
                name="category"
                value={form.category}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 hover:bg-white"
                placeholder="Enter category"
              />
            </div>
            <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700">Valid Till</label>
            <input
              type="date"
              name="validTill"
              value={form.validTill}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 hover:bg-white"
              />
            </div>
            {/* RMP */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">RMP (Recommended Price)</label>
              <input
                type="number"
                name="rmp"
                value={form.rmp}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 hover:bg-white"
                placeholder="0.00"
                step="0.01"
              />
            </div>

            {/* CMP */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">CMP (Current Market Price)</label>
              <input
                type="number"
                name="cmp"
                value={form.cmp}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 hover:bg-white"
                placeholder="0.00"
                step="0.01"
              />
            </div>

            {/* Risk Level */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">Risk Level</label>
              <select
                name="riskProfile"
                value={form.riskProfile}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 hover:bg-white"
              >
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
              </select>
            </div>

            {/* Action */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">Action</label>
              <select
                name="action"
                value={form.action}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 hover:bg-white"
              >
                <option>Buy</option>
                <option>Sell</option>
                <option>Hold</option>
              </select>
            </div>

            {/* remark */}
            <div className="md:col-span-2 space-y-2">
              <label className="block text-sm font-semibold text-gray-700">remark</label>
              <textarea
                name="remark"
                value={form.remark}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 hover:bg-white resize-none"
                rows={4}
                placeholder="Add any additional notes or remark..."
              />
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-xl">
              <p className="text-red-700 text-sm font-medium">{error}</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-white rounded-b-2xl border-t border-gray-100 px-8 py-6 flex items-center justify-end gap-3">
          <button
            onClick={onClose}
            className="px-6 py-3 text-gray-700 font-medium rounded-xl hover:bg-gray-100 transition-colors duration-200"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold rounded-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            {loading ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                Creating...
              </div>
            ) : (
              "Create Recommendation"
            )}
          </button>
        </div>
      </div>
    </div>
  )
}
