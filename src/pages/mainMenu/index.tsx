import { useState } from "react";
import { useNavigate } from "react-router";
import Logo from "../../components/logo";
import PopUp from "../../components/popUp";
import style from "./mainMenu.module.css";

function MainMenu() {
  const [showSaveGame, setShowSaveGame] = useState(false); // Show pop up for New Game (asks for save name)
  const [showContinueGame, setShowContinueGame] = useState(false); // Show pop up for Continue Game (asks for save name)
  const goTo = useNavigate();

  return (
    <>
      <Logo isNav={false} />
      <div className={style.mainMenuButtonsContainer}>
        {/* TODO: Manually typing /game in URL bypasses this pop-up, check Refresh also */}
        <button type="button" onClick={() => setShowSaveGame(true)} className="btn">
          New Game
        </button>
        <button type="button" onClick={() => setShowContinueGame(true)} className="btn">
          Continue Game
        </button>
      </div>
      {/* PopUps */}
      {showSaveGame && (
        <PopUp
          popUpType="save"
          title="New Game"
          handlePrimaryButtonClick={() => {
            setShowSaveGame(false);
            goTo("/game");
          }}
          handleSecondaryButtonClick={() => {
            setShowSaveGame(false);
            goTo("/");
          }}
        />
      )}
      {showContinueGame && (
        <PopUp
          popUpType="continue"
          title="Continue Game"
          handlePrimaryButtonClick={() => {
            setShowContinueGame(false);
            goTo("/game");
          }}
          handleSecondaryButtonClick={() => {
            setShowContinueGame(false);
            goTo("/");
          }}
        />
      )}
    </>
  );
}

export default MainMenu;
