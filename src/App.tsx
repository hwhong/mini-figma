import React, { useRef, useEffect, useState } from "react";
import styles from "./app.module.css";
import {
  calculateSelectionBox,
  Point,
  isPointInRect,
  Rectangle,
} from "./helper";
// import { useCanvasObject } from "./hook";
// import { debounce, throttle } from "lodash";

function App() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [startPoint, setStartPoint] = useState<Point | null>(null);
  const [endPoint, setEndPoint] = useState<Point | null>(null);
  const [rectangles, setRectangles] = useState<Rectangle[]>([]);

  const [selectionBox, setSelectionBox] = useState<Rectangle | null>(null);

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
    }
  };

  const onMouseDown = (event: any) => {
    const x = event.pageX;
    const y = event.pageY;
    setIsMouseDown(true);
    setStartPoint({ x, y });

    let isPointInRec: boolean = false;
    if (rectangles.length) {
      rectangles.forEach((rec) => {
        if (isPointInRect(x, y, rec)) {
          isPointInRec = true;
          setSelectionBox(rec);
        }
      });
    }

    // case when click is directly on canvas and not on element
    if (!isPointInRec) {
      setSelectionBox(null);
    }
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
      setRectangles([...rectangles, { left, top, width, height }]);
      // setSelectionBox(null);
    }
  };

  // let selectionBox = null;
  // if (startPoint && endPoint) {
  //   selectionBox = calculateSelectionBox(startPoint, endPoint);
  // }
  return (
    <div className={styles.root}>
      {selectionBox && (
        <div className={styles.selectionBox} style={selectionBox} />
      )}
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
