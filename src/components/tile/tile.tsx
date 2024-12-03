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

function Tile({ pos, diskColour }: TileProps) {
  const tileLabel = `${pos.row}${pos.col}`;

  return (
    <div id={tileLabel} className={style.boardTile}>
      <Disk colour={diskColour} />
    </div>
  );
}

export default Tile;
