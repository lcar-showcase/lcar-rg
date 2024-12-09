import { TileState } from "../../types";
import style from "./tile.module.css";

interface TileProps {
  id: string;
  tileState: TileState;
  handleClick(): void;
}

/**
 * An interactable game tile.
 * @param id - div ID.
 * @param tileState - Disk colour on the Tile.
 * @returns Tile component.
 */
function Tile({ id, tileState, handleClick }: TileProps) {
  return (
    <div
      id={id}
      className={`${style.tile} ${tileState ?? style.unoccupied}`} // Add hover effect if tile unoccupied
      role="button"
      tabIndex={0}
      aria-label="tile"
      onClick={tileState ? () => {} : handleClick} // Disable click if already occupied
      onKeyDown={() => {}}
    >
      {tileState && <div className={`${style.disk} ${style[tileState]}`} />}
    </div>
  );
}

export default Tile;
