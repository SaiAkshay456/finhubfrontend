// 'use client';

// import { useState, useEffect } from 'react';
// import axiosInstance from '@/helpers/axios';
// import { useRouter } from 'next/navigation';
// import { useRecommendationsData } from '@/hooks/useRecommendationsData';
// export default function CreateBasketModal({ isOpen, onClose }) {
//     const [title, setTitle] = useState('');
//     const [description, setDescription] = useState('');
//     const [threeYearReturn, setThreeYearReturn] = useState('');
//     const [threeYearRisk, setThreeYearRisk] = useState('');
//     const [assetClass, setAssetClass] = useState('');
//     const [route, setRoute] = useState('');
//     const [routes, setRoutes] = useState([]);
//     // const [recommendations, setRecommendations] = useState([]);
//     const [selectedRecommendationIds, setSelectedRecommendationIds] = useState([]);
//     const [isSubmitting, setIsSubmitting] = useState(false);
//     const [three_y_sharpe, setThreeYSharpe] = useState('');
//     const [newRecommendation, setNewRecommendation] = useState('');
//     const [isFetchingRecommendations, setIsFetchingRecommendations] = useState(false);
//     const { recommendations, cmpMap, isLoading } = useRecommendationsData(); // <-- Use the hook
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
//             <div className="bg-white w-full max-w-4xl rounded-xl shadow-xl overflow-y-auto max-h-[80vh]">
//                 {msg && (
//                     <div className={`mx-6 mt-4 p-3 rounded-md border ${msg.toLowerCase().includes('success')
//                         ? 'bg-green-50 border-green-200 text-green-800'
//                         : 'bg-red-50 border-red-200 text-red-800'
//                         }`}>
//                         <div className="flex items-center">
//                             <div className={`flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold ${msg.toLowerCase().includes('success') ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'
//                                 }`}>
//                                 {msg.toLowerCase().includes('success') ? '✓' : '!'}
//                             </div>
//                             <span className="ml-2 text-sm">{msg}</span>
//                         </div>
//                     </div>
//                 )}
//                 <div className="p-6">
//                     <div className="flex justify-between items-center mb-5">
//                         <h2 className="text-2xl font-bold text-gray-800">Create Investment Basket</h2>
//                         <button onClick={onClose} className="text-gray-500 hover:text-gray-700 transition-colors p-1">
//                             <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//                             </svg>
//                         </button>
//                     </div>

//                     <form onSubmit={handleSubmit} className="space-y-4">
//                         <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
//                             <div className="space-y-2">
//                                 <label className="block text-sm font-medium text-gray-700">Basket Name *</label>
//                                 <input
//                                     type="text"
//                                     value={title}
//                                     onChange={(e) => setTitle(e.target.value)}
//                                     required
//                                     className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
//                                     placeholder="e.g. Tech Leaders"
//                                 />
//                             </div>

//                             <div className="space-y-2">
//                                 <label className="block text-sm font-medium text-gray-700">3Y Sharpe *</label>
//                                 <input
//                                     type="text"
//                                     value={three_y_sharpe}
//                                     onChange={(e) => setThreeYSharpe(e.target.value)}
//                                     required
//                                     className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
//                                 />
//                             </div>

//                             <div className="space-y-2">
//                                 <label className="block text-sm font-medium text-gray-700">3Y Return *</label>
//                                 <input
//                                     type="text"
//                                     value={threeYearReturn}
//                                     onChange={(e) => setThreeYearReturn(e.target.value)}
//                                     required
//                                     className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
//                                 />
//                             </div>

//                             <div className="space-y-2">
//                                 <label className="block text-sm font-medium text-gray-700">3Y Risk *</label>
//                                 <select
//                                     value={threeYearRisk}
//                                     onChange={(e) => setThreeYearRisk(e.target.value)}
//                                     required
//                                     className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
//                                 >
//                                     <option value="">Select Risk</option>
//                                     <option value="Low">Low</option>
//                                     <option value="Medium">Medium</option>
//                                     <option value="High">High</option>
//                                 </select>
//                             </div>
//                         </div>

//                         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                             <div className="space-y-2">
//                                 <label className="block text-sm font-medium text-gray-700">Asset Class *</label>
//                                 <select
//                                     value={assetClass}
//                                     onChange={(e) => setAssetClass(e.target.value)}
//                                     className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
//                                 >
//                                     <option value="">Select Asset Class</option>
//                                     {assetClasses.map(cls => (
//                                         <option key={cls} value={cls}>{cls}</option>
//                                     ))}
//                                 </select>
//                             </div>

//                             {routes.length > 0 && (
//                                 <div className="space-y-2">
//                                     <label className="block text-sm font-medium text-gray-700">Route *</label>
//                                     <select
//                                         value={route}
//                                         onChange={(e) => setRoute(e.target.value)}
//                                         className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
//                                     >
//                                         <option value="">Select Route</option>
//                                         {routes.map(r => (
//                                             <option key={r._id} value={r.name}>{r.name}</option>
//                                         ))}
//                                     </select>
//                                 </div>
//                             )}
//                         </div>

//                         {/* {assetClass && route && (
//                             <div className="space-y-2">
//                                 <label className="block text-sm font-medium text-gray-700">Recommendations *</label>
//                                 <div className="flex gap-2">
//                                     <select
//                                         value={newRecommendation}
//                                         onChange={(e) => setNewRecommendation(e.target.value)}
//                                         disabled={isFetchingRecommendations || recommendations.length === 0}
//                                         className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
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
//                                         className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed transition-colors"
//                                     >
//                                         Add
//                                     </button>
//                                 </div>

//                                 {selectedRecommendationIds.length > 0 && (
//                                     <div className="mt-2">
//                                         <div className="border border-gray-200 rounded-lg p-2 max-h-40 overflow-y-auto">
//                                             {selectedRecommendationIds.map(id => {
//                                                 const rec = recommendations.find(r => r._id === id);
//                                                 return (
//                                                     <div key={id} className="flex items-center justify-between py-2 px-3 hover:bg-gray-50 rounded">
//                                                         <span className="text-sm">
//                                                             {rec?.category} ({rec?.riskProfile}) {rec?.status}
//                                                         </span>
//                                                         <button
//                                                             type="button"
//                                                             onClick={() => handleRemoveRecommendation(id)}
//                                                             className="text-red-500 hover:text-red-700 p-1"
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
//                         )} */}
//                         {assetClass && route && (
//                             <div className="space-y-2">
//                                 <label className="block text-sm font-medium text-gray-700">Recommendations *</label>
//                                 <div className="flex gap-2">
//                                     <select
//                                         value={newRecommendation}
//                                         onChange={(e) => setNewRecommendation(e.target.value)}
//                                         disabled={isLoading || recommendations.length === 0}
//                                         className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
//                                     >
//                                         <option value="">
//                                             {isLoading ? 'Loading...' : 'Select Recommendation'}
//                                         </option>
//                                         {recommendations.map(rec => {
//                                             const cmp = cmpMap[rec.mutualFund];
//                                             const cmpDisplay = cmp !== null && cmp !== undefined ? ` (CMP: ₹${cmp})` : '';
//                                             return (
//                                                 <option key={rec._id} value={rec._id}>
//                                                     {rec.name} {cmpDisplay}
//                                                 </option>
//                                             );
//                                         })}
//                                     </select>
//                                     <button
//                                         type="button"
//                                         onClick={handleAddRecommendation}
//                                         disabled={!newRecommendation || selectedRecommendationIds.includes(newRecommendation)}
//                                         className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed transition-colors"
//                                     >
//                                         Add
//                                     </button>
//                                 </div>

