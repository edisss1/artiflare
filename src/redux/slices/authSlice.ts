import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth"
import { GoogleAuthProvider } from "firebase/auth"
import { auth, db } from "../../firestore/firebaseConfig"
import { doc, setDoc } from "firebase/firestore"
import { createUserWithEmailAndPassword } from "firebase/auth/cordova"

export interface User {
  uid: string
  img: string | null
  displayName: string | null
  email: string | null
  teams: string[]
  boards: string[]
}

interface AuthState {
  user: User | null
  status: "idle" | "authenticated" | "unauthenticated"
  email: string
  password: string
}

const initialState: AuthState = {
  user: null,
  status: "idle",
  password: "",
  email: "",
}

export const signInWithGoogle = createAsyncThunk(
  "auth/signInWithGoogle",
  async () => {
    const provider = new GoogleAuthProvider()
    try {
      const result = await signInWithPopup(auth, provider)

      const user: User = {
        uid: result.user.uid,
        img: result.user.photoURL,
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

export const signInWithCredentials = createAsyncThunk(
  "auth/signInWithCredentials",
  async ({ email, password }: { email: string; password: string }) => {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password)

      const user: User = {
        uid: result.user.uid,
        img: result.user.photoURL,
        displayName: result.user.displayName,
        email: result.user.email,
        teams: [],
        boards: [],
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
      const result = await createUserWithEmailAndPassword(auth, email, password)

      const user: User = {
        uid: result.user.uid,
        img: result.user.photoURL,
        displayName: result.user.displayName,
        email: result.user.email,
        teams: [],
        boards: [],
      }

      await setDoc(doc(db, "users", user.uid), user)

      return user
    } catch (err) {
      throw err
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
    setPassword: (state, action: PayloadAction<string>) => {
      state.password = action.payload
    },
    setEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload
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
  },
})

export const { setUser, clearUser, setEmail, setPassword } = authSlice.actions

export default authSlice.reducer
