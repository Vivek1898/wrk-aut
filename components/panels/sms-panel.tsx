"use client"

import { MessageSquare } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useState } from "react"

interface SmsPanelProps {
  node: any
  onChange: (data: any) => void
  data: any
}

export default function SmsPanel({ node, onChange, data }: SmsPanelProps) {
  const [phoneNumber, setPhoneNumber] = useState(data.phoneNumber || "")
  const [message, setMessage] = useState(data.message || "")

  // Remove the useEffect that's causing the infinite loop

  return (
    <div className="p-4">
      <div className="flex items-center mb-4">
        <MessageSquare className="h-6 w-6 mr-2" />
        <h2 className="text-xl font-bold">SMS Details</h2>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Phone Number</label>
          <Input
            placeholder="Enter phone number..."
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Message</label>
          <Textarea
            placeholder="Enter your message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="min-h-[150px]"
          />
        </div>
      </div>
    </div>
  )
}
