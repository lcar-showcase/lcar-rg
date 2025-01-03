import { PopUpType, SaveStatus } from "../../types";
import ContinueGameForm from "../continueGameForm";
import style from "./popUp.module.css";

interface PopUpProps {
  type: PopUpType; // Determines pop-up content and button
  title: string;
  // For save game
  saveStatus?: SaveStatus;
  uuid?: string;
  // Set states of parent pop-up
  togglePopUp(show: boolean): void;
  setParentPopUp?(type: PopUpType): void;
}

function PopUp({
  type,
  title,
  saveStatus = "pending",
  uuid = "",
  togglePopUp = () => {},
  setParentPopUp = () => {},
}: PopUpProps) {
  return (
    <div className={style.darken}>
      <div className={style.popUp}>
        <h2>{title}</h2>
        {type === "win" && (
          <button type="button" onClick={() => togglePopUp(false)} className="btn">
            Return to Game
          </button>
        )}
        {type === "continue" && <ContinueGameForm togglePopUp={togglePopUp} />}
        {type === "saving" && (
          <div className={style.popUpBodyContainer}>
            {saveStatus === "pending" ? (
              <img src="/images/loading.png" alt="Loading" className={style.loading} />
            ) : saveStatus === "ok" ? (
              <div className={style.saveOutcomeContainer}>
                <p className={style[saveStatus]}>Game saved successfully</p>
                <p className={style.uuid}>{uuid}</p> {/* TODO: (Refinement) clicking UUID to copy to clipboard */}
                <p>Use the UUID above to load the game</p>
              </div>
            ) : (
              <div className={style[saveStatus]}>Failed to save game</div>
            )}
            <button
              type="button"
              onClick={() => {
                togglePopUp(false);
                setParentPopUp("win"); // Set back to default PopUpType - "win"
              }}
              className="btn"
              disabled={saveStatus === "pending"}
            >
              Return to Game
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default PopUp;
