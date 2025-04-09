// "use client"
//
// import { useState, useEffect } from "react"
// import { useRouter } from "next/navigation"
// import { Button } from "@/components/ui/button"
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
// import { Badge } from "@/components/ui/badge"
// import { formatDistanceToNow, format } from "date-fns"
// import { Eye, ArrowRight } from "lucide-react"
//
// interface Execution {
//   id: string
//   workflowId: string
//   workflowName: string
//   startedAt: string
//   status: "completed" | "failed" | "running"
//   duration: number
// }
//
// export default function ExecutionsPage() {
//   const router = useRouter()
//   const [executions, setExecutions] = useState<Execution[]>([])
//
//   useEffect(() => {
//     // Load executions from localStorage
//     const storedExecutions = localStorage.getItem("executions")
//     if (storedExecutions) {
//       setExecutions(JSON.parse(storedExecutions))
//     }
//   }, [])
//
//   const formatDuration = (ms: number) => {
//     if (ms < 1000) return `${ms}ms`
//     return `${(ms / 1000).toFixed(2)}s`
//   }
//
//   const getStatusColor = (status: string) => {
//     switch (status) {
//       case "completed":
//         return "bg-green-500"
//       case "failed":
//         return "bg-red-500"
//       case "running":
//         return "bg-blue-500"
//       default:
//         return "bg-gray-500"
//     }
//   }
//
//   const handleViewWorkflow = (workflowId: string) => {
//     router.push(`/canvas/${workflowId}`)
//   }
//
//   return (
//     <div>
//       {executions.length === 0 ? (
//         <div className="text-center py-12">
//           <h2 className="text-xl font-medium text-gray-600 mb-4">No executions yet</h2>
//           <p className="text-gray-500 mb-6">Run a workflow to see execution history</p>
//           <Button onClick={() => router.push("/workflows")}>
//             Go to Workflows
//             <ArrowRight className="ml-2 h-4 w-4" />
//           </Button>
//         </div>
//       ) : (
//         <div className="rounded-md border">
//           <Table>
//             <TableHeader>
//               <TableRow>
//                 <TableHead>Workflow</TableHead>
//                 <TableHead>Started</TableHead>
//                 <TableHead>Status</TableHead>
//                 <TableHead>Duration</TableHead>
//                 <TableHead className="text-right">Actions</TableHead>
//               </TableRow>
//             </TableHeader>
//             <TableBody>
//               {executions.map((execution) => (
//                 <TableRow key={execution.id}>
//                   <TableCell className="font-medium">{execution.workflowName}</TableCell>
//                   <TableCell>
//                     <div className="flex flex-col">
//                       <span>{formatDistanceToNow(new Date(execution.startedAt), { addSuffix: true })}</span>
//                       <span className="text-xs text-gray-500">
//                         {format(new Date(execution.startedAt), "MMM d, yyyy h:mm a")}
//                       </span>
//                     </div>
//                   </TableCell>
//                   <TableCell>
//                     <Badge variant="outline" className={`${getStatusColor(execution.status)} text-white`}>
//                       {execution.status}
//                     </Badge>
//                   </TableCell>
//                   <TableCell>{formatDuration(execution.duration)}</TableCell>
//                   <TableCell className="text-right">
//                     <Button variant="ghost" size="sm" onClick={() => handleViewWorkflow(execution.workflowId)}>
//                       <Eye className="h-4 w-4 mr-2" />
//                       View Workflow
//                     </Button>
//                   </TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </div>
//       )}
//     </div>
//   )
// }


"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { formatDistanceToNow, format } from "date-fns"
import { Eye, ArrowRight, Loader2, RefreshCcw } from "lucide-react"
import { workflowService, WorkflowExecution } from "@/services/api/workflow.service"
import { toast } from "@/components/ui/use-toast"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious
} from "@/components/ui/pagination"

