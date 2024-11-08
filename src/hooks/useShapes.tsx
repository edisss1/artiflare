import { Canvas, Circle, Polyline, Rect } from "fabric"

export function useShapes(canvas: Canvas | null) {
  const addRectangle = () => {
    if (!canvas) return

    const rect = new Rect({
      width: 100,
      height: 100,
      left: 100,
      top: 100,
      fill: null,
      stroke: "#333333",
      strokeWidth: 1,
    })

    canvas.add(rect)
  }

  const addCircle = () => {
    if (!canvas) return

    const circle = new Circle({
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

    canvas.add(circle)
  }

  const addPolygon = () => {
    if (!canvas) return
    const polygon = new Polyline(
      [
        { x: 10, y: 10 },
        { x: 50, y: 30 },
        { x: 40, y: 70 },
        { x: 60, y: 50 },
        { x: 100, y: 150 },
        { x: -40, y: -100 },
      ],
      {
        stroke: "red",
        left: 100,
        top: 100,
      }
    )

    canvas.add(polygon)
  }

  return { addRectangle, addCircle, addPolygon }
}
