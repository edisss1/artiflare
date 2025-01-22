import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import {
    deleteUser,
    reauthenticateWithPopup,
    sendEmailVerification,
    sendPasswordResetEmail,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut
} from "firebase/auth"
import { GoogleAuthProvider } from "firebase/auth"
import { auth, db } from "../../firestore/firebaseConfig"
import {
    addDoc,
    arrayUnion,
    collection,
    deleteDoc,
    doc,
    getDoc,
    getDocs,
    query,
    setDoc,
    updateDoc,
    where
} from "firebase/firestore"
import { createUserWithEmailAndPassword } from "firebase/auth/cordova"
import { User } from "../../types/User.ts"
import { Team } from "../../types/Team.ts"
import { navigateTo } from "../../utils/navigate.ts"

const loadUserFromLocalStorage = (): User | null => {
    const firebaseAuthKey = Object.keys(localStorage).find((key) =>
        key.startsWith("firebase:authUser:")
    )

    if (firebaseAuthKey) {
        const firebaseAuthUser = localStorage.getItem(firebaseAuthKey)
        if (firebaseAuthUser) {
            const parsedUser: User = JSON.parse(firebaseAuthUser)
            return {
                uid: parsedUser.uid,
                email: parsedUser.email,
                img: parsedUser.img,
                displayName: parsedUser.displayName,
                teams: parsedUser.teams,
                boards: parsedUser.boards,
                currentSelectedTeam: parsedUser.currentSelectedTeam
            } as User
        }
    }
    return null
}

interface AuthState {
    user: User | null
    status: "idle" | "authenticated" | "unauthenticated" | "loading" | "failed"
    email: string
    password: string
    confirmedPassword: string
    errorCode: string | undefined
}

const initialState: AuthState = {
    user: loadUserFromLocalStorage(),
    status: "loading",
    password: "",
    email: "",
    confirmedPassword: "",
    errorCode: undefined
}

const createDefaultTeam = async (user: User) => {
    const teamsRef = collection(db, "teams")
    const teamData: Team = {
        name: `${user.displayName ? `${user.displayName}'s` : ""} Team`,
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
        teamType: "private",
        logo: ""
    }

    const teamDoc = await addDoc(teamsRef, teamData)

    const userRef = doc(db, "users", user.uid)
    const updatedUserData = {
        teams: arrayUnion({
            teamID: teamDoc.id,
            role: "owner"
        }),
        currentSelectedTeam: teamDoc.id
    }

    await updateDoc(userRef, updatedUserData)

    return teamDoc.id
}

export const signInWithGoogle = createAsyncThunk(
    "auth/signInWithGoogle",
    async () => {
        const provider = new GoogleAuthProvider()
        try {
            const result = await signInWithPopup(auth, provider)

            const userDocRef = doc(db, "users", result.user.uid)
            const userDoc = await getDoc(userDocRef)
            const userData = userDoc.data()

            const user: User = {
                uid: result.user.uid,
                img: result.user.photoURL,
                displayName: result.user.displayName,
                email: result.user.email,
                teams: userData?.teams || [],
                boards: userData?.boards || [],
                currentSelectedTeam: userData?.currentSelectedTeam || "",
                lastAccessAt: new Date().toDateString(),
                emailVerified: result.user.emailVerified
            }

            await setDoc(doc(db, "users", user.uid), user)

            if (!user.teams.length && user) {
                const defaultTeamID = await createDefaultTeam(user)
                setTimeout(() => {
                    user.currentSelectedTeam = defaultTeamID
                }, 1000)
            }

            return user
        } catch (error) {
            throw error
        }
    }
)

export const signInWithCredentials = createAsyncThunk(
    "auth/signInWithCredentials",
    async ({ email, password }: { email: string; password: string }) => {
        try {
            const result = await signInWithEmailAndPassword(
                auth,
                email,
                password
            )

            const user: User = {
                uid: result.user.uid,
                img: result.user.photoURL,
                displayName: result.user.displayName,
                email: result.user.email,
                teams: [],
                boards: [],
                currentSelectedTeam: "",
                lastAccessAt: new Date().toDateString(),
                emailVerified: result.user.emailVerified
            }

            await setDoc(doc(db, "users", user.uid), user)

            if (!user.teams.length && user) {
                const defaultTeamID = await createDefaultTeam(user)
                setTimeout(() => {
                    user.currentSelectedTeam = defaultTeamID
                }, 1000)
            }

            return user
        } catch (err) {
            console.error(err)
            throw err
        }
    }
)

