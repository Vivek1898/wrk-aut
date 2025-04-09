// "use client"
//
// import { useEffect, useState } from "react"
// import { useParams } from "next/navigation"
// import AutomationBuilder from "@/components/automation-builder"
//
// interface Workflow {
//   id: string
//   name: string
//   nodes: any[]
//   edges: any[]
// }
//
// export default function CanvasPage() {
//   const params = useParams()
//   const workflowId = params.id as string
//   const [workflow, setWorkflow] = useState<Workflow | null>(null)
//   const [loading, setLoading] = useState(true)
//
//   useEffect(() => {
//     // Load the specific workflow from localStorage
//     const storedWorkflows = JSON.parse(localStorage.getItem("workflows") || "[]")
//     const foundWorkflow = storedWorkflows.find((w: Workflow) => w.id === workflowId)
//
//     if (foundWorkflow) {
//       setWorkflow(foundWorkflow)
//     }
//
//     setLoading(false)
//   }, [workflowId])
//
//   if (loading) {
//     return <div className="flex items-center justify-center h-full">Loading...</div>
//   }
//
//   if (!workflow) {
//     return (
//       <div className="flex items-center justify-center h-full">
//         <div className="text-center">
//           <h2 className="text-xl font-medium text-gray-600 mb-4">Workflow not found</h2>
//           <p className="text-gray-500">The workflow you're looking for doesn't exist or has been deleted.</p>
//         </div>
//       </div>
//     )
//   }
//
//   return (
//     <div className="h-full -m-4">
//       <AutomationBuilder
//         initialWorkflow={workflow}
//         onSave={(updatedWorkflow) => {
//           // Save the updated workflow to localStorage
//           const storedWorkflows = JSON.parse(localStorage.getItem("workflows") || "[]")
//           const updatedWorkflows = storedWorkflows.map((w: Workflow) =>
//             w.id === workflowId ? { ...w, ...updatedWorkflow } : w,
//           )
//           localStorage.setItem("workflows", JSON.stringify(updatedWorkflows))
//         }}
//       />
//     </div>
//   )
// }


"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import AutomationBuilder from "@/components/automation-builder"
import { workflowService, Workflow } from "@/services/api/workflow.service"
import { toast } from "@/components/ui/use-toast"
import { Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function CanvasPage() {
    const params = useParams()
    const router = useRouter()
    const workflowId = params.id as string
    const [workflow, setWorkflow] = useState<Workflow | null>(null)
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)

    useEffect(() => {
        const fetchWorkflow = async () => {
            try {
                setLoading(true)
                const workflowData = await workflowService.getWorkflow(workflowId)
                setWorkflow(workflowData)
            } catch (error) {
                console.error("Failed to fetch workflow:", error)
                toast({
                    title: "Error",
                    description: "Failed to load workflow. The workflow may not exist or you don't have permission to view it.",
                    variant: "destructive",
                })
            } finally {
                setLoading(false)
            }
        }

        if (workflowId) {
            fetchWorkflow()
        }
    }, [workflowId])

    const handleSave = async (updatedWorkflow: any) => {
        if (!workflow) return

        try {
            setSaving(true)

            // Update the workflow via API
            const updated = await workflowService.updateWorkflow(workflowId, {
                name: updatedWorkflow.name,
                description: updatedWorkflow.description,
                nodes: updatedWorkflow.nodes,
                edges: updatedWorkflow.edges
            })

            setWorkflow(updated)

            toast({
                title: "Success",
                description: "Workflow saved successfully",
            })
        } catch (error) {
            console.error("Failed to save workflow:", error)
            toast({
                title: "Error",
                description: "Failed to save workflow. Please try again.",
                variant: "destructive",
            })
        } finally {
            setSaving(false)
        }
    }

    if (loading) {
        return (
            <div className="flex items-center justify-center h-full">
                <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
                <span className="ml-2 text-lg text-gray-500">Loading workflow...</span>
            </div>
        )
    }

    if (!workflow) {
        return (
            <div className="flex flex-col items-center justify-center h-full">
                <div className="text-center mb-6">
                    <h2 className="text-2xl font-medium text-gray-600 mb-4">Workflow not found</h2>
                    <p className="text-gray-500 mb-8">The workflow you're looking for doesn't exist or has been deleted.</p>
                </div>
                <Button onClick={() => router.push("/workflows")}>
                    Return to Workflows
                </Button>
            </div>
        )
    }

    // Apply a style that makes the container fill the available space
    // while respecting the layout structure
    return (
        <div className="h-full max-h-[calc(100vh_-_62px)]">
            <AutomationBuilder
                initialWorkflow={{
                    id: workflow._id,
                    name: workflow.name,
                    description: workflow.description,
                    nodes: workflow.nodes,
                    edges: workflow.edges,
                    status: workflow.status
                }}
                onSave={handleSave}
                saving={saving}
            />
        </div>
    )
}