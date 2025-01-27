import { configureStore } from "@reduxjs/toolkit"
import shapeManagementReducer from "./slices/shapeManagementSlice"
import authReducer from "./slices/authSlice"
import boardReducer from "./slices/boardSlice"
import userManagementReducer from "./slices/userManagementSlice.ts"
import teamManagementReducer from "./slices/teamManagementSlice"
import miscStatesReducer from "./slices/miscStatesSlice"
import notificationManagementReducer from "./slices/notificationManagementSlice"
import languageReducer from "./slices/languageSlice"

export const store = configureStore({
    reducer: {
        shape: shapeManagementReducer,
        auth: authReducer,
        boards: boardReducer,
        userManagement: userManagementReducer,
        teamManagement: teamManagementReducer,
        miscStates: miscStatesReducer,
        notificationManagement: notificationManagementReducer,
        language: languageReducer
    }
})

export type AppStore = typeof store

export type RootState = ReturnType<AppStore["getState"]>

export type AppDispatch = AppStore["dispatch"]
