import skipTurnIndicatorImg from "../../../images/skip_indicator.png";
import turnIndicatorActiveImg from "../../../images/turn_indicator_active.png";
import turnIndicatorInactiveImg from "../../../images/turn_indicator_inactive.png";
import { TileState } from "../../types";
import style from "./playerInfo.module.css";

interface PlayerInfoProps {
  currPlayer: TileState; // Player for current turn
  playerColour: TileState; // Which player information to store (human player or computer)
  score: number;
  isSkipped: boolean; // Is player's turn skipped
}

/**
 * Represents information for one player (turn indicator, score and player name) on the scoreboard.
 */
function PlayerInfo({ currPlayer, playerColour, score, isSkipped }: PlayerInfoProps) {
  const isCurrPlayerTurn = currPlayer === playerColour;
  const isDark = playerColour === "dark";
  return (
    <div className={`${style.playerInfo} ${isDark && style.playerScore}`}>
      {/* Player name */}
      <span>{isDark ? "Player" : "Computer"}</span>
      {/* Score + disk background */}
      <div className={`${style.scoreDiskBackground} ${isDark ? style.dark : style.light}`}>{score}</div>
      {/* Turn indicator */}
      <img
        className={`${style.turnIndicator} ${isDark && style.playerTurnIndicator} ${isCurrPlayerTurn && style.activeTurnIndicator}`}
        src={isSkipped ? skipTurnIndicatorImg : isCurrPlayerTurn ? turnIndicatorActiveImg : turnIndicatorInactiveImg}
        alt={isCurrPlayerTurn ? "Turn indidcator active" : "Turn indicator inactive"}
      />
    </div>
  );
}

export default PlayerInfo;
