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

/**
 * A line that can be flipped (captured) to a different colour.
 */
interface FlipLine {
  start: Coordinate;
  valid: Coordinate;
  direction: {
    changeRow: number;
    changeCol: number;
  };
}

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

  // Determine "lines" that can be flipped by player
  // "Lines" are bound by two disks of the same colour, and all tiles in between occupied by the other colour
  function computeValidLines(boardArray: TileState[][], player: TileState) {
    const lines: FlipLine[] = [];
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
                // Empty tile AND all previous tiles occupied by opponent; valid line
                lines.push({
                  start: {
                    row: rowId,
                    col: colId,
                  },
                  // Where line ends
                  valid: {
                    row: checkRow,
                    col: checkCol,
                  },
                  direction: {
                    changeRow,
                    changeCol,
                  },
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
    return lines;
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

  function getPlayerScore(playerColour: TileState) {
    let score = 0;
    boardArr.forEach((row) =>
      row.forEach((tile) => {
        if (tile === playerColour) {
          score += 1;
        }
      })
    );
    return score;
  }

  /**
   * Process a turn after a player click's on a tile.
   * @param row Row of clicked tile.
   * @param col Col of clicked tile.
   */
  const handleTurn = (row: number, col: number) => {
    // Get lines with matching valid tile position
    const matchLines = computeValidLines(boardArr, currentPlayer).filter(
      (line) => line.valid.row === row && line.valid.col === col
    );

    // Determine tiles that should be flipped (start, valid and everything in between)
    const flippedTiles: Coordinate[] = [];
    matchLines.forEach((line) => {
      const { start, valid, direction } = line;
      let flipRow = start.row;
      let flipCol = start.col;
      while (flipRow !== valid.row + direction.changeRow || flipCol !== valid.col + direction.changeCol) {
        flippedTiles.push({
          row: flipRow,
          col: flipCol,
        });
        flipRow += direction.changeRow;
        flipCol += direction.changeCol;
      }
    });

    // Create new board state
    const newBoard = boardArr.map((boardRow, rowId) =>
      boardRow.map((_boardTile, colId) => {
        if (flippedTiles.find((flip) => flip.row === rowId && flip.col === colId)) {
          return currentPlayer; // Flip colour
        }
        return boardArr[rowId][colId]; // Unchanged
      })
    );
    // Set state only if tile is valid
    if (computeValidLines(boardArr, currentPlayer).find((line) => line.valid.row === row && line.valid.col === col)) {
      setBoardArray(newBoard);
      // TODO: Set history here for valid move history in another user story
      // Check if next player's turn should be skipped
      const otherPlayer = currentPlayer === "light" ? "dark" : "light";
      if (computeValidLines(newBoard, otherPlayer).length === 0) {
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
        <div className={style.scoreboardContainer}>
          <div className={style.playerInfo}>
            <div className={`${style.scoreDiskBackground} ${style.dark}`}>{getPlayerScore("dark")}</div>
            <span>Player</span>
          </div>
          <div className={style.playerInfo}>
            <span>Computer</span>
            <div className={`${style.scoreDiskBackground} ${style.light}`}>{getPlayerScore("light")}</div>
          </div>
        </div>
        <Board
          boardArray={boardArr}
          validTiles={computeValidLines(boardArr, currentPlayer).map((line) => line.valid)} // Pass in valid tiles only
          handleTurn={handleTurn}
        />
        <div className={style.history}>
          <p>{generateHistoryMessage(history[history.length - 1])}</p>
          <p>{generateHistoryMessage(history[history.length - 2])}</p>
        </div>
      </div>
    </>
  );
}

export default Game;
