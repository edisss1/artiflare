import { Layer, Rect, Stage } from "react-konva"
import { useEffect, useState } from "react"
import { KonvaEventObject } from "konva/lib/Node"

type Dimensions = {
  x: number
  y: number
}

type Scale = {
  x: number
  y: number
}

const CanvasBoard = () => {
  const [coordinates, setCoordinates] = useState<Dimensions>({ x: 0, y: 0 })
  const [scale, setScale] = useState<Scale>({ x: 1, y: 1 })

  const handleScaleChange = (e: WheelEvent) => {
    e.preventDefault()
    const scrollStep = 0.05

    setScale((prevScale) => {
      const newScaleX =
        e.deltaY > 0
          ? Math.max(prevScale.x - scrollStep, 1) // Zoom out, limit min scale to 1
          : Math.min(prevScale.x + scrollStep, 4) // Zoom in, limit max scale to 4

      const newScaleY =
        e.deltaY > 0
          ? Math.max(prevScale.y - scrollStep, 1)
          : Math.min(prevScale.y + scrollStep, 4)

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
    console.log(e.key)
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
      draggable>
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
      </Layer>
    </Stage>
  )
}

export default CanvasBoard
