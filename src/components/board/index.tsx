import { DiskColour } from "../../types";
import Tile from "../tile";
import style from "./board.module.css";

// All possible rows and columns on the board
export const rows = ["1", "2", "3", "4", "5", "6", "7", "8"];
export const cols = ["A", "B", "C", "D", "E", "F", "G", "H"];

const rowIds = rows.map((row) => (
  <div key={row} className={style.label}>
    {row}
  </div>
));
const colIds = cols.map((col) => (
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
        const tilePos = `${rows[rowId]}${cols[colId]}`;
        tileComponents.push(<Tile key={tilePos} id={tilePos} diskColour={tile} />);
      });
    });

    return tileComponents;
  }

  return (
    <section className={style.container}>
      <div className={style.layout}>
        <div className={style.rowLabels}>{rowIds}</div>
        <div className={style.colLabels}>{colIds}</div>
        <div className={style.playable}>{createTiles(boardArray)}</div>
      </div>
    </section>
  );
}

export default Board;
