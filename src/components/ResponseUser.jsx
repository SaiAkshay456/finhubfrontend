"use client";
import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

export default function ResponseUser({ questions, questionarieId, userId, tokenId }) {
    const [responses, setResponses] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [msg, setMsg] = useState('');
    const router = useRouter()

    const handleChange = (questionId, value) => {
        setResponses(prev => ({
            ...prev,
            [questionId]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            const { data } = await axios.post("http://localhost:3030/v1/response/submit-response", {
                userId,
                questionarieId,
                responses,
                tokenId
            }, {
                withCredentials: true
            });
            setMsg(data.message)
            router.refresh();
        } catch (err) {
            console.log("err at response submission", err)
            setMsg("Submission Failed")
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
            <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
                {/* Form Header */}
                <div className="px-8 py-6 border-b border-gray-200 bg-gray-50">
                    <h2 className="text-2xl font-semibold text-gray-800">Risk Assessment Questionnaire</h2>
                    <p className="text-gray-600 mt-2">Please provide your responses to the following questions</p>
                </div>

                <form onSubmit={handleSubmit} className="divide-y divide-gray-200">
                    {/* Status Message */}
                    {msg && (
                        <div className={`px-8 py-4 ${msg.toLowerCase().includes('success') ? 'bg-green-50' : 'bg-red-50'}`}>
                            <div className={`flex items-center ${msg.toLowerCase().includes('success') ? 'text-green-700' : 'text-red-700'}`}>
                                <div className={`flex-shrink-0 mr-3 ${msg.toLowerCase().includes('success') ? 'text-green-500' : 'text-red-500'}`}>
                                    {msg.toLowerCase().includes('success') ? (
                                        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                        </svg>
                                    ) : (
                                        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                        </svg>
                                    )}
                                </div>
                                <span className="text-sm font-medium">{msg}</span>
                            </div>
                        </div>
                    )}

                    {/* Questions Section */}
                    <div className="px-8 py-6 space-y-8">
                        {questions.map((question, qIndex) => (
                            <fieldset key={question._id} className="space-y-4">
                                <legend className="text-lg font-medium text-gray-800 flex items-start">
                                    <span className="mr-3 flex items-center justify-center w-7 h-7 bg-blue-100 text-blue-800 rounded-full text-sm font-semibold">
                                        {qIndex + 1}
                                    </span>
                                    <span className="mt-0.5">{question.text}</span>
                                </legend>

                                <div className="space-y-3 ml-10">
                                    {question.options.map((opt, oIndex) => (
                                        <div key={oIndex} className="flex items-center group">
                                            <input
                                                id={`option-${question._id}-${opt._id}`}
                                                name={`question-${question._id}`}
                                                type="radio"
                                                className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300"
                                                required
                                                onChange={() => handleChange(question._id, opt._id)}
                                                value={opt._id}
                                                checked={responses[question._id] === opt._id}
                                            />
                                            <label
                                                htmlFor={`option-${question._id}-${opt._id}`}
                                                className={`ml-3 block text-base text-gray-700 cursor-pointer px-4 py-3 rounded-md transition-colors ${responses[question._id] === opt._id ? 'bg-blue-50 border border-blue-200' : 'hover:bg-gray-50 border border-transparent'}`}
                                            >
                                                {opt.label}
                                            </label>
                                        </div>
                                    ))}
                                </div>
                            </fieldset>
                        ))}
                    </div>

                    {/* Submit Button */}
                    <div className="px-8 py-6 bg-gray-50 text-right border-t border-gray-200">
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className={`inline-flex justify-center py-3 px-8 border border-transparent shadow-sm text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 min-w-[200px] transition-colors ${isSubmitting ? 'opacity-80 cursor-not-allowed' : ''}`}
                        >
                            {isSubmitting ? (
                                <>
                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Processing...
                                </>
                            ) : (
                                'Submit Questionnaire'
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
