import { memo } from "react"
import { Handle, Position } from "reactflow"
import { Mail } from "lucide-react"

function EmailNode({ data }: { data: any }) {
  return (
    <div className="px-4 py-2 shadow-md rounded-md bg-white w-64">
      <Handle type="target" position={Position.Top} id="a" style={{ top: -8, background: "#555" }} />
      <div className="flex items-center">
        <div className="mr-2 bg-green-50 p-2 rounded-md">
          <Mail className="h-5 w-5 text-green-600" />
        </div>
        <div>
          <div className="font-bold">Email</div>
          <div className="text-xs text-gray-500">{data.action}</div>
        </div>
        {data.savedData && (
          <div className="ml-auto">
            <button className="text-gray-400 hover:text-gray-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 20h9"></path>
                <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
              </svg>
            </button>
          </div>
        )}
      </div>
      {data.savedData ? (
        <div className="mt-2 text-sm text-gray-700 break-words">{data.senderEmail || ""}</div>
      ) : (
        <div className="mt-2 p-2 bg-yellow-50 text-sm text-yellow-800 rounded border border-yellow-200">
          {data.buttonText}
        </div>
      )}
      <Handle type="source" position={Position.Bottom} id="b" style={{ bottom: -8, background: "#555" }} />
    </div>
  )
}

export default memo(EmailNode)
