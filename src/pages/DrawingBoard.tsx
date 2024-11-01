import { useState } from "react"
import CanvasBoard from "../components/organisms/CanvasBoard"
import CanvasNav from "../components/organisms/CanvasNav"
import { Canvas, Circle, Rect } from "fabric"
import ToolBar from "../components/molecules/ToolBar"
import Settings from "../components/organisms/Settings"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "../redux/store"

const DrawingBoard = () => {
  const [canvas, setCanvas] = useState<Canvas | null>(null)
  const dispatch: AppDispatch = useDispatch()
  const { width, height, diameter, color, stroke } = useSelector(
    (state: RootState) => state.shape
  )
  const addRectangle = () => {
    if (!canvas) return

    const rect = new Rect({
      width: 100,
      height: 100,
      top: 300,
      left: 400,
      fill: "#333333",
    })

    canvas.add(rect)
  }
  const addCircle = () => {
    if (!canvas) return

    const rect = new Circle({
      width: 100,
      height: 100,
      radius: 100,
      top: 300,
      left: 400,
      fill: "#333333",
      stroke: "#333333",
      strokeWidth: 1,
      opacity: 100,
    })

    canvas.add(rect)
  }

  const shapesList = [
    {
      placeholder: "add rectangle",
      fn: addRectangle,
    },
    {
      placeholder: "add circle",
      fn: addCircle,
    },
  ]

  return (
    <>
      <CanvasNav />

      <div className="relative ">
        <ToolBar shapesList={shapesList} />
        <Settings
          width={width}
          height={height}
          diameter={diameter}
          color={color}
          canvas={canvas}
          dispatch={dispatch}
          stroke={stroke}
        />
        <CanvasBoard canvas={canvas} setCanvas={setCanvas} />
      </div>
    </>
  )
}
export default DrawingBoard
