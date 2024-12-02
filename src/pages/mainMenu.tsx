import logoStyle from "../components/logo/logo.module.css";
import MenuLink from "../components/menuLinks/menuLink";
import style from "./mainMenu.module.css";

function MainMenu() {
  return (
    <>
      <p className={logoStyle.text}>REVERSI</p>
      <div className={style.linksContainer}>
        <MenuLink text="New Game" path="/game" />
        {/* TODO: Add "Continue Game button" */}
        <MenuLink text="Continue Game" path="/game" />
      </div>
    </>
  );
}

export default MainMenu;
