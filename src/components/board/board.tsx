import { DiskColour } from "../../types";
import Tile from "../tile/tile";
import style from "./board.module.css";
import { cols, rows } from "./tileLabels";

const rowLabels = rows.map((row) => (
  <div key={row} className={style.label}>
    {row}
  </div>
));
const colLabels = cols.map((col) => (
  <div key={col} className={style.label}>
    {col}
  </div>
));

/**
 * The game board.
 * @returns Board component.
 */
function Board({ boardArray }: { boardArray: DiskColour[][] }) {
  function createTiles(board: DiskColour[][]): JSX.Element[] {
    const tileComponents: JSX.Element[] = [];
    board.forEach((row, rowId: number) => {
      row.forEach((tile, colId: number) => {
        tileComponents.push(<Tile key={`${cols[colId]}${rows[rowId]}`} diskColour={tile} />);
      });
    });

    return tileComponents;
  }

  createTiles(boardArray);

  return (
    <section className={style.container}>
      <div className={style.layout}>
        <div className={style.rowLabels}>{rowLabels}</div>
        <div className={style.colLabels}>{colLabels}</div>
        <div className={style.playable}>{createTiles(boardArray)}</div>
      </div>
    </section>
  );
}

export default Board;
