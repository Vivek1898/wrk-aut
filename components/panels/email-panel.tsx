"use client"

import type React from "react"

import { Mail } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { Textarea } from "@/components/ui/textarea"

interface EmailPanelProps {
  node: any
  onChange: (data: any) => void
  data: any
}

export default function EmailPanel({ node, onChange, data }: EmailPanelProps) {
  const [subject, setSubject] = useState(data.subject || "")
  const [senderEmail, setSenderEmail] = useState(data.senderEmail || "")
  const [description, setDescription] = useState(data.description || "")

  // Remove the useEffect that's causing the infinite loop
  // Instead, we'll update the parent state only when the Save button is clicked

  const handleSubjectChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSubject(e.target.value)
  }

  const handleSenderEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSenderEmail(e.target.value)
  }

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value)
  }

  return (
    <div className="p-4">
      <div className="flex items-center mb-4">
        <Mail className="h-6 w-6 mr-2" />
        <h2 className="text-xl font-bold">Subject and sender</h2>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Subject</label>
          <div className="flex">
            <Input placeholder="Enter subject..." value={subject} onChange={handleSubjectChange} />
            <Button variant="outline" className="ml-2 whitespace-nowrap">
              Variables
            </Button>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Sender Email</label>
          <Input placeholder="Enter sender email..." value={senderEmail} onChange={handleSenderEmailChange} />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Description</label>
          <div className="border rounded-md">
            <div className="flex flex-wrap border-b p-1">
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <span className="font-bold">B</span>
              </Button>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <span className="italic">I</span>
              </Button>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <span className="underline">U</span>
              </Button>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <span className="line-through">S</span>
              </Button>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <span className="font-mono">T</span>
              </Button>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <span>{"</>"}</span>
              </Button>
              <Button variant="ghost" size="sm" className="h-8 px-1">
                <span>H1</span>
              </Button>
              <Button variant="ghost" size="sm" className="h-8 px-1">
                <span>H2</span>
              </Button>
              <Button variant="ghost" size="sm" className="h-8 px-1">
                <span>H3</span>
              </Button>
              <Button variant="ghost" size="sm" className="h-8 px-1">
                <span>H4</span>
              </Button>
            </div>
            <div className="flex flex-wrap border-b p-1">
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <span>•</span>
              </Button>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <span>-</span>
              </Button>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <span>1.</span>
              </Button>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <span>[]</span>
              </Button>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <span>🔗</span>
              </Button>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <span>↩️</span>
              </Button>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <span>≡</span>
              </Button>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <span>≡≡</span>
              </Button>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <span>≡≡≡</span>
              </Button>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <span>≡≡≡≡</span>
              </Button>
            </div>
            <div className="flex border-b p-1">
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <span>↩</span>
              </Button>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <span>↪</span>
              </Button>
            </div>
            <Textarea
              className="border-none focus-visible:ring-0 min-h-[150px]"
              placeholder="Enter your description here."
              value={description}
              onChange={handleDescriptionChange}
            />
          </div>
          <div className="flex justify-end mt-2">
            <Button variant="outline" className="whitespace-nowrap">
              Variables
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
