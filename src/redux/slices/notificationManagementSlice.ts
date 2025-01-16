import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { NotificationType } from "../../types/NotificationType.ts"

import { Team } from "../../types/Team.ts"
import {
    addDoc,
    collection,
    deleteDoc,
    doc,
    getDoc,
    onSnapshot,
    query,
    where
} from "firebase/firestore"
import { db } from "../../firestore/firebaseConfig.ts"
import { User } from "../../types/User.ts"
import { AppDispatch } from "../store.ts"

interface NotificationState {
    notifications: NotificationType[]
    status: "idle" | "loading" | "succeeded" | "failed"
    error: string | undefined
}

const initialState: NotificationState = {
    notifications: [],
    status: "idle",
    error: undefined
}

export const sendInvite = createAsyncThunk(
    "notificationManagement/sendInvite",
    async ({
        user,
        invitees
    }: {
        user: User | null

        invitees: string[]
    }) => {
        if (!user || invitees.length === 0) {
            console.log("No user or invitees")
            return
        }

        try {
            const teamDoc = doc(db, "teams", user.currentSelectedTeam)
            console.log(`teamDoc - ${teamDoc}`)

            const teamData = await getDoc(teamDoc)
            console.log(`teamData - ${teamData}`)

            if (!teamData) return

            const newInvitation: Partial<NotificationType> = {
                type: "invitation",
                senderID: user.uid,
                senderName: user.displayName || user.email,
                timestamp: new Date().toISOString(),
                receiversID: invitees.map((invitee) => invitee),
                isRead: false,
                team: teamData.data() as Team,
                notificationText: `${
                    user.displayName || user.email
                } invited you to join ${teamData.data()?.name}`,
                teamID: teamData.id
            }

            console.log(`Adding new invite - ${newInvitation} - to database`)

            const notificationsRef = collection(db, "notifications")

            await addDoc(notificationsRef, newInvitation)

            console.log(`Sent invites to ${invitees}`)
        } catch (err) {
            console.error(err)
            throw new Error((err as Error).message)
        }
    }
)

export const getNotificationsForUser =
    (userUID: string) => (dispatch: AppDispatch) => {
        try {
            const notificationsRef = collection(db, "notifications")

            const q = query(
                notificationsRef,
                where("receiversID", "array-contains", userUID)
            )

            return onSnapshot(q, (snapshot) => {
                const notifications: NotificationType[] = snapshot.docs.map(
                    (doc) =>
                        ({
                            id: doc.id,
                            ...doc.data()
                        } as NotificationType)
                )
                dispatch(setNotifications(notifications))
            })
        } catch (err) {
            console.error(err)
            throw err
        }
    }

export const deleteNotification = createAsyncThunk(
    "notificationManagement/deleteNotification",
    async ({ notificationID }: { notificationID: string }) => {
        if (!notificationID) return

        try {
            await deleteDoc(doc(db, "notifications", notificationID))
        } catch (err) {
            console.error(err)
        }
    }
)

const notificationManagementSlice = createSlice({
    name: "notificationManagement",
    initialState,
    reducers: {
        setNotifications: (
            state,
            action: PayloadAction<NotificationType[]>
        ) => {
            state.notifications = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(sendInvite.fulfilled, (state) => {
                state.status = "succeeded"
                state.error = undefined
            })
            .addCase(sendInvite.pending, (state) => {
                state.status = "loading"
                state.error = undefined
            })
            .addCase(sendInvite.rejected, (state, action) => {
                state.status = "failed"
                state.error = action.error.message
            })
            .addCase(deleteNotification.fulfilled, (state) => {
                state.status = "succeeded"
                state.error = undefined
            })
            .addCase(deleteNotification.pending, (state) => {
                state.status = "loading"
                state.error = undefined
            })
            .addCase(deleteNotification.rejected, (state, action) => {
                state.status = "failed"
                state.error = action.error.message
            })
    }
})

export default notificationManagementSlice.reducer

export const { setNotifications } = notificationManagementSlice.actions
