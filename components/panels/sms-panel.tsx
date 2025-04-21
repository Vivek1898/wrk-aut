// components/panels/sms-panel.tsx
"use client"

import { MessageSquare } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface SmsPanelProps {
  node: any
  onChange: (data: any) => void
  data: any
}

export default function SmsPanel({ node, onChange, data }: SmsPanelProps) {
  const [recipientPhone, setRecipientPhone] = useState(data.recipientPhone || "")
  const [message, setMessage] = useState(data.message || "")
  const [recipientSource, setRecipientSource] = useState(data.recipientSource || "manual")

  const handleSave = () => {
    onChange({
      recipientPhone,
      message,
      recipientSource,
    })
  }

  // Call handleSave when any value changes to update parent state
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRecipientPhone(e.target.value)
    onChange({
      recipientPhone: e.target.value,
      message,
      recipientSource
    })
  }

  const handleMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value)
    onChange({
      recipientPhone,
      message: e.target.value,
      recipientSource
    })
  }

  const handleRecipientSourceChange = (value: string) => {
    setRecipientSource(value)
    onChange({
      recipientPhone,
      message,
      recipientSource: value
    })
  }

  return (
      <div className="p-4">
        <div className="flex items-center mb-4">
          <MessageSquare className="h-6 w-6 mr-2 text-green-600" />
          <h2 className="text-xl font-bold">SMS Configuration</h2>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Recipient Source</label>
            <Select
                value={recipientSource}
                onValueChange={handleRecipientSourceChange}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select recipient source" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="manual">Enter Phone Number Manually</SelectItem>
                <SelectItem value="event">From Trigger Event</SelectItem>
                <SelectItem value="user">User's Phone Number</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {recipientSource === "manual" && (
              <div>
                <label className="block text-sm font-medium mb-1">Recipient Phone Number</label>
                <Input
                    placeholder="Enter phone number (e.g. +1234567890)..."
                    value={recipientPhone}
                    onChange={handlePhoneChange}
                />
                <p className="text-xs text-gray-500 mt-1">
                  Enter full phone number with country code, e.g., +12025550123
                </p>
              </div>
          )}

          <div>
            <label className="block text-sm font-medium mb-1">Message</label>
            <Textarea
                placeholder="Enter your message..."
                value={message}
                onChange={handleMessageChange}
                className="min-h-[150px]"
            />
            <div className="flex justify-between mt-1">
              <p className="text-xs text-gray-500">
                {message.length} characters
              </p>
              <p className="text-xs text-gray-500">
                {Math.ceil(message.length / 160)} SMS {message.length > 160 ? "messages" : "message"}
              </p>
            </div>
          </div>

          <div>
            <p className="text-sm font-medium mb-1">Variables</p>
            <div className="flex flex-wrap gap-2">
              <Button
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    const newMessage = message + "{{user.name}}";
                    setMessage(newMessage);
                    onChange({
                      recipientPhone,
                      message: newMessage,
                      recipientSource
                    });
                  }}
              >
                User Name
              </Button>
              <Button
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    const newMessage = message + "{{user.email}}";
                    setMessage(newMessage);
                    onChange({
                      recipientPhone,
                      message: newMessage,
                      recipientSource
                    });
                  }}
              >
                User Email
              </Button>
              <Button
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    const newMessage = message + "{{event.data}}";
                    setMessage(newMessage);
                    onChange({
                      recipientPhone,
                      message: newMessage,
                      recipientSource
                    });
                  }}
              >
                Event Data
              </Button>
            </div>
          </div>
        </div>
      </div>
  )
}