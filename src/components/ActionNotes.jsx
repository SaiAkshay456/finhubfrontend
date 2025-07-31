"use client";

import { useEffect, useState } from "react";
import { Plus, Calendar, NotebookText } from "lucide-react";
import axiosInstance from "@/helpers/axios";
import CreateActionNoteModal from "@/components/CreateActionNote";

function ActionNotes({user}) {
  const [actionNotes, setActionNotes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [showAllModal, setShowAllModal] = useState(false);


  const fetchActionNotes = async () => {
    setIsLoading(true);
    try {
      const { data } = await axiosInstance.get(`/v1/action-notes/list/${user}`);
      setActionNotes(data);
    } catch (err) {
      console.error("Failed to fetch action notes", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchActionNotes();
  }, []);

  return (
    <div className=" min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 px-4 py-8 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Action Notes</h1>
          <p className="text-base text-gray-600">Keep track of important tasks and follow-ups.</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-emerald-500 to-emerald-700 text-white rounded-xl shadow-md hover:shadow-emerald-500/30 transition-all duration-300 font-semibold group text-sm"
        >
          <Plus className="w-4 h-4 group-hover:rotate-90 transition-transform duration-200" />
          Add Action Note
        </button>
      </div>

      {isLoading ? (
  <div className="text-center py-16 text-gray-400 text-base">Loading action notes...</div>
) : actionNotes.length === 0 ? (
  <div className="text-center py-16 text-gray-400 text-base">No action notes found.</div>
) : (
  <>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {(actionNotes.length > 6 ? actionNotes.slice(0, 6) : actionNotes).map((note) => (
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
  Reminder: {note.reminderType === "email" ? "Email" : "WhatsApp"} ({note.reminderTimer}h before due)
</p>
        </div>
      ))}
    </div>

    {actionNotes.length > 6 && (
      <div className="flex justify-center mt-6">
        <button
          onClick={() => setShowAllModal(true)}
          className="px-6 py-2 bg-emerald-600 text-white rounded-xl shadow hover:bg-emerald-700 transition"
        >
          View All
        </button>
      </div>
    )}
  </>
)}


      {showModal && (
        <CreateActionNoteModal
          onClose={() => setShowModal(false)}
          onCreated={fetchActionNotes}
          user={user}
        />
      )}
      {showAllModal && (
  <AllNotesModal notes={actionNotes} onClose={() => setShowAllModal(false)} />
)}
    </div>
  );
}

export default ActionNotes;
function AllNotesModal({ notes, onClose }) {
  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl max-w-5xl w-full max-h-[80vh] overflow-y-auto p-6 relative shadow-lg">
        <button
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
          onClick={onClose}
        >
          ×
        </button>
        <h2 className="text-2xl font-bold mb-4">All Action Notes</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {notes.map((note) => (
            <div
              key={note._id}
              className="bg-gray-50 p-4 rounded-xl border border-gray-200 shadow-sm"
            >
              <h4 className="text-md font-semibold text-gray-900 mb-1 break-words">{note.task}</h4>
              <div className="text-sm text-gray-600 mb-1 flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-gray-500" />
                Due:{" "}
                {new Date(note.dueDate).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </div>
              <p className="text-sm text-gray-500">
  Reminder: {note.reminderType === "email" ? "Email" : "WhatsApp"} ({note.reminderTimer}h before due)
</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

