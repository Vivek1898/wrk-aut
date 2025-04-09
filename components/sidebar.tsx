"use client"

import type React from "react"

import { Mail, MessageSquare, User, Bell, Webhook, Clock, GitBranch, Play } from "lucide-react"

export default function Sidebar() {
  const onDragStart = (event: React.DragEvent, nodeType: string) => {
    event.dataTransfer.setData("application/reactflow", nodeType)
    event.dataTransfer.effectAllowed = "move"
  }

  return (
      <div className="w-72 border-r bg-white">
        <div className="p-4 border-b">
          <h2 className="text-xl font-bold">Actions</h2>
        </div>
        <div className="divide-y">
          {/* Trigger Node */}
          <div
              className="flex items-center p-4 cursor-grab hover:bg-gray-50"
              draggable
              onDragStart={(e) => onDragStart(e, "trigger")}
          >
            <div className="flex items-center justify-center w-8 h-8 rounded-md bg-blue-50 text-blue-600 mr-3">
              <Play size={18} />
            </div>
            <span>Trigger</span>
            <div className="ml-auto">
              <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-gray-400"
              >
                <circle cx="12" cy="12" r="1" />
                <circle cx="19" cy="12" r="1" />
                <circle cx="5" cy="12" r="1" />
              </svg>
            </div>
          </div>
          <div
              className="flex items-center p-4 cursor-grab hover:bg-gray-50"
              draggable
              onDragStart={(e) => onDragStart(e, "email")}
          >
            <div className="flex items-center justify-center w-8 h-8 rounded-md bg-green-50 text-green-600 mr-3">
              <Mail size={18} />
            </div>
            <span>Email</span>
            <div className="ml-auto">
              <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-gray-400"
              >
                <circle cx="12" cy="12" r="1" />
                <circle cx="19" cy="12" r="1" />
                <circle cx="5" cy="12" r="1" />
              </svg>
            </div>
          </div>
          <div
              className="flex items-center p-4 cursor-grab hover:bg-gray-50"
              draggable
              onDragStart={(e) => onDragStart(e, "sms")}
          >
            <div className="flex items-center justify-center w-8 h-8 rounded-md bg-green-50 text-green-600 mr-3">
              <MessageSquare size={18} />
            </div>
            <span>SMS</span>
            <div className="ml-auto">
              <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-gray-400"
              >
                <circle cx="12" cy="12" r="1" />
                <circle cx="19" cy="12" r="1" />
                <circle cx="5" cy="12" r="1" />
              </svg>
            </div>
          </div>
          <div
              className="flex items-center p-4 cursor-grab hover:bg-gray-50"
              draggable
              onDragStart={(e) => onDragStart(e, "updateProfile")}
          >
            <div className="flex items-center justify-center w-8 h-8 rounded-md bg-amber-50 text-amber-600 mr-3">
              <User size={18} />
            </div>
            <span>Update Profile Property</span>
            <div className="ml-auto">
              <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-gray-400"
              >
                <circle cx="12" cy="12" r="1" />
                <circle cx="19" cy="12" r="1" />
                <circle cx="5" cy="12" r="1" />
              </svg>
            </div>
          </div>
          <div
              className="flex items-center p-4 cursor-grab hover:bg-gray-50"
              draggable
              onDragStart={(e) => onDragStart(e, "notification")}
          >
            <div className="flex items-center justify-center w-8 h-8 rounded-md bg-gray-100 text-gray-600 mr-3">
              <Bell size={18} />
            </div>
            <span>Notification</span>
            <div className="ml-auto">
              <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-gray-400"
              >
                <circle cx="12" cy="12" r="1" />
                <circle cx="19" cy="12" r="1" />
                <circle cx="5" cy="12" r="1" />
              </svg>
            </div>
          </div>
          <div
              className="flex items-center p-4 cursor-grab hover:bg-gray-50"
              draggable
              onDragStart={(e) => onDragStart(e, "webhook")}
          >
            <div className="flex items-center justify-center w-8 h-8 rounded-md bg-gray-100 text-gray-600 mr-3">
              <Webhook size={18} />
            </div>
            <span>Webhook</span>
            <div className="ml-auto">
              <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-gray-400"
              >
                <circle cx="12" cy="12" r="1" />
                <circle cx="19" cy="12" r="1" />
                <circle cx="5" cy="12" r="1" />
              </svg>
            </div>
          </div>
        </div>
        <div className="p-4 border-b border-t">
          <h2 className="text-xl font-bold">Timing</h2>
        </div>
        <div className="divide-y">
          <div
              className="flex items-center p-4 cursor-grab hover:bg-gray-50"
              draggable
              onDragStart={(e) => onDragStart(e, "timeDelay")}
          >
            <div className="flex items-center justify-center w-8 h-8 rounded-md bg-gray-100 text-gray-600 mr-3">
              <Clock size={18} />
            </div>
            <span>Time Delay</span>
            <div className="ml-auto">
              <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-gray-400"
              >
                <circle cx="12" cy="12" r="1" />
                <circle cx="19" cy="12" r="1" />
                <circle cx="5" cy="12" r="1" />
              </svg>
            </div>
          </div>
        </div>
        <div className="p-4 border-b border-t">
          <h2 className="text-xl font-bold">Logic</h2>
        </div>
        <div className="divide-y">
          <div
              className="flex items-center p-4 cursor-grab hover:bg-gray-50"
              draggable
              onDragStart={(e) => onDragStart(e, "conditionalSplit")}
          >
            <div className="flex items-center justify-center w-8 h-8 rounded-md bg-gray-100 text-gray-600 mr-3">
              <GitBranch size={18} />
            </div>
            <span>Conditional split</span>
            <div className="ml-auto">
              <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-gray-400"
              >
                <circle cx="12" cy="12" r="1" />
                <circle cx="19" cy="12" r="1" />
                <circle cx="5" cy="12" r="1" />
              </svg>
            </div>
          </div>
        </div>
      </div>
  )
}