import { Circle, Line, Rect } from "react-konva"
import { TShape } from "../../types/ShapeTypes"
import { KonvaEventObject } from "konva/lib/Node"

interface ShapeComponent extends TShape {
  onDragEnd: (e: KonvaEventObject<MouseEvent>) => void
}

const Shape = ({
  shape,
  x,
  y,
  width,
  height,
  fill,
  stroke,
  strokeWidth,
  rotation,
  scale,
  radius,
  lines,
  onDragEnd,
}: ShapeComponent) => {
  switch (shape) {
    case "rectangle":
      return (
        <Rect
          onDragEnd={onDragEnd}
          rotation={rotation}
          x={x}
          y={y}
          width={width}
          height={height}
          fill={fill}
          scale={scale}
        />
      )
    case "circle":
      return (
        <Circle
          onDragEnd={onDragEnd}
          rotation={rotation}
          x={x}
          y={y}
          width={width}
          height={height}
          fill={fill}
          scale={scale}
          radius={radius}
        />
      )
    case "line": {
      lines.map((line) => {
        return (
          <Line
            onDragEnd={onDragEnd}
            points={line.points}
            stroke={stroke}
            rotation={rotation}
            strokeWidth={strokeWidth}
          />
        )
      })
    }
  }

  return null
}
export default Shape
