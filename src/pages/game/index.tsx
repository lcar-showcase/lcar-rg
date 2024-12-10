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

// Direction change when checking for valid tiles
interface Direction {
  row: number; // x-axis: postitive is up; negative is down
  col: number; // y-axis: positive is right; negative is left
}

// All directions to check for (8 total)
const directions: Direction[] = [
  // North
  {
    row: 1,
    col: 0,
  },
  // North-east
  {
    row: 1,
    col: 1,
  },
  // East
  {
    row: 0,
    col: 1,
  },
  // South-east
  {
    row: -1,
    col: 1,
  },
  // South
  {
    row: -1,
    col: 0,
  },
  // South-west
  {
    row: -1,
    col: -1,
  },
  // West
  {
    row: 0,
    col: -1,
  },
  // North-west
  {
    row: 1,
    col: -1,
  },
];

function Game() {
  const [boardArr, setBoardArray] = useState(initBoardArray);
  const [turn, setTurn] = useState(0);
  const nextBoard = boardArr.slice(); // Modify board state for next turn
  const player = turn % 2 === 0 ? "dark" : "light"; // Current player (humans players are always even/dark)
  const opponent = turn % 2 === 0 ? "light" : "dark";

  // Reset all valid tiles
  nextBoard.forEach((row, rowId) =>
    row.forEach((_, colId) => {
      if (nextBoard[rowId][colId] === "valid") {
        nextBoard[rowId][colId] = null;
      }
    })
  );

  // Check valid tiles for current player
  let hasValid = false;

  nextBoard.forEach((row, rowId) =>
    row.forEach((tile, colId) => {
      // Find current player's tiles
      if (tile === player) {
        // Check in each direction (8 total) for lines to capture
        directions.forEach((direction) => {
          const { row: changeRow, col: changeCol } = direction; // Change for one step
          let checkCol = colId + changeCol; // Start from next tile
          let checkRow = rowId + changeRow;
          let seeOpp = false; // Flag to check if at least one opponent disk was seen
          while (checkRow >= 0 && checkRow < nextBoard.length && checkCol >= 0 && checkCol < nextBoard.length) {
            // Keep going in direction of change while within bounds of board
            if (nextBoard[checkRow][checkCol] === opponent) {
              // Seen opponent; keep going
              seeOpp = true;
              checkCol += changeCol;
              checkRow += changeRow;
            } else if (nextBoard[checkRow][checkCol] === null && seeOpp) {
              // Empty tile AND all previous tiles occupied by opponent; valid tile
              nextBoard[checkRow][checkCol] = "valid";
              hasValid = true;
              break;
            } else {
              // Line cannot be valid (opponent player not encountered)
              break;
            }
          }
        });
      }
    })
  );
  if (!hasValid) {
    // Player has no valid moves, skip turn
    // TODO: Handle win condition when both players have no valid moves
    setTurn(turn + 1);
  }

  const handleTurn = (row: number, col: number) => {
    nextBoard[row][col] = player;
    setTurn(turn + 1);
    setBoardArray(nextBoard);
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
      <p>{player}</p>
      <Board boardArray={boardArr} handleTurn={handleTurn} />
    </>
  );
}

export default Game;
