import { Coordinate, TileState } from "../../types";
import Tile from "../tile";
import style from "./board.module.css";

interface BoardProps {
  boardArray: TileState[][];
  validTiles: Coordinate[];
  computerClickedTile: Coordinate | null;
  rows: string[];
  cols: string[];
  currentPlayer: TileState;
  handleTurn(row: number, col: number): void;
}

/**
 * The game board.
 * @returns Board component.
 */
function Board({
  boardArray,
  validTiles,
  computerClickedTile: clickedTile,
  rows,
  cols,
  currentPlayer,
  handleTurn,
}: BoardProps) {
  return (
    <section className={style.container}>
      <div className={style.layout}>
        <div className={style.rowIdContainer}>
          {rows.map((row) => (
            <div key={row} className={style.rowColId}>
              {row}
            </div>
          ))}
        </div>
        <div className={style.colIdContainer}>
          {cols.map((col) => (
            <div key={col} className={style.rowColId}>
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
                  isComputerClicked={!!(clickedTile && rowId === clickedTile.row && colId === clickedTile.col)}
                  currentPlayer={currentPlayer}
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
