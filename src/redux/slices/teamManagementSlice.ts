import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { Team } from "../../types/Team"
import { db } from "../../firestore/firebaseConfig"
import { addDoc, collection, doc, updateDoc } from "firebase/firestore"
import { User } from "../../types/User"

interface TeamState {
    teams: Team[]
    status: "idle" | "loading" | "succeeded" | "failed"
    error: string | undefined
}

const initialState: TeamState = {
    teams: [],
    status: "idle",
    error: undefined
}

export const createTeam = createAsyncThunk(
    "teamManagement/createTeam",
    async (currentUser: User) => {
        try {
            const teamsRef = collection(db, "teams")
            const currentUserRef = doc(db, "users", currentUser.uid)

            const teamData: Team = {
                id: crypto.randomUUID(),
                name: "",
                members: [],
                creatorID: currentUser.uid,
                creatorName: currentUser.displayName
            }

            await updateDoc(currentUserRef, {
                teams: [...currentUser.teams, teamData.id]
            })
            await addDoc(teamsRef, teamData)

            return { ...teamData }
        } catch (err) {
            console.error(err)
            throw new Error(err as string)
        }
    }
)

const teamManagementSlice = createSlice({
    name: "teamManagement",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase
    }
})

export default teamManagementSlice.reducer
