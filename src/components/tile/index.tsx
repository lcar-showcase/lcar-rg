import { TileState } from "../../types";
import style from "./tile.module.css";

interface TileProps {
  id: string;
  tileState: TileState;
  isValidMove: boolean;
  handleClick(): void;
}

/**
 * An interactable game tile.
 * @param id - div ID.
 * @param tileState - Disk colour on the Tile.
 * @returns Tile component.
 */
function Tile({ id, tileState, isValidMove, handleClick }: TileProps) {
  return (
    <div
      id={id}
      className={`${style.tile} ${isValidMove && style.validTile}`} // Tile styling + additional styling if valid
      role="button"
      tabIndex={0}
      aria-label="tile"
      onClick={isValidMove ? handleClick : () => {}} // Enable click if valid
      onKeyDown={() => {}}
    >
      <div className={`${style.disk} ${tileState ? style[tileState] : isValidMove && style.valid}`} />
    </div>
  );
}

export default Tile;
