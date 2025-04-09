import { memo } from "react"
import { Handle, Position } from "reactflow"

function StartNode({ data }: { data: any }) {
  return (
    <div className="px-4 py-2 shadow-md rounded-md bg-white w-32 text-center">
      <div className="font-bold">{data.label}</div>
      <Handle type="source" position={Position.Bottom} id="a" style={{ bottom: -8, background: "#555" }} />
    </div>
  )
}

export default memo(StartNode)
