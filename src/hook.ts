export const useCanvasObject = (
  canvasRef: React.RefObject<HTMLCanvasElement>
) => {
  const canvas = canvasRef.current;
  const ctx = canvas?.getContext("2d");
  return canvas && ctx ? [canvas, ctx] : undefined;
};
