import React, { useState } from "react";
import { PopUpType } from "../../types";
import style from "./saveForm.module.css";

interface SaveFormProps {
  formType: PopUpType; // TODO: Includes "win"
  togglePopUp(show: boolean): void;
}

type SaveStatus = "notSaving" | "saving";

function SaveForm({ formType, togglePopUp = () => {} }: SaveFormProps) {
  const [currentName, setCurrentName] = useState(""); // Current text input
  const [errorMsg, setErrorMsg] = useState("");
  const [saveStatus, setSaveStatus] = useState<SaveStatus>("notSaving");
  const label = formType === "save" ? "Enter a save name" : "Enter an existing save name";
  const id = "gameid";
  const name = "gameid";
  const placeholder = "Letters and numbers only; 1-20 characters";

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Alphanumeric, no spaces
    const regex = /^[a-zA-Z0-9]+$/; // TODO: Test regex more extensively during refinement
    // Check if inputs valid (alphanumeric only)
    if (!regex.exec(currentName)) {
      setErrorMsg("Invalid name provided.");
    } else {
      setSaveStatus("saving");
      setErrorMsg("Saving...");
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
            disabled={saveStatus === "saving"}
            onChange={(e) => {
              setCurrentName(e.target.value);
            }}
          />
        </label>
        <p>{errorMsg}</p>
      </div>
      {/* Buttons */}
      <div className={style.buttonsContainer}>
        <button
          type="button"
          disabled={saveStatus === "saving"}
          onClick={() => togglePopUp(false)}
          className="btn secondaryBtn"
        >
          Back
        </button>
        <button type="submit" disabled={saveStatus === "saving"} className="btn">
          Save
        </button>
      </div>
    </form>
  );
}

export default SaveForm;
