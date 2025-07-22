'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';


export default function UpdateQuestionnaireForm({ questionnaire, token }) {
    const [questions, setQuestions] = useState(questionnaire.questions || []);
    const [currentSlide, setCurrentSlide] = useState(0);
    const [msg, setMsg] = useState('');
    const [title, setTitle] = useState(questionnaire.title);
    const router = useRouter();
    const [suggestions, setSuggestions] = useState([]);

    const handleQuestionChange = (index, value) => {
        const updated = [...questions];
        updated[index].text = value;
        setQuestions(updated);

        const input = value.toLowerCase();
        const matches = recommendedQuestions.filter(
            (q) => q.toLowerCase().includes(input) && input.length > 0
        );
        setSuggestions(matches);
    };

    const isValidForm = () => {
        for (let i = 0; i < questions.length; i++) {
            const q = questions[i];
            if (!q.text.trim()) {
                setCurrentSlide(i);
                setMsg(`❌ Please fill the question ${i + 1}`);
                return false;
            }

            for (let j = 0; j < q.options.length; j++) {
                const opt = q.options[j];
                if (!opt.label.trim()) {
                    setCurrentSlide(i);
                    setMsg(`❌ Please fill all options for Question ${i + 1}`);
                    return false;
                }
            }
        }
        return true;
    };

    const addQuestion = () => {
        if (!isValidForm()) return;
        const newQuestions = [...questions, { text: '', options: [{ label: '' }] }];
        setQuestions(newQuestions);
        setCurrentSlide(newQuestions.length - 1);
        setMsg('');
    };

    const removeQuestion = (index) => {
        const updated = questions.filter((_, i) => i !== index);
        setQuestions(updated);
        setCurrentSlide(Math.min(currentSlide, updated.length - 1));
        setMsg('');
    };
    const applySuggestion = (suggestion) => {
        const updated = [...questions];
        updated[currentSlide].text = suggestion;
        setQuestions(updated);
        setSuggestions([]); // Hide suggestions
    };


    const addOption = (qIndex) => {
        const updated = [...questions];
        updated[qIndex].options.push({ label: '' });
        setQuestions(updated);
    };

    const removeOption = (qIndex, oIndex) => {
        const updated = [...questions];
        updated[qIndex].options = updated[qIndex].options.filter((_, i) => i !== oIndex);
        setQuestions(updated);
    };

    const handleOptionChange = (qIndex, oIndex, key, value) => {
        const updated = [...questions];
        updated[qIndex].options[oIndex][key] = value;
        setQuestions(updated);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!isValidForm()) return;

        try {
            const res = await fetch(`http://localhost:3030/api/v1/riskprofile/update/questionarrie/${questionnaire._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({ title, questions }),
            });
            if (res.ok) {
                // toast.success('✅ Questionnaire Updated!');
                setMsg("Successfully updated")
                setTimeout(() => {
                    router.push("/riskprofile")
                }, 3000)
            } else {
                throw new Error('❌ Failed to update questionnaire');
            }
        } catch (err) {
            console.error(err.message);
            setMsg("❌ Something went wrong.");
        }
    };

    const nextSlide = () => {
        if (currentSlide < questions.length - 1) {
            setCurrentSlide(currentSlide + 1);
        } else {
            addQuestion();
        }
    };

    const prevSlide = () => {
        setCurrentSlide(Math.max(0, currentSlide - 1));
    };

    return (
        <div className="min-h-screen p-4 md:p-8 bg-gray-50">
            <div className="max-w-3xl w-full mx-auto bg-white rounded-xl shadow-md overflow-hidden">
                {/* Header */}
                <div className="bg-gradient-to-r from-[#00d09c] to-[#00b98b] px-6 py-4">
                    <h1 className="text-xl font-bold text-white">Update Questionnaire</h1>
                </div>

                <form onSubmit={handleSubmit}>
                    {/* Title Field */}
                    <div className="p-6">
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Questionnaire Title"
                            className="w-full px-4 py-2 mb-4 text-gray-800 border-b-2 border-gray-200 focus:border-purple-500 focus:outline-none"
                            required
                        />
                    </div>
                    {/* Tabs */}
                    <div className="border-b border-gray-200">
                        <div className="flex overflow-x-auto">
                            {questions.map((_, index) => (
                                <button
                                    key={index}
                                    type="button"
                                    onClick={() => setCurrentSlide(index)}
                                    className={`px-4 py-3 text-sm font-medium border-b-2 ${currentSlide === index
                                        ? 'border-teal-500 text-teal-600'
                                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                        }`}
                                >
                                    Question {index + 1}
                                </button>
                            ))}
                            <button
                                type="button"
                                onClick={addQuestion}
                                className="px-4 py-3 text-sm font-medium text-teal-600 hover:text-purple-800 flex items-center"
                            >
                                <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                </svg>
                                Add
                            </button>
                        </div>
                    </div>

                    {/* Editor */}
                    <div className="p-6">
                        <div className="mb-6 flex justify-between items-center">
                            <h2 className="text-lg font-medium text-gray-800">Question {currentSlide + 1}</h2>
                            {questions.length > 1 && (
                                <button
                                    type="button"
                                    onClick={() => removeQuestion(currentSlide)}
                                    className="text-gray-400 hover:text-red-500"
                                    aria-label="Remove question"
                                >
                                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            )}
                        </div>
                        <div className="mb-6 relative">
                            <input
                                type="text"
                                value={questions[currentSlide].text}
                                onChange={(e) => handleQuestionChange(currentSlide, e.target.value)}
                                placeholder="Enter your question"
                                className="w-full px-4 py-2 text-gray-800 border-b-2 border-gray-200 focus:border-teal-500 focus:outline-none"
                                required
                                autoFocus
                            />
                            {suggestions.length > 0 && (
                                <ul className="absolute left-0 right-0 bg-white border border-gray-200 rounded-md shadow-md mt-1 max-h-60 overflow-y-auto z-20">
                                    {suggestions.map((sugg, i) => (
                                        <li
                                            key={i}
                                            onClick={() => applySuggestion(sugg)}
                                            className="px-4 py-2 hover:bg-gray-100 text-sm cursor-pointer"
                                        >
                                            {sugg}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>


                        {/* Options */}
                        <div className="space-y-3">
                            {questions[currentSlide]?.options.map((opt, oIndex) => (
                                <div key={oIndex} className="flex items-center group">
                                    <div className="flex items-center w-full bg-gray-50 rounded-lg p-3">
                                        <div className="w-5 h-5 rounded-full border border-gray-300 mr-3 flex-shrink-0" />
                                        <input
                                            type="text"
                                            value={opt.label}
                                            onChange={(e) => handleOptionChange(currentSlide, oIndex, 'label', e.target.value)}
                                            placeholder={`Option ${oIndex + 1}`}
                                            className="flex-1 bg-transparent border-b border-gray-200 focus:border-purple-500 focus:outline-none py-1 px-1"
                                            required
                                        />
                                        {questions[currentSlide]?.options.length > 1 && (
                                            <button
                                                type="button"
                                                onClick={() => removeOption(currentSlide, oIndex)}
                                                className="ml-3 text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100"
                                                aria-label="Remove option"
                                            >
                                                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                                </svg>
                                            </button>
                                        )}
                                    </div>
                                </div>
                            ))}

                            <button
                                type="button"
                                onClick={() => addOption(currentSlide)}
                                className="mt-3 flex items-center text-sm text-teal-600 hover:text-teal-800"
                            >
                                <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                </svg>
                                Add Option
                            </button>
                        </div>
                    </div>

                    {/* Controls */}
                    <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-between">
                        <div className="flex space-x-2">
                            <button
                                type="button"
                                onClick={prevSlide}
                                disabled={currentSlide === 0}
                                className={`px-4 py-2 rounded-md ${currentSlide === 0 ? 'text-gray-400 cursor-not-allowed' : 'text-teal-600 hover:bg-purple-50'}`}
                            >
                                Previous
                            </button>
                            <button
                                type="button"
                                onClick={nextSlide}
                                className="px-4 py-2 bg-black hover:bg-purple-700 text-white rounded-md"
                            >
                                {currentSlide === questions.length - 1 ? 'Add Question' : 'Next'}
                            </button>
                        </div>
                        <button
                            type="submit"
                            className="px-6 py-2 bg-gradient-to-r from-[#00d09c] to-[#00b98b] hover:bg-green-700 text-white rounded-md shadow-sm"
                        >
                            Update Questionnaire
                        </button>
                    </div>
                </form>
                {msg && (
                    <div className={`mt-6 p-4 rounded-lg ${msg.toLowerCase().includes('success') ?
                        'bg-green-50 text-green-800 border border-green-200' :
                        'bg-red-50 text-red-800 border border-red-200'}`}
                    >
                        <p className="font-medium">{msg}</p>
                    </div>
                )}
            </div>
        </div>
    );
}
