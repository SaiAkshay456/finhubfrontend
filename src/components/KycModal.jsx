'use client';
import { useState } from 'react';

export default function KycModal({ kycDetails }) {
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedDoc, setSelectedDoc] = useState({ title: '', url: '' });

    const handleOpen = (title, url) => {
        setSelectedDoc({ title, url });
        setModalOpen(true);
    };

    return (
        <>
            <div className="flex gap-3 mt-4 bg-white">
                {kycDetails?.aadharCard && (
                    <button
                        onClick={() => handleOpen('Aadhaar Card', kycDetails.aadharCard)}
                        className="px-2 py-1 text-xs font-normal bg-blue-100 text-blue-800 cursor-pointer rounded hover:bg-blue-200"
                    >
                        View Aadhaar
                    </button>
                )}
                {kycDetails?.panCard && (
                    <button
                        onClick={() => handleOpen('PAN Card', kycDetails.panCard)}
                        className="px-2 py-1 text-xs font-normal bg-green-100 cursor-pointer text-green-800 rounded hover:bg-green-200"
                    >
                        View PAN
                    </button>
                )}
            </div>

            {modalOpen && (
                <div className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm flex items-center justify-center p-4">
                    <div className="bg-white rounded-lg max-w-3xl w-full shadow-lg relative h-[90vh]">
                        <div className="flex justify-between items-center border-b px-4 py-2">
                            <h2 className="text-lg font-semibold">{selectedDoc.title}</h2>
                            <button
                                onClick={() => setModalOpen(false)}
                                className="text-gray-500 hover:text-gray-700 text-xl font-bold"
                            >
                                ×
                            </button>
                        </div>
                        <div className="p-4 h-full overflow-auto">
                            <iframe
                                src={selectedDoc.url}
                                title={selectedDoc.title}
                                className="w-full h-[75vh] rounded"
                            ></iframe>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
