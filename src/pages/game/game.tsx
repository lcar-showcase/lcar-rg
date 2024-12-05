import { Link } from "react-router";
import Board from "../../components/board/board";
import { initBoardArray } from "../../components/board/tileLabels";
import style from "./game.module.css";

// Initialise all 64 Tile labels
const boardArray = initBoardArray();

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
