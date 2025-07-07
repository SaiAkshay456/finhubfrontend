// // 'use client';

// // import React, { useState } from 'react';
// // import { sidebarItems } from '../constants/sidebarRoutes';
// // const MultiStepForm = () => {
// //     const [step, setStep] = useState(1);
// //     const [errors, setErrors] = useState({});
// //     const [msg, setMsg] = useState('');
// //     const initialFormData = {
// //         firstName: '',
// //         lastName: '',
// //         dob: '',
// //         gender: '',
// //         username: '',
// //         password: '',
// //         phoneNumber: '',
// //         email: '',
// //         houseAddress: '',
// //         panNumber: '',
// //         aadharNumber: '',
// //         kycNumber: '',
// //         sidebar: [
// //             { label: 'Users', access: false },
// //             { label: 'Dashboard', access: false },
// //             { label: 'Create User', access: false },
// //             { label: 'Model Basket', access: false },
// //             { label: 'KYC Verification', access: false }
// //         ]
// //     };

// //     const [formData, setFormData] = useState(initialFormData);


// //     const validateStep = (step) => {
// //         const newErrors = {};
// //         if (step === 1) {
// //             if (!formData.firstName) newErrors.firstName = 'First name is required';
// //             if (!formData.lastName) newErrors.lastName = 'Last name is required';
// //             if (!formData.dob) newErrors.dob = 'Date of birth is required';
// //             if (!formData.username) newErrors.username = 'Username is required';
// //             if (!formData.password) newErrors.password = 'Password is required';
// //             else if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
// //         }
// //         if (step === 2) {
// //             if (!formData.phoneNumber) newErrors.phoneNumber = 'Phone number is required';
// //             else if (!/^\d{10}$/.test(formData.phoneNumber)) newErrors.phoneNumber = 'Invalid phone number';

// //             if (!formData.email) newErrors.email = 'Email is required';
// //             else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Invalid email format';
// //         }
// //         if (step === 3) {
// //             if (!formData.panNumber) newErrors.panNumber = 'PAN number is required';
// //             if (!formData.aadharNumber) newErrors.aadharNumber = 'Aadhar number is required';
// //         }
// //         if (step === 4) {
// //             const hasAccess = formData.sidebar.some(route => route.access);
// //             if (!hasAccess) newErrors.sidebar = 'At least one route must be selected';
// //         }
// //         setErrors(newErrors);
// //         return Object.keys(newErrors).length === 0;
// //     };

// //     const handleChange = (e) => {
// //         const { name, value } = e.target;
// //         setFormData(prev => ({ ...prev, [name]: value }));
// //         if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
// //     };

// //     const toggleRouteAccess = (index) => {
// //         const updatedRoutes = [...formData.sidebar];
// //         updatedRoutes[index].access = !updatedRoutes[index].access;
// //         setFormData(prev => ({ ...prev, sidebar: updatedRoutes }));
// //     };

// //     const nextStep = () => {
// //         if (validateStep(step)) {
// //             setStep(prev => prev + 1);
// //         }
// //     };

// //     const prevStep = () => setStep(prev => prev - 1);


// //     const handleSubmit = async (e) => {
// //         e.preventDefault();
// //         if (!validateStep(4)) return;
// //         try {
// //             const res = await fetch('http://localhost:3030/api/v1/adminuse/create-user', {
// //                 method: 'POST',
// //                 headers: { 'Content-Type': 'application/json' },
// //                 body: JSON.stringify(formData),
// //                 credentials: "include",
// //             });

// //             const data = await res.json();
// //             if (res.ok) {
// //                 setFormData(initialFormData);
// //             }
// //             setMsg(data.message);
// //         }
// //         catch (err) {
// //             console.log(err)
// //         }
// //     };
// //     return (
// //         <div className="w-full mx-auto p-4 sm:p-6 max-w-4xl">
// //             <div className="bg-white rounded-lg shadow-md overflow-hidden">
// //                 <div className="px-4 sm:px-6 py-4 bg-gray-50 border-b">
// //                     <div className="flex items-center justify-between overflow-x-auto pb-2">
// //                         {[1, 2, 3, 4].map((stepNumber) => (
// //                             <div key={stepNumber} className="flex flex-col items-center flex-shrink-0 min-w-[70px]">
// //                                 <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-xs sm:text-sm font-medium
// //                                     ${step >= stepNumber ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'}`}>
// //                                     {stepNumber}
// //                                 </div>
// //                                 <span className="text-xs mt-1 sm:mt-2 text-gray-500 text-center">
// //                                     {['Personal', 'Contact', 'KYC', 'Access'][stepNumber - 1]}
// //                                 </span>
// //                             </div>
// //                         ))}
// //                     </div>
// //                 </div>

