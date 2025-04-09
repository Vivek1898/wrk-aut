// // "use client"
// //
// // import type React from "react"
// //
// // import { useState, useEffect } from "react"
// // import { usePathname, useRouter } from "next/navigation"
// // import {
// //   Sidebar,
// //   SidebarContent,
// //   SidebarProvider,
// //   SidebarHeader,
// //   SidebarMenu,
// //   SidebarMenuItem,
// //   SidebarMenuButton,
// //   SidebarFooter,
// //   SidebarMenuSub,
// //   SidebarMenuSubItem,
// //   SidebarMenuSubButton,
// //   SidebarTrigger,
// // } from "@/components/ui/sidebar"
// // import { Button } from "@/components/ui/button"
// // import { PlusCircle, List, History, GitBranch, ChevronDown } from "lucide-react"
// // import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
// // import { Input } from "@/components/ui/input"
// // import { Label } from "@/components/ui/label"
// // import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
// //
// // interface MainLayoutProps {
// //   children: React.ReactNode
// // }
// //
// // export default function MainLayout({ children }: MainLayoutProps) {
// //   const router = useRouter()
// //   const pathname = usePathname()
// //   const [activeTab, setActiveTab] = useState<string>("/workflows")
// //   const [isNewWorkflowDialogOpen, setIsNewWorkflowDialogOpen] = useState(false)
// //   const [newWorkflowName, setNewWorkflowName] = useState("")
// //   const [workflowsOpen, setWorkflowsOpen] = useState(true)
// //   const [executionsOpen, setExecutionsOpen] = useState(true)
// //
// //   useEffect(() => {
// //     // Set the active tab based on the current pathname
// //     if (pathname.includes("/workflows")) {
// //       setActiveTab("/workflows")
// //     } else if (pathname.includes("/executions")) {
// //       setActiveTab("/executions")
// //     } else if (pathname.includes("/canvas")) {
// //       setActiveTab("/canvas")
// //     }
// //   }, [pathname])
// //
// //   const handleTabChange = (path: string) => {
// //     setActiveTab(path)
// //     router.push(path)
// //   }
// //
// //   const handleCreateWorkflow = () => {
// //     if (!newWorkflowName.trim()) return
// //
// //     // Get existing workflows from localStorage
// //     const existingWorkflows = JSON.parse(localStorage.getItem("workflows") || "[]")
// //
// //     // Create new workflow
// //     const newWorkflow = {
// //       id: Date.now().toString(),
// //       name: newWorkflowName,
// //       createdAt: new Date().toISOString(),
// //       nodes: [
// //         {
// //           id: "start",
// //           type: "start",
// //           position: { x: 250, y: 5 },
// //           data: { label: "Start" },
// //         },
// //       ],
// //       edges: [],
// //     }
// //
// //     // Save to localStorage
// //     localStorage.setItem("workflows", JSON.stringify([...existingWorkflows, newWorkflow]))
// //
// //     // Close dialog and reset form
// //     setIsNewWorkflowDialogOpen(false)
// //     setNewWorkflowName("")
// //
// //     // Navigate to the canvas with the new workflow ID
// //     router.push(`/canvas/${newWorkflow.id}`)
// //   }
// //
// //   return (
// //     <SidebarProvider defaultOpen={true}>
// //       <div className="flex h-screen">
// //         <Sidebar>
// //           <SidebarHeader className="border-b">
// //             <div className="p-4 flex items-center justify-between">
// //               <h1 className="text-xl font-bold">Automation Tool</h1>
// //               <SidebarTrigger className="md:hidden" />
// //             </div>
// //           </SidebarHeader>
// //           <SidebarContent>
// //             <SidebarMenu>
// //               {/* Workflows Section */}
// //               <SidebarMenuItem>
// //                 <Collapsible open={workflowsOpen} onOpenChange={setWorkflowsOpen}>
// //                   <CollapsibleTrigger asChild>
// //                     <SidebarMenuButton>
// //                       <List className="mr-2" />
// //                       <span>Workflows</span>
// //                       <ChevronDown
// //                         className={`ml-auto h-4 w-4 transition-transform ${workflowsOpen ? "" : "transform -rotate-90"}`}
// //                       />
// //                     </SidebarMenuButton>
// //                   </CollapsibleTrigger>
// //                   <CollapsibleContent>
// //                     <SidebarMenuSub>
// //                       <SidebarMenuSubItem>
// //                         <SidebarMenuSubButton
// //                           isActive={activeTab === "/workflows"}
// //                           onClick={() => handleTabChange("/workflows")}
// //                         >
// //                           All Workflows
// //                         </SidebarMenuSubButton>
// //                       </SidebarMenuSubItem>
// //                       <SidebarMenuSubItem>
// //                         <SidebarMenuSubButton onClick={() => setIsNewWorkflowDialogOpen(true)}>
// //                           Create New
// //                         </SidebarMenuSubButton>
// //                       </SidebarMenuSubItem>
// //                     </SidebarMenuSub>
// //                   </CollapsibleContent>
// //                 </Collapsible>
// //               </SidebarMenuItem>
// //
// //               {/* Executions Section */}
// //               <SidebarMenuItem>
// //                 <Collapsible open={executionsOpen} onOpenChange={setExecutionsOpen}>
// //                   <CollapsibleTrigger asChild>
// //                     <SidebarMenuButton>
// //                       <History className="mr-2" />
// //                       <span>Executions</span>
// //                       <ChevronDown
// //                         className={`ml-auto h-4 w-4 transition-transform ${executionsOpen ? "" : "transform -rotate-90"}`}
// //                       />
// //                     </SidebarMenuButton>
// //                   </CollapsibleTrigger>
// //                   <CollapsibleContent>
// //                     <SidebarMenuSub>
// //                       <SidebarMenuSubItem>
// //                         <SidebarMenuSubButton
// //                           isActive={activeTab === "/executions"}
// //                           onClick={() => handleTabChange("/executions")}
// //                         >
// //                           Execution History
// //                         </SidebarMenuSubButton>
// //                       </SidebarMenuSubItem>
// //                       <SidebarMenuSubItem>
// //                         <SidebarMenuSubButton onClick={() => handleTabChange("/executions")}>
// //                           Recent Executions
// //                         </SidebarMenuSubButton>
// //                       </SidebarMenuSubItem>
// //                     </SidebarMenuSub>
// //                   </CollapsibleContent>
// //                 </Collapsible>
// //               </SidebarMenuItem>
// //
// //               {/* Canvas */}
// //               <SidebarMenuItem>
// //                 <SidebarMenuButton isActive={activeTab === "/canvas"} onClick={() => handleTabChange("/canvas")}>
// //                   <GitBranch className="mr-2" />
// //                   <span>Workflow Canvas</span>
// //                 </SidebarMenuButton>
// //               </SidebarMenuItem>
// //             </SidebarMenu>
// //           </SidebarContent>
// //           <SidebarFooter className="border-t p-4">
// //             <Button className="w-full" onClick={() => setIsNewWorkflowDialogOpen(true)}>
// //               <PlusCircle className="mr-2 h-4 w-4" />
// //               Create New Workflow
// //             </Button>
// //           </SidebarFooter>
// //         </Sidebar>
// //
// //         <main className="flex-1 overflow-auto">
// //           <div className="p-4 border-b flex items-center">
// //             <SidebarTrigger className="mr-4" />
// //             <h1 className="text-xl font-semibold">
// //               {activeTab === "/workflows"
// //                 ? "Workflows"
// //                 : activeTab === "/executions"
// //                   ? "Execution History"
// //                   : activeTab === "/canvas"
// //                     ? "Workflow Canvas"
// //                     : ""}
// //             </h1>
// //           </div>
// //           <div className="p-4">{children}</div>
// //         </main>
// //       </div>
// //
// //       {/* New Workflow Dialog */}
// //       <Dialog open={isNewWorkflowDialogOpen} onOpenChange={setIsNewWorkflowDialogOpen}>
// //         <DialogContent>
// //           <DialogHeader>
// //             <DialogTitle>Create New Workflow</DialogTitle>
// //           </DialogHeader>
// //           <div className="grid gap-4 py-4">
// //             <div className="grid gap-2">
// //               <Label htmlFor="workflow-name">Workflow Name</Label>
// //               <Input
// //                 id="workflow-name"
// //                 value={newWorkflowName}
// //                 onChange={(e) => setNewWorkflowName(e.target.value)}
// //                 placeholder="Enter workflow name"
// //               />
// //             </div>
// //           </div>
// //           <DialogFooter>
// //             <Button variant="outline" onClick={() => setIsNewWorkflowDialogOpen(false)}>
// //               Cancel
// //             </Button>
// //             <Button onClick={handleCreateWorkflow}>Create</Button>
// //           </DialogFooter>
// //         </DialogContent>
// //       </Dialog>
// //     </SidebarProvider>
// //   )
// // }
//
//
// "use client"
//
// import type React from "react"
//
// import { useState, useEffect } from "react"
// import { usePathname, useRouter } from "next/navigation"
// import {
//   Sidebar,
//   SidebarContent,
//   SidebarProvider,
//   SidebarHeader,
//   SidebarMenu,
//   SidebarMenuItem,
//   SidebarMenuButton,
//   SidebarFooter,
//   SidebarMenuSub,
//   SidebarMenuSubItem,
//   SidebarMenuSubButton,
//   SidebarTrigger,
// } from "@/components/ui/sidebar"
// import { Button } from "@/components/ui/button"
// import { PlusCircle, List, History, GitBranch, ChevronDown, Loader2 } from "lucide-react"
// import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { Textarea } from "@/components/ui/textarea"
// import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
// import { workflowService } from "@/services/api/workflow.service"
// import { toast } from "@/components/ui/use-toast"
//
// interface MainLayoutProps {
//   children: React.ReactNode
// }
//
// export default function MainLayout({ children }: MainLayoutProps) {
//   const router = useRouter()
//   const pathname = usePathname()
//   const [activeTab, setActiveTab] = useState<string>("/workflows")
//   const [isNewWorkflowDialogOpen, setIsNewWorkflowDialogOpen] = useState(false)
//   const [newWorkflowName, setNewWorkflowName] = useState("")
//   const [newWorkflowDescription, setNewWorkflowDescription] = useState("")
//   const [workflowsOpen, setWorkflowsOpen] = useState(true)
//   const [executionsOpen, setExecutionsOpen] = useState(true)
//   const [isCreating, setIsCreating] = useState(false)
//
//   useEffect(() => {
//     // Set the active tab based on the current pathname
//     if (pathname.includes("/workflows")) {
//       setActiveTab("/workflows")
//     } else if (pathname.includes("/executions")) {
//       setActiveTab("/executions")
//     } else if (pathname.includes("/canvas")) {
//       setActiveTab("/canvas")
//     }
//   }, [pathname])
//
//   const handleTabChange = (path: string) => {
//     setActiveTab(path)
//     router.push(path)
//   }
//
//   const handleCreateWorkflow = async () => {
//     if (!newWorkflowName.trim()) return
//
//     try {
//       setIsCreating(true)
//
//       // Create workflow via API
//       const newWorkflow = await workflowService.createWorkflow({
//         name: newWorkflowName,
//         description: newWorkflowDescription || undefined,
//         nodes: [
//           {
//             id: "start",
//             type: "start",
//             position: { x: 250, y: 5 },
//             data: { label: "Start" },
//           },
//         ],
//         edges: [],
//       })
//
//       // Close dialog and reset form
//       setIsNewWorkflowDialogOpen(false)
//       setNewWorkflowName("")
//       setNewWorkflowDescription("")
//
//       toast({
//         title: "Success",
//         description: "Workflow created successfully",
//       })
//
//       // Navigate to the canvas with the new workflow ID
//       router.push(`/canvas/${newWorkflow._id}`)
//     } catch (error) {
//       console.error("Failed to create workflow:", error)
//       toast({
//         title: "Error",
//         description: "Failed to create workflow. Please try again.",
//         variant: "destructive",
//       })
//     } finally {
//       setIsCreating(false)
//     }
//   }
//
//   return (
//       <SidebarProvider defaultOpen={true}>
//         <div className="flex h-screen">
//           <Sidebar>
//             <SidebarHeader className="border-b">
//               <div className="p-4 flex items-center justify-between">
//                 <h1 className="text-xl font-bold">Automation Tool</h1>
//                 <SidebarTrigger className="md:hidden" />
//               </div>
//             </SidebarHeader>
//             <SidebarContent>
//               <SidebarMenu>
//                 {/* Workflows Section */}
//                 <SidebarMenuItem>
//                   <Collapsible open={workflowsOpen} onOpenChange={setWorkflowsOpen}>
//                     <CollapsibleTrigger asChild>
//                       <SidebarMenuButton>
//                         <List className="mr-2" />
//                         <span>Workflows</span>
//                         <ChevronDown
//                             className={`ml-auto h-4 w-4 transition-transform ${workflowsOpen ? "" : "transform -rotate-90"}`}
//                         />
//                       </SidebarMenuButton>
//                     </CollapsibleTrigger>
//                     <CollapsibleContent>
//                       <SidebarMenuSub>
//                         <SidebarMenuSubItem>
//                           <SidebarMenuSubButton
//                               isActive={activeTab === "/workflows"}
//                               onClick={() => handleTabChange("/workflows")}
//                           >
//                             All Workflows
//                           </SidebarMenuSubButton>
//                         </SidebarMenuSubItem>
//                         <SidebarMenuSubItem>
//                           <SidebarMenuSubButton onClick={() => setIsNewWorkflowDialogOpen(true)} data-create-workflow>
//                             Create New
//                           </SidebarMenuSubButton>
//                         </SidebarMenuSubItem>
//                       </SidebarMenuSub>
//                     </CollapsibleContent>
//                   </Collapsible>
//                 </SidebarMenuItem>
//
//                 {/* Executions Section */}
//                 <SidebarMenuItem>
//                   <Collapsible open={executionsOpen} onOpenChange={setExecutionsOpen}>
//                     <CollapsibleTrigger asChild>
//                       <SidebarMenuButton>
//                         <History className="mr-2" />
//                         <span>Executions</span>
//                         <ChevronDown
//                             className={`ml-auto h-4 w-4 transition-transform ${executionsOpen ? "" : "transform -rotate-90"}`}
//                         />
//                       </SidebarMenuButton>
//                     </CollapsibleTrigger>
//                     <CollapsibleContent>
//                       <SidebarMenuSub>
//                         <SidebarMenuSubItem>
//                           <SidebarMenuSubButton
//                               isActive={activeTab === "/executions"}
//                               onClick={() => handleTabChange("/executions")}
//                           >
//                             Execution History
//                           </SidebarMenuSubButton>
//                         </SidebarMenuSubItem>
//                         <SidebarMenuSubItem>
//                           <SidebarMenuSubButton onClick={() => handleTabChange("/executions")}>
//                             Recent Executions
//                           </SidebarMenuSubButton>
//                         </SidebarMenuSubItem>
//                       </SidebarMenuSub>
//                     </CollapsibleContent>
//                   </Collapsible>
//                 </SidebarMenuItem>
//
//                 {/* Canvas */}
//                 <SidebarMenuItem>
//                   <SidebarMenuButton isActive={activeTab === "/canvas"} onClick={() => handleTabChange("/canvas")}>
//                     <GitBranch className="mr-2" />
//                     <span>Workflow Canvas</span>
//                   </SidebarMenuButton>
//                 </SidebarMenuItem>
//               </SidebarMenu>
//             </SidebarContent>
//             <SidebarFooter className="border-t p-4">
//               <Button className="w-full" onClick={() => setIsNewWorkflowDialogOpen(true)}>
//                 <PlusCircle className="mr-2 h-4 w-4" />
//                 Create New Workflow
//               </Button>
//             </SidebarFooter>
//           </Sidebar>
//
//           <main className="flex-1 overflow-auto">
//             <div className="p-4 border-b flex items-center">
//               <SidebarTrigger className="mr-4" />
//               <h1 className="text-xl font-semibold">
//                 {activeTab === "/workflows"
//                     ? "Workflows"
//                     : activeTab === "/executions"
//                         ? "Execution History"
//                         : activeTab === "/canvas"
//                             ? "Workflow Canvas"
//                             : ""}
//               </h1>
//             </div>
//             <div className="p-4">{children}</div>
//           </main>
//         </div>
//
//         {/* New Workflow Dialog */}
//         <Dialog open={isNewWorkflowDialogOpen} onOpenChange={setIsNewWorkflowDialogOpen}>
//           <DialogContent>
//             <DialogHeader>
//               <DialogTitle>Create New Workflow</DialogTitle>
//             </DialogHeader>
//             <div className="grid gap-4 py-4">
//               <div className="grid gap-2">
//                 <Label htmlFor="workflow-name">Workflow Name</Label>
//                 <Input
//                     id="workflow-name"
//                     value={newWorkflowName}
//                     onChange={(e) => setNewWorkflowName(e.target.value)}
//                     placeholder="Enter workflow name"
//                 />
//               </div>
//               <div className="grid gap-2">
//                 <Label htmlFor="workflow-description">Description (Optional)</Label>
//                 <Textarea
//                     id="workflow-description"
//                     value={newWorkflowDescription}
//                     onChange={(e) => setNewWorkflowDescription(e.target.value)}
//                     placeholder="Enter workflow description"
//                     rows={3}
//                 />
//               </div>
//             </div>
//             <DialogFooter>
//               <Button variant="outline" onClick={() => setIsNewWorkflowDialogOpen(false)} disabled={isCreating}>
//                 Cancel
//               </Button>
//               <Button onClick={handleCreateWorkflow} disabled={isCreating}>
//                 {isCreating ? (
//                     <>
//                       <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//                       Creating...
//                     </>
//                 ) : (
//                     "Create"
//                 )}
//               </Button>
//             </DialogFooter>
//           </DialogContent>
//         </Dialog>
//       </SidebarProvider>
//   )
// }

