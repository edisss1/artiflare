import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { Board } from "../../types/Board"
import { User } from "../../types/User"
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
import { db } from "../../firestore/firebaseConfig"

interface BoardState {
    boards: Board[]
    currentBoard: Board | undefined
    status: "idle" | "loading" | "succeeded" | "failed"
    error: string | undefined
}

const initialState: BoardState = {
    boards: [],
    currentBoard: undefined,
    status: "idle",
    error: undefined
}

export const createBoard = createAsyncThunk(
    "board/createBoard",
    async ({ user, boardTitle }: { user: User | null; boardTitle: string }) => {
        try {
            const boardsRef = collection(db, "boards")

            if (!user) return

            const boardData = {
                boardTitle,
                userUID: user.uid,
                createdAt: new Date().toDateString(),
                updatedAt: new Date().toDateString(),
                createdBy: user.displayName || user.email,
                modifiedBy: user.displayName || user.email,
                data: {}
            }

            const docRef = await addDoc(boardsRef, boardData)

            await updateDoc(doc(db, "users", user.uid), {
                boards: arrayUnion(docRef.id)
            })

            return { id: docRef.id, ...boardData }
        } catch (err) {
            console.error(err)
            throw err
        }
    }
)

export const fetchAllUserBoards = createAsyncThunk(
    "board/fetchAllUserBoards",
    async (userUID: string) => {
        try {
            const boardsRef = collection(db, "boards")
            const q = query(boardsRef, where("userUID", "==", userUID))
            const querySnap = await getDocs(q)
            const boards: Board[] = []
            querySnap.forEach((snap) => {
                const boardData = snap.data() as Board
                boards.push({ id: snap.id, ...boardData })
            })

            return boards
        } catch (err) {
            throw err
        }
    }
)

export const getBoardByID = createAsyncThunk(
    "board/getBoardByID",
    async (boardID: string) => {
        try {
            const boardRef = doc(db, "boards", boardID)
            const docSnap = await getDoc(boardRef)

            if (docSnap.exists()) {
                const boardData = docSnap.data()

                console.log("board doc data", boardData)

                return boardData
            } else {
                console.error("Board not found")
                throw new Error("Board not found")
            }
        } catch (err) {
            console.error(err)
            throw err
        }
    }
)

export const updateBoard = createAsyncThunk(
    "board/updateBoard",
    async ({
        boardID,
        newBoardData,
        user
    }: {
        boardID: string
        newBoardData: {}

        user: User
    }) => {
        try {
            const boardRef = doc(db, "boards", boardID)
            await updateDoc(boardRef, {
                data: newBoardData,
                updatedAt: `${new Date().getDay()}.${
                    new Date().getMonth() + 1
                }.${new Date().getFullYear()}, ${new Date().getHours()}:${new Date()
                    .getMinutes()
                    .toString()
                    .padStart(2, "0")}`,
                modifiedBy: user.displayName || user.email
            })

            return { boardID, user, newBoardData }
        } catch (err) {
            throw err
        }
    }
)

const boardSlice = createSlice({
    name: "board",
    initialState,
    reducers: {
        clearBoard: (state) => {
            state.currentBoard = undefined
        },
        setBoard: (state, action) => {
            state.currentBoard = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(createBoard.pending, (state) => {
                state.status = "loading"
                state.error = undefined
            })
            .addCase(createBoard.fulfilled, (state, action) => {
                if (action.payload && state.currentBoard) {
                    state.status = "succeeded"
                    state.currentBoard.data = action.payload.data
                }
            })
            .addCase(createBoard.rejected, (state, action) => {
                state.status = "failed"
                state.error = action.error.message
            })
            .addCase(getBoardByID.pending, (state) => {
                state.status = "loading"
                state.error = undefined
            })
            .addCase(
                getBoardByID.fulfilled,
                (state, action: PayloadAction<Board["data"]>) => {
                    state.error = undefined
                    state.status = "succeeded"
                    if (state.currentBoard) {
                        state.currentBoard.data = action.payload
                    }
                }
            )
            .addCase(getBoardByID.rejected, (state, action) => {
                state.status = "failed"
                state.error = action.error.message
            })
            .addCase(updateBoard.pending, (state) => {
                state.status = "loading"
                state.error = undefined
            })
            .addCase(updateBoard.fulfilled, (state, action) => {
                state.status = "succeeded"
                if (state.currentBoard) {
                    state.currentBoard.data = action.payload.newBoardData
                    state.currentBoard.updatedAt = new Date().toDateString()
                }
            })
            .addCase(updateBoard.rejected, (state, action) => {
                state.error = action.error.message
                state.status = "failed"
            })
            .addCase(fetchAllUserBoards.fulfilled, (state, action) => {
                state.boards = action.payload
                state.status = "succeeded"
            })
            .addCase(fetchAllUserBoards.pending, (state) => {
                state.status = "loading"
            })
    }
})

export const { setBoard } = boardSlice.actions

export default boardSlice.reducer
