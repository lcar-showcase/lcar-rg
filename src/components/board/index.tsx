import { Coordinate, TileState } from "../../types";
import Tile from "../tile";
import style from "./board.module.css";

interface BoardProps {
  boardArray: TileState[][];
  validTiles: Coordinate[];
  rows: string[];
  cols: string[];
  handleTurn(row: number, col: number): void;
}

/**
 * The game board.
 * @returns Board component.
 */
function Board({ boardArray, validTiles, rows, cols, handleTurn }: BoardProps) {
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
        <div className={style.playable}>
          {boardArray.map((boardRow, rowId) =>
            boardRow.map((_boardTile, colId) => {
              // Set valid tiles
              const exists = validTiles.find((tile) => tile.row === rowId && tile.col === colId);
              return (
                <Tile
                  key={`${rows[rowId]}${cols[colId]}`}
                  id={`${rows[rowId]}${cols[colId]}`}
                  tileState={exists ? null : boardArray[rowId][colId]}
                  isValidMove={!!exists}
                  handleClick={() => handleTurn(rowId, colId)}
                />
              );
            })
          )}
        </div>
      </div>
    </section>
  );
}

export default Board;
