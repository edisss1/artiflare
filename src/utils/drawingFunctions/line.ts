import { KonvaEventObject } from "konva/lib/Node"
import { LineType, Tool } from "../../types/ShapeTypes"

export const handleMouseDrawingDown = (
  e: KonvaEventObject<MouseEvent>,
  isDrawing: React.MutableRefObject<boolean>,
  setLines: React.Dispatch<React.SetStateAction<LineType[]>>,
  lines: LineType[],
  tool: Tool
) => {
  isDrawing.current = true
  const pos = e.target.getStage()?.getPointerPosition()

  if (!pos) return
  setLines([...lines, { tool, points: [pos.x, pos.y] }])
}

export const handleMouseDrawingMove = (
  e: KonvaEventObject<MouseEvent>,
  isDrawing: React.MutableRefObject<boolean>,
  lines: LineType[],
  setLines: React.Dispatch<React.SetStateAction<LineType[]>>
) => {
  if (!isDrawing.current) {
    return
  }

  const stage = e.target.getStage()
  const point = stage?.getPointerPosition()
  if (!point) return

  console.log(point)
  if (lines.length === 0) return

  const lastLine: LineType = { ...lines[lines.length - 1] }

  lastLine.points = lastLine.points.concat([point.x, point.y])

  setLines((prevLines) => {
    const updatedLines = [...prevLines]
    updatedLines[updatedLines.length - 1] = lastLine
    return updatedLines
  })
}

export const handleMouseDrawingUp = (
  isDrawing: React.MutableRefObject<boolean>
) => {
  isDrawing.current = false
}
