import { memo } from "react"
import { Handle, Position } from "reactflow"
import { User } from "lucide-react"

function UpdateProfileNode({ data }: { data: any }) {
  return (
    <div className="px-4 py-2 shadow-md rounded-md bg-white w-64">
      <Handle type="target" position={Position.Top} id="a" style={{ top: -8, background: "#555" }} />
      <div className="flex items-center">
        <div className="mr-2 bg-amber-50 p-2 rounded-md">
          <User className="h-5 w-5 text-amber-600" />
        </div>
        <div>
          <div className="font-bold">Update Profile Property</div>
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

export default memo(UpdateProfileNode)
