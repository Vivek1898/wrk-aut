"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { workflowService, WorkflowExecution } from "@/services/api/workflow.service"
import { toast } from "@/components/ui/use-toast"
import { Loader2, ArrowLeft, Eye, AlertTriangle, CheckCircle, Clock, XCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { format, formatDistance } from "date-fns"
import { Separator } from "@/components/ui/separator"
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"

export default function ExecutionDetailsPage() {
    const router = useRouter()
    const params = useParams()
    const executionId = params.id as string
    const [execution, setExecution] = useState<WorkflowExecution | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchExecution()
    }, [executionId])

    const fetchExecution = async () => {
        try {
            setLoading(true)
            const data = await workflowService.getExecution(executionId)
            setExecution(data)
        } catch (error) {
            console.error("Failed to fetch execution:", error)
            toast({
                title: "Error",
                description: "Failed to load execution details. Please try again.",
                variant: "destructive",
            })
        } finally {
            setLoading(false)
        }
    }

    const calculateDuration = () => {
        if (!execution) return null
        if (!execution.completedAt) return null

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
            case "pending":
                return "bg-gray-500"
            case "skipped":
                return "bg-gray-400"
            default:
                return "bg-gray-500"
        }
    }

    const getStatusIcon = (status: string) => {
        switch (status) {
            case "completed":
                return <CheckCircle className="h-5 w-5 text-green-500" />
            case "failed":
                return <XCircle className="h-5 w-5 text-red-500" />
            case "running":
                return <Loader2 className="h-5 w-5 text-blue-500 animate-spin" />
            case "paused":
                return <Clock className="h-5 w-5 text-yellow-500" />
            case "pending":
                return <Clock className="h-5 w-5 text-gray-500" />
            case "skipped":
                return <ArrowLeft className="h-5 w-5 text-gray-400" />
            default:
                return <AlertTriangle className="h-5 w-5 text-gray-500" />
        }
    }

    const handleViewWorkflow = () => {
        if (execution) {
            router.push(`/canvas/${execution.workflowId}`)
        }
    }

    if (loading) {
        return (
            <div className="flex items-center justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
                <span className="ml-2 text-lg text-gray-500">Loading execution details...</span>
            </div>
        )
    }

    if (!execution) {
        return (
            <div className="flex flex-col items-center justify-center py-12">
                <AlertTriangle className="h-16 w-16 text-yellow-500 mb-4" />
                <h2 className="text-xl font-medium text-gray-600 mb-4">Execution not found</h2>
                <p className="text-gray-500 mb-6">The execution you're looking for doesn't exist or has been deleted.</p>
                <Button onClick={() => router.push("/executions")}>
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Return to Executions
                </Button>
            </div>
        )
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-semibold tracking-tight">Execution Details</h1>
                <div className="flex items-center gap-2">
                    <Button variant="outline" onClick={() => router.push("/executions")}>
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to Executions
                    </Button>
                    <Button onClick={handleViewWorkflow}>
                        <Eye className="mr-2 h-4 w-4" />
                        View Workflow
                    </Button>
                </div>
            </div>

            <Card>
                <CardHeader>
                    <div className="flex justify-between items-start">
                        <div>
                            <CardTitle>{execution.workflowName}</CardTitle>
                            <CardDescription className={'text-base text-gray-500 mt-1'}>
                                Execution ID: {execution._id}
                            </CardDescription>
                        </div>
                        <Badge variant="outline"
                               className={`${getStatusColor(execution.status)} text-white capitalize py-1.5 px-4 leading-tight text-sm`}>
                            {execution.status}
                        </Badge>
                    </div>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        <div>
                            <h3 className="text-sm font-medium text-gray-500">Started</h3>
                            <p className="text-base text-black font-medium">
                                {format(new Date(execution.startedAt), "PPP p")}
                            </p>
                            <p className="text-sm text-gray-500">
                                {formatDistance(new Date(execution.startedAt), new Date(), { addSuffix: true })}
                            </p>
                        </div>

                        <div>
                            <h3 className="text-sm font-medium text-gray-500">Completed</h3>
                            <p className="text-base text-black font-medium">
                                {execution.completedAt
                                    ? format(new Date(execution.completedAt), "PPP p")
                                    : "Not completed yet"}
                            </p>
                            {execution.completedAt && (
                                <p className="text-sm text-gray-500">
                                    {formatDistance(new Date(execution.completedAt), new Date(), { addSuffix: true })}
                                </p>
                            )}
                        </div>

                        <div>
                            <h3 className="text-sm font-medium text-gray-500">Duration</h3>
                            <p className="text-base text-black font-medium">
                                {formatDuration(calculateDuration())}
                            </p>
                        </div>

                        <div>
                            <h3 className="text-sm font-medium text-gray-500">Triggered By</h3>
                            <p className="text-base text-black font-medium">
                                {execution.triggeredBy.userName}
                            </p>
                            <p className="text-sm text-gray-500">
                                User ID: {execution.triggeredBy.userId}
                            </p>
                        </div>

                        <div>
                            <h3 className="text-sm font-medium text-gray-500">Current Node</h3>
                            <p className="text-base text-black font-medium">
                                {execution.currentNodeId || 'None (Completed)'}
                            </p>
                        </div>

                        {execution.error && (
                            <div>
                                <h3 className="text-sm font-medium text-red-500">Error</h3>
                                <p className="text-sm text-red-600">
                                    {execution.error}
                                </p>
                            </div>
                        )}
                    </div>

                    <Separator />

                    <div>
                        <h3 className="text-xl font-semibold mb-3">Node Executions</h3>
                        <div className={'rounded-md border'}>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className={'text-sm text-medium'}>Node ID</TableHead>
                                    <TableHead className={'text-sm text-medium'}>Type</TableHead>
                                    <TableHead className={'text-sm text-medium'}>Status</TableHead>
                                    <TableHead className={'text-sm text-medium'}>Started</TableHead>
                                    <TableHead className={'text-sm text-medium'}>Completed</TableHead>
                                    <TableHead className={'text-sm text-medium'}>Duration</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {execution.nodeExecutions.map((node) => {
                                    const nodeStartedAt = node.startedAt ? new Date(node.startedAt).getTime() : null;
                                    const nodeCompletedAt = node.completedAt ? new Date(node.completedAt).getTime() : null;
                                    const nodeDuration = nodeStartedAt && nodeCompletedAt ? nodeCompletedAt - nodeStartedAt : null;

                                    return (
                                        <TableRow key={node.nodeId}>
                                            <TableCell className="font-medium text-base">{node.nodeId}</TableCell>
                                            <TableCell className="font-medium text-base capitalize">{node.nodeType}</TableCell>
                                            <TableCell>
                                                <div className="flex items-center">
                                                    {getStatusIcon(node.status)}
                                                    <span className="ml-2 capitalize text-base">{node.status}</span>
                                                </div>
                                            </TableCell>
                                            <TableCell className="font-medium text-base">
                                                {node.startedAt
                                                    ? format(new Date(node.startedAt), "p")
                                                    : "Not started"}
                                            </TableCell>
                                            <TableCell className="font-medium text-base">
                                                {node.completedAt
                                                    ? format(new Date(node.completedAt), "p")
                                                    : "Not completed"}
                                            </TableCell>
                                            <TableCell className="font-medium text-base">{formatDuration(nodeDuration)}</TableCell>
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>
                        </div>
                    </div>

                    {execution.targetData && (
                        <>
                            <Separator />
                            <div>
                                <h3 className="text-xl font-semibold mb-3">Target Data</h3>
                                <Accordion type="single" collapsible>
                                    <AccordionItem value="targetData">
                                        <AccordionTrigger className={'text-base font-semibold text-gray-700 hover:text-black hover:no-underline data-[state="open"]:text-black'}>View Target Data</AccordionTrigger>
                                        <AccordionContent>
                      <pre className="bg-gray-100 p-4 rounded-md overflow-auto max-h-96">
                        {JSON.stringify(execution.targetData, null, 2)}
                      </pre>
                                        </AccordionContent>
                                    </AccordionItem>
                                </Accordion>
                            </div>
                        </>
                    )}

                    {execution.nodeExecutions.some(node => node.result) && (
                        <>
                            <Separator />
                            <div>
                                <h3 className="text-xl font-semibold mb-3">Node Results</h3>
                                <Accordion type="multiple">
                                    {execution.nodeExecutions
                                        .filter(node => node.result)
                                        .map(node => (
                                            <AccordionItem key={`result-${node.nodeId}`} value={node.nodeId}>
                                                <AccordionTrigger className={'text-base font-semibold text-gray-700 hover:text-black hover:no-underline'}>
                                                    {node.nodeType} ({node.nodeId})
                                                </AccordionTrigger>
                                                <AccordionContent>
                          <pre className="bg-gray-100 p-4 rounded-md overflow-auto max-h-80">
                            {JSON.stringify(node.result, null, 2)}
                          </pre>
                                                </AccordionContent>
                                            </AccordionItem>
                                        ))}
                                </Accordion>
                            </div>
                        </>
                    )}

                    {execution.nodeExecutions.some(node => node.error) && (
                        <>
                            <Separator />
                            <div>
                                <h3 className="text-base font-medium text-red-500 mb-3">Node Errors</h3>
                                <Accordion type="multiple">
                                    {execution.nodeExecutions
                                        .filter(node => node.error)
                                        .map(node => (
                                            <AccordionItem key={`error-${node.nodeId}`} value={node.nodeId}>
                                                <AccordionTrigger className="text-red-500">
                                                    {node.nodeType} ({node.nodeId})
                                                </AccordionTrigger>
                                                <AccordionContent>
                                                    <div className="bg-red-50 p-4 rounded-md border border-red-200">
                                                        <p className="text-red-600 whitespace-pre-wrap">{node.error}</p>
                                                    </div>
                                                </AccordionContent>
                                            </AccordionItem>
                                        ))}
                                </Accordion>
                            </div>
                        </>
                    )}
                </CardContent>
            </Card>
        </div>
    )
}