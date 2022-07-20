import React, { useRef, useEffect, useState } from "react";
import styles from "./app.module.css";
// import { useCanvasObject } from "./hook";

function App() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [startPoint, setStartPoint] = useState({ x: 0, y: 0 });
  const [endPoint, setEndPoint] = useState({ x: 0, y: 0 });

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
  }, []);

  const onMouseDown = (event: any) => {
    setIsMouseDown(true);
    setStartPoint({ x: event.pageX, y: event.pageY });
  };

  const onMouseMove = (event: any) => {
    event.preventDefault();
    if (isMouseDown) {
      var endPoint = {
        x: event.pageX,
        y: event.pageY,
      };

      setEndPoint(endPoint);
    }
  };

  const onMouseUp = () => {
    const left = Math.min(startPoint.x, endPoint.x);
    const top = Math.min(startPoint.y, endPoint.y);
    const width = Math.abs(startPoint.x - endPoint.x);
    const height = Math.abs(startPoint.y - endPoint.y);

    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (canvas && ctx) {
      ctx.fillStyle = "#FF0000";
      ctx.fillRect(left, top, width, height);
    }
  };

  return (
    <div className={styles.root}>
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
