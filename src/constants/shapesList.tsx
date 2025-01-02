import CircleIcon from "../components/icons/shapes/CircleIcon"
import Decision from "../components/icons/shapes/flowchart/Decision"
import PredefinedProcess from "../components/icons/shapes/flowchart/PredefinedProcess"
import Process from "../components/icons/shapes/flowchart/Process"
import Terminator from "../components/icons/shapes/flowchart/Terminator"
import FlowchartIcon from "../components/icons/shapes/FlowchartIcon"
import LineIcon from "../components/icons/shapes/LineIcon"
import PencilIcon from "../components/icons/shapes/PencilIcon"
import RectangleIcon from "../components/icons/shapes/RectangleIcon"
import RhombusIcon from "../components/icons/shapes/RhombusIcon"
import ShapesIcon from "../components/icons/shapes/ShapesIcon"
import StarIcon from "../components/icons/shapes/StarIcon"
import TextIcon from "../components/icons/shapes/TextIcon"
import TriangleIcon from "../components/icons/shapes/TriangleIcon"
import { AppDispatch } from "../redux/store"
import { updateSelectedShape } from "../utils/updateSelectedShape"
import Document from "../components/icons/shapes/flowchart/Document"
import MultipleDocuments from "../components/icons/shapes/flowchart/MultipleDocuments"
import InputOutput from "../components/icons/shapes/flowchart/InputOutput"
import Preparation from "../components/icons/shapes/flowchart/Preparation"
import Database from "../components/icons/shapes/flowchart/Database"
import DirectData from "../components/icons/shapes/flowchart/DirectData"
import InternalStorage from "../components/icons/shapes/flowchart/InternalStorage"
import ManualLoop from "../components/icons/shapes/flowchart/ManualLoop"
import Delay from "../components/icons/shapes/flowchart/Delay"
import Connector from "../components/icons/shapes/flowchart/Connector"
import Display from "../components/icons/shapes/flowchart/Display"
import Merge from "../components/icons/shapes/flowchart/Merge"
import OffPageConnector from "../components/icons/shapes/flowchart/OffPageConnector"
import Or from "../components/icons/shapes/flowchart/Or"
import StoredData from "../components/icons/shapes/flowchart/StoredData"
import SummingJunction from "../components/icons/shapes/flowchart/SummingJunction"

interface ShapeFunction {
    label: JSX.Element
    fn: () => void
}

interface ShapesList {
    icon: JSX.Element
    fn: ShapeFunction[]
}

export const shapesListFunc = (
    dispatch: AppDispatch,
    selectedShapeRef: React.MutableRefObject<string | null>
) => {
    const shapesList: ShapesList[] = [
        {
            icon: <ShapesIcon />,
            fn: [
                {
                    label: <RectangleIcon />,
                    fn: () =>
                        updateSelectedShape(
                            "rectangle",
                            dispatch,
                            selectedShapeRef
                        )
                },
                {
                    label: <CircleIcon />,
                    fn: () =>
                        updateSelectedShape(
                            "circle",
                            dispatch,
                            selectedShapeRef
                        )
                },
                {
                    label: <TriangleIcon />,
                    fn: () =>
                        updateSelectedShape(
                            "triangle",
                            dispatch,
                            selectedShapeRef
                        )
                },
                {
                    label: <RhombusIcon />,
                    fn: () =>
                        updateSelectedShape(
                            "rhombus",
                            dispatch,
                            selectedShapeRef
                        )
                },
                {
                    label: <StarIcon />,
                    fn: () =>
                        updateSelectedShape("star", dispatch, selectedShapeRef)
                }
            ]
        },
        {
            icon: <PencilIcon />,
            fn: [
                {
                    label: <PencilIcon />,
                    fn: () =>
                        updateSelectedShape(
                            "pencil",
                            dispatch,
                            selectedShapeRef
                        )
                },
                {
                    label: <LineIcon />,
                    fn: () =>
                        updateSelectedShape("line", dispatch, selectedShapeRef)
                }
            ]
        },
        {
            icon: <TextIcon />,
            fn: [
                {
                    label: <TextIcon />,
                    fn: () =>
                        updateSelectedShape("text", dispatch, selectedShapeRef)
                }
            ]
        },
        {
            icon: <FlowchartIcon />,
            fn: [
                {
                    label: <Process />,
                    fn: () =>
                        updateSelectedShape(
                            "process",
                            dispatch,
                            selectedShapeRef
                        )
                },
                {
                    label: <Decision />,
                    fn: () =>
                        updateSelectedShape(
                            "decision",
                            dispatch,
                            selectedShapeRef
                        )
                },
                {
                    label: <Terminator />,
                    fn: () =>
                        updateSelectedShape(
                            "terminator",
                            dispatch,
                            selectedShapeRef
                        )
                },
                {
                    label: <PredefinedProcess />,
                    fn: () =>
                        updateSelectedShape(
                            "predefined",
                            dispatch,
                            selectedShapeRef
                        )
                },
                {
                    label: <Document />,
                    fn: () =>
                        updateSelectedShape(
                            "document",
                            dispatch,
                            selectedShapeRef
                        )
                },
                {
                    label: <MultipleDocuments />,
                    fn: () =>
                        updateSelectedShape(
                            "documents",
                            dispatch,
                            selectedShapeRef
                        )
                },
                {
                    label: <InputOutput />,
                    fn: () =>
                        updateSelectedShape("input", dispatch, selectedShapeRef)
                },
                {
                    label: <Preparation />,
                    fn: () =>
                        updateSelectedShape(
                            "preparation",
                            dispatch,
                            selectedShapeRef
                        )
                },
                {
                    label: <Database />,
                    fn: () =>
                        updateSelectedShape(
                            "database",
                            dispatch,
                            selectedShapeRef
                        )
                },
                {
                    label: <DirectData />,
                    fn: () =>
                        updateSelectedShape(
                            "direct",
                            dispatch,
                            selectedShapeRef
                        )
                },
                {
                    label: <InternalStorage />,
                    fn: () =>
                        updateSelectedShape(
                            "internal",
                            dispatch,
                            selectedShapeRef
                        )
                },
                {
                    label: <ManualLoop />,
                    fn: () =>
                        updateSelectedShape(
                            "manual",
                            dispatch,
                            selectedShapeRef
                        )
                },
                {
                    label: <Delay />,
                    fn: () =>
                        updateSelectedShape("delay", dispatch, selectedShapeRef)
                },
                {
                    label: <StoredData />,
                    fn: () =>
                        updateSelectedShape(
                            "stored",
                            dispatch,
                            selectedShapeRef
                        )
                },
                {
                    label: <Merge />,
                    fn: () =>
                        updateSelectedShape("merge", dispatch, selectedShapeRef)
                },
                {
                    label: <Connector />,
                    fn: () =>
                        updateSelectedShape(
                            "connector",
                            dispatch,
                            selectedShapeRef
                        )
                },
                {
                    label: <Or />,
                    fn: () =>
                        updateSelectedShape("or", dispatch, selectedShapeRef)
                },
                {
                    label: <SummingJunction />,
                    fn: () =>
                        updateSelectedShape("sum", dispatch, selectedShapeRef)
                },
                {
                    label: <Display />,
                    fn: () =>
                        updateSelectedShape(
                            "display",
                            dispatch,
                            selectedShapeRef
                        )
                },
                {
                    label: <OffPageConnector />,
                    fn: () =>
                        updateSelectedShape("off", dispatch, selectedShapeRef)
                }
            ]
        }
    ]

    return shapesList
}
