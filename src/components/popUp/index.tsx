import { PopUpType } from "../../types";
import LinkButton from "../linkButton";
import TextInput from "../textInput";
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
            <TextInput
              label="Enter a save name"
              id="gameid"
              name="gameid"
              placeholder="Letters and numbers only; maximum 20 characters"
              errorMsg="Save name taken."
            />
            <div className={style.buttonsContainer}>
              <LinkButton label="Back" path="/" isSecondary handleButtonClick={handleButtonClick} />
              <LinkButton label="Continue" path="/game" isSecondary={false} handleButtonClick={handleButtonClick} />
            </div>
          </>
        )}
        {popUpType === "continue" && (
          <>
            <TextInput
              label="Enter an existing save name"
              id="gameid"
              name="gameid"
              placeholder="Letters and numbers only; maximum 20 characters"
              errorMsg="Save name not found."
            />
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
