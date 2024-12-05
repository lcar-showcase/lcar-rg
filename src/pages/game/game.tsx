import Board from "../../components/board/board";
import { initBoardArray } from "../../components/board/tileLabels";
import Logo from "../../components/logo/logo";

// Initialise all 64 Tile labels
const boardArray = initBoardArray();

function Game() {
  return (
    <>
      <Logo />
      <Board boardArray={boardArray} />
    </>
  );
}

export default Game;