// //                 <div className="p-4 sm:p-6">
// //                     {Object.values(errors).some(e => e) && (
// //                         <div className="mb-4 p-3 bg-red-50 text-red-600 text-sm rounded border border-red-100">
// //                             Please fix the errors before proceeding
// //                         </div>
// //                     )}

// //                     <form onSubmit={handleSubmit} className="space-y-4">
// //                         {step === 1 && (
// //                             <div className="space-y-4">
// //                                 <h3 className="text-lg font-medium text-gray-800">Personal Information</h3>
// //                                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
// //                                     <input name="firstName" placeholder="First Name" value={formData.firstName} onChange={handleChange} className={`px-3 py-2 border rounded-lg ${errors.firstName ? 'border-red-500' : 'border-gray-300'}`} />
// //                                     <input name="lastName" placeholder="Last Name" value={formData.lastName} onChange={handleChange} className={`px-3 py-2 border rounded-lg ${errors.lastName ? 'border-red-500' : 'border-gray-300'}`} />
// //                                     <input type="date" name="dob" value={formData.dob} onChange={handleChange} className={`px-3 py-2 border rounded-lg ${errors.dob ? 'border-red-500' : 'border-gray-300'}`} />
// //                                     <select name="gender" value={formData.gender} onChange={handleChange} className="px-3 py-2 border border-gray-300 rounded-lg">
// //                                         <option value="">Select Gender</option>
// //                                         <option value="Male">Male</option>
// //                                         <option value="Female">Female</option>
// //                                         <option value="Not to Prefer">Other</option>
// //                                         {/* "Male", "Female", "Not to Prefer" */}
// //                                     </select>
// //                                     <input name="username" placeholder="Username" value={formData.username} onChange={handleChange} className={`px-3 py-2 border rounded-lg ${errors.username ? 'border-red-500' : 'border-gray-300'}`} />
// //                                     <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} className={`px-3 py-2 border rounded-lg ${errors.password ? 'border-red-500' : 'border-gray-300'}`} />
// //                                 </div>
// //                             </div>
// //                         )}

// //                         {step === 2 && (
// //                             <div className="space-y-4">
// //                                 <h3 className="text-lg font-medium text-gray-800">Contact Information</h3>
// //                                 <input name="phoneNumber" placeholder="Phone Number" value={formData.phoneNumber} onChange={handleChange} className={`w-full px-3 py-2 border rounded-lg ${errors.phoneNumber ? 'border-red-500' : 'border-gray-300'}`} />
// //                                 <input name="email" type="email" placeholder="Email" value={formData.email} onChange={handleChange} className={`w-full px-3 py-2 border rounded-lg ${errors.email ? 'border-red-500' : 'border-gray-300'}`} />
// //                                 <textarea name="houseAddress" placeholder="Address" value={formData.houseAddress} onChange={handleChange} rows={3} className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
// //                             </div>
// //                         )}

// //                         {step === 3 && (
// //                             <div className="space-y-4">
// //                                 <h3 className="text-lg font-medium text-gray-800">KYC Information</h3>
// //                                 <input name="panNumber" placeholder="PAN Number" value={formData.panNumber} onChange={handleChange} className={`w-full px-3 py-2 border rounded-lg ${errors.panNumber ? 'border-red-500' : 'border-gray-300'}`} />
// //                                 <input name="aadharNumber" placeholder="Aadhar Number" value={formData.aadharNumber} onChange={handleChange} className={`w-full px-3 py-2 border rounded-lg ${errors.aadharNumber ? 'border-red-500' : 'border-gray-300'}`} />
// //                                 <input name="kycNumber" placeholder="KYC Number (optional)" value={formData.kycNumber} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
// //                             </div>
// //                         )}

