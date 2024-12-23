import { TileState } from "../../types";
import style from "./playerInfo.module.css";

interface PlayerInfoProps {
  playerColour: TileState; // Which player information to store (human player or computer)
  score: number;
}

/**
 * Represents information for one player (turn indicator, score and player name) on the scoreboard.
 */
function PlayerInfo({ playerColour, score }: PlayerInfoProps) {
  const isDark = playerColour === "dark";
  return (
    <div className={`${style.playerInfo} ${isDark && style.playerScore}`}>
      {/* Player name */}
      <span>{isDark ? "Player" : "Computer"}</span>
      {/* Score + disk background */}
      <div className={`${style.scoreDiskBackground} ${isDark ? style.dark : style.light}`}>{score}</div>
    </div>
  );
}

export default PlayerInfo;
