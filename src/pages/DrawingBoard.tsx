import { lazy, useCallback, useEffect, useRef, useState } from "react"
const CanvasBoard = lazy(() => import("../components/organisms/CanvasBoard"))
import { Canvas, Point, TPointerEvent, TPointerEventInfo } from "fabric"
import ToolBar from "../components/molecules/ToolBar"
import ShapeParameters from "../components/organisms/ShapeParameters"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "../redux/store"
import { getBoardByID, updateBoard } from "../redux/slices/boardSlice"
import { useParams } from "react-router-dom"
import { BoardData } from "../types/BoardData"
import User from "../components/atoms/User.tsx"
import {
    setDrawingMode,
    setSelectedShape
} from "../redux/slices/shapeManagementSlice"

import CanvasNav from "../components/molecules/CanvasNav.tsx"
import { updateSelectedShape } from "../utils/updateSelectedShape.ts"
import ChatContainer from "../components/molecules/ChatContainer.tsx"
import { handleSelectedShape } from "../utils/shapeHandlers.ts"
import { shapesListFunc } from "../constants/shapesList.tsx"
import { shapeKeyboardShortcuts } from "../utils/shapeKeyboardShortcuts.ts"

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
        text,
        scaleX,
        scaleY
    } = useSelector((state: RootState) => state.shape)

    const user = useSelector((state: RootState) => state.auth.user)

    const { boardID } = useParams()

    const status = useSelector((state: RootState) => state.boards.status)

    const lineStartRef = useRef<{ x: number; y: number } | null>(null)

    useEffect(() => {
        console.log("Status: ", status)
        console.log("BoardID: ", boardID)
    }, [status])

    const shapesList = shapesListFunc(dispatch, selectedShapeRef)

    // shape handling

    const handleShapeSelection = (e: TPointerEventInfo<TPointerEvent>) => {
        handleSelectedShape(
            e,
            selectedShapeRef,
            canvas,
            fill,
            stroke,
            strokeWidth,
            lineStartRef,
            dispatch,
            brushWidth,
            brushColor,
            freeDrawingMode,
            text,
            angle
        )
    }

    // Saving and loading board from db

    const saveBoard = useCallback(async () => {
        if (canvas && boardID && user) {
            try {
                const newBoardData = JSON.stringify(canvas.toJSON())

                dispatch(
                    updateBoard({
                        boardID,
                        newBoardData,
                        user
                    })
                )
            } catch (err) {
                console.error(err)
            }
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

    // shortcuts

    useEffect(() => {
        const cleanup = shapeKeyboardShortcuts(dispatch, selectedShapeRef)

        return cleanup
    }, [dispatch])

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
        canvas.on("mouse:down", handleShapeSelection)
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
            canvas.off("mouse:down", handleShapeSelection)
            canvas.off("object:added", handleObjectAdded)
            canvas.off("path:created", handleObjectAdded)
        }
    }, [canvas, user, loadBoard, saveBoard, boardID])

    return (
        <>
            <CanvasNav />

            <div className="min-h-screen">
                <ToolBar shapesList={shapesList} />
                <ShapeParameters
                    scaleY={scaleY}
                    scaleX={scaleX}
                    width={width}
                    height={height}
                    diameter={diameter}
                    fill={fill}
                    canvas={canvas}
                    dispatch={dispatch}
                    stroke={stroke}
                    angle={angle}
                />
                <User position="absolute bottom-8 left-[5%] z-40 " />
                <ChatContainer />
                <CanvasBoard setCanvas={setCanvas} />
            </div>
        </>
    )
}
export default DrawingBoard
