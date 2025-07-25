'use client';

import { useState } from 'react';

export default function BasketListClient({ baskets, token }) {
    const [selected, setSelected] = useState([]);

    const toggleBasket = (id) => {
        setSelected((prev) =>
            prev.includes(id) ? prev.filter((b) => b !== id) : [...prev, id]
        );
    };

    const addToCartHandler = () => {
        console.log(selected);
        alert('Submitted to cart');
        setSelected([]);
    };

    return (
        <div className="w-full px-2 sm:px-4 md:px-6 py-6">
            {selected.length > 0 && (
                <div className="mb-6 flex justify-between items-center bg-blue-50 p-4 rounded-lg">
                    <p className="text-blue-800 font-medium">
                        {selected.length} {selected.length === 1 ? 'item' : 'items'} selected
                    </p>
                    <button
                        onClick={addToCartHandler}
                        className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition duration-200 font-medium shadow-sm"
                    >
                        Add to Cart
                    </button>
                </div>
            )}

            <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden min-h-[300px]">
                <div className="overflow-x-auto">
                    <table className="w-full min-w-[800px] table-auto divide-y divide-gray-200">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Name
                                </th>
                                <th className="hidden sm:table-cell px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Description
                                </th>
                                <th className="hidden md:table-cell px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Created
                                </th>
                                <th className="px-6 py-3 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Add
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {baskets.length > 0 ? (
                                baskets.map((basket, index) => (
                                    <tr
                                        key={basket.id || basket._id}
                                        className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
                                    >
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="font-medium text-gray-900">{basket.title}</div>
                                            <div className="sm:hidden text-sm text-gray-500 mt-1">
                                                {basket.description?.substring(0, 50) || 'No description'}
                                            </div>
                                            <div className="sm:hidden text-xs text-gray-400 mt-1">
                                                {new Date(basket.createdAt).toLocaleDateString()}
                                            </div>
                                        </td>
                                        <td className="hidden sm:table-cell px-6 py-4 text-gray-600 truncate max-w-xs">
                                            {basket.description || 'No description'}
                                        </td>
                                        <td className="hidden md:table-cell px-6 py-4 text-gray-500 text-sm whitespace-nowrap">
                                            {new Date(basket.createdAt).toLocaleDateString()}
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <button
                                                onClick={() => toggleBasket(basket.id || basket._id)}
                                                className={`inline-flex items-center justify-center w-8 h-8 rounded-full transition-colors duration-200 ${selected.includes(basket.id || basket._id)
                                                    ? 'bg-red-100 text-red-600 hover:bg-red-200'
                                                    : 'bg-green-100 text-green-600 hover:bg-green-200'
                                                    }`}
                                                title={
                                                    selected.includes(basket.id || basket._id)
                                                        ? 'Remove from selection'
                                                        : 'Add to cart'
                                                }
                                            >
                                                {selected.includes(basket.id || basket._id) ? '−' : '+'}
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td
                                        colSpan={4}
                                        className="text-center py-16 text-gray-400 text-sm"
                                    >
                                        No baskets available
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
