import { configureStore } from "@reduxjs/toolkit"
import shapeManagementReducer from "./slices/shapeManagementSlice"
import authReducer from "./slices/authSlice"
import boardReducer from "./slices/boardSlice"

export const store = configureStore({
  reducer: {
    shape: shapeManagementReducer,
    auth: authReducer,
    boards: boardReducer,
  },
})

export type AppStore = typeof store

export type RootState = ReturnType<AppStore["getState"]>

export type AppDispatch = AppStore["dispatch"]
