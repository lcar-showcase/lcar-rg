import { Link } from "react-router";
import { PopUpType } from "../../types";
import style from "./popUp.module.css";

interface PopUpProps {
  popUpType: PopUpType; // Determines pop-up content and button
  title: string;
  handleButtonClick(): void;
}

function PopUp({ popUpType, title, handleButtonClick }: PopUpProps) {
  return (
    <div className={style.darken}>
      <div className={style.popUp}>
        <h2>{title}</h2>
        {popUpType === "win" && (
          <button type="button" onClick={handleButtonClick} className="btn">
            Return to Game
          </button>
        )}
        {popUpType === "save" && (
          <div className={style.buttonsContainer}>
            <div role="button" aria-label="Save Game" tabIndex={0} onClick={handleButtonClick} onKeyDown={() => {}}>
              <Link to="/" className="btn">
                Back
              </Link>
            </div>
            <div role="button" aria-label="Save Game" tabIndex={0} onClick={handleButtonClick} onKeyDown={() => {}}>
              <Link to="/game" className="btn">
                Continue
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default PopUp;
