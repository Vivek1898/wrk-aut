"use client"

import { Clock } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useState } from "react"

interface TimeDelayPanelProps {
  node: any
  onChange: (data: any) => void
  data: any
}

export default function TimeDelayPanel({ node, onChange, data }: TimeDelayPanelProps) {
  const [delayValue, setDelayValue] = useState(data.delayValue || "")
  const [delayUnit, setDelayUnit] = useState(data.delayUnit || "")

  // Remove the useEffect that's causing the infinite loop

  return (
    <div className="p-4">
      <div className="flex items-center mb-4">
        <Clock className="h-6 w-6 mr-2" />
        <h2 className="text-xl font-bold">Time delay details</h2>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Set time delay</label>
          <Input
            type="number"
            placeholder="Enter delay value..."
            value={delayValue}
            onChange={(e) => setDelayValue(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Select delay unit</label>
          <Select value={delayUnit} onValueChange={setDelayUnit}>
            <SelectTrigger>
              <SelectValue placeholder="Select delay unit" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="seconds">Seconds</SelectItem>
              <SelectItem value="minutes">Minutes</SelectItem>
              <SelectItem value="hours">Hours</SelectItem>
              <SelectItem value="days">Days</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  )
}
