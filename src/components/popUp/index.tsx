import style from "./popUp.module.css";

interface PopUpProps {
  title: string;
  buttonText: string;
  handleButtonClick(): void;
}

function PopUp({ title, buttonText, handleButtonClick: handleClick }: PopUpProps) {
  return (
    <div className={style.darken}>
      <div className={style.popUp}>
        <h2>{title}</h2>
        <button type="button" onClick={handleClick} className={style.popUpButton}>
          {buttonText}
        </button>
      </div>
    </div>
  );
}

export default PopUp;
