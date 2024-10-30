import { configureStore } from "@reduxjs/toolkit"
import shapeReducer from "./slices/shapeSlice"

export const store = configureStore({
  reducer: {
    shapes: shapeReducer,
  },
})

export type AppStore = typeof store

export type RootState = ReturnType<AppStore["getState"]>

export type AppDispatch = AppStore["dispatch"]
