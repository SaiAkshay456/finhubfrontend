import { cookies } from "next/headers";
import ResponseUser from "../../../components/ResponseUser";
import TempLoginUser from "../../../components/TempLoginUser";
import axiosInstance from "@/helpers/axios";

export async function getExpiryOfUUID(id) {
    try {
        const { data } = await axiosInstance.get(`/v1/response/fill-response/${id}`, {
        });

        const result = data
        console.log(result.data)
        return result?.data || null;
    } catch (err) {
        console.error("Error fetching link data:", err);
        return null;
    }
}
export async function getQuestionsById(questionnaireId) {
    try {
        const { data } = await axiosInstance.get(`/v1/response/get/questionarrie/${questionnaireId}`, {
        });
        console.log(data.questions)
        return data?.questions || [];
    } catch (err) {
        console.error("Error fetching questions:", err);
        return [];
    }
}

export default async function FillResponsePage({ params }) {
    const { id } = params;
    if (!id) return <div className="text-red-600">No ID in URL</div>;

    const token = await cookies().get("temp_token")?.value;

    if (!token) {
        return (
            <div className="max-w-md mx-auto p-6 mt-20 bg-white shadow rounded">
                <h2 className="text-xl font-bold mb-2 text-center text-gray-700">Temporary Login</h2>
                <p className="text-sm text-gray-500 mb-4 text-center">
                    Enter the temporary credentials sent to your email.
                </p>
                <TempLoginUser tokenId={id} />
            </div>
        );
    }

    const linkData = await getExpiryOfUUID(id);
    if (!linkData) {
        return (
            <div className="text-center mt-20 text-yellow-700 text-lg">
                You have already submitted your response. Please contact the
                administrator if you need to update it.
            </div>
        );
    }

    const isExpired = new Date(linkData.expiresAt) < new Date();
    if (isExpired) {
        return (
            <div className="text-center mt-20 text-yellow-700 text-lg">
                This link has expired or already been used.
            </div>
        );
    }

    const questions = await getQuestionsById(linkData.questionnaireId);

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
                        {questions.title || "Untitled Questionnaire"}
                    </h2>
                    <p className="text-gray-600 text-sm mt-2">
                        Response deadline: {new Date(linkData.expiresAt).toLocaleString()}
                    </p>
                </div>

                <ResponseUser
                    questions={questions.questions}
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
