"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import EmailPanel from "./panels/email-panel"
import TimeDelayPanel from "./panels/time-delay-panel"
import ConditionalSplitPanel from "./panels/conditional-split-panel"
import SmsPanel from "./panels/sms-panel"
import UpdateProfilePanel from "./panels/update-profile-panel"
import NotificationPanel from "./panels/notification-panel"
import WebhookPanel from "./panels/webhook-panel"
import TriggerEditor from "@/components/panels/trigger-panel";

interface NodePanelProps {
  nodeId: string
  nodes: any[]
  onClose: () => void
  onSave: (nodeId: string, data: any) => void
  savedData: any
}

export default function NodePanel({ nodeId, nodes, onClose, onSave, savedData }: NodePanelProps) {
  const [node, setNode] = useState<any>(null)
  const [formData, setFormData] = useState<any>(savedData || {})

  useEffect(() => {
    const selectedNode = nodes.find((n) => n.id === nodeId)
    setNode(selectedNode)
    setFormData(savedData || {})
  }, [nodeId, nodes, savedData])

  const handleSave = () => {
    // For email panel
    if (node?.type === "email") {
      const emailSubject = document.querySelector('input[placeholder="Enter subject..."]') as HTMLInputElement
      const emailSender = document.querySelector('input[placeholder="Enter sender email..."]') as HTMLInputElement
      const emailDescription = document.querySelector(
        'textarea[placeholder="Enter your description here."]',
      ) as HTMLTextAreaElement

      if (emailSubject) formData.subject = emailSubject.value
      if (emailSender) formData.senderEmail = emailSender.value
      if (emailDescription) formData.description = emailDescription.value
    }

    // For time delay panel
    if (node?.type === "timeDelay") {
      const delayValue = document.querySelector('input[type="number"]') as HTMLInputElement
      if (delayValue) formData.delayValue = delayValue.value
      // The select value is harder to get directly from DOM, we'll rely on the state
    }

    onSave(nodeId, formData)
    onClose()
  }

  const handleChange = (data: any) => {
    setFormData((prev: any) => ({
      ...prev,
      ...data,
    }))
  }

  if (!node) return null

  const renderPanel = () => {
    switch (node.type) {
      case "email":
        return <EmailPanel node={node} onChange={handleChange} data={formData} />
      case "sms":
        return <SmsPanel node={node} onChange={handleChange} data={formData} />
      case "updateProfile":
        return <UpdateProfilePanel node={node} onChange={handleChange} data={formData} />
      case "notification":
        return <NotificationPanel node={node} onChange={handleChange} data={formData} />
      case "webhook":
        return <WebhookPanel node={node} onChange={handleChange} data={formData} />
      case "timeDelay":
        return <TimeDelayPanel node={node} onChange={handleChange} data={formData} />
      case "conditionalSplit":
        return <ConditionalSplitPanel node={node} onChange={handleChange} data={formData} />
      case "trigger":
        return <TriggerEditor node={node} onChange={handleChange} data={formData} />
      default:
        return <div className="p-4">No configuration available for this node type.</div>
    }
  }

  return (
    <div className="w-96 border-l bg-white flex flex-col">
      <div className="flex-1 overflow-auto">{renderPanel()}</div>
      <div className="p-4 border-t flex gap-2 justify-center">
        <Button className="w-full" onClick={onClose} variant="destructive">
          Close
        </Button>
        <Button className="w-full" onClick={handleSave}>
          Save
        </Button>
      </div>
    </div>
  )
}