// //                         {step === 4 && (
// //                             <div className="space-y-4">
// //                                 <h3 className="text-lg font-medium text-gray-800">Route Access Permissions</h3>
// //                                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
// //                                     {formData.sidebar.map((route, index) => (
// //                                         <div key={index} className="flex items-center p-3 border rounded-lg hover:bg-gray-50">
// //                                             <input
// //                                                 type="checkbox"
// //                                                 id={`route-${index}`}
// //                                                 checked={route.access}
// //                                                 onChange={() => toggleRouteAccess(index)}
// //                                                 className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
// //                                             />
// //                                             <label htmlFor={`route-${index}`} className="ml-3 text-sm font-medium text-gray-700">
// //                                                 {route.label}
// //                                             </label>
// //                                         </div>
// //                                     ))}
// //                                 </div>
// //                                 {errors.sidebar && (
// //                                     <p className="text-sm text-red-500 col-span-full mt-1">{errors.sidebar}</p>
// //                                 )}
// //                             </div>
// //                         )}

// //                         <div className="flex justify-between pt-6 gap-3">
// //                             {step > 1 ? (
// //                                 <button type="button" onClick={prevStep}
// //                                     className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors text-sm sm:text-base">
// //                                     Back
// //                                 </button>
// //                             ) : <div></div>}

// //                             {step <= 3 ? (
// //                                 <button type="button" onClick={nextStep}
// //                                     className="ml-auto px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm sm:text-base">
// //                                     Continue
// //                                 </button>
// //                             ) : (
// //                                 <button type="submit"
// //                                     className="ml-auto px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm sm:text-base">
// //                                     Submit Form
// //                                 </button>
// //                             )}
// //                         </div>
// //                     </form>
// //                 </div>
// //             </div>
// //             {msg && (
// //                 <div className={`mt-3 p-2 text-sm rounded ${msg.includes('success') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
// //                     {msg}
// //                 </div>
// //             )}
// //         </div>
// //     );
// // };

// // export default MultiStepForm;
// 'use client';

// import React, { useState } from 'react';

// const MultiStepForm = () => {
//     const [step, setStep] = useState(1);
//     const [errors, setErrors] = useState({});
//     const [msg, setMsg] = useState('');
//     const initialFormData = {
//         firstName: '',
//         lastName: '',
//         dob: '',
//         gender: '',
//         username: '',
//         password: '',
//         phoneNumber: '',
//         email: '',
//         houseAddress: '',
//         panNumber: '',
//         aadharNumber: '',
//         kycNumber: '',
//         sidebar: [
//             { label: 'Users', access: false },
//             { label: 'Dashboard', access: false },
//             { label: 'Create User', access: false },
//             { label: 'Model Basket', access: false },
//             { label: 'KYC Verification', access: false }
//         ]
//     };

//     const [formData, setFormData] = useState(initialFormData);

//     const validateStep = (step) => {
//         const newErrors = {};
//         if (step === 1) {
//             if (!formData.firstName) newErrors.firstName = 'First name is required';
//             if (!formData.lastName) newErrors.lastName = 'Last name is required';
//             if (!formData.dob) newErrors.dob = 'Date of birth is required';
//             if (!formData.username) newErrors.username = 'Username is required';
//             if (!formData.password) newErrors.password = 'Password is required';
//             else if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
//         }
//         if (step === 2) {
//             if (!formData.phoneNumber) newErrors.phoneNumber = 'Phone number is required';
//             else if (!/^\d{10}$/.test(formData.phoneNumber)) newErrors.phoneNumber = 'Invalid phone number';

//             if (!formData.email) newErrors.email = 'Email is required';
//             else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Invalid email format';
//         }
//         if (step === 3) {
//             if (!formData.panNumber) newErrors.panNumber = 'PAN number is required';
//             if (!formData.aadharNumber) newErrors.aadharNumber = 'Aadhar number is required';
//         }
//         if (step === 4) {
//             const hasAccess = formData.sidebar.some(route => route.access);
//             if (!hasAccess) newErrors.sidebar = 'At least one route must be selected';
//         }
//         setErrors(newErrors);
//         return Object.keys(newErrors).length === 0;
//     };

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData(prev => ({ ...prev, [name]: value }));
//         if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
//     };

//     const toggleRouteAccess = (index) => {
//         const updatedRoutes = [...formData.sidebar];
//         updatedRoutes[index].access = !updatedRoutes[index].access;
//         setFormData(prev => ({ ...prev, sidebar: updatedRoutes }));
//     };

//     const nextStep = () => {
//         if (validateStep(step)) {
//             setStep(prev => prev + 1);
//         }
//     };

