import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { Team } from "../../types/Team"
import { db } from "../../firestore/firebaseConfig"
import {
    addDoc,
    arrayUnion,
    collection,
    doc,
    getDoc,
    getDocs,
    query,
    updateDoc,
    where
} from "firebase/firestore"
import { User } from "../../types/User"

interface TeamState {
    teams: Team[]
    newTeam: Team | null
    status: "idle" | "loading" | "succeeded" | "failed"
    error: string | undefined
}

const initialState: TeamState = {
    teams: [],
    newTeam: null,
    status: "idle",
    error: undefined
}
export const createTeam = createAsyncThunk(
    "teamManagement/createTeam",
    async ({
        teamTitle,
        user,
        teamType
    }: {
        teamTitle: string
        user: User
        teamType: "private" | "invite-only" | "public"
    }) => {
        try {
            const teamsRef = collection(db, "teams")
            const teamData: Team = {
                name: teamTitle,
                members: [],
                creatorID: user.uid,
                creatorName: user.displayName || user.email,
                teamType: teamType
            }

            const docRef = await addDoc(teamsRef, teamData)

            await updateDoc(doc(db, "users", user.uid), {
                teams: arrayUnion(docRef.id),
                role: "owner"
            })

            return { id: docRef.id, ...teamData }
        } catch (err) {
            console.error(err)
            throw new Error(err as string)
        }
    }
)

export const getTeams = createAsyncThunk(
    "teamManagement/getTeams",
    async (user: User) => {
        try {
            const q = query(
                collection(db, "teams"),
                where("members", "array-contains", user.uid)
            )

            const querySnap = await getDocs(q)

            const teams: Team[] = []

            querySnap.forEach((snap) => {
                const teamData = snap.data() as Team
                teams.push(teamData)
            })

            return teams
        } catch (err) {
            throw new Error(err as string)
        }
    }
)

export const joinTeam = createAsyncThunk(
    "teamManagement/joinTeam",
    async ({
        user,
        teamID
    }: {
        user: User
        teamID?: string
        teamTitle?: string
    }) => {
        try {
            await updateDoc(doc(db, "users", user.uid), {
                teams: arrayUnion(teamID),
                role: "member"
            })
        } catch (err) {
            console.error(err)
        }
    }
)

export const inviteUserToTeam = async (
    userId: string,
    teamId: string,
    inviteeId: string
) => {
    const teamDocRef = doc(db, "teams", teamId)
    const teamDoc = await getDoc(teamDocRef)

    if (teamDoc.exists()) {
        const teamData = teamDoc.data() as Team

        const userDocRef = doc(db, "users", userId)
        const userDoc = await getDoc(userDocRef)

        if (userDoc.exists()) {
            const userData = userDoc.data() as User

            if (userData.roleInTeam === "owner") {
                console.error("User is already an owner of the team")
                return
            }

            if (userData.teams.includes(teamId)) {
                console.error("User is already a member of the team")
                return
            }

            userData.teams = userData.teams || []
            userData.teams.push(teamId)

            await updateDoc(userDocRef, { teams: userData.teams })
        } else {
            console.error(`User with ID ${userId} does not exist`)
            return
        }

        const inviteeDocRef = doc(db, "users", inviteeId)
        const inviteeDoc = await getDoc(inviteeDocRef)

        if (inviteeDoc.exists()) {
            const inviteeData = inviteeDoc.data() as User

            if (inviteeData.teams.includes(teamId)) {
                console.error("Invitee is already a member of the team")
                return
            }

            inviteeData.teams = inviteeData.teams || []
            inviteeData.teams.push(teamId)

            await updateDoc(inviteeDocRef, { teams: inviteeData.teams })
        } else {
            console.error(`Invitee with ID ${inviteeId} does not exist`)
            return
        }

        teamData.members = teamData.members || []
        teamData.members.push(userId)

        await updateDoc(teamDocRef, { members: teamData.members })
    } else {
        console.error(`Team with ID ${teamId} does not exist`)
        return
    }
}

export const searchUsers = async (queryString: string) => {
    const usersCollectionRef = collection(db, "users")
    const q = query(
        usersCollectionRef,
        where("name", ">=", queryString),
        where("name", "<=", queryString + "\uf8ff"),
        where("email", ">=", queryString)
    )

    const querySnap = await getDocs(q)

    const users: User[] = []

    querySnap.forEach((doc) => {
        const userData = doc.data() as User
        users.push(userData)
    })

    return users
}
const teamManagementSlice = createSlice({
    name: "teamManagement",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(
                createTeam.fulfilled,
                (state, action: PayloadAction<Team>) => {
                    state.newTeam = action.payload
                    state.status = "succeeded"
                }
            )
            .addCase(createTeam.rejected, (state) => {
                state.error = "Failed to create team"
                state.status = "failed"
            })
            .addCase(createTeam.pending, (state) => {
                ;(state.status = "loading"), (state.error = undefined)
            })
            .addCase(getTeams.fulfilled, (state, action) => {
                state.teams = action.payload
                state.status = "succeeded"
            })
            .addCase(getTeams.rejected, (state) => {
                state.error = "Failed to get teams"
                state.status = "failed"
            })
            .addCase(getTeams.pending, (state) => {
                state.status = "loading"
                state.error = undefined
            })
            .addCase(joinTeam.fulfilled, (state) => {
                state.status = "succeeded"
            })
            .addCase(joinTeam.rejected, (state) => {
                state.error = "Failed to join team"
                state.status = "failed"
            })
            .addCase(joinTeam.pending, (state) => {
                state.status = "loading"
                state.error = undefined
            })
    }
})

export default teamManagementSlice.reducer
