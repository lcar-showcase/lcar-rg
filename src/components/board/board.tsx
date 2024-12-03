import Tile, { TilePos } from "../tile/tile";
import style from "./board.module.css";
import { initTileLabels, getRows, getCols } from "./tileLabels";

// Initialise all tile labels
const tileLabels = initTileLabels();

function initDefaultDisk(tile: TilePos) {
  if (`${tile.row}${tile.col}` === "4E" || `${tile.row}${tile.col}` === "5D") {
    // Initialise dark disk on tile
    return <Tile key={`${tile.row}${tile.col}`} pos={{ row: tile.row, col: tile.col }} diskColour="dark" />;
  } if (`${tile.row}${tile.col}` === "4D" || `${tile.row}${tile.col}` === "5E") {
    // Initialise light disk on tile
    return <Tile key={`${tile.row}${tile.col}`} pos={{ row: tile.row, col: tile.col }} diskColour="light" />;
  } 
    // No disk on tile
    return <Tile key={`${tile.row}${tile.col}`} pos={{ row: tile.row, col: tile.col }} diskColour={null} />;
  
}

function initTiles() {
  return tileLabels.map(initDefaultDisk);
}

function initRowLabels() {
  return getRows().map((row) => (
    <div key={row} className={style.label}>
      {row}
    </div>
  ));
}

function initColLabels() {
  return getCols().map((col) => (
    <div key={col} className={style.label}>
      {col}
    </div>
  ));
}

// Initialise board labels (side labels)
const rowLabels = initRowLabels();
const colLabels = initColLabels();

// Initialise board tiles with default disks
const tiles = initTiles();

function Board() {
  return (
    <section className={style.container}>
      <div className={style.layout}>
        <div className={style.rowLabels}>{rowLabels}</div>
        <div className={style.colLabels}>{colLabels}</div>
        <div className={style.playable}>{tiles}</div>
      </div>
    </section>
  );
}

export default Board;
