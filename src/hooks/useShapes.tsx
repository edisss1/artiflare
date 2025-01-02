import {
    Canvas,
    Circle,
    Rect,
    PencilBrush,
    Triangle,
    Polygon,
    Line,
    FabricText,
    Group,
    Path,
    Ellipse
} from "fabric"

export function useShapes(canvas: Canvas | null) {
    const addProcess = (x: number, y: number, stroke: string) => {
        const process = new Rect({
            left: x,
            top: y,
            width: 200,
            height: 100,
            rx: 10,
            ry: 10,
            fill: null,
            stroke: stroke,
            strokeWidth: 4
        })

        canvas?.add(process)
    }
    const addDecision = (x: number, y: number, stroke: string) => {
        if (canvas) {
            const diamond = new Polygon(
                [
                    { x: -50, y: 200 / 2 },
                    { x: 200 / 2, y: 50 },
                    { x: 250, y: 200 / 2 },
                    { x: 200 / 2, y: 150 }
                ],
                {
                    left: x,
                    top: y,
                    fill: null,
                    stroke: stroke,
                    strokeWidth: 4,
                    selectable: true
                }
            )
            canvas?.add(diamond)
        }
    }

    const addTerminator = (x: number, y: number, stroke: string) => {
        if (canvas) {
            const terminator = new Rect({
                left: x,
                top: y,
                width: 200,
                height: 100,
                rx: 50,
                ry: 50,
                fill: null,
                stroke: stroke,
                strokeWidth: 4
            })

            canvas.add(terminator)
        }
    }

    const addPredefinedProcess = (x: number, y: number, stroke: string) => {
        const predefinedProcess = new Rect({
            left: x,
            top: y,
            width: 200,
            height: 100,
            fill: null,
            stroke,
            strokeWidth: 4
        })
        const firstLine = new Line([x, y + 100 / 4, x + 200, y + 100 / 4], {
            stroke: stroke,
            strokeWidth: 4
        })
        const secondLine = new Line(
            [x, y + (3 * 100) / 4, x + 200, y + (3 * 100) / 4],
            {
                stroke,
                strokeWidth: 4
            }
        )
        const group = new Group([predefinedProcess, firstLine, secondLine], {
            top: y,
            left: x
        })
        canvas?.add(group)
    }

    const addDocument = (x: number, y: number, stroke: string) => {
        const path = new Path(
            `M 0,0 L ${200},0 L ${200},${100} Q ${200 / 2},${
                100 + 20
            } 0,${100} Z`,
            {
                left: x,
                top: y,
                fill: "transparent",
                stroke,
                strokeWidth: 4
            }
        )
        canvas?.add(path)
    }

    const addMultipleDocuments = (x: number, y: number, stroke: string) => {
        const doc1 = new Rect({
            left: x,
            top: y,
            width: 200,
            height: 100,
            fill: null,
            stroke,
            strokeWidth: 4
        })
        const doc2 = new Rect({
            left: x - 10,
            top: y + 10,
            width: 200,
            height: 100,
            fill: null,
            stroke,
            strokeWidth: 4
        })
        const doc3 = new Rect({
            left: x - 20,
            top: y + 20,
            width: 200,
            height: 100,
            fill: null,
            stroke,
            strokeWidth: 4
        })

        // const firstPath = new Path(
        //     `M 0,0 L ${200},0 L ${200},${100} Q ${200 / 2},${
        //         100 + 20
        //     } 0,${100} Z`,
        //     {
        //         left: x,
        //         top: y,
        //         fill: "transparent",
        //         stroke,
        //         strokeWidth: 4
        //     }
        // )
        // const secondPath = new Path(
        //     `M 0,0 L ${200 + 10},0 L ${200 + 10},${100 + 10} Q ${
        //         200 / 2
        //     },${100 + 20 + 10} 0,${100 + 10} Z`,
        //     {
        //         left: x,
        //         top: y,
        //         fill: "transparent",
        //         stroke,
        //         strokeWidth: 4
        //     }
        // )

        const group = new Group([doc1, doc2, doc3], {
            top: y,
            left: x
        })
        canvas?.add(group)
    }

    const addInputOutput = (x: number, y: number, stroke: string) => {
        const polygon = new Polygon(
            [
                { x: 0, y: 0 },
                { x: 200 - 20, y: 0 },
                { x: 200, y: 100 },
                { x: 20, y: 100 }
            ],
            {
                left: x,
                top: y,
                fill: "transparent",
                stroke,
                strokeWidth: 4
            }
        )
        canvas?.add(polygon)
    }

    const addPreparation = (x: number, y: number, stroke: string) => {
        const preparation = new Polygon(
            [
                { x: 200 / 4, y: 0 },
                { x: (3 * 200) / 4, y: 0 },
                { x: 200, y: 100 },
                { x: 0, y: 100 }
            ],
            {
                left: x,
                top: y,
                fill: "transparent",
                stroke,
                strokeWidth: 4
            }
        )
        canvas?.add(preparation)
    }

    const addDatabase = (x: number, y: number, stroke: string) => {
        const database = new Ellipse({
            left: x,
            top: y,
            width: 200,
            height: 100,
            rx: 200 / 2,
            ry: 100 / 2,
            fill: null,
            stroke,
            strokeWidth: 4
        })

        canvas?.add(database)
    }

    const addDirectData = (x: number, y: number, stroke: string) => {
        const directData = new Polygon(
            [
                { x: 0, y: 0 },
                { x: 200, y: 0 },
                { x: 200, y: 100 },
                { x: 0, y: 100 }
            ],
            {
                left: x,
                top: y,
                fill: "transparent",
                stroke,
                strokeWidth: 4
            }
        )
        canvas?.add(directData)
    }

    const addInternalStorage = (x: number, y: number, stroke: string) => {
        const rect = new Rect({
            left: x,
            top: y,
            width: 200,
            height: 100,
            fill: "transparent",
            stroke,
            strokeWidth: 4
        })
        const line = new Line([x + 200 / 4, y, x + 200 / 4, y + 100], {
            stroke,
            strokeWidth: 4
        })

        const group = new Group([rect, line], {
            top: y,
            left: x
        })

        canvas?.add(group)
    }

    const addManualLoop = (x: number, y: number, stroke: string) => {
        const polygon = new Polygon(
            [
                { x: 0, y: 0 },
                { x: 200, y: 0 },
                { x: 200 / 2, y: 100 },
                { x: 0, y: 100 }
            ],
            {
                left: x,
                top: y,
                fill: "transparent",
                stroke,
                strokeWidth: 4
            }
        )
        canvas?.add(polygon)
    }

    const addDelay = (x: number, y: number, stroke: string) => {
        const path = new Path(
            `M 0,0 L ${200},0 A ${100 / 2},${
                100 / 2
            } 0 0,1 ${200},${100} L 0,${100} Z`,
            {
                left: x,
                top: y,
                fill: "transparent",
                stroke,
                strokeWidth: 4
            }
        )
        canvas?.add(path)
    }

    const addStoredData = (x: number, y: number, stroke: string) => {
        const path = new Path(
            `M 0,0 L ${200},0 L ${200 - 20},${100} L -20,${100} Z`,
            {
                left: x,
                top: y,
                fill: "transparent",
                stroke,
                strokeWidth: 4
            }
        )
        canvas?.add(path)
    }

    const addMerge = (x: number, y: number, stroke: string) => {
        const merge = new Polygon(
            [
                { x: 200 / 2, y: 0 },
                { x: 200, y: -100 },
                { x: 0, y: -100 }
            ],
            {
                left: x,
                top: y,
                fill: "transparent",
                stroke,
                strokeWidth: 4
            }
        )
        canvas?.add(merge)
    }

    const addConnector = (x: number, y: number, stroke: string) => {
        const circle = new Circle({
            left: x,
            top: y,
            radius: 75,
            fill: "transparent",
            stroke,
            strokeWidth: 4
        })
        canvas?.add(circle)
    }

    const addOr = (x: number, y: number, stroke: string) => {
        const or = new Polygon(
            [
                { x: 200 / 2, y: 0 },
                { x: 200, y: 100 / 2 },
                { x: 200 / 2, y: 100 },
                { x: 0, y: 100 / 2 }
            ],
            {
                left: x,
                top: y,
                fill: "transparent",
                stroke,
                strokeWidth: 4
            }
        )
        canvas?.add(or)
    }

    const addSummingJunction = (x: number, y: number, stroke: string) => {
        const circle = new Circle({
            left: x,
            top: y,
            radius: 75,
            fill: "transparent",
            stroke,
            strokeWidth: 4,
            selectable: true
        })
        canvas?.add(circle)
    }

    const addDisplay = (x: number, y: number, stroke: string) => {
        const path = new Path(
            `M 0,0 L ${200 - 20},0 A 20,20 0 0,1 ${200},20 L ${200},${
                100 - 20
            } A 20,20 0 0,1 ${200 - 20},${100} L 0,${200} Z`,
            {
                left: x,
                top: y,
                fill: "transparent",
                stroke,
                strokeWidth: 4
            }
        )
        canvas?.add(path)
    }

    const addOffPageConnector = (x: number, y: number, stroke: string) => {
        const polygon = new Polygon(
            [
                { x: 0, y: 0 }, // Top left
                { x: 200 / 2, y: 0 },
                { x: 200, y: 50 },
                { x: 200 / 2, y: 100 },
                { x: 100, y: 100 / 2 }
            ],
            {
                left: x,
                top: y,
                fill: "transparent",
                stroke,
                strokeWidth: 4
            }
        )
        canvas?.add(polygon)
    }

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
        addText,
        addProcess,
        addDecision,
        addTerminator,
        addPredefinedProcess,
        addDocument,
        addMultipleDocuments,
        addInputOutput,
        addPreparation,
        addDatabase,
        addDirectData,
        addInternalStorage,
        addManualLoop,
        addDelay,
        addStoredData,
        addMerge,
        addConnector,
        addOr,
        addSummingJunction,
        addDisplay,
        addOffPageConnector
    }
}
