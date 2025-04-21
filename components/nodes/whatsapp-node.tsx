// components/nodes/whatsapp-node.tsx
import { memo } from "react"
import { Handle, Position } from "reactflow"
import { MessageCircle } from "lucide-react"

function WhatsAppNode({ data }: { data: any }) {
    return (
        <div className="px-4 py-2 shadow-md rounded-md bg-white w-64">
            <Handle type="target" position={Position.Top} id="a" style={{ top: -8, background: "#555" }} />
            <div className="flex items-center">
                <div className="mr-2 bg-green-100 p-2 rounded-md">
                    <MessageCircle className="h-5 w-5 text-green-700" />
                </div>
                <div>
                    <div className="font-bold">WhatsApp</div>
                    <div className="text-xs text-gray-500">{data.message ? `"${data.message.substring(0, 20)}${data.message.length > 20 ? "..." : ""}"` : "Send WhatsApp message"}</div>
                </div>
            </div>
            {data.recipientSource && (
                <div className="mt-2 text-xs">
                    <span className="font-semibold">To: </span>
                    {data.recipientSource === "manual"
                        ? data.recipientPhone || "No number set"
                        : data.recipientSource === "event"
                            ? "From event data"
                            : "User's WhatsApp"}
                </div>
            )}
            <Handle type="source" position={Position.Bottom} id="b" style={{ bottom: -8, background: "#555" }} />
        </div>
    )
}

export default memo(WhatsAppNode)