import { Circle, Line, Rect } from "react-konva"
import { LineType } from "../../types/ShapeTypes"

interface Shape {
  id: string
  shape: string
  x: number
  y: number
  width: number
  height: number
  fill: string
  radius: number
  stroke: string
  strokeWidth: number
  rotation: number
  scale: {
    x: number
    y: number
  }
  lines: LineType[]
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
}: Shape) => {
  switch (shape) {
    case "rectangle":
      return (
        <Rect
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
