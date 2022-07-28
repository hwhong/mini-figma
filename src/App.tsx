import React, {
  useRef,
  useEffect,
  useState,
  useMemo,
  useCallback,
} from "react";
import styles from "./app.module.css";
import { calculateSelectionBox, Point } from "./helper";
// import { useCanvasObject } from "./hook";
import { debounce, throttle } from "lodash";

interface SelectionBox {
  left: number;
  top: number;
  width: number;
  height: number;
}

function App() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [startPoint, setStartPoint] = useState<Point | null>(null);
  const [endPoint, setEndPoint] = useState<Point | null>(null);
  // const [selectionBox, setSelectionBox] = useState<SelectionBox | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (canvas && ctx) {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      if (ctx) {
        ctx.fillStyle = "#E5E5E5";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }
    }
  }, [canvasRef]);

  const onMouseMove = (event: any) => {
    event.preventDefault();
    if (isMouseDown && startPoint) {
      const endPoint = {
        x: event.pageX,
        y: event.pageY,
      };

      setEndPoint({ ...endPoint });
      // setSelectionBox(selectionBox);
    }
  };

  const onMouseDown = (event: any) => {
    setIsMouseDown(true);
    setStartPoint({ x: event.pageX, y: event.pageY });
  };

  const onMouseUp = () => {
    setIsMouseDown(false);
    console.log("IS UP");
    if (startPoint && endPoint) {
      const { left, top, width, height } = calculateSelectionBox(
        startPoint,
        endPoint
      );

      const canvas = canvasRef.current;
      const ctx = canvas?.getContext("2d");
      if (canvas && ctx) {
        ctx.fillStyle = "#D9D9D9";
        ctx.fillRect(left, top, width, height);
      }

      setStartPoint(null);
      setEndPoint(null);
      // setSelectionBox(null);
    }
  };

  // let selectionBox = null;
  // if (startPoint && endPoint) {
  //   selectionBox = calculateSelectionBox(startPoint, endPoint);
  // }
  return (
    <div className={styles.root}>
      {/* {!isMouseDown && startPoint && endPoint && selectionBox && (
        <div className={styles.selectionBox} style={selectionBox} />
      )} */}
      <canvas
        ref={canvasRef}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
      />
    </div>
  );
}

export default App;
