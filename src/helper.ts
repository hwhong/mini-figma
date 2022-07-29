export interface Point {
  x: number;
  y: number;
}

export interface Rectangle {
  left: number;
  top: number;
  width: number;
  height: number;
}

export const calculateSelectionBox = (startPoint: Point, endPoint: Point) => {
  const left = Math.min(startPoint.x, endPoint.x);
  const top = Math.min(startPoint.y, endPoint.y);
  const width = Math.abs(startPoint.x - endPoint.x);
  const height = Math.abs(startPoint.y - endPoint.y);

  return { left, top, width, height };
};

export const isPointInRect = (x: number, y: number, rectangle: Rectangle) => {
  const { left, top, width, height } = rectangle;
  if (x < left || x > left + width || y < top || y > top + height) {
    return false;
  }
  return true;
};
