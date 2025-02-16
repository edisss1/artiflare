import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "../redux/store"
import { checkMemebership, updateBoard } from "../redux/slices/boardSlice"
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
import Button from "../components/atoms/Button.tsx"
import ChatIcon from "../components/icons/ChatIcon.tsx"
import MobileBoardControls from "../components/molecules/MobileBoardControls.tsx"

const DrawingBoard = () => {
    const dispatch: AppDispatch = useDispatch()
    const [excalidrawAPI, setExcalidrawAPI] =
        useState<ExcalidrawImperativeAPI | null>(null)
    const [canvasTheme, setCanvasTheme] = useState<string>(
        localStorage.getItem("theme") || "light"
    )
    const { boardID } = useParams()
    const { user } = useSelector((state: RootState) => state.auth)
    const { isMemberOfBoard } = useSelector((state: RootState) => state.boards)
    const navigate = useNavigate()
    const [isMobileControlsOpen, setIsMobileControlsOpen] = useState(false)

    useEffect(() => {
        if (!excalidrawAPI) return

        const handlePointerUp = () => {
            const elements = excalidrawAPI.getSceneElements()
            const activeElements = elements.filter(
                (element) => !element.isDeleted
            )
            dispatch(updateBoard({ boardID, elements: activeElements, user }))
        }

        const unsubscribe = excalidrawAPI.onPointerUp(handlePointerUp)
        return () => unsubscribe()
    }, [excalidrawAPI, boardID, dispatch, user])

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
    }, [excalidrawAPI, boardID])

    useEffect(() => {
        if (!excalidrawAPI) return

        const htmlElement = document.documentElement

        const updateExcalidrawTheme = () => {
            const newTheme = htmlElement.classList.contains("dark")
                ? "dark"
                : "light"
            setCanvasTheme(newTheme)
            excalidrawAPI.updateScene({ appState: { theme: newTheme } })
        }

        updateExcalidrawTheme()

        const observer = new MutationObserver((mutationsList) => {
            for (const mutation of mutationsList) {
                if (mutation.attributeName === "class") {
                    updateExcalidrawTheme()
                }
            }
        })

        observer.observe(htmlElement, { attributes: true })

        return () => observer.disconnect()
    }, [excalidrawAPI])

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
            <CanvasNav themeSwitchVisible />

            <div style={{ width: "100vw", height: "100vh" }}>
                <div className="absolute max-lg:hidden right-4 bottom-8 z-40 flex flex-col items-end gap-4 w-full max-w-[500px] max-lg:flex-col max-lg:items-end max-lg:gap-4">
                    <User />
                    <ChatContainer />
                </div>
                <div className="absolute right-4 bottom-20 z-40 flex flex-col items-end gap-2">
                    <Button
                        onClick={() =>
                            setIsMobileControlsOpen(!isMobileControlsOpen)
                        }
                        className="z-40 lg:hidden bg-primary dark:bg-primary-dark p-2 rounded-full"
                    >
                        <ChatIcon />
                    </Button>

                    {isMobileControlsOpen && <MobileBoardControls />}
                </div>

                <Excalidraw
                    theme={canvasTheme as Theme}
                    excalidrawAPI={(api) => setExcalidrawAPI(api)}
                />
            </div>
        </>
    )
}

export default DrawingBoard
