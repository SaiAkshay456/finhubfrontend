// 'use client';
// import { useState } from 'react';

// export default function CreateUserPage() {
//     const [form, setForm] = useState({
//         username: '',
//         email: '',
//         password: '',
//         role: '',
//         sidebar: [{ name: 'example dashboard', path: '/dashboard' }],
//     });

//     const [msg, setMsg] = useState('');

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setForm((prev) => ({ ...prev, [name]: value }));
//     };

//     const handleSidebarChange = (index, field, value) => {
//         const newSidebar = [...form.sidebar];
//         newSidebar[index][field] = value;
//         setForm((prev) => ({ ...prev, sidebar: newSidebar }));
//     };

//     const addSidebarItem = () => {
//         setForm((prev) => ({
//             ...prev,
//             sidebar: [...prev.sidebar, { name: '', path: '' }],
//         }));
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             const res = await fetch('http://localhost:3030/api/v1/adminuse/create-user', {
//                 method: 'POST',
//                 headers: { 'Content-Type': 'application/json' },
//                 body: JSON.stringify(form),
//                 credentials: "include",
//             });

//             const data = await res.json();
//             setMsg(data.message);

//             setForm({
//                 username: '',
//                 email: '',
//                 password: '',
//                 role: '',
//                 sidebar: [{ name: 'example dashboard', path: '/dashboard' }],
//             });
//         }
//         catch (err) {
//             console.log(err)
//         }
//     };

//     return (
//         <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-4">
//             <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
//                 <h1 className="text-xl font-bold text-gray-800 mb-4">Create New User</h1>

//                 <form onSubmit={handleSubmit} className="space-y-4">
//                     <div className="grid grid-cols-2 gap-3">
//                         <div>
//                             <input
//                                 name="username"
//                                 placeholder="username"
//                                 onChange={handleChange}
//                                 required
//                                 className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
//                             />
//                         </div>
//                     </div>

//                     <input
//                         name="email"
//                         type="email"
//                         placeholder="Email"
//                         onChange={handleChange}
//                         required
//                         className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
//                     />

//                     <input
//                         name="password"
//                         type="password"
//                         placeholder="Password"
//                         onChange={handleChange}
//                         required
//                         className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
//                     />

//                     <select
//                         name="role"
//                         onChange={handleChange}
//                         className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
//                     >
//                         <option value="">Select Role</option> {/* 👈 Placeholder */}
//                         <option value="user">User</option>
//                         <option value="advisor">Advisor</option>
//                         <option value="other">Other</option>
//                     </select>

//                     <div className="pt-2">
//                         <p className="text-xs font-medium text-gray-500 mb-2">Sidebar Items</p>
//                         <div className="space-y-2 max-h-40 overflow-y-auto pr-2">
//                             {form.sidebar.map((item, index) => (
//                                 <div key={index} className="flex space-x-2">
//                                     <input
//                                         placeholder="Name"
//                                         value={item.name}
//                                         onChange={(e) => handleSidebarChange(index, 'name', e.target.value)}
//                                         className="flex-1 px-2 py-1 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-indigo-500"
//                                     />
//                                     <input
//                                         placeholder="Path"
//                                         value={item.path}
//                                         onChange={(e) => handleSidebarChange(index, 'path', e.target.value)}
//                                         className="flex-1 px-2 py-1 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-indigo-500"
//                                     />
//                                 </div>
//                             ))}
//                         </div>
//                         <button
//                             type="button"
//                             onClick={addSidebarItem}
//                             className="mt-2 text-xs text-indigo-600 hover:text-indigo-800"
//                         >
//                             + Add item
//                         </button>
//                     </div>

//                     <button
//                         type="submit"
//                         className="w-full py-2 px-4 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded"
//                     >
//                         Create User
//                     </button>
//                 </form>

//                 {msg && (
//                     <div className={`mt-3 p-2 text-sm rounded ${msg.includes('success') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
//                         {msg}
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// }


"use client"
import React, { useState } from 'react';
import MultiStepForm from '../../components/MutlistepForm';
export default function CreateUserPage() {
    return <>
        <MultiStepForm />
    </>
}