"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { usePathname, useRouter } from "next/navigation"
import {
    Sidebar,
    SidebarContent,
    SidebarProvider,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuItem,
    SidebarMenuButton,
    SidebarFooter,
    SidebarTrigger,
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import {PlusCircle, List, History, GitBranch, Loader2, Workflow, Zap} from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { workflowService } from "@/services/api/workflow.service"
import { toast } from "@/components/ui/use-toast"

interface MainLayoutProps {
    children: React.ReactNode
}

export default function MainLayout({ children }: MainLayoutProps) {
    const router = useRouter()
    const pathname = usePathname()
    const [activeTab, setActiveTab] = useState<string>("/workflows")
    const [isNewWorkflowDialogOpen, setIsNewWorkflowDialogOpen] = useState(false)
    const [newWorkflowName, setNewWorkflowName] = useState("")
    const [newWorkflowDescription, setNewWorkflowDescription] = useState("")
    const [isCreating, setIsCreating] = useState(false)

    useEffect(() => {
        // Set the active tab based on the current pathname
        if (pathname.includes("/workflows")) {
            setActiveTab("/workflows")
        } else if (pathname.includes("/executions")) {
            setActiveTab("/executions")
        } else if (pathname.includes("/canvas")) {
            setActiveTab("/canvas")
        }
    }, [pathname])

    const handleTabChange = (path: string) => {
        setActiveTab(path)
        router.push(path)
    }

    const handleCreateWorkflow = async () => {
        if (!newWorkflowName.trim()) return

        try {
            setIsCreating(true)

            // Create workflow via API
            const newWorkflow = await workflowService.createWorkflow({
                name: newWorkflowName,
                description: newWorkflowDescription || undefined,
                nodes: [
                    {
                        id: "start",
                        type: "start",
                        position: { x: 250, y: 5 },
                        data: { label: "Start" },
                    },
                ],
                edges: [],
            })

            // Close dialog and reset form
            setIsNewWorkflowDialogOpen(false)
            setNewWorkflowName("")
            setNewWorkflowDescription("")

            toast({
                title: "Success",
                description: "Workflow created successfully",
            })

            // Navigate to the canvas with the new workflow ID
            router.push(`/canvas/${newWorkflow._id}`)
        } catch (error) {
            console.error("Failed to create workflow:", error)
            toast({
                title: "Error",
                description: "Failed to create workflow. Please try again.",
                variant: "destructive",
            })
        } finally {
            setIsCreating(false)
        }
    }

    return (
        <SidebarProvider defaultOpen={true}>
            <div className="flex h-screen w-full">
                <Sidebar data-sidebar>
                    <SidebarHeader className="border-b p-0">
                        <div className="p-4 flex items-center justify-between">
                            <h1 className="text-xl font-bold">FLASH</h1>
                            <SidebarTrigger className="md:hidden" />
                        </div>
                    </SidebarHeader>
                    <SidebarContent>
                        <SidebarMenu>
                            {/* Workflows */}
                            <SidebarMenuItem>
                                <SidebarMenuButton
                                    isActive={activeTab === "/workflows"}
                                    onClick={() => handleTabChange("/workflows")}
                                    className={'flex gap-2 px-4 py-3 h-auto text-base font-medium'}
                                >
                                    {/*<List className="mr-2" />*/}
                                    <span className={'w-6'}>
                                        <Workflow  className={'w-full h-full'}/>
                                    </span>
                                    <span>Workflows</span>
                                </SidebarMenuButton>
                            </SidebarMenuItem>

                            {/* Executions */}
                            <SidebarMenuItem>
                                <SidebarMenuButton
                                    isActive={activeTab === "/executions"}
                                    onClick={() => handleTabChange("/executions")}
                                    className={'flex gap-2 px-4 py-3 h-auto text-base font-medium'}
                                >
                                    <span className={'w-6'}>
                                    <Zap className={'w-full h-full'}/>
                                    </span>
                                    <span>Executions</span>
                                </SidebarMenuButton>
                            </SidebarMenuItem>

                            {/* Canvas - this can be hidden if you don't want it showing in the sidebar */}
                            {/*<SidebarMenuItem>*/}
                            {/*    <SidebarMenuButton*/}
                            {/*        isActive={activeTab === "/canvas"}*/}
                            {/*        onClick={() => handleTabChange("/canvas")}*/}
                            {/*    >*/}
                            {/*        <GitBranch className="mr-2" />*/}
                            {/*        <span>Workflow Canvas</span>*/}
                            {/*    </SidebarMenuButton>*/}
                            {/*</SidebarMenuItem>*/}
                        </SidebarMenu>
                    </SidebarContent>
                    <SidebarFooter className="border-t p-4">
                        <Button
                            className="w-full"
                            onClick={() => setIsNewWorkflowDialogOpen(true)}
                            data-create-workflow
                            variant={'default'}
                        >
                            <PlusCircle className="mr-2 h-4 w-4" />
                            Create New Workflow
                        </Button>
                    </SidebarFooter>
                </Sidebar>

                <main className="flex-1 overflow-auto">
                    <div className="p-4 border-b flex items-center">
                        <SidebarTrigger className="mr-4" />
                        <h1 className="text-xl font-semibold">
                            {activeTab === "/workflows"
                                ? "Workflows"
                                : activeTab === "/executions"
                                    ? "Execution History"
                                    : activeTab === "/canvas"
                                        ? "Workflow Canvas"
                                        : ""}
                        </h1>
                    </div>
                    <div className={pathname.includes('/canvas') ? 'h-full max-h-[calc(100vh_-_62px)]' : 'h-full max-h-[calc(100vh_-_62px)] p-4'}>
                        {children}
                    </div>
                </main>
            </div>

            {/* New Workflow Dialog */}
            <Dialog open={isNewWorkflowDialogOpen} onOpenChange={setIsNewWorkflowDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Create New Workflow</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                            <Label htmlFor="workflow-name">Workflow Name</Label>
                            <Input
                                id="workflow-name"
                                value={newWorkflowName}
                                onChange={(e) => setNewWorkflowName(e.target.value)}
                                placeholder="Enter workflow name"
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="workflow-description">Description (Optional)</Label>
                            <Textarea
                                id="workflow-description"
                                value={newWorkflowDescription}
                                onChange={(e) => setNewWorkflowDescription(e.target.value)}
                                placeholder="Enter workflow description"
                                rows={3}
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsNewWorkflowDialogOpen(false)} disabled={isCreating}>
                            Cancel
                        </Button>
                        <Button onClick={handleCreateWorkflow} disabled={isCreating}>
                            {isCreating ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Creating...
                                </>
                            ) : (
                                "Create"
                            )}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </SidebarProvider>
    )
}