//     const prevStep = () => setStep(prev => prev - 1);

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         if (!validateStep(4)) return;
//         try {
//             const res = await fetch('http://localhost:3030/api/v1/adminuse/create-user', {
//                 method: 'POST',
//                 headers: { 'Content-Type': 'application/json' },
//                 body: JSON.stringify(formData),
//                 credentials: "include",
//             });

//             const data = await res.json();
//             if (res.ok) {
//                 setFormData(initialFormData);
//                 setStep(1); // Reset to first step after successful submission
//             }
//             setMsg(data.message);
//         }
//         catch (err) {
//             console.log(err);
//             setMsg('An error occurred while submitting the form');
//         }
//     };

//     return (
//         <div className="w-full mx-auto p-4 sm:p-6 max-w-4xl">
//             <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
//                 {/* Progress Steps */}
//                 <div className="px-8 py-6 bg-gradient-to-r from-blue-50 to-indigo-50">
//                     <div className="flex items-center justify-between">
//                         {[1, 2, 3, 4].map((stepNumber) => (
//                             <div key={stepNumber} className="flex flex-col items-center relative">
//                                 <div className={`relative z-10 w-12 h-12 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300
//                                     ${step === stepNumber ? 'bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-100 transform scale-110' :
//                                         step > stepNumber ? 'bg-gradient-to-br from-green-500 to-emerald-500 text-white' :
//                                             'bg-white text-gray-400 border-2 border-gray-200'}`}>
//                                     {step > stepNumber ? (
//                                         <span className="text-white">✓</span>
//                                     ) : (
//                                         stepNumber
//                                     )}
//                                 </div>
//                                 <span className={`mt-3 text-xs font-medium tracking-wide ${step >= stepNumber ? 'text-gray-800 font-semibold' : 'text-gray-400'}`}>
//                                     {['Personal', 'Contact', 'KYC', 'Access'][stepNumber - 1]}
//                                 </span>
//                                 {stepNumber < 4 && (
//                                     <div className={`absolute top-6 left-16 w-16 h-0.5 ${step > stepNumber ? 'bg-gradient-to-r from-green-400 to-emerald-400' : 'bg-gray-200'}`}></div>
//                                 )}
//                             </div>
//                         ))}
//                     </div>
//                 </div>

//                 <div className="p-8">
//                     {/* Error Alert */}
//                     {Object.values(errors).some(e => e) && (
//                         <div className="mb-6 p-4 bg-red-50 rounded-xl border border-red-100 flex items-start shadow-sm">
//                             <div className="flex-shrink-0 p-1.5 bg-red-100 rounded-lg text-red-600">
//                                 !
//                             </div>
//                             <div className="ml-3">
//                                 <h3 className="text-sm font-medium text-red-800">Validation Error</h3>
//                                 <p className="mt-1 text-sm text-red-600">Please fix the errors before proceeding</p>
//                             </div>
//                         </div>
//                     )}

//                     <form onSubmit={step === 4 ? handleSubmit : (e) => { e.preventDefault(); nextStep(); }}>
//                         {/* Step 1 - Personal Information */}
//                         {step === 1 && (
//                             <div className="space-y-6">
//                                 <div className="pb-4 border-b border-gray-100">
//                                     <h3 className="text-2xl font-semibold text-gray-900">Personal Information</h3>
//                                     <p className="mt-1 text-sm text-gray-500">Enter basic details about the user</p>
//                                 </div>
//                                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
//                                     {[
//                                         { label: 'First Name', name: 'firstName', type: 'text', placeholder: 'John' },
//                                         { label: 'Last Name', name: 'lastName', type: 'text', placeholder: 'Doe' },
//                                         { label: 'Date of Birth', name: 'dob', type: 'date' },
//                                         {
//                                             label: 'Gender',
//                                             name: 'gender',
//                                             type: 'select',
//                                             options: ['', 'Male', 'Female', 'Not to Prefer']
//                                         },
//                                         { label: 'Username', name: 'username', type: 'text', placeholder: 'johndoe' },
//                                         { label: 'Password', name: 'password', type: 'password', placeholder: '••••••••' }
//                                     ].map((field) => (
//                                         <div key={field.name}>
//                                             <label className="block text-sm font-medium text-gray-700 mb-2">{field.label}</label>
//                                             {field.type === 'select' ? (
//                                                 <select
//                                                     name={field.name}
//                                                     value={formData[field.name]}
//                                                     onChange={handleChange}
//                                                     className={`w-full px-4 py-3 rounded-xl border ${errors[field.name] ? 'border-red-300 focus:ring-red-300' : 'border-gray-200 focus:ring-blue-300'} focus:outline-none focus:ring-2 focus:border-transparent`}
//                                                 >
//                                                     {field.options.map(option => (
//                                                         <option key={option} value={option}>
//                                                             {option || 'Select Gender'}
//                                                         </option>
//                                                     ))}
//                                                 </select>
//                                             ) : (
//                                                 <input
//                                                     type={field.type}
//                                                     name={field.name}
//                                                     placeholder={field.placeholder}
//                                                     value={formData[field.name]}
//                                                     onChange={handleChange}
//                                                     className={`w-full px-4 py-3 rounded-xl border ${errors[field.name] ? 'border-red-300 focus:ring-red-300' : 'border-gray-200 focus:ring-blue-300'} focus:outline-none focus:ring-2 focus:border-transparent`}
//                                                 />
//                                             )}
//                                             {errors[field.name] && (
//                                                 <p className="mt-2 text-xs text-red-500 flex items-center">
//                                                     <span className="mr-1">!</span>
//                                                     {errors[field.name]}
//                                                 </p>
//                                             )}
//                                         </div>
//                                     ))}
//                                 </div>
//                             </div>
//                         )}

