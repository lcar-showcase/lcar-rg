import { useState } from "react";
import { Link } from "react-router";
import Board from "../../components/board";
import { TileState } from "../../types";
import style from "./game.module.css";
import "../../index.css";

// Initialise 8 by 8 board, no disks on each tile
const initBoardArray: TileState[][] = Array.from({ length: 8 }, () => Array.from({ length: 8 }, () => null));

// Initialise default disks
// TODO: Add configurations in a separate file to test the game in the future
initBoardArray[3][3] = "light";
initBoardArray[4][4] = "light";
initBoardArray[3][4] = "dark";
initBoardArray[4][3] = "dark";

function Game() {
  // * Not defining a set function yet, as I'm not using it and ESLint is complaining
  const [boardArr] = useState(initBoardArray);

  return (
    <>
      <Link to="/" className={style.backToMenuContainer}>
        <img src="/images/back_arrow.png" alt="back" />
        <h1>
          {/* Spaced using flex and gap; letter-spacing does not work due to flipped E */}
          <span>R</span>
          <span>E</span>
          <span>V</span>
          <span className={style.flipped}>E</span>
          <span>R</span>
          <span>S</span>
          <span>I</span>
        </h1>
      </Link>
      <Board boardArray={boardArr} />
    </>
  );
}

export default Game;
