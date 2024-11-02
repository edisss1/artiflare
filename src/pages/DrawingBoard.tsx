import { useEffect, useState } from "react"
import CanvasBoard from "../components/organisms/CanvasBoard"
import CanvasNav from "../components/organisms/CanvasNav"
import { Canvas, Point, TPointerEvent, TPointerEventInfo } from "fabric"
import ToolBar from "../components/molecules/ToolBar"
import Settings from "../components/organisms/Settings"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "../redux/store"
import { useShapes } from "../hooks/useShapes"

const DrawingBoard = () => {
  const [canvas, setCanvas] = useState<Canvas | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [lastPos, setLastPos] = useState({ x: 0, y: 0 })
  const dispatch: AppDispatch = useDispatch()
  const { width, height, diameter, color, stroke } = useSelector(
    (state: RootState) => state.shape
  )

  console.log(canvas)

  const { addRectangle, addCircle } = useShapes(canvas)

  const zoomCanvas = (opt: TPointerEventInfo<WheelEvent>) => {
    if (!canvas) return

    const delta = opt.e.deltaY
    let zoom = canvas.getZoom()
    zoom *= 0.999 ** delta

    zoom = Math.max(Math.min(zoom, 5), 1.2)

    const point = new Point(opt.e.offsetX, opt.e.offsetY)

    canvas.zoomToPoint(point, zoom)
    opt.e.preventDefault()
    opt.e.stopPropagation()
  }

  // TODO: Implement panning functionality

  const onMouseDownStartPan = (opt: TPointerEventInfo<TPointerEvent>) => {
    if (!canvas) return
    const pointer = canvas.getScenePoint(opt.e)
    if (!pointer) return

    if (opt.e.altKey) {
      setIsDragging(true)
      setLastPos({ x: pointer.x, y: pointer.y })
      canvas.selection = false
    }

    console.log("mouse down")
  }

  const onMouseMovePan = (opt: TPointerEventInfo<TPointerEvent>) => {
    if (!canvas) return

    if (isDragging) {
      const evt = opt.e
      const pointer = canvas.getScenePoint(evt)
      const vpt = canvas.viewportTransform

      vpt[4] += pointer.x - lastPos.x
      vpt[5] += pointer.y - lastPos.y

      setLastPos({ x: pointer.x, y: pointer.y })
      canvas.renderAll()
    }

    console.log("mouse moving")
  }

  const onMouseUpStopPan = () => {
    if (!canvas) return

    setIsDragging(false)
    canvas.setViewportTransform(canvas.viewportTransform)
    canvas.selection = true

    console.log("mouse up")
  }

  useEffect(() => {
    if (!canvas) return
    canvas.on("mouse:wheel", zoomCanvas)
    canvas.on("mouse:down", onMouseDownStartPan)
    canvas.on("mouse:move", onMouseMovePan)
    canvas.on("mouse:up", onMouseUpStopPan)

    return () => {
      canvas.off("mouse:wheel", zoomCanvas)
      canvas.off("mouse:down", onMouseDownStartPan)
      canvas.off("mouse:move", onMouseMovePan)
      canvas.off("mouse:up", onMouseUpStopPan)
    }
  }, [canvas])

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
