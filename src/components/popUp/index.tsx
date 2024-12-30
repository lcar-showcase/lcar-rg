import { PopUpType } from "../../types";
import CustomForm from "../saveForm";
import style from "./popUp.module.css";

interface PopUpProps {
  type: PopUpType; // Determines pop-up content and button
  title: string;
  disablePopUp(): void;
}

function PopUp({ type, title, disablePopUp }: PopUpProps) {
  return (
    <div className={style.darken}>
      <div className={style.popUp}>
        <h2>{title}</h2>
        {type === "win" && (
          <button type="button" onClick={disablePopUp} className="btn">
            Return to Game
          </button>
        )}
        {(type === "save" || "continue") && <CustomForm formType={type} disablePopUp={disablePopUp} />}
      </div>
    </div>
  );
}

export default PopUp;
