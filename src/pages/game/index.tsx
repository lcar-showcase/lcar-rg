import { useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import backArrowImg from "../../../images/back_arrow.png";
import loadingImg from "../../../images/loading.png";
import logoImg from "../../../images/logo.png";
import Board from "../../components/board";
import PlayerInfo from "../../components/playerInfo";
import PopUp from "../../components/popUp";
import { API_BASE_URL, GAME_ID } from "../../constants";
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

// TODO: (Enhancement) Confirmation pop-up when going back

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

type Winner = TileState | "tie"; // Dark, light, tie or null (no winner yet)

type SaveStatus = "pending" | "ok" | "fail";

type PopUpType = "win" | "saving" | "confirm";

function Game() {
  // Determine if game needs different intial state (continue game)
  const { state } = useLocation();
  let loadBoard;
  let loadHistory;
  if (state) {
    ({ board: loadBoard, history: loadHistory } = state as { board: TileState[][]; history: HistoryItem[] });
  } else {
    loadBoard = null;
    loadHistory = null;
  }
  const [boardArr, setBoardArray] = useState(loadBoard || initBoardArray);
  const [turn, setTurn] = useState(0);
  const [history, setHistory] = useState<HistoryItem[]>(
    loadHistory || [{ colour: "dark", tile: null, isSkipped: false }]
  );
  const [showPopUp, setShowPopUp] = useState(false);
  const [winnerColour, setWinnerColour] = useState<Winner>(null);
  const [popUpType, setPopUpType] = useState<PopUpType>("win");
  const [saveStatus, setSaveStatus] = useState<SaveStatus>("ok");
  const [uuid, setUuid] = useState("");
  const [copyButtonClicked, setCopyButtonClicked] = useState(false);
  const [selectedComputerTile, setSelectedComputerTile] = useState<Coordinate | null>(null);
  const goTo = useNavigate();
  const currentPlayer = turn % 2 === 0 ? "dark" : "light"; // Humans players are always even/dark

  // Determine "lines" that can be flipped by player
  // "Lines" are bound by two disks of the same colour, and all tiles in between occupied by the other colour
  const computeValidLines = (boardArray: TileState[][], player: TileState) => {
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
  };

  const getPlayerScore = (playerColour: TileState, board: TileState[][]) => {
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

  const generateHistoryMessage = (historyItem: HistoryItem | null) => {
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
  };

  /**
   * Process a turn after a player click's on a tile.
   * @param row Row of clicked tile.
   * @param col Col of clicked tile.
   * @param isComputer Check if computer made the move, prevents player click from updating state during computer turn
   */
  const handleTurn = useCallback(
    (row: number, col: number, isComputer = false) => {
      // Check for winner - no more valid moves for both players
      const checkWinner = (board: TileState[][]) => {
        let isGameOver = false;
        const otherPlayer = currentPlayer === "light" ? "dark" : "light";
        // Check next turn (other player)
        if (computeValidLines(board, otherPlayer).length === 0) {
          // Check next next turn (current player)
          if (computeValidLines(board, currentPlayer).length === 0) {
            isGameOver = true;
          }
        }

        let winner: Winner = null;
        if (isGameOver) {
          // Check who won
          const playerScore = getPlayerScore("dark", board);
          const computerScore = getPlayerScore("light", board);
          if (playerScore > computerScore) {
            winner = "dark";
          } else if (playerScore < computerScore) {
            winner = "light";
          } else {
            winner = "tie";
          }
        }
        return winner;
      };

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
      // Set state only if
      // (Dark turn OR Computer made a move during light turn) AND Tile is valid
      if (
        (currentPlayer === "dark" || (isComputer && currentPlayer === "light")) &&
        computeValidLines(boardArr, currentPlayer).find((line) => line.valid.row === row && line.valid.col === col)
      ) {
        setBoardArray(newBoard);
        setHistory((prevHistory) => [...prevHistory, { colour: currentPlayer, tile: { row, col }, isSkipped: false }]);
        const otherPlayer = currentPlayer === "light" ? "dark" : "light";
        if (computeValidLines(newBoard, otherPlayer).length === 0) {
          // Next player has no valid moves on new board; skip
          setTurn(turn + 2);
          if (!checkWinner(newBoard)) {
            // Do not add last "skip turn" to history if game over
            setHistory((prevHistory) => [...prevHistory, { colour: otherPlayer, tile: null, isSkipped: true }]);
          }
        } else {
          setTurn(turn + 1);
        }
        // Set computer's selected tile for animation
        if (currentPlayer === "light") {
          setSelectedComputerTile({ row, col });
        }
      }

      // Show pop up once a winner is detected
      if (checkWinner(newBoard)) {
        setWinnerColour(checkWinner(newBoard));
        setPopUpType("win");
        setShowPopUp(true);
      }
    },
    [boardArr, currentPlayer, turn]
  );

  // Render board after player turn, delay, then re-render board with computer's move
  useEffect(() => {
    if (currentPlayer === "light" && !winnerColour) {
      const timeoutId = setTimeout(() => {
        const compValidTiles = computeValidLines(boardArr, currentPlayer);
        const moveId = Math.floor(Math.random() * compValidTiles.length); // Random move
        const {
          valid: { row, col },
        } = compValidTiles[moveId];
        handleTurn(row, col, true); // isComputer = true; to indicate computer made the move
      }, 1000);
      return () => clearInterval(timeoutId);
    }
  }, [boardArr, currentPlayer, handleTurn, turn, winnerColour]);

  const saveGame = async () => {
    const req = new Request(API_BASE_URL, {
      method: "POST",
      body: JSON.stringify({
        id: GAME_ID,
        data: JSON.stringify({ board: boardArr, history }),
      }),
    });
    try {
      const res = await fetch(req);
      const body = await res.json();
      setSaveStatus("ok");
      setUuid(body.uuid);
      return true;
    } catch (err: unknown) {
      setSaveStatus("fail");
    }
    return false;
  };

  // Allow animation to run to completion
  useEffect(() => {
    setTimeout(() => {
      if (copyButtonClicked === true) {
        setCopyButtonClicked(false);
      }
    }, 1000);
  }, [copyButtonClicked]);

  return (
    <>
      <div>
        {/* Header (Logo + Save button) */}
        <div className={style.header}>
          <button
            type="button"
            className={`btn ${style.backToMainMenuContainer}`}
            onClick={() => {
              setPopUpType("confirm");
              setShowPopUp(true);
            }}
          >
            <img src={backArrowImg} alt="back" className={style.back} />
            <img src={logoImg} alt="reversi" className={`logoBase ${style.logo}`} />
          </button>
          <button
            type="button"
            className={`btn ${style.saveButton}`}
            disabled={currentPlayer === "light" && winnerColour === null} // Can save after game over
            onClick={() => {
              setShowPopUp(true);
              setPopUpType("saving");
              setSaveStatus("pending");
              saveGame();
            }}
          >
            Save
          </button>
        </div>
        {/* Board */}
        <div className={style.gameInfo}>
          <div className={style.scoreboardContainer}>
            <PlayerInfo currPlayer={currentPlayer} playerColour="dark" score={getPlayerScore("dark", boardArr)} />
            <PlayerInfo currPlayer={currentPlayer} playerColour="light" score={getPlayerScore("light", boardArr)} />
          </div>
          <Board
            boardArray={boardArr}
            validTiles={computeValidLines(boardArr, currentPlayer).map((line) => line.valid)} // Pass in valid tiles only
            rows={rows}
            cols={cols}
            currentPlayer={currentPlayer}
            handleTurn={handleTurn}
            computerClickedTile={selectedComputerTile}
          />
          <div className={style.history}>
            <p key={history.length - 1}>{generateHistoryMessage(history[history.length - 1])}</p>
            <p key={history.length - 2}>{generateHistoryMessage(history[history.length - 2])}</p>
          </div>
        </div>
      </div>
      {/* Pop-ups */}
      {showPopUp && popUpType === "win" && (
        <PopUp
          title={winnerColour === "dark" ? "Player wins!" : winnerColour === "light" ? "Computer wins!" : "Tie!"}
          onClickPrimaryButton={() => setShowPopUp(false)}
          primaryButtonText="Return to Game"
        />
      )}
      {showPopUp && popUpType === "saving" && saveStatus === "pending" && (
        <PopUp
          title="Saving game"
          disablePrimaryButton={saveStatus === "pending"}
          onClickPrimaryButton={() => setShowPopUp(false)}
          primaryButtonText="Return to Game"
        >
          <img src={loadingImg} alt="Loading" className={style.loading} />
        </PopUp>
      )}
      {showPopUp && popUpType === "saving" && saveStatus === "ok" && (
        <PopUp title="Saving game" onClickPrimaryButton={() => setShowPopUp(false)} primaryButtonText="Return to Game">
          <div className={style.saveOutcomeContainer}>
            <p className={style[saveStatus]}>Game saved successfully</p>
            <div className={`${style.uuid} ${copyButtonClicked && style.copyButtonClicked}`}>
              <p>{uuid}</p>
              <button
                type="button"
                className="btn"
                onClick={() => {
                  // Copy to clipboard
                  navigator.clipboard.writeText(uuid);
                  if (copyButtonClicked === false) {
                    setCopyButtonClicked(true);
                  }
                }}
              >
                {copyButtonClicked ? "Copied" : "Copy"}
              </button>
            </div>
            <p>Use the UUID above to load the game</p>
          </div>
        </PopUp>
      )}
      {showPopUp && popUpType === "saving" && saveStatus === "fail" && (
        <PopUp title="Saving game" onClickPrimaryButton={() => setShowPopUp(false)} primaryButtonText="Return to Game">
          <div className={style[saveStatus]}>Failed to save game</div>
        </PopUp>
      )}
      {showPopUp && popUpType === "confirm" && (
        <PopUp
          title="Return to Main Menu?"
          onClickPrimaryButton={() => setShowPopUp(false)}
          primaryButtonText="Stay"
          onClickSecondaryButton={() => goTo("/")}
          secondaryButtonText="Return"
        >
          <div>All unsaved progress will be lost.</div>
        </PopUp>
      )}
    </>
  );
}

export default Game;
