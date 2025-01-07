import style from "./popUp.module.css";

interface PopUpProps {
  title: string;
  children?: React.ReactNode;
  primaryButtonText?: string;
  secondaryButtonText?: string;
  primaryButtonCallback?(): void;
  secondaryButtonCallback?(): void;
}

function PopUp({
  title,
  children,
  primaryButtonText,
  secondaryButtonText,
  primaryButtonCallback = () => {},
  secondaryButtonCallback = () => {},
}: PopUpProps) {
  return (
    <div className={style.darken}>
      <div className={style.popUp}>
        <h2>{title}</h2>
        {children && <div className={style.popUpBodyContainer}>{children}</div>}
        <div className={style.buttonsContainer}>
          {secondaryButtonText && (
            <button type="button" className="secondaryBtn btn" onClick={secondaryButtonCallback}>
              {secondaryButtonText}
            </button>
          )}
          {primaryButtonText && (
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
