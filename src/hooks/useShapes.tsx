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
            const decision = new Path(
                "M21.635 0.382C22.145 0.145 22.855 0.145 23.365 0.382L44.365 11.382C44.875 11.619 44.875 12.381 44.365 12.618L23.365 23.618C22.855 23.855 22.145 23.855 21.635 23.618L0.635 12.618C0.125 12.381 0.125 11.619 0.635 11.382L21.635 0.382Z",
                {
                    stroke,
                    strokeWidth: 1,
                    fill: "transparent",
                    width: 200,
                    height: 100,
                    left: x,
                    top: y
                }
            )

            decision.scaleX = 7
            decision.scaleY = 3.5

            canvas?.add(decision)
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
        const firstPath = new Path(
            "M2 2H43C44.1046 2 45 2.89543 45 4V20C45 21.1046 44.1046 22 43 22H2C0.89543 22 0 21.1046 0 20V4C0 2.89543 0.89543 2 2 2Z",
            {
                stroke: stroke,
                strokeWidth: 1,
                fill: "transparent"
            }
        )

        const secondPath = new Path("M2 2V22", {
            stroke: stroke,
            strokeWidth: 1,
            fill: "transparent"
        })

        const thirdPath = new Path("M43 2V22", {
            stroke: stroke,
            strokeWidth: 1,
            fill: "transparent"
        })

        const predefinedProcess = new Group(
            [firstPath, secondPath, thirdPath],
            {
                left: x,
                top: y,
                width: 200,
                height: 100
            }
        )

        predefinedProcess.scaleX = 7
        predefinedProcess.scaleY = 5

        canvas?.add(predefinedProcess)
    }

    const addDocument = (x: number, y: number, stroke: string) => {
        const document = new Path(
            "M2 2H402V185.6C202 110.562 202 262.762 2 172.293V2Z",
            {
                left: x,
                top: y,
                fill: "transparent",
                stroke: stroke,
                strokeWidth: 4
            }
        )

        canvas?.add(document)
    }

    const addMultipleDocuments = (x: number, y: number, stroke: string) => {
        const firstDoc = new Path(
            "M30 2H430V185.599C230 110.566 230 262.759 30 172.295V2Z",
            {
                stroke: stroke,
                strokeWidth: 4,
                fill: ""
            }
        )
        const seconDoc = new Path(
            "M18.5 22.5H418.5V206.099C218.5 131.066 218.5 283.259 18.5 192.795V22.5Z",
            {
                stroke: stroke,
                strokeWidth: 4,
                fill: ""
            }
        )

        const thirdDoc = new Path(
            "M2 43H402V226.599C202 151.566 202 303.759 2 213.295V43Z",
            {
                stroke: stroke,
                strokeWidth: 4,
                fill: ""
            }
        )

        const documents = new Group([firstDoc, seconDoc, thirdDoc], {
            top: y,
            left: x,
            fill: "transparent",
            stroke: stroke,
            strokeWidth: 4
        })

        canvas?.add(documents)
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
        const preparation = new Path(
            "M55.3333 202L2 102L55.3333 2H348.667L402 102L348.667 202H55.3333Z",
            {
                stroke,
                strokeWidth: 4,
                top: y,
                left: x,
                fill: "transparent"
            }
        )
        canvas?.add(preparation)
    }

    const addDatabase = (x: number, y: number, stroke: string) => {
        const firstPath = new Path(
            "M2 27C2 39.5 84.5 52 189.5 52C294.5 52 377 39.5 377 27V177C377 189.5 294.5 202 189.5 202C84.5 202 2 189.5 2 177V27Z",
            {
                stroke,
                strokeWidth: 4,
                fill: "transparent"
            }
        )
        const secondPath = new Path(
            "M377 26.5C377 38.75 294.5 51 189.5 51C84.5 51 2 38.75 2 26.5C2 14.25 84.5 2 189.5 2C294.5 2 377 14.25 377 26.5Z",
            {
                stroke,
                strokeWidth: 4,
                fill: "transparent"
            }
        )

        const thirdPath = new Path(
            "M2 39C2 52 84.5 65 189.5 65C294.5 65 377 52 377 39",
            {
                stroke,
                strokeWidth: 4,
                fill: "transparent"
            }
        )
        const fourthPath = new Path(
            "M2 51C2 64.5 84.5 78 189.5 78C294.5 78 377 64.5 377 51",
            {
                stroke,
                strokeWidth: 4,
                fill: "transparent"
            }
        )

        const database = new Group(
            [firstPath, secondPath, thirdPath, fourthPath],
            {
                left: x,
                top: y
            }
        )

        canvas?.add(database)
    }

    const addDirectData = (x: number, y: number, stroke: string) => {
        const firstPath = new Path(
            "M34.087 202C18.7141 202 2 159.14 2 102C2 44.86 18.7141 2 34.087 2H371C354.957 2 338.913 44.86 338.913 102C338.913 159.14 354.957 202 371 202H34.087Z",
            {
                stroke,
                strokeWidth: 4,
                fill: ""
            }
        )

        const secondPath = new Path(
            "M370 202C354 202 338 159.14 338 102C338 44.86 354 2 370 2C386 2 402 44.86 402 102C402 159.14 386 202 370 202Z",
            {
                stroke,
                strokeWidth: 4,
                fill: ""
            }
        )

        const directData = new Group([firstPath, secondPath], {
            left: x,
            top: y
        })
        canvas?.add(directData)
    }

    const addInternalStorage = (x: number, y: number, stroke: string) => {
        const firstPath = new Path("M2 2H402V202H2V2Z", {
            stroke,
            strokeWidth: 4,
            fill: "transparent"
        })

        const secondPath = new Path("M55.3333 2V202", {
            stroke,
            strokeWidth: 4,
            fill: "transparent"
        })

        const thirdPath = new Path("M2 55.3333H402", {
            stroke,
            strokeWidth: 4,
            fill: "transparent"
        })

        const internalStorage = new Group([firstPath, secondPath, thirdPath], {
            top: y,
            left: x
        })

        canvas?.add(internalStorage)
    }

    const addManualLoop = (x: number, y: number, stroke: string) => {
        const manualLoop = new Path("M2 2L55.3333 202H348.667L402 2H2Z", {
            stroke,
            strokeWidth: 4,
            fill: "",
            top: y,
            left: x
        })
        canvas?.add(manualLoop)
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
        const storedData = new Path(
            "M103.333 202C50 202 2 159.14 2 102C2 44.86 50 2 103.333 2H402C339.778 68.6667 339.778 135.333 402 202H103.333Z",
            {
                left: x,
                top: y,
                fill: "transparent",
                stroke: stroke,
                strokeWidth: 4,
                width: 200,
                height: 100
            }
        )

        canvas?.add(storedData)
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
        const firstPath = new Path(
            "M102 202C157.228 202 202 157.228 202 102C202 46.7715 157.228 2 102 2C46.7715 2 2 46.7715 2 102C2 157.228 46.7715 202 102 202Z",
            {
                stroke,
                strokeWidth: 4,
                fill: "transparent"
            }
        )

        const secondPath = new Path("M102 2V202", {
            stroke,
            strokeWidth: 4,
            fill: "transparent"
        })
        const thirdPath = new Path("M202 102H2", {
            stroke,
            strokeWidth: 4,
            fill: "transparent"
        })

        const or = new Group([firstPath, secondPath, thirdPath], {
            top: y,
            left: x
        })
        canvas?.add(or)
    }

    const addSummingJunction = (x: number, y: number, stroke: string) => {
        const firstPath = new Path(
            "M102 202C157.228 202 202 157.228 202 102C202 46.7715 157.228 2 102 2C46.7715 2 2 46.7715 2 102C2 157.228 46.7715 202 102 202Z",
            {
                stroke,
                strokeWidth: 4,
                fill: "transparent"
            }
        )

        const secondPath = new Path("M31.5 31.5L171.5 171.5", {
            stroke,
            strokeWidth: 4,
            fill: "transparent"
        })

        const thirdPath = new Path("M175.5 35.5L35.5 175.5", {
            stroke,
            strokeWidth: 4,
            fill: "transparent"
        })

        const summingJunction = new Group([firstPath, secondPath, thirdPath], {
            left: x,
            top: y
        })

        canvas?.add(summingJunction)
    }

    const addDisplay = (x: number, y: number, stroke: string) => {
        const display = new Path(
            "M82 202L2 102L82 2H308.669C362 2 402 44.86 402 102C402 159.14 362 202 308.669 202H82Z",
            {
                left: x,
                top: y,
                fill: "transparent",
                stroke,
                strokeWidth: 4
            }
        )
        canvas?.add(display)
    }

    const addOffPageConnector = (x: number, y: number, stroke: string) => {
        const offPageConnector = new Path(
            "M1.99999 2.00001L2 102L102 202L202 102L202 2L1.99999 2.00001Z",
            {
                stroke: stroke,
                strokeWidth: 4,
                fill: "transparent",
                left: x,
                top: y
            }
        )

        canvas?.add(offPageConnector)
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
