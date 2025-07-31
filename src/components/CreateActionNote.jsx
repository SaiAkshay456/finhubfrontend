"use client"

import { useState } from "react"
import { X, Calendar, Mail, MessageCircle, ChevronDown } from "lucide-react"
import axiosInstance from "@/helpers/axios"

export default function CreateActionNoteModal({ user,onClose, onCreated }) {
  const [task, setTask] = useState("")
  const [dueDate, setDueDate] = useState("")
  const [reminderType, setReminderType] = useState("email")
  const [isLoading, setIsLoading] = useState(false)
  const [reminderTimer, setReminderTimer] = useState("1");

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      await axiosInstance.post("/v1/action-notes/create", {
        task,
        dueDate,
        reminderType,
        reminderTimer,
        clientId:user,
      })
      onCreated()
      onClose()
    } catch (err) {
      console.error("Error creating action note", err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl w-full max-w-md border border-gray-100">
        {/* Header */}
        <div className="flex items-center justify-between p-6 pb-4">
          <h2 className="text-xl font-semibold text-gray-900">Create Action Note</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200 group"
            disabled={isLoading}
          >
            <X className="h-4 w-4 text-gray-500 group-hover:text-gray-700" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="px-6 pb-6 space-y-6">
          {/* Task Input */}
          <div className="space-y-2">
            <label htmlFor="task" className="block text-sm font-medium text-gray-700">
              Task Description
            </label>
            <input
              id="task"
              type="text"
              placeholder="What needs to be done?"
              value={task}
              onChange={(e) => setTask(e.target.value)}
              className="w-full h-11 px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200 placeholder:text-gray-400"
              required
              disabled={isLoading}
            />
          </div>

          {/* Due Date Input */}
          <div className="space-y-2">
            <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700">
              Due Date
            </label>
            <div className="relative">
              <input
                id="dueDate"
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="w-full h-11 px-4 py-2 pl-10 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200"
                required
                disabled={isLoading}
              />
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
            </div>
          </div>

          {/* Reminder Type Select */}
          <div className="space-y-2">
            <label htmlFor="reminderType" className="block text-sm font-medium text-gray-700">
              Reminder Method
            </label>
            <div className="relative">
              <select
                id="reminderType"
                value={reminderType}
                onChange={(e) => setReminderType(e.target.value)}
                className="w-full h-11 px-4 py-2 pl-10 pr-10 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200 appearance-none bg-white cursor-pointer"
                disabled={isLoading}
              >
                <option value="email">Email</option>
                <option value="wp">WhatsApp</option>
              </select>
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                {reminderType === "email" ? (
                  <Mail className="h-4 w-4 text-gray-400" />
                ) : (
                  <MessageCircle className="h-4 w-4 text-gray-400" />
                )}
              </div>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
            </div>
          </div>
          {/* Reminder Timer Select */}
<div className="space-y-2">
  <label htmlFor="reminderTimer" className="block text-sm font-medium text-gray-700">
    Reminder Timer (before due)
  </label>
  <div className="relative">
    <select
      id="reminderTimer"
      value={reminderTimer}
      onChange={(e) => setReminderTimer(e.target.value)}
      className="w-full h-11 px-4 py-2 pl-4 pr-10 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200 appearance-none bg-white cursor-pointer"
      disabled={isLoading}
    >
      <option value="1">1 Hour Before</option>
      <option value="8">8 Hours Before</option>
      <option value="12">12 Hours Before</option>
      <option value="24">24 Hours Before</option>
    </select>
    <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
  </div>
</div>


          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 h-11 px-4 py-2 border border-gray-200 rounded-xl text-gray-700 font-medium hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-300 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isLoading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 h-11 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Creating...
                </div>
              ) : (
                "Create Note"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
