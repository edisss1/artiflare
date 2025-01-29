import { createSlice } from "@reduxjs/toolkit"

interface MiscStates {
    isMobileSidebarOpened: boolean
}

const initialState: MiscStates = {
    isMobileSidebarOpened: false
}

const miscStatesSlice = createSlice({
    name: "miscStates",
    initialState,
    reducers: {
        setIsMobileSidebarOpened: (state, action) => {
            state.isMobileSidebarOpened = action.payload
        }
    }
})

export const { setIsMobileSidebarOpened } = miscStatesSlice.actions

export default miscStatesSlice.reducer
