import { useState } from "react";
import { Link } from "react-router";
import ContinueGameForm from "../../components/continueGameForm";
import PopUp from "../../components/popUp";
import style from "./mainMenu.module.css";

function MainMenu() {
  const [showPopUp, setShowPopUp] = useState(false);

  return (
    <>
      <img src="/images/logo.png" alt="reversi" className={`logoBase ${style.logo}`} />
      <div className={style.mainMenuButtonsContainer}>
        <Link to="/game" className="btn">
          New Game
        </Link>
        <button
          type="button"
          onClick={() => {
            setShowPopUp(true);
          }}
          className="btn"
        >
          Continue Game
        </button>
      </div>
      {showPopUp && (
        <PopUp title="Continue Game">
          <ContinueGameForm togglePopUp={setShowPopUp} />
        </PopUp>
      )}
    </>
  );
}

export default MainMenu;
