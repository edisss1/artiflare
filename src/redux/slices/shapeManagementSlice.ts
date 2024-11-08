import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface ShapeManagementState {
  width: number | string
  height: number | string
  diameter: number | string
  fill: string
  stroke: string
  strokeWidth: number
  text: string
  selectedShape: string | null
}

const initialState: ShapeManagementState = {
  width: "",
  height: "",
  diameter: "",
  fill: "",
  stroke: "#333333",
  strokeWidth: 2,
  text: "",
  selectedShape: null,
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
      state.fill = action.payload
    },
    setStroke(state, action: PayloadAction<string>) {
      state.stroke = action.payload
    },
    setText(state, action: PayloadAction<string>) {
      state.text = action.payload
    },
    setSelectedShape(state, action: PayloadAction<string | null>) {
      state.selectedShape = action.payload
    },
    setStrokeWidth(state, action: PayloadAction<number>) {
      state.strokeWidth = action.payload
    },
  },
})

export const {
  setWidth,
  setHeight,
  setDiameter,
  setColor,
  setStroke,
  setText,
  setSelectedShape,
} = shapeManagementSlice.actions

export default shapeManagementSlice.reducer
