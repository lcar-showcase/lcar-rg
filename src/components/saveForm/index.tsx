import React, { useState } from "react";
import { useNavigate } from "react-router";
import { PopUpType } from "../../types";
import style from "./saveForm.module.css";

interface SaveFormProps {
  formType: PopUpType; // TODO: Includes "win"
  togglePopUp(show: boolean): void;
}

type LoadingStatus = "notLoading" | "loading";

function SaveForm({ formType, togglePopUp = () => {} }: SaveFormProps) {
  const [currentInput, setCurrentInput] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [loadingStatus, setLoadingStatus] = useState<LoadingStatus>("notLoading");
  const label = formType === "save" ? "Enter a save name" : "Enter an existing UUID";
  const id = "gameid";
  const name = "gameid";
  const placeholder = "Letters, numbers and hyphens only; 36 characters";
  const goTo = useNavigate();

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Alphanumeric and hyphens, no spaces
    const regex = /^[a-zA-Z0-9-]+$/; // TODO: Update regex to follow UUID format
    // Check if inputs valid (alphanumeric only)
    if (!regex.exec(currentInput)) {
      setErrorMsg("Invalid UUID provided.");
    } else {
      setLoadingStatus("loading");
      setErrorMsg("Loading...");
      // Retrieve info from db
      const getGame = async () => {
        const req = new Request(
          `https://cpy6alcm5f.execute-api.ap-southeast-1.amazonaws.com/?id=reversi-cl&uuid=${currentInput}`,
          {
            method: "GET",
          }
        );
        try {
          const res = await fetch(req);
          const body = await res.json();
          const loadBoard = JSON.parse(body.data.board);
          const loadHistory = JSON.parse(body.data.history);
          if (loadBoard) {
            // console.log(boardRes);
            goTo("/game", { state: { loadedBoardArr: loadBoard, loadedHistory: loadHistory } });
            togglePopUp(false);
          } else {
            setErrorMsg("Failed to load game.");
          }
        } catch (err: unknown) {
          if (err instanceof Error) {
            console.log(err.message);
          } else {
            console.log(err);
          }
        }
        setLoadingStatus("notLoading");
      };
      getGame();
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
            maxLength={36}
            minLength={36}
            required
            disabled={loadingStatus === "loading"}
            onChange={(e) => {
              setCurrentInput(e.target.value);
            }}
          />
        </label>
        <p className={style[loadingStatus]}>{loadingStatus === "loading" ? "Loading..." : errorMsg}</p>
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

export default SaveForm;
