"use client"

import { Webhook } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useState } from "react"

interface WebhookPanelProps {
  node: any
  onChange: (data: any) => void
  data: any
}

export default function WebhookPanel({ node, onChange, data }: WebhookPanelProps) {
  const [url, setUrl] = useState(data.url || "")
  const [method, setMethod] = useState(data.method || "POST")
  const [payload, setPayload] = useState(data.payload || "")

  // Remove the useEffect that's causing the infinite loop

  return (
    <div className="p-4">
      <div className="flex items-center mb-4">
        <Webhook className="h-6 w-6 mr-2" />
        <h2 className="text-xl font-bold">Webhook Details</h2>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">URL</label>
          <Input placeholder="Enter webhook URL..." value={url} onChange={(e) => setUrl(e.target.value)} />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Method</label>
          <Input placeholder="POST, GET, PUT, DELETE..." value={method} onChange={(e) => setMethod(e.target.value)} />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Payload (JSON)</label>
          <Textarea
            placeholder="Enter JSON payload..."
            value={payload}
            onChange={(e) => setPayload(e.target.value)}
            className="min-h-[150px] font-mono"
          />
        </div>
      </div>
    </div>
  )
}
