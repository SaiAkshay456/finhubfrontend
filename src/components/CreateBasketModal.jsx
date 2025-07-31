// 'use client';

// import { useState } from "react";

// export default function CreateBasketModal({ isOpen, onClose }) {
//     const [title, setTitle] = useState("");
//     const [description, setDescription] = useState("");
//     const [stockIds, setStockIds] = useState([]);
//     const [currentStock, setCurrentStock] = useState("");
//     const [category, setCategory] = useState("technology");
//     const [threeYearReturn, setThreeYearReturn] = useState("");
//     const [threeYearRisk, setThreeYearRisk] = useState("");
//     const [assetClass, setAssetClass] = useState("")
//     const [route, setRoute] = useState("")
//     // const [threeYearReturn, setThreeYearReturn] = useState("");
//     const [isSubmitting, setIsSubmitting] = useState(false);
//     const categories = [
//         { value: "technology", label: "Technology" },
//         { value: "healthcare", label: "Healthcare" },
//         { value: "finance", label: "Finance" },
//         { value: "energy", label: "Energy" },
//         { value: "consumer", label: "Consumer Goods" },
//         { value: "other", label: "Other" }
//     ];

//     const addStock = () => {
//         const trimmed = currentStock.trim().toUpperCase();
//         if (trimmed && !stockIds.includes(trimmed)) {
//             setStockIds([...stockIds, trimmed]);
//             setCurrentStock("");
//         }
//     };

//     const handleKeyDown = (e) => {
//         if (e.key === 'Enter') {
//             e.preventDefault();
//             addStock();
//         }
//     };