//                                 {selectedRecommendationIds.length > 0 && (
//                                     <div className="mt-2">
//                                         <div className="border border-gray-200 rounded-lg p-2 max-h-40 overflow-y-auto">
//                                             {selectedRecommendationIds.map(id => {
//                                                 const rec = recommendations.find(r => r._id === id);
//                                                 const cmp = cmpMap[rec.mutualFund];
//                                                 const cmpDisplay = cmp !== null && cmp !== undefined ? ` (CMP: ₹${cmp})` : '';
//                                                 if (!rec) return null;
//                                                 return (
//                                                     <div key={id} className="flex items-center justify-between py-2 px-3 hover:bg-gray-50 rounded">
//                                                         <span className="text-sm">
//                                                             {rec.name} {cmpDisplay}
//                                                         </span>
//                                                         <button
//                                                             type="button"
//                                                             onClick={() => handleRemoveRecommendation(id)}
//                                                             className="text-red-500 hover:text-red-700 p-1"
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

//                         <div className="space-y-2">
//                             <label className="block text-sm font-medium text-gray-700">Description</label>
//                             <textarea
//                                 rows={3}
//                                 value={description}
//                                 onChange={(e) => setDescription(e.target.value)}
//                                 className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
//                             />
//                         </div>

//                         <div className="flex justify-end pt-4">
//                             <button
//                                 type="submit"
//                                 disabled={isSubmitting}
//                                 className={`px-6 py-2.5 rounded-lg text-white font-medium transition-colors ${isSubmitting
//                                     ? 'bg-blue-400 cursor-not-allowed'
//                                     : 'bg-blue-600 hover:bg-blue-700 shadow-sm hover:shadow-md'}`}
//                             >
//                                 {isSubmitting ? (
//                                     <span className="flex items-center justify-center">
//                                         <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                                             <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                                             <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                                         </svg>
//                                         Creating...
//                                     </span>
//                                 ) : 'Create Basket'}
//                             </button>
//                         </div>
//                     </form>
//                 </div>
//             </div>
//         </div>
//     );
// }


// 'use client';

// import { useState, useEffect } from 'react';
// import axiosInstance from '@/helpers/axios';
// import { useRouter } from 'next/navigation';
// import { useRecommendationsData } from '@/hooks/useRecommendationsData';

// export default function CreateBasketModal({ isOpen, onClose }) {
//     const [title, setTitle] = useState('');
//     const [description, setDescription] = useState('');
//     const [threeYearReturn, setThreeYearReturn] = useState('');
//     const [threeYearRisk, setThreeYearRisk] = useState('');
//     const [assetClass, setAssetClass] = useState('');
//     const [route, setRoute] = useState('');
//     const [routes, setRoutes] = useState([]);
//     const [selectedRecommendationIds, setSelectedRecommendationIds] = useState([]);
//     const [isSubmitting, setIsSubmitting] = useState(false);
//     const [three_y_sharpe, setThreeYSharpe] = useState('');
//     const [newRecommendation, setNewRecommendation] = useState('');
//     const [msg, setMsg] = useState('');
//     const router = useRouter();

//     // Use the custom hook to get the recommendations and CMP map.
//     // The hook handles fetching and real-time updates for you.
//     const { recommendations, cmpMap, isLoading } = useRecommendationsData();

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
//             setSelectedRecommendationIds([]);
//         };

//         fetchRoutes();
//     }, [assetClass]);

//     // This block is no longer needed. The data is now available globally
//     // through the `useRecommendationsData` hook.
//     /*
//     useEffect(() => {
//       // ... old logic removed
//     }, [assetClass, route]);
//     */

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
//             <div className="bg-white w-full max-w-4xl rounded-xl shadow-xl overflow-y-auto max-h-[80vh]">
//                 {msg && (
//                     <div className={`mx-6 mt-4 p-3 rounded-md border ${msg.toLowerCase().includes('success')
//                         ? 'bg-green-50 border-green-200 text-green-800'
//                         : 'bg-red-50 border-red-200 text-red-800'
//                         }`}>
//                         <div className="flex items-center">
//                             <div className={`flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold ${msg.toLowerCase().includes('success') ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'
//                                 }`}>
//                                 {msg.toLowerCase().includes('success') ? '✓' : '!'}
//                             </div>
//                             <span className="ml-2 text-sm">{msg}</span>
//                         </div>
//                     </div>
//                 )}
//                 <div className="p-6">
//                     <div className="flex justify-between items-center mb-5">
//                         <h2 className="text-2xl font-bold text-gray-800">Create Investment Basket</h2>
//                         <button onClick={onClose} className="text-gray-500 hover:text-gray-700 transition-colors p-1">
//                             <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//                             </svg>
//                         </button>
//                     </div>

//                     <form onSubmit={handleSubmit} className="space-y-4">
//                         <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
//                             <div className="space-y-2">
//                                 <label className="block text-sm font-medium text-gray-700">Basket Name *</label>
//                                 <input
//                                     type="text"
//                                     value={title}
//                                     onChange={(e) => setTitle(e.target.value)}
//                                     required
//                                     className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
//                                     placeholder="e.g. Tech Leaders"
//                                 />
//                             </div>

//                             <div className="space-y-2">
//                                 <label className="block text-sm font-medium text-gray-700">3Y Sharpe *</label>
//                                 <input
//                                     type="text"
//                                     value={three_y_sharpe}
//                                     onChange={(e) => setThreeYSharpe(e.target.value)}
//                                     required
//                                     className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
//                                 />
//                             </div>

//                             <div className="space-y-2">
//                                 <label className="block text-sm font-medium text-gray-700">3Y Return *</label>
//                                 <input
//                                     type="text"
//                                     value={threeYearReturn}
//                                     onChange={(e) => setThreeYearReturn(e.target.value)}
//                                     required
//                                     className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
//                                 />
//                             </div>

//                             <div className="space-y-2">
//                                 <label className="block text-sm font-medium text-gray-700">3Y Risk *</label>
//                                 <select
//                                     value={threeYearRisk}
//                                     onChange={(e) => setThreeYearRisk(e.target.value)}
//                                     required
//                                     className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
//                                 >
//                                     <option value="">Select Risk</option>
//                                     <option value="Low">Low</option>
//                                     <option value="Medium">Medium</option>
//                                     <option value="High">High</option>
//                                 </select>
//                             </div>
//                         </div>

//                         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                             <div className="space-y-2">
//                                 <label className="block text-sm font-medium text-gray-700">Asset Class *</label>
//                                 <select
//                                     value={assetClass}
//                                     onChange={(e) => setAssetClass(e.target.value)}
//                                     className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
//                                 >
//                                     <option value="">Select Asset Class</option>
//                                     {assetClasses.map(cls => (
//                                         <option key={cls} value={cls}>{cls}</option>
//                                     ))}
//                                 </select>
//                             </div>

//                             {routes.length > 0 && (
//                                 <div className="space-y-2">
//                                     <label className="block text-sm font-medium text-gray-700">Route *</label>
//                                     <select
//                                         value={route}
//                                         onChange={(e) => setRoute(e.target.value)}
//                                         className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
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
//                             <div className="space-y-2">
//                                 <label className="block text-sm font-medium text-gray-700">Recommendations *</label>
//                                 <div className="flex gap-2">
//                                     <select
//                                         value={newRecommendation}
//                                         onChange={(e) => setNewRecommendation(e.target.value)}
//                                         disabled={isLoading || recommendations.length === 0}
//                                         className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
//                                     >
//                                         <option value="">
//                                             {isLoading ? 'Loading...' : 'Select Recommendation'}
//                                         </option>
//                                         {recommendations.map(rec => {
//                                             const cmp = cmpMap[rec.mutualFund];
//                                             const cmpDisplay = cmp !== null && cmp !== undefined ? ` (CMP: ₹${cmp})` : '';
//                                             return (
//                                                 <option key={rec._id} value={rec._id}>
//                                                     {rec.name} {cmpDisplay}
//                                                 </option>
//                                             );
//                                         })}
//                                     </select>
//                                     <button
//                                         type="button"
//                                         onClick={handleAddRecommendation}
//                                         disabled={!newRecommendation || selectedRecommendationIds.includes(newRecommendation)}
//                                         className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed transition-colors"
//                                     >
//                                         Add
//                                     </button>
//                                 </div>

