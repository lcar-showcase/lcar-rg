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
initBoardArray[3][2] = "valid";

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

  function withinBounds(row: number, col: number) {
    return row <= boardArr.length - 1 && col <= boardArr.length - 1;
  }

  function checkValid(nextPlayer: TileState, currPlayer: TileState) {
    // Clear previously valid tiles
    boardArr.forEach((row, rowId) =>
      row.forEach((_tile, colId) => {
        if (boardArr[rowId][colId] === "valid") {
          boardArr[rowId][colId] = null;
        }
      })
    );

    // Check valid tiles for next player
    boardArr.forEach((row, rowId) =>
      row.forEach((tile, colId) => {
        // Find next player's tiles
        if (tile === nextPlayer) {
          // Check in each direction (8 total) for lines to capture
          directions.forEach((direction) => {
            const { x: changeX, y: changeY } = direction;
            let checkingCol = colId + changeX; // Start from next tile
            let checkingRow = rowId + changeY;
            let encounterOpp = false;
            while (withinBounds(checkingRow, checkingCol)) {
              // Keep going towards direction of change
              if (boardArr[checkingRow][checkingCol] === currPlayer) {
                // Encountered current (opponent) player; keep going
                encounterOpp = true;
                checkingCol += changeX;
                checkingRow += changeY;
              } else if (boardArr[checkingRow][checkingCol] === null && encounterOpp) {
                // Current tile is null AND all previous tiles occupied by current (opponent) player; valid tile
                boardArr[checkingRow][checkingCol] = "valid";
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
  }

  if (turn === 0) {
    checkValid("dark", "light");
  }

  const handleTurn = (row: number, col: number) => {
    const currPlayer = turn % 2 === 0 ? "dark" : "light";
    const nextPlayer = turn % 2 === 0 ? "light" : "dark";
    const newBoardArr = boardArr.slice(); // Copy of state
    newBoardArr[row][col] = currPlayer;
    setBoardArray(newBoardArr);
    setTurn(turn + 1);
    checkValid(nextPlayer, currPlayer);
  };

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
      <p>{turn % 2 === 0 ? "dark" : "light"}</p>
      <Board boardArray={boardArr} handleTurn={handleTurn} />
    </>
  );
}

export default Game;
