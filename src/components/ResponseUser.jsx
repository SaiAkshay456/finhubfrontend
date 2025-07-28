// "use client";
// import { useState } from 'react';
// import axios from 'axios';
// import { useRouter } from 'next/navigation';

// export default function ResponseUser({ questions, questionarieId, userId, tokenId }) {
//     const [responses, setResponses] = useState({});
//     const [isSubmitting, setIsSubmitting] = useState(false);
//     const [msg, setMsg] = useState('');
//     const router = useRouter()

//     const handleChange = (questionId, value) => {
//         setResponses(prev => ({
//             ...prev,
//             [questionId]: value
//         }));
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setIsSubmitting(true);
//         try {
//             const { data } = await axios.post("http://localhost:3030/v1/response/submit-response", {
//                 userId,
//                 questionarieId,
//                 responses,
//                 tokenId
//             }, {
//                 withCredentials: true
//             });
//             setMsg(data.message)
//             router.refresh();
//         } catch (err) {
//             console.log("err at response submission", err)
//             setMsg("Submission Failed")
//         } finally {
//             setIsSubmitting(false);
//         }
//     };

//     return (
//         <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
//             <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
//                 {/* Form Header */}
//                 <div className="px-8 py-6 border-b border-gray-200 bg-gray-50">
//                     <h2 className="text-2xl font-semibold text-gray-800">Risk Assessment Questionnaire</h2>
//                     <p className="text-gray-600 mt-2">Please provide your responses to the following questions</p>
//                 </div>

//                 <form onSubmit={handleSubmit} className="divide-y divide-gray-200">
//                     {/* Status Message */}
//                     {msg && (
//                         <div className={`px-8 py-4 ${msg.toLowerCase().includes('success') ? 'bg-green-50' : 'bg-red-50'}`}>
//                             <div className={`flex items-center ${msg.toLowerCase().includes('success') ? 'text-green-700' : 'text-red-700'}`}>
//                                 <div className={`flex-shrink-0 mr-3 ${msg.toLowerCase().includes('success') ? 'text-green-500' : 'text-red-500'}`}>
//                                     {msg.toLowerCase().includes('success') ? (
//                                         <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
//                                             <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
//                                         </svg>
//                                     ) : (
//                                         <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
//                                             <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
//                                         </svg>
//                                     )}
//                                 </div>
//                                 <span className="text-sm font-medium">{msg}</span>
//                             </div>
//                         </div>
//                     )}

//                     {/* Questions Section */}
//                     <div className="px-8 py-6 space-y-8">
//                         {questions.map((question, qIndex) => (
//                             <fieldset key={question._id} className="space-y-4">
//                                 <legend className="text-lg font-medium text-gray-800 flex items-start">
//                                     <span className="mr-3 flex items-center justify-center w-7 h-7 bg-blue-100 text-blue-800 rounded-full text-sm font-semibold">
//                                         {qIndex + 1}
//                                     </span>
//                                     <span className="mt-0.5">{question.text}</span>
//                                 </legend>

//                                 <div className="space-y-3 ml-10">
//                                     {question.options.map((opt, oIndex) => (
//                                         <div key={oIndex} className="flex items-center group">
//                                             <input
//                                                 id={`option-${question._id}-${opt._id}`}
//                                                 name={`question-${question._id}`}
//                                                 type="radio"
//                                                 className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300"
//                                                 required
//                                                 onChange={() => handleChange(question._id, opt._id)}
//                                                 value={opt._id}
//                                                 checked={responses[question._id] === opt._id}
//                                             />
//                                             <label
//                                                 htmlFor={`option-${question._id}-${opt._id}`}
//                                                 className={`ml-3 block text-base text-gray-700 cursor-pointer px-4 py-3 rounded-md transition-colors ${responses[question._id] === opt._id ? 'bg-blue-50 border border-blue-200' : 'hover:bg-gray-50 border border-transparent'}`}
//                                             >
//                                                 {opt.label}
//                                             </label>
//                                         </div>
//                                     ))}
//                                 </div>
//                             </fieldset>
//                         ))}
//                     </div>

//                     {/* Submit Button */}
//                     <div className="px-8 py-6 bg-gray-50 text-right border-t border-gray-200">
//                         <button
//                             type="submit"
//                             disabled={isSubmitting}
//                             className={`inline-flex justify-center py-3 px-8 border border-transparent shadow-sm text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 min-w-[200px] transition-colors ${isSubmitting ? 'opacity-80 cursor-not-allowed' : ''}`}
//                         >
//                             {isSubmitting ? (
//                                 <>
//                                     <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                                         <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                                         <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                                     </svg>
//                                     Processing...
//                                 </>
//                             ) : (
//                                 'Submit Questionnaire'
//                             )}
//                         </button>
//                     </div>
//                 </form>
//             </div>
//         </div>
//     );
// }

