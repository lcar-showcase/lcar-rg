import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import style from "./continueGameForm.module.css";

interface ContinueGameFormProps {
  togglePopUp(show: boolean): void; // To toggle PopUp state of parent
}

type LoadingStatus = "notLoading" | "loading";

function ContinueGameForm({ togglePopUp = () => {} }: ContinueGameFormProps) {
  const [currentInput, setCurrentInput] = useState("");
  const [formMsg, setFormMsg] = useState(""); // Message displayed below input
  const [loadingStatus, setLoadingStatus] = useState<LoadingStatus>("notLoading");
  const inputId = "gameUuid";
  const goTo = useNavigate(); // Change page after user submits form

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Validate input - alphanumeric and hyphens only, with no whitespaces
    const regex = /^[a-zA-Z0-9-]+$/; // TODO: Refinement (if enough time) match UUID format exactly
    if (!regex.exec(currentInput)) {
      setFormMsg("Invalid UUID provided.");
    } else {
      setLoadingStatus("loading");
      setFormMsg("Loading game...");
    }
  };

  // Retrieve game data from API
  useEffect(() => {
    const loadGame = async () => {
      const req = new Request(
        `https://cpy6alcm5f.execute-api.ap-southeast-1.amazonaws.com/?id=reversi-cl&uuid=${currentInput}`,
        {
          method: "GET",
        }
      );
      let uuidExists = true;
      try {
        const res = await fetch(req);
        const body = await res.json();
        if (body.message) {
          // body only returns a message property if UUID does not exist
          uuidExists = false;
        }
        const loadBoard = JSON.parse(body.data.board); // Game board
        const loadHistory = JSON.parse(body.data.history); // History
        goTo("/game", { state: { loadBoard, loadHistory } }); // Redirect to /game with overwritten initial states
        togglePopUp(false);
      } catch (err: unknown) {
        setFormMsg(uuidExists ? "Failed to load game." : "UUID does not exist.");
      }
      setLoadingStatus("notLoading");
    };
    if (loadingStatus === "loading") {
      loadGame();
    }
  }, [currentInput, goTo, loadingStatus, togglePopUp]);

  return (
    <form onSubmit={handleFormSubmit} className={style.formContainer}>
      {/* Input */}
      <div className={style.inputContainer}>
        <label htmlFor={inputId}>
          Enter an existing UUID
          <input
            type="text"
            id={inputId}
            name={inputId}
            placeholder="Letters, numbers and hyphens only; 36 characters"
            maxLength={36}
            minLength={36}
            required
            disabled={loadingStatus === "loading"}
            onChange={(e) => {
              setCurrentInput(e.target.value);
            }}
          />
        </label>
        <p className={style[loadingStatus]}>{formMsg}</p>
      </div>
      {/* Buttons */}
      <div className={style.buttonsContainer}>
        <button
          type="button"
          disabled={loadingStatus === "loading"}
          onClick={() => togglePopUp(false)}
          className="btn secondaryBtn"
        >
          Back
        </button>
        <button type="submit" disabled={loadingStatus === "loading"} className="btn">
          Continue
        </button>
      </div>
    </form>
  );
}

export default ContinueGameForm;