//                                 {selectedRecommendationIds.length > 0 && (
//                                     <div className="mt-2">
//                                         <div className="border border-gray-200 rounded-lg p-2 max-h-40 overflow-y-auto">
//                                             {selectedRecommendationIds.map(id => {
//                                                 const rec = recommendations.find(r => r._id === id);
//                                                 const cmp = cmpMap[rec?.mutualFund];
//                                                 const cmpDisplay = cmp !== null && cmp !== undefined ? ` (CMP: ₹${cmp})` : '';
//                                                 if (!rec) return null;
//                                                 return (
//                                                     <div key={id} className="flex items-center justify-between py-2 px-3 hover:bg-gray-50 rounded">
//                                                         <span className="text-sm">
//                                                             {rec.name} {cmpDisplay}
//                                                         </span>
//                                                         <button
//                                                             type="button"
//                                                             onClick={() => handleRemoveRecommendation(id)}
//                                                             className="text-red-500 hover:text-red-700 p-1"
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

//                         <div className="space-y-2">
//                             <label className="block text-sm font-medium text-gray-700">Description</label>
//                             <textarea
//                                 rows={3}
//                                 value={description}
//                                 onChange={(e) => setDescription(e.target.value)}
//                                 className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
//                             />
//                         </div>

//                         <div className="flex justify-end pt-4">
//                             <button
//                                 type="submit"
//                                 disabled={isSubmitting}
//                                 className={`px-6 py-2.5 rounded-lg text-white font-medium transition-colors ${isSubmitting
//                                     ? 'bg-blue-400 cursor-not-allowed'
//                                     : 'bg-blue-600 hover:bg-blue-700 shadow-sm hover:shadow-md'}`}
//                             >
//                                 {isSubmitting ? (
//                                     <span className="flex items-center justify-center">
//                                         <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                                             <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                                             <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                                         </svg>
//                                         Creating...
//                                     </span>
//                                 ) : 'Create Basket'}
//                             </button>
//                         </div>
//                     </form>
//                 </div>
//             </div>
//         </div>
//     );
// }



// 'use client';

// import { useState, useEffect } from 'react';
// import axiosInstance from '@/helpers/axios';
// import { useRouter } from 'next/navigation';
// import { useRecommendationsData } from '@/hooks/useRecommendationsData';

// export default function CreateBasketModal({ isOpen, onClose }) {
//     const [title, setTitle] = useState('');
//     const [description, setDescription] = useState('');
//     const [threeYearReturn, setThreeYearReturn] = useState('');
//     const [threeYearRisk, setThreeYearRisk] = useState('');
//     const [assetClass, setAssetClass] = useState('');
//     const [route, setRoute] = useState('');
//     const [routes, setRoutes] = useState([]);
//     const [selectedRecommendationIds, setSelectedRecommendationIds] = useState([]);
//     const [isSubmitting, setIsSubmitting] = useState(false);
//     const [three_y_sharpe, setThreeYSharpe] = useState('');
//     const [newRecommendation, setNewRecommendation] = useState('');
//     const [msg, setMsg] = useState('');
//     const router = useRouter();

//     // The state for recommendations, cmpMap, and isLoading is now managed by this hook.
//     // We no longer need local state variables like `recommendations` or `isFetchingRecommendations`.
//     const { recommendations, cmpMap, isLoading } = useRecommendationsData();

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
//             // No need to set recommendations here, as the hook handles it.
//             setSelectedRecommendationIds([]);
//         };

//         fetchRoutes();
//     }, [assetClass]);

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
//             <div className="bg-white w-full max-w-4xl rounded-xl shadow-xl overflow-y-auto max-h-[80vh]">
//                 {msg && (
//                     <div className={`mx-6 mt-4 p-3 rounded-md border ${msg.toLowerCase().includes('success')
//                         ? 'bg-green-50 border-green-200 text-green-800'
//                         : 'bg-red-50 border-red-200 text-red-800'
//                         }`}>
//                         <div className="flex items-center">
//                             <div className={`flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold ${msg.toLowerCase().includes('success') ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'
//                                 }`}>
//                                 {msg.toLowerCase().includes('success') ? '✓' : '!'}
//                             </div>
//                             <span className="ml-2 text-sm">{msg}</span>
//                         </div>
//                     </div>
//                 )}
//                 <div className="p-6">
//                     <div className="flex justify-between items-center mb-5">
//                         <h2 className="text-2xl font-bold text-gray-800">Create Investment Basket</h2>
//                         <button onClick={onClose} className="text-gray-500 hover:text-gray-700 transition-colors p-1">
//                             <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//                             </svg>
//                         </button>
//                     </div>

//                     <form onSubmit={handleSubmit} className="space-y-4">
//                         <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
//                             <div className="space-y-2">
//                                 <label className="block text-sm font-medium text-gray-700">Basket Name *</label>
//                                 <input
//                                     type="text"
//                                     value={title}
//                                     onChange={(e) => setTitle(e.target.value)}
//                                     required
//                                     className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
//                                     placeholder="e.g. Tech Leaders"
//                                 />
//                             </div>

//                             <div className="space-y-2">
//                                 <label className="block text-sm font-medium text-gray-700">3Y Sharpe *</label>
//                                 <input
//                                     type="text"
//                                     value={three_y_sharpe}
//                                     onChange={(e) => setThreeYSharpe(e.target.value)}
//                                     required
//                                     className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
//                                 />
//                             </div>

//                             <div className="space-y-2">
//                                 <label className="block text-sm font-medium text-gray-700">3Y Return *</label>
//                                 <input
//                                     type="text"
//                                     value={threeYearReturn}
//                                     onChange={(e) => setThreeYearReturn(e.target.value)}
//                                     required
//                                     className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
//                                 />
//                             </div>

//                             <div className="space-y-2">
//                                 <label className="block text-sm font-medium text-gray-700">3Y Risk *</label>
//                                 <select
//                                     value={threeYearRisk}
//                                     onChange={(e) => setThreeYearRisk(e.target.value)}
//                                     required
//                                     className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
//                                 >
//                                     <option value="">Select Risk</option>
//                                     <option value="Low">Low</option>
//                                     <option value="Medium">Medium</option>
//                                     <option value="High">High</option>
//                                 </select>
//                             </div>
//                         </div>

//                         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                             <div className="space-y-2">
//                                 <label className="block text-sm font-medium text-gray-700">Asset Class *</label>
//                                 <select
//                                     value={assetClass}
//                                     onChange={(e) => setAssetClass(e.target.value)}
//                                     className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
//                                 >
//                                     <option value="">Select Asset Class</option>
//                                     {assetClasses.map(cls => (
//                                         <option key={cls} value={cls}>{cls}</option>
//                                     ))}
//                                 </select>
//                             </div>

//                             {routes.length > 0 && (
//                                 <div className="space-y-2">
//                                     <label className="block text-sm font-medium text-gray-700">Route *</label>
//                                     <select
//                                         value={route}
//                                         onChange={(e) => setRoute(e.target.value)}
//                                         className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
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
//                             <div className="space-y-2">
//                                 <label className="block text-sm font-medium text-gray-700">Recommendations *</label>
//                                 <div className="flex gap-2">
//                                     <select
//                                         value={newRecommendation}
//                                         onChange={(e) => setNewRecommendation(e.target.value)}
//                                         // Use the `isLoading` state from the hook.
//                                         disabled={isLoading || recommendations.length === 0}
//                                         className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
//                                     >
//                                         <option value="">
//                                             {isLoading ? 'Loading...' : 'Select Recommendation'}
//                                         </option>
//                                         {recommendations.map(rec => {
//                                             const cmp = cmpMap[rec.mutualFund];
//                                             const cmpDisplay = cmp !== null && cmp !== undefined ? ` (CMP: ₹${cmp})` : '';
//                                             return (
//                                                 <option key={rec._id} value={rec._id}>
//                                                     {rec.name} {cmpDisplay}
//                                                 </option>
//                                             );
//                                         })}
//                                     </select>
//                                     <button
//                                         type="button"
//                                         onClick={handleAddRecommendation}
//                                         disabled={!newRecommendation || selectedRecommendationIds.includes(newRecommendation)}
//                                         className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed transition-colors"
//                                     >
//                                         Add
//                                     </button>
//                                 </div>

