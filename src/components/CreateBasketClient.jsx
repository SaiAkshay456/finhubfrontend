'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CreateBasketClient() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [stockIds, setStockIds] = useState([]);
    const [currentStock, setCurrentStock] = useState("");
    const [category, setCategory] = useState("technology"); // Default category
    const [isSubmitting, setIsSubmitting] = useState(false);
    const router = useRouter();

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
        if (!name.trim()) {
            alert("Name is required");
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
                setName("");
                setDescription("");
                setStockIds([]);
                setCategory("technology");
            } else {
                throw new Error("Failed to create basket");
            }
        } catch (error) {
            alert(error.message || "Error creating basket");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-2xl">
                <div className="text-center">
                    <h2 className="text-3xl font-bold text-gray-900">Create Basket</h2>
                    <p className="mt-2 text-gray-600">
                        Curate your perfect portfolio with stocks and categories
                    </p>
                </div>

                <div className="mt-8 bg-white py-8 px-6 shadow-xl rounded-xl sm:px-10 border border-gray-100">
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                            {/* Name Field */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Basket Name *
                                </label>
                                <input
                                    type="text"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                                    placeholder="e.g. Tech Innovators"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    required
                                />
                            </div>

                            {/* Category Field */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Category *
                                </label>
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

                        {/* Description Field */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Description
                            </label>
                            <textarea
                                rows={3}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                                placeholder="Describe your investment strategy..."
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </div>

                        {/* Stocks Field */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Add Stocks
                            </label>
                            <div className="flex space-x-2">
                                <input
                                    type="text"
                                    className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                                    placeholder="e.g. AAPL, MSFT, GOOGL"
                                    value={currentStock}
                                    onChange={(e) => setCurrentStock(e.target.value)}
                                    onKeyDown={handleKeyDown}
                                />
                                <button
                                    type="button"
                                    onClick={addStock}
                                    className="px-4 cursor-pointer py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition"
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
                                                    className="ml-1.5 text-blue-600 hover:text-blue-900 focus:outline-none"
                                                >
                                                    ×
                                                </button>
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Submit Button */}
                        <div className="pt-4 flex flex-col sm:flex-row gap-4">
                            {/* Create Basket Button */}
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className={`w-full sm:w-auto flex-1 px-6 py-3 cursor-pointer rounded-lg font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 transition ${isSubmitting
                                    ? 'bg-blue-400 cursor-not-allowed'
                                    : 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-500'
                                    }`}
                            >
                                {isSubmitting ? 'Creating Basket...' : 'Create Basket'}
                            </button>

                            {/* Back to Baskets Button */}
                            <button
                                type="button"
                                onClick={() => router.push("/baskets")}
                                className="w-full cursor-pointer sm:w-auto flex-1 px-6 py-3 rounded-lg font-medium text-gray-700 border border-gray-300 bg-white hover:bg-gray-100 transition"
                            >
                                ← Back to Baskets
                            </button>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    );
}


// // components/CreateBasketClient.jsx
// 'use client';

// import { useState } from "react";
// import CreateBasketModal from "./CreateBasketModal";

// export default function CreateBasketClient() {
//     const [isModalOpen, setIsModalOpen] = useState(false);
//     return (
//         <>
//             <button
//                 onClick={() => setIsModalOpen(true)}
//                 className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-indigo-700 transition-colors cursor-pointer"
//             >
//                 + Create Basket
//             </button>

//             <CreateBasketModal
//                 isOpen={isModalOpen}
//                 onClose={() => setIsModalOpen(false)}
//             />
//         </>
//     );
// }
