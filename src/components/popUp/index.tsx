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
          // TODO: Load game will have to query DB then load a saved game
          <>
            <div className={style.nameInput}>
              <label htmlFor="gameid">
                Enter a save name
                <input
                  type="text"
                  id="gameid"
                  name="gameid"
                  placeholder="Letters and numbers only; maximum 20 characters"
                />
              </label>
              <p>Save name taken.</p>
            </div>
            <div className={style.buttonsContainer}>
              <LinkButton label="Back" path="/" isSecondary handleButtonClick={handleButtonClick} />
              <LinkButton label="Continue" path="/game" isSecondary={false} handleButtonClick={handleButtonClick} />
            </div>
          </>
        )}
        {popUpType === "continue" && (
          <>
            <div className={style.nameInput}>
              <label htmlFor="gameid">
                Enter an existing save name
                <input
                  type="text"
                  id="gameid"
                  name="gameid"
                  placeholder="Letters and numbers only; maximum 20 characters"
                />
              </label>
              <p>Save name not found.</p>
            </div>
            <div className={style.buttonsContainer}>
              <LinkButton label="Back" path="/" isSecondary handleButtonClick={handleButtonClick} />
              <LinkButton label="Continue" path="/game" isSecondary={false} handleButtonClick={handleButtonClick} />
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default PopUp;
