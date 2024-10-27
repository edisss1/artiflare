import { Layer, Rect, Stage } from "react-konva"
import { useEffect, useState } from "react"
import { KonvaEventObject } from "konva/lib/Node"

type Dimensions = {
  x: number
  y: number
}

const CanvasBoard = () => {
  const [coordinates, setCoordinates] = useState<Dimensions>({ x: 0, y: 0 })

  const handleShapeCoordinatesChange = (e: KonvaEventObject<MouseEvent>) => {
    setCoordinates({
      x: e.target.x(),
      y: e.target.y(),
    })
  }

  const handleKeyPress = (e: KeyboardEvent) => {
    console.log(e.key)
  }

  useEffect(() => {
    document.addEventListener("keydown", handleKeyPress)

    return () => {
      document.removeEventListener("keydown", handleKeyPress)
    }
  }, [handleKeyPress])

  return (
    <Stage
      className="bg-white"
      width={window.innerWidth}
      height={window.innerHeight}
      draggable>
      <Layer>
        <Rect
          {...coordinates}
          width={100}
          height={100}
          fill={"#333333"}
          draggable
          onDragEnd={handleShapeCoordinatesChange}
        />
      </Layer>
    </Stage>
  )
}

export default CanvasBoard
