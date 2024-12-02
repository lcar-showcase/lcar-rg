import { Link } from "react-router";
import style from "./menuLink.module.css";

function MenuLink({ text, path }: { text: string; path: string }) {
  return (
    <Link to={path} className={style.asBtn}>
      {text}
    </Link>
  );
}

export default MenuLink;
