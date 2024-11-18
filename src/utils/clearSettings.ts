import {
  setDiameter,
  setHeight,
  setWidth,
} from "../redux/slices/shapeManagementSlice.ts";
import { AppDispatch } from "../redux/store.ts";

export const clearSettings = (dispatch: AppDispatch) => {
  dispatch(setWidth(""));
  dispatch(setHeight(""));
  dispatch(setDiameter(""));
};
