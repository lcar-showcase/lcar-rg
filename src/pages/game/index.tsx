import { useState } from "react";
import { Link } from "react-router";
import Board from "../../components/board";
import Logo from "../../components/logo";
import { Coordinate, TileState } from "../../types";
import style from "./game.module.css";
import "../../index.css";

// Initialise 8 by 8 board, with 4 default disks
const initBoardArray: TileState[][] = Array.from({ length: 8 }, (_row, rowId) =>
  Array.from({ length: 8 }, (_col, colId) => {
    if ((rowId === 3 && colId === 3) || (rowId === 4 && colId === 4)) {
      return "light";
    }
    if ((rowId === 3 && colId === 4) || (rowId === 4 && colId === 3)) {
      return "dark";
    }
    return null;
  })
);

// All directions to check for (8 total)
const directions = [
  // North
  {
    changeRow: 1,
    changeCol: 0,
  },
  // North-east
  {
    changeRow: 1,
    changeCol: 1,
  },
  // East
  {
    changeRow: 0,
    changeCol: 1,
  },
  // South-east
  {
    changeRow: -1,
    changeCol: 1,
  },
  // South
  {
    changeRow: -1,
    changeCol: 0,
  },
  // South-west
  {
    changeRow: -1,
    changeCol: -1,
  },
  // West
  {
    changeRow: 0,
    changeCol: -1,
  },
  // North-west
  {
    changeRow: 1,
    changeCol: -1,
  },
];

function Game() {
  const [boardArr, setBoardArray] = useState(initBoardArray);
  const [turn, setTurn] = useState(0);
  const [history, setHistory] = useState(["Game start"]);
  const currentPlayer = turn % 2 === 0 ? "dark" : "light"; // Humans players are always even/dark

  // Determine valid tiles for player
  const validTiles: Coordinate[] = [];
  boardArr.forEach((row, rowId) =>
    row.forEach((tile, colId) => {
      // Find player's tiles
      if (tile === currentPlayer) {
        // Check in each direction (8 total) for valid tiles
        directions.forEach((direction) => {
          const { changeRow, changeCol } = direction; // Change for one step
          let checkCol = colId + changeCol; // Start from next tile
          let checkRow = rowId + changeRow;
          let seeOpp = false; // Flag to check if at least one opponent disk was seen
          while (checkRow >= 0 && checkRow < boardArr.length && checkCol >= 0 && checkCol < boardArr.length) {
            // Keep going in direction of change while within bounds of board; check for opponent
            if (boardArr[checkRow][checkCol] === (currentPlayer === "light" ? "dark" : "light")) {
              // Seen opponent; keep going
              seeOpp = true;
              checkCol += changeCol;
              checkRow += changeRow;
            } else if (boardArr[checkRow][checkCol] === null && seeOpp) {
              // Empty tile AND all previous tiles occupied by opponent; valid tile
              validTiles.push({
                row: checkRow,
                col: checkCol,
              });
              break;
            } else {
              // Cannot be valid (opponent player not encountered)
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
    setHistory([...history, `${currentPlayer[0].toUpperCase()}${currentPlayer.slice(1)}'s turn was skipped`]);
  }

  /**
   * Process a turn after a player click's on a tile.
   * @param row Row of clicked tile.
   * @param col Col of clicked tile.
   */
  const handleTurn = (row: number, col: number) => {
    // Set tile to player's colour
    const newBoard = boardArr.map((boardRow, rowId) =>
      boardRow.map((_tile, colId) => {
        if (row === rowId && col === colId) {
          return currentPlayer;
        }
        return boardArr[rowId][colId]; // Use old TileState
      })
    );
    setTurn(turn + 1);
    setBoardArray(newBoard);
  };

  return (
    <>
      <Link to="/" className={style.backToMainMenuContainer}>
        <img src="/images/back_arrow.png" alt="back" />
        <Logo isNav />
      </Link>
      <div className={style.gameInfo}>
        <Board boardArray={boardArr} validTiles={validTiles} handleTurn={handleTurn} />
        <div className={style.history}>
          <p>{history[history.length - 1]}</p>
          <p>{history[history.length - 2]}</p>
        </div>
      </div>
    </>
  );
}

export default Game;
