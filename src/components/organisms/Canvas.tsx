import { Layer, Stage } from "react-konva"
import { useEffect, useState } from "react"
import { KonvaEventObject } from "konva/lib/Node"
import {
  Dimensions,
  Scale,
  Tool,
  LineType,
  TShape,
} from "../../types/ShapeTypes"
import {
  handleMouseDrawingDown,
  handleMouseDrawingMove,
  handleMouseDrawingUp,
} from "../../utils/drawingFunctions/line"
import Shape from "../atoms/Shape"
import { shapeSelection } from "../../utils/drawingFunctions/shapeSelection"
import { useDispatch, useSelector } from "react-redux"
import { addShape, selectShape } from "../../redux/slices/shapeSlice"
import { v4 as uuidv4 } from "uuid"
import { selectShapes } from "../../redux/selectors/shapeSelectors"

interface CanvasBoardProps {
  tool: Tool
  setTool: React.Dispatch<React.SetStateAction<Tool>>
}

const CanvasBoard = ({ tool, setTool }: CanvasBoardProps) => {
  const [coordinates, setCoordinates] = useState<Dimensions>({ x: 0, y: 0 })
  const [scale, setScale] = useState<Scale>({ x: 1, y: 1 })
  const [lines, setLines] = useState<LineType[]>([])
  const [isDrawing, setIsDrawing] = useState(false)

  const dispatch = useDispatch()
  const shapes = useSelector(selectShapes)
  const selectedShapeId = useSelector(selectShape)

  const handleAddShape = (e: KonvaEventObject<MouseEvent>, shapeType: Tool) => {
    const newShape: TShape = {
      id: uuidv4(),
      shape: shapeType.type,
      x: e.evt.clientX,
      y: e.evt.clientY,
      width: 100,
      height: 100,
      fill: "blue",
      stroke: "black",
      strokeWidth: 2,
      rotation: 0,
      scale: { x: 1, y: 1 },
      lines: [],
      radius: shapeType.type === "circle" ? 50 : 0,
    }

    dispatch(addShape(newShape))
  }

  const handleMouseDown = (e: KonvaEventObject<MouseEvent>) => {
    switch (tool.type) {
      case "line":
        handleMouseDrawingDown(e, setIsDrawing, setLines, lines, tool)
        break
      case "rectangle":
      case "circle":
        handleAddShape(e, tool)
        break
      default:
        break
    }
  }

  const handleMouseMove = (e: KonvaEventObject<MouseEvent>) => {
    switch (tool.type) {
      case "line":
        return handleMouseDrawingMove(e, isDrawing, lines, setLines)
    }
  }

  const handleMouseUp = () => {
    switch (tool.type) {
      case "line":
        return handleMouseDrawingUp(setIsDrawing)
    }
  }

  const handleScaleChange = (e: WheelEvent) => {
    e.preventDefault()
    const scrollStep = 0.05
    setScale((prevScale) => {
      const newScaleX =
        e.deltaY > 0
          ? Math.max(prevScale.x - scrollStep, 1) // Zoom out, limit min scale to 1
          : Math.min(prevScale.x + scrollStep, 2.5) // Zoom in, limit max scale to 2.5

      const newScaleY =
        e.deltaY > 0
          ? Math.max(prevScale.y - scrollStep, 1)
          : Math.min(prevScale.y + scrollStep, 2.5)

      return { x: newScaleX, y: newScaleY }
    })
  }

  const handleShapeCoordinatesChange = (e: KonvaEventObject<MouseEvent>) => {
    setCoordinates({
      x: e.target.x(),
      y: e.target.y(),
    })
    console.log(coordinates)
  }

  const handleKeyPress = (e: KeyboardEvent) => {
    switch (e.key) {
      case "l":
        shapeSelection(setTool, { type: "line" })
        break
      case "r":
        shapeSelection(setTool, { type: "rectangle" })
        console.log("rectangle selected")
    }
  }

  useEffect(() => {
    window.addEventListener("wheel", handleScaleChange as EventListener)

    return () => {
      window.removeEventListener("wheel", handleScaleChange as EventListener)
    }
  }, [])

  useEffect(() => {
    document.addEventListener("keydown", handleKeyPress)

    return () => {
      document.removeEventListener("keydown", handleKeyPress)
    }
  }, [])

  console.log(lines)

  return (
    <Stage
      className="bg-white grid-pattern"
      width={window.innerWidth}
      height={window.innerHeight}
      scale={scale}
      onMouseDown={(e) => handleMouseDown(e)}
      onMouseMove={(e) => handleMouseMove(e)}
      onMouseUp={handleMouseUp}
      draggable={!isDrawing}>
      <Layer>
        {shapes.map((shape) => (
          <Shape {...shape} onDragEnd={handleShapeCoordinatesChange} />
        ))}
      </Layer>
    </Stage>
  )
}

export default CanvasBoard
