import { lazy, useCallback, useEffect, useRef, useState } from "react"
const CanvasBoard = lazy(() => import("../components/organisms/CanvasBoard"))
import { Canvas, Point, TPointerEvent, TPointerEventInfo } from "fabric"
import ToolBar from "../components/molecules/ToolBar"
import ShapeParameters from "../components/organisms/ShapeParameters"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "../redux/store"
import { useShapes } from "../hooks/useShapes"
import { getBoardByID, updateBoard } from "../redux/slices/boardSlice"
import { useParams } from "react-router-dom"
import { BoardData } from "../types/BoardData"
import User from "../components/atoms/User.tsx"
import {
    setDrawingMode,
    setFreeDrawingMode,
    setSelectedShape
} from "../redux/slices/shapeManagementSlice"
import ShapesIcon from "../components/icons/shapes/ShapesIcon.tsx"
import RectangleIcon from "../components/icons/shapes/RectangleIcon.tsx"
import CircleIcon from "../components/icons/shapes/CircleIcon.tsx"
import TriangleIcon from "../components/icons/shapes/TriangleIcon.tsx"
import RhombusIcon from "../components/icons/shapes/RhombusIcon.tsx"
import StarIcon from "../components/icons/shapes/StarIcon.tsx"
import LineIcon from "../components/icons/shapes/LineIcon.tsx"
import CanvasNav from "../components/molecules/CanvasNav.tsx"
import TextIcon from "../components/icons/shapes/TextIcon.tsx"
import PencilIcon from "../components/icons/shapes/PencilIcon.tsx"
import { updateSelectedShape } from "../utils/updateSelectedShape.ts"
import ChatContainer from "../components/molecules/ChatContainer.tsx"

