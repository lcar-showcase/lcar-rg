import React from "react";
import { useNavigate } from "react-router";
import { PopUpType } from "../../types";
import style from "./saveForm.module.css";

interface FormProps {
  formType: PopUpType; // TODO: Includes "win"
  disablePopUp(): void;
}

function CustomForm({ formType, disablePopUp }: FormProps) {
  const label = formType === "save" ? "Enter a save name" : "Enter an existing save name";
  const id = "gameid";
  const name = "gameid";
  const placeholder = "Letters and numbers only; maximum 20 characters";
  const errorMsg = formType === "save" ? "Save name taken." : "Save name not found.";
  const goTo = useNavigate();

  // TODO: Pass pop-up type here, then handle the logic for save/continue here
  const handleFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    disablePopUp();
    goTo("/game");
  };

  return (
    <form onSubmit={handleFormSubmit} className={style.formContainer}>
      {/* Input */}
      <div className={style.nameInputContainer}>
        <label htmlFor={name}>
          {label}
          <input type="text" id={id} name={name} placeholder={placeholder} />
        </label>
        <p>{errorMsg}</p>
      </div>
      {/* Buttons */}
      <div className={style.buttonsContainer}>
        <button type="button" onClick={disablePopUp} className="btn secondaryBtn">
          Back
        </button>
        <button type="submit" className="btn">
          Continue
        </button>
      </div>
    </form>
  );
}

export default CustomForm;
