import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { Team, TeamMember } from "../../types/Team"
import { db, storage } from "../../firestore/firebaseConfig"
import {
    addDoc,
    arrayRemove,
    arrayUnion,
    collection,
    deleteDoc,
    doc,
    getDoc,
    getDocs,
    onSnapshot,
    query,
    updateDoc,
    where
} from "firebase/firestore"
import { User } from "../../types/User"
import { AppDispatch } from "../store"
import { getDownloadURL, ref, uploadBytes } from "firebase/storage"

interface TeamState {
    teams: Team[]
    currentTeam: Team | undefined
    newTeam: Team
    status: "idle" | "loading" | "succeeded" | "failed"
    error: string | undefined
    newTeamName: string
    inviteeQueryResults: User | null
    invitees: User[]
    teamQueryResults: Team[] | null
    teamResults: Team[]
}

const initialState: TeamState = {
    teams: [],
    newTeam: {
        name: "",
        members: [],
        creatorID: "",
        creatorName: "",
        teamType: "",
        logo: ""
    },
    currentTeam: undefined,
    status: "idle",
    error: undefined,
    newTeamName: "",
    inviteeQueryResults: null,
    invitees: [],
    teamQueryResults: null,
    teamResults: []
}
export const createTeam = createAsyncThunk(
    "teamManagement/createTeam",
    async ({
        teamTitle,
        user,
        teamType,
        dispatch
    }: {
        teamTitle: string
        user: User
        teamType: "private" | "invite-only" | "public"
        dispatch: AppDispatch
    }) => {
        try {
            const teamsRef = collection(db, "teams")
            const teamData: Team = {
                name: teamTitle,
                members: [
                    {
                        uid: user.uid,
                        role: "owner",
                        displayName: user.displayName || user.email,
                        img: user.img,
                        email: user.email,
                        lastAccessAt: user.lastAccessAt!
                    }
                ],
                creatorID: user.uid,
                creatorName: user.displayName || user.email,
                teamType: teamType,
                logo: ""
            }

            const docRef = await addDoc(teamsRef, teamData)

            await updateDoc(doc(db, "users", user.uid), {
                teams: arrayUnion({
                    teamID: docRef.id,
                    role: "owner"
                })
            })

            await updateDoc(doc(db, "teams", docRef.id), {
                id: docRef.id
            })

            const currentTeamID = docRef.id
            dispatch(
                updateCurrentSelectedTeam({
                    selectedTeamID: currentTeamID,
                    user
                })
            )

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
            const teamsRef = collection(db, "teams")
            const teamsQuery = query(teamsRef)
            const teamsQuerySnap = await getDocs(teamsQuery)
            const teams: Team[] = teamsQuerySnap.docs.map((doc) => ({
                id: doc.id,
                name: doc.data().name,
                creatorID: doc.data().creatorID,
                creatorName: doc.data().creatorName,
                members: doc.data().members,
                teamType: doc.data().teamType,
                logo: doc.data().logo
            }))

            const userTeams = teams.filter((team) =>
                team.members.some((member) => member.uid === user.uid)
            )

            return userTeams
        } catch (err) {
            throw new Error(err as string)
        }
    }
)

