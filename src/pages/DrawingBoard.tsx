import { useState } from "react"
import CanvasBoard from "../components/organisms/Canvas"
import CanvasNav from "../components/organisms/CanvasNav"
import { Tool } from "../types/ShapeTypes"

const DrawingBoard = () => {
  const [tool, setTool] = useState<Tool>({ type: "" })

  return (
    <main>
      <CanvasNav />
      <div>
        <CanvasBoard tool={tool} setTool={setTool} />
      </div>
    </main>
  )
}
export default DrawingBoard
