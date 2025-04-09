import { memo } from "react"
import { Handle, Position } from "reactflow"
import { MessageSquare } from "lucide-react"

function SmsNode({ data }: { data: any }) {
  return (
    <div className="px-4 py-2 shadow-md rounded-md bg-white w-64">
      <Handle type="target" position={Position.Top} id="a" style={{ top: -8, background: "#555" }} />
      <div className="flex items-center">
        <div className="mr-2 bg-green-50 p-2 rounded-md">
          <MessageSquare className="h-5 w-5 text-green-600" />
        </div>
        <div>
          <div className="font-bold">SMS</div>
          <div className="text-xs text-gray-500">{data.action}</div>
        </div>
      </div>
      <div className="mt-2 p-2 bg-yellow-50 text-sm text-yellow-800 rounded border border-yellow-200">
        {data.buttonText}
      </div>
      <Handle type="source" position={Position.Bottom} id="b" style={{ bottom: -8, background: "#555" }} />
    </div>
  )
}

export default memo(SmsNode)
