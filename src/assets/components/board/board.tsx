import Tile from "../tile/tile";
import style from "./board.module.css";
import tileLabels from "./tileLabels";

const tiles = tileLabels;

function initTiles() {
  return tiles.map((tile) => Tile(tile.row, tile.col));
}

function Board() {
  return <div className={style.boardLayout}>{initTiles()}</div>;
}

export default Board;
