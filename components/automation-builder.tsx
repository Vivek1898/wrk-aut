// "use client"
//
// import type React from "react"
//
// import { useState, useCallback, useRef } from "react"
// import ReactFlow, {
//   ReactFlowProvider,
//   Background,
//   Controls,
//   addEdge,
//   Panel,
//   useNodesState,
//   useEdgesState,
//   type Connection,
//   type Edge,
//   type NodeTypes,
//   type EdgeTypes,
// } from "reactflow"
// import "reactflow/dist/style.css"
// import Sidebar from "./sidebar"
// import NodePanel from "./node-panel"
// import { Button } from "@/components/ui/button"
// import StartNode from "./nodes/start-node"
// import EmailNode from "./nodes/email-node"
// import TimeDelayNode from "./nodes/time-delay-node"
// import ConditionalSplitNode from "./nodes/conditional-split-node"
// import SmsNode from "./nodes/sms-node"
// import UpdateProfileNode from "./nodes/update-profile-node"
// import NotificationNode from "./nodes/notification-node"
// import WebhookNode from "./nodes/webhook-node"
// import CustomEdge from "./edges/custom-edge"
// import { DownloadIcon, Save } from "lucide-react"
// import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
//
// // Define custom node types
// const nodeTypes: NodeTypes = {
//   start: StartNode,
//   email: EmailNode,
//   timeDelay: TimeDelayNode,
//   conditionalSplit: ConditionalSplitNode,
//   sms: SmsNode,
//   updateProfile: UpdateProfileNode,
//   notification: NotificationNode,
//   webhook: WebhookNode,
// }
//
// // Define custom edge types
// const edgeTypes: EdgeTypes = {
//   custom: CustomEdge,
// }
//
// interface AutomationBuilderProps {
//   initialWorkflow?: {
//     id: string
//     name: string
//     nodes?: any[]
//     edges?: any[]
//   }
//   onSave?: (workflow: any) => void
// }
//
// export default function AutomationBuilder({ initialWorkflow, onSave }: AutomationBuilderProps) {
//   const reactFlowWrapper = useRef<HTMLDivElement>(null)
//
//   // Initialize with workflow data or defaults
//   const initialNodes = initialWorkflow?.nodes || [
//     {
//       id: "start",
//       type: "start",
//       position: { x: 250, y: 5 },
//       data: { label: "Start" },
//     },
//   ]
//
//   const initialEdges = initialWorkflow?.edges || []
//
//   const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes)
//   const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges)
//   const [selectedNode, setSelectedNode] = useState<string | null>(null)
//   const [reactFlowInstance, setReactFlowInstance] = useState<any>(null)
//   const [nodeData, setNodeData] = useState<Record<string, any>>({})
//
//   // Handle connections between nodes
//   const onConnect = useCallback(
//     (params: Connection | Edge) => {
//       setEdges((eds) => addEdge({ ...params, type: "custom" }, eds))
//     },
//     [setEdges],
//   )
//
//   // Handle node selection
//   const onNodeClick = useCallback((_: React.MouseEvent, node: any) => {
//     setSelectedNode(node.id)
//   }, [])
//
//   // Handle dropping a new node from the sidebar
//   const onDragOver = useCallback((event: React.DragEvent) => {
//     event.preventDefault()
//     event.dataTransfer.dropEffect = "move"
//   }, [])
//
//   const onDrop = useCallback(
//     (event: React.DragEvent) => {
//       event.preventDefault()
//
//       if (!reactFlowWrapper.current || !reactFlowInstance) return
//
//       const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect()
//       const type = event.dataTransfer.getData("application/reactflow")
//
//       // Check if the dropped element is valid
//       if (typeof type === "undefined" || !type) {
//         return
//       }
//
//       const position = reactFlowInstance.project({
//         x: event.clientX - reactFlowBounds.left,
//         y: event.clientY - reactFlowBounds.top,
//       })
//
//       // Create a unique ID
//       const id = `${type}-${Date.now()}`
//
//       // Create the new node
//       const newNode = {
//         id,
//         type,
//         position,
//         data: { label: type.charAt(0).toUpperCase() + type.slice(1) },
//       }
//
//       // Add specific data based on node type
//       if (type === "email") {
//         newNode.data = {
//           ...newNode.data,
//           action: "action",
//           buttonText: "Set Up Email",
//         }
//       } else if (type === "sms") {
//         newNode.data = {
//           ...newNode.data,
//           action: "action",
//           buttonText: "Set Up SMS",
//         }
//       } else if (type === "updateProfile") {
//         newNode.data = {
//           ...newNode.data,
//           action: "action",
//           buttonText: "Set Up Profile Update",
//         }
//       } else if (type === "notification") {
//         newNode.data = {
//           ...newNode.data,
//           action: "action",
//           buttonText: "Set Up Notification",
//         }
//       } else if (type === "webhook") {
//         newNode.data = {
//           ...newNode.data,
//           action: "action",
//           buttonText: "Set Up Webhook",
//         }
//       } else if (type === "timeDelay") {
//         newNode.data = {
//           ...newNode.data,
//           logic: "logic",
//           buttonText: "Set up time delay",
//         }
//       } else if (type === "conditionalSplit") {
//         newNode.data = {
//           ...newNode.data,
//           condition: "condition",
//           buttonText: "Set up conditional split",
//         }
//       }
//
//       setNodes((nds) => nds.concat(newNode))
//     },
//     [reactFlowInstance, setNodes],
//   )
//
//   // Save node data
//   const saveNodeData = (nodeId: string, data: any) => {
//     setNodeData((prev) => ({
//       ...prev,
//       [nodeId]: data,
//     }))
//
//     // Update node data in the flow
//     setNodes((nds) =>
//       nds.map((node) => {
//         if (node.id === nodeId) {
//           return {
//             ...node,
//             data: {
//               ...node.data,
//               ...data,
//               savedData: true,
//             },
//           }
//         }
//         return node
//       }),
//     )
//   }
//
//   // Export flow as JSON
//   const exportToJson = () => {
//     if (reactFlowInstance) {
//       const flowData = reactFlowInstance.toObject()
//
//       // Add the saved node data to the export
//       const flowWithData = {
//         ...flowData,
//         nodeData,
//       }
//
//       const jsonString = JSON.stringify(flowWithData, null, 2)
//       const blob = new Blob([jsonString], { type: "application/json" })
//       const url = URL.createObjectURL(blob)
//
//       const link = document.createElement("a")
//       link.href = url
//       link.download = "workflow.json"
//       document.body.appendChild(link)
//       link.click()
//       document.body.removeChild(link)
//     }
//   }
//
//   // Save workflow
//   const handleSaveWorkflow = () => {
//     if (reactFlowInstance && onSave) {
//       const flowData = reactFlowInstance.toObject()
//       onSave({
//         nodes: flowData.nodes,
//         edges: flowData.edges,
//         nodeData,
//       })
//     }
//   }
//
//   return (
//     <div className="flex h-full w-full">
//       <Sidebar />
//       <div className="flex-1 flex flex-col">
//         <div className="bg-purple-600 p-2 flex gap-2 justify-end">
//           <Button variant="secondary" onClick={handleSaveWorkflow}>
//             <Save className="mr-2 h-4 w-4" />
//             Save Workflow
//           </Button>
//           <DropdownMenu>
//             <DropdownMenuTrigger asChild>
//               <Button variant="secondary">
//                 <DownloadIcon className="mr-2 h-4 w-4" />
//                 Download
//               </Button>
//             </DropdownMenuTrigger>
//             <DropdownMenuContent>
//               <DropdownMenuItem onClick={exportToJson}>Save as JSON</DropdownMenuItem>
//               <DropdownMenuItem>Download as Image</DropdownMenuItem>
//             </DropdownMenuContent>
//           </DropdownMenu>
//           <Button variant="secondary">Elkjs - Layout</Button>
//           <Button variant="secondary">Contact</Button>
//         </div>
//         <div className="flex-1" ref={reactFlowWrapper}>
//           <ReactFlowProvider>
//             <ReactFlow
//               nodes={nodes}
//               edges={edges}
//               onNodesChange={onNodesChange}
//               onEdgesChange={onEdgesChange}
//               onConnect={onConnect}
//               onInit={setReactFlowInstance}
//               onDrop={onDrop}
//               onDragOver={onDragOver}
//               onNodeClick={onNodeClick}
//               nodeTypes={nodeTypes}
//               edgeTypes={edgeTypes}
//               fitView
//               snapToGrid
//               snapGrid={[15, 15]}
//               defaultEdgeOptions={{ type: "custom" }}
//             >
//               <Controls />
//               <Background variant="dots" gap={12} size={1} />
//               <Panel position="top-left"></Panel>
//             </ReactFlow>
//           </ReactFlowProvider>
//         </div>
//       </div>
//       {selectedNode && (
//         <NodePanel
//           nodeId={selectedNode}
//           nodes={nodes}
//           onClose={() => setSelectedNode(null)}
//           onSave={saveNodeData}
//           savedData={nodeData[selectedNode] || {}}
//         />
//       )}
//     </div>
//   )
// }


