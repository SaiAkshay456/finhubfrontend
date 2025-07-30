"use client";

import { useEffect, useState } from "react";
import { Plus, Calendar, Download, FileText } from "lucide-react";
import axiosInstance from "@/helpers/axios";
import MeetingModal from "@/components/CreateMeetingRecord";

function MeetingRecords({user}) {
  const [records, setRecords] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [showAllModal, setShowAllModal] = useState(false);
  const fetchRecords = async () => {
    setIsLoading(true);
    try {
      const { data } = await axiosInstance.get(`/v1/meeting-record/list/${user}`);
      setRecords(data);
    } catch (error) {
      console.error("Failed to fetch records:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownload = async (id) => {
    try {
      const { data } = await axiosInstance.get(`/v1/meeting-record/download/${id}`);
      window.open(data.url, "_blank");
    } catch (err) {
      console.error("Download failed", err);
      alert("Failed to get download link.");
    }
  };

  useEffect(() => {
    fetchRecords();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 px-4 py-8 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Meeting Records</h1>
          <p className="text-base text-gray-600">Manage and access your meeting documentation efficiently.</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-emerald-500 to-emerald-700 text-white rounded-xl shadow-md hover:shadow-emerald-500/30 transition-all duration-300 font-semibold group text-sm"
        >
          <Plus className="w-4 h-4 group-hover:rotate-90 transition-transform duration-200" />
          Create Meeting Record
        </button>
      </div>

      {isLoading ? (
        <div className="text-center py-16 text-gray-400 text-base">Loading records...</div>
      ) : records.length === 0 ? (
        <div className="text-center py-16">
          <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-600 mb-2">No meeting records yet</h3>
          <p className="text-gray-500 text-base">Create your first meeting record to get started.</p>
        </div>
      ) : (
        <>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
         {records.slice(0, 5).map((record) => (
            <div
              key={record._id}
              className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group border border-gray-100"
            >
              <div className="relative h-40 bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
                <FileText className="w-16 h-16 text-gray-300" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <div className="p-5">
                <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-emerald-600 transition-colors duration-200 break-words">
                  {record.fileName}
                </h3>
                <div className="flex items-center gap-3 text-sm text-gray-600 mb-4">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-4 h-4 text-gray-500" />
                    <span className="font-medium">
                      {new Date(record.date).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => handleDownload(record._id)}
                  className="inline-flex items-center gap-2 w-full justify-center px-4 py-2.5 bg-gradient-to-r from-emerald-500 to-emerald-700 text-white rounded-xl shadow-sm hover:shadow-emerald-500/20 transition-all duration-300 font-semibold group/btn text-sm"
                >
                  <Download className="w-4 h-4 group-hover/btn:translate-y-0.5 transition-transform duration-200" />
                  Download
                </button>
              </div>
            </div>
          ))}
        </div>
    
        {records.length > 5 && (
          <div className="flex justify-center mt-6">
            <button
              onClick={() => setShowAllModal(true)}
              className="text-emerald-600 hover:text-emerald-800 text-sm font-semibold"
            >
              View All Records
            </button>
          </div>
        )}
        </>
      )}
      {showModal && <MeetingModal onClose={() => setShowModal(false)} onCreated={fetchRecords} user={user} />}
      {showAllModal && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
    <div className="bg-white rounded-xl max-w-4xl w-full max-h-[80vh] overflow-y-auto p-6 relative">
      <button
        onClick={() => setShowAllModal(false)}
        className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
      >
        ✕
      </button>
      <h2 className="text-xl font-semibold mb-4 text-gray-800">All Meeting Records</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {records.map((record) => (
          <div
            key={record._id}
            className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group border border-gray-100"
          >
            <div className="relative h-40 bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
              <FileText className="w-16 h-16 text-gray-300" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
            <div className="p-5">
              <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-emerald-600 transition-colors duration-200 break-words">
                {record.fileName}
              </h3>
              <div className="flex items-center gap-3 text-sm text-gray-600 mb-4">
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-gray-500" />
                  <span className="font-medium">
                    {new Date(record.date).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>
                </div>
              </div>
              <button
                onClick={() => handleDownload(record._id)}
                className="inline-flex items-center gap-2 w-full justify-center px-4 py-2.5 bg-gradient-to-r from-emerald-500 to-emerald-700 text-white rounded-xl shadow-sm hover:shadow-emerald-500/20 transition-all duration-300 font-semibold group/btn text-sm"
              >
                <Download className="w-4 h-4 group-hover/btn:translate-y-0.5 transition-transform duration-200" />
                Download
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
)}

    </div>
  );
}

export default MeetingRecords;
