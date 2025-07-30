"use client"

import { useEffect, useState } from "react"
import { X } from "lucide-react"
import Select from "react-select"
import axiosInstance from "../helpers/axios"
import axios from "axios"
export default function CreateRecommendationModal({ isOpen, onClose, onCreated }) {
  const [form, setForm] = useState({
    assetType: "Stock",
    sector: "",
    name: "",
    mutualFundId: "",
    category: "",
    rmp: "",
    cmp: "",
    instrumentToken: "",
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
  const [fieldErrors, setFieldErrors] = useState({})
  const [selectedAssetOption, setSelectedAssetOption] = useState(null)
  const [isCategoryPrefilled, setIsCategoryPrefilled] = useState(false)
  const [categoryOptions, setCategoryOptions] = useState([]);
  // const [pollingIntervalId, setPollingIntervalId] = useState(null)




  useEffect(() => {
    if (!isOpen) return;
  
    const fetchInitialAssets = async () => {
      try {
        const endpoint =
          form.assetType === "Mutual Fund"
            ? "/v1/mutual-funds/list-mf?page=1&limit=50"
            : "/v1/stocks/list-stocks?page=1&limit=50";
  
        const { data } = await axiosInstance.get(endpoint);
        setInitialAssets(data.data);
      } catch (err) {
        console.error("Error fetching initial assets:", err);
      }
    };
  
    fetchInitialAssets();
  }, [isOpen, form.assetType]);
  

  useEffect(() => {
    if (!isOpen || !searchTerm) return;
  
    const controller = new AbortController();
  
    const fetchAssets = async () => {
      try {
        const endpoint =
          form.assetType === "Mutual Fund"
            ? `/v1/mutual-funds/list-mf?page=${page}&limit=50&search=${searchTerm}`
            : `/v1/stocks/list-stocks?page=${page}&limit=50&search=${searchTerm}`;
  
        const { data } = await axiosInstance.get(endpoint, { signal: controller.signal });
  
        setFilteredAssets(data.data);
        setAssets(data.data);
        setHasNext(data.data.pagination?.hasNext);
        setHasPrev(data.data.pagination?.hasPrev);
      } catch (err) {
        if (err.name !== "AbortError") {
          console.error("Error fetching assets:", err);
        }
      }
    };
  
    const delayDebounce = setTimeout(fetchAssets, 300);
    return () => {
      clearTimeout(delayDebounce);
      controller.abort();
    };
  }, [searchTerm, form.assetType, page, isOpen]);
  

  const handleChange = (e) => {
    const { name, value } = e.target;
  
    if (name === "assetType") {
      // Reset dependent fields when asset type changes
      setForm((prev) => ({
        ...prev,
        assetType: value,
        mutualFundId: "",
        name: "",
        sector: "",
        category: "",
        cmp: "",
      }));
      setSelectedAssetOption(null);
      setIsCategoryPrefilled(false);
      setSearchTerm("");
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  
    setError("");
    if (fieldErrors[name]) {
      setFieldErrors((prev) => ({ ...prev, [name]: false }));
    }
  };
  

  const handleAssetSelect = async (asset) => {
    const selectedOption = {
      value: asset._id,
      label: asset.name,
      data: asset,
    };
  
    setSelectedAssetOption(selectedOption);

    // Default form setup
    let categoryName = "";
    let assetType = "";
  
    // Fetch category name if categories field is present
    if (asset.categories) {
      try {
        const {data}= await axiosInstance.get(`/v1/category/instrument-categories/${asset.categories}`);
  
        if (data?.name) {
          categoryName = data.name;
          assetType = data.assetClass || "";
        }
      } catch (err) {
        console.error("Error fetching category:", err);
      }
    }
    console.log()
    setForm((prev) => ({
      ...prev,
      name: asset.name,
      sector: prev.sector || asset.sector || "",
      mutualFundId: asset._id,
      category: categoryName || prev.category || "",
      cmp: asset.nav || "",
      instrumentToken: asset.instrument_token|| "",
    }));
    if(asset.instrument_token){
    try {
      await axios.get(`https://finhub-socket-server.onrender.com/subscribe/${asset.instrument_token}`);
    } catch (err) {
      console.error("Error subscribing to stock:", err);
    }
    // try {
    //   const res = await axios.get(`https://finhub-socket-server.onrender.com/get/${asset.instrument_token}`);
    //   const data = res.data;
    //   // console.log(data)
    //   setForm(prev => ({ ...prev, cmp: data?.tick?.last_price || "" }));
    // } catch (err) {
    //   console.error("Error fetching CMP:", err);
    // }
  }
    setIsCategoryPrefilled(!!categoryName);
    setSearchTerm("");
  
    if (fieldErrors.mutualFundId) {
      setFieldErrors((prev) => ({ ...prev, mutualFundId: false }));
    }
  };
  
  
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await axiosInstance.get("/v1/category/instrument-categories/all");
        const options = data.map(cat => ({
          value: cat.name,
          label: `${cat.name} (${cat.route || "N/A"}, ${cat.assetClass || "N/A"})`,
        }));
        setCategoryOptions(options);
      } catch (err) {
        console.error("Failed to load categories", err);
      }
    };
  
    if (!form.category) {
      fetchCategories();
    }
  }, [form.category]);
  
  
  useEffect(() => {
    if (!isOpen || !form.instrumentToken) return;
  
    let isMounted = true;
  
    const fetchCMP = async () => {
      try {
        const res = await axios.get(`https://finhub-socket-server.onrender.com/get/${form.instrumentToken}`);
        const data = res.data;
        if (isMounted) {
          setForm((prev) => ({
            ...prev,
            cmp: data?.tick?.last_price || prev.cmp,
          }));
        }
      } catch (err) {
        console.error("Polling CMP fetch error:", err);
      }
    };
  
    const intervalId = setInterval(fetchCMP, 5000); // every 5s
    fetchCMP(); // initial fetch
  
    return () => {
      clearInterval(intervalId);  // cleanup on unmount or token change
      isMounted = false;
    };
  }, [form.instrumentToken, isOpen]);
  


  const handleSubmit = async () => {
    const { mutualFundId, sector, rmp, cmp, riskProfile, action, remark, validTill, category } = form

    const newErrors = {}
    if (!mutualFundId) newErrors.mutualFundId = true
    if (!sector) newErrors.sector = true
    if (!category) newErrors.category = true
    if (!validTill) newErrors.validTill = true
    if (!rmp || Number.parseFloat(rmp) <= 0) newErrors.rmp = true
    if (!cmp) newErrors.cmp = true
    if (!riskProfile) newErrors.riskProfile = true
    if (!action) newErrors.action = true
    if (!remark) newErrors.remark = true

    setFieldErrors(newErrors)

    if (Object.keys(newErrors).length > 0) {
      setError("Please correct the highlighted fields.")
      return
    }

    setError("")
    setLoading(true)
    try {
      const {data} = await axiosInstance.post("/v1/recommendations/create",{
        mutualFundId,
        sector,
        rmp: Number.parseFloat(rmp),
        cmp: Number.parseFloat(cmp),
        riskProfile,
        action,
        remark,
        validTill,
        category,
      }, {
        headers: { "Content-Type": "application/json" },
      })

      // if (!res.ok) throw new Error("Failed to create recommendation")
      console.log(data)

      // const data = await res.json()
      onCreated(data.data)
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
      setFieldErrors({})
    } catch (err) {
      console.error("Error:", err)
      setError("Something went wrong.")
    } finally {
      setLoading(false)
    }
  }

  const inputClass = (field) =>
    `w-full px-4 py-3 border ${
      fieldErrors[field] ? "border-red-500 bg-red-50" : "border-gray-200 bg-gray-50"
    } rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:bg-white`

  const selectClass = (field) =>
    `w-full px-4 py-3 border ${
      fieldErrors[field] ? "border-red-500 bg-red-50" : "border-gray-200 bg-gray-50"
    } rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:bg-white`

  // Custom styles for React Select with error state
  const getReactSelectStyles = (hasError) => ({
    control: (provided, state) => ({
      ...provided,
      border: hasError ? "1px solid #ef4444" : "1px solid #e5e7eb",
      backgroundColor: hasError ? "#fef2f2" : "#f9fafb",
      borderRadius: "0.75rem",
      padding: "0.5rem",
      boxShadow: state.isFocused ? "0 0 0 2px #3b82f6" : "none",
      "&:hover": {
        backgroundColor: "#ffffff",
        borderColor: hasError ? "#ef4444" : "#e5e7eb",
      },
    }),
    placeholder: (provided) => ({
      ...provided,
      color: "#9ca3af",
    }),
  })

    if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl relative max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white rounded-t-2xl border-b border-gray-100 px-8 py-6 flex items-center justify-between z-100">
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
                            <label className="block text-sm font-semibold text-gray-700">
                                Asset Type
                            </label>
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
                className={inputClass("sector")}
                placeholder="Enter sector"
              />
            </div>

            {/* Asset Name Search */}
            <div className="md:col-span-2 space-y-2">
              <label className="block text-sm font-semibold text-gray-700">Asset</label>
              <Select
  inputValue={searchTerm}
  onInputChange={(value) => {
    setSearchTerm(value)
    setPage(1)
  }}
  value={selectedAssetOption}
  options={(searchTerm ? filteredAssets : initialAssets).map((a) => ({
    value: a._id,
    label: a.name,
    data: a,
  }))}
  onChange={(selectedOption) => {
    const asset = selectedOption?.data
    if (asset) handleAssetSelect(asset)
    else {
      setSelectedAssetOption(null)
      setForm((prev) => ({
        ...prev,
        name: "",
        mutualFundId: "",
        sector: "",
        category: "",
        cmp: "",
      }))
      setIsCategoryPrefilled(false)
    }
  }}
  placeholder="Search and select an asset..."
  isClearable
  className="react-select-container"
  classNamePrefix="react-select"
  styles={getReactSelectStyles(fieldErrors.mutualFundId)}
  noOptionsMessage={() => (searchTerm ? "No assets found" : "Start typing...")}
/>

              {/* {form.name && (
                <div className="mt-2 px-3 py-2 bg-blue-50 border border-blue-200 rounded-lg">
                  <span className="text-sm font-medium text-blue-800">Selected: {form.name}</span>
                </div>
              )} */}
            </div>
            {/* Category */}
<div className="space-y-2">
  <label className="block text-sm font-semibold text-gray-700">Category</label>
  {isCategoryPrefilled ? (
    <input
      type="text"
      name="category"
      value={form.category}
      className={inputClass("category")}
      disabled
    />
  ) : (
    <Select
  options={categoryOptions}
  value={categoryOptions.find(opt => opt.value === form.category)}
  onChange={(selected) =>
    setForm((prev) => ({ ...prev, category: selected?.value || "" }))
  }
  placeholder="Select a Insturment category"
  styles={getReactSelectStyles(fieldErrors.category)}
  className="text-sm"
/>

  )}
</div>


            {/* Valid Till */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">Valid Till</label>
              <input
                type="date"
                name="validTill"
                value={form.validTill}
                onChange={handleChange}
                className={inputClass("validTill")}
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
                className={inputClass("rmp")}
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
                className={inputClass("cmp")}
                placeholder="0.00"
                step="0.01"
              />
            </div>

            {/* Risk Profile */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">Risk Profile</label>
              <select
                name="riskProfile"
                value={form.riskProfile}
                onChange={handleChange}
                className={selectClass("riskProfile")}
              >
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
              </select>
            </div>

            {/* Action */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">Action</label>
              <select name="action" value={form.action} onChange={handleChange} className={selectClass("action")}>
                <option>Buy</option>
                <option>Sell</option>
                <option>Hold</option>
              </select>
            </div>

            {/* Remark */}
            <div className="md:col-span-2 space-y-2">
              <label className="block text-sm font-semibold text-gray-700">Remark</label>
              <textarea
                name="remark"
                value={form.remark}
                onChange={handleChange}
                className={`${inputClass("remark")} resize-none`}
                rows={4}
                placeholder="Add any additional notes or remark..."
              />
            </div>
          </div>

                    {/* Error Message */}
                    {error && (
                        <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-xl">
                            <p className="text-red-700 text-sm font-medium">
                                {error}
                            </p>
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
  className="px-8 py-3 bg-gradient-to-r from-[#00d09c] to-[#00b98b] hover:opacity-90 text-white font-semibold rounded-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl"
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
