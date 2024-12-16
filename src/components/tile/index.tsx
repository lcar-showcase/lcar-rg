import { TileState } from "../../types";
import style from "./tile.module.css";

/**
 * An interactable game tile.
 * @param id - div ID.
 * @param tileState - Disk colour on the Tile.
 * @returns Tile component.
 */
function Tile({ id, tileState }: { id: string; tileState: TileState }) {
  return (
    <div id={id} className={style.tile}>
      {tileState && <div className={`${style.disk} ${style[tileState]}`} />}
    </div>
  );
}

export default Tile;