//                                 {selectedRecommendationIds.length > 0 && (
//                                     <div className="mt-2">
//                                         <div className="border border-gray-200 rounded-lg p-2 max-h-40 overflow-y-auto">
//                                             {selectedRecommendationIds.map(id => {
//                                                 const rec = recommendations.find(r => r._id === id);
//                                                 const cmp = cmpMap[rec?.mutualFund];
//                                                 const cmpDisplay = cmp !== null && cmp !== undefined ? ` (CMP: ₹${cmp})` : '';
//                                                 if (!rec) return null;
//                                                 return (
//                                                     <div key={id} className="flex items-center justify-between py-2 px-3 hover:bg-gray-50 rounded">
//                                                         <span className="text-sm">
//                                                             {rec.name} {cmpDisplay}
//                                                         </span>
//                                                         <button
//                                                             type="button"
//                                                             onClick={() => handleRemoveRecommendation(id)}
//                                                             className="text-red-500 hover:text-red-700 p-1"
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

//                         <div className="space-y-2">
//                             <label className="block text-sm font-medium text-gray-700">Description</label>
//                             <textarea
//                                 rows={3}
//                                 value={description}
//                                 onChange={(e) => setDescription(e.target.value)}
//                                 className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
//                             />
//                         </div>

//                         <div className="flex justify-end pt-4">
//                             <button
//                                 type="submit"
//                                 disabled={isSubmitting}
//                                 className={`px-6 py-2.5 rounded-lg text-white font-medium transition-colors ${isSubmitting
//                                     ? 'bg-blue-400 cursor-not-allowed'
//                                     : 'bg-blue-600 hover:bg-blue-700 shadow-sm hover:shadow-md'}`}
//                             >
//                                 {isSubmitting ? (
//                                     <span className="flex items-center justify-center">
//                                         <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                                             <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                                             <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                                         </svg>
//                                         Creating...
//                                     </span>
//                                 ) : 'Create Basket'}
//                             </button>
//                         </div>
//                     </form>
//                 </div>
//             </div>
//         </div>
//     );
// }

// 'use client';

// import { useState, useEffect } from 'react';
// import axiosInstance from '@/helpers/axios';
// import { useRouter } from 'next/navigation';
// import { useRecommendationsData } from '@/hooks/useRecommendationsData';
// import Select from 'react-select';

// export default function CreateBasketModal({ isOpen, onClose }) {
//     const [title, setTitle] = useState('');
//     const [description, setDescription] = useState('');
//     const [threeYearReturn, setThreeYearReturn] = useState('');
//     const [threeYearRisk, setThreeYearRisk] = useState('');
//     const [assetClass, setAssetClass] = useState('');
//     const [route, setRoute] = useState('');
//     const [routes, setRoutes] = useState([]);
//     const [selectedRecommendationIds, setSelectedRecommendationIds] = useState([]);
//     const [isSubmitting, setIsSubmitting] = useState(false);
//     const [three_y_sharpe, setThreeYSharpe] = useState('');
//     const [newRecommendation, setNewRecommendation] = useState('');
//     const [msg, setMsg] = useState('');
//     const router = useRouter();

//     const { recommendations, cmpMap, isLoading } = useRecommendationsData();

//     const assetClasses = ['Equity', 'Debt', 'Commodity'].map(cls => ({
//         value: cls,
//         label: cls
//     }));

//     const riskOptions = [
//         { value: '', label: 'Select Risk' },
//         { value: 'Low', label: 'Low' },
//         { value: 'Medium', label: 'Medium' },
//         { value: 'High', label: 'High' }
//     ];

//     useEffect(() => {
//         const fetchRoutes = async () => {
//             if (assetClass) {
//                 try {
//                     const res = await axiosInstance.get(`/v1/model-basket/get/route/${assetClass}`);
//                     setRoutes(res.data.routes.map(r => ({
//                         value: r.name,
//                         label: r.name
//                     })));
//                 } catch (error) {
//                     console.error(error);
//                     setRoutes([]);
//                 }
//             } else {
//                 setRoutes([]);
//             }
//             setRoute('');
//             setSelectedRecommendationIds([]);
//         };

//         fetchRoutes();
//     }, [assetClass]);

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

//     // Prepare options for recommendations select
//     const recommendationOptions = recommendations.map(rec => {
//         const cmp = cmpMap[rec.mutualFund];
//         const cmpDisplay = cmp !== null && cmp !== undefined ? ` (CMP: ₹${cmp})` : '';
//         return {
//             value: rec._id,
//             label: `${rec.name}${cmpDisplay}`
//         };
//     });

//     if (!isOpen) return null;

//     return (
//         <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-4">
//             <div className="bg-white w-full max-w-4xl rounded-xl shadow-xl overflow-y-auto max-h-[80vh]">
//                 {msg && (
//                     <div className={`mx-6 mt-4 p-3 rounded-md border ${msg.toLowerCase().includes('success')
//                         ? 'bg-green-50 border-green-200 text-green-800'
//                         : 'bg-red-50 border-red-200 text-red-800'
//                         }`}>
//                         <div className="flex items-center">
//                             <div className={`flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold ${msg.toLowerCase().includes('success') ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'
//                                 }`}>
//                                 {msg.toLowerCase().includes('success') ? '✓' : '!'}
//                             </div>
//                             <span className="ml-2 text-sm">{msg}</span>
//                         </div>
//                     </div>
//                 )}
//                 <div className="p-6">
//                     <div className="flex justify-between items-center mb-5">
//                         <h2 className="text-2xl font-bold text-gray-800">Create Investment Basket</h2>
//                         <button onClick={onClose} className="text-gray-500 hover:text-gray-700 transition-colors p-1">
//                             <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//                             </svg>
//                         </button>
//                     </div>

//                     <form onSubmit={handleSubmit} className="space-y-4">
//                         <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
//                             <div className="space-y-2">
//                                 <label className="block text-sm font-medium text-gray-700">Basket Name *</label>
//                                 <input
//                                     type="text"
//                                     value={title}
//                                     onChange={(e) => setTitle(e.target.value)}
//                                     required
//                                     className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
//                                     placeholder="e.g. Tech Leaders"
//                                 />
//                             </div>

//                             <div className="space-y-2">
//                                 <label className="block text-sm font-medium text-gray-700">3Y Sharpe *</label>
//                                 <input
//                                     type="text"
//                                     value={three_y_sharpe}
//                                     onChange={(e) => setThreeYSharpe(e.target.value)}
//                                     required
//                                     className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
//                                 />
//                             </div>

//                             <div className="space-y-2">
//                                 <label className="block text-sm font-medium text-gray-700">3Y Return *</label>
//                                 <input
//                                     type="text"
//                                     value={threeYearReturn}
//                                     onChange={(e) => setThreeYearReturn(e.target.value)}
//                                     required
//                                     className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
//                                 />
//                             </div>

//                             <div className="space-y-2">
//                                 <label className="block text-sm font-medium text-gray-700">3Y Risk *</label>
//                                 <Select
//                                     options={riskOptions}
//                                     value={riskOptions.find(option => option.value === threeYearRisk)}
//                                     onChange={(selectedOption) => setThreeYearRisk(selectedOption?.value || '')}
//                                     className="react-select-container"
//                                     classNamePrefix="react-select"
//                                     isSearchable={false}
//                                 />
//                             </div>
//                         </div>

//                         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                             <div className="space-y-2">
//                                 <label className="block text-sm font-medium text-gray-700">Asset Class *</label>
//                                 <Select
//                                     options={assetClasses}
//                                     value={assetClasses.find(option => option.value === assetClass)}
//                                     onChange={(selectedOption) => setAssetClass(selectedOption?.value || '')}
//                                     className="react-select-container"
//                                     classNamePrefix="react-select"
//                                     isSearchable={false}
//                                     placeholder="Select Asset Class"
//                                 />
//                             </div>

