import { AppDispatch } from "../redux/store.ts";
import React from "react";

export const updateSelectedShape = (
  shape: string | null,
  dispatch: AppDispatch,
  setSelectedShape: any,
  selectedShapeRef: React.MutableRefObject<string | null>,
) => {
  dispatch(setSelectedShape(shape));
  selectedShapeRef.current = shape;
};
