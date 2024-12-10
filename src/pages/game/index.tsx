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
// initBoardArray[3][3] = "light";
// initBoardArray[4][4] = "light";
// initBoardArray[3][4] = "dark";
// initBoardArray[4][3] = "dark";
initBoardArray[1][0] = "light";
initBoardArray[1][1] = "dark";
initBoardArray[7][7] = "dark";

// Direction change when checking for valid tiles
interface Direction {
  x: number; // x-axis
  y: number; // y-axis
}

// All directions to check (8 total)
const directions: Direction[] = [
  // North
  {
    x: 0,
    y: 1,
  },
  // North-east
  {
    x: 1,
    y: 1,
  },
  // East
  {
    x: 1,
    y: 0,
  },
  // South-east
  {
    x: 1,
    y: -1,
  },
  // South
  {
    x: 0,
    y: -1,
  },
  // South-west
  {
    x: -1,
    y: -1,
  },
  // West
  {
    x: -1,
    y: 0,
  },
  // North-west
  {
    x: -1,
    y: 1,
  },
];

function Game() {
  // * Not defining a set function yet, as I'm not using it and ESLint is complaining
  const [boardArr, setBoardArray] = useState(initBoardArray);
  const [turn, setTurn] = useState(0);
  const boardCopy = boardArr.slice();
  const currPlayer = turn % 2 === 0 ? "dark" : "light";
  const nextPlayer = turn % 2 === 0 ? "light" : "dark";

  function withinBounds(row: number, col: number) {
    return row <= boardCopy.length - 1 && col <= boardCopy.length - 1;
  }

  function checkValid(): boolean {
    // Clear previously valid tiles
    boardCopy.forEach((row, rowId) =>
      row.forEach((_tile, colId) => {
        if (boardCopy[rowId][colId] === "valid") {
          boardCopy[rowId][colId] = null;
        }
      })
    );

    // Check valid tiles for next player
    let hasValid = false;
    boardCopy.forEach((row, rowId) =>
      row.forEach((tile, colId) => {
        // Find next player's tiles
        if (tile === currPlayer) {
          // Check in each direction (8 total) for lines to capture
          directions.forEach((direction) => {
            const { x: changeX, y: changeY } = direction;
            let checkingCol = colId + changeX; // Start from next tile
            let checkingRow = rowId + changeY;
            let encounterOpp = false;
            while (withinBounds(checkingRow, checkingCol)) {
              // Keep going towards direction of change
              if (boardCopy[checkingRow][checkingCol] === nextPlayer) {
                // Encountered current (opponent) player; keep going
                encounterOpp = true;
                checkingCol += changeX;
                checkingRow += changeY;
              } else if (boardCopy[checkingRow][checkingCol] === null && encounterOpp) {
                // Current tile is null AND all previous tiles occupied by current (opponent) player; valid tile
                boardCopy[checkingRow][checkingCol] = "valid";
                hasValid = true;
                break;
              } else {
                // Line cannot be valid (Opponent player not encountered)
                break;
              }
            }
          });
        }
      })
    );
    return hasValid;
  }

  const handleTurn = (row: number, col: number) => {
    boardCopy[row][col] = currPlayer;
    setTurn(turn + 1);
    setBoardArray(boardCopy);
  };

  if (!checkValid()) {
    // TODO: Handle win condition when both players have no valid moves
    setTurn(turn + 1);
  }

  return (
    <>
      <Link to="/" className={style.logo}>
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
      <p>{turn}</p>
      <p>{currPlayer}</p>
      <Board boardArray={boardArr} handleTurn={handleTurn} />
    </>
  );
}

export default Game;
