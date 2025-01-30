import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { Board } from "../../types/Board"
import { User } from "../../types/User"
import {
    addDoc,
    arrayUnion,
    collection,
    deleteDoc,
    doc,
    getDoc,
    onSnapshot,
    query,
    updateDoc,
    where
} from "firebase/firestore"
import { db } from "../../firestore/firebaseConfig"
import { AppDispatch } from "../store"
import { ExcalidrawElement } from "@excalidraw/excalidraw/types/element/types"

interface BoardState {
    boards: Board[]
    recentBoards: Board[]
    favoriteBoards: Board[]
    currentBoard: Board | undefined
    status: "idle" | "loading" | "succeeded" | "failed"
    error: string | undefined
    boardsPerPage: number
    sortedBy: string
}

const initialState: BoardState = {
    boards: [],
    recentBoards: [],
    favoriteBoards: [],
    currentBoard: undefined,
    status: "idle",
    error: undefined,
    boardsPerPage: 4,
    sortedBy: "last-opened"
}

export const createBoard = createAsyncThunk(
    "board/createBoard",
    async ({
        user,
        boardTitle,
        currentTeam
    }: {
        user: User | null
        boardTitle: string
        currentTeam: string | null
    }) => {
        try {
            const boardsRef = collection(db, "boards")

            if (!user) return

            if (boardTitle.length >= 4) {
                const boardData: Board = {
                    boardTitle,
                    userUID: user.uid,
                    teamID: currentTeam!,
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString(),
                    createdBy: user.displayName || user.email,
                    modifiedBy: user.displayName || user.email,
                    elements: [],
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
                    isFavorite: false
                }

                const docRef = await addDoc(boardsRef, boardData)

                await updateDoc(doc(db, "users", user.uid), {
                    boards: arrayUnion(docRef.id)
                })

                return { id: docRef.id, ...boardData }
            } else {
                throw new Error(
                    "Board title must be at least 4 characters long"
                )
            }
        } catch (err) {
            console.error(err)
            throw err
        }
    }
)

export const fetchAllUserBoards =
    (userUID: string) => (dispatch: AppDispatch) => {
        try {
            const boardsRef = collection(db, "boards")
            const q = query(boardsRef, where("userUID", "==", userUID))

            return onSnapshot(q, (snapshot) => {
                const boards: Board[] = snapshot.docs.map(
                    (doc) =>
                        ({
                            id: doc.id,
                            ...doc.data()
                        } as Board)
                )

                dispatch(updateBoards(boards))
            })
        } catch (err) {
            throw err
        }
    }

export const getBoardByID = async (boardID: string) => {
    try {
        const boardRef = doc(db, "boards", boardID)
        const boardDoc = await getDoc(boardRef)

        if (boardDoc.exists()) {
            const boardData = boardDoc.data()

            if (boardData && typeof boardData.elements === "string") {
                const elements: ExcalidrawElement[] = JSON.parse(
                    boardData.elements
                )

                console.log("board doc data", boardData)
                return elements
            }
        } else {
            console.error("Board not found")
            throw new Error("Board not found")
        }
    } catch (err) {
        console.error(err)
        throw err
    }
}

export const updateBoard = createAsyncThunk(
    "board/updateBoard",
    async ({
        boardID,
        elements,
        user
    }: {
        boardID: string | undefined
        elements: readonly ExcalidrawElement[]

        user: User | null
    }) => {
        if (!boardID || !user) return

        try {
            const boardRef = doc(db, "boards", boardID)

            await updateDoc(boardRef, {
                elements: JSON.stringify(elements),
                updatedAt: new Date().toISOString(),
                modifiedBy: user.displayName || user.email
            })
        } catch (err) {
            console.error(err)
        }
    }
)

export const addBoardToFavorites = createAsyncThunk(
    "board/addBoardToFavorites",
    async (boardID: string | undefined) => {
        try {
            if (!boardID) return
            const boardRef = doc(db, "boards", boardID)
            await updateDoc(boardRef, { isFavorite: true })
        } catch (err) {
            throw new Error(err as string)
        }
    }
)

export const removeBoardsFromFavorites = createAsyncThunk(
    "board/removeBoardsFromFavorites",
    async (boardID: string | undefined) => {
        try {
            if (!boardID) return
            const boardRef = doc(db, "boards", boardID)
            await updateDoc(boardRef, { isFavorite: false })
        } catch (err) {
            throw new Error(err as string)
        }
    }
)

