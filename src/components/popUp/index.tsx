import { PopUpType } from "../../types";
import LinkButton from "../linkButton";
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
            <LinkButton label="Back" path="/" handleButtonClick={handleButtonClick} />
            <LinkButton label="Continue" path="/game" handleButtonClick={handleButtonClick} />
          </div>
        )}
      </div>
    </div>
  );
}

export default PopUp;
