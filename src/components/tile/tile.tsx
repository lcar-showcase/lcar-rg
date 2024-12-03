import Disk, { DiskColour } from "../disk/disk";
import style from "./tile.module.css";

export interface TilePos {
  row: string;
  col: string;
}

interface TileProps {
  pos: TilePos;
  diskColour: DiskColour;
}

/**
 * An interactable game tile.
 * @param pos - Position (label) of Tile on the board.
 * @param diskColour - Disk colour on the Tile.
 * @returns Tile component.
 */
function Tile({ pos, diskColour }: TileProps) {
  const tileLabel = `${pos.row}${pos.col}`;

  return (
    <div id={tileLabel} className={style.tile}>
      <Disk colour={diskColour} />
    </div>
  );
}

export default Tile;
