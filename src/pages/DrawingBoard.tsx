import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "../redux/store"
import { getBoardByID, updateBoard } from "../redux/slices/boardSlice"
import { useParams } from "react-router-dom"

import CanvasNav from "../components/molecules/CanvasNav.tsx"
import ChatContainer from "../components/molecules/ChatContainer.tsx"

import { Excalidraw, restoreElements } from "@excalidraw/excalidraw"
import { ExcalidrawImperativeAPI } from "@excalidraw/excalidraw/types/types"
import User from "../components/atoms/User.tsx"
import { Theme } from "@excalidraw/excalidraw/types/element/types"

const DrawingBoard = () => {
    const dispatch: AppDispatch = useDispatch()
    const [excalidrawAPI, setExcalidrawAPI] =
        useState<ExcalidrawImperativeAPI | null>(null)
    const [canvasTheme, setCanvasTheme] = useState<Theme>("light")
    const { boardID } = useParams()
    const { user } = useSelector((state: RootState) => state.auth)

    useEffect(() => {
        if (!excalidrawAPI) return

        const handlePointerUp = () => {
            const elements = excalidrawAPI.getSceneElements()
            const activeElements = elements.filter(
                (element) => !element.isDeleted
            )

            if (activeElements.length > 0) {
                dispatch(updateBoard({ boardID, elements, user }))
            }
        }

        const unsubscribe = excalidrawAPI.onPointerUp(handlePointerUp)

        return () => unsubscribe()
    }, [excalidrawAPI])

    useEffect(() => {
        const loadBoard = async () => {
            const savedElements = await getBoardByID(boardID!)

            if (savedElements) {
                const loadedElements = restoreElements(savedElements, null)

                if (excalidrawAPI) {
                    excalidrawAPI.updateScene({ elements: loadedElements })
                }
            }
        }

        loadBoard()
    }, [boardID, excalidrawAPI])

    useEffect(() => {
        const htmlElement = document.querySelector("html")

        if (htmlElement) {
            htmlElement.classList.length > 0
                ? setCanvasTheme("dark")
                : setCanvasTheme("light")
        }
    }, [canvasTheme])

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
