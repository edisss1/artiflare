import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "../redux/store"
import {
    checkMemebership,
    getBoardByID,
    updateBoard
} from "../redux/slices/boardSlice"
import { useNavigate, useParams } from "react-router-dom"

import CanvasNav from "../components/molecules/CanvasNav.tsx"
import ChatContainer from "../components/molecules/ChatContainer.tsx"

import { Excalidraw, restoreElements } from "@excalidraw/excalidraw"
import { ExcalidrawImperativeAPI } from "@excalidraw/excalidraw/types/types"
import User from "../components/atoms/User.tsx"
import {
    ExcalidrawElement,
    Theme
} from "@excalidraw/excalidraw/types/element/types"
import { collection, onSnapshot, query, where } from "firebase/firestore"
import { db } from "../firestore/firebaseConfig.ts"
import { Board } from "../types/Board.ts"

const DrawingBoard = () => {
    const dispatch: AppDispatch = useDispatch()
    const [excalidrawAPI, setExcalidrawAPI] =
        useState<ExcalidrawImperativeAPI | null>(null)
    const [canvasTheme, setCanvasTheme] = useState<Theme>("light")
    const { boardID } = useParams()
    const { user } = useSelector((state: RootState) => state.auth)
    const { isMemberOfBoard } = useSelector((state: RootState) => state.boards)
    const navigate = useNavigate()

    useEffect(() => {
        if (!excalidrawAPI) return

        const handlePointerUp = () => {
            const elements = excalidrawAPI.getSceneElements()
            const activeElements = elements.filter(
                (element) => !element.isDeleted
            )

            if (activeElements.length > 0) {
                dispatch(
                    updateBoard({ boardID, elements: activeElements, user })
                )
            }
        }

        const unsubscribe = excalidrawAPI.onPointerUp(handlePointerUp)

        return () => unsubscribe()
    }, [excalidrawAPI])

    useEffect(() => {
        const queryBoards = query(
            collection(db, "boards"),
            where("id", "==", boardID)
        )

        onSnapshot(queryBoards, (boardSnap) => {
            boardSnap.forEach((doc) => {
                const savedElements = JSON.parse(
                    doc.data().elements
                ) as ExcalidrawElement[]
                if (savedElements) {
                    const loadedElements = restoreElements(savedElements, null)

                    if (excalidrawAPI) {
                        excalidrawAPI.updateScene({ elements: loadedElements })
                    }
                }
            })
        })
    }, [excalidrawAPI])

    useEffect(() => {
        const htmlElement = document.querySelector("html")

        if (htmlElement) {
            htmlElement.classList.length > 0
                ? setCanvasTheme("dark")
                : setCanvasTheme("light")
        }
    }, [canvasTheme])

    useEffect(() => {
        if (!user) {
            navigate("/")
            return
        }
        dispatch(checkMemebership({ boardID, userID: user.uid }))
    }, [boardID, user, dispatch, navigate])

    useEffect(() => {
        if (isMemberOfBoard === false) {
            navigate("/app/dashboard")
        } else if (isMemberOfBoard === true) {
            navigate(`/app/board/${boardID}`)
        }
    }, [isMemberOfBoard, boardID, navigate])

    return (
        <>
            <CanvasNav />

            <div style={{ width: "100vw", height: "100vh" }}>
                <div className="absolute right-4 bottom-8 z-40 flex gap-12 w-full max-w-[550px] max-lg:flex-col max-lg:items-end max-lg:gap-4">
                    <User />

                    <ChatContainer />
                </div>
                <Excalidraw
                    theme={canvasTheme}
                    excalidrawAPI={(api) => setExcalidrawAPI(api)}
                />
            </div>
        </>
    )
}
export default DrawingBoard
