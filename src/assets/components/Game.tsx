import Board from "./board/board";
import style from "./game.module.css";
import Logo from "./logo/logo";

function Game() {
  return (
    <div className={style.container}>
      <Logo isNav />
      <Board />
    </div>
  );
}

export default Game;
