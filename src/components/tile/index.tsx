import { DiskColour } from "../../types";
import style from "./tile.module.css";

/**
 * An interactable game tile.
 * @param id - div ID.
 * @param diskColour - Disk colour on the Tile.
 * @returns Tile component.
 */
function Tile({ id, diskColour }: { id: string; diskColour: DiskColour }) {
  return (
    <div id={id} className={style.tile}>
      <div className={`${style.disk} ${style[diskColour]}`} />
    </div>
  );
}

export default Tile;
