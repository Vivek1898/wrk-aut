"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function CanvasPage() {
  const router = useRouter()

  useEffect(() => {
    // Get the most recent workflow or create a new one
    const storedWorkflows = JSON.parse(localStorage.getItem("workflows") || "[]")

    if (storedWorkflows.length > 0) {
      // Sort by created date and get the most recent
      const sortedWorkflows = [...storedWorkflows].sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      )
      router.push(`/canvas/${sortedWorkflows[0].id}`)
    } else {
      // No workflows exist, redirect to workflows page
      router.push("/workflows")
    }
  }, [router])

  return null
}
