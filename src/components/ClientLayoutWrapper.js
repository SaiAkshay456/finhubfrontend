// components/ClientLayoutWrapper.jsx
'use client';
import Sidebar from './Sidebar';
import { useAuth } from '../providers/AuthProvider';

export default function ClientLayoutWrapper({ children }) {
    const { user, isAuthorized } = useAuth();

    if (!isAuthorized) return;

    return (
        <Sidebar user={user}>
            {children}
        </Sidebar>
    );
}
