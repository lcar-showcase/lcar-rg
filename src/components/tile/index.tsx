import { TileState } from "../../types";
import style from "./tile.module.css";

interface TileProps {
  id: string;
  tileState: TileState;
  isValidMove: boolean;
  isComputerClicked: boolean;
  currentPlayer: TileState;
  handleClick(): void;
}

/**
 * An interactable game tile.
 * @param id - div ID.
 * @param tileState - Disk colour on the Tile.
 * @returns Tile component.
 */
function Tile({ id, tileState, isValidMove, isComputerClicked: isClicked, currentPlayer, handleClick }: TileProps) {
  return (
    <div
      id={id}
      className={`${style.tile} ${isValidMove && currentPlayer === "dark" && style.validTile} ${isClicked && style.flash}`} // Highlight and change cursor on valid tile hover only if player turn
      role="button"
      tabIndex={0}
      aria-label={`tile-${id}`}
      onClick={handleClick}
      onKeyDown={() => {}}
    >
      <div className={`${style.disk} ${tileState ? style[tileState] : isValidMove && style.valid}`} />
    </div>
  );
}

export default Tile;
