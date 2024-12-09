import MenuLink from "../../components/menuLinks";
import style from "./mainMenu.module.css";

function MainMenu() {
  return (
    <>
      <h1 className={style.logo}>
        {/* Spaced using flex and gap; letter-spacing does not work due to flipped E */}
        <span>R</span>
        <span>E</span>
        <span>V</span>
        <span className={style.flipped}>E</span>
        <span>R</span>
        <span>S</span>
        <span>I</span>
      </h1>
      <div className={style.linksContainer}>
        <MenuLink text="New Game" path="/game" />
        {/* TODO: Add "Continue Game menuLink" */}
      </div>
    </>
  );
}

export default MainMenu;
