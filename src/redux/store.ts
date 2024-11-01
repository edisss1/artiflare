import { configureStore } from "@reduxjs/toolkit"
import shapeManagementReducer from "./slices/shapeManagementSlice"

export const store = configureStore({
  reducer: {
    shape: shapeManagementReducer,
  },
})

export type AppStore = typeof store

export type RootState = ReturnType<AppStore["getState"]>

export type AppDispatch = AppStore["dispatch"]
