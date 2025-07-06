// components/ClientLayoutWrapper.jsx
'use client';
import Sidebar from './Sidebar';
import { useAuth } from '../providers/AuthProvider';
import LoginForm from '../features/auth/LoginForm';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function ClientLayoutWrapper({ children }) {
    const { user, isAuthorized } = useAuth();
    const router = useRouter()
    useEffect(() => {
        if (!isAuthorized) {
            router.push("/login");
        }
    }, [isAuthorized, router]);
    return (
        !isAuthorized ? (
            <LoginForm />
        ) : (
            <Sidebar user={user}>{children}</Sidebar>
        )

    );
}