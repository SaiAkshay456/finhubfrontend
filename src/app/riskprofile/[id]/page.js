// import { cookies } from 'next/headers';
// import AssignRiskCategory from '../../../components/AssignRiskCategory';

// export async function getResponsesForUsers(id) {
//     const cookieStore = cookies();
//     const token = cookieStore.get('token')?.value;
//     try {
//         const res = await fetch(`http://localhost:3030/api/v1/riskprofile/user-response/${id}`, {
//             headers: { Authorization: `Bearer ${token}` },
//             cache: "no-store",
//             credentials: "include"
//         });
//         const data = await res.json();
//         return data.data || null;
//     } catch (err) {
//         console.error(err);
//         return null;
//     }
// }

// export default async function RiskProfileOfUser({ params }) {
//     const responses = await getResponsesForUsers(params.id);

//     return (
//         <div className="min-h-screen bg-gray-50">
//             <div className="p-6 max-w-6xl mx-auto">
//                 {/* Header Section */}
//                 <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
//                     <div className="flex items-start justify-between">
//                         <div>
//                             <h1 className="text-3xl font-bold text-gray-900 mb-2">
//                                 Risk Profile Analysis
//                             </h1>
//                             <p className="text-gray-600 mb-4">
//                                 Comprehensive assessment and risk categorization overview
//                             </p>
//                             <div className="flex items-center gap-4">
//                                 <div className="flex items-center gap-2 px-3 py-1.5 bg-blue-50 text-blue-700 rounded-lg border border-blue-200">
//                                     <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
//                                         <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path>
//                                     </svg>
//                                     <span className="text-sm font-medium">User ID: {params.id}</span>
//                                 </div>
//                                 <div className="flex items-center gap-2 px-3 py-1.5 bg-green-50 text-green-700 rounded-lg border border-green-200">
//                                     <div className="w-2 h-2 bg-green-500 rounded-full"></div>
//                                     <span className="text-sm font-medium">
//                                         {responses?.length || 0} assessment{responses?.length !== 1 ? 's' : ''} found
//                                     </span>
//                                 </div>
//                             </div>
//                         </div>
//                         <div className="flex items-center gap-2">
//                             <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
//                                 Export Report
//                             </button>
//                             <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors">
//                                 Generate New Assessment
//                             </button>
//                         </div>
//                     </div>
//                 </div>

//                 {!responses || responses.length === 0 ? (
//                     <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
//                         <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
//                             <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//                             </svg>
//                         </div>
//                         <h3 className="text-xl font-semibold text-gray-900 mb-2">No risk assessments found</h3>
//                         <p className="text-gray-500 mb-6">This user hasn't completed any risk profile assessments yet.</p>
//                         <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
//                             Send Assessment
//                         </button>
//                     </div>
//                 ) : (
//                     <div className="space-y-6">
//                         {responses.map((response, idx) => (
//                             <div key={idx} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
//                                 <div className="bg-gradient-to-r from-indigo-500 to-purple-600 px-6 py-4">
//                                     <div className="flex items-center justify-between">
//                                         <div className="flex items-center gap-3">
//                                             <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
//                                                 <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
//                                                 </svg>
//                                             </div>
//                                             <div>
//                                                 <h2 className="text-xl font-semibold text-white">
//                                                     {response.title}
//                                                 </h2>
//                                                 <p className="text-indigo-100 text-sm">Assessment #{idx + 1}</p>
//                                             </div>
//                                         </div>
//                                         <div className="flex items-center gap-2">
//                                             <span className="px-3 py-1 bg-white/20 text-white text-xs font-medium rounded-full">
//                                                 {response.answers.length} Questions
//                                             </span>
//                                             <button className="text-white/80 hover:text-white transition-colors">
//                                                 <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"></path>
//                                                 </svg>
//                                             </button>
//                                         </div>
//                                     </div>
//                                 </div>

//                                 <div className="divide-y divide-gray-100">
//                                     {response.answers.map((answerObj, index) => {
//                                         const [question, option] = Object.entries(answerObj)[0];
//                                         return (
//                                             <div key={index} className="px-6 py-4 hover:bg-gray-50 transition-colors">
//                                                 <div className="flex items-start gap-4">
//                                                     <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
//                                                         <span className="text-blue-600 font-semibold text-sm">Q{index + 1}</span>
//                                                     </div>
//                                                     <div className="flex-1">
//                                                         <h3 className="text-sm font-medium text-gray-500 mb-1">{question}</h3>
//                                                         <p className="text-gray-900 font-medium">{option}</p>
//                                                     </div>
//                                                 </div>
//                                             </div>
//                                         );
//                                     })}
//                                 </div>
//                             </div>
//                         ))}