//                         {/* Step 2 - Contact Information */}
//                         {step === 2 && (
//                             <div className="space-y-6">
//                                 <div className="pb-4 border-b border-gray-100">
//                                     <h3 className="text-2xl font-semibold text-gray-900">Contact Information</h3>
//                                     <p className="mt-1 text-sm text-gray-500">Enter contact details for the user</p>
//                                 </div>
//                                 <div className="space-y-6">
//                                     {[
//                                         { label: 'Phone Number', name: 'phoneNumber', type: 'tel', placeholder: '9876543210' },
//                                         { label: 'Email', name: 'email', type: 'email', placeholder: 'john@example.com' },
//                                         { label: 'Address', name: 'houseAddress', type: 'textarea' }
//                                     ].map((field) => (
//                                         <div key={field.name}>
//                                             <label className="block text-sm font-medium text-gray-700 mb-2">{field.label}</label>
//                                             {field.type === 'textarea' ? (
//                                                 <textarea
//                                                     name={field.name}
//                                                     placeholder="Enter full address"
//                                                     value={formData[field.name]}
//                                                     onChange={handleChange}
//                                                     rows={3}
//                                                     className={`w-full px-4 py-3 rounded-xl border ${errors[field.name] ? 'border-red-300 focus:ring-red-300' : 'border-gray-200 focus:ring-blue-300'} focus:outline-none focus:ring-2 focus:border-transparent`}
//                                                 />
//                                             ) : (
//                                                 <input
//                                                     type={field.type}
//                                                     name={field.name}
//                                                     placeholder={field.placeholder}
//                                                     value={formData[field.name]}
//                                                     onChange={handleChange}
//                                                     className={`w-full px-4 py-3 rounded-xl border ${errors[field.name] ? 'border-red-300 focus:ring-red-300' : 'border-gray-200 focus:ring-blue-300'} focus:outline-none focus:ring-2 focus:border-transparent`}
//                                                 />
//                                             )}
//                                             {errors[field.name] && (
//                                                 <p className="mt-2 text-xs text-red-500 flex items-center">
//                                                     <span className="mr-1">!</span>
//                                                     {errors[field.name]}
//                                                 </p>
//                                             )}
//                                         </div>
//                                     ))}
//                                 </div>
//                             </div>
//                         )}

