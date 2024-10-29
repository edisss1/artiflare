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
