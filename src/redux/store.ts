import { configureStore } from "@reduxjs/toolkit"
import authReducer from "./slices/authSlice"
import boardReducer from "./slices/boardSlice"
import userManagementReducer from "./slices/userManagementSlice.ts"
import teamManagementReducer from "./slices/teamManagementSlice"
import miscStatesReducer from "./slices/miscStatesSlice"
import notificationManagementReducer from "./slices/notificationManagementSlice"
import languageReducer from "./slices/languageSlice"
import messagingReducer from "./slices/messagingSlice"

export const store = configureStore({
    reducer: {
        auth: authReducer,
        boards: boardReducer,
        userManagement: userManagementReducer,
        teamManagement: teamManagementReducer,
        miscStates: miscStatesReducer,
        notificationManagement: notificationManagementReducer,
        language: languageReducer,
        messages: messagingReducer
    }
})

export type AppStore = typeof store

export type RootState = ReturnType<AppStore["getState"]>

export type AppDispatch = AppStore["dispatch"]