export const getRecentBoards = (userID: string) => (dispatch: AppDispatch) => {
    try {
        const currentTime = new Date()

        const timeFrameStart = new Date(
            currentTime.getTime() - 24 * 60 * 60 * 1000
        ).toISOString()

        const boardsRef = collection(db, "boards")
        const q = query(
            boardsRef,
            where("updatedAt", ">", timeFrameStart),
            where("userUID", "==", userID)
        )

        return onSnapshot(q, (snapshot) => {
            const recentBoards: Board[] = snapshot.docs.map(
                (doc) =>
                    ({
                        id: doc.id,
                        ...doc.data()
                    } as Board)
            )

            dispatch(updateRecentBoards(recentBoards))
        })
    } catch (err) {
        console.error("Error fetching recent boards:", err)
        throw new Error(err as string)
    }
}

export const getFavoriteBoards =
    (userID: string) => (dispatch: AppDispatch) => {
        try {
            const boardsRef = collection(db, "boards")
            const q = query(
                boardsRef,
                where("isFavorite", "==", true),
                where("userUID", "==", userID)
            )

            return onSnapshot(q, (snapshot) => {
                const favoriteBoards: Board[] = snapshot.docs.map(
                    (doc) =>
                        ({
                            id: doc.id,
                            ...doc.data()
                        } as Board)
                )

                dispatch(updateFavoriteBoards(favoriteBoards))
            })
        } catch (err) {
            console.error(err)
            throw new Error(err as string)
        }
    }

export const deleteBoard = createAsyncThunk(
    "board/deleteBoard",
    async (boardID: string | undefined) => {
        if (!boardID) return

        try {
            const boardDocRef = doc(db, "boards", boardID)

            await deleteDoc(boardDocRef)
        } catch (err) {
            throw new Error(err as string)
        }
    }
)

export const renameBoard = createAsyncThunk(
    "board/renameBoard",
    async ({
        boardID,
        newBoardTitle
    }: {
        boardID: string | undefined
        newBoardTitle: string
    }) => {
        if (!boardID) return

        try {
            const boardRef = doc(db, "boards", boardID)
            await updateDoc(boardRef, { boardTitle: newBoardTitle })
        } catch (err) {
            console.error("Error renaming board:", err)
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
        },
        updateBoards: (state, action: PayloadAction<Board[]>) => {
            state.boards = action.payload
        },
        updateRecentBoards: (state, action: PayloadAction<Board[]>) => {
            state.recentBoards = action.payload
        },
        setBoardsPerPage: (state, action: PayloadAction<number>) => {
            state.boardsPerPage = action.payload
        },
        updateSortedBy: (state, action: PayloadAction<string>) => {
            state.sortedBy = action.payload
        },
        updateFavoriteBoards: (state, action: PayloadAction<Board[]>) => {
            state.favoriteBoards = action.payload
        },
        updateBoardsPerPage: (state, action: PayloadAction<number>) => {
            state.boardsPerPage = action.payload
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
                    state.currentBoard = action.payload
                }
            })
            .addCase(createBoard.rejected, (state, action) => {
                state.status = "failed"
                state.error = action.error.message
            })

            .addCase(updateBoard.pending, (state) => {
                state.status = "loading"
                state.error = undefined
            })
            .addCase(updateBoard.fulfilled, (state, action: any) => {
                state.status = "succeeded"
                if (state.currentBoard) {
                    state.currentBoard.elements = action.payload.newBoardData
                    state.currentBoard.updatedAt = new Date().toISOString()
                }
            })
            .addCase(updateBoard.rejected, (state, action) => {
                state.error = action.error.message
                state.status = "failed"
            })
            .addCase(addBoardToFavorites.fulfilled, (state) => {
                state.status = "succeeded"
                state.error = undefined
            })
            .addCase(addBoardToFavorites.rejected, (state, action) => {
                state.status = "failed"
                state.error = action.error.message
            })
            .addCase(addBoardToFavorites.pending, (state) => {
                state.status = "loading"
                state.error = undefined
            })
            .addCase(deleteBoard.fulfilled, (state) => {
                state.status = "succeeded"
                state.error = undefined
            })
            .addCase(renameBoard.pending, (state) => {
                state.status = "loading"
                state.error = undefined
            })
            .addCase(renameBoard.fulfilled, (state) => {
                state.status = "succeeded"
                state.error = undefined
            })
            .addCase(renameBoard.rejected, (state, action) => {
                state.status = "failed"
                state.error = action.error.message
            })
    }
})

export const {
    setBoard,
    updateBoards,
    setBoardsPerPage,
    updateSortedBy,
    updateRecentBoards,
    updateFavoriteBoards,
    updateBoardsPerPage
} = boardSlice.actions

export default boardSlice.reducer
