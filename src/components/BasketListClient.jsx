'use client';

import { useState } from 'react';

export default function BasketListClient({ baskets, token }) {
    const [selected, setSelected] = useState([]);

    const toggleBasket = (id) => {
        setSelected((prev) =>
            prev.includes(id) ? prev.filter((b => b !== id)) : [...prev, id]
        );
    };

    const addToCartHandler = () => {
        // try {
        //     const res = await fetch('/api/cart/add-baskets', {
        //         method: 'POST',
        //         headers: {
        //             'Content-Type': 'application/json',
        //             Authorization: `Bearer ${token}`,
        //         },
        //         body: JSON.stringify({ basketIds: selected }),
        //     });

        //     if (res.ok) {
        //         alert('Baskets added to cart!');
        //         setSelected([]);
        //     } else {
        //         alert('Failed to add baskets');
        //     }
        // } catch (err) {
        //     console.error('Add to cart error:', err);
        // }
        console.log(selected);
        alert("submitedd acrt")
        setSelected([]);
    };


    return (
        <div className="container mx-auto px-4 py-6">
            {selected.length > 0 && (
                <div className="mb-6 flex justify-between items-center bg-blue-50 p-4 rounded-lg">
                    <p className="text-blue-800 font-medium">
                        {selected.length} {selected.length === 1 ? 'item' : 'items'} selected
                    </p>
                    <button
                        onClick={addToCartHandler}
                        className="bg-green-600 cursor-pointer text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors duration-200 font-medium shadow-sm hover:shadow-md"
                    >
                        Add to Cart
                    </button>
                </div>
            )}

            <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Name
                                </th>
                                <th scope="col" className="hidden sm:table-cell px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Description
                                </th>
                                <th scope="col" className="hidden md:table-cell px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Created
                                </th>
                                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Add
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {baskets.map((basket) => (
                                <tr key={basket.id || basket._id} className="hover:bg-gray-50 transition-colors duration-150">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="font-medium text-gray-900">{basket.title}</div>
                                        <div className="sm:hidden text-sm text-gray-500 mt-1">
                                            {basket.description?.substring(0, 50) || 'No description'}
                                        </div>
                                        <div className="sm:hidden text-xs text-gray-400 mt-1">
                                            {new Date(basket.createdAt).toLocaleDateString()}
                                        </div>
                                    </td>
                                    <td className="hidden sm:table-cell px-6 py-4">
                                        <div className="text-gray-500 max-w-xs truncate">
                                            {basket.description || 'No description'}
                                        </div>
                                    </td>
                                    <td className="hidden md:table-cell px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {new Date(basket.createdAt).toLocaleDateString()}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right">
                                        <button
                                            onClick={() => toggleBasket(basket.id || basket._id)}
                                            className={`inline-flex cursor-pointer items-center justify-center w-8 h-8 rounded-full ${selected.includes(basket.id || basket._id)
                                                ? 'bg-red-100 text-red-600 hover:bg-red-200'
                                                : 'bg-green-100 text-green-600 hover:bg-green-200'
                                                } transition-colors duration-200`}
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
                            ))}
                        </tbody>
                    </table>
                </div>

                {baskets.length === 0 && (
                    <div className="text-center py-8">
                        <p className="text-gray-500">No baskets available</p>
                    </div>
                )}
            </div>
        </div>
    );
}