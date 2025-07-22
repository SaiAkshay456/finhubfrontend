// import LinkComponent from "../../components/LinkComponent";
// import { cookies } from "next/headers";
// import Link from "next/link";
// import DupliacateQuestionarreButton from "../../components/DupliacateQuestionarreButton";

// export default async function RiskPage() {
//     const cookieStore = await cookies();
//     const token = cookieStore.get("token")?.value;

//     const res = await fetch(`http://localhost:3030/api/v1/riskprofile/get/questionarries`, {
//         headers: {
//             Authorization: `Bearer ${token}`,
//         },
//         credentials: "include",
//         cache: "no-store",
//     });

//     if (!res.ok) {
//         return (
//             <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center px-4">
//                 <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center border border-red-100">
//                     <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
//                         <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//                         </svg>
//                     </div>
//                     <h2 className="text-xl font-semibold text-gray-800 mb-2">Connection Error</h2>
//                     <p className="text-red-600">Failed to load questionnaires.</p>
//                 </div>
//             </div>
//         );
//     }

//     const questionnaires = await res.json();

//     return (
//         <div className="min-h-screen px-0 py-4">
//             <div className="w-full px-2 sm:px-4 md:px-6 lg:px-8 xl:px-10 2xl:px-12">
//                 {/* Header Section */}
//                 <div className="mb-8">
//                     <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
//                         <div>
//                             <h1 className="text-3xl font-bold text-[var(--dashboard-text-dark)] bg-clip-text">
//                                 Questionnaires
//                             </h1>
//                             <p className="text-gray-600 mt-2">Manage your risk profile questionnaires</p>
//                         </div>
//                         <LinkComponent
//                             link="/riskprofile/create-questionarre"
//                             textValue="+ Create Questionnaire"
//                             className="inline-flex items-center px-6 py-3 hover:from-blue-700 hover:to-indigo-700 text-white font-medium rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
//                         />
//                     </div>
//                 </div>

//                 {questionnaires.length === 0 ? (
//                     /* Empty State */
//                     <div className="bg-white rounded-3xl shadow-xl p-12 text-center max-w-2xl mx-auto border border-gray-100">
//                         <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
//                             <svg className="w-12 h-12 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
//                             </svg>
//                         </div>
//                         <h3 className="text-2xl font-semibold text-gray-800 mb-3">No questionnaires yet</h3>
//                         <p className="text-gray-600 mb-6">Get started by creating your first questionnaire to collect risk profile data.</p>
//                         <LinkComponent
//                             link="/riskprofile/create-questionarre"
//                             textValue="Create your first questionnaire"
//                             className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-[#00d09c] to-[#00b98b] hover:from-blue-700 hover:to-indigo-700 text-white font-medium rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
//                         />
//                     </div>
//                 ) : (
//                     /* Questionnaires Grid */
//                     <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
//                         {questionnaires.map((q) => (
//                             <div key={q._id} className="bg-white rounded-sm shadow-lg hover:shadow-xl transition-all duration-300 transform border border-gray-100 overflow-hidden">
//                                 {/* Card Header */}
//                                 <div className="p-6 pb-4">
//                                     <div className="flex items-start justify-between mb-4">
//                                         <div className="flex-1">
//                                             <h3 className="text-xl font-semibold text-gray-800 mb-2 line-clamp-2">
//                                                 {q.title || "Untitled Questionnaire"}
//                                             </h3>
//                                             <div className="flex items-center gap-2">
//                                                 <div className="flex items-center gap-1 text-gray-500">
//                                                     <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//                                                     </svg>
//                                                     <span className="text-sm font-medium">{q.questions.length} questions</span>
//                                                 </div>
//                                                 <div className={`px-3 py-1 rounded-full text-xs font-medium ${q.isPublished
//                                                     ? 'bg-green-100 text-green-800'
//                                                     : 'bg-yellow-100 text-yellow-800'
//                                                     }`}>
//                                                     {q.isPublished ? 'Published' : 'Draft'}
//                                                 </div>
//                                             </div>
//                                         </div>
//                                     </div>
//                                 </div>

//                                 {/* Card Footer */}
//                                 <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
//                                     <div className="flex gap-2">
//                                         {q.isPublished ? (
//                                             <div className="flex gap-2 w-full">
//                                                 <button
//                                                     disabled
//                                                     className="flex-1 px-4 py-2 text-sm font-medium text-gray-400 bg-gray-200 rounded-lg cursor-not-allowed"
//                                                 >
//                                                     <svg className="w-4 h-4 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8l4 4 4-4m6-6l-1 1m-4 4l4-4m-4 4l-4-4m-4 4l4 4l4-4" />
//                                                     </svg>
//                                                     Archive
//                                                 </button>
//                                                 <DupliacateQuestionarreButton
//                                                     questionId={q._id}
//                                                     className="px-4 py-2 text-sm font-medium bg-black hover:bg-blue-700 text-white rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg"
//                                                 />
//                                             </div>
//                                         ) : (
//                                             <Link
//                                                 href={`/riskprofile/update/${q._id}`}
//                                                 className="flex-1 flex items-center justify-center px-4 py-2 text-sm font-medium text-white  bg-gradient-to-r from-[#00d09c] to-[#00b98b]  hover:opacity-90 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg"
//                                             >
//                                                 <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
//                                                 </svg>
//                                                 Edit
//                                             </Link>
//                                         )}
//                                     </div>
//                                 </div>
//                             </div>
//                         ))}
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// }

