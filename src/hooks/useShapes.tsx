import { useCallback, useState } from "react"
import { v4 as uuidv4 } from "uuid"
import { TShape } from "../types/ShapeTypes"

export function useShapes() {
  const [shapes, setShapes] = useState<TShape[]>([])

  const addShape = useCallback(
    (
      shape: string,
      x: number | undefined,
      y: number | undefined,
      width = 100,
      height = 100,
      fill = "#D3D9D9",
      radius = 20,
      stroke = "#D3D9D9",
      rotation = 0
    ) => {
      const newShape: TShape = {
        id: uuidv4(),
        shape,
        x,
        y,
        width,
        height,
        fill,
        radius,
        stroke,
        strokeWidth: 1,
        rotation,
        scale: {
          x: 1,
          y: 1,
        },
        lines: [],
      }
      setShapes((prevShapes) => [...prevShapes, newShape])
    },
    []
  )
  return { shapes, addShape }
}
