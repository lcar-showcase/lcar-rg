import { useState } from "react";
import { Link } from "react-router";
import Logo from "../../components/logo";
import PopUp from "../../components/popUp";
import style from "./mainMenu.module.css";

function MainMenu() {
  const [showPopUp, setShowPopUp] = useState(false);

  return (
    <>
      <Logo isNav={false} />
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
      {showPopUp && <PopUp type="continue" title="Continue Game" togglePopUp={setShowPopUp} />}
    </>
  );
}

export default MainMenu;
