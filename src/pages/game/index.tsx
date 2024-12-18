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
// changeRow and changeCol behave like the x and y axes respectively.
// e.g. Going north (up) means: { changeRow: 1, changeCol: 0 }
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

interface HistoryItem {
  colour: NonNullable<TileState>; // If a player made a move, this cannot be null
  tile: Coordinate | null; // null means either player turn was skipped or game start
  isSkipped: boolean; // Flag to determine if player's turn was skipped
}

function Game() {
  const [boardArr, setBoardArray] = useState(initBoardArray);
  const [turn, setTurn] = useState(0);
  const [history, setHistory] = useState<HistoryItem[]>([{ colour: "dark", tile: null, isSkipped: false }]);
  const currentPlayer = turn % 2 === 0 ? "dark" : "light"; // Humans players are always even/dark

  // Determine valid tiles for player
  function computeValidTiles(boardArray: TileState[][], player: TileState) {
    const validTiles: Coordinate[] = [];
    boardArray.forEach((row, rowId) =>
      row.forEach((tile, colId) => {
        // Find player's tiles
        if (tile === player) {
          // Check in each direction (8 total) for valid tiles
          directions.forEach((direction) => {
            const { changeRow, changeCol } = direction; // Change for one step
            let checkCol = colId + changeCol; // Start from next tile
            let checkRow = rowId + changeRow;
            let seeOpp = false; // Flag to check if at least one opponent disk was seen
            while (checkRow >= 0 && checkRow < boardArray.length && checkCol >= 0 && checkCol < boardArray.length) {
              // Keep going in direction of change while within bounds of board; check for opponent
              if (boardArray[checkRow][checkCol] === (player === "light" ? "dark" : "light")) {
                // Seen opponent; keep going
                seeOpp = true;
                checkCol += changeCol;
                checkRow += changeRow;
              } else if (boardArray[checkRow][checkCol] === null && seeOpp) {
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
    return validTiles;
  }

  function generateHistoryMessage(historyItem: HistoryItem | null) {
    if (historyItem) {
      const { colour, tile, isSkipped } = historyItem;
      if (tile === null && !isSkipped) {
        return "Game start";
      }
      if (isSkipped) {
        return `${colour[0].toUpperCase()}${colour.slice(1)}'s turn was skipped`;
      }
      return null; // TODO: Return message for valid move in another user story
    }
    return null; // historyItem is null/undefined during 1st turn
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
    // Set state only if tile is valid
    if (
      computeValidTiles(boardArr, currentPlayer).find((validTile) => validTile.row === row && validTile.col === col)
    ) {
      setBoardArray(newBoard);
      // TODO: Set history here for valid move history in another user story
      // Check if next player's turn should be skipped
      const otherPlayer = currentPlayer === "light" ? "dark" : "light";
      if (computeValidTiles(newBoard, otherPlayer).length === 0) {
        setTurn(turn + 2);
        setHistory([...history, { colour: otherPlayer, tile: null, isSkipped: true }]);
      } else {
        setTurn(turn + 1);
      }
    }
  };

  return (
    <>
      <Link to="/" className={style.backToMainMenuContainer}>
        <img src="/images/back_arrow.png" alt="back" />
        <Logo isNav />
      </Link>
      <div className={style.gameInfo}>
        {turn}
        <Board boardArray={boardArr} validTiles={computeValidTiles(boardArr, currentPlayer)} handleTurn={handleTurn} />
        <div className={style.history}>
          <p>{generateHistoryMessage(history[history.length - 1])}</p>
          <p>{generateHistoryMessage(history[history.length - 2])}</p>
        </div>
      </div>
    </>
  );
}

export default Game;
