"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function Home() {
  const router = useRouter()

  useEffect(() => {
    // Redirect to workflows page by default
    router.push("/workflows")
  }, [router])

  return null
}
