import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { Team, TeamMember } from "../../types/Team"
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
    currentTeam: string | undefined
    newTeam: Team
    status: "idle" | "loading" | "succeeded" | "failed"
    error: string | undefined
}

const initialState: TeamState = {
    teams: [],
    newTeam: {
        name: "",
        members: [],
        creatorID: "",
        creatorName: "",
        teamType: ""
    },
    currentTeam: "",
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
                members: [
                    {
                        uid: user.uid,
                        role: "owner",
                        displayName: user.displayName || user.email
                    }
                ],
                creatorID: user.uid,
                creatorName: user.displayName || user.email,
                teamType: teamType
            }

            const docRef = await addDoc(teamsRef, teamData)

            await updateDoc(doc(db, "users", user.uid), {
                teams: arrayUnion({
                    teamID: docRef.id,
                    role: "owner"
                })
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

            console.log("q: ", q)

            const querySnap = await getDocs(q)

            const teams: Team[] = querySnap.docs.map((doc) => ({
                id: doc.id,
                name: doc.data().name,
                members: doc.data().members,
                creatorID: doc.data().creatorID,
                creatorName: doc.data().creatorName,
                teamType: doc.data().teamType
            }))

            if (!teams.length) {
                const teamsRef = collection(db, "teams")
                const teamsQuery = query(teamsRef)
                const teamsQuerySnap = await getDocs(teamsQuery)
                const allTeams: Team[] = teamsQuerySnap.docs.map((doc) => ({
                    id: doc.id,
                    name: doc.data().name,
                    members: doc.data().members,
                    creatorID: doc.data().creatorID,
                    creatorName: doc.data().creatorName,
                    teamType: doc.data().teamType
                }))
                return allTeams.filter((team) =>
                    team.members.some((member) => member.uid === user.uid)
                )
            }

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
    user: TeamMember,
    teamId: string,
    inviteeId: string
) => {
    const teamDocRef = doc(db, "teams", teamId)
    const teamDoc = await getDoc(teamDocRef)

    if (teamDoc.exists()) {
        const teamData = teamDoc.data() as Team

        const userDocRef = doc(db, "users", user.uid)
        const userDoc = await getDoc(userDocRef)
        const teamDocRef = doc(db, "teams", teamId)

        if (userDoc.exists()) {
            const userData = userDoc.data() as User

            if (userData.teams.some((team) => team.role === "owner")) {
                console.error("User is already an owner of the team")
                return
            }

            if (userData.teams.some((team) => team.teamID === teamId)) {
                console.error("User is already a member of the team")
                return
            }

            userData.teams = userData.teams || []
            userData.teams.push({ teamID: teamId, role: "member" })

            await updateDoc(userDocRef, { teams: userData.teams })
            await updateDoc(teamDocRef, { members: teamData.members })
        } else {
            console.error(`User with ID ${user.uid} does not exist`)
            return
        }

        const inviteeDocRef = doc(db, "users", inviteeId)
        const inviteeDoc = await getDoc(inviteeDocRef)

        if (inviteeDoc.exists()) {
            const inviteeData = inviteeDoc.data() as User

            if (inviteeData.teams.some((team) => team.teamID === teamId)) {
                console.error("Invitee is already a member of the team")
                return
            }

            inviteeData.teams = inviteeData.teams || []
            inviteeData.teams.push({ teamID: teamId, role: "member" })

            await updateDoc(inviteeDocRef, { teams: inviteeData.teams })
        } else {
            console.error(`Invitee with ID ${inviteeId} does not exist`)
            return
        }

        teamData.members = teamData.members || []
        teamData.members.push()

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
    reducers: {
        setCurrentTeam: (state, action: PayloadAction<Team["id"]>) => {
            if (state.currentTeam) {
                state.currentTeam = action.payload
            }
        }
    },
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

export const { setCurrentTeam } = teamManagementSlice.actions

export default teamManagementSlice.reducer
