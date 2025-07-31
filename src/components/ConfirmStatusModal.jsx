"use client"

export default function ConfirmStatusModal({ isOpen, onClose, onConfirm, newStatus }) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl p-6 shadow-2xl w-full max-w-sm transform transition-all duration-300 ease-out scale-100 opacity-100">
        <div className="mb-4">
          <h2 className="text-xl font-bold text-gray-900 mb-2">Change Status</h2>
          <p className="text-gray-700 text-base">
            Are you sure you want to change the status to "<strong>{newStatus}</strong>"?
          </p>
        </div>
        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-5 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2 transition-colors duration-200"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-5 py-2 text-sm font-medium text-white bg-[#00b98b] rounded-lg hover:bg-[#00a67e] focus:outline-none focus:ring-2 focus:ring-[#00b98b] focus:ring-offset-2 transition-colors duration-200"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  )
}
