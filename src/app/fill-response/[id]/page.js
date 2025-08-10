// import { cookies } from "next/headers";
// import ResponseUser from "../../../components/ResponseUser";
// import TempLoginUser from "../../../components/TempLoginUser";
// import axiosInstance from "@/helpers/axios";

// export async function getExpiryOfUUID(id) {
//     try {
//         const { data } = await axiosInstance.get(`/v1/response/fill-response/${id}`);
//         const result = data
//         console.log(result.data)
//         return result?.data || null;
//     } catch (err) {
//         console.error("Error fetching link data:", err);
//         return null;
//     }
// }
// export async function getQuestionsById(questionnaireId) {
//     try {
//         const { data } = await axiosInstance.get(`/v1/response/get/questionarrie/${questionnaireId}`);
//         console.log(data.questions)
//         return data?.questions || [];
//     } catch (err) {
//         console.error("Error fetching questions:", err);
//         return [];
//     }
// }

// export default async function FillResponsePage({ params }) {
//     const { id } = params;
//     if (!id) return <div className="text-red-600">No ID in URL</div>;

//     const token = await cookies().get("temp_token")?.value;

//     if (!token) {
//         return (
//             <div className="max-w-md mx-auto p-6 mt-20 bg-white shadow rounded">
//                 <h2 className="text-xl font-bold mb-2 text-center text-gray-700">Temporary Login</h2>
//                 <p className="text-sm text-gray-500 mb-4 text-center">
//                     Enter the temporary credentials sent to your email.
//                 </p>
//                 <TempLoginUser tokenId={id} />
//             </div>
//         );
//     }

//     const linkData = await getExpiryOfUUID(id);
//     if (!linkData) {
//         return (
//             <div className="text-center mt-20 text-yellow-700 text-lg">
//                 You have already submitted your response. Please contact the
//                 administrator if you need to update it.
//             </div>
//         );
//     }

//     const isExpired = new Date(linkData.expiresAt) < new Date();
//     if (isExpired) {
//         return (
//             <div className="text-center mt-20 text-yellow-700 text-lg">
//                 This link has expired or already been used.
//             </div>
//         );
//     }

//     const questions = await getQuestionsById(linkData.questionnaireId);

//     return (
//         <div className="max-w-3xl mx-auto p-6">
//             <div className="mb-8 text-center">
//                 <h1 className="text-3xl font-bold text-gray-900 mb-2">Questionnaire Response</h1>
//                 <p className="text-gray-600 max-w-lg mx-auto">
//                     Please provide your answers below. All responses are submitted securely.
//                 </p>
//             </div>

//             <div className="bg-white rounded-xl shadow-md p-6">
//                 <div className="mb-6 text-center">
//                     <h2 className="text-xl font-semibold text-gray-800">
//                         {questions.title || "Untitled Questionnaire"}
//                     </h2>
//                     <p className="text-gray-600 text-sm mt-2">
//                         Response deadline: {new Date(linkData.expiresAt).toLocaleString()}
//                     </p>
//                 </div>

//                 <ResponseUser
//                     questions={questions.questions}
//                     questionarieId={linkData.questionnaireId}
//                     userId={linkData.userId}
//                     tokenId={id}
//                 />
//             </div>

//             <div className="mt-6 text-center text-sm text-gray-500">
//                 <p>Your responses will be recorded anonymously</p>
//             </div>
//         </div>
//     );
// }


'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';

// Your Components
import ResponseUser from "../../../components/ResponseUser";
import TempLoginUser from "../../../components/TempLoginUser";

// Use your client-side Axios instance
import clientAxiosInstance from "@/lib/clientAxios";

// UI Components for better user experience
const LoadingSpinner = () => (
    <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
    </div>
);

const MessageDisplay = ({ message, type = 'error' }) => {
    const color = type === 'error' ? 'red' : 'yellow';
    return (
        <div className={`text-center mt-20 text-${color}-700 text-lg p-4 bg-${color}-100 rounded-md`}>
            {message}
        </div>
    );
};

