// "use client"
//
// import { useState, useEffect } from "react"
// import { useRouter } from "next/navigation"
// import { Button } from "@/components/ui/button"
// import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
// import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
// import { PlusCircle, MoreVertical, Play, Edit, Trash } from "lucide-react"
// import { formatDistanceToNow } from "date-fns"
//
// interface Workflow {
//   id: string
//   name: string
//   createdAt: string
//   nodes: any[]
//   edges: any[]
// }
//
// export default function WorkflowsPage() {
//   const router = useRouter()
//   const [workflows, setWorkflows] = useState<Workflow[]>([])
//
//   useEffect(() => {
//     // Load workflows from localStorage
//     const storedWorkflows = localStorage.getItem("workflows")
//     if (storedWorkflows) {
//       setWorkflows(JSON.parse(storedWorkflows))
//     }
//   }, [])
//
//   const handleCreateWorkflow = () => {
//     // Open the create workflow dialog in the layout
//     const createButton = document.querySelector("[data-create-workflow]") as HTMLButtonElement
//     if (createButton) {
//       createButton.click()
//     }
//   }
//
//   const handleEditWorkflow = (id: string) => {
//     router.push(`/canvas/${id}`)
//   }
//
//   const handleRunWorkflow = (workflow: Workflow) => {
//     // Create an execution record
//     const executions = JSON.parse(localStorage.getItem("executions") || "[]")
//     const execution = {
//       id: Date.now().toString(),
//       workflowId: workflow.id,
//       workflowName: workflow.name,
//       startedAt: new Date().toISOString(),
//       status: "completed",
//       duration: Math.floor(Math.random() * 5000) + 1000, // Random duration for demo
//     }
//
//     localStorage.setItem("executions", JSON.stringify([execution, ...executions]))
//
//     // Show success message or redirect to executions
//     router.push("/executions")
//   }
//
//   const handleDeleteWorkflow = (id: string) => {
//     const updatedWorkflows = workflows.filter((workflow) => workflow.id !== id)
//     setWorkflows(updatedWorkflows)
//     localStorage.setItem("workflows", JSON.stringify(updatedWorkflows))
//   }
//
//   return (
//     <div>
//
//       {workflows.length === 0 ? (
//         <div className="text-center py-12">
//           <h2 className="text-xl font-medium text-gray-600 mb-4">No workflows yet</h2>
//           <p className="text-gray-500 mb-6">Create your first workflow to get started</p>
//
//         </div>
//       ) : (
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {workflows.map((workflow) => (
//             <Card key={workflow.id} className="overflow-hidden">
//               <CardHeader className="pb-2">
//                 <div className="flex justify-between items-start">
//                   <CardTitle className="text-lg">{workflow.name}</CardTitle>
//                   <DropdownMenu>
//                     <DropdownMenuTrigger asChild>
//                       <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
//                         <MoreVertical className="h-4 w-4" />
//                       </Button>
//                     </DropdownMenuTrigger>
//                     <DropdownMenuContent align="end">
//                       <DropdownMenuItem onClick={() => handleEditWorkflow(workflow.id)}>
//                         <Edit className="mr-2 h-4 w-4" />
//                         Edit
//                       </DropdownMenuItem>
//                       <DropdownMenuItem onClick={() => handleRunWorkflow(workflow)}>
//                         <Play className="mr-2 h-4 w-4" />
//                         Run
//                       </DropdownMenuItem>
//                       <DropdownMenuItem onClick={() => handleDeleteWorkflow(workflow.id)} className="text-red-600">
//                         <Trash className="mr-2 h-4 w-4" />
//                         Delete
//                       </DropdownMenuItem>
//                     </DropdownMenuContent>
//                   </DropdownMenu>
//                 </div>
//                 <CardDescription>
//                   Created {formatDistanceToNow(new Date(workflow.createdAt), { addSuffix: true })}
//                 </CardDescription>
//               </CardHeader>
//               <CardContent className="pb-2">
//                 <p className="text-sm text-gray-500">
//                   {workflow.nodes.length} nodes, {workflow.edges.length} connections
//                 </p>
//               </CardContent>
//               <CardFooter className="flex justify-between">
//                 <Button variant="outline" size="sm" onClick={() => handleEditWorkflow(workflow.id)}>
//                   <Edit className="mr-2 h-4 w-4" />
//                   Edit
//                 </Button>
//                 <Button size="sm" onClick={() => handleRunWorkflow(workflow)}>
//                   <Play className="mr-2 h-4 w-4" />
//                   Run
//                 </Button>
//               </CardFooter>
//             </Card>
//           ))}
//         </div>
//       )}
//     </div>
//   )
// }



"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { PlusCircle, MoreVertical, Play, Edit, Trash, Loader2 } from "lucide-react"
import { formatDistanceToNow } from "date-fns"
import { workflowService, Workflow } from "@/services/api/workflow.service"
import { toast } from "@/components/ui/use-toast"
import {Badge} from "@/components/ui/badge";

export default function WorkflowsPage() {
  const router = useRouter()
  const [workflows, setWorkflows] = useState<Workflow[]>([])
  const [loading, setLoading] = useState(true)
  const [executingWorkflow, setExecutingWorkflow] = useState<string | null>(null)

  useEffect(() => {
    fetchWorkflows()
  }, [])

  const fetchWorkflows = async () => {
    try {
      setLoading(true)
      const response = await workflowService.getWorkflows()
      setWorkflows(response.results)
    } catch (error) {
      console.error("Failed to fetch workflows:", error)
      toast({
        title: "Error",
        description: "Failed to fetch workflows. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleCreateWorkflow = () => {
    // Open the create workflow dialog in the layout
    const createButton = document.querySelector("[data-create-workflow]") as HTMLButtonElement
    if (createButton) {
      createButton.click()
    }
  }

  const handleEditWorkflow = (id: string) => {
    router.push(`/canvas/${id}`)
  }

  const handleRunWorkflow = async (workflow: Workflow) => {
    try {
      setExecutingWorkflow(workflow._id)

      console.log("wORK", workflow)
      // Execute the workflow through the API
      const execution = await workflowService.executeWorkflow(workflow._id)

      toast({
        title: "Workflow started",
        description: `Execution of "${workflow.name}" has been initiated.`,
      })

      // Navigate to executions page
      router.push("/executions")
    } catch (error) {
      console.error("Failed to execute workflow:", error)
      toast({
        title: "Error",
        description: "Failed to execute workflow. Please try again.",
        variant: "destructive",
      })
    } finally {
      setExecutingWorkflow(null)
    }
  }

  const handleDeleteWorkflow = async (id: string) => {
    try {
      // Delete the workflow through the API
      await workflowService.deleteWorkflow(id)

      // Update the local state
      setWorkflows(prevWorkflows => prevWorkflows.filter(w => w._id !== id))

      toast({
        title: "Workflow deleted",
        description: "The workflow has been successfully deleted.",
      })
    } catch (error) {
      console.error("Failed to delete workflow:", error)
      toast({
        title: "Error",
        description: "Failed to delete workflow. Please try again.",
        variant: "destructive",
      })
    }
  }

  if (loading) {
    return (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
          <span className="ml-2 text-lg text-gray-500">Loading workflows...</span>
        </div>
    )
  }

  return (
      <div>
        {workflows.length === 0 ? (
            <div className="text-center py-12">
              <h2 className="text-xl font-medium text-gray-600 mb-4">No workflows yet</h2>
              <p className="text-gray-500 mb-6">Create your first workflow to get started</p>
              <Button onClick={handleCreateWorkflow}>
                <PlusCircle className="mr-2 h-4 w-4" />
                Create Workflow
              </Button>
            </div>
        ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {workflows.map((workflow) => (
                  <Card key={workflow._id} className="overflow-hidden flex flex-col justify-between bg-white">
                    <div>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-xl text-black">{workflow.name}</CardTitle>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => handleEditWorkflow(workflow._id)}>
                              <Edit className="h-4 w-4" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleRunWorkflow(workflow)}>
                              <Play className="h-4 w-4" />
                              Run
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleDeleteWorkflow(workflow._id)} className="text-red-600">
                              <Trash className="h-4 w-4" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                      <CardDescription className={'text-gray-700 text-base'}>
                        Created {formatDistanceToNow(new Date(workflow.createdAt), { addSuffix: true })}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <div className="flex flex-col gap-2">
                        <p className="text-gray-700 text-base">
                          {workflow.nodes.length} nodes, {workflow.edges.length} connections
                        </p>
                        <p className="text-base text-gray-700">
                          Status: <Badge variant={'secondary'} className={'bg-amber-400 text-black capitalize text-base leading-none py-1 px-3'}>{workflow.status}</Badge>
                        </p>
                        {workflow.description && (
                            <p className="text-sm text-gray-700">{workflow.description}</p>
                        )}
                      </div>
                    </CardContent>
                    </div>
                    <CardFooter className="flex justify-between pb-4">
                      <Button variant="outline" size="sm" className={'pr-4 text-lg font-medium'} onClick={() => handleEditWorkflow(workflow._id)}>
                        <Edit className="h-4 w-4" />
                        Edit
                      </Button>
                      <Button
                          size="sm"
                          onClick={() => handleRunWorkflow(workflow)}
                          disabled={executingWorkflow === workflow._id}
                          className={'bg-black text-lg font-medium pr-4'}
                      >
                        {executingWorkflow === workflow._id ? (
                            <>
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              Running...
                            </>
                        ) : (
                            <>
                              <Play className="h-4 w-4" />
                              Run
                            </>
                        )}
                      </Button>
                    </CardFooter>
                  </Card>
              ))}
            </div>
        )}
      </div>
  )
}