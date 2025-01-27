import { useEffect, useRef } from "react"

import { Canvas } from "fabric"
import { FabricObject } from "fabric"
;(FabricObject.prototype.toObject as any) = (function (toObject: any) {
    return function (this: any) {
        return {
            ...toObject.call(this),
            name: this.name || undefined
        }
    }
})(FabricObject.prototype.toObject)

interface CanvasBoardProps {
    setCanvas: React.Dispatch<React.SetStateAction<Canvas | null>>
}

const CanvasBoard = ({ setCanvas }: CanvasBoardProps) => {
    const canvasRef = useRef<HTMLCanvasElement>(null)

    const isPanning = useRef(false)
    const lastPosX = useRef(0)
    const lastPosY = useRef(0)

    useEffect(() => {
        if (!canvasRef.current) return

        const initCanvas = new Canvas(canvasRef.current, {
            width: window.innerWidth,
            height: window.innerHeight
        })

        initCanvas.renderAll()
        setCanvas(initCanvas)

        initCanvas.on("mouse:down", (event) => {
            const e = event.e as MouseEvent
            if (e.altKey) {
                isPanning.current = true
                lastPosX.current = (event.e as MouseEvent).clientX
                lastPosY.current = (event.e as MouseEvent).clientY
                initCanvas.selection = false
            }
        })

        initCanvas.on("mouse:move", (event) => {
            if (!isPanning.current) return

            const e = event.e as MouseEvent

            const deltaX = e.clientX - lastPosX.current
            const deltaY = e.clientY - lastPosY.current

            lastPosX.current = e.clientX
            lastPosY.current = e.clientY

            const vpt = initCanvas.viewportTransform
            vpt[4] += deltaX
            vpt[5] += deltaY
            initCanvas.setViewportTransform(vpt)
        })

        initCanvas.upperCanvasEl.oncontextmenu = (e) => e.preventDefault()

        initCanvas.on("mouse:up", () => {
            isPanning.current = false
            initCanvas.selection = true
        })

        return () => {
            initCanvas.dispose()
        }
    }, [])

    return (
        <canvas
            ref={canvasRef}
            className=" grid-pattern  relative dark:bg-typography-dark  "
            id="canvas"
        ></canvas>
    )
}

export default CanvasBoard