//                             {routes.length > 0 && (
//                                 <div className="space-y-2">
//                                     <label className="block text-sm font-medium text-gray-700">Route *</label>
//                                     <Select
//                                         options={routes}
//                                         value={routes.find(option => option.value === route)}
//                                         onChange={(selectedOption) => setRoute(selectedOption?.value || '')}
//                                         className="react-select-container"
//                                         classNamePrefix="react-select"
//                                         isSearchable={false}
//                                         placeholder="Select Route"
//                                     />
//                                 </div>
//                             )}
//                         </div>

//                         {assetClass && route && (
//                             <div className="space-y-2">
//                                 <label className="block text-sm font-medium text-gray-700">Recommendations *</label>
//                                 <div className="flex gap-2">
//                                     <div className="flex-1">
//                                         <Select
//                                             options={recommendationOptions}
//                                             isLoading={isLoading}
//                                             isDisabled={isLoading || recommendations.length === 0}
//                                             placeholder={isLoading ? 'Loading...' : 'Select Recommendation'}
//                                             value={recommendationOptions.find(option => option.value === newRecommendation)}
//                                             onChange={(selectedOption) => setNewRecommendation(selectedOption?.value || '')}
//                                             className="react-select-container"
//                                             classNamePrefix="react-select"
//                                             noOptionsMessage={() => "No recommendations available"}
//                                         />
//                                     </div>
//                                     <button
//                                         type="button"
//                                         onClick={handleAddRecommendation}
//                                         disabled={!newRecommendation || selectedRecommendationIds.includes(newRecommendation)}
//                                         className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed transition-colors"
//                                     >
//                                         Add
//                                     </button>
//                                 </div>

//                                 {selectedRecommendationIds.length > 0 && (
//                                     <div className="mt-2">
//                                         <div className="border border-gray-200 rounded-lg p-2 max-h-40 overflow-y-auto">
//                                             {selectedRecommendationIds.map(id => {
//                                                 const rec = recommendations.find(r => r._id === id);
//                                                 const cmp = cmpMap[rec?.mutualFund];
//                                                 const cmpDisplay = cmp !== null && cmp !== undefined ? ` (CMP: ₹${cmp})` : '';
//                                                 if (!rec) return null;
//                                                 return (
//                                                     <div key={id} className="flex items-center justify-between py-2 px-3 hover:bg-gray-50 rounded">
//                                                         <span className="text-sm">
//                                                             {rec.name}{cmpDisplay}
//                                                         </span>
//                                                         <button
//                                                             type="button"
//                                                             onClick={() => handleRemoveRecommendation(id)}
//                                                             className="text-red-500 hover:text-red-700 p-1"
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

//                         <div className="space-y-2">
//                             <label className="block text-sm font-medium text-gray-700">Description</label>
//                             <textarea
//                                 rows={3}
//                                 value={description}
//                                 onChange={(e) => setDescription(e.target.value)}
//                                 className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
//                             />
//                         </div>

//                         <div className="flex justify-end pt-4">
//                             <button
//                                 type="submit"
//                                 disabled={isSubmitting}
//                                 className={`px-6 py-2.5 rounded-lg text-white font-medium transition-colors ${isSubmitting
//                                     ? 'bg-blue-400 cursor-not-allowed'
//                                     : 'bg-blue-600 hover:bg-blue-700 shadow-sm hover:shadow-md'}`}
//                             >
//                                 {isSubmitting ? (
//                                     <span className="flex items-center justify-center">
//                                         <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                                             <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                                             <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                                         </svg>
//                                         Creating...
//                                     </span>
//                                 ) : 'Create Basket'}
//                             </button>
//                         </div>
//                     </form>
//                 </div>
//             </div>
//         </div>
//     );
// }


// 'use client';

// import { useState, useEffect } from 'react';
// import axiosInstance from '@/helpers/axios';
// import { useRouter } from 'next/navigation';
// import { useRecommendationsData } from '@/hooks/useRecommendationsData';
// import Select from 'react-select';

// export default function CreateBasketModal({ isOpen, onClose }) {
//     const [title, setTitle] = useState('');
//     const [description, setDescription] = useState('');
//     const [threeYearReturn, setThreeYearReturn] = useState('');
//     const [threeYearRisk, setThreeYearRisk] = useState('');
//     const [assetClass, setAssetClass] = useState('');
//     const [route, setRoute] = useState('');
//     const [routes, setRoutes] = useState([]);

//     // State to hold selected recommendations with all calculated data
//     const [selectedRecommendations, setSelectedRecommendations] = useState([]);
//     const [isSubmitting, setIsSubmitting] = useState(false);
//     const [three_y_sharpe, setThreeYSharpe] = useState('');

//     // State for the new basket pricing and recommendation selection logic
//     const [basketPrice, setBasketPrice] = useState('');
//     const [remainingBasketPrice, setRemainingBasketPrice] = useState(null);
//     const [newRecommendationId, setNewRecommendationId] = useState('');
//     const [newRecommendationPercentage, setNewRecommendationPercentage] = useState('');

//     const [msg, setMsg] = useState('');
//     const router = useRouter();

//     const { recommendations, cmpMap, isLoading } = useRecommendationsData();

//     const assetClasses = ['Equity', 'Debt', 'Commodity'].map(cls => ({
//         value: cls,
//         label: cls
//     }));

//     const riskOptions = [
//         { value: 'Low', label: 'Low' },
//         { value: 'Medium', label: 'Medium' },
//         { value: 'High', label: 'High' }
//     ];

//     useEffect(() => {
//         const fetchRoutes = async () => {
//             if (assetClass) {
//                 try {
//                     const res = await axiosInstance.get(`/v1/model-basket/get/route/${assetClass}`);
//                     setRoutes(res.data.routes.map(r => ({
//                         value: r.name,
//                         label: r.name
//                     })));
//                 } catch (error) {
//                     console.error(error);
//                     setRoutes([]);
//                 }
//             } else {
//                 setRoutes([]);
//             }
//             setRoute('');
//             setSelectedRecommendations([]);
//         };

//         fetchRoutes();
//     }, [assetClass]);

//     useEffect(() => {
//         // Initialize remaining basket price when the main basket price is set
//         if (basketPrice && remainingBasketPrice === null) {
//             setRemainingBasketPrice(parseFloat(basketPrice));
//         }
//     }, [basketPrice, remainingBasketPrice]);

//     const handleAddRecommendation = () => {
//         if (!newRecommendationId || !newRecommendationPercentage || !basketPrice) {
//             alert('Please select a recommendation, enter a percentage, and set a basket price.');
//             return;
//         }

//         const percentage = parseFloat(newRecommendationPercentage);
//         if (isNaN(percentage) || percentage <= 0 || percentage > 100) {
//             alert('Please enter a valid percentage between 1 and 100.');
//             return;
//         }

//         if (selectedRecommendations.some(rec => rec._id === newRecommendationId)) {
//             alert('This recommendation is already in the basket.');
//             return;
//         }

//         const rec = recommendations.find(r => r._id === newRecommendationId);
//         if (!rec) return;

//         const cmp = cmpMap[rec.mutualFund];
//         if (!cmp) {
//             alert(`CMP for ${rec.name} is not available. Please try again.`);
//             return;
//         }

//         const allocationAmount = (percentage / 100) * parseFloat(basketPrice);

//         if (allocationAmount > remainingBasketPrice) {
//             alert(`Allocation amount (₹${allocationAmount.toFixed(2)}) exceeds the remaining basket price (₹${remainingBasketPrice.toFixed(2)}).`);
//             return;
//         }

//         const quantity = Math.ceil(allocationAmount / cmp);

//         const newSelectedRec = {
//             ...rec,
//             percentage: percentage,
//             cmp: cmp,
//             quantity: quantity,
//             allocation: quantity * cmp,
//         };

//         setSelectedRecommendations(prev => [...prev, newSelectedRec]);
//         setRemainingBasketPrice(prev => prev - newSelectedRec.allocation);
//         setNewRecommendationId('');
//         setNewRecommendationPercentage('');
//     };

//     const handleRemoveRecommendation = (_id) => {
//         const recToRemove = selectedRecommendations.find(rec => rec._id === _id);
//         if (!recToRemove) return;

