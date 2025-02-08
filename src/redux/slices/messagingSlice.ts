import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { Message } from "../../types/MessageType"
import {
    addDoc,
    collection,
    onSnapshot,
    query,
    where
} from "firebase/firestore"
import { db } from "../../firestore/firebaseConfig"
import { User } from "../../types/User"
import { AppDispatch } from "../store"

interface MessagingState {
    messages: Message[] | undefined
    status: "idle" | "loading" | "succeeded" | "failed"
    error: string | undefined
}

const initialState: MessagingState = {
    messages: undefined,
    status: "idle",
    error: undefined
}

export const sendMessage = createAsyncThunk(
    "messaging/sendMessage",
    async ({
        roomID,
        message,
        user
    }: {
        roomID: string | undefined
        message: string
        user: User | null
    }) => {
        if (!roomID || !message || !user) return

        try {
            const messagesRef = collection(db, "messages")

            const newMessage: Message = {
                senderID: user.uid,
                senderName: user.displayName || user.email,
                messageText: message,
                timestamp: new Date().toISOString(),
                roomID
            }

            await addDoc(messagesRef, newMessage)
        } catch (err) {
            console.error(err)
            throw err
        }
    }
)

export const getMessages = async (
    roomID: string | undefined,
    dispatch: AppDispatch
) => {
    if (!roomID) return

    try {
        const messagesRef = collection(db, "messages")
        const queryMessages = query(messagesRef, where("roomID", "==", roomID))

        onSnapshot(queryMessages, (messagesSnap) => {
            let messages: Message[] = []
            messagesSnap.forEach((doc) => {
                const message: Message = {
                    id: doc.id,
                    ...doc.data()
                } as Message
                messages.push(message)
            })
            dispatch(setMessages(messages))
        })
    } catch (err) {
        console.error(err)
        throw err
    }
}

const messagingSlice = createSlice({
    name: "messaging",
    initialState,
    reducers: {
        setMessages: (state, action: PayloadAction<Message[]>) => {
            state.messages = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(sendMessage.pending, (state) => {
                state.error = undefined
                state.status = "loading"
            })
            .addCase(sendMessage.fulfilled, (state) => {
                state.error = undefined
                state.status = "succeeded"
            })
            .addCase(sendMessage.rejected, (state, action) => {
                state.error = action.error.message
                state.status = "failed"
            })
    }
})

export const { setMessages } = messagingSlice.actions
export default messagingSlice.reducer
