import { Link } from "react-router";
import style from "./menuLink.module.css";

/**
 * A menu option shown on the MainMenu page.
 * @param text - Menu option text.
 * @param path - Path to redirect to after pressing the menu option.
 * @returns MenuLink component.
 */
function MenuLink({ text, path }: { text: string; path: string }) {
  return (
    <Link to={path} className={style.asBtn}>
      {text}
    </Link>
  );
}

export default MenuLink;
