// app/login/page.jsx

import LoginForm from '../../features/auth/LoginForm';

export default async function LoginPage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <LoginForm />
        </div>
    );
}
