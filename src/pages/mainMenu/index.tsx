import MenuLink from "../../components/menuLinks";
import style from "./mainMenu.module.css";

function MainMenu() {
  return (
    <>
      <p className={style.logo}>REVERSI</p>
      <div className={style.linksContainer}>
        <MenuLink text="New Game" path="/game" />
        {/* TODO: Add "Continue Game menuLink" */}
      </div>
    </>
  );
}

export default MainMenu;