export default function ExecutionsPage() {
  const router = useRouter()
  const [executions, setExecutions] = useState<WorkflowExecution[]>([])
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [totalExecutions, setTotalExecutions] = useState(0)
  const limit = 10

  useEffect(() => {
    fetchExecutions()
  }, [page])

  const fetchExecutions = async () => {
    try {
      setLoading(true)

      // Fetch all executions using the new endpoint
      const executionsData = await workflowService.getAllExecutions(page, limit)

      setExecutions(executionsData.results)
      setTotalPages(executionsData.pages)
      setTotalExecutions(executionsData.total)
    } catch (error) {
      console.error("Failed to fetch executions:", error)
      toast({
        title: "Error",
        description: "Failed to fetch execution history. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
      setRefreshing(false)
    }
  }

  const handleRefresh = () => {
    setRefreshing(true)
    fetchExecutions()
  }

  const calculateDuration = (execution: WorkflowExecution) => {
    if (!execution.completedAt) {
      return null // Still running
    }

    const start = new Date(execution.startedAt).getTime()
    const end = new Date(execution.completedAt).getTime()
    return end - start
  }

  const formatDuration = (ms: number | null) => {
    if (ms === null) return "In progress"
    if (ms < 1000) return `${ms}ms`
    const seconds = ms / 1000
    if (seconds < 60) return `${seconds.toFixed(2)}s`
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}m ${remainingSeconds.toFixed(0)}s`
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-500"
      case "failed":
        return "bg-red-500"
      case "running":
        return "bg-blue-500"
      case "paused":
        return "bg-yellow-500"
      default:
        return "bg-gray-500"
    }
  }

  const handleViewWorkflow = (workflowId: string) => {
    router.push(`/canvas/${workflowId}`)
  }

  const handleViewExecution = (executionId: string) => {
    router.push(`/executions/${executionId}`)
  }

  const handlePageChange = (newPage: number) => {
    if (newPage > 0 && newPage <= totalPages) {
      setPage(newPage)
    }
  }

  if (loading && !refreshing) {
    return (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
          <span className="ml-2 text-lg text-gray-500">Loading executions...</span>
        </div>
    )
  }

  return (
      <div>
        <div className="flex justify-end items-center mb-4">
          {/*<h1 className="text-xl font-semibold">Execution History</h1>*/}
          <Button variant="outline" onClick={handleRefresh} disabled={refreshing}>
            {refreshing ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Refreshing...
                </>
            ) : (
                <>
                  <RefreshCcw className="h-4 w-4" />
                  Refresh
                </>
            )}
          </Button>
        </div>

        {executions.length === 0 ? (
            <div className="text-center py-12">
              <h2 className="text-xl font-medium text-gray-600 mb-4">No executions yet</h2>
              <p className="text-gray-500 mb-6">Run a workflow to see execution history</p>
              <Button onClick={() => router.push("/workflows")}>
                Go to Workflows
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
        ) : (
            <>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Workflow</TableHead>
                      <TableHead>Started</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Duration</TableHead>
                      <TableHead>Triggered By</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {executions.map((execution) => (
                        <TableRow key={execution._id}>
                          <TableCell className="font-medium text-base">{execution.workflowName}</TableCell>
                          <TableCell>
                            <div className="flex flex-col">
                              <span className={'text-base'}>{formatDistanceToNow(new Date(execution.startedAt), { addSuffix: true })}</span>
                              <span className="text-sm text-gray-500">
                          {format(new Date(execution.startedAt), "MMM d, yyyy h:mm a")}
                        </span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant="default" className={`${getStatusColor(execution.status)} text-white capitalize py-1.5 px-3 leading-tight text-sm`}>
                              {execution.status}
                            </Badge>
                          </TableCell>
                          <TableCell className={'text-base text-black'}>{formatDuration(calculateDuration(execution))}</TableCell>
                          <TableCell className={'text-base text-black'}>{execution.triggeredBy.userName}</TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button
                                  variant="secondary"
                                  size="sm"
                                  onClick={() => handleViewExecution(execution._id)}
                                  className={'bg-gray-100 border border-gray-200 hover:bg-gray-300'}
                              >
                                Details
                              </Button>
                              <Button
                                  variant="default"
                                  size="sm"
                                  onClick={() => handleViewWorkflow(execution.workflowId)}
                              >
                                <Eye className="h-4 w-4" />
                                View
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {totalPages > 1 && (
                  <div className="mt-4">
                    <Pagination>
                      <PaginationContent>
                        <PaginationItem>
                          <PaginationPrevious
                              onClick={() => handlePageChange(page - 1)}
                              disabled={page === 1}
                          />
                        </PaginationItem>

                        {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                          // Create a range of pages centered around the current page
                          const pageOffset = Math.min(Math.max(0, page - 3), Math.max(0, totalPages - 5));
                          const pageNumber = i + 1 + pageOffset;

                          return (
                              <PaginationItem key={pageNumber}>
                                <PaginationLink
                                    onClick={() => handlePageChange(pageNumber)}
                                    isActive={page === pageNumber}
                                >
                                  {pageNumber}
                                </PaginationLink>
                              </PaginationItem>
                          );
                        })}

                        <PaginationItem>
                          <PaginationNext
                              onClick={() => handlePageChange(page + 1)}
                              disabled={page === totalPages}
                          />
                        </PaginationItem>
                      </PaginationContent>
                    </Pagination>
                    <div className="text-center text-sm text-gray-500 mt-2">
                      Showing {(page - 1) * limit + 1} to {Math.min(page * limit, totalExecutions)} of {totalExecutions} executions
                    </div>
                  </div>
              )}
            </>
        )}
      </div>
  )
}