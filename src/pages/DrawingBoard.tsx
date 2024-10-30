import { useState } from "react"
import CanvasBoard from "../components/organisms/Canvas"
import CanvasNav from "../components/organisms/CanvasNav"
import { Tool, TShape } from "../types/ShapeTypes"

const DrawingBoard = () => {
  const [tool, setTool] = useState<Tool>({ type: null })
  const [shapeType, setShapeType] = useState<TShape | null>(null)

  const toolsList: Tool[] = [
    {
      type: "rectangle",
    },
    {
      type: "circle",
    },
    {
      type: "ellipse",
    },
    {
      type: "eraser",
    },
    {
      type: "eraser",
    },
    {
      type: "pen",
    },
    {
      type: "line",
    },
    {
      type: null,
    },
  ]

  return (
    <>
      <CanvasNav />
      <div className="relative">
        <CanvasBoard tool={tool} setTool={setTool} />
      </div>
    </>
  )
}
export default DrawingBoard