const DrawingBoard = () => {
    const [canvas, setCanvas] = useState<Canvas | null>(null)
    const dispatch: AppDispatch = useDispatch()
    const selectedShapeRef = useRef<string | null>(null)
    const {
        width,
        height,
        diameter,
        fill,
        stroke,
        strokeWidth,
        brushColor,
        brushWidth,
        isDrawingMode,
        angle,
        freeDrawingMode,
        text
    } = useSelector((state: RootState) => state.shape)

    const {
        addRectangle,
        addCircle,
        addTriangle,
        addRhombus,
        addStar,
        addLine,
        addFreeDrawing,
        addText
    } = useShapes(canvas)

    const user = useSelector((state: RootState) => state.auth.user)

    const { boardID } = useParams()

    const status = useSelector((state: RootState) => state.boards.status)

    const lineStartRef = useRef<{ x: number; y: number } | null>(null)

    useEffect(() => {
        console.log("Status: ", status)
        console.log("BoardID: ", boardID)
    }, [status])

    // shape handling

    const handleSelectedShape = (e: TPointerEventInfo<TPointerEvent>) => {
        if (selectedShapeRef.current && canvas) {
            const pointer = canvas.getScenePoint(e.e)
            switch (selectedShapeRef.current) {
                case "rectangle":
                    addRectangle(
                        pointer.x,
                        pointer.y,
                        fill,
                        stroke,
                        strokeWidth
                    )
                    break
                case "circle":
                    addCircle(pointer.x, pointer.y)
                    break
                case "triangle":
                    addTriangle(pointer.x, pointer.y, fill, stroke, strokeWidth)
                    break
                case "rhombus":
                    addRhombus(pointer.x, pointer.y, fill, stroke, strokeWidth)
                    break
                case "star":
                    addStar(pointer.x, pointer.y, fill, stroke, strokeWidth)
                    break
                case "line":
                    if (!lineStartRef.current) {
                        lineStartRef.current = { x: pointer.x, y: pointer.y }
                    } else {
                        const { x: x1, y: y1 } = lineStartRef.current

                        let x2 = pointer.x
                        let y2 = pointer.y

                        if (e.e.shiftKey) {
                            const deltaX = x2 - x1
                            const deltaY = y2 - y1
                            const lineAngle = Math.atan2(deltaY, deltaX)

                            const snapAngle =
                                Math.round(lineAngle / (Math.PI / 4)) *
                                (Math.PI / 4)

                            const length = Math.sqrt(deltaX ** 2 + deltaY ** 2)

                            x2 = x1 + length * Math.cos(snapAngle)
                            y2 = y1 + length * Math.sin(snapAngle)

                            addLine(x1, y1, x2, y2, stroke, strokeWidth, angle)

                            lineStartRef.current = null
                        }
                    }
                    break
                case "pencil":
                    dispatch(setFreeDrawingMode(true))
                    addFreeDrawing(brushWidth, brushColor, freeDrawingMode)
                    break
                case "text":
                    addText(text, pointer.x, pointer.y)
            }
        }
    }

    // Saving and loading board from db

    const saveBoard = useCallback(async () => {
        if (canvas && boardID && user) {
            const newBoardData = canvas.toJSON()

            console.log("Saving board data: ", newBoardData)

            dispatch(
                updateBoard({
                    boardID,
                    newBoardData,
                    user
                })
            )
        }
        console.log("Board saved")
    }, [canvas, boardID, user, dispatch])

    const loadBoard = useCallback(async () => {
        if (boardID) {
            const boardData = (await dispatch(
                getBoardByID(boardID)
            )) as BoardData

            const { payload } = boardData
            const { data } = payload
            await canvas?.loadFromJSON(data)
            canvas?.requestRenderAll()
            console.log("board data on load: ", canvas?.toJSON())
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
                    updateSelectedShape(null, dispatch, selectedShapeRef)
                    break
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

        const handleObjectAdded = () => {
            selectedShapeRef.current = null
            dispatch(setDrawingMode(false))
        }

        loadBoard()

        const saveOnChange = () => saveBoard()

        canvas.isDrawingMode = isDrawingMode

        canvas.on("mouse:wheel", zoomCanvas)

        canvas.on("object:added", saveOnChange)
        canvas.on("object:modified", saveOnChange)
        canvas.on("object:removed", saveOnChange)
        canvas.on("mouse:down", handleSelectedShape)
        canvas.on("object:added", handleObjectAdded)
        canvas.on("path:created", handleObjectAdded)
        canvas.on("object:modifyPath", handleObjectAdded)

        canvas.on("mouse:up", () => {
            dispatch(setDrawingMode(false))
        })

        canvas.renderAll()

        return () => {
            canvas.off("mouse:wheel", zoomCanvas)
            canvas.off("object:added", saveOnChange)
            canvas.off("object:modified", saveOnChange)
            canvas.off("object:removed", saveOnChange)
            canvas.off("mouse:down", handleSelectedShape)
            canvas.off("object:added", handleObjectAdded)
            canvas.off("path:created", handleObjectAdded)
        }
    }, [canvas, user, loadBoard, saveBoard, boardID])

    // for buttons

    const shapesList = [
        {
            icon: <ShapesIcon />,
            fn: [
                {
                    label: <RectangleIcon />,
                    fn: () =>
                        updateSelectedShape(
                            "rectangle",
                            dispatch,
                            selectedShapeRef
                        )
                },
                {
                    label: <CircleIcon />,
                    fn: () =>
                        updateSelectedShape(
                            "circle",
                            dispatch,
                            selectedShapeRef
                        )
                },
                {
                    label: <TriangleIcon />,
                    fn: () =>
                        updateSelectedShape(
                            "triangle",
                            dispatch,
                            selectedShapeRef
                        )
                },
                {
                    label: <RhombusIcon />,
                    fn: () =>
                        updateSelectedShape(
                            "rhombus",
                            dispatch,
                            selectedShapeRef
                        )
                },
                {
                    label: <StarIcon />,
                    fn: () =>
                        updateSelectedShape("star", dispatch, selectedShapeRef)
                }
            ]
        },
        {
            icon: <PencilIcon />,
            fn: [
                {
                    label: <PencilIcon />,
                    fn: () =>
                        updateSelectedShape(
                            "pencil",
                            dispatch,
                            selectedShapeRef
                        )
                },
                {
                    label: <LineIcon />,
                    fn: () =>
                        updateSelectedShape("line", dispatch, selectedShapeRef)
                }
            ]
        },
        {
            icon: <TextIcon />,
            fn: [
                {
                    label: <TextIcon />,
                    fn: () =>
                        updateSelectedShape("text", dispatch, selectedShapeRef)
                }
            ]
        }
    ]

    return (
        <>
            <CanvasNav />

            <div className="min-h-screen">
                <ToolBar shapesList={shapesList} />
                <ShapeParameters
                    width={width}
                    height={height}
                    diameter={diameter}
                    fill={fill}
                    canvas={canvas}
                    dispatch={dispatch}
                    stroke={stroke}
                    angle={angle}
                />
                <User position="absolute bottom-[1rem] left-[5%] z-10 " />
                <ChatContainer />
                <CanvasBoard setCanvas={setCanvas} />
            </div>
        </>
    )
}
export default DrawingBoard
