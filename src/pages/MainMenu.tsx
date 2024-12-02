import MenuLink from "../components/menuLinks/menuLink";
import style from "./mainMenu.module.css";

function MainMenu() {
  return (
    <div className={style.linksContainer}>
      <MenuLink text="New Game" path="/game" />
      {/* TODO: Add "Continue Game button" */}
    </div>
  );
}

export default MainMenu;
