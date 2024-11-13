import { Canvas, Circle, Group, Polyline, Rect, PencilBrush } from "fabric";

export interface CustomGroup extends Group {
  shapeType?: string;
}

export function useShapes(canvas: Canvas | null) {
  const addRectangle = (
    x: number,
    y: number,
    fill: string,
    stroke: string,
    strokeWidth: number,
  ) => {
    if (!canvas) return;

    const rect = new Rect({
      width: 100,
      height: 100,
      left: x,
      top: y,
      fill: fill,
      stroke: stroke,
      strokeWidth: strokeWidth,
    });

    canvas.add(rect);
  };

  const addCircle = (x: number, y: number) => {
    if (!canvas) return;

    const circle = new Circle({
      width: 100,
      height: 100,
      radius: 50,
      top: y,
      left: x,
      fill: null,
      stroke: "#333333",
      strokeWidth: 2,
      opacity: 100,
    });

    canvas.add(circle);
  };

  const addPolygon = () => {
    if (!canvas) return;
    const polygon = new Polyline(
      [
        { x: 10, y: 10 },
        { x: 50, y: 30 },
        { x: 40, y: 70 },
        { x: 60, y: 50 },
        { x: 100, y: 150 },
        { x: -40, y: -100 },
      ],
      {
        stroke: "red",
        left: 100,
        top: 100,
      },
    );

    canvas.add(polygon);
  };

  const addFreeDrawing = (brushWidth: number, brushColor: string) => {
    if (!canvas) return;

    canvas.isDrawingMode = true;
    canvas.freeDrawingBrush = new PencilBrush(canvas);
    canvas.freeDrawingBrush.color = brushColor;
    canvas.freeDrawingBrush.width = brushWidth;
  };

  return {
    addRectangle,
    addCircle,
    addPolygon,
    addFreeDrawing,
  };
}