"use client"

import type React from "react"

import { useState, useCallback, useRef, useEffect } from "react"
import ReactFlow, {
  ReactFlowProvider,
  Background,
  Controls,
  addEdge,
  Panel,
  useNodesState,
  useEdgesState,
  type Connection,
  type Edge,
  type NodeTypes,
  type EdgeTypes,
} from "reactflow"
import "reactflow/dist/style.css"
import Sidebar from "./sidebar"
import NodePanel from "./node-panel"
import { Button } from "@/components/ui/button"
import StartNode from "./nodes/start-node"
import EmailNode from "./nodes/email-node"
import TimeDelayNode from "./nodes/time-delay-node"
import ConditionalSplitNode from "./nodes/conditional-split-node"
import SmsNode from "./nodes/sms-node"
import UpdateProfileNode from "./nodes/update-profile-node"
import NotificationNode from "./nodes/notification-node"
import WebhookNode from "./nodes/webhook-node"
import CustomEdge from "./edges/custom-edge"
import { DownloadIcon, Save, Loader2 } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { toast } from "@/components/ui/use-toast"
import TriggerNode from "@/components/nodes/trigger-node";
import WhatsappNode from "@/components/nodes/whatsapp-node";

// Define custom node types
const nodeTypes: NodeTypes = {
  start: StartNode,
  email: EmailNode,
  timeDelay: TimeDelayNode,
  conditionalSplit: ConditionalSplitNode,
  sms: SmsNode,
  updateProfile: UpdateProfileNode,
  notification: NotificationNode,
  webhook: WebhookNode,
  trigger: TriggerNode,
  whatsapp: WhatsappNode,
}

