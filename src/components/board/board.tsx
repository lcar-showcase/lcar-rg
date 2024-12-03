import Tile, { TilePos } from "../tile/tile";
import style from "./board.module.css";
import { initTileLabels, getRows, getCols } from "./tileLabels";

// Initialise all 64 Tile labels
const tileLabels = initTileLabels();

/**
 * Callback to initialise all Tile components, and add default disks to Tiles.
 *
 * @param tile - Position of the Tile, defined by row and col.
 * @returns A Tile component, with an optional disk colour specified.
 */
function initDefaultDisk(tilePos: TilePos) {
  const tileRow = tilePos.row;
  const tileCol = tilePos.col;

  if (`${tileRow}${tileCol}` === "4E" || `${tileRow}${tileCol}` === "5D") {
    // Initialise dark disk on Tile
    return <Tile key={`${tileRow}${tileCol}`} pos={{ row: tileRow, col: tileCol }} diskColour="dark" />;
  }
  if (`${tileRow}${tileCol}` === "4D" || `${tileRow}${tileCol}` === "5E") {
    // Initialise light disk on Tile
    return <Tile key={`${tileRow}${tileCol}`} pos={{ row: tileRow, col: tileCol }} diskColour="light" />;
  }
  // No disk
  return <Tile key={`${tileRow}${tileCol}`} pos={{ row: tileRow, col: tileCol }} diskColour={null} />;
}

/**
 * Initialise Tiles components from all 64 Tile labels.
 * @returns Tile components.
 */
function initTiles() {
  return tileLabels.map(initDefaultDisk);
}

/**
 * Initialise row labels to the left of the board.
 * @returns Row labels.
 */
function initRowLabels() {
  return getRows().map((row) => (
    <div key={row} className={style.label}>
      {row}
    </div>
  ));
}

/**
 * Initialise column labels to the top of the board.
 * @returns Column labels.
 */
function initColLabels() {
  return getCols().map((col) => (
    <div key={col} className={style.label}>
      {col}
    </div>
  ));
}

const rowLabels = initRowLabels();
const colLabels = initColLabels();
const tiles = initTiles();

/**
 * The game board.
 * @returns Board component.
 */
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