export default function FillResponsePage() {
    const params = useParams();
    const { id } = params;

    // State to manage UI and data
    const [status, setStatus] = useState('loading'); // loading, loginRequired, expired, submitted, success, error
    const [linkData, setLinkData] = useState(null);
    const [questionsData, setQuestionsData] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');

    // Central function to fetch all necessary data
    const fetchData = async () => {
        if (!id) {
            setStatus('error');
            setErrorMessage('No ID found in the URL.');
            return;
        }

        setStatus('loading');
        try {
            // 1. Fetch link metadata (this also implicitly checks auth)
            const { data: linkResult } = await clientAxiosInstance.get(`/v1/response/fill-response/${id}`);

            if (!linkResult.data) {
                setStatus('submitted');
                return;
            }

            const fetchedLinkData = linkResult.data;
            setLinkData(fetchedLinkData);

            // 2. Check if the link is expired
            if (new Date(fetchedLinkData.expiresAt) < new Date()) {
                setStatus('expired');
                return;
            }

            // 3. If link is valid, fetch the questionnaire
            const { data: questionsResult } = await clientAxiosInstance.get(`/v1/response/get/questionarrie/${fetchedLinkData.questionnaireId}`);

            setQuestionsData(questionsResult);
            setStatus('success');

        } catch (err) {
            console.error("Error during data fetch:", err);
            // Handle different error types
            if (err.response?.status === 401 || err.response?.status === 403) {
                setStatus('loginRequired');
            } else if (err.response?.data?.message?.includes("already submitted")) {
                setStatus('submitted');
            } else {
                setStatus('error');
                setErrorMessage(err.response?.data?.message || 'An unexpected error occurred.');
            }
        }
    };
    useEffect(() => {
        fetchData();
    }, [id]);
    const handleLoginSuccess = () => {
        fetchData();
    };
    if (status === 'loading') {
        return <LoadingSpinner />;
    }

    if (status === 'error') {
        return <MessageDisplay message={errorMessage} type="error" />;
    }

    if (status === 'loginRequired') {
        return (
            <div className="max-w-md mx-auto p-6 mt-20 bg-white shadow rounded">
                <h2 className="text-xl font-bold mb-2 text-center text-gray-700">Temporary Login</h2>
                <p className="text-sm text-gray-500 mb-4 text-center">
                    Enter the temporary credentials sent to your email.
                </p>
                <TempLoginUser tokenId={id} onLoginSuccess={handleLoginSuccess} />
            </div>
        );
    }

    if (status === 'submitted') {
        return (
            <MessageDisplay
                message="You have already submitted your response. Please contact the administrator if you need to update it."
                type="warning"
            />
        );
    }

    if (status === 'expired') {
        return (
            <MessageDisplay
                message="This link has expired or already been used."
                type="warning"
            />
        );
    }

    if (status === 'success' && linkData && questionsData) {
        return (
            <div className="max-w-3xl mx-auto p-6">
                <div className="mb-8 text-center">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Questionnaire Response</h1>
                    <p className="text-gray-600 max-w-lg mx-auto">
                        Please provide your answers below. All responses are submitted securely.
                    </p>
                </div>
                <div className="bg-white rounded-xl shadow-md p-6">
                    <div className="mb-6 text-center">
                        <h2 className="text-xl font-semibold text-gray-800">
                            {questionsData.title || "Untitled Questionnaire"}
                        </h2>
                        <p className="text-gray-600 text-sm mt-2">
                            Response deadline: {new Date(linkData.expiresAt).toLocaleString()}
                        </p>
                    </div>
                    <ResponseUser
                        questions={questionsData.questions}
                        questionarieId={linkData.questionnaireId}
                        userId={linkData.userId}
                        tokenId={id}
                    />
                </div>
                <div className="mt-6 text-center text-sm text-gray-500">
                    <p>Your responses will be recorded anonymously</p>
                </div>
            </div>
        );
    }

    return <MessageDisplay message="An unknown error occurred." />;
}
