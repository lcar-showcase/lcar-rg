import style from "./tile.module.css";

function Tile(row: string, col: string) {
  const tileLabel = `${row}${col}`;
  return (
    <div key={tileLabel} className={style.boardTile}>
      {/* {tileLabel} */}
    </div>
  );
}

export default Tile;
