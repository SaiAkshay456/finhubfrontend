import { cookies } from 'next/headers';
import UpdateQuestionnaireForm from './UpdateForm';
import { AxiosError } from 'axios';
import axiosInstance from '@/helpers/axios';
import { API_BASE, RISK_ROUTES } from '@/helpers/apiRoutes';
// import QuestionnaireEditClient from './QuestionnaireEditClient';
// import { notFound } from 'next/navigation';

export default async function EditPage({ params }) {
    const { id } = params;
    const cookieStore = cookies();
    const token = cookieStore.get('token')?.value;
    let data = null
    let error = null;
    let loading = false
    try {
        loading = true
        const res = await axiosInstance.get(`${API_BASE}/${RISK_ROUTES.GET_QUESTIONNARIE_OF_USER}/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        data = res.data;
        console.log(data); // Safe to log
    } catch (err) {
        if (axios.isAxiosError(err)) {
            if (err.response?.status === 401) {
                setError(err.response.data.message || 'Unauthorized access.');
            } else {
                setError('Server error. Try again later.');
            }
        } else {
            setError('Unknown error. Please try again.');
        }
    } finally {
        loading = false
    }
    if (loading) {
        <div className="flex items-center justify-center h-screen">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>
        </div>
    }
    console.log(error)
    console.log(data)
    console.log(data.questions)//once clg and see
    const questionnaire = data.questions
    return (
        <UpdateQuestionnaireForm questionnaire={questionnaire} token={token} />
    );
}
