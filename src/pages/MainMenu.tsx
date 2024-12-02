import MenuLink from "../components/menuLinks/menuLink";
import style from "./mainMenu.module.css";

function MainMenu() {
  return (
    <div className={style.container}>
        <MenuLink text="New Game" path="/game" />
        {/* TODO: Add "Continue Game button" */}
        <MenuLink text="Continue Game" path="/game" />
      </div>
  );
}

export default MainMenu;
