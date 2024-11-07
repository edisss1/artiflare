import { lazy, useCallback, useEffect, useState } from "react"
const CanvasBoard = lazy(() => import("../components/organisms/CanvasBoard"))
import CanvasNav from "../components/organisms/CanvasNav"
import { Canvas, Point, TPointerEventInfo } from "fabric"
import ToolBar from "../components/molecules/ToolBar"
import ShapeParameters from "../components/organisms/ShapeParameters"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "../redux/store"
import { useShapes } from "../hooks/useShapes"
import { getBoardByID, updateBoard } from "../redux/slices/boardSlice"
import { useParams } from "react-router-dom"
import { BoardData } from "../types/BoardData"
import User from "../components/molecules/User"

const DrawingBoard = () => {
  const [canvas, setCanvas] = useState<Canvas | null>(null)
  const dispatch: AppDispatch = useDispatch()
  const { width, height, diameter, color, stroke } = useSelector(
    (state: RootState) => state.shape
  )
  const { addRectangle, addCircle, addPolygon } = useShapes(canvas)

  const user = useSelector((state: RootState) => state.auth.user)

  const { boardID } = useParams()

  const status = useSelector((state: RootState) => state.boards.status)

  useEffect(() => {
    console.log("Status: ", status)
    console.log("BoardID: ", boardID)
  }, [status])

  // Saving and loading board from db

  const saveBoard = useCallback(async () => {
    if (canvas && boardID && user) {
      const newBoardData = canvas.toJSON()
      console.log("New board data (save board): ", newBoardData)
      console.log("Dispatching updateBoard with: ", {
        boardID,
        newBoardData,
        user,
      })
      dispatch(
        updateBoard({
          boardID,
          newBoardData,
          user,
        })
      )
      console.log("saving board")
    } else {
      console.log("missing dependencies: ", { canvas, boardID, user })
    }
  }, [canvas, boardID, user, dispatch])

  const loadBoard = useCallback(async () => {
    if (boardID) {
      const boardData = (await dispatch(getBoardByID(boardID))) as BoardData

      const { payload } = boardData
      const { data } = payload
      canvas?.loadFromJSON(data)
      console.log("canvas rendered with: ", data)
      canvas?.requestRenderAll()
    }
  }, [dispatch, boardID, canvas])

  // Canvas zoom in/out

  const zoomCanvas = (opt: TPointerEventInfo<WheelEvent>) => {
    if (!canvas) return

    const delta = opt.e.deltaY
    let zoom = canvas.getZoom()
    zoom *= 0.999 ** delta

    zoom = Math.max(Math.min(zoom, 5), 0.2)

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

    canvas.renderAll()

    return () => {
      canvas.off("mouse:wheel", zoomCanvas)
      canvas.off("object:added", saveOnChange)
      canvas.off("object:modified", saveOnChange)
      canvas.off("object:removed", saveOnChange)
    }
  }, [canvas, user, loadBoard, saveBoard, boardID])

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
    {
      icon: "add polygon",
      fn: addPolygon,
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
