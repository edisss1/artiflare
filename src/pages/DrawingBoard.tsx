import { useState } from "react"
import CanvasBoard from "../components/organisms/CanvasBoard"
import CanvasNav from "../components/organisms/CanvasNav"
import { Canvas, Rect } from "fabric"
import ToolBar from "../components/molecules/ToolBar"
import Settings from "../components/organisms/Settings"

const DrawingBoard = () => {
  const [canvas, setCanvas] = useState<Canvas | null>(null)

  const addRectangle = () => {
    if (!canvas) return

    const rect = new Rect({
      width: 100,
      height: 100,
      top: 300,
      left: 400,
      fill: "#333333",
    })

    console.log(rect.width)
    canvas.add(rect)
  }

  return (
    <>
      <CanvasNav />

      <div className="relative">
        <ToolBar onClick={addRectangle} />
        <CanvasBoard canvas={canvas} setCanvas={setCanvas} />
        <Settings canvas={canvas} />
      </div>
    </>
  )
}
export default DrawingBoard