// Define custom edge types
const edgeTypes: EdgeTypes = {
  custom: CustomEdge,
}

interface AutomationBuilderProps {
  initialWorkflow?: {
    id: string
    name: string
    description?: string
    nodes?: any[]
    edges?: any[]
    status?: string
  }
  onSave?: (workflow: any) => void
  saving?: boolean
}

export default function AutomationBuilder({ initialWorkflow, onSave, saving = false }: AutomationBuilderProps) {
  const reactFlowWrapper = useRef<HTMLDivElement>(null)

  // Initialize with workflow data or defaults
  const initialNodes = initialWorkflow?.nodes || [
    {
      id: "start",
      type: "start",
      position: { x: 250, y: 5 },
      data: { label: "Start" },
    },
  ]

  const initialEdges = initialWorkflow?.edges || []

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes)
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges)
  const [selectedNode, setSelectedNode] = useState<string | null>(null)
  const [reactFlowInstance, setReactFlowInstance] = useState<any>(null)
  const [nodeData, setNodeData] = useState<Record<string, any>>({})
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false)

  // Load initial node data from workflow
  useEffect(() => {
    // Extract and set node data if available
    if (initialWorkflow?.nodes) {
      const extractedNodeData: Record<string, any> = {};
      initialWorkflow.nodes.forEach(node => {
        if (node.data?.savedData) {
          extractedNodeData[node.id] = {
            ...node.data
          };
        }
      });

      setNodeData(extractedNodeData);
    }
  }, [initialWorkflow]);

  // Track changes to mark as unsaved
  useEffect(() => {
    setHasUnsavedChanges(true);
  }, [nodes, edges, nodeData]);

  // Handle connections between nodes
  const onConnect = useCallback(
      (params: Connection | Edge) => {
        setEdges((eds) => addEdge({ ...params, type: "custom" }, eds))
        setHasUnsavedChanges(true)
      },
      [setEdges],
  )

  // Handle node selection
  const onNodeClick = useCallback((_: React.MouseEvent, node: any) => {
    setSelectedNode(node.id)
  }, [])

  // Handle dropping a new node from the sidebar
  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault()
    event.dataTransfer.dropEffect = "move"
  }, [])

  const onDrop = useCallback(
      (event: React.DragEvent) => {
        event.preventDefault()

        if (!reactFlowWrapper.current || !reactFlowInstance) return

        const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect()
        const type = event.dataTransfer.getData("application/reactflow")

        // Check if the dropped element is valid
        if (typeof type === "undefined" || !type) {
          return
        }

        const position = reactFlowInstance.project({
          x: event.clientX - reactFlowBounds.left,
          y: event.clientY - reactFlowBounds.top,
        })

        // Create a unique ID
        const id = `${type}-${Date.now()}`

        // Create the new node
        const newNode = {
          id,
          type,
          position,
          data: { label: type.charAt(0).toUpperCase() + type.slice(1) },
        }

        // Add specific data based on node type
        if (type === "email") {
          newNode.data = {
            ...newNode.data,
            action: "action",
            buttonText: "Set Up Email",
          }
        } else if (type === "sms") {
          newNode.data = {
            ...newNode.data,
            action: "action",
            buttonText: "Set Up SMS",
          }
        } else if (type === "updateProfile") {
          newNode.data = {
            ...newNode.data,
            action: "action",
            buttonText: "Set Up Profile Update",
          }
        } else if (type === "notification") {
          newNode.data = {
            ...newNode.data,
            action: "action",
            buttonText: "Set Up Notification",
          }
        } else if (type === "webhook") {
          newNode.data = {
            ...newNode.data,
            action: "action",
            buttonText: "Set Up Webhook",
          }
        } else if (type === "timeDelay") {
          newNode.data = {
            ...newNode.data,
            logic: "logic",
            buttonText: "Set up time delay",
          }
        } else if( type === "whatsapp") {
            newNode.data = {
                ...newNode.data,
                action: "action",
                buttonText: "Set Up WhatsApp",
            }
        }
        else if (type === "conditionalSplit") {
          newNode.data = {
            ...newNode.data,
            condition: "condition",
            buttonText: "Set up conditional split",
          } }else if (type === "trigger") {
          newNode.data = {
            ...newNode.data,
            events: [],
            triggerType: 'event',
            triggerMode: 'any',
            buttonText: "Configure Trigger"
          }
        }


        setNodes((nds) => nds.concat(newNode))
        setHasUnsavedChanges(true)
      },
      [reactFlowInstance, setNodes],
  )

  // Save node data
  const saveNodeData = (nodeId: string, data: any) => {
    setNodeData((prev) => ({
      ...prev,
      [nodeId]: data,
    }))

    console.log("Node data saved:", nodeId, data)

    // Update node data in the flow
    setNodes((nds) =>
        nds.map((node) => {
          if (node.id === nodeId) {
            return {
              ...node,
              data: {
                ...node.data,
                ...data,
                savedData: true,
              },
            }
          }
          return node
        }),
    )

    setHasUnsavedChanges(true)
  }

  // Export flow as JSON
  const exportToJson = () => {
    if (reactFlowInstance) {
      const flowData = reactFlowInstance.toObject()

      // Add the saved node data to the export
      const flowWithData = {
        ...flowData,
        nodeData,
        name: initialWorkflow?.name || "Exported Workflow",
        description: initialWorkflow?.description,
        id: initialWorkflow?.id,
        status: initialWorkflow?.status || "draft",
      }

      const jsonString = JSON.stringify(flowWithData, null, 2)
      const blob = new Blob([jsonString], { type: "application/json" })
      const url = URL.createObjectURL(blob)

      const link = document.createElement("a")
      link.href = url
      link.download = `${initialWorkflow?.name || "workflow"}.json`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)

      toast({
        title: "Success",
        description: "Workflow exported successfully",
      })
    }
  }

  // Save workflow
  const handleSaveWorkflow = () => {
    if (reactFlowInstance && onSave) {
      const flowData = reactFlowInstance.toObject()
      onSave({
        name: initialWorkflow?.name,
        description: initialWorkflow?.description,
        nodes: flowData.nodes,
        edges: flowData.edges,
        nodeData,
      })
      setHasUnsavedChanges(false)
    }
  }

  // Prompt before leaving if there are unsaved changes
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (hasUnsavedChanges) {
        const message = "You have unsaved changes. Are you sure you want to leave?";
        e.returnValue = message;
        return message;
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [hasUnsavedChanges]);

  return (
      <div className="flex h-full w-full">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          <div className="bg-transparent text-black p-2 flex gap-2 justify-between">
            <div className="text-black text-xl font-semibold flex items-center">
              {initialWorkflow?.name || "New Workflow"}
              {hasUnsavedChanges && <span className="ml-2 text-yellow-200">*</span>}
            </div>
            <div className="flex gap-2">
              <Button
                  variant="secondary"
                  onClick={handleSaveWorkflow}
                  disabled={saving || !hasUnsavedChanges}
                  className={''}
              >
                {saving ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Saving...
                    </>
                ) : (
                    <>
                      <Save className="h-4 w-4" />
                      Save Workflow
                    </>
                )}
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="default" className={'text-base font-semibold'}>
                    <span className={'w-6 h-6 flex items-center justify-center'}>
                      <DownloadIcon className="h-full w-full" />
                    </span>

                    Download
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={exportToJson}>Save as JSON</DropdownMenuItem>
                  {/*<DropdownMenuItem>Download as Image</DropdownMenuItem>*/}
                </DropdownMenuContent>
              </DropdownMenu>
              {/*<Button variant="secondary">Elkjs - Layout</Button>*/}
              {/*<Button variant="secondary">Contact</Button>*/}
            </div>
          </div>
          <div className="flex-1" ref={reactFlowWrapper}>
            <ReactFlowProvider>
              <ReactFlow
                  nodes={nodes}
                  edges={edges}
                  onNodesChange={onNodesChange}
                  onEdgesChange={onEdgesChange}
                  onConnect={onConnect}
                  onInit={setReactFlowInstance}
                  onDrop={onDrop}
                  onDragOver={onDragOver}
                  onNodeClick={onNodeClick}
                  nodeTypes={nodeTypes}
                  edgeTypes={edgeTypes}
                  fitView
                  snapToGrid
                  snapGrid={[15, 15]}
                  defaultEdgeOptions={{ type: "custom" }}
              >
                <Controls />
                <Background variant="dots" gap={12} size={1} />
                <Panel position="top-left"></Panel>
              </ReactFlow>
            </ReactFlowProvider>
          </div>
        </div>
        {selectedNode && (
            <NodePanel
                nodeId={selectedNode}
                nodes={nodes}
                onClose={() => setSelectedNode(null)}
                onSave={saveNodeData}
                savedData={nodeData[selectedNode] || {}}
            />
        )}
      </div>
  )
}