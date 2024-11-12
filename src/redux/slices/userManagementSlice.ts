import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { updateProfile } from "firebase/auth";
import { auth, db } from "../../firestore/firebaseConfig.ts";
import { User } from "../../types/User.ts";
import { doc, updateDoc } from "firebase/firestore";

interface UserState {
  newDisplayName: string;
  newCompanyName: string;
  status: "idle" | "succeeded" | "fullfilled" | "rejected";
}

const initialState: UserState = {
  newDisplayName: "",
  newCompanyName: "",
  status: "idle",
};

export const updateUserName = createAsyncThunk(
  "userManagement/updateUserName",
  async ({
    user,
    newDisplayName,
  }: {
    user: User | null;
    newDisplayName: string;
  }) => {
    if (!auth.currentUser || !user) return;

    const userRef = doc(db, "users", user.uid);

    try {
      await updateProfile(auth.currentUser, {
        displayName: newDisplayName,
      });

      await updateDoc(userRef, {
        displayName: newDisplayName,
      });

      return { displayName: newDisplayName };
    } catch (err) {
      console.error(err);
      throw err;
    }
  },
);

export const userManagementSlice = createSlice({
  name: "userManagement",
  initialState,
  reducers: {
    setNewDisplayName: (state, action: PayloadAction<string>) => {
      state.newDisplayName = action.payload;
    },
    setNewCompanyName: (state, action: PayloadAction<string>) => {
      state.newCompanyName = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      updateUserName.fulfilled,
      (state, action: PayloadAction<{ displayName: string } | undefined>) => {
        if (action.payload && state.newDisplayName) {
          state.newDisplayName = action.payload.displayName;
        }
      },
    );
  },
});

export const { setNewDisplayName, setNewCompanyName } =
  userManagementSlice.actions;

export default userManagementSlice.reducer;
