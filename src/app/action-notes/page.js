"use client"

import { useState, useEffect } from "react"
import { Plus, Download, Calendar, FileText, NotebookText } from "lucide-react"
import axiosInstance from "@/helpers/axios"
import MeetingModal from "../../components/CreateMeetingRecord"
import CreateActionNoteModal from "@/components/CreateActionNote"

function ActionNotesTabs() {
  const [activeTab, setActiveTab] = useState("highlights")
  const [showModal, setShowModal] = useState(false)
  const [records, setRecords] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [actionNotes, setActionNotes] = useState([])
  const [isNotesLoading, setIsNotesLoading] = useState(true)
  const [showActionNoteModal, setShowActionNoteModal] = useState(false)

  const fetchActionNotes = async () => {
    setIsNotesLoading(true)
    try {
      const { data } = await axiosInstance.get("/v1/action-notes/list")
      setActionNotes(data)
    } catch (err) {
      console.error("Failed to fetch action notes", err)
    } finally {
      setIsNotesLoading(false)
    }
  }

  const fetchRecords = async () => {
    setIsLoading(true)
    try {
      const { data } = await axiosInstance.get("/v1/meeting-record/list")
      setRecords(data)
    } catch (error) {
      console.error("Failed to fetch records:", error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (activeTab === "highlights") {
      fetchActionNotes()
    }
    if (activeTab === "notes") {
      fetchRecords()
    }
  }, [activeTab])

  const handleDownload = async (id) => {
    try {
      const { data } = await axiosInstance.get(`/v1/meeting-record/download/${id}`)
      window.open(data.url, "_blank")
    } catch (err) {
      console.error("Download failed", err)
      alert("Failed to get download link.")
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tabs */}
        <div className="mb-6 border-b border-gray-200 flex gap-4">
        <button
            onClick={() => setActiveTab("highlights")}
            className={`py-2 px-4 font-medium text-base rounded-t-lg transition-all duration-200
              ${
                activeTab === "highlights"
                  ? "text-emerald-600 border-b-2 border-emerald-600"
                  : "text-gray-500 hover:text-emerald-600 hover:border-emerald-300 border-b-2 border-transparent"
              }`}
          >
            Action Notes
          </button>
          <button
            onClick={() => setActiveTab("notes")}
            className={`py-2 px-4 font-medium text-base rounded-t-lg transition-all duration-200
              ${
                activeTab === "notes"
                  ? "text-emerald-600 border-b-2 border-emerald-600"
                  : "text-gray-500 hover:text-emerald-600 hover:border-emerald-300 border-b-2 border-transparent"
              }`}
          >
            Meeting Records
          </button>
          
        </div>

        {/* Tab Content */}
        

        {activeTab === "highlights" && (
          <>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Action Notes</h1>
                <p className="text-base text-gray-600">Keep track of important tasks and follow-ups.</p>
              </div>
              <button
                onClick={() => setShowActionNoteModal(true)}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-emerald-500 to-emerald-700 text-white rounded-xl shadow-md hover:shadow-emerald-500/30 transition-all duration-300 font-semibold group text-sm"
              >
                <Plus className="w-4 h-4 group-hover:rotate-90 transition-transform duration-200" />
                Add Action Note
              </button>
            </div>

            {isNotesLoading ? (
              <div className="text-center py-16 text-gray-400 text-base">Loading action notes...</div>
            ) : actionNotes.length === 0 ? (
              <div className="text-center py-16">
                <NotebookText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-600 mb-2">No action notes yet</h3>
                <p className="text-gray-500 text-base">Click the button above to create your first note.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {actionNotes.map((note) => (
                  <div
                    key={note._id}
                    className="bg-white p-5 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100"
                  >
                    <h4 className="text-lg font-semibold text-gray-900 mb-2 break-words">{note.task}</h4>
                    <div className="flex items-center gap-1.5 text-sm text-gray-600 mb-1">
                      <Calendar className="w-4 h-4 text-gray-500" />
                      <span className="font-medium">
                        Due:{" "}
                        {new Date(note.dueDate).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500">
                      Reminder: {note.reminderType === "email" ? "Email" : "WhatsApp"}
                    </p>
                  </div>
                ))}
              </div>
            )}

            {/* Action Note Modal */}
            {showActionNoteModal && (
              <CreateActionNoteModal
                onClose={() => setShowActionNoteModal(false)}
                onCreated={() => fetchActionNotes()}
              />
            )}
          </>
        )}
        {activeTab === "notes" && (
          <>
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

            {/* Records Grid */}
            {isLoading ? (
              <div className="text-center py-16 text-gray-400 text-base">Loading records...</div>
            ) : records.length === 0 ? (
              <div className="text-center py-16">
                <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-600 mb-2">No meeting records yet</h3>
                <p className="text-gray-500 text-base">Create your first meeting record to get started.</p>
              </div>
            ) : (
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
            )}

            {/* Meeting Modal */}
            {showModal && <MeetingModal onClose={() => setShowModal(false)} onCreated={() => fetchRecords()} />}
          </>
        )}
      </div>
    </div>
  )
}

export default ActionNotesTabs