//         setSelectedRecommendations(prev => prev.filter(rec => rec._id !== _id));
//         setRemainingBasketPrice(prev => prev + recToRemove.allocation);
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         if (!title.trim()) return alert('Basket Name is required');
//         if (!assetClass || !route || selectedRecommendations.length === 0) {
//             return alert('Please select Asset Class, Route, and at least one Recommendation.');
//         }

//         setIsSubmitting(true);
//         try {
//             const recommendationsPayload = selectedRecommendations.map(rec => ({
//                 _id: rec._id, // Send the recommendation's original ID
//                 cmp: rec.cmp,
//                 quantity: rec.quantity,
//                 percentage: rec.percentage,
//             }));

//             const res = await axiosInstance.post('/v1/model-basket/create-basket', {
//                 title,
//                 description,
//                 threeYearReturn,
//                 threeYearRisk,
//                 assetClass,
//                 route,
//                 three_y_sharpe,
//                 basketPrice: parseFloat(basketPrice),
//                 recommendations: recommendationsPayload,
//             });

//             if (res.data.success) {
//                 setMsg(res.data.message);
//                 setTitle('');
//                 setDescription('');
//                 setAssetClass('');
//                 setRoute('');
//                 setBasketPrice('');
//                 setRemainingBasketPrice(null);
//                 setSelectedRecommendations([]);
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

//     const recommendationOptions = recommendations.map(rec => {
//         const cmp = cmpMap[rec.mutualFund];
//         const cmpDisplay = cmp !== null && cmp !== undefined ? ` (CMP: ₹${cmp})` : '';
//         return {
//             value: rec._id,
//             label: `${rec.name}${cmpDisplay}`
//         };
//     });

//     if (!isOpen) return null;

//     return (
//         <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-4">
//             <div className="bg-white w-full max-w-4xl rounded-xl shadow-xl overflow-y-auto max-h-[80vh]">
//                 {msg && (
//                     <div className={`mx-6 mt-4 p-3 rounded-md border ${msg.toLowerCase().includes('success') ? 'bg-green-50 border-green-200 text-green-800' : 'bg-red-50 border-red-200 text-red-800'}`}>
//                         <div className="flex items-center">
//                             <div className={`flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold ${msg.toLowerCase().includes('success') ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'}`}>
//                                 {msg.toLowerCase().includes('success') ? '✓' : '!'}
//                             </div>
//                             <span className="ml-2 text-sm">{msg}</span>
//                         </div>
//                     </div>
//                 )}
//                 <div className="p-6">
//                     <div className="flex justify-between items-center mb-5">
//                         <h2 className="text-2xl font-bold text-gray-800">Create Investment Basket</h2>
//                         <button onClick={onClose} className="text-gray-500 hover:text-gray-700 transition-colors p-1">
//                             <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//                             </svg>
//                         </button>
//                     </div>

//                     <form onSubmit={handleSubmit} className="space-y-4">
//                         <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
//                             <div className="space-y-2">
//                                 <label className="block text-sm font-medium text-gray-700">Basket Name *</label>
//                                 <input
//                                     type="text"
//                                     value={title}
//                                     onChange={(e) => setTitle(e.target.value)}
//                                     required
//                                     className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
//                                     placeholder="e.g. Tech Leaders"
//                                 />
//                             </div>

//                             <div className="space-y-2">
//                                 <label className="block text-sm font-medium text-gray-700">3Y Sharpe *</label>
//                                 <input
//                                     type="text"
//                                     value={three_y_sharpe}
//                                     onChange={(e) => setThreeYSharpe(e.target.value)}
//                                     required
//                                     className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
//                                 />
//                             </div>

//                             <div className="space-y-2">
//                                 <label className="block text-sm font-medium text-gray-700">3Y Return *</label>
//                                 <input
//                                     type="text"
//                                     value={threeYearReturn}
//                                     onChange={(e) => setThreeYearReturn(e.target.value)}
//                                     required
//                                     className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
//                                 />
//                             </div>

//                             <div className="space-y-2">
//                                 <label className="block text-sm font-medium text-gray-700">3Y Risk *</label>
//                                 <Select
//                                     options={riskOptions}
//                                     value={riskOptions.find(option => option.value === threeYearRisk)}
//                                     onChange={(selectedOption) => setThreeYearRisk(selectedOption?.value || '')}
//                                     className="react-select-container"
//                                     classNamePrefix="react-select"
//                                     isSearchable={false}
//                                 />
//                             </div>
//                         </div>

//                         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                             <div className="space-y-2">
//                                 <label className="block text-sm font-medium text-gray-700">Asset Class *</label>
//                                 <Select
//                                     options={assetClasses}
//                                     value={assetClasses.find(option => option.value === assetClass)}
//                                     onChange={(selectedOption) => setAssetClass(selectedOption?.value || '')}
//                                     className="react-select-container"
//                                     classNamePrefix="react-select"
//                                     isSearchable={false}
//                                     placeholder="Select Asset Class"
//                                 />
//                             </div>

//                             {routes.length > 0 && (
//                                 <div className="space-y-2">
//                                     <label className="block text-sm font-medium text-gray-700">Route *</label>
//                                     <Select
//                                         options={routes}
//                                         value={routes.find(option => option.value === route)}
//                                         onChange={(selectedOption) => setRoute(selectedOption?.value || '')}
//                                         className="react-select-container"
//                                         classNamePrefix="react-select"
//                                         isSearchable={false}
//                                         placeholder="Select Route"
//                                     />
//                                 </div>
//                             )}
//                         </div>

//                         <div className="space-y-2">
//                             <label className="block text-sm font-medium text-gray-700">Universal Basket Price *</label>
//                             <input
//                                 type="number"
//                                 value={basketPrice}
//                                 onChange={(e) => setBasketPrice(e.target.value)}
//                                 required
//                                 min="0"
//                                 className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
//                                 placeholder="e.g. 10000"
//                             />
//                             {basketPrice && remainingBasketPrice !== null && (
//                                 <p className="text-sm text-gray-500 mt-1">
//                                     Remaining Price: ₹{remainingBasketPrice.toFixed(2)}
//                                 </p>
//                             )}
//                         </div>

//                         {basketPrice && assetClass && route && (
//                             <>
//                                 <div className="space-y-2">
//                                     <label className="block text-sm font-medium text-gray-700">Add Recommendations *</label>
//                                     <div className="flex items-center gap-2">
//                                         <div className="flex-1">
//                                             <Select
//                                                 options={recommendationOptions}
//                                                 isLoading={isLoading}
//                                                 isDisabled={isLoading || recommendations.length === 0}
//                                                 placeholder={isLoading ? 'Loading...' : 'Select Recommendation'}
//                                                 value={recommendationOptions.find(option => option.value === newRecommendationId)}
//                                                 onChange={(selectedOption) => setNewRecommendationId(selectedOption?.value || '')}
//                                                 className="react-select-container"
//                                                 classNamePrefix="react-select"
//                                                 noOptionsMessage={() => "No recommendations available"}
//                                             />
//                                         </div>
//                                         <input
//                                             type="number"
//                                             value={newRecommendationPercentage}
//                                             onChange={(e) => setNewRecommendationPercentage(e.target.value)}
//                                             min="1"
//                                             max="100"
//                                             placeholder="%"
//                                             className="w-20 px-3 py-2 border border-gray-300 rounded-lg text-sm"
//                                         />
//                                         <button
//                                             type="button"
//                                             onClick={handleAddRecommendation}
//                                             disabled={!newRecommendationId || !newRecommendationPercentage}
//                                             className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed transition-colors"
//                                         >
//                                             Add
//                                         </button>
//                                     </div>
//                                 </div>