//                         {/* Step 3 - KYC Information */}
//                         {step === 3 && (
//                             <div className="space-y-6">
//                                 <div className="pb-4 border-b border-gray-100">
//                                     <h3 className="text-2xl font-semibold text-gray-900">KYC Information</h3>
//                                     <p className="mt-1 text-sm text-gray-500">Enter verification details for the user</p>
//                                 </div>
//                                 <div className="space-y-6">
//                                     {[
//                                         { label: 'PAN Number', name: 'panNumber', type: 'text', placeholder: 'ABCDE1234F' },
//                                         { label: 'Aadhar Number', name: 'aadharNumber', type: 'text', placeholder: '1234 5678 9012' },
//                                         { label: 'KYC Number (optional)', name: 'kycNumber', type: 'text', placeholder: 'Enter KYC number if available' }
//                                     ].map((field) => (
//                                         <div key={field.name}>
//                                             <label className="block text-sm font-medium text-gray-700 mb-2">{field.label}</label>
//                                             <input
//                                                 type={field.type}
//                                                 name={field.name}
//                                                 placeholder={field.placeholder}
//                                                 value={formData[field.name]}
//                                                 onChange={handleChange}
//                                                 className={`w-full px-4 py-3 rounded-xl border ${errors[field.name] ? 'border-red-300 focus:ring-red-300' : 'border-gray-200 focus:ring-blue-300'} focus:outline-none focus:ring-2 focus:border-transparent`}
//                                             />
//                                             {errors[field.name] && (
//                                                 <p className="mt-2 text-xs text-red-500 flex items-center">
//                                                     <span className="mr-1">!</span>
//                                                     {errors[field.name]}
//                                                 </p>
//                                             )}
//                                         </div>
//                                     ))}
//                                 </div>
//                             </div>
//                         )}

//                         {/* Step 4 - Route Access */}
//                         {step === 4 && (
//                             <div className="space-y-6">
//                                 <div className="pb-4 border-b border-gray-100">
//                                     <h3 className="text-2xl font-semibold text-gray-900">Route Access Permissions</h3>
//                                     <p className="mt-1 text-sm text-gray-500">Select which routes this user can access</p>
//                                 </div>
//                                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                                     {formData.sidebar.map((route, index) => (
//                                         <div
//                                             key={index}
//                                             className={`p-4 rounded-xl border transition-all cursor-pointer ${route.access ? 'border-blue-300 bg-blue-50 shadow-sm' : 'border-gray-200 hover:border-gray-300'}`}
//                                             onClick={() => toggleRouteAccess(index)}
//                                         >
//                                             <div className="flex items-center">
//                                                 <div className={`flex-shrink-0 h-5 w-5 rounded border flex items-center justify-center transition-colors ${route.access ? 'bg-blue-600 border-blue-600 text-white' : 'bg-white border-gray-300'}`}>
//                                                     {route.access && '✓'}
//                                                 </div>
//                                                 <span className="ml-3 text-sm font-medium text-gray-700">{route.label}</span>
//                                             </div>
//                                         </div>
//                                     ))}
//                                 </div>
//                                 {errors.sidebar && (
//                                     <p className="mt-2 text-xs text-red-500 flex items-center">
//                                         <span className="mr-1">!</span>
//                                         {errors.sidebar}
//                                     </p>
//                                 )}
//                             </div>
//                         )}

//                         {/* Navigation Buttons */}
//                         <div className="flex justify-between pt-8">
//                             {step > 1 ? (
//                                 <button
//                                     type="button"
//                                     onClick={prevStep}
//                                     className="px-6 py-3 bg-white text-gray-700 rounded-xl border border-gray-200 hover:bg-gray-50 transition-colors font-medium flex items-center shadow-sm"
//                                 >
//                                     ← Back
//                                 </button>
//                             ) : <div></div>}

//                             {step <= 3 ? (
//                                 <button
//                                     type="button"
//                                     onClick={nextStep}
//                                     className="ml-auto px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-colors font-medium flex items-center shadow-lg shadow-blue-100"
//                                 >
//                                     Continue →
//                                 </button>
//                             ) : (
//                                 <button
//                                     type="submit"
//                                     className="ml-auto px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl hover:from-green-600 hover:to-emerald-600 transition-colors font-medium flex items-center shadow-lg shadow-green-100"
//                                 >
//                                     ✓ Submit Form
//                                 </button>
//                             )}
//                         </div>
//                     </form>
//                 </div>
//             </div>

//             {/* Success/Error Message */}
//             {msg && (
//                 <div className={`mt-6 p-4 rounded-xl border ${msg.includes('success') ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'} flex items-start shadow-sm`}>
//                     <div className={`flex-shrink-0 p-1.5 rounded-lg ${msg.includes('success') ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
//                         {msg.includes('success') ? '✓' : '!'}
//                     </div>
//                     <div className="ml-3">
//                         <h3 className={`text-sm font-medium ${msg.includes('success') ? 'text-green-800' : 'text-red-800'}`}>
//                             {msg.includes('success') ? 'Success!' : 'Error'}
//                         </h3>
//                         <p className={`mt-1 text-sm ${msg.includes('success') ? 'text-green-700' : 'text-red-700'}`}>
//                             {msg}
//                         </p>
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default MultiStepForm;