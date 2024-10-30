import { useEffect, useRef, useState } from "react"

import { Canvas, Rect } from "fabric"

interface CanvasBoardProps {
  canvas: Canvas | null
  setCanvas: React.Dispatch<React.SetStateAction<Canvas | null>>
}

const CanvasBoard = ({ canvas, setCanvas }: CanvasBoardProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!canvasRef.current) return
    const initCanvas = new Canvas(canvasRef.current, {
      width: window.innerWidth,
      height: window.innerHeight,
    })

    initCanvas.renderAll()

    setCanvas(initCanvas)

    return () => {
      initCanvas.dispose()
    }
  }, [])

  return <canvas ref={canvasRef} className="grid-pattern" id="canvas"></canvas>
}

export default CanvasBoard
