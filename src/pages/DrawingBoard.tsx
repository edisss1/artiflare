import { useState } from "react"
import CanvasBoard from "../components/organisms/CanvasBoard"
import CanvasNav from "../components/organisms/CanvasNav"
import { Canvas } from "fabric"
import ToolBar from "../components/molecules/ToolBar"
import Settings from "../components/organisms/Settings"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "../redux/store"
import { useShapes } from "../hooks/useShapes"

const DrawingBoard = () => {
  const [canvas, setCanvas] = useState<Canvas | null>(null)
  const dispatch: AppDispatch = useDispatch()
  const { width, height, diameter, color, stroke } = useSelector(
    (state: RootState) => state.shape
  )

  const { addRectangle, addCircle } = useShapes(canvas)

  const shapesList = [
    {
      icon: "add rectangle",
      fn: addRectangle,
    },
    {
      icon: "add circle",
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
        <CanvasBoard setCanvas={setCanvas} />
      </div>
    </>
  )
}
export default DrawingBoard
