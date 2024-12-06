import { DiskColour } from "../../types";
import Disk from "../disk/disk";
import style from "./tile.module.css";

/**
 * An interactable game tile.
 * @param pos - Position (label) of Tile on the board.
 * @param diskColour - Disk colour on the Tile.
 * @returns Tile component.
 */
function Tile({ diskColour }: { diskColour: DiskColour }) {
  return (
    <div className={style.tile}>
      <Disk colour={diskColour} />
    </div>
  );
}

export default Tile;
