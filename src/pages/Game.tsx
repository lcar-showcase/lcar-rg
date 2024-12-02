import Board from "../components/board/board";
import Logo from "../components/logo/logo";
import style from "./game.module.css";

function Game() {
  return (
    <div className={style.container}>
      <Logo isNav />
      <Board />
    </div>
  );
}

export default Game;
