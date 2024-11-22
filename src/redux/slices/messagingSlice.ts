import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { Message } from "../../types/MessageType"

interface MessagingState {
    message: Message
    messages: Message[]
    status: "idle" | "loading" | "succeeded" | "failed"
    error: string | undefined
}

const initialState: MessagingState = {
    message: {
        id: "",
        senderID: "",
        senderName: "",
        receiverID: "",
        receiverName: "",
        messageText: "",
        timestamp: new Date()
    },
    messages: [],
    status: "idle",
    error: undefined
}

export const sendMessage = createAsyncThunk(
    "messaging/sendMessage",
    async () => {}
)

const messagingSlice = createSlice({
    name: "messaging",
    initialState,
    reducers: {}
})
