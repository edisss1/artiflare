export type Dimensions = {
  x: number
  y: number
}

export type Scale = {
  x: number
  y: number
}

export type Tool = {
  type:
    | "rectangle"
    | "circle"
    | "star"
    | "line"
    | "ellipse"
    | "pen"
    | ""
    | "eraser"
}

export type LineType = {
  tool: Tool
  points: number[]
}

export interface Shape {
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
