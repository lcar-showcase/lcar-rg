import { Link } from "react-router";
import style from "./logo.module.css";

/**
 * The game logo.
 * @returns A Logo component.
 */
function Logo() {
  return (
    <Link to="/" className={style.logo}>
      REVERSI
    </Link>
  );
}

export default Logo;