import LinkComponent from "../../components/LinkComponent";
import { cookies } from "next/headers";
import Link from "next/link";
import DupliacateQuestionarreButton from "../../components/DupliacateQuestionarreButton";

export default async function RiskPage() {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    const res = await fetch(`http://localhost:3030/api/v1/riskprofile/get/questionarries`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
        credentials: "include",
        cache: "no-store",
    });

    if (!res.ok) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center px-4">
                <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center border border-red-100">
                    <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                    <h2 className="text-xl font-semibold text-gray-800 mb-2">Connection Error</h2>
                    <p className="text-red-600">Failed to load questionnaires.</p>
                </div>
            </div>
        );
    }

    const questionnaires = await res.json();

    return (
        <div className="min-h-screen px-0 py-4">
            <div className="w-full px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-16 mx-auto max-w-screen-2xl">
                {/* Header Section */}
                <div className="mb-6">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                        <div>
                            <h1 className="text-3xl font-bold text-[var(--dashboard-text-dark)] bg-clip-text">
                                Questionnaires
                            </h1>
                            <p className="text-gray-600 text-sm mt-1">Manage your risk profile questionnaires</p>
                        </div>
                        <LinkComponent
                            link="/riskprofile/create-questionarre"
                            textValue="+ Create Questionnaire"
                            className="inline-flex items-center px-3 py-1.5 sm:px-4 sm:py-2 bg-gradient-to-r from-[#00d09c] to-[#00b98b] hover:from-blue-700 hover:to-indigo-700 text-white text-sm font-medium rounded-lg shadow hover:shadow-md transition-all duration-200"
                        />
                    </div>
                </div>

                {questionnaires.length === 0 ? (
                    /* Empty State */
                    <div className="bg-white rounded-lg shadow p-6 text-center max-w-md mx-auto border border-gray-100">
                        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                        </div>
                        <h3 className="text-lg font-semibold text-gray-800 mb-2">No questionnaires yet</h3>
                        <p className="text-gray-600 text-sm mb-4">Get started by creating your first questionnaire.</p>
                        <LinkComponent
                            link="/riskprofile/create-questionarre"
                            textValue="Create Questionnaire"
                            className="inline-flex items-center px-3 py-1.5 bg-gradient-to-r from-[#00d09c] to-[#00b98b] hover:from-blue-700 hover:to-indigo-700 text-white text-sm font-medium rounded-lg shadow hover:shadow-md transition-all duration-200"
                        />
                    </div>
                ) : (
                    /* Questionnaires Grid */
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
                        {questionnaires.map((q) => (
                            <div key={q._id} className="bg-white rounded-md shadow-sm hover:shadow-md transition-all duration-200 border border-gray-100 overflow-hidden flex flex-col">
                                {/* Card Header */}
                                <div className="p-3 sm:p-4 flex-1">
                                    <div className="mb-2">
                                        <h3 className="text-sm sm:text-base font-medium text-gray-800 line-clamp-2">
                                            {q.title || "Untitled Questionnaire"}
                                        </h3>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-1 text-gray-500 text-xs">
                                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            <span>{q.questions.length} questions</span>
                                        </div>
                                        <div className={`px-2 py-0.5 rounded-full text-xs font-medium ${q.isPublished
                                            ? 'bg-green-100 text-green-800'
                                            : 'bg-yellow-100 text-yellow-800'
                                            }`}>
                                            {q.isPublished ? 'Published' : 'Draft'}
                                        </div>
                                    </div>
                                </div>

                                {/* Card Footer */}
                                <div className="px-3 py-2 bg-gray-50 border-t border-gray-100">
                                    {q.isPublished ? (
                                        <div className="flex gap-2">
                                            <button
                                                disabled
                                                className="px-2 py-1 text-xs font-medium text-gray-400 bg-gray-200 rounded cursor-not-allowed flex items-center flex-1 justify-center"
                                            >
                                                <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8l4 4 4-4m6-6l-1 1m-4 4l4-4m-4 4l-4-4m-4 4l4 4l4-4" />
                                                </svg>
                                                Archive
                                            </button>
                                            <DupliacateQuestionarreButton
                                                questionId={q._id}
                                                className="px-2 py-1 text-xs font-medium bg-black hover:bg-blue-700 text-white rounded flex items-center flex-1 justify-center transition-colors duration-200"
                                            />
                                        </div>
                                    ) : (
                                        <Link
                                            href={`/riskprofile/update/${q._id}`}
                                            className="flex items-center justify-center px-2 py-1 text-xs sm:text-sm font-medium text-white bg-gradient-to-r from-[#00d09c] to-[#00b98b] hover:opacity-90 rounded transition-all duration-200 w-full"
                                        >
                                            <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                            </svg>
                                            Edit
                                        </Link>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

