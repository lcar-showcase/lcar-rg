import { DiskColour } from "../../types";
import Tile from "../tile";
import style from "./board.module.css";

// All possible rows and columns on the board
const rows = ["1", "2", "3", "4", "5", "6", "7", "8"];
const cols = ["A", "B", "C", "D", "E", "F", "G", "H"];

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
        <div className={style.rowLabels}>
          {rows.map((row) => (
            <div key={row} className={style.label}>
              {row}
            </div>
          ))}
        </div>
        <div className={style.colLabels}>
          {cols.map((col) => (
            <div key={col} className={style.label}>
              {col}
            </div>
          ))}
        </div>
        <div className={style.playable}>{createTiles(boardArray)}</div>
      </div>
    </section>
  );
}

export default Board;
