import React, { useRef, useEffect } from "react";
import styles from "./app.module.css";
// import { useCanvasObject } from "./hook";

function App() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

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
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (canvas && ctx) {
      ctx.fillStyle = "#FF0000";
      ctx.fillRect(event.screenX, event.screenY, 5, 5);
    }
    console.log(event);
  };

  return (
    <div className={styles.root}>
      <canvas ref={canvasRef} onMouseDown={onMouseDown} />
    </div>
  );
}

export default App;
