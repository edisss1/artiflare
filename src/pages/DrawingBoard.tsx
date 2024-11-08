import { lazy, useCallback, useEffect, useRef, useState } from "react"
const CanvasBoard = lazy(() => import("../components/organisms/CanvasBoard"))
import CanvasNav from "../components/organisms/CanvasNav"
import { Canvas, Point, TPointerEvent, TPointerEventInfo } from "fabric"
import ToolBar from "../components/molecules/ToolBar"
import ShapeParameters from "../components/organisms/ShapeParameters"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "../redux/store"
import { useShapes } from "../hooks/useShapes"
import { getBoardByID, updateBoard } from "../redux/slices/boardSlice"
import { useParams } from "react-router-dom"
import { BoardData } from "../types/BoardData"
import User from "../components/molecules/User"
import { setSelectedShape } from "../redux/slices/shapeManagementSlice"

const DrawingBoard = () => {
  const [canvas, setCanvas] = useState<Canvas | null>(null)
  const dispatch: AppDispatch = useDispatch()
  const selectedShapeRef = useRef<string | null>(null)
  const { width, height, diameter, fill, stroke, strokeWidth } = useSelector(
    (state: RootState) => state.shape
  )
  const { addRectangle, addCircle } = useShapes(canvas)

  const user = useSelector((state: RootState) => state.auth.user)

  const { boardID } = useParams()

  const status = useSelector((state: RootState) => state.boards.status)

  useEffect(() => {
    console.log("Status: ", status)
    console.log("BoardID: ", boardID)
  }, [status])

  const updateSelectedShape = (shape: string | null) => {
    dispatch(setSelectedShape(shape))
    selectedShapeRef.current = shape
  }

  const handleSelectedShape = (e: TPointerEventInfo<TPointerEvent>) => {
    if (selectedShapeRef.current && canvas) {
      const pointer = canvas.getScenePoint(e.e)
      switch (selectedShapeRef.current) {
        case "rectangle":
          addRectangle(pointer.x, pointer.y)
          break
        case "circle":
          addCircle(pointer.x, pointer.y)
      }
      updateSelectedShape(null)
    }
  }

  // Saving and loading board from db

  const saveBoard = useCallback(async () => {
    if (canvas && boardID && user) {
      const newBoardData = canvas.toJSON()

      dispatch(
        updateBoard({
          boardID,
          newBoardData,
          user,
        })
      )
    } else {
    }
    console.log("Board saved")
  }, [canvas, boardID, user, dispatch])

  const loadBoard = useCallback(async () => {
    if (boardID) {
      const boardData = (await dispatch(getBoardByID(boardID))) as BoardData

      const { payload } = boardData
      const { data } = payload
      canvas?.loadFromJSON(data)
      canvas?.requestRenderAll()
    }
  }, [dispatch, boardID, canvas])

  // Canvas zoom in/out

  const zoomCanvas = (opt: TPointerEventInfo<WheelEvent>) => {
    if (!canvas) return

    const delta = opt.e.deltaY
    let zoom = canvas.getZoom()
    zoom *= 0.999 ** delta

    zoom = Math.max(Math.min(zoom, 5), 0.1)

    const point = new Point(opt.e.offsetX, opt.e.offsetY)

    canvas.zoomToPoint(point, zoom)
    opt.e.preventDefault()
    opt.e.stopPropagation()
  }

  // canvas effects

  useEffect(() => {
    const handleKeyDown = (e: globalThis.KeyboardEvent) => {
      switch (e.key) {
        case "Escape":
          setSelectedShape(null)
      }
    }

    console.log("esc down")

    window.addEventListener("keydown", handleKeyDown)

    return () => {
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [canvas])

  useEffect(() => {
    if (!canvas || !user) return

    loadBoard()

    const saveOnChange = () => saveBoard()

    canvas.on("mouse:wheel", zoomCanvas)

    canvas.on("object:added", saveOnChange)
    canvas.on("object:modified", saveOnChange)
    canvas.on("object:removed", saveOnChange)
    canvas.on("mouse:down", handleSelectedShape)

    canvas.renderAll()

    return () => {
      canvas.off("mouse:wheel", zoomCanvas)
      canvas.off("object:added", saveOnChange)
      canvas.off("object:modified", saveOnChange)
      canvas.off("object:removed", saveOnChange)
      canvas.off("mouse:down", handleSelectedShape)
    }
  }, [canvas, user, loadBoard, saveBoard, boardID])

  // for buttons

  const shapesList = [
    {
      icon: "add rectangle",
      fn: () => updateSelectedShape("rectangle"),
    },
    {
      icon: "add circle",
      fn: () => updateSelectedShape("circle"),
    },
    {
      icon: "add polygon",
      fn: () => updateSelectedShape("polygon"),
    },
  ]

  return (
    // <ProtectedRoute>
    <>
      <CanvasNav />

      <div className="relative ">
        <ToolBar shapesList={shapesList} />
        <User position="absolute bottom-9 left-4 p-2 z-10 " />
        <ShapeParameters
          width={width}
          height={height}
          diameter={diameter}
          fill={fill}
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
