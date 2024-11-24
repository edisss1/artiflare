import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import {
    deleteUser,
    reauthenticateWithPopup,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut
} from "firebase/auth"
import { GoogleAuthProvider } from "firebase/auth"
import { auth, db } from "../../firestore/firebaseConfig"
import { deleteDoc, doc, getDoc, setDoc } from "firebase/firestore"
import { createUserWithEmailAndPassword } from "firebase/auth/cordova"
import { User } from "../../types/User.ts"

interface AuthState {
    user: User | null
    status: "idle" | "authenticated" | "unauthenticated" | "loading"
    email: string
    password: string
}

const initialState: AuthState = {
    user: null,
    status: "loading",
    password: "",
    email: ""
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
                boards: userData?.boards || []
            }

            await setDoc(doc(db, "users", user.uid), user)

            return user
        } catch (error) {
            console.error(
                (error as Error).message,
                (error as Error).name,
                (error as Error).stack
            )
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
                boards: []
            }

            await setDoc(doc(db, "users", user.uid), user)

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
                boards: []
            }

            await setDoc(doc(db, "users", user.uid), user)

            return user
        } catch (err) {
            console.error(err)
            throw err
        }
    }
)

export const signOutUser = createAsyncThunk("auth/signOutUser", async () => {
    await signOut(auth)
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
            // Check for Google provider reauthentication
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

            await deleteUser(currentUser)
        } catch (err) {
            console.error("Error deleting user:", err)
            return rejectWithValue(err)
        }
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
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(
                signInWithGoogle.fulfilled,
                (state, action: PayloadAction<User>) => {
                    state.user = action.payload
                    state.status = "authenticated"
                }
            )
            .addCase(signInWithGoogle.pending, (state) => {
                state.status = "loading"
            })
            .addCase(signInWithGoogle.rejected, (state) => {
                state.user = null
                state.status = "unauthenticated"
            })
            .addCase(signOutUser.fulfilled, (state) => {
                state.user = null
                state.status = "unauthenticated"
            })
            .addCase(
                signInWithCredentials.fulfilled,
                (state, action: PayloadAction<User>) => {
                    state.user = action.payload
                    state.status = "authenticated"
                }
            )
            .addCase(
                createUserWithCredentials.fulfilled,
                (state, action: PayloadAction<User>) => {
                    state.user = action.payload
                    state.status = "authenticated"
                }
            )
            .addCase(deleteUserFromDatabase.fulfilled, (state) => {
                state.user = null
                state.status = "unauthenticated"
            })
    }
})

export const { setUser, clearUser, setEmail, setPassword } = authSlice.actions

export default authSlice.reducer
