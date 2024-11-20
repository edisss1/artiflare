import { setSelectedShape } from "../redux/slices/shapeManagementSlice"
import { AppDispatch } from "../redux/store"

export const updateSelectedShape = (
    shape: string | null,
    dispatch: AppDispatch,
    selectedShapeRef: React.MutableRefObject<string | null>
) => {
    dispatch(setSelectedShape(shape))
    selectedShapeRef.current = shape
}
