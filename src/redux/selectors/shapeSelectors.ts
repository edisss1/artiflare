import { TShape } from "../../types/ShapeTypes"
import { RootState } from "../store"

export const selectShapes = (state: RootState): TShape[] => state.shapes.shapes
export const setSelectedShap = (state: RootState): TShape | undefined =>
  state.shapes.shapes.find(
    (shape: any) => shape.id === state.shapes.selectedShapeId
  )
