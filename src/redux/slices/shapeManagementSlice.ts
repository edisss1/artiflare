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
    isDrawingMode: boolean
    brushColor: string
    brushWidth: number
    angle: number
    freeDrawingMode: boolean
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
    isDrawingMode: false,
    brushColor: "#000000",
    brushWidth: 5,
    angle: 0,
    freeDrawingMode: false
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
        setDrawingMode(state, action: PayloadAction<boolean>) {
            state.isDrawingMode = action.payload
        },
        setBrushColor(state, action: PayloadAction<string>) {
            state.brushColor = action.payload
        },
        setBrushWidth(state, action: PayloadAction<number>) {
            state.brushWidth = action.payload
        },
        setAngle(state, action: PayloadAction<number>) {
            state.angle = action.payload
        },
        setFreeDrawingMode(state, action: PayloadAction<boolean>) {
            state.freeDrawingMode = action.payload
        }
    }
})

export const {
    setWidth,
    setHeight,
    setDiameter,
    setColor,
    setStroke,
    setText,
    setSelectedShape,
    setBrushColor,
    setDrawingMode,
    setBrushWidth,
    setAngle,
    setFreeDrawingMode
} = shapeManagementSlice.actions

export default shapeManagementSlice.reducer
