import { useState } from "react";
import Logo from "../../components/logo";
import PopUp from "../../components/popUp";
import { PopUpType } from "../../types";
import style from "./mainMenu.module.css";

function MainMenu() {
  const [showPopUp, setShowPopUp] = useState(false);
  const [popUpType, setPopUpType] = useState<PopUpType>("save"); // Either new game or continue game

  return (
    <>
      <Logo isNav={false} />
      <div className={style.mainMenuButtonsContainer}>
        {/* TODO: Manually typing /game in URL bypasses this pop-up, check Refresh also */}
        <button
          type="button"
          onClick={() => {
            setPopUpType("save");
            setShowPopUp(true);
          }}
          className="btn"
        >
          New Game
        </button>
        <button
          type="button"
          onClick={() => {
            setPopUpType("continue");
            setShowPopUp(true);
          }}
          className="btn"
        >
          Continue Game
        </button>
      </div>
      {showPopUp && (
        <PopUp
          type={popUpType}
          title={popUpType === "save" ? "New Game" : "Continue Game"}
          disablePopUp={() => {
            setShowPopUp(false);
          }}
        />
      )}
    </>
  );
}

export default MainMenu;
