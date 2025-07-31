'use client';

import React, { useState } from 'react';

const ShowRecommendation = ({ recommendations }) => {
    const [isOpen, setIsOpen] = useState(false);

    if (!recommendations || recommendations.length === 0) {
        return <span className="text-gray-400 text-sm">No recommendations</span>;
    }

    return (
        <>
            <button
                onClick={() => setIsOpen(true)}
                className="text-blue-600 hover:text-blue-800 font-medium text-sm transition-colors"
            >
                View ({recommendations.length})
            </button>

            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/30 backdrop-blur-sm">
                    <div className="bg-white rounded-xl shadow-xl w-full max-w-lg max-h-[80vh] flex flex-col">
                        <div className="p-6 border-b flex justify-between items-center">
                            <h2 className="text-xl font-semibold text-gray-800">
                                Recommendations ({recommendations.length})
                            </h2>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="text-gray-500 hover:text-gray-700 p-1 transition-colors"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        <div className="overflow-y-auto p-6">
                            <ul className="space-y-3">
                                {recommendations.map((rec, idx) => (
                                    <li key={rec._id || idx} className="p-3 bg-gray-50 rounded-lg">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <h3 className="font-medium text-gray-900">
                                                    {rec.category || 'Uncategorized'}
                                                </h3>
                                                {rec.riskProfile && (
                                                    <span className={`inline-block mt-1 px-2 py-1 text-xs rounded-full ${rec.riskProfile.toLowerCase() === 'low'
                                                        ? 'bg-green-100 text-green-800'
                                                        : rec.riskProfile.toLowerCase() === 'medium'
                                                            ? 'bg-yellow-100 text-yellow-800'
                                                            : 'bg-red-100 text-red-800'
                                                        }`}>
                                                        {rec.riskProfile}
                                                    </span>
                                                )}
                                            </div>

                                            <span className="text-sm text-gray-500">
                                                {rec.status}
                                            </span>

                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="p-4 border-t flex justify-end">
                            <button
                                onClick={() => setIsOpen(false)}
                                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default ShowRecommendation;