//                                 {selectedRecommendations.length > 0 && (
//                                     <div className="mt-2">
//                                         <p className="text-sm font-medium text-gray-700 mb-2">Selected Recommendations:</p>
//                                         <div className="border border-gray-200 rounded-lg p-2 max-h-40 overflow-y-auto">
//                                             {selectedRecommendations.map(rec => (
//                                                 <div key={rec._id} className="flex items-center justify-between py-2 px-3 hover:bg-gray-50 rounded">
//                                                     <span className="text-sm text-gray-800">
//                                                         {rec.name} ({rec.percentage}%) - **{rec.quantity} units** @ ₹{rec.cmp}
//                                                     </span>
//                                                     <button
//                                                         type="button"
//                                                         onClick={() => handleRemoveRecommendation(rec._id)}
//                                                         className="text-red-500 hover:text-red-700 p-1"
//                                                     >
//                                                         <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                                                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//                                                         </svg>
//                                                     </button>
//                                                 </div>
//                                             ))}
//                                         </div>
//                                     </div>
//                                 )}
//                             </>
//                         )}

//                         <div className="space-y-2">
//                             <label className="block text-sm font-medium text-gray-700">Description</label>
//                             <textarea
//                                 rows={3}
//                                 value={description}
//                                 onChange={(e) => setDescription(e.target.value)}
//                                 className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
//                             />
//                         </div>

//                         <div className="flex justify-end pt-4">
//                             <button
//                                 type="submit"
//                                 disabled={isSubmitting}
//                                 className={`px-6 py-2.5 rounded-lg text-white font-medium transition-colors ${isSubmitting
//                                     ? 'bg-blue-400 cursor-not-allowed'
//                                     : 'bg-blue-600 hover:bg-blue-700 shadow-sm hover:shadow-md'}`}
//                             >
//                                 {isSubmitting ? (
//                                     <span className="flex items-center justify-center">
//                                         <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                                             <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                                             <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                                         </svg>
//                                         Creating...
//                                     </span>
//                                 ) : 'Create Basket'}
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
import { useRecommendationsData } from '@/hooks/useRecommendationsData';
import Select from 'react-select';
import { AlertCircle, CheckCircle2 } from 'lucide-react';
import axios from '@/lib/api';

