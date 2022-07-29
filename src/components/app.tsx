import React from "react";
import styles from "./app.module.css";
import Canvas from "./canvas";
import { Toolbar } from "./toolbar";

function App() {
  return (
    <div className={styles.root}>
      <Toolbar />
      <Canvas />
    </div>
  );
}

export default App;
