import { KonvaEventObject } from "konva/lib/Node"
import { LineType, Tool } from "../../types/ShapeTypes"
import { Vector2d } from "konva/lib/types"

export const handleMouseDrawingDown = (
  e: KonvaEventObject<MouseEvent>,
  setIsDrawing: React.Dispatch<React.SetStateAction<boolean>>,
  setLines: React.Dispatch<React.SetStateAction<LineType[]>>,
  lines: LineType[],
  tool: Tool,
  scale: Vector2d
) => {
  setIsDrawing(true)
  const stage = e.target.getStage()

  const pos = stage?.getPointerPosition()
  const stagePosition = stage?.position()
  const stageScale = stage?.scale()

  // console.log("(handleMouseDown) Position: ", pos)
  // console.log(`(handleMouseDown) Client X-Y: ${e.evt.clientX}-${e.evt.clientY}`)

  if (!pos || !stagePosition || !stageScale) return

  setLines([
    ...lines,
    {
      tool,
      points: [
        (pos.x - stagePosition.x) / stageScale.x,
        (pos.y - stagePosition.y) / stageScale.y,
      ],
    },
  ])
}

export const handleMouseDrawingMove = (
  e: KonvaEventObject<MouseEvent>,
  isDrawing: boolean,
  lines: LineType[],
  setLines: React.Dispatch<React.SetStateAction<LineType[]>>,
  scale: Vector2d
) => {
  if (!isDrawing) {
    return
  }

  const stage = e.target.getStage()
  const point = stage?.getPointerPosition()
  const stagePosition = stage?.position()
  const stageScale = stage?.scale()

  if (!point || !stagePosition || !stageScale) return

  console.log("(handleMouseMove) Point: ", point)
  console.log(`(handleMouseMove) Client X-Y: ${e.evt.clientX}-${e.evt.clientY}`)

  console.log(point)
  if (lines.length === 0) return

  const lastLine: LineType = { ...lines[lines.length - 1] }

  lastLine.points = lastLine.points.concat([
    (point.x - stagePosition.x) / stageScale.x,
    (point.y - stagePosition.y) / stageScale.y,
  ])

  setLines((prevLines) => {
    const updatedLines = [...prevLines]
    updatedLines[updatedLines.length - 1] = lastLine
    return updatedLines
  })
}

export const handleMouseDrawingUp = (
  setIsDrawing: React.Dispatch<React.SetStateAction<boolean>>
) => {
  setIsDrawing(false)
}
