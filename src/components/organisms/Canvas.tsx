import { Layer, Line, Rect, Stage } from "react-konva"
import { useEffect, useRef, useState } from "react"
import { KonvaEventObject } from "konva/lib/Node"
import { Dimensions, Scale, Tool, LineType } from "../../types/ShapeTypes"
import {
  handleMouseDrawingDown,
  handleMouseDrawingMove,
  handleMouseDrawingUp,
} from "../../utils/drawingFunctions/line"

const CanvasBoard = () => {
  const [tool, setTool] = useState<Tool>({ type: "" })
  const [coordinates, setCoordinates] = useState<Dimensions>({ x: 0, y: 0 })
  const [scale, setScale] = useState<Scale>({ x: 1, y: 1 })
  const [lines, setLines] = useState<LineType[]>([
    {
      points: [0, 0],
      tool: { type: "" },
    },
  ])
  const isDrawing = useRef(false)

  const handleMouseDown = (e: KonvaEventObject<MouseEvent>) => {
    switch (tool.type) {
      case "line":
        return handleMouseDrawingDown(e, isDrawing, setLines, lines, tool)
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
        return handleMouseDrawingUp(isDrawing)
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
        console.log("Line tool selected, isDrawing: ", isDrawing.current)
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

  return (
    <Stage
      className="bg-white grid-pattern"
      width={window.innerWidth}
      height={window.innerHeight}
      scale={scale}
      onMouseDown={(e) => handleMouseDown(e)}
      onMouseMove={(e) => handleMouseMove(e)}
      onMouseUp={handleMouseUp}
      draggable={isDrawing.current}>
      <Layer>
        <Rect
          scale={scale}
          x={coordinates.x}
          y={coordinates.y}
          width={100}
          height={100}
          fill="#333333"
          draggable
          onDragEnd={handleShapeCoordinatesChange}
        />
        {lines.map((line, i) => (
          <Line
            key={i}
            points={line.points}
            scale={scale}
            stroke="#df4b26"
            tension={1}
            globalCompositeOperation={
              line.tool.type === "eraser"
                ? "destination-out"
                : line.tool.type === "line"
                ? "source-over"
                : undefined
            }
          />
        ))}
      </Layer>
    </Stage>
  )
}

export default CanvasBoard
