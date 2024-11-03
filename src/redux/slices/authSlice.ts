import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { signInWithPopup, signOut } from "firebase/auth"
import { GoogleAuthProvider } from "firebase/auth"
import { auth, db } from "../../firestore/firebaseConfig"
import { doc, setDoc } from "firebase/firestore"

export interface User {
  uid: string
  displayName: string | null
  email: string | null
  teams: string[]
  boards: string[]
}

interface AuthState {
  user: User | null
  status: "idle" | "authenticated" | "unauthenticated"
}

const initialState: AuthState = {
  user: null,
  status: "idle",
}

export const signInWithGoogle = createAsyncThunk(
  "auth/signInWithGoogle",
  async () => {
    const provider = new GoogleAuthProvider()
    try {
      const result = await signInWithPopup(auth, provider)

      const user: User = {
        uid: result.user.uid,
        displayName: result.user.displayName,
        email: result.user.email,
        teams: [],
        boards: [],
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

export const signOutUser = createAsyncThunk("auth/signOutUser", async () => {
  await signOut(auth)
})

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload
      state.status = "authenticated"
    },
    clearUser: (state) => {
      state.user = null
      state.status = "unauthenticated"
    },
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
      .addCase(signOutUser.fulfilled, (state) => {
        state.user = null
        state.status = "unauthenticated"
      })
  },
})

export const { setUser, clearUser } = authSlice.actions

export default authSlice.reducer
