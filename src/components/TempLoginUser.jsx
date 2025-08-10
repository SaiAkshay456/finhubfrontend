"use client";

import { useState } from "react";
import clientAxiosInstance from "@/lib/clientAxios";

export default function TempLoginUser({ tokenId, onLoginSuccess }) {
    const [formData, setFormData] = useState({ username: "", password: "" });
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");

        try {
            const { data } = await clientAxiosInstance.post(
                "/v1/response-login/login-user",
                { ...formData, tokenId },
                { headers: { "Content-Type": "application/json" }, withCredentials: true }
            );

            if (!data.success) {
                setError(data.message || "Invalid credentials");
                return;
            }

            // Grab token from cookies
            const match = document.cookie.match(/(?:^|;\s*)temp_token=([^;]+)/);
            if (match) {
                onLoginSuccess?.(match[1]);
            }
        } catch (err) {
            setError(err.response?.data?.message || "Something went wrong");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
                <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-center space-x-3">
                    <p className="text-red-700 text-sm font-medium">{error}</p>
                </div>
            )}

            <div className="space-y-2">
                <label htmlFor="username" className="block text-sm font-semibold text-gray-700">
                    Username
                </label>
                <input
                    id="username"
                    type="text"
                    placeholder="Enter your username"
                    className="w-full border px-3 py-2 rounded-xl"
                    value={formData.username}
                    onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                    required
                    disabled={isLoading}
                />
            </div>

            <div className="space-y-2">
                <label htmlFor="password" className="block text-sm font-semibold text-gray-700">
                    Password
                </label>
                <input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    className="w-full border px-3 py-2 rounded-xl"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    required
                    disabled={isLoading}
                />
            </div>

            <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-4 rounded-xl disabled:opacity-50"
            >
                {isLoading ? "Signing in..." : "Sign In"}
            </button>
        </form>
    );
}
