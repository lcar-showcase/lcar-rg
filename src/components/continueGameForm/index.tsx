import React, { useState } from "react";
import { useNavigate } from "react-router";
import { API_BASE_URL, GAME_ID } from "../../constants";
import style from "./continueGameForm.module.css";

interface ContinueGameFormProps {
  togglePopUp(show: boolean): void; // To toggle PopUp state of parent
}

function ContinueGameForm({ togglePopUp }: ContinueGameFormProps) {
  const [currentInput, setCurrentInput] = useState("");
  const [formMsg, setFormMsg] = useState(""); // Message displayed below input
  const [isLoading, setIsLoading] = useState(false);
  const goTo = useNavigate(); // Change page after user submits form

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Validate input - alphanumeric and hyphens only, with no whitespaces
    const regex = /^[a-zA-Z0-9-]+$/; // TODO: Refinement (if enough time) match UUID format exactly
    if (!regex.exec(currentInput)) {
      setFormMsg("Invalid UUID provided.");
    } else {
      setIsLoading(true);
      setFormMsg("Loading game...");
    }
    // Load game
    const req = new Request(`${API_BASE_URL}/?id=${GAME_ID}&uuid=${currentInput}`, {
      method: "GET",
    });
    let uuidExists = true;
    try {
      const res = await fetch(req);
      const body = await res.json();
      if (!body.data) {
        // body does not have data if invalid UUID provided
        uuidExists = false;
      }
      const { board, history } = JSON.parse(body.data);
      goTo("/game", { state: { board, history } }); // Redirect to /game with overwritten initial states
      togglePopUp(false);
    } catch (err: unknown) {
      setFormMsg(uuidExists ? "Failed to load game." : "UUID does not exist.");
    }
    setIsLoading(false);
  };

  return (
    <form onSubmit={handleFormSubmit} className={style.formContainer}>
      {/* Input */}
      <div className={style.inputContainer}>
        <label htmlFor="gameUuid">
          Enter an existing UUID
          <input
            type="text"
            id="gameUuid"
            name="gameUuid"
            placeholder="e.g. 0cdf7cc9-77a6-434f-9b38-6acd940d770e"
            maxLength={36}
            minLength={36}
            required
            disabled={isLoading === true}
            onChange={(e) => {
              setCurrentInput(e.target.value);
            }}
          />
        </label>
        <p className={isLoading ? `${style.loading}` : `${style.notLoading}`}>{formMsg}</p>
      </div>
      {/* Buttons */}
      <div className={style.buttonsContainer}>
        <button type="button" disabled={isLoading} onClick={() => togglePopUp(false)} className="btn secondaryBtn">
          Back
        </button>
        <button type="submit" disabled={isLoading} className="btn">
          Continue
        </button>
      </div>
    </form>
  );
}

export default ContinueGameForm;