//                         {/* Risk Category Submission Form */}
//                         <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
//                             <div className="flex items-center gap-3 mb-4">
//                                 <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
//                                     <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
//                                     </svg>
//                                 </div>
//                                 <div>
//                                     <h3 className="text-lg font-semibold text-gray-900">Risk Category Assignment</h3>
//                                     <p className="text-sm text-gray-600">Complete the risk assessment process</p>
//                                 </div>
//                             </div>
//                             <AssignRiskCategory userId={params.id} />
//                         </div>
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// }




import { cookies } from 'next/headers';
import AssignRiskCategory from '../../../components/AssignRiskCategory';

export async function getResponsesForUsers(id) {
    const cookieStore = cookies();
    const token = cookieStore.get('token')?.value;
    try {
        const res = await fetch(`http://localhost:3030/api/v1/riskprofile/user-response/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
            cache: "no-store",
            credentials: "include"
        });
        const data = await res.json();
        return data.data || null;
    } catch (err) {
        console.error(err);
        return null;
    }
}

export default async function RiskProfileOfUser({ params }) {
    const responses = await getResponsesForUsers(params.id);

    return (
        <div className="min-h-screen">
            <div className="p-6 max-w-7xl mx-auto">
                {/* Header Section */}
                <div className="bg-white rounded-lg shadow border border-gray-200 p-6 mb-6">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">Risk Profile Analysis</h1>
                            <p className="text-gray-600 mt-1">Detailed assessment results for user</p>

                            <div className="flex flex-wrap gap-3 mt-4">
                                <div className="flex items-center gap-2 px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm">
                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path>
                                    </svg>
                                    <span>User ID: {params.id}</span>
                                </div>
                                <div className="flex items-center gap-2 px-3 py-1 bg-green-50 text-green-700 rounded-full text-sm">
                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd"></path>
                                    </svg>
                                    <span>{responses?.length || 0} assessment{responses?.length !== 1 ? 's' : ''}</span>
                                </div>
                            </div>
                        </div>

                        <div className="flex gap-3">
                            <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
                                </svg>
                                Export
                            </button>
                            <button className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-[#00d09c] to-[#00b98b] transition-colors flex items-center gap-2">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                                </svg>
                                New Assessment
                            </button>
                        </div>
                    </div>
                </div>

                {!responses || responses.length === 0 ? (
                    <div className="bg-white rounded-lg shadow border border-gray-200 p-8 text-center">
                        <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                            </svg>
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">No assessments found</h3>
                        <p className="text-gray-500 mb-6">This user hasn't completed any risk profile assessments yet.</p>
                        <button className="px-5 py-2.5 bg-gradient-to-r from-[#00d09c] to-[#00b98b] text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
                            Request Assessment
                        </button>
                    </div>
                ) : (
                    <div className="space-y-5">
                        {responses.map((response, idx) => (
                            <div key={idx} className="bg-white rounded-lg shadow border border-gray-200 overflow-hidden">
                                <div className="bg-gradient-to-r from-[#00d09c] to-[#00b98b] px-6 py-4 flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <div className="bg-white/20 p-2 rounded-lg">
                                            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                            </svg>
                                        </div>
                                        <div>
                                            <h2 className="text-lg font-semibold text-white">{response.title}</h2>
                                            <div className="flex flex-col text-white text-sm mt-1 space-y-1">
                                                <div className="flex items-center gap-2">
                                                    <span>Completed: {new Date(response.createdAt || Date.now()).toLocaleString()}</span>
                                                    <span>•</span>
                                                    <span>{response.answers.length} questions</span>
                                                </div>
                                                <div className="flex items-center gap-2 text-white">
                                                    <span>Created: {new Date(response.createdAt).toLocaleString()}</span>
                                                    <span>•</span>
                                                    <span>Updated: {new Date(response.updatedAt).toLocaleString()}</span>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                    <button className="text-white/80 hover:text-white transition-colors">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"></path>
                                        </svg>
                                    </button>
                                </div>

                                <div className="divide-y divide-gray-100">
                                    {response.answers.map((answerObj, index) => {
                                        const [question, option] = Object.entries(answerObj)[0];
                                        return (
                                            <div key={index} className="px-6 py-4 hover:bg-gray-50 transition-colors">
                                                <div className="flex items-start gap-4">
                                                    <div className="flex-shrink-0 mt-1">
                                                        <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-blue-800 font-medium text-xs">
                                                            {index + 1}
                                                        </div>
                                                    </div>
                                                    <div className="flex-1">
                                                        <h3 className="text-sm font-medium text-gray-500 mb-1">{question}</h3>
                                                        <p className="text-gray-800">{option}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        ))}

                        {/* Risk Category Assignment */}
                        <div className="bg-white rounded-lg shadow border border-gray-200 p-6">
                            <div className="flex items-center gap-4 mb-5">
                                <div className="bg-green-100 p-2.5 rounded-lg">
                                    <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900">Final Risk Assessment</h3>
                                    <p className="text-gray-600 text-sm">Assign a risk category based on the responses</p>
                                </div>
                            </div>
                            <AssignRiskCategory userId={params.id} />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}