export const createUserWithCredentials = createAsyncThunk(
    "auth/createUserWithCredentials",
    async ({ email, password }: { email: string; password: string }) => {
        try {
            const result = await createUserWithEmailAndPassword(
                auth,
                email,
                password
            )

            const user: User = {
                uid: result.user.uid,
                img: result.user.photoURL,
                displayName: result.user.displayName ?? result.user.email,
                email: result.user.email,
                teams: [],
                boards: [],
                currentSelectedTeam: "",
                lastAccessAt: new Date().toDateString(),
                emailVerified: result.user.emailVerified
            }

            sendEmailVerification(result.user)

            await setDoc(doc(db, "users", user.uid), user)

            if (!user.teams.length && user) {
                const defaultTeamID = await createDefaultTeam(user)
                setTimeout(() => {
                    user.currentSelectedTeam = defaultTeamID
                }, 1000)
            }

            return user
        } catch (err) {
            console.error(err)
            throw err
        }
    }
)

export const signOutUser = createAsyncThunk("auth/signOutUser", async () => {
    await signOut(auth)
    navigateTo("/")
})

export const deleteUserFromDatabase = createAsyncThunk(
    "auth/deleteUser",
    async (_, { rejectWithValue }) => {
        const currentUser = auth.currentUser

        if (!currentUser) {
            console.error("No user is currently authenticated.")
            return rejectWithValue("No authenticated user.")
        }

        try {
            // Reauthenticate if the user is signed in with Google
            if (
                currentUser.providerData.some(
                    (data) => data.providerId === "google.com"
                )
            ) {
                const provider = new GoogleAuthProvider()
                await reauthenticateWithPopup(currentUser, provider)
            }

            const userRef = doc(db, "users", currentUser.uid)
            await deleteDoc(userRef)

            const userBoardsRef = query(
                collection(db, "boards"),
                where("userUID", "==", currentUser.uid)
            )
            const userBoardsSnapshot = await getDocs(userBoardsRef)
            const boardDeletions = userBoardsSnapshot.docs.map((doc) =>
                deleteDoc(doc.ref)
            )

            const userTeamsRef = query(
                collection(db, "teams"),
                where("creatorID", "==", currentUser.uid)
            )
            const userTeamsSnapshot = await getDocs(userTeamsRef)
            const teamDeletions = userTeamsSnapshot.docs.map((doc) =>
                deleteDoc(doc.ref)
            )

            await Promise.all([...boardDeletions, ...teamDeletions])

            await deleteUser(currentUser)
        } catch (err) {
            console.error("Error deleting user:", (err as Error).message)
            return rejectWithValue(
                (err as Error).message || "Error deleting user."
            )
        }
    }
)

export const resetPassword = createAsyncThunk(
    "auth/resetPassword",
    async (email: string) => {
        sendPasswordResetEmail(auth, email)
            .then(() => alert("Password reset email sent."))
            .catch((err) => {
                console.error(err)
                alert("Error sending password reset email.")
            })
    }
)

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<User | null>) => {
            state.user = action.payload
            state.status = action.payload ? "authenticated" : "unauthenticated"
        },
        clearUser: (state) => {
            state.user = null
            state.status = "unauthenticated"
        },
        setPassword: (state, action: PayloadAction<string>) => {
            state.password = action.payload
        },
        setEmail: (state, action: PayloadAction<string>) => {
            state.email = action.payload
        },
        setConfirmedPassword: (state, action: PayloadAction<string>) => {
            state.confirmedPassword = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(
                signInWithGoogle.fulfilled,
                (state, action: PayloadAction<User>) => {
                    state.user = action.payload
                    state.status = "authenticated"
                    state.errorCode = undefined
                }
            )
            .addCase(signInWithGoogle.pending, (state) => {
                state.status = "loading"
                state.errorCode = undefined
            })
            .addCase(signInWithGoogle.rejected, (state, action) => {
                state.user = null
                state.status = "unauthenticated"
                state.errorCode = action.error.code
            })
            .addCase(signOutUser.fulfilled, (state) => {
                state.user = null
                state.status = "unauthenticated"
                state.errorCode = undefined
            })
            .addCase(
                signInWithCredentials.fulfilled,
                (state, action: PayloadAction<User>) => {
                    state.user = action.payload
                    state.status = "authenticated"
                    state.errorCode = undefined
                }
            )
            .addCase(signInWithCredentials.rejected, (state, action) => {
                state.status = "failed"
                state.errorCode = action.error.code
            })
            .addCase(
                createUserWithCredentials.fulfilled,
                (state, action: PayloadAction<User>) => {
                    state.user = action.payload
                    state.status = "authenticated"
                    state.errorCode = undefined
                }
            )
            .addCase(createUserWithCredentials.rejected, (state, action) => {
                state.errorCode = action.error.code
            })
            .addCase(deleteUserFromDatabase.fulfilled, (state) => {
                state.user = null
                state.status = "unauthenticated"
                state.errorCode = undefined
            })
            .addCase(resetPassword.fulfilled, (state) => {
                state.errorCode = undefined
            })
            .addCase(resetPassword.pending, (state) => {
                state.errorCode = undefined
            })
            .addCase(resetPassword.rejected, (state, action) => {
                state.errorCode = action.error.code
                state.status = "failed"
            })
    }
})

export const {
    setUser,
    clearUser,
    setEmail,
    setPassword,
    setConfirmedPassword
} = authSlice.actions

export default authSlice.reducer
