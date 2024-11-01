import { useEffect, useRef } from "react"

import { Canvas } from "fabric"

interface CanvasBoardProps {
  setCanvas: React.Dispatch<React.SetStateAction<Canvas | null>>
}

const CanvasBoard = ({ setCanvas }: CanvasBoardProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!canvasRef.current) return
    const initCanvas = new Canvas(canvasRef.current, {
      width: window.innerWidth,
      height: window.innerHeight,
    })

    initCanvas.renderAll()
    initCanvas.backgroundColor = "#ffffff"

    setCanvas(initCanvas)

    return () => {
      initCanvas.dispose()
    }
  }, [])

  return <canvas ref={canvasRef} className="grid-pattern " id="canvas"></canvas>
}

export default CanvasBoard