export default function CreateBasketModal({ isOpen, onClose }) {
    // Basic basket details
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [threeYearReturn, setThreeYearReturn] = useState('');
    const [threeYearRisk, setThreeYearRisk] = useState('');
    const [assetClass, setAssetClass] = useState('');
    const [route, setRoute] = useState('');
    const [routes, setRoutes] = useState([]);

    // Recommendations state, now storing calculated quantities and percentages
    const [selectedRecommendations, setSelectedRecommendations] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [three_y_sharpe, setThreeYSharpe] = useState('');

    // State for the new allocation logic
    const [basketPrice, setBasketPrice] = useState('');
    const [remainingBasketPrice, setRemainingBasketPrice] = useState(null);
    const [newRecommendationId, setNewRecommendationId] = useState('');
    const [newRecommendationPercentage, setNewRecommendationPercentage] = useState('');

    // New state to track total percentage allocation
    const [totalAllocatedPercentage, setTotalAllocatedPercentage] = useState(0);

    // Message state now includes a type for styling
    const [msg, setMsg] = useState(null);
    const router = useRouter();

    // Use the custom hook to get real-time recommendations and CMPs
    const { recommendations, cmpMap, isLoading } = useRecommendationsData();

    // Options for react-select dropdowns
    const assetClasses = ['Equity', 'Debt', 'Commodity'].map(cls => ({
        value: cls,
        label: cls
    }));

    const riskOptions = [
        { value: 'Low', label: 'Low' },
        { value: 'Medium', label: 'Medium' },
        { value: 'High', label: 'High' }
    ];

    // Helper function to display messages
    const showMessage = (text, type) => {
        setMsg({ text, type });
        // Automatically clear the message after 5 seconds

        setMsg(null);

    };

    // Fetch routes based on asset class selection
    useEffect(() => {
        const fetchRoutes = async () => {
            if (assetClass) {
                try {
                    const res = await axios.get(`/v1/model-basket/get/route/${assetClass}`);
                    setRoutes(res.data.routes.map(r => ({
                        value: r.name,
                        label: r.name
                    })));
                } catch (error) {
                    console.error(error);
                    setRoutes([]);
                    showMessage('Failed to fetch routes. Please try again.', 'error');
                }
            } else {
                setRoutes([]);
            }
            setRoute('');
            setSelectedRecommendations([]);
        };

        fetchRoutes();
    }, [assetClass]);

    // This effect initializes the remaining basket price when the user first sets the total basket price.
    useEffect(() => {
        if (basketPrice && remainingBasketPrice === null) {
            setRemainingBasketPrice(parseFloat(basketPrice));
        }
    }, [basketPrice, remainingBasketPrice]);

    const handleAddRecommendation = () => {
        // Validation to ensure all required fields are filled
        if (!newRecommendationId || newRecommendationPercentage === '' || !basketPrice) {
            showMessage('Please select a recommendation, enter a percentage, and set a basket price.', 'warning');
            return;
        }

        const percentage = parseFloat(newRecommendationPercentage);
        if (isNaN(percentage) || percentage <= 0 || percentage > 100) {
            showMessage('Please enter a valid percentage between 1 and 100.', 'warning');
            return;
        }

        // Check for duplicate recommendations
        if (selectedRecommendations.some(rec => rec._id === newRecommendationId)) {
            showMessage('This recommendation is already in the basket.', 'warning');
            return;
        }

        // Check if the new percentage exceeds the remaining allocation
        const newTotalPercentage = totalAllocatedPercentage + percentage;
        if (newTotalPercentage > 100) {
            showMessage(`Adding this recommendation would exceed 100% allocation. You can only allocate ${100 - totalAllocatedPercentage}% more.`, 'warning');
            return;
        }

        const rec = recommendations.find(r => r._id === newRecommendationId);
        if (!rec) return;

        const cmp = cmpMap[rec.mutualFund];
        if (!cmp) {
            showMessage(`CMP for ${rec.name} is not available. Please try again.`, 'error');
            return;
        }

        // Calculate the allocation based on the original universal basket price
        const allocationAmount = (percentage / 100) * parseFloat(basketPrice);

        // Calculate the quantity, rounding up to the nearest whole number.
        const quantity = Math.ceil(allocationAmount / cmp);

        // Calculate the actual cost based on the integer quantity.
        const actualCost = quantity * cmp;

        // This check is a safeguard, but the percentage check should prevent this from being triggered
        if (actualCost > remainingBasketPrice) {
            showMessage(`The actual cost of this allocation (₹${actualCost.toFixed(2)}) exceeds the remaining basket price (₹${remainingBasketPrice.toFixed(2)}). Please use a lower percentage or increase the basket price.`, 'warning');
            return;
        }

        // Create a new object with all calculated data to store in state.
        const newSelectedRec = {
            ...rec,
            percentage: percentage,
            cmp: cmp,
            quantity: quantity,
            allocation: actualCost,
        };

        setSelectedRecommendations(prev => [...prev, newSelectedRec]);
        setTotalAllocatedPercentage(newTotalPercentage);
        // Update the remaining basket price by subtracting the actual cost.
        setRemainingBasketPrice(prev => prev - actualCost);

        // Reset the selection fields for the next entry.
        setNewRecommendationId('');
        setNewRecommendationPercentage('');
        showMessage(`Recommendation '${rec.name}' added successfully.`, 'success');
    };

    const handleRemoveRecommendation = (_id) => {
        const recToRemove = selectedRecommendations.find(rec => rec._id === _id);
        if (!recToRemove) return;

        setSelectedRecommendations(prev => prev.filter(rec => rec._id !== _id));
        // When a recommendation is removed, add its percentage and actual cost back to the totals.
        setTotalAllocatedPercentage(prev => prev - recToRemove.percentage);
        setRemainingBasketPrice(prev => prev + recToRemove.allocation);
        showMessage(`Recommendation '${recToRemove.name}' removed from basket.`, 'success');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!title.trim()) {
            showMessage('Basket Name is required.', 'warning');
            return;
        }
        if (!assetClass || !route) {
            showMessage('Please select an Asset Class and a Route.', 'warning');
            return;
        }
        if (selectedRecommendations.length === 0) {
            showMessage('Please add at least one recommendation to the basket.', 'warning');
            return;
        }
        if (totalAllocatedPercentage < 100) {
            showMessage(`Basket is only ${totalAllocatedPercentage}% allocated. Please complete the allocation before submitting.`, 'warning');
            return;
        }

        setIsSubmitting(true);
        try {
            // Prepare the payload for the backend with calculated data.
            const recommendationsPayload = selectedRecommendations.map(rec => ({
                _id: rec._id, // Send the recommendation's original ID
                cmp: rec.cmp,
                quantity: rec.quantity,
                percentage: rec.percentage,
            }));

            const res = await axios.post('/v1/model-basket/create-basket', {
                title,
                description,
                threeYearReturn,
                threeYearRisk,
                assetClass,
                route,
                three_y_sharpe,
                basketPrice: parseFloat(basketPrice),
                recommendations: recommendationsPayload,
            });

            if (res.data.success) {
                // Display success message and then close the modal
                showMessage(res.data.message, 'success');
                setTitle('');
                setDescription('');
                setAssetClass('');
                setRoute('');
                setBasketPrice('');
                setRemainingBasketPrice(null);
                setTotalAllocatedPercentage(0);
                setSelectedRecommendations([]);
                onClose();
                router.refresh();
            } else {
                throw new Error(res.data.message || 'Failed to create basket');
            }
        } catch (error) {
            console.error(error);
            showMessage('An error occurred. Please check the console for details.', 'error');
        } finally {
            setIsSubmitting(false);
        }
    };

    const recommendationOptions = recommendations.map(rec => {
        const cmp = cmpMap[rec.mutualFund];
        const cmpDisplay = cmp !== null && cmp !== undefined ? ` (CMP: ₹${cmp})` : '';
        return {
            value: rec._id,
            label: `${rec.name}${cmpDisplay}`
        };
    });

    // Calculate the remaining percentage to allocate
    const remainingPercentage = 100 - totalAllocatedPercentage;
    const isAllocationComplete = totalAllocatedPercentage === 100;

    if (!isOpen) return null;

    // Define a map for message styles
    const messageStyles = {
        success: 'bg-green-50 border-green-200 text-green-800',
        warning: 'bg-yellow-50 border-yellow-200 text-yellow-800',
        error: 'bg-red-50 border-red-200 text-red-800',
    };

    const messageIconStyles = {
        success: 'bg-green-200 text-green-800',
        warning: 'bg-yellow-200 text-yellow-800',
        error: 'bg-red-200 text-red-800',
    };

    return (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white w-full max-w-4xl rounded-xl shadow-xl overflow-y-auto max-h-[80vh]">
                {msg && (
                    <div className={`mx-6 mt-4 p-3 rounded-md border ${messageStyles[msg.type]}`}>
                        <div className="flex items-center">
                            <div className={`flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold ${messageIconStyles[msg.type]}`}>
                                {msg.type === 'success' ? <CheckCircle2 size={16} /> : <AlertCircle size={16} />}
                            </div>
                            <span className="ml-2 text-sm">{msg.text}</span>
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
                                <Select
                                    options={riskOptions}
                                    value={riskOptions.find(option => option.value === threeYearRisk)}
                                    onChange={(selectedOption) => setThreeYearRisk(selectedOption?.value || '')}
                                    className="react-select-container"
                                    classNamePrefix="react-select"
                                    isSearchable={false}
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-700">Asset Class *</label>
                                <Select
                                    options={assetClasses}
                                    value={assetClasses.find(option => option.value === assetClass)}
                                    onChange={(selectedOption) => setAssetClass(selectedOption?.value || '')}
                                    className="react-select-container"
                                    classNamePrefix="react-select"
                                    isSearchable={false}
                                    placeholder="Select Asset Class"
                                />
                            </div>

                            {routes.length > 0 && (
                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-gray-700">Route *</label>
                                    <Select
                                        options={routes}
                                        value={routes.find(option => option.value === route)}
                                        onChange={(selectedOption) => setRoute(selectedOption?.value || '')}
                                        className="react-select-container"
                                        classNamePrefix="react-select"
                                        isSearchable={false}
                                        placeholder="Select Route"
                                    />
                                </div>
                            )}
                        </div>

                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">Basket Price *</label>
                            <input
                                type="number"
                                value={basketPrice}
                                onChange={(e) => {
                                    setBasketPrice(e.target.value);
                                    setRemainingBasketPrice(parseFloat(e.target.value));
                                }}
                                required
                                min="0"
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                                placeholder="e.g. 10000"
                                disabled={selectedRecommendations.length > 0}
                            />
                            {basketPrice && remainingBasketPrice !== null && (
                                <p className="text-sm text-gray-500 mt-1">
                                    Remaining Price: ₹{remainingBasketPrice.toFixed(2)}
                                </p>
                            )}
                        </div>

                        {basketPrice && assetClass && route && (
                            <>
                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-gray-700">Add Recommendations *</label>
                                    <div className="flex items-center gap-2">
                                        <div className="flex-1">
                                            <Select
                                                options={recommendationOptions}
                                                isLoading={isLoading}
                                                isDisabled={isLoading || recommendations.length === 0 || isAllocationComplete}
                                                placeholder={isLoading ? 'Loading...' : 'Select Recommendation'}
                                                value={recommendationOptions.find(option => option.value === newRecommendationId)}
                                                onChange={(selectedOption) => setNewRecommendationId(selectedOption?.value || '')}
                                                className="react-select-container"
                                                classNamePrefix="react-select"
                                                noOptionsMessage={() => "No recommendations available"}
                                            />
                                        </div>
                                        <input
                                            type="number"
                                            value={newRecommendationPercentage}
                                            onChange={(e) => setNewRecommendationPercentage(e.target.value)}
                                            min="1"
                                            max={100 - totalAllocatedPercentage} // Max value is the remaining percentage
                                            placeholder="%"
                                            className="w-20 px-3 py-2 border border-gray-300 rounded-lg text-sm"
                                            disabled={isAllocationComplete}
                                        />
                                        <button
                                            type="button"
                                            onClick={handleAddRecommendation}
                                            disabled={!newRecommendationId || !newRecommendationPercentage || isAllocationComplete}
                                            className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed transition-colors"
                                        >
                                            Add
                                        </button>
                                    </div>
                                    <div className="mt-2 text-sm">
                                        <span className="font-medium">Total Allocated: </span>
                                        <span className={totalAllocatedPercentage === 100 ? 'text-green-600' : 'text-gray-800'}>{totalAllocatedPercentage}%</span>
                                        <span className="font-medium ml-4">Remaining to Allocate: </span>
                                        <span className={remainingPercentage === 0 ? 'text-green-600' : 'text-red-500'}>
                                            {remainingPercentage}%
                                        </span>
                                    </div>
                                </div>

                                {isAllocationComplete && (
                                    <div className="mt-4 p-3 rounded-md border bg-green-50 border-green-200 text-green-800 flex items-center gap-2">
                                        <CheckCircle2 size={16} />
                                        <span className="text-sm font-medium">
                                            Basket is fully allocated. You can now submit or remove a recommendation to adjust the allocation.
                                        </span>
                                    </div>
                                )}

                                {selectedRecommendations.length > 0 && (
                                    <div className="mt-2">
                                        <p className="text-sm font-medium text-gray-700 mb-2">Selected Recommendations:</p>
                                        <div className="border border-gray-200 rounded-lg p-2 max-h-40 overflow-y-auto">
                                            {selectedRecommendations.map(rec => (
                                                <div key={rec._id} className="flex items-center justify-between py-2 px-3 hover:bg-gray-50 rounded">
                                                    <span className="text-sm text-gray-800">
                                                        {rec.name} ({rec.percentage}%) - {rec.quantity} units @ ₹{rec.cmp}
                                                    </span>
                                                    <button
                                                        type="button"
                                                        onClick={() => handleRemoveRecommendation(rec._id)}
                                                        className="text-red-500 hover:text-red-700 p-1"
                                                    >
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                                        </svg>
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </>
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
                                disabled={isSubmitting || !isAllocationComplete}
                                className={`px-6 py-2.5 rounded-lg text-white font-medium transition-colors ${isSubmitting || !isAllocationComplete
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
