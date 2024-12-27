import { useState } from "react";
import Logo from "../../components/logo";
import PopUp from "../../components/popUp";
import style from "./mainMenu.module.css";

function MainMenu() {
  const [showSaveGame, setShowSaveGame] = useState(false);

  return (
    <>
      <Logo isNav={false} />
      <div className={style.linksContainer}>
        <button type="button" onClick={() => setShowSaveGame(true)} className="btn">
          New Game
        </button>
        {/* TODO: Add "Continue Game menuLink" */}
      </div>
      {/* PopUps */}
      {showSaveGame && (
        <PopUp popUpType="save" title="Enter a save name" handleButtonClick={() => setShowSaveGame(false)} />
      )}
    </>
  );
}

export default MainMenu;
