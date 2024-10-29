import { useCallback, useState } from "react"
import { v4 as uuidv4 } from "uuid"
import { Shape } from "../types/ShapeTypes"

export function useShapes() {
  const [shapes, setShapes] = useState<Shape[]>([])

  const addShape = useCallback((shape: string, x: number, y: number) => {
    const newShape: Shape = {
      id: uuidv4(),
      shape,
      x,
      y,
      width: 100,
      height: 100,
      fill: "#333333",
      radius: 50,
      stroke: "#333333",
      strokeWidth: 1,
      rotation: 0,
      scale: {
        x: 1,
        y: 1,
      },
      lines: [],
    }
    setShapes((prevShapes) => [...prevShapes, newShape])
  }, [])
  return { shapes, addShape }
}
