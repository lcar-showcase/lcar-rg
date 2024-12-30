import { PopUpType } from "../../types";
import NavigationButton from "../linkButton";
import TextInput from "../textInput";
import style from "./popUp.module.css";

interface PopUpProps {
  popUpType: PopUpType; // Determines pop-up content and button
  title: string;
  handlePrimaryButtonClick(): void;
  handleSecondaryButtonClick?(): void;
}

function PopUp({ popUpType, title, handlePrimaryButtonClick, handleSecondaryButtonClick }: PopUpProps) {
  return (
    <div className={style.darken}>
      <div className={style.popUp}>
        <h2>{title}</h2>
        {popUpType === "win" && (
          <button type="button" onClick={handlePrimaryButtonClick} className="btn">
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
              <NavigationButton label="Back" isSecondary handleButtonClick={handleSecondaryButtonClick || (() => {})} />
              <NavigationButton label="Continue" isSecondary={false} handleButtonClick={handlePrimaryButtonClick} />
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
              {/* TODO: Being repeated; remember to refactor */}
              <NavigationButton label="Back" isSecondary handleButtonClick={handleSecondaryButtonClick || (() => {})} />
              <NavigationButton label="Continue" isSecondary={false} handleButtonClick={handlePrimaryButtonClick} />
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default PopUp;
