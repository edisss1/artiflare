import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { TShape } from "../../types/ShapeTypes"

interface ShapeState {
  shapes: TShape[]
  selectedShapeId: string | null
}

const initialState: ShapeState = {
  shapes: [],
  selectedShapeId: null,
}

const shapeSlice = createSlice({
  name: "shapes",
  initialState,
  reducers: {
    addShape: (state, action: PayloadAction<TShape>) => {
      state.shapes.push(action.payload)
    },
    selectShape: (state, action: PayloadAction<string | null>) => {
      state.selectedShapeId = action.payload
    },
    updateShape: (state, action: PayloadAction<TShape>) => {
      const index = state.shapes.findIndex(
        (shape) => shape.id === action.payload.id
      )
      if (index !== -1) {
        state.shapes[index] = action.payload
      }
    },
    removeShape: (state, action: PayloadAction<string>) => {
      state.shapes = state.shapes.filter((shape) => shape.id !== action.payload)
    },
  },
})

export const { addShape, selectShape, updateShape, removeShape } =
  shapeSlice.actions

export default shapeSlice.reducer
