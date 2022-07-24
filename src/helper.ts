export interface Point {
  x: number;
  y: number;
}

export const calculateSelectionBox = (startPoint: Point, endPoint: Point) => {
  const left = Math.min(startPoint.x, endPoint.x);
  const top = Math.min(startPoint.y, endPoint.y);
  const width = Math.abs(startPoint.x - endPoint.x);
  const height = Math.abs(startPoint.y - endPoint.y);

  return { left, top, width, height };
};