export const addNewUserToTeam = async (
    teamId: string | undefined,
    inviteeId: string | undefined
) => {
    if (!teamId || !inviteeId) return

    const teamDocRef = doc(db, "teams", teamId)
    const teamDoc = await getDoc(teamDocRef)

    if (teamDoc.exists()) {
        const teamData = teamDoc.data() as Team

        const members: TeamMember[] = teamData.members || []

        const inviteeDocRef = doc(db, "users", inviteeId)

        const inviteeDoc = await getDoc(inviteeDocRef)

        if (inviteeDoc.exists()) {
            const inviteeData = inviteeDoc.data() as User
            if (
                inviteeData.teams.some((team) => team.teamID === teamId) ||
                teamData.members.some((member) => member.uid === inviteeId)
            )
                return

            updateDoc(inviteeDocRef, {
                currentSelectedTeam: teamId
            })

            updateDoc(doc(db, "users", inviteeData.uid), {
                teams: inviteeData.teams
            })

            const newMember: TeamMember = {
                uid: inviteeData.uid,
                role: "member",
                displayName: inviteeData.displayName || inviteeData.email,
                img: inviteeData.img,
                email: inviteeData.email,
                lastAccessAt: inviteeData.lastAccessAt
            }

            members.push(newMember)

            updateDoc(teamDocRef, {
                members: members
            })

            updateDoc(inviteeDocRef, {
                teams: arrayUnion({
                    teamID: teamId,
                    role: "member"
                })
            })
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

export const updateTeamName = createAsyncThunk(
    "teamManagement/updateTeamName",
    async ({
        currentTeam,
        newTeamName
    }: {
        currentTeam: string | undefined
        newTeamName: string
    }) => {
        if (!currentTeam) return
        const teamDocRef = doc(db, "teams", currentTeam)

        try {
            await updateDoc(teamDocRef, {
                name: newTeamName
            })
        } catch (err) {
            console.error(err)
            throw new Error(err as string)
        }
    }
)

export const updateCurrentSelectedTeam = createAsyncThunk(
    "teamManagement/updateCurrentSelectedTeam",
    async ({
        selectedTeamID,
        user
    }: {
        selectedTeamID: string
        user: User | null
    }) => {
        try {
            const userDocRef = doc(db, "users", user!.uid)
            const userDoc = await getDoc(userDocRef)
            if (userDoc.exists()) {
                await updateDoc(userDocRef, {
                    currentSelectedTeam: selectedTeamID
                })
            }
        } catch (err) {
            console.error(err)
            throw err
        }
    }
)

export const getCurrentSelectedTeam =
    (user: User) => (dispatch: AppDispatch) => {
        try {
            const teamsRef = collection(db, "teams")
            const q = query(
                teamsRef,
                where("id", "==", user.currentSelectedTeam)
            )

            return onSnapshot(q, (teamDocSnap) => {
                const currentTeam = teamDocSnap.docs.map(
                    (doc) =>
                        ({
                            id: doc.id,
                            ...doc.data()
                        } as Team)
                )

                dispatch(setCurrentTeam(currentTeam[0]))
            })
        } catch (err) {
            console.error(err)
            throw err
        }
    }

export const searchForInvitees = createAsyncThunk(
    "teamManagement/searchForInvitees",
    async ({
        queryStr,
        userEmail,
        userID
    }: {
        queryStr: string
        userEmail: string | undefined | null
        userID: string | null
    }) => {
        if (!queryStr || !userEmail || !userID) return null

        try {
            const usersRef = collection(db, "users")
            let q

            if (queryStr.includes("@")) {
                q = query(
                    usersRef,
                    where("email", "==", queryStr),
                    where("email", "!=", userEmail)
                )
            } else {
                q = query(
                    usersRef,
                    where("uid", "==", queryStr),
                    where("uid", "!=", userID)
                )
            }

            const querySnap = await getDocs(q)

            if (!querySnap.empty) {
                const user = querySnap.docs[0].data() as User
                return user
            } else {
                return null
            }
        } catch (err) {
            console.error(err)
            throw err
        }
    }
)

export const uploadTeamLogo = createAsyncThunk(
    "teamManagement/uploadTeamLogo",
    async ({ teamID, file }: { teamID: string; file: File }) => {
        try {
            const storageRef = ref(storage, `teamLogos/${teamID}`)
            await uploadBytes(storageRef, file)
            const downloadURL = await getDownloadURL(storageRef)

            const teamDocRef = doc(db, "teams", teamID)

            await updateDoc(teamDocRef, { logo: downloadURL })

            return downloadURL
        } catch (err) {
            throw new Error(err as string)
        }
    }
)

export const deleteTeam = createAsyncThunk(
    "teamManagement/deleteTeam",
    async (teamID: string | undefined) => {
        if (!teamID) return

        const teamDocRef = doc(db, "teams", teamID)
        const usersRef = collection(db, "users")
        const boardsRef = collection(db, "boards")

        const teamsQuery = query(
            usersRef,
            where("teams", "array-contains", {
                teamID: teamID
            })
        )
        const boardsQuery = query(boardsRef, where("teamID", "==", teamID))

        const teamsQuerySnap = await getDocs(teamsQuery)
        const boardsQuerySnap = await getDocs(boardsQuery)

        teamsQuerySnap.forEach(async (docSnap) => {
            const userRef = doc(db, "users", docSnap.data().creatorID)
            await updateDoc(userRef, {
                teams: arrayRemove({
                    teamID: teamID
                })
            })
            const userData = docSnap.data() as User
            await updateDoc(userRef, {
                currentSelectedTeam: userData.teams[0].teamID
            })
        })

        boardsQuerySnap.forEach(async (docSnap) => {
            const boardRef = doc(db, "boards", docSnap.id)
            await deleteDoc(boardRef)
        })

        await deleteDoc(teamDocRef)
    }
)

export const searchTeams = createAsyncThunk(
    "teamManagement/searchTeams",
    async ({ queryStr }: { queryStr: string }) => {
        if (!queryStr) return null

        try {
            const teamsRef = collection(db, "teams")
            const nameQuery = query(
                teamsRef,
                where("name", ">=", queryStr),
                where("name", "<=", queryStr + "\uf8ff"),
                where("teamType", "==", "public")
            )

            const idQuery = query(
                teamsRef,
                where("id", ">=", queryStr),
                where("id", "<=", queryStr + "\uf8ff"),
                where("teamType", "==", "public")
            )

            console.log(`Query: ${queryStr}`)

            const nameQuerySnap = await getDocs(nameQuery)
            const idQuerySnap = await getDocs(idQuery)

            // console.log(
            //     `Docs data: ${JSON.stringify(
            //         nameQuerySnap.docs.forEach((doc) => {
            //             console.log(doc.data())
            //         })
            //     )}, ${JSON.stringify(
            //         idQuerySnap.docs.forEach((doc) => {
            //             console.log(doc.data())
            //         })
            //     )}`
            // )

            let resultsMap = new Map()

            nameQuerySnap.forEach((docSnap) => {
                resultsMap.set(docSnap.id, docSnap.data())
            })

            idQuerySnap.forEach((docSnap) => {
                resultsMap.set(docSnap.id, docSnap.data())
            })
            const results = Array.from(resultsMap.values()) as Team[]
            console.log(`Results: ${JSON.stringify(results)}`)

            return results
        } catch (err) {
            console.error(err)
            throw err
        }
    }
)

const teamManagementSlice = createSlice({
    name: "teamManagement",
    initialState,
    reducers: {
        setCurrentTeam: (state, action: PayloadAction<Team>) => {
            state.currentTeam = action.payload
        },
        updateInvitees: (state, action: PayloadAction<User>) => {
            state.invitees = [...state.invitees, action.payload]
        },
        updateQueryResults: (state) => {
            state.inviteeQueryResults = null
        },
        updateTeamResults: (state, action: PayloadAction<Team[]>) => {
            state.teamResults = [...state.teamResults, ...action.payload]
        },
        deleteInvitee: (state, action: PayloadAction<User>) => {
            state.invitees = state.invitees.filter(
                (invitee) => invitee.uid !== action.payload.uid
            )
        },
        clearInvitees: (state) => {
            state.invitees = []
        },
        clearTeams: (state) => {
            state.teamQueryResults = null
            state.teamResults = []
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
            .addCase(updateCurrentSelectedTeam.fulfilled, (state) => {
                state.status = "succeeded"
                state.error = undefined
            })
            .addCase(updateCurrentSelectedTeam.pending, (state) => {
                state.status = "loading"
            })
            .addCase(updateCurrentSelectedTeam.rejected, (state) => {
                state.error = "Failed to update current team"
                state.status = "failed"
            })

            .addCase(updateTeamName.fulfilled, (state) => {
                state.status = "succeeded"
            })
            .addCase(uploadTeamLogo.fulfilled, (state) => {
                state.error = undefined
                state.status = "succeeded"
            })
            .addCase(searchForInvitees.pending, (state) => {
                state.status = "loading"
                state.error = undefined
            })
            .addCase(
                searchForInvitees.fulfilled,
                (state, action: PayloadAction<User | null>) => {
                    state.status = "succeeded"
                    state.inviteeQueryResults = action.payload
                }
            )
            .addCase(searchForInvitees.rejected, (state, action) => {
                state.error = action.error.message
                state.status = "failed"
            })
            .addCase(searchTeams.pending, (state) => {
                state.error = undefined
                state.status = "loading"
            })
            .addCase(searchTeams.fulfilled, (state, action) => {
                if (action.payload) {
                    state.error = undefined
                    state.status = "succeeded"
                    state.teamQueryResults = action.payload
                }
            })
            .addCase(searchTeams.rejected, (state, action) => {
                state.error = action.error.message
                state.status = "failed"
            })
            .addCase(deleteTeam.pending, (state) => {
                state.error = undefined
                state.status = "loading"
            })
            .addCase(deleteTeam.fulfilled, (state) => {
                state.error = undefined
                state.status = "succeeded"
            })
            .addCase(deleteTeam.rejected, (state, action) => {
                state.error = action.error.message
                state.status = "failed"
            })
    }
})

export const {
    setCurrentTeam,
    updateInvitees,
    updateQueryResults,
    deleteInvitee,
    clearInvitees,
    updateTeamResults,
    clearTeams
} = teamManagementSlice.actions
export default teamManagementSlice.reducer
