import { Canvas } from "fabric";
import React, { useCallback, useEffect, useState } from "react";
import {
  setWidth,
  setHeight,
  setColor,
  setDiameter,
  setStroke,
} from "../../redux/slices/shapeManagementSlice";
import SettingsInput from "../atoms/SettingsInput";
import Button from "../atoms/Button";

interface SettingProps {
  canvas: Canvas | null;
  dispatch: any;
  width: string | number;
  height: string | number;
  diameter: string | number;
  fill: string;
  stroke: string;
}

const ShapeParameters = ({
  canvas,
  dispatch,
  width,
  height,
  fill,
  diameter,
  stroke,
}: SettingProps) => {
  const [selectedObject, setSelectedObject] = useState<any>(null);
  const [settingsPosition, setSettingsPosition] = useState({ top: 0, left: 0 });
  const handleObjectSelection = (object: any) => {
    if (!object) return;

    const boundingRect = object.getBoundingRect();

    console.log(boundingRect);

    setSettingsPosition({
      top: boundingRect.top,
      left: boundingRect.left,
    });

    setSelectedObject(object);

    switch (object.type) {
      case "rect":
        dispatch(setWidth(Math.round(object.width * object.scaleX)));
        dispatch(setHeight(Math.round(object.height * object.scaleY)));
        dispatch(setColor(object.fill));
        dispatch(setDiameter(""));
        break;
      case "circle":
        dispatch(setDiameter(Math.round(object.radius * 2 * object.scaleX)));
        dispatch(setColor(object.fill));
        dispatch(setWidth(""));
        dispatch(setHeight(""));
        break;
    }
  };

  const handleWidthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const widthValue = parseInt(e.target.value.replace(/,/g, ""), 10);

    dispatch(setWidth(widthValue));

    if (
      (!selectedObject && selectedObject?.type !== "rect") ||
      (selectedObject.type === "group" && !widthValue)
    )
      return;
    selectedObject.set({
      width: isNaN(widthValue) ? 0 : widthValue / selectedObject.scaleX,
    });
    canvas?.renderAll();
  };
  const handleHeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const heightValue = parseInt(e.target.value.replace(/,/g, ""), 10);

    dispatch(setHeight(heightValue));

    if (
      (!selectedObject && selectedObject?.type !== "rect") ||
      (selectedObject.type && heightValue === 0)
    )
      return;

    selectedObject.set({
      height: isNaN(heightValue) ? 0 : heightValue / selectedObject.scaleY,
    });
    canvas?.renderAll();
  };

  const handleDiameterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const diameterValue = parseInt(e.target.value.replace(/,/, ""), 10);

    dispatch(setDiameter(diameterValue));

    if (!selectedObject && selectedObject.type !== "circle" && !diameterValue)
      return;

    selectedObject.set({ radius: diameterValue / 2 / selectedObject.scaleX });
    canvas?.renderAll();
  };

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const colorValue = e.target.value;
    dispatch(setColor(colorValue));

    if (!selectedObject) return;
    selectedObject.set({ fill: colorValue });
    canvas?.renderAll();
  };

  const handleStrokeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const strokeValue = e.target.value;
    dispatch(setStroke(strokeValue));

    if (!selectedObject) return;
    selectedObject.set({ stroke: strokeValue });
    canvas?.renderAll();
  };

  const clearSettings = () => {
    dispatch(setWidth(""));
    dispatch(setHeight(""));
    dispatch(setDiameter(""));
  };

  useEffect(() => {
    if (!canvas) return;

    canvas.on("selection:created", (e) => {
      handleObjectSelection(e.selected[0]);
    });
    canvas.on("selection:updated", (e) => {
      handleObjectSelection(e.selected[0]);
    });
    canvas.on("selection:cleared", () => {
      setSelectedObject(null);
      clearSettings();
    });

    canvas.on("object:modified", (e) => {
      handleObjectSelection(e.target);
    });
  }, [canvas]);

  const deleteSelectedObject = () => {
    if (canvas && selectedObject) {
      canvas.remove(selectedObject);
      canvas.renderAll();
    }
  };

  const handleKeyPress = useCallback(
    (e: globalThis.KeyboardEvent) => {
      switch (e.key) {
        case "Delete":
          deleteSelectedObject();
          break;
      }
    },
    [deleteSelectedObject],
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [handleKeyPress]);

  return (
    <aside
      style={{
        position: "absolute",
        top: settingsPosition.top,
        left: settingsPosition.left,
      }}
      className={`${
        !selectedObject
          ? "hidden"
          : "flex items-center bg-primary z-40 border-2 border-black p-4 -translate-y-[120%] -translate-x-[25%] text-typography-light"
      }`}
    >
      {selectedObject && selectedObject.type === "rect" && (
        <div className="flex gap-2 items-center">
          <SettingsInput
            type="number"
            value={width}
            onChange={(e) => handleWidthChange(e)}
            id="width"
            label="Width"
          />
          <SettingsInput
            value={height}
            onChange={(e) => handleHeightChange(e)}
            id="height"
            label="Height"
            type="number"
          />
          <div className="flex gap-4">
            <SettingsInput
              value={fill}
              onChange={(e) => handleColorChange(e)}
              id="color"
              label="Color"
              type="color"
              className=""
            />
            <SettingsInput
              value={stroke}
              onChange={(e) => handleStrokeChange(e)}
              id="stroke"
              label="Stroke"
              type="color"
              className="color-swatch"
            />
          </div>
          <Button
            className="border-2 border-typography-light mt-4 py-2 px-4 rounded-md hover:bg-bg-dark hover:text-typography-dark transition-all duration-150"
            children="Delete"
            onClick={deleteSelectedObject}
          />
        </div>
      )}
      {selectedObject && selectedObject.type === "circle" && (
        <div className="flex gap-2 ">
          <SettingsInput
            value={diameter}
            onChange={(e) => handleDiameterChange(e)}
            type="number"
            id="Diameter"
            label="Diameter"
          />
          <SettingsInput
            value={fill}
            onChange={(e) => handleColorChange(e)}
            id="color"
            label="Color"
            type="color"
            className="bg-transparent outline-none border-none w-8 "
          />
          <Button
            className="border-2 border-typography-light mt-4 py-2 px-4 rounded-md hover:bg-bg-dark hover:text-typography-dark transition-all duration-150"
            children="Delete"
            onClick={deleteSelectedObject}
          />
        </div>
      )}
    </aside>
  );
};
export default ShapeParameters;
