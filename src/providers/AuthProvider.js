
"use client";

import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children, initialUser = null, initialAuth = false }) {
    const [user, setUser] = useState(initialUser);
    const [isAuthorized, setIsAuthorized] = useState(initialAuth);
    return (
        <AuthContext.Provider value={{ user, setUser, isAuthorized, setIsAuthorized }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}
