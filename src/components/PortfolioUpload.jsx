'use client';
import { useState } from 'react';
import { API_BASE, USER_MANAGE_ROUTES } from '@/helpers/apiRoutes';
import clientAxiosInstance from '@/lib/clientAxios';

export default function PortfolioUpload({ userId }) {
    const [file, setFile] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(null);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
        setSuccess(false);
        setError(null);
    };

    const handleUpload = async () => {
        if (!file) return;

        const formData = new FormData();
        formData.append("portfolioFile", file);
        try {
            setUploading(true);
            const data = await clientAxiosInstance.put(`${API_BASE}/${USER_MANAGE_ROUTES.UPLOAD_PORTFOLIO}/${userId}`, formData);
            setSuccess(true);
            console.log(data);
            setFile(null);
        } catch (err) {
            setError("Upload failed. Try again.");
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="mt-6 bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                <svg
                    className="w-5 h-5 mr-2 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1M16 12l-4-4m0 0l-4 4m4-4v12"
                    />
                </svg>

                Upload Portfolio
            </h3>
            <div className="mt-4">
                <input
                    type="file"
                    accept=".pdf,.doc,.docx,.xls,.xlsx"
                    onChange={handleFileChange}
                    className="block w-full border border-gray-300 rounded px-2 py-1"
                />
                <button
                    onClick={handleUpload}
                    disabled={uploading || !file}
                    className="mt-3 bg-blue-600 text-center text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
                >
                    {uploading ? "Uploading..." : "Upload"}
                </button>

                {success && <p className="mt-2 text-green-600">Portfolio uploaded successfully!</p>}
                {error && <p className="mt-2 text-red-600">{error}</p>}
            </div>
        </div>
    );
}
