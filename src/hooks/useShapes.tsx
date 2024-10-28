import { useCallback, useState } from "react"
import { v4 as uuidv4 } from "uuid"

interface Shape {
  id: string
  type: string
  x: number
  y: number
  width: number
  height: number
  radius: number
  color: string
  border: string
}

export function useShapes() {
  const [shapes, setShapes] = useState<Shape[]>([])

  const addShape = useCallback((type: string, x: number, y: number) => {
    const newShape = {
      id: uuidv4(),
      type,
      x,
      y,
      width: 100,
      height: 100,
      radius: 50,
      color: "#D3D9D9",
      border: "#333333",
    }
    setShapes((prevShapes) => [...prevShapes, newShape])

    return { shapes, addShape }
  }, [])
}
