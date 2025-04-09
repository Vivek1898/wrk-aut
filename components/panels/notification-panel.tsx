"use client"

import { Bell } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useState } from "react"

interface NotificationPanelProps {
  node: any
  onChange: (data: any) => void
  data: any
}

export default function NotificationPanel({ node, onChange, data }: NotificationPanelProps) {
  const [title, setTitle] = useState(data.title || "")
  const [message, setMessage] = useState(data.message || "")

  // Remove the useEffect that's causing the infinite loop

  return (
    <div className="p-4">
      <div className="flex items-center mb-4">
        <Bell className="h-6 w-6 mr-2" />
        <h2 className="text-xl font-bold">Notification Details</h2>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Title</label>
          <Input placeholder="Enter notification title..." value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Message</label>
          <Textarea
            placeholder="Enter notification message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="min-h-[150px]"
          />
        </div>
      </div>
    </div>
  )
}
