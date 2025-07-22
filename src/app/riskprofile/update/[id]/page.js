import { cookies } from 'next/headers';
import UpdateQuestionnaireForm from './UpdateForm';
// import QuestionnaireEditClient from './QuestionnaireEditClient';
// import { notFound } from 'next/navigation';

export default async function EditPage({ params }) {
    const { id } = params;
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;
    let data = null
    let error = null;
    try {
        const res = await fetch(`http://localhost:3030/api/v1/riskprofile/get/questionarrie-user/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
            credentials: "include",
            cache: 'no-store'
        });
        if (!res.ok) {
            const errData = await res.json();
            error = errData?.message || 'Failed to load questionnaire';
        } else {
            data = await res.json();
        }
    } catch (err) {
        console.error('Fetch error:', err);
        error = 'Something went wrong. Please try again later.';
    }
    console.log(error)
    console.log(data)
    console.log(data.questions)//once clg and see
    const questionnaire = data.questions
    return (
        <UpdateQuestionnaireForm questionnaire={questionnaire} token={token} />
    );
}
