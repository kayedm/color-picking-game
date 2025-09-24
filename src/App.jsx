import React from "react";
import styles from "./App.module.css";
import { motion } from "framer-motion";

function App() {

    const size = 8;
    const title = "Click a color".replace(/ /g, "\u00A0").split("");


    const [round, setRound] = React.useState(0);
    const [delta, setDelta] = React.useState(30);
    const [grid, setGrid] = React.useState(() =>
        Array.from({ length: size }, () =>
            Array.from({ length: size }, () => Math.random() < 0.1)
        )
    );

    React.useEffect(() => {
        if (!grid.some(row => row.some(cell => cell))) {
            setDelta(prev => Math.max(10, prev - 5));
            setGrid(Array.from({ length: size }, () =>
                Array.from({ length: size }, () => Math.random() < 0.1)
            ));
            setRound(prev => prev + 1);
        }
    }, [grid]);

  function handleChange(rowIndex, colIndex) {
    setGrid(prev =>
        prev.map((row, i) =>
            row.map((cell, j) =>
                i === rowIndex && j === colIndex ? !cell : cell
            )
        )
    );
  }

    const createGradientArray = grid.map((row, i) =>
        row.map((cell, j) => {
            const r = 30 * i;
            const g = 30 * j;
            const b = 100;
            return `rgb(${r}, ${g}, ${b})`;
        })
    );

    function lighten(rgb) {
        const [r, g, b] = rgb.match(/\d+/g).map(Number);
        const clamp = n => Math.max(0, Math.min(255, n));
        return `rgb(${clamp(r + delta)}, ${clamp(g + delta)}, ${clamp(b + delta)})`;
    }

  return (

      <div className={styles.wrapper}>
          <div className={styles.title} style={{ display: "flex", gap: "0.em" } }>
              {title.map((char, i) => (
                  <motion.span
                      key={i}
                      initial={{ y: 0, scale: 1 }}
                      animate={{ y: [-5, 1.0, -5, 0], scale: [1, 1.1, 0.95, 1] }}
                      transition={{
                          duration: 2,
                          ease: "easeInOut",
                          repeat: Infinity,
                          repeatType: "loop",
                          delay: i * 0.1 // wave offset
                      }}
                      style={{
                          fontSize: "5rem",
                          fontFamily: "Luckiest Guy, cursive",
                          color: "#ffe8a6",
                          WebkitTextStroke: "4px black",
                          textShadow: "2px 2px 0 #ffb347, 6px 6px 0 rgba(0,0,0,0.5)",
                      }}
                  >
                      {char}
                  </motion.span>
              ))}
          </div>

          <div className={styles.borderWrapper}>
              <motion.div
                  className={styles.animatedBorder}
                  animate={{ scale: [1, 1.01, 1] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              />

              <div className={styles.gridWrapper}>
                  {grid.map((row, i) => (
                      <div key={i} className={styles.grid}>
                          {row.map((col, j) => (
                              <label
                                  key={j}
                                  className={styles.item}
                                  style={{
                                      backgroundColor: col
                                          ? lighten(createGradientArray[i][j])
                                          : createGradientArray[i][j]
                                  }}
                              >
                                  <input
                                      className={styles.checkbox}
                                      type="checkbox"
                                      onChange={() => handleChange(i, j)}
                                  />
                              </label>
                          ))}
                      </div>
                  ))}
              </div>
          </div>


          <div>Round {round}</div>
        {console.log(grid)}

      </div>
  )
}

export default App
