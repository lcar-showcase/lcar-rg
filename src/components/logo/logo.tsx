import { Link } from "react-router";
import style from "./logo.module.css";

function Logo({ isNav }: { isNav: boolean }) {
  return (
    <Link to="/" className={isNav ? style.navigable : style.title}>
      REVERSI
    </Link>
  );
}

export default Logo;
