import { useState } from "react";
import { Link } from "react-router";
import Board from "../../components/board";
import { TileState } from "../../types";
import style from "./game.module.css";
import "../../index.css";

// Initialise 8 by 8 board, no disks on each tile
const initBoardArray: TileState[][] = Array.from({ length: 8 }, () => Array.from({ length: 8 }, () => null));

// Initialise default disks
// TODO: Add configurations in a separate file to test the game after implementing all game rules
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

interface ValidTile {
  start: Direction;
  valid: Direction;
  direction: Direction;
}

function Game() {
  const [boardArr, setBoardArray] = useState(initBoardArray);
  const [turn, setTurn] = useState(0);
  const [history, setHistory] = useState(["Game start"]);
  const player = turn % 2 === 0 ? "dark" : "light"; // Current player (humans players are always even/dark)
  const opponent = turn % 2 === 0 ? "light" : "dark";
  const nextHistory = [...history]; // Copy history state before reversing

  const validTiles: ValidTile[] = []; // Check valid tiles for current player
  boardArr.forEach((row, rowId) =>
    row.forEach((tile, colId) => {
      // Find current player's tiles
      if (tile === player) {
        // Check in each direction (8 total) for lines to capture
        directions.forEach((direction) => {
          const { row: changeRow, col: changeCol } = direction; // Change for one step
          let checkCol = colId + changeCol; // Start from next tile
          let checkRow = rowId + changeRow;
          let seeOpp = false; // Flag to check if at least one opponent disk was seen
          while (checkRow >= 0 && checkRow < boardArr.length && checkCol >= 0 && checkCol < boardArr.length) {
            // Keep going in direction of change while within bounds of board
            if (boardArr[checkRow][checkCol] === opponent) {
              // Seen opponent; keep going
              seeOpp = true;
              checkCol += changeCol;
              checkRow += changeRow;
            } else if (boardArr[checkRow][checkCol] === null && seeOpp) {
              // TODO: Setting it to valid here affects subsequent loops
              // Empty tile AND all previous tiles occupied by opponent; valid tile
              validTiles.push({
                start: {
                  row: rowId,
                  col: colId,
                },
                valid: {
                  row: checkRow,
                  col: checkCol,
                },
                direction: {
                  row: changeRow,
                  col: changeCol,
                },
              });
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

  if (validTiles.length === 0) {
    // Player has no valid moves, skip turn
    // TODO: Handle win condition when both players have no valid moves
    setTurn(turn + 1);
    setHistory([...history, `${player[0].toUpperCase()}${player.slice(1)}'s turn was skipped`]);
  }

  const handleTurn = (row: number, col: number) => {
    const newBoard = boardArr.map((boardRow, rowId) =>
      boardRow.map((_tile, colId) => {
        if (row === rowId && col === colId) {
          return player;
        }
        return boardArr[rowId][colId];
      })
    );
    setTurn(turn + 1);
    setBoardArray(newBoard);
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
      <div className={style.gameInfo}>
        <Board
          boardArray={boardArr.map((boardRow, rowId) =>
            boardRow.map((_tile, colId) => {
              const exists = validTiles.find(
                (validTile) => validTile.valid.row === rowId && validTile.valid.col === colId
              );
              if (exists) {
                return "valid";
              }
              return boardArr[rowId][colId];
            })
          )}
          handleTurn={handleTurn}
        />
        <div className={style.history}>
          {nextHistory
            .slice(-2) // Lastest 2 turns that were skipped
            .reverse() // Most recent move first
            .map((move) => (
              <p key={`${history.indexOf(move)}`}>{move}</p>
            ))}
        </div>
      </div>
    </>
  );
}

export default Game;
