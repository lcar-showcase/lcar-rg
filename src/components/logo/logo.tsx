import { Link } from "react-router";
import style from "./logo.module.css";

function Logo() {
  return (
    <Link to="/" className={`${style.text} ${style.navigable}`}>
      REVERSI
    </Link>
  );
}

export default Logo;
