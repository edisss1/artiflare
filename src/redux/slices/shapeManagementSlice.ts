import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface ShapeManagementState {
  width: number | string
  height: number | string
  diameter: number | string
  color: string
  stroke: string
}

const initialState: ShapeManagementState = {
  width: "",
  height: "",
  diameter: "",
  color: "",
  stroke: "",
}

const shapeManagementSlice = createSlice({
  name: "shape-management",
  initialState,
  reducers: {
    setWidth(state, action: PayloadAction<string | number>) {
      state.width = action.payload
    },
    setHeight(state, action: PayloadAction<string | number>) {
      state.height = action.payload
    },
    setDiameter(state, action: PayloadAction<string | number>) {
      state.diameter = action.payload
    },
    setColor(state, action: PayloadAction<string>) {
      state.color = action.payload
    },
    setStroke(state, action: PayloadAction<string>) {
      state.stroke = action.payload
    },
  },
})

export const { setWidth, setHeight, setDiameter, setColor, setStroke } =
  shapeManagementSlice.actions

export default shapeManagementSlice.reducer