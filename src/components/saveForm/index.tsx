import React, { useState } from "react";
import { useNavigate } from "react-router";
import { PopUpType } from "../../types";
import style from "./saveForm.module.css";

interface FormProps {
  formType: PopUpType; // TODO: Includes "win"
  disablePopUp(): void;
}

function CustomForm({ formType, disablePopUp }: FormProps) {
  const [currentName, setCurrentName] = useState(""); // Current text input
  const [errorMsg, setErrorMsg] = useState(formType === "save" ? "Save name taken." : "Save name not found.");
  const label = formType === "save" ? "Enter a save name" : "Enter an existing save name";
  const id = "gameid";
  const name = "gameid";
  const placeholder = "Letters and numbers only; 1-20 characters";
  const goTo = useNavigate();

  // TODO: Pass pop-up type here, then handle the logic for save/continue here
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Alphanumeric, no spaces
    const regex = /^[a-zA-Z0-9]+$/; // TODO: Test regex more extensively during refinement
    // Check if inputs valid (alphanumeric only)
    if (!regex.exec(currentName)) {
      setErrorMsg("Invalid name provided.");
    } else {
      disablePopUp();
      goTo("/game");
    }
  };

  return (
    <form onSubmit={handleFormSubmit} className={style.formContainer}>
      {/* Input */}
      <div className={style.nameInputContainer}>
        <label htmlFor={name}>
          {label}
          <input
            type="text"
            id={id}
            name={name}
            placeholder={placeholder}
            maxLength={20}
            onChange={(e) => {
              setCurrentName(e.target.value);
            }}
          />
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
