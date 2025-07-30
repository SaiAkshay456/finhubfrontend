"use client"

import { useState } from "react"
import { X, Upload, Calendar, FileText } from "lucide-react"
import axiosInstance from "@/helpers/axios"

export default function MeetingModal({user, onClose, onCreated }) {
  const [file, setFile] = useState(null)
  const [date, setDate] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async () => {
    if (!file || !date) return

    setIsLoading(true)
    try {
      const formData = new FormData()
      formData.append("file", file)
      formData.append("date", date)
      formData.append("user", user)

      const { data } = await axiosInstance.post("/v1/meeting-record/create", formData)
      onCreated(data.data)
      onClose()
    } catch (error) {
      console.error("Error uploading meeting record:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleFileChange = (e) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile) {
      setFile(selectedFile)
    }
  }

  const isFormValid = file && date

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md mx-auto">
        {/* Header */}
        <div className="relative p-6 pb-4 border-b border-gray-100">
          <button
            onClick={onClose}
            className="absolute right-4 top-4 p-2 hover:bg-gray-100 rounded-lg transition-colors"
            disabled={isLoading}
          >
            <X className="h-4 w-4 text-gray-500" />
            <span className="sr-only">Close</span>
          </button>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-r from-[#00d09c] to-[#00b98b] rounded-lg">
              <FileText className="h-5 w-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Upload Meeting Record</h2>
              <p className="text-sm text-gray-500 mt-1">Upload a PDF file and set the meeting date</p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          <div className="space-y-2">
            <label htmlFor="file-upload" className="block text-sm font-medium text-gray-700">
              Meeting Document (PDF)
            </label>
            <div className="relative">
              <input
                id="file-upload"
                type="file"
                accept="application/pdf"
                onChange={handleFileChange}
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-gradient-to-r file:from-[#00d09c] file:to-[#00b98b] file:text-white hover:file:opacity-90 file:cursor-pointer border border-gray-300 rounded-md focus:ring-2 focus:ring-[#00d09c] focus:border-[#00d09c]"
                disabled={isLoading}
              />
              {file && (
                <div className="mt-3 flex items-center gap-2 text-sm text-gray-600 bg-gray-50 p-3 rounded-lg border">
                  <FileText className="h-4 w-4 text-[#00d09c]" />
                  <span className="truncate font-medium">{file.name}</span>
                  <span className="text-xs text-gray-500 ml-auto">({(file.size / 1024 / 1024).toFixed(2)} MB)</span>
                </div>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="meeting-date" className="block text-sm font-medium text-gray-700">
              Meeting Date
            </label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                id="meeting-date"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-[#00d09c] focus:border-[#00d09c] sm:text-sm"
                disabled={isLoading}
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#00d09c] disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isLoading}
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={!isFormValid || isLoading}
              className="flex-1 inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-[#00d09c] to-[#00b98b] border border-transparent rounded-md shadow-sm hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#00d09c] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                  Uploading...
                </>
              ) : (
                <>
                  <Upload className="h-4 w-4 mr-2" />
                  Submit
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
