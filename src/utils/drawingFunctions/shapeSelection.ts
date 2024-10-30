import { Tool } from "../../types/ShapeTypes"

export function shapeSelection(
  setTool: (value: React.SetStateAction<Tool>) => void,
  tool: Tool
) {
  setTool((prevTool) => ({
    type: prevTool.type === tool.type ? null : tool.type,
  }))
}
