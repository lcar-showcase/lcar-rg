import { useState } from "react";
import { Link } from "react-router";
import Board from "../../components/board";
import Logo from "../../components/logo";
import PlayerInfo from "../../components/playerInfo";
import PopUp from "../../components/popUp";
import { Coordinate, TileState } from "../../types";
import style from "./game.module.css";
import "../../index.css";

// All possible rows and columns on the board
const rows = ["1", "2", "3", "4", "5", "6", "7", "8"];
const cols = ["A", "B", "C", "D", "E", "F", "G", "H"];

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
  const [showPopUp, setShowPopUp] = useState(false);
  const [winnerColour, setWinnerColour] = useState<TileState>(null);
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

  const getPlayerScore = (playerColour: TileState, board: TileState[][] = boardArr) => {
    let score = 0;
    board.forEach((row) =>
      row.forEach((tile) => {
        if (tile === playerColour) {
          score += 1;
        }
      })
    );
    return score;
  };

  // Check for winner - no more valid moves
  function checkWinner(board: TileState[][]) {
    let isGameOver = false;
    const otherPlayer = currentPlayer === "light" ? "dark" : "light";
    // Check next turn (other player)
    if (computeValidLines(board, otherPlayer).length === 0) {
      // Check next next turn (current player)
      if (computeValidLines(board, currentPlayer).length === 0) {
        isGameOver = true;
      }
    }

    let winner: TileState = null;
    if (isGameOver) {
      // Check who won
      const playerScore = getPlayerScore("dark", board);
      const computerScore = getPlayerScore("light", board);
      if (playerScore > computerScore) {
        winner = "dark";
      } else if (playerScore < computerScore) {
        winner = "light";
      }
    }
    return winner;
  }

  function generateHistoryMessage(historyItem: HistoryItem | null) {
    if (historyItem) {
      const { colour, tile, isSkipped } = historyItem;
      const playerName = colour === "dark" ? "Player" : "Computer";
      if (tile) {
        return `${playerName} moved to ${cols[tile.col]}${tile.row + 1}`;
      }
      if (isSkipped) {
        return `${playerName}'s turn was skipped`;
      }
      if (tile === null && !isSkipped) {
        return "Game start";
      }
    }
    return null; // historyItem is null/undefined during 1st turn
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
      setHistory([...history, { colour: currentPlayer, tile: { row, col }, isSkipped: false }]);
      const otherPlayer = currentPlayer === "light" ? "dark" : "light";
      if (computeValidLines(newBoard, otherPlayer).length === 0) {
        // Next player has no valid moves on new board; skip
        setTurn(turn + 2);
        if (!checkWinner(newBoard)) {
          // Do not add last "skip turn" to history if game over
          setHistory([...history, { colour: otherPlayer, tile: null, isSkipped: true }]);
        }
      } else {
        setTurn(turn + 1);
      }
    }
    // Show pop up once a winner is detected
    if (checkWinner(newBoard)) {
      setWinnerColour(checkWinner(newBoard));
      setShowPopUp(true);
    }
  };

  return (
    <>
      <div>
        <Link to="/" className={style.backToMainMenuContainer}>
          <img src="/images/back_arrow.png" alt="back" />
          <Logo isNav />
        </Link>
        <div className={style.gameInfo}>
          <div className={style.scoreboardContainer}>
            <PlayerInfo currPlayer={currentPlayer} playerColour="dark" getPlayerScore={getPlayerScore} />
            <PlayerInfo currPlayer={currentPlayer} playerColour="light" getPlayerScore={getPlayerScore} />
          </div>
          <Board
            boardArray={boardArr}
            validTiles={computeValidLines(boardArr, currentPlayer).map((line) => line.valid)} // Pass in valid tiles only
            rows={rows}
            cols={cols}
            handleTurn={handleTurn}
          />
          <div className={style.history}>
            <p key={history.length - 1}>{generateHistoryMessage(history[history.length - 1])}</p>
            <p key={history.length - 2}>{generateHistoryMessage(history[history.length - 2])}</p>
          </div>
        </div>
      </div>
      {showPopUp && (
        <PopUp
          title={winnerColour ? (winnerColour === "dark" ? "Player wins!" : "Computer wins!") : "Tie!"}
          buttonText="Return to Game"
          handleButtonClick={() => setShowPopUp(false)}
        />
      )}
    </>
  );
}

export default Game;
