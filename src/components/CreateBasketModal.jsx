'use client';

import { useState } from "react";

export default function CreateBasketModal({ isOpen, onClose }) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [stockIds, setStockIds] = useState([]);
    const [currentStock, setCurrentStock] = useState("");
    const [category, setCategory] = useState("technology");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const categories = [
        { value: "technology", label: "Technology" },
        { value: "healthcare", label: "Healthcare" },
        { value: "finance", label: "Finance" },
        { value: "energy", label: "Energy" },
        { value: "consumer", label: "Consumer Goods" },
        { value: "other", label: "Other" }
    ];

    const addStock = () => {
        const trimmed = currentStock.trim().toUpperCase();
        if (trimmed && !stockIds.includes(trimmed)) {
            setStockIds([...stockIds, trimmed]);
            setCurrentStock("");
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            addStock();
        }
    };

    const removeStock = (symbol) => {
        setStockIds(stockIds.filter((s) => s !== symbol));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!title.trim()) {
            alert("Basket Name is required");
            return;
        }

        setIsSubmitting(true);
        try {
            const res = await fetch("/api/baskets", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ title, description, stockIds, category }),
            });

            if (res.ok) {
                alert("Basket created successfully!");
                // Clear
                setTitle("");
                setDescription("");
                setStockIds([]);
                setCategory("technology");
                onClose(); // close modal
            } else {
                throw new Error("Failed to create basket");
            }
        } catch (error) {
            alert(error.message || "Error creating basket");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!isOpen) return null;

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

                <h2 className="text-2xl font-bold mb-1 text-center">Create Basket</h2>
                <p className="text-center text-gray-600 mb-6">
                    Curate your perfect portfolio with stocks and categories.
                </p>

                <form className="space-y-6" onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                        {/* Name */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Basket Name *</label>
                            <input
                                type="text"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                                placeholder="e.g. Tech Innovators"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                required
                            />
                        </div>
                        {/* Category */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Category *</label>
                            <select
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                            >
                                {categories.map((cat) => (
                                    <option key={cat.value} value={cat.value}>
                                        {cat.label}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                        <textarea
                            rows={3}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                            placeholder="Describe your investment strategy..."
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>

                    {/* Stocks */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Add Stocks</label>
                        <div className="flex space-x-2">
                            <input
                                type="text"
                                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                                placeholder="e.g. AAPL"
                                value={currentStock}
                                onChange={(e) => setCurrentStock(e.target.value)}
                                onKeyDown={handleKeyDown}
                            />
                            <button
                                type="button"
                                onClick={addStock}
                                className="px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition"
                            >
                                Add
                            </button>
                        </div>
                        {stockIds.length > 0 && (
                            <div className="mt-3">
                                <p className="text-xs text-gray-500 mb-2">
                                    {stockIds.length} stock{stockIds.length !== 1 ? 's' : ''} added
                                </p>
                                <div className="flex flex-wrap gap-2">
                                    {stockIds.map((symbol) => (
                                        <span
                                            key={symbol}
                                            className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium"
                                        >
                                            {symbol}
                                            <button
                                                type="button"
                                                onClick={() => removeStock(symbol)}
                                                className="ml-1.5 text-blue-600 hover:text-blue-900 focus:outline-none cursor-pointer"
                                            >
                                                ×
                                            </button>
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Submit */}
                    <div className="pt-4 flex justify-end">
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className={`px-6 py-3 rounded-lg font-medium cursor-pointer text-white focus:outline-none focus:ring-2 focus:ring-offset-2 transition ${isSubmitting
                                ? 'bg-blue-400 cursor-not-allowed'
                                : 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-500'
                                }`}
                        >
                            {isSubmitting ? 'Creating...' : 'Create Basket'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

