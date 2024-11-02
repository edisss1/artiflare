import { Canvas, Circle, Rect } from "fabric"

export function useShapes(canvas: Canvas | null) {
  const addRectangle = () => {
    if (!canvas) return

    const rect = new Rect({
      width: 100,
      height: 100,
      top: 300,
      left: 400,
      fill: "#333333",
    })

    canvas.add(rect)
  }

  const addCircle = () => {
    if (!canvas) return

    const rect = new Circle({
      width: 100,
      height: 100,
      radius: 50,
      top: 300,
      left: 400,
      fill: "#333333",
      stroke: "#333333",
      strokeWidth: 1,
      opacity: 100,
    })

    canvas.add(rect)
  }

  return { addRectangle, addCircle }
}
