import Logo from "../../components/logo";
import MenuLink from "../../components/menuLinks";
import style from "./mainMenu.module.css";

function MainMenu() {
  return (
    <>
      <Logo size="large" />
      <div className={style.linksContainer}>
        <MenuLink text="New Game" path="/game" />
        {/* TODO: Add "Continue Game menuLink" */}
      </div>
    </>
  );
}

export default MainMenu;
