import { TPointerEventInfo, TPointerEvent, Canvas } from "fabric"
import { AppDispatch } from "../redux/store"

import { setFreeDrawingMode } from "../redux/slices/shapeManagementSlice"
import { useShapes } from "../hooks/useShapes"

export const handleSelectedShape = (
    e: TPointerEventInfo<TPointerEvent>,
    selectedShapeRef: React.MutableRefObject<string | null>,
    canvas: Canvas | null,
    fill: string,
    stroke: string,
    strokeWidth: number,
    lineStartRef: React.MutableRefObject<{ x: number; y: number } | null>,
    dispatch: AppDispatch,
    brushWidth: number,
    brushColor: string,
    freeDrawingMode: boolean,
    text: string,
    angle: number
) => {
    const {
        addRectangle,
        addCircle,
        addTriangle,
        addRhombus,
        addStar,
        addLine,
        addFreeDrawing,
        addText,
        addProcess,
        addDecision,
        addTerminator,
        addPredefinedProcess,
        addDocument,
        addMultipleDocuments,
        addInputOutput,
        addPreparation,
        addDatabase,
        addDirectData,
        addInternalStorage,
        addManualLoop,
        addDelay,
        addStoredData,
        addMerge,
        addConnector,
        addOr,
        addSummingJunction,
        addDisplay,
        addOffPageConnector
    } = useShapes(canvas)

    if (selectedShapeRef.current && canvas) {
        const pointer = canvas.getScenePoint(e.e)
        switch (selectedShapeRef.current) {
            case "rectangle":
                addRectangle(pointer.x, pointer.y, fill, stroke, strokeWidth)
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
                break
            case "process":
                addProcess(pointer.x, pointer.y, stroke)
                break
            case "decision":
                addDecision(pointer.x, pointer.y, stroke)
                break
            case "terminator":
                addTerminator(pointer.x, pointer.y, stroke)
                break
            case "predefined":
                addPredefinedProcess(pointer.x, pointer.y, stroke)
                break
            case "document":
                addDocument(pointer.x, pointer.y, stroke)
                break
            case "documents":
                addMultipleDocuments(pointer.x, pointer.y, stroke)
                break
            case "input":
                addInputOutput(pointer.x, pointer.y, stroke)
                break
            case "preparation":
                addPreparation(pointer.x, pointer.y, stroke)
                break
            case "database":
                addDatabase(pointer.x, pointer.y, stroke)
                break
            case "direct":
                addDirectData(pointer.x, pointer.y, stroke)
                break
            case "internal":
                addInternalStorage(pointer.x, pointer.y, stroke)
                break
            case "manual":
                addManualLoop(pointer.x, pointer.y, stroke)
                break
            case "delay":
                addDelay(pointer.x, pointer.y, stroke)
                break
            case "stored":
                addStoredData(pointer.x, pointer.y, stroke)
                break
            case "merge":
                addMerge(pointer.x, pointer.y, stroke)
                break
            case "connector":
                addConnector(pointer.x, pointer.y, stroke)
                break
            case "or":
                addOr(pointer.x, pointer.y, stroke)
                break
            case "sum":
                addSummingJunction(pointer.x, pointer.y, stroke)
                break
            case "display":
                addDisplay(pointer.x, pointer.y, stroke)
                break
            case "off":
                addOffPageConnector(pointer.x, pointer.y, stroke)
                break
        }
    }
}
