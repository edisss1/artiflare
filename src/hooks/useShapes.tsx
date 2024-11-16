import {
  Canvas,
  Circle,
  Group,
  Rect,
  PencilBrush,
  Triangle,
  Polygon,
} from "fabric";

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

  const addTriangle = (
    x: number,
    y: number,
    fill: string,
    stroke: string,
    strokeWidth: number,
  ) => {
    if (!canvas) return;
    const triangle = new Triangle({
      width: 100,
      height: 100,
      fill: fill,
      stroke: stroke,
      strokeWidth: strokeWidth,
      top: y,
      left: x,
      opacity: 100,
    });

    canvas.add(triangle);
  };

  const addFreeDrawing = (brushWidth: number, brushColor: string) => {
    if (!canvas) return;

    canvas.isDrawingMode = true;
    canvas.freeDrawingBrush = new PencilBrush(canvas);
    canvas.freeDrawingBrush.color = brushColor;
    canvas.freeDrawingBrush.width = brushWidth;
  };

  const addRhombus = (
    x: number,
    y: number,
    fill: string,
    stroke: string,
    strokeWidth: number,
  ) => {
    if (!canvas) return;

    const rhombusPoints = [
      { x: x, y: y }, // Top vertex
      { x: x + 100, y: y + 100 }, // Right vertex
      { x: x, y: y + 200 }, // Bottom vertex
      { x: x - 100, y: y + 100 }, // Left vertex
    ];

    const rhombus = new Polygon(rhombusPoints, {
      fill: fill,
      stroke: stroke,
      strokeWidth: strokeWidth,
    });

    canvas.add(rhombus);
  };

  const addStar = (
    x: number,
    y: number,
    fill: string,
    stroke: string,
    strokeWidth: number,
  ) => {
    if (!canvas) return;

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
      { x: x - 38, y: y - 30 }, // Inner left
    ];

    const star = new Polygon(starPoints, {
      fill: fill,
      stroke: stroke,
      strokeWidth: strokeWidth,
    });

    canvas.add(star);
  };

  return {
    addRectangle,
    addCircle,
    addFreeDrawing,
    addTriangle,
    addRhombus,
    addStar,
  };
}
