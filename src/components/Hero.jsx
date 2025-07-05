"use client";
import axios from "axios";
import { useAuth } from "../providers/AuthProvider";
import { CustomButton } from "./CustomButton";
import { CiLogout, CiUser } from "react-icons/ci";
import { FiMail, FiUser } from "react-icons/fi";
import { useRouter } from "next/navigation";

export function Hero() {
    const { isAuthorized, user, setUser, setIsAuthorized } = useAuth();
    const router = useRouter();

    const handleLogout = async () => {
        try {
            await axios.get("http://localhost:3030/api/v1/auth/logout", {
                withCredentials: true,
            });
            setUser(null);
            setIsAuthorized(false);
            router.replace("/login");
        } catch (err) {
            console.error("Logout failed:", err);
        }
    };

    return (
        <div className="max-w-md mx-auto px-4 py-6">
            {/* Welcome Section - Compact Design */}
            {isAuthorized && (
                <div className="bg-white rounded-lg p-5 shadow-sm border border-gray-200">
                    <div className="flex flex-col items-center text-center space-y-4">
                        {/* Compact User Avatar */}
                        <div className="w-14 h-14 rounded-full bg-blue-50 flex items-center justify-center mb-2">
                            <CiUser className="text-2xl text-blue-600" />
                        </div>

                        {/* Compact Welcome Message */}
                        <div>
                            <h1 className="text-xl font-semibold text-gray-800">
                                Welcome, <span className="text-blue-600">{user?.username}</span>
                            </h1>
                            <p className="text-sm text-gray-500 mt-1">
                                You're successfully logged in
                            </p>
                        </div>

                        {/* Compact User Info */}
                        <div className="w-full space-y-2">
                            <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg text-sm">
                                <FiUser className="text-gray-500 flex-shrink-0" />
                                <span className="truncate">{user?.username}</span>
                            </div>
                            <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg text-sm">
                                <FiMail className="text-gray-500 flex-shrink-0" />
                                <span className="truncate">{user?.email}</span>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Action Buttons - Compact */}
            <div className="mt-6">
                {!isAuthorized ? (
                    <CustomButton value="Login" className="w-full" />
                ) : (
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center justify-center space-x-2 bg-red-50 text-red-600 px-4 py-2.5 rounded-lg hover:bg-red-100 transition-colors text-sm font-medium border border-red-100"
                    >
                        <CiLogout />
                        <span>Sign Out</span>
                    </button>
                )}
            </div>

            {/* Quick Actions - Only show when space allows */}
            {isAuthorized && (
                <div className="mt-3 grid grid-cols-1">
                    <button className="text-xs sm:text-sm bg-white p-2.5 rounded border border-gray-200 hover:bg-gray-50 transition-colors">
                        Settings
                    </button>
                </div>
            )}
        </div>
    );
}