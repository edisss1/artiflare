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
    | null
    | "eraser"
}

export type LineType = {
  tool: Tool
  points: number[]
}

export interface TShape {
  id: string
  shape: string | null
  x: number | undefined
  y: number | undefined
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
  lines?: LineType[]
}
