import {
    Canvas,
    Circle,
    Rect,
    PencilBrush,
    Triangle,
    Polygon,
    Line,
    FabricText
} from "fabric"

export function useShapes(canvas: Canvas | null) {
    const addRectangle = (
        x: number,
        y: number,
        fill: string,
        stroke: string,
        strokeWidth: number
    ) => {
        if (!canvas) return

        const rect = new Rect({
            width: 100,
            height: 100,
            left: x,
            top: y,
            fill: fill,
            stroke: stroke,
            strokeWidth: strokeWidth
        })

        canvas.add(rect)
    }

    const addCircle = (x: number, y: number) => {
        if (!canvas) return

        const circle = new Circle({
            width: 100,
            height: 100,
            radius: 50,
            top: y,
            left: x,
            fill: null,
            stroke: "#333333",
            strokeWidth: 2,
            opacity: 100
        })

        canvas.add(circle)
    }

    const addTriangle = (
        x: number,
        y: number,
        fill: string,
        stroke: string,
        strokeWidth: number
    ) => {
        if (!canvas) return
        const triangle = new Triangle({
            width: 100,
            height: 100,
            fill: fill,
            stroke: stroke,
            strokeWidth: strokeWidth,
            top: y,
            left: x,
            opacity: 100
        })

        canvas.add(triangle)
    }

    const addRhombus = (
        x: number,
        y: number,
        fill: string,
        stroke: string,
        strokeWidth: number
    ) => {
        if (!canvas) return

        const rhombusPoints = [
            { x: x, y: y }, // Top vertex
            { x: x + 100, y: y + 100 }, // Right vertex
            { x: x, y: y + 200 }, // Bottom vertex
            { x: x - 100, y: y + 100 } // Left vertex
        ]

        const rhombus = new Polygon(rhombusPoints, {
            fill: fill,
            stroke: stroke,
            strokeWidth: strokeWidth
        })

        canvas.add(rhombus)
    }

    const addStar = (
        x: number,
        y: number,
        fill: string,
        stroke: string,
        strokeWidth: number
    ) => {
        if (!canvas) return

        const starPoints = [
            { x: x, y: y - 100 }, // Top vertex (outer)
            { x: x + 38, y: y - 30 }, // Inner right
            { x: x + 95, y: y - 30 }, // Outer right
            { x: x + 58, y: y + 20 }, // Inner bottom right
            { x: x + 70, y: y + 80 }, // Outer bottom right
            { x: x, y: y + 50 }, // Center bottom (inner bottom)
            { x: x - 70, y: y + 80 }, // Outer bottom left
            { x: x - 58, y: y + 20 }, // Inner bottom left
            { x: x - 95, y: y - 30 }, // Outer left
            { x: x - 38, y: y - 30 } // Inner left
        ]

        const star = new Polygon(starPoints, {
            fill: fill,
            stroke: stroke,
            strokeWidth: strokeWidth
        })

        canvas.add(star)
    }

    const addLine = (
        x1: number,
        y1: number,
        x2: number,
        y2: number,
        stroke: string,
        strokeWidth: number,
        angle: number
    ) => {
        if (!canvas) return
        const line = new Line([x1, y1, x2, y2], {
            stroke: stroke,
            strokeWidth: strokeWidth,
            angle: angle
        })
        canvas.add(line)
    }

    const addFreeDrawing = (
        brushWidth: number,
        brushColor: string,
        freeDrawingMode: boolean
    ) => {
        if (!canvas) return

        const pencilBrush = new PencilBrush(canvas)
        pencilBrush.color = brushColor
        pencilBrush.width = brushWidth
        canvas.freeDrawingBrush = pencilBrush
        canvas.isDrawingMode = freeDrawingMode
    }

    const addText = (text: string, x: number, y: number) => {
        if (!canvas) return
        const textObject = new FabricText(text, {
            left: x,
            top: y,
            fill: "#000000",
            fontSize: 20,
            fontFamily: "Outfit, sans-serif"
        })
        canvas.add(textObject)
    }

    return {
        addRectangle,
        addCircle,
        addFreeDrawing,
        addTriangle,
        addRhombus,
        addStar,
        addLine,
        addText
    }
}
