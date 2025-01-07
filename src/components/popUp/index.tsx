import style from "./popUp.module.css";

interface PopUpProps {
  title: string;
  children?: React.ReactNode; // Children and buttons are optional
  primaryButtonText?: string | null;
  secondaryButtonText?: string | null;
  primaryButtonCallback?: (() => void) | null;
  secondaryButtonCallback?: (() => void) | null;
}

function PopUp({
  title,
  children,
  primaryButtonText,
  secondaryButtonText,
  primaryButtonCallback = null,
  secondaryButtonCallback = null,
}: PopUpProps) {
  return (
    <div className={style.darken}>
      <div className={style.popUp}>
        <h2>{title}</h2>
        {children && <div className={style.popUpBodyContainer}>{children}</div>}
        <div className={style.buttonsContainer}>
          {secondaryButtonText && secondaryButtonCallback && (
            <button type="button" className="secondaryBtn btn" onClick={secondaryButtonCallback}>
              {secondaryButtonText}
            </button>
          )}
          {primaryButtonText && primaryButtonCallback && (
            <button type="button" className="btn" onClick={primaryButtonCallback}>
              {primaryButtonText}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default PopUp;
