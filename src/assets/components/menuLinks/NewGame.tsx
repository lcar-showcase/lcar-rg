import { Link } from "react-router";
import style from "./menuLink.module.css";

function NewGame() {
  return (
    <div className={style.btn}>
        <Link to="/game" className={style.link}>
          New Game
        </Link>
      </div>
  );
}

export default NewGame;
