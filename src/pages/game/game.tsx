import { Link } from "react-router";
import { Board, rows, cols } from "../../components";
import { DiskColour } from "../../types";
import style from "./game.module.css";

// Initialise 8 by 8 board, no disks on each tile
const boardArray: DiskColour[][] = Array.from({ length: rows.length }, () =>
  Array.from({ length: cols.length }, () => null)
);

// Set default disks
boardArray[rows.indexOf("4")][cols.indexOf("D")] = "light";
boardArray[rows.indexOf("5")][cols.indexOf("E")] = "light";
boardArray[rows.indexOf("4")][cols.indexOf("E")] = "dark";
boardArray[rows.indexOf("5")][cols.indexOf("D")] = "dark";

function Game() {
  return (
    <>
      <Link to="/" className={style.logo}>
        REVERSI
      </Link>
      <Board boardArray={boardArray} />
    </>
  );
}

export default Game;
