import Tile from "../tile/tile";
import style from "./board.module.css";
import { initTileLabels, getRows, getCols } from "./tileLabels";

const tiles = initTileLabels();

function initTiles() {
  return tiles.map((tile) => Tile(tile.row, tile.col));
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

function Board() {
  return (
    <section className={style.container}>
      <div className={style.layout}>
        <div className={style.rowLabels}>{initRowLabels()}</div>
        <div className={style.colLabels}>{initColLabels()}</div>
        <div className={style.playable}>{initTiles()}</div>
      </div>
    </section>
  );
}

export default Board;
