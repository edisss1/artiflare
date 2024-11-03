import { useCallback, useEffect, useState } from "react"
import CanvasBoard from "../components/organisms/CanvasBoard"
import CanvasNav from "../components/organisms/CanvasNav"
import { Canvas, Point, TPointerEventInfo } from "fabric"
import ToolBar from "../components/molecules/ToolBar"
import Settings from "../components/organisms/Settings"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "../redux/store"
import { useShapes } from "../hooks/useShapes"
import { doc, getDoc, setDoc } from "firebase/firestore"
import { db } from "../firestore/firebaseConfig"
import ProtectedRoute from "../components/organisms/ProtectedRoute"

const DrawingBoard = () => {
  const [canvas, setCanvas] = useState<Canvas | null>(null)
  const dispatch: AppDispatch = useDispatch()
  const { width, height, diameter, color, stroke } = useSelector(
    (state: RootState) => state.shape
  )
  const { addRectangle, addCircle } = useShapes(canvas)

  const user = useSelector((state: RootState) => state.auth.user)

  // Saving and loading board from db

  const saveBoard = useCallback(async () => {
    if (!canvas || !user) return

    const boardData = JSON.stringify(canvas.toJSON())
    const boardRef = doc(db, "boards", user.uid)
    await setDoc(boardRef, { data: boardData })
  }, [canvas, user])

  const loadBoard = useCallback(async () => {
    if (!user) return
    const boardRef = doc(db, "boards", user.uid)
    const docSnap = await getDoc(boardRef)
    if (docSnap.exists()) {
      const boardData = docSnap.data().data
      canvas?.loadFromJSON(boardData, () => {
        canvas.renderAll()
      })
    }
  }, [canvas, user])

  // Canvas zoom in/out

  const zoomCanvas = (opt: TPointerEventInfo<WheelEvent>) => {
    if (!canvas) return

    const delta = opt.e.deltaY
    let zoom = canvas.getZoom()
    zoom *= 0.999 ** delta

    zoom = Math.max(Math.min(zoom, 5), 0.8)

    const point = new Point(opt.e.offsetX, opt.e.offsetY)

    canvas.zoomToPoint(point, zoom)
    opt.e.preventDefault()
    opt.e.stopPropagation()
  }

  // canvas effects

  useEffect(() => {
    if (!canvas || !user) return

    loadBoard()

    const saveOnChange = () => saveBoard()

    canvas.on("mouse:wheel", zoomCanvas)

    canvas.on("object:added", saveOnChange)
    canvas.on("object:modified", saveOnChange)
    canvas.on("object:removed", saveOnChange)

    return () => {
      canvas.off("mouse:wheel", zoomCanvas)
      canvas.off("object:added", saveOnChange)
      canvas.off("object:modified", saveOnChange)
      canvas.off("object:removed", saveOnChange)
    }
  }, [canvas, user, loadBoard, saveBoard])

  // for buttons

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
    // <ProtectedRoute>
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
    // </ProtectedRoute>
  )
}
export default DrawingBoard
