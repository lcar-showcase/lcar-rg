import { Link } from "react-router";
import Board, { cols, rows } from "../../components/board";
import { DiskColour } from "../../types";
import style from "./game.module.css";

// Initialise 8 by 8 board, no disks on each tile
const boardArray: DiskColour[][] = Array.from({ length: rows.length }, () =>
  Array.from({ length: cols.length }, () => null)
);

// Set default disks
boardArray[3][3] = "light";
boardArray[4][4] = "light";
boardArray[3][4] = "dark";
boardArray[4][3] = "dark";

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
