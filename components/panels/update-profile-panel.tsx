"use client"

import { User } from "lucide-react"
import { Input } from "@/components/ui/input"
import { useState } from "react"

interface UpdateProfilePanelProps {
  node: any
  onChange: (data: any) => void
  data: any
}

export default function UpdateProfilePanel({ node, onChange, data }: UpdateProfilePanelProps) {
  const [propertyName, setPropertyName] = useState(data.propertyName || "")
  const [propertyValue, setPropertyValue] = useState(data.propertyValue || "")

  // Remove the useEffect that's causing the infinite loop

  return (
    <div className="p-4">
      <div className="flex items-center mb-4">
        <User className="h-6 w-6 mr-2" />
        <h2 className="text-xl font-bold">Update Profile Property</h2>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Property Name</label>
          <Input
            placeholder="Enter property name..."
            value={propertyName}
            onChange={(e) => setPropertyName(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Property Value</label>
          <Input
            placeholder="Enter property value..."
            value={propertyValue}
            onChange={(e) => setPropertyValue(e.target.value)}
          />
        </div>
      </div>
    </div>
  )
}