"use client";
import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';

export default function ResponseUser({ questions, questionarieId, userId, tokenId }) {
    const [responses, setResponses] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [msg, setMsg] = useState('');
    const router = useRouter();

    const handleChange = (questionId, value) => {
        setResponses(prev => ({
            ...prev,
            [questionId]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setMsg(''); // Clear previous messages
        try {
            const { data } = await axios.post("http://localhost:3030/v1/response/submit-response", {
                userId,
                questionarieId,
                responses,
                tokenId
            }, {
                withCredentials: true
            });
            setMsg(data.message);
            setTimeout(() => {
                router.refresh();
            }, 3000)
        } catch (err) {
            console.log("err at response submission", err);
            setMsg("Submission Failed. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="bg-purple-50 min-h-screen font-sans antialiased text-gray-800">
            <div className="container mx-auto max-w-3xl p-4 sm:p-6 md:p-8">

                {/* --- Form Header --- */}
                <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
                    <div className="h-2.5 bg-purple-600 rounded-t-lg"></div>
                    <div className="p-6">
                        <h1 className="text-3xl font-semibold text-gray-900">Risk Assessment Questionnaire</h1>
                        <p className="text-gray-600 mt-2">Please complete the form below. Your response is required.</p>
                    </div>
                </div>
                <form onSubmit={handleSubmit} className="mt-6 space-y-6">
                    {questions.map((question) => (
                        <div key={question._id} className="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
                            <p className="text-lg font-medium text-gray-900 mb-4">
                                {question.text} <span className="text-red-500">*</span>
                            </p>
                            <fieldset className="space-y-3">
                                <legend className="sr-only">Options for {question.text}</legend>
                                {question.options.map((opt) => (
                                    <div key={opt._id}>
                                        <label
                                            htmlFor={`option-${question._id}-${opt._id}`}
                                            className={`flex items-center p-3 rounded-lg border cursor-pointer transition-colors duration-200 ${responses[question._id] === opt._id
                                                ? 'bg-purple-50 border-purple-500 text-purple-900'
                                                : 'border-gray-300 hover:bg-gray-50 hover:border-gray-400'
                                                }`}
                                        >
                                            {/* Custom Radio Button */}
                                            <span className={`w-5 h-5 rounded-full border-2 flex items-center justify-center mr-4 flex-shrink-0 ${responses[question._id] === opt._id ? 'border-purple-600' : 'border-gray-400'
                                                }`}>
                                                {responses[question._id] === opt._id && (
                                                    <span className="w-2.5 h-2.5 bg-purple-600 rounded-full"></span>
                                                )}
                                            </span>
                                            {/* Hidden real radio input */}
                                            <input
                                                id={`option-${question._id}-${opt._id}`}
                                                name={`question-${question._id}`}
                                                type="radio"
                                                required
                                                onChange={() => handleChange(question._id, opt._id)}
                                                value={opt._id}
                                                checked={responses[question._id] === opt._id}
                                                className="sr-only" // Hide the default radio button
                                            />
                                            <span className="text-base">{opt.label}</span>
                                        </label>
                                    </div>
                                ))}
                            </fieldset>
                        </div>
                    ))}

                    {/* --- Form Submission --- */}
                    <div className="flex justify-end items-center pt-4">
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="inline-flex items-center justify-center px-8 py-3 font-bold text-white bg-purple-600 rounded-lg shadow-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 focus:ring-offset-purple-50 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
                        >
                            {isSubmitting ? (
                                <>
                                    <Loader2 className="animate-spin -ml-1 mr-3 h-5 w-5" />
                                    <span>Submitting...</span>
                                </>
                            ) : (
                                'Submit'
                            )}
                        </button>
                    </div>
                </form>

            </div>
            {msg && (
                <div className={`mt-6 flex items-center p-4 rounded-lg border ${msg.toLowerCase().includes('success')
                    ? 'bg-green-50 border-green-200 text-green-800'
                    : 'bg-red-50 border-red-200 text-red-800'
                    }`}>
                    {msg.toLowerCase().includes('success')
                        ? <CheckCircle2 className="h-6 w-6 mr-3 text-green-500 flex-shrink-0" />
                        : <AlertCircle className="h-6 w-6 mr-3 text-red-500 flex-shrink-0" />
                    }
                    <span className="font-medium">{msg}</span>
                </div>
            )}
        </div>
    );
}