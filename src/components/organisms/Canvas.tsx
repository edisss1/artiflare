import { Layer, Line, Rect, Stage } from "react-konva"
import { useEffect, useState } from "react"
import { KonvaEventObject } from "konva/lib/Node"
import { Dimensions, Scale, Tool, LineType } from "../../types/ShapeTypes"
import {
  handleMouseDrawingDown,
  handleMouseDrawingMove,
  handleMouseDrawingUp,
} from "../../utils/drawingFunctions/line"
import { useShapes } from "../../hooks/useShapes"
import Shape from "../atoms/Shape"

interface CanvasBoardProps {
  tool: Tool
  setTool: React.Dispatch<React.SetStateAction<Tool>>
}

const CanvasBoard = ({ tool, setTool }: CanvasBoardProps) => {
  const [coordinates, setCoordinates] = useState<Dimensions>({ x: 0, y: 0 })
  const [scale, setScale] = useState<Scale>({ x: 1, y: 1 })
  const [lines, setLines] = useState<LineType[]>([])
  const [isDrawing, setIsDrawing] = useState(false)
  const { shapes, addShape } = useShapes()

  const handleMouseDown = (e: KonvaEventObject<MouseEvent>) => {
    switch (tool.type) {
      case "line":
        return handleMouseDrawingDown(
          e,
          setIsDrawing,
          setLines,
          lines,
          tool,
          scale
        )
    }
  }

  const handleMouseMove = (e: KonvaEventObject<MouseEvent>) => {
    switch (tool.type) {
      case "line":
        return handleMouseDrawingMove(e, isDrawing, lines, setLines, scale)
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
        setTool((prevTool) => ({
          type: prevTool.type === "line" ? "" : "line",
        }))
        break
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