//     const removeStock = (symbol) => {
//         setStockIds(stockIds.filter((s) => s !== symbol));
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         if (!title.trim()) {
//             alert("Basket Name is required");
//             return;
//         }

//         setIsSubmitting(true);
//         try {
//             const res = await fetch("/api/baskets", {
//                 method: "POST",
//                 headers: { "Content-Type": "application/json" },
//                 body: JSON.stringify({ title, description, stockIds, category }),
//             });

//             if (res.ok) {
//                 alert("Basket created successfully!");
//                 // Clear
//                 setTitle("");
//                 setDescription("");
//                 setStockIds([]);
//                 setCategory("technology");
//                 onClose(); // close modal
//             } else {
//                 throw new Error("Failed to create basket");
//             }
//         } catch (error) {
//             alert(error.message || "Error creating basket");
//         } finally {
//             setIsSubmitting(false);
//         }
//     };

//     if (!isOpen) return null;

//     return (
//         <div className="fixed inset-0 bg-gray-900/50 backdrop-blur-sm flex items-center justify-center z-50">
//             <div className="bg-white w-full max-w-2xl rounded-lg shadow-xl p-6 relative mx-4 border border-gray-200">
//                 {/* Close Button */}
//                 <button
//                     onClick={onClose}
//                     className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 text-2xl font-bold cursor-pointer"
//                 >
//                     ×
//                 </button>

//                 <h2 className="text-2xl font-bold mb-2 text-center">Create Basket</h2>
//                 <form className="space-y-6" onSubmit={handleSubmit}>
//                     <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
//                         {/* Name */}
//                         <div>
//                             <label className="block text-sm font-medium text-gray-700 mb-1">Basket Name *</label>
//                             <input
//                                 type="text"
//                                 className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
//                                 placeholder="e.g. Tech Innovators"
//                                 value={title}
//                                 onChange={(e) => setTitle(e.target.value)}
//                                 required
//                             />
//                         </div>
//                         {/* Category */}
//                         <div>
//                             <label className="block text-sm font-medium text-gray-700 mb-1">3Y Return *</label>
//                             <input
//                                 type="text"
//                                 className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
//                                 placeholder="e.g. Tech Innovators"
//                                 value={threeYearReturn}
//                                 onChange={(e) => setThreeYearReturn(e.target.value)}
//                                 required
//                             />
//                         </div>
//                         <div>
//                             <label className="block text-sm font-medium text-gray-700 mb-1">3Y Return Risk*</label>
//                             <input
//                                 type="text"
//                                 className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
//                                 placeholder="e.g. Tech Innovators"
//                                 value={threeYearRisk}
//                                 onChange={(e) => setThreeYearRisk(e.target.value)}
//                                 required
//                             />
//                         </div>
//                         <div>
//                             <label className="block text-sm font-medium text-gray-700 mb-1">Category *</label>
//                             <select
//                                 value={category}
//                                 onChange={(e) => setCategory(e.target.value)}
//                                 className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
//                             >
//                                 {categories.map((cat) => (
//                                     <option key={cat.value} value={cat.value}>
//                                         {cat.label}
//                                     </option>
//                                 ))}
//                             </select>
//                         </div>
//                     </div>

//                     {/* Description */}
//                     <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
//                         <textarea
//                             rows={3}
//                             className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
//                             placeholder="Describe your strategy..."
//                             value={description}
//                             onChange={(e) => setDescription(e.target.value)}
//                         />
//                     </div>
//                     <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-1">Add Recommendations</label>
//                         <div className="flex space-x-2">
//                             <input
//                                 type="text"
//                                 className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
//                                 placeholder="e.g. AAPL"
//                                 value={currentStock}
//                                 onChange={(e) => setCurrentStock(e.target.value)}
//                                 onKeyDown={handleKeyDown}
//                             />
//                             <button
//                                 type="button"
//                                 onClick={addStock}
//                                 className="px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition"
//                             >
//                                 Add
//                             </button>
//                         </div>
//                         {stockIds.length > 0 && (
//                             <div className="mt-3">
//                                 <p className="text-xs text-gray-500 mb-2">
//                                     {stockIds.length} stock{stockIds.length !== 1 ? 's' : ''} added
//                                 </p>
//                                 <div className="flex flex-wrap gap-2">
//                                     {stockIds.map((symbol) => (
//                                         <span
//                                             key={symbol}
//                                             className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium"
//                                         >
//                                             {symbol}
//                                             <button
//                                                 type="button"
//                                                 onClick={() => removeStock(symbol)}
//                                                 className="ml-1.5 text-blue-600 hover:text-blue-900 focus:outline-none cursor-pointer"
//                                             >
//                                                 ×
//                                             </button>
//                                         </span>
//                                     ))}
//                                 </div>
//                             </div>
//                         )}
//                     </div>

//                     {/* Submit */}
//                     <div className="pt-4 flex justify-end">
//                         <button
//                             type="submit"
//                             disabled={isSubmitting}
//                             className={`px-6 py-3 rounded-lg font-medium cursor-pointer text-white focus:outline-none focus:ring-2 focus:ring-offset-2 transition ${isSubmitting
//                                 ? 'bg-blue-400 cursor-not-allowed'
//                                 : 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-500'
//                                 }`}
//                         >
//                             {isSubmitting ? 'Creating...' : 'Create Basket'}
//                         </button>
//                     </div>
//                 </form>
//             </div>
//         </div>
//     );
// }


// 'use client';

// import { useState, useEffect } from 'react';
// import axiosInstance from '@/helpers/axios';
// import { useRouter } from 'next/navigation';

// export default function CreateBasketModal({ isOpen, onClose }) {
//     const [title, setTitle] = useState('');
//     const [description, setDescription] = useState('');
//     const [threeYearReturn, setThreeYearReturn] = useState('');
//     const [threeYearRisk, setThreeYearRisk] = useState('');
//     const [assetClass, setAssetClass] = useState('');
//     const [route, setRoute] = useState('');
//     const [routes, setRoutes] = useState([]);
//     const [recommendations, setRecommendations] = useState([]);
//     const [selectedRecommendationIds, setSelectedRecommendationIds] = useState([]);
//     const [isSubmitting, setIsSubmitting] = useState(false);
//     const [three_y_sharpe, setThreeYSharpe] = useState('');
//     const [newRecommendation, setNewRecommendation] = useState('');
//     const [isFetchingRecommendations, setIsFetchingRecommendations] = useState(false);
//     const [msg, setMsg] = useState('');
//     const router = useRouter();

//     const assetClasses = ['Equity', 'Debt', 'Commodity'];

//     useEffect(() => {
//         const fetchRoutes = async () => {
//             if (assetClass) {
//                 try {
//                     const res = await axiosInstance.get(`/v1/model-basket/get/route/${assetClass}`);
//                     setRoutes(res.data.routes);
//                 } catch (error) {
//                     console.error(error);
//                     setRoutes([]);
//                 }
//             } else {
//                 setRoutes([]);
//             }
//             setRoute('');
//             setRecommendations([]);
//             setSelectedRecommendationIds([]);
//         };

//         fetchRoutes();
//     }, [assetClass]);

//     useEffect(() => {
//         const fetchRecommendations = async () => {
//             if (assetClass && route) {
//                 setIsFetchingRecommendations(true);
//                 try {
//                     const res = await axiosInstance.get(`/v1/model-basket/get/recommendations`);
//                     setRecommendations(res.data.recommendations || []);
//                 } catch (error) {
//                     console.error(error);
//                     setRecommendations([]);
//                 } finally {
//                     setIsFetchingRecommendations(false);
//                 }
//             } else {
//                 setRecommendations([]);
//             }
//         };

//         fetchRecommendations();
//     }, [assetClass, route]);

//     const handleAddRecommendation = () => {
//         if (!newRecommendation) return;

//         if (!selectedRecommendationIds.includes(newRecommendation)) {
//             setSelectedRecommendationIds(prev => [...prev, newRecommendation]);
//         }
//         setNewRecommendation('');
//     };

//     const handleRemoveRecommendation = (_id) => {
//         setSelectedRecommendationIds(prev => prev.filter(id => id !== _id));
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         if (!title.trim()) return alert('Basket Name is required');
//         if (!assetClass || !route || selectedRecommendationIds.length === 0) {
//             return alert('Please select Asset Class, Route, and at least one Recommendation.');
//         }

//         setIsSubmitting(true);
//         try {
//             const res = await axiosInstance.post('/v1/model-basket/create-basket', {
//                 title,
//                 description,
//                 threeYearReturn,
//                 threeYearRisk,
//                 assetClass,
//                 route,
//                 three_y_sharpe,
//                 recommendationsIds: selectedRecommendationIds
//             });
//             if (res.data.success) {
//                 setMsg(res.data.message);
//                 setTitle('');
//                 setDescription('');
//                 setAssetClass('');
//                 setRoute('');
//                 setRecommendations([]);
//                 setSelectedRecommendationIds([]);
//                 onClose();
//                 router.refresh();
//             } else {
//                 throw new Error('Failed to create basket');
//             }
//         } catch (error) {
//             console.error(error);
//         } finally {
//             setIsSubmitting(false);
//         }
//     };

//     if (!isOpen) return null;

//     return (
//         <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-4">
//             <div className="bg-white w-full max-w-2xl rounded-lg shadow-xl overflow-y-auto max-h-[90vh]">
//                 {msg && (
//                     <div className={`mx-8 mt-8 p-4 rounded-md border ${msg.toLowerCase().includes('success')
//                         ? 'bg-green-50 border-green-200 text-green-800'
//                         : 'bg-red-50 border-red-200 text-red-800'
//                         }`}>
//                         <div className="flex items-center">
//                             <div className={`flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold ${msg.toLowerCase().includes('success') ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'
//                                 }`}>
//                                 {msg.toLowerCase().includes('success') ? '✓' : '!'}
//                             </div>
//                             <span className="ml-3 text-sm">{msg}</span>
//                         </div>
//                     </div>
//                 )}
//                 <div className="p-5">
//                     <div className="flex justify-between items-center mb-4">
//                         <h2 className="text-xl font-semibold text-gray-800">Create New Basket</h2>
//                         <button onClick={onClose} className="text-gray-500 hover:text-gray-700 transition-colors">
//                             <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//                             </svg>
//                         </button>
//                     </div>

//                     <form onSubmit={handleSubmit} className="space-y-3">
//                         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                             <div>
//                                 <label className="block text-sm font-medium text-gray-700 mb-1">Basket Name *</label>
//                                 <input
//                                     type="text"
//                                     value={title}
//                                     onChange={(e) => setTitle(e.target.value)}
//                                     required
//                                     className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-sm"
//                                     placeholder="e.g. Tech Leaders"
//                                 />
//                             </div>

//                             <div>
//                                 <label className="block text-sm font-medium text-gray-700 mb-1">3Y Sharpe *</label>
//                                 <input
//                                     type="text"
//                                     value={three_y_sharpe}
//                                     onChange={(e) => setThreeYSharpe(e.target.value)}
//                                     required
//                                     className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-sm"
//                                 />
//                             </div>

//                             <div>
//                                 <label className="block text-sm font-medium text-gray-700 mb-1">3Y Return *</label>
//                                 <input
//                                     type="text"
//                                     value={threeYearReturn}
//                                     onChange={(e) => setThreeYearReturn(e.target.value)}
//                                     required
//                                     className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-sm"
//                                 />
//                             </div>

//                             <div>
//                                 <label className="block text-sm font-medium text-gray-700 mb-1">3Y Risk *</label>
//                                 <select
//                                     value={threeYearRisk}
//                                     onChange={(e) => setThreeYearRisk(e.target.value)}
//                                     required
//                                     className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-sm"
//                                 >
//                                     <option value="">Select Risk Level</option>
//                                     <option value="Low">Low</option>
//                                     <option value="Medium">Medium</option>
//                                     <option value="High">High</option>
//                                 </select>
//                             </div>

//                         </div>

//                         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                             <div>
//                                 <label className="block text-sm font-medium text-gray-700 mb-1">Asset Class *</label>
//                                 <select
//                                     value={assetClass}
//                                     onChange={(e) => setAssetClass(e.target.value)}
//                                     className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-sm"
//                                 >
//                                     <option value="">Select Asset Class</option>
//                                     {assetClasses.map(cls => (
//                                         <option key={cls} value={cls}>{cls}</option>
//                                     ))}
//                                 </select>
//                             </div>

//                             {routes.length > 0 && (
//                                 <div>
//                                     <label className="block text-sm font-medium text-gray-700 mb-1">Route *</label>
//                                     <select
//                                         value={route}
//                                         onChange={(e) => setRoute(e.target.value)}
//                                         className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-sm"
//                                     >
//                                         <option value="">Select Route</option>
//                                         {routes.map(r => (
//                                             <option key={r._id} value={r.name}>{r.name}</option>
//                                         ))}
//                                     </select>
//                                 </div>
//                             )}
//                         </div>

//                         {assetClass && route && (
//                             <div>
//                                 <label className="block text-sm font-medium text-gray-700 mb-1">Recommendations *</label>
//                                 <div className="flex gap-2">
//                                     <select
//                                         value={newRecommendation}
//                                         onChange={(e) => setNewRecommendation(e.target.value)}
//                                         disabled={isFetchingRecommendations || recommendations.length === 0}
//                                         className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-sm"
//                                     >
//                                         <option value="">Select Recommendation</option>
//                                         {recommendations.map(rec => (
//                                             <option key={rec._id} value={rec._id}>
//                                                 {rec.category} ({rec.riskProfile}) {rec.status}
//                                             </option>
//                                         ))}
//                                     </select>
//                                     <button
//                                         type="button"
//                                         onClick={handleAddRecommendation}
//                                         disabled={!newRecommendation || selectedRecommendationIds.includes(newRecommendation)}
//                                         className="px-3 py-2 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed"
//                                     >
//                                         Add
//                                     </button>
//                                 </div>

//                                 {selectedRecommendationIds.length > 0 && (
//                                     <div className="mt-3">
//                                         <label className="block text-sm font-medium text-gray-700 mb-1">Selected</label>
//                                         <div className="border border-gray-200 rounded-md p-2">
//                                             {selectedRecommendationIds.map(id => {
//                                                 const rec = recommendations.find(r => r._id === id);
//                                                 return (
//                                                     <div key={id} className="flex items-center justify-between py-1 px-2 hover:bg-gray-50">
//                                                         <span className="text-sm">
//                                                             {rec?.category} ({rec?.riskProfile}) {rec?.status}
//                                                         </span>
//                                                         <button
//                                                             type="button"
//                                                             onClick={() => handleRemoveRecommendation(id)}
//                                                             className="text-red-500 hover:text-red-700"
//                                                         >
//                                                             <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                                                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//                                                             </svg>
//                                                         </button>
//                                                     </div>
//                                                 );
//                                             })}
//                                         </div>
//                                     </div>
//                                 )}
//                             </div>
//                         )}

//                         <div>
//                             <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
//                             <textarea
//                                 rows={2}
//                                 value={description}
//                                 onChange={(e) => setDescription(e.target.value)}
//                                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-sm"
//                             />
//                         </div>

//                         <div className="flex justify-end pt-2">
//                             <button
//                                 type="submit"
//                                 disabled={isSubmitting}
//                                 className={`px-4 py-2 text-sm rounded-md text-white font-medium transition-all ${isSubmitting
//                                     ? 'bg-blue-400 cursor-not-allowed'
//                                     : 'bg-blue-600 hover:bg-blue-700'}`}
//                             >
//                                 {isSubmitting ? 'Creating...' : 'Create Basket'}
//                             </button>
//                         </div>
//                     </form>
//                 </div>
//             </div>
//         </div>
//     );
// }

'use client';

import { useState, useEffect } from 'react';
import axiosInstance from '@/helpers/axios';
import { useRouter } from 'next/navigation';

export default function CreateBasketModal({ isOpen, onClose }) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [threeYearReturn, setThreeYearReturn] = useState('');
    const [threeYearRisk, setThreeYearRisk] = useState('');
    const [assetClass, setAssetClass] = useState('');
    const [route, setRoute] = useState('');
    const [routes, setRoutes] = useState([]);
    const [recommendations, setRecommendations] = useState([]);
    const [selectedRecommendationIds, setSelectedRecommendationIds] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [three_y_sharpe, setThreeYSharpe] = useState('');
    const [newRecommendation, setNewRecommendation] = useState('');
    const [isFetchingRecommendations, setIsFetchingRecommendations] = useState(false);
    const [msg, setMsg] = useState('');
    const router = useRouter();

    const assetClasses = ['Equity', 'Debt', 'Commodity'];

    useEffect(() => {
        const fetchRoutes = async () => {
            if (assetClass) {
                try {
                    const res = await axiosInstance.get(`/v1/model-basket/get/route/${assetClass}`);
                    setRoutes(res.data.routes);
                } catch (error) {
                    console.error(error);
                    setRoutes([]);
                }
            } else {
                setRoutes([]);
            }
            setRoute('');
            setRecommendations([]);
            setSelectedRecommendationIds([]);
        };

        fetchRoutes();
    }, [assetClass]);

    useEffect(() => {
        const fetchRecommendations = async () => {
            if (assetClass && route) {
                setIsFetchingRecommendations(true);
                try {
                    const res = await axiosInstance.get(`/v1/model-basket/get/recommendations`);
                    setRecommendations(res.data.recommendations || []);
                } catch (error) {
                    console.error(error);
                    setRecommendations([]);
                } finally {
                    setIsFetchingRecommendations(false);
                }
            } else {
                setRecommendations([]);
            }
        };

        fetchRecommendations();
    }, [assetClass, route]);

    const handleAddRecommendation = () => {
        if (!newRecommendation) return;

        if (!selectedRecommendationIds.includes(newRecommendation)) {
            setSelectedRecommendationIds(prev => [...prev, newRecommendation]);
        }
        setNewRecommendation('');
    };

    const handleRemoveRecommendation = (_id) => {
        setSelectedRecommendationIds(prev => prev.filter(id => id !== _id));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!title.trim()) return alert('Basket Name is required');
        if (!assetClass || !route || selectedRecommendationIds.length === 0) {
            return alert('Please select Asset Class, Route, and at least one Recommendation.');
        }

        setIsSubmitting(true);
        try {
            const res = await axiosInstance.post('/v1/model-basket/create-basket', {
                title,
                description,
                threeYearReturn,
                threeYearRisk,
                assetClass,
                route,
                three_y_sharpe,
                recommendationsIds: selectedRecommendationIds
            });
            if (res.data.success) {
                setMsg(res.data.message);
                setTitle('');
                setDescription('');
                setAssetClass('');
                setRoute('');
                setRecommendations([]);
                setSelectedRecommendationIds([]);
                onClose();
                router.refresh();
            } else {
                throw new Error('Failed to create basket');
            }
        } catch (error) {
            console.error(error);
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white w-full max-w-4xl rounded-xl shadow-xl overflow-y-auto max-h-[80vh]">
                {msg && (
                    <div className={`mx-6 mt-4 p-3 rounded-md border ${msg.toLowerCase().includes('success')
                        ? 'bg-green-50 border-green-200 text-green-800'
                        : 'bg-red-50 border-red-200 text-red-800'
                        }`}>
                        <div className="flex items-center">
                            <div className={`flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold ${msg.toLowerCase().includes('success') ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'
                                }`}>
                                {msg.toLowerCase().includes('success') ? '✓' : '!'}
                            </div>
                            <span className="ml-2 text-sm">{msg}</span>
                        </div>
                    </div>
                )}
                <div className="p-6">
                    <div className="flex justify-between items-center mb-5">
                        <h2 className="text-2xl font-bold text-gray-800">Create Investment Basket</h2>
                        <button onClick={onClose} className="text-gray-500 hover:text-gray-700 transition-colors p-1">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-700">Basket Name *</label>
                                <input
                                    type="text"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    required
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                                    placeholder="e.g. Tech Leaders"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-700">3Y Sharpe *</label>
                                <input
                                    type="text"
                                    value={three_y_sharpe}
                                    onChange={(e) => setThreeYSharpe(e.target.value)}
                                    required
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-700">3Y Return *</label>
                                <input
                                    type="text"
                                    value={threeYearReturn}
                                    onChange={(e) => setThreeYearReturn(e.target.value)}
                                    required
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-700">3Y Risk *</label>
                                <select
                                    value={threeYearRisk}
                                    onChange={(e) => setThreeYearRisk(e.target.value)}
                                    required
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                                >
                                    <option value="">Select Risk</option>
                                    <option value="Low">Low</option>
                                    <option value="Medium">Medium</option>
                                    <option value="High">High</option>
                                </select>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-700">Asset Class *</label>
                                <select
                                    value={assetClass}
                                    onChange={(e) => setAssetClass(e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                                >
                                    <option value="">Select Asset Class</option>
                                    {assetClasses.map(cls => (
                                        <option key={cls} value={cls}>{cls}</option>
                                    ))}
                                </select>
                            </div>

                            {routes.length > 0 && (
                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-gray-700">Route *</label>
                                    <select
                                        value={route}
                                        onChange={(e) => setRoute(e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                                    >
                                        <option value="">Select Route</option>
                                        {routes.map(r => (
                                            <option key={r._id} value={r.name}>{r.name}</option>
                                        ))}
                                    </select>
                                </div>
                            )}
                        </div>

                        {assetClass && route && (
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-700">Recommendations *</label>
                                <div className="flex gap-2">
                                    <select
                                        value={newRecommendation}
                                        onChange={(e) => setNewRecommendation(e.target.value)}
                                        disabled={isFetchingRecommendations || recommendations.length === 0}
                                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                                    >
                                        <option value="">Select Recommendation</option>
                                        {recommendations.map(rec => (
                                            <option key={rec._id} value={rec._id}>
                                                {rec.category} ({rec.riskProfile}) {rec.status}
                                            </option>
                                        ))}
                                    </select>
                                    <button
                                        type="button"
                                        onClick={handleAddRecommendation}
                                        disabled={!newRecommendation || selectedRecommendationIds.includes(newRecommendation)}
                                        className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed transition-colors"
                                    >
                                        Add
                                    </button>
                                </div>

                                {selectedRecommendationIds.length > 0 && (
                                    <div className="mt-2">
                                        <div className="border border-gray-200 rounded-lg p-2 max-h-40 overflow-y-auto">
                                            {selectedRecommendationIds.map(id => {
                                                const rec = recommendations.find(r => r._id === id);
                                                return (
                                                    <div key={id} className="flex items-center justify-between py-2 px-3 hover:bg-gray-50 rounded">
                                                        <span className="text-sm">
                                                            {rec?.category} ({rec?.riskProfile}) {rec?.status}
                                                        </span>
                                                        <button
                                                            type="button"
                                                            onClick={() => handleRemoveRecommendation(id)}
                                                            className="text-red-500 hover:text-red-700 p-1"
                                                        >
                                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                                            </svg>
                                                        </button>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}

                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">Description</label>
                            <textarea
                                rows={3}
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                            />
                        </div>

                        <div className="flex justify-end pt-4">
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className={`px-6 py-2.5 rounded-lg text-white font-medium transition-colors ${isSubmitting
                                    ? 'bg-blue-400 cursor-not-allowed'
                                    : 'bg-blue-600 hover:bg-blue-700 shadow-sm hover:shadow-md'}`}
                            >
                                {isSubmitting ? (
                                    <span className="flex items-center justify-center">
                                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Creating...
                                    </span>
                                ) : 'Create Basket'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}