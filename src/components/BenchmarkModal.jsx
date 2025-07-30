"use client";

import { useEffect, useState } from "react";
import axiosInstance from "../helpers/axios";
import Select from "react-select";

export default function BenchmarkModal({ isOpen, onClose, onCreated }) {
  const [assetType, setAssetType] = useState("Stock");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState(""); // will store ID
  const [selectedAssetOption, setSelectedAssetOption] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredAssets, setFilteredAssets] = useState([]);
  const [initialAssets, setInitialAssets] = useState([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [categoryOptions, setCategoryOptions] = useState([]);

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await axiosInstance.get("/v1/category/instrument-categories/all");
        const options = data.map((cat) => ({
          value: cat.name,
          label: `${cat.name} (${cat.route || "N/A"}, ${cat.assetClass || "N/A"})`,
        }));
        setCategoryOptions(options);
      } catch (err) {
        console.error("Failed to load categories", err);
      }
    };
    fetchCategories();
  }, []);

  // Fetch assets initially
  useEffect(() => {
    if (!isOpen) return;

    const fetchAssets = async () => {
      try {
        const endpoint =
          assetType === "Mutual Fund"
            ? "/v1/mutual-funds/list-mf?page=1&limit=50"
            : "/v1/stocks/list-stocks?page=1&limit=50";

        const { data } = await axiosInstance.get(endpoint);
        setInitialAssets(data.data);
      } catch (err) {
        console.error("Error fetching initial assets:", err);
      }
    };

    fetchAssets();
  }, [isOpen, assetType]);

  // Filter assets by search term
  useEffect(() => {
    if (!isOpen || !searchTerm) return;
    const controller = new AbortController();

    const fetchAssets = async () => {
      try {
        const endpoint =
          assetType === "Mutual Fund"
            ? `/v1/mutual-funds/list-mf?page=1&limit=50&search=${searchTerm}`
            : `/v1/stocks/list-stocks?page=1&limit=50&search=${searchTerm}`;

        const { data } = await axiosInstance.get(endpoint, {
          signal: controller.signal,
        });

        setFilteredAssets(data.data);
      } catch (err) {
        if (err.name !== "AbortError") console.error("Search fetch failed", err);
      }
    };

    const debounce = setTimeout(fetchAssets, 300);
    return () => {
      clearTimeout(debounce);
      controller.abort();
    };
  }, [searchTerm, assetType, isOpen]);

  const handleSubmit = async () => {
    if (!category || !stock) {
      setError("Category and asset are required.");
      return;
    }

    setLoading(true);
    try {
      console.log(selectedAssetOption)
      const stockName =selectedAssetOption.label
      console.log(stock)
      const { data } = await axiosInstance.post(
        "/v1/benchmark/create",
        { category, stockName},
        { headers: { "Content-Type": "application/json" } }
      );
      if (data.success) {
        onCreated();
        onClose();
      } else {
        setError(data.message || "Failed to create benchmark.");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const getReactSelectStyles = () => ({
    control: (provided, state) => ({
      ...provided,
      backgroundColor: "#f9fafb",
      borderRadius: "0.75rem",
      borderColor: "#e5e7eb",
      padding: "0.25rem",
      boxShadow: state.isFocused ? "0 0 0 2px #3b82f6" : "none",
      "&:hover": {
        backgroundColor: "#fff",
      },
    }),
  });

  if (!isOpen) return null;


  // const filteredStocks = stocks.filter((s) => s.category === category);

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
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
                 stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 6 6 18"></path>
              <path d="m6 6 12 12"></path>
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5">
  {/* Asset Type */}
  <div className="space-y-2">
    <label className="block text-sm font-medium text-gray-700">Asset Type</label>
    <select
      value={assetType}
      onChange={(e) => {
        setAssetType(e.target.value);
        setSearchTerm("");
        setSelectedAssetOption(null);
        setStock("");
      }}
      className="w-full h-11 px-4 py-2 bg-white border border-gray-200 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500 transition"
    >
      <option>Stock</option>
      <option>Mutual Fund</option>
    </select>
  </div>

  {/* Category */}
  <div className="space-y-2">
    <label className="block text-sm font-medium text-gray-700">Category</label>
    <Select
      options={categoryOptions}
      value={categoryOptions.find((opt) => opt.value === category)}
      onChange={(selected) => setCategory(selected?.value || "")}
      placeholder="Select an Instrument Category"
      className="text-sm"
    />
  </div>

  {/* Asset Search Dropdown */}
  <div className="space-y-2">
    <label className="block text-sm font-medium text-gray-700">Asset</label>
    <Select
      inputValue={searchTerm}
      onInputChange={(val) => setSearchTerm(val)}
      value={selectedAssetOption}
      options={(searchTerm ? filteredAssets : initialAssets).map((a) => ({
        value: a._id,
        label: a.name,
        data: a,
      }))}
      onChange={(selected) => {
        if (selected) {
          setSelectedAssetOption(selected);
          setStock(selected.value);
        } else {
          setSelectedAssetOption(null);
          setStock("");
        }
      }}
      placeholder="Search and select an asset..."
      isClearable
      styles={getReactSelectStyles()}
      noOptionsMessage={() => (searchTerm ? "No assets found" : "Start typing...")}
    />
  </div>

  {/* Error */}
  {error && (
    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
      {error}
    </div>
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
            className={`px-5 py-2.5 rounded-lg bg-gradient-to-r from-[#00d09c] to-[#00b98b] text-white font-medium hover:from-[#00d09c] hover:to-[#00b98b] transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 ${loading || !category || !stock ? "opacity-60 cursor-not-allowed" : ""}`}
          >
            {loading ? (
              <div className="flex items-center gap-2">
                <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg"
                     fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor"
                          strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
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
  );